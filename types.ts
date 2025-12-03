export interface InkEra {
  id: string;
  year: string;
  title: string;
  description: string;
  details: string;
  imageAlt: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}