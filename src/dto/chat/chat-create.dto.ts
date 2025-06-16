import { IsString } from 'class-validator';
class ChatCreateDto {
  @IsString()
  user1_id: string;

  @IsString()
  user2_id: string;
}

export default ChatCreateDto;
