export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  isEdited?: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'typing';
}

export interface ChatState {
  messages: Message[];
  currentUser: User;
  aiUser: User;
  theme: 'light' | 'dark';
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Message) => void;
  updateMessageStatus: (messageId: string, status: Message['status']) => void;
  editMessage: (messageId: string, newContent: string) => void;
  toggleTheme: () => void;
  setConnectionStatus: (status: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTypingStatus: (isTyping: boolean) => void; // Add this line
}