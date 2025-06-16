import { IsUUID, IsString, IsOptional } from 'class-validator';

export enum FileTypes {
  Video = 'Video',
  Image = 'Image',
}

class MediaCreateDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  message_id?: string;
}

export default MediaCreateDto;
