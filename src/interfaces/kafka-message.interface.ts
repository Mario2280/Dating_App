export interface KafkaMessage {
  chat_id: string;
  sender_id: number;
  content: string;
  attachments: string[];
}
