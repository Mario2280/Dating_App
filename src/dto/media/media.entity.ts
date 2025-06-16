import { FileTypes } from './media-create.dto';
class MediaEntity {
  id: string;
  message_id?: string;
  aws_file_key: string;
  type: FileTypes;
}

export default MediaEntity;
