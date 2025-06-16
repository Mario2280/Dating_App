import { IsNumber } from 'class-validator';
class MediaDeleteDto {
  @IsNumber()
  id: string;
}

export default MediaDeleteDto;
