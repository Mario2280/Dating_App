import { Type } from 'class-transformer';
import {
  IsString,
  IsDateString,
  IsArray,
  ValidateNested,
  IsUUID,
} from 'class-validator';

class LinkObj {
  aws_file_key: string;
}
class MessageSendDto {
  @IsString()
  @IsUUID()
  chat_id: string;

  @IsString()
  content: string;

  @IsDateString()
  sent_at: Date;

  @IsString()
  recipient_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkObj)
  attachments: Array<{ aws_file_key: string }>;
}

export default MessageSendDto;
