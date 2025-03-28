import { Box } from '@mui/material';
import { Message } from './Message';
import { useChat } from '../../hooks/useChat';
import { TypingIndicator } from './TypingIndicator';
import { LoadingSkeleton } from '../UI/LoadingSkeleton';
import { useEffect, useRef } from 'react';

export const MessageList = () => {
  const { messages, aiUser, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column' }}>
      {isLoading && <LoadingSkeleton />}
      
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          isCurrentUser={message.sender === 'user'}
          onEdit={(id, newContent) => {}}
        />
      ))}
      
      {aiUser.status === 'typing' && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default MessageList;