import { NotificationModule } from './modules/notification/notification.module';
import { UserGalleryModule } from '@modules/user_gallery/user_gallery.module';
import { UserModule } from './modules/user/user.module';
import { ChatModule } from '@modules/chat/chat.module';
import { MessageModule } from './modules/message/message.module';
import { MediaModule } from '@modules/media/media.module';
//import { ChatGatewayModule } from './modules/websocket/chat-gateway.module';
//import { ChatGateway } from './modules/websocket/chat.gateway';
//import { GatewayModule } from './modules/websocket/gateway.module';
//import { ChatModule } from '@modules/chat/chat.module';
import { Module } from '@nestjs/common';
@Module({
  imports: [
        NotificationModule, 
    UserGalleryModule,
    UserModule,
    MessageModule,
    ChatModule,
    MediaModule,
  ],
  controllers: [],
  providers: [], //ChatGateway
})
export class AppModule {}
