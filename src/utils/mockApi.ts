import { Message } from '../types/chatTypes';

// Simulate network latency (0.5s - 2s)
const simulateNetwork = async () => {
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1500));
};

// 10% chance of error for realistic testing
const simulateError = () => Math.random() < 0.1;

// Educational responses with markdown formatting
const EDUCATIONAL_RESPONSES = [
  (input: string) => `The concept of **${input}** refers to...`,
  (input: string) => `Here's a detailed explanation:\n\n${input} involves...`,
  (input: string) => `In educational terms, _${input}_ means...`,
  (input: string) => `Key points about ${input}:\n\n1. First aspect\n2. Second concept\n3. Practical application`,
  (input: string) => `Learn more: [${input} Reference](https://example.com)`,
  (input: string) => `Let me explain using an example:\n\n\`\`\`\n// Code example related to ${input}\nfunction example() {\n  return "${input}";\n}\n\`\`\``
];

// Local storage mock database
const mockDatabase = {
  getMessages: (userId: string): Message[] => {
    const stored = localStorage.getItem(`chatHistory-${userId}`);
    return stored ? JSON.parse(stored) : [];
  },
  saveMessage: (userId: string, message: Message) => {
    const history = mockDatabase.getMessages(userId);
    localStorage.setItem(
      `chatHistory-${userId}`,
      JSON.stringify([...history, message])
    );
  }
};

export const mockApi = {
  fetchChatHistory: async (userId: string): Promise<Message[]> => {
    await simulateNetwork();
    if (simulateError()) throw new Error("Failed to load chat history");
    return mockDatabase.getMessages(userId);
  },

  sendMessage: async (content: string, userId: string): Promise<Message> => {
    await simulateNetwork();
    if (simulateError()) throw new Error("Message failed to send");

    const message: Message = {
      id: `msg-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    mockDatabase.saveMessage(userId, message);
    return message;
  },

  getAIResponse: async (userMessage: string): Promise<Message> => {
    await simulateNetwork();
    if (simulateError()) throw new Error("AI service unavailable");

    const randomResponse = EDUCATIONAL_RESPONSES[
      Math.floor(Math.random() * EDUCATIONAL_RESPONSES.length)
    ](userMessage);

    return {
      id: `ai-${Date.now()}`,
      content: randomResponse,
      sender: 'ai',
      timestamp: new Date(),
      status: 'delivered'
    };
  },

  // For testing purposes
  clearConversation: (userId: string) => {
    localStorage.removeItem(`chatHistory-${userId}`);
  }
};