import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { configure } from '@testing-library/react';

// Mock global browser APIs missing in JSDOM
global.TextEncoder = TextEncoder;
// @ts-expect-error - Node types conflict with browser types
global.TextDecoder = TextDecoder;

// Mock matchMedia for Material UI
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated but still needed for some libs
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

// Mock localStorage for Zustand persistence
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Configure Testing Library
configure({
  asyncUtilTimeout: 5000, // For AI response simulations
});

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
  window.localStorage.clear();
});

// Mock WebSocket for chat functionality
class MockWebSocket {
  static instances: MockWebSocket[] = [];
  callbacks = {
    open: [] as EventListener[],
    message: [] as EventListener[],
  };

  constructor(public url: string) {
    MockWebSocket.instances.push(this);
  }

  addEventListener(event: 'open' | 'message', callback: EventListener) {
    this.callbacks[event].push(callback);
  }

  send = jest.fn();
  close = jest.fn();

  static mockOpen() {
    this.instances.forEach(instance => {
      instance.callbacks.open.forEach(cb => cb(new Event('open')));
    });
  }

  static mockMessage(message: string) {
    this.instances.forEach(instance => {
      instance.callbacks.message.forEach(cb => 
        cb(new MessageEvent('message', { data: message }))
      );
    });
  }
}

// @ts-expect-error - Overriding global WebSocket
global.WebSocket = MockWebSocket;