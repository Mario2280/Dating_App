import { UseInterceptors } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { AWSMediaFileInterceptor } from '@root/interceptors/aws-media.interseptor';
import { MessageEntity } from '@validation/message';
import { Server, Socket } from 'socket.io';
@WebSocketGateway()
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  private onlineUsers = new Map<string, string>(); // userId -> socketId

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (!userId) {
      client.disconnect(true);
      return;
    }
    this.onlineUsers.set(userId, client.id);
    await client.join(`user_${userId}`);
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.onlineUsers.entries()) {
      if (socketId === client.id) {
        this.onlineUsers.delete(userId);
        break;
      }
    }
  }

  @EventPattern('chat-messages')
  @UseInterceptors(AWSMediaFileInterceptor)
  handleChatMessage(@Payload() message: MessageEntity) {
    const recipientId = message.recipient_id;

    if (this.onlineUsers.has(recipientId)) {
      const socketId = this.onlineUsers.get(recipientId);
      this.server.to(socketId).emit('new-message', message);
    }
  }

  afterInit(server: any) {
    console.log('Socket is live');
  }
}
