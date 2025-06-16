import { IsUUID, IsString, IsDateString } from 'class-validator';
class MessageCreateDto {
  @IsString()
  @IsUUID()
  chat_id: string;

  @IsString()
  sender_id: string;

  @IsString()
  content: string;

  @IsDateString()
  sent_at: Date;
}

export default MessageCreateDto;
