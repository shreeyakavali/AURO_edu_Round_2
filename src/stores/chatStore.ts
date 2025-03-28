// src/stores/chatStore.ts

import { create } from 'zustand';

// Define the state interface
interface ChatState {
  messages: string[];
  addMessage: (message: string) => void;
  clearMessages: () => void;  // Added for convenience
}

// Create the Zustand store with proper typing
export const useChatStore = create<ChatState>((set) => ({
  messages: [],

  // Add a new message
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  // Clear all messages
  clearMessages: () => set({ messages: [] }),
}));

// Export store type for reuse elsewhere
export type ChatStore = ReturnType<typeof useChatStore>;
