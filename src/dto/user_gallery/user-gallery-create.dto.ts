import { IsString } from 'class-validator';

export default class UserGalleryCreateDto {
  @IsString()
  readonly user_id: string;

  @IsString()
  readonly media_id: string;
}
