export interface CardFile {
  name: string;
  size: number;
  type: string;
  data: string; // base64 encoded file data
}

export interface Card {
  id: string;
  topic: string;
  description: string;
  file?: CardFile;
  createdAt: string;
}

export interface CardFormData {
  topic: string;
  description: string;
  file?: CardFile;
}

export interface SocketEvents {
  initial_cards: (cards: Card[]) => void;
  new_card: (card: Card) => void;
  card_deleted: (cardId: string) => void;
  create_card: (cardData: CardFormData) => void;
  delete_card: (cardId: string) => void;
}

export interface CardComponentProps {
  card: Card;
  onDelete?: (cardId: string) => void;
}

export interface CardFormProps {
  onSubmit: (formData: CardFormData) => void;
  isSubmitting?: boolean;
}