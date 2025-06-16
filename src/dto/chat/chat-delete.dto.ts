import { IsString, IsUUID } from 'class-validator';
class ChatDeleteDto {
  @IsString()
  @IsUUID()
  id: string;
}

export default ChatDeleteDto;
