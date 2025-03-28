import { Message } from '../types/chatTypes';

/**
 * Formats a timestamp into a readable time string
 * @param date - Date object or string
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Truncates long text with ellipsis
 * @param text - Input string
 * @param maxLength - Maximum length before truncation
 * @returns Truncated string
 */
export const truncate = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

/**
 * Parses markdown content for safe rendering
 * @param content - Markdown string
 * @returns Sanitized markdown
 */
export const safeMarkdown = (content: string): string => {
  // Basic XSS protection
  return content
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n\n/g, '\n');
};

/**
 * Groups messages by date
 * @param messages - Array of messages
 * @returns Object with dates as keys
 */
export const groupMessagesByDate = (messages: Message[]) => {
  return messages.reduce((acc, message) => {
    const date = new Date(message.timestamp).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {} as Record<string, Message[]>);
};

/**
 * Simulates typing delay
 * @param text - Text to "type"
 * @param callback - Called with each new character
 * @param speed - Typing speed in ms
 */
export const simulateTyping = async (
  text: string,
  callback: (char: string) => void,
  speed = 50
) => {
  for (let i = 0; i < text.length; i++) {
    await new Promise(resolve => setTimeout(resolve, speed));
    callback(text.substring(0, i + 1));
  }
};

/**
 * Debounce function for expensive operations
 * @param func - Function to debounce
 * @param wait - Wait time in ms
 */
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Checks if message contains educational keywords
 * @param content - Message content
 */
export const isEducationalQuery = (content: string): boolean => {
  const eduKeywords = [
    'explain', 'teach', 'what is', 'how to', 'define',
    'meaning', 'example', 'educate', 'learn', 'concept'
  ];
  return eduKeywords.some(keyword => 
    content.toLowerCase().includes(keyword)
  );
};

/**
 * Generates a unique ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
};