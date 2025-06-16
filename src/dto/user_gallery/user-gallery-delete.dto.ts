import { IsOptional, IsString } from 'class-validator';

export default class UserGalUserGalleryDeleteDtoleryCreateDto {
  @IsString()
  @IsOptional()
  readonly user_id: string;

  @IsString()
  @IsOptional()
  readonly media_id: string;
}
