class MessageEntity {
  chat_id: string;

  content: string;

  sent_at: Date;

  recipient_id: string;

  attachments: Array<{ aws_file_key: string }>;
}

export default MessageEntity;
