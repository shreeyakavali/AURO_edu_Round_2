// src/App.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import useChatStore from './stores/chatStore';

// Mock the useChatStore hook
jest.mock('./stores/chatStore');

beforeEach(() => {
  // Reset the mock store before each test
  useChatStore.mockImplementation(() => ({
    messages: [],
    currentUser: { id: 'user-1', name: 'You', status: 'online' },
    aiUser: { id: 'ai-1', name: 'AI Tutor', status: 'online' },
    theme: 'light',
    isConnected: true,
    isLoading: false,
    error: null,
    sendMessage: jest.fn(),
    editMessage: jest.fn(),
    toggleTheme: jest.fn(),
  }));
});

describe('App Component', () => {
  test('renders the chat application header', () => {
    render(<App />);
    expect(screen.getByText('AI EduChat')).toBeInTheDocument();
  });

  test('renders the initial empty message list', () => {
    render(<App />);
    expect(screen.getByTestId('message-list')).toBeInTheDocument();
    expect(screen.queryByTestId('message-item')).toBeNull();
  });

  test('renders the message input component', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Type your message here...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  test('allows sending a message', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Type your message here...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Hello, world!' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(useChatStore().sendMessage).toHaveBeenCalledWith('Hello, world!');
    });
  });

  test('displays loading state', () => {
    useChatStore.mockImplementation(() => ({
      ...useChatStore(),
      isLoading: true,
    }));

    render(<App />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  test('displays error message', () => {
    useChatStore.mockImplementation(() => ({
      ...useChatStore(),
      error: 'Network error occurred',
    }));

    render(<App />);
    expect(screen.getByText('Network error occurred')).toBeInTheDocument();
  });

  test('toggles between light and dark theme', () => {
    render(<App />);
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    
    fireEvent.click(themeToggle);
    expect(useChatStore().toggleTheme).toHaveBeenCalled();
  });
});

describe('Accessibility', () => {
  test('has proper contrast in light mode', () => {
    render(<App />);
    const header = screen.getByText('AI EduChat');
    expect(header).toHaveStyle('color: #ffffff'); // Assuming dark text on light bg
  });

  test('all form inputs have labels', () => {
    render(<App />);
    expect(screen.getByLabelText('Message input')).toBeInTheDocument();
  });
});