import { useEffect } from 'react';
import useChatStore from '../stores/chatStore';
import { io } from 'socket.io-client';

export const useSocket = () => {
  const { setConnectionStatus } = useChatStore();
  
  useEffect(() => {
    // Mock socket connection in development
    if (process.env.NODE_ENV === 'development') {
      const socket = io('http://localhost:3001', {
        transports: ['websocket'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
      
      // Mock connection events
      const connectListener = () => {
        console.log('Socket connected');
        setConnectionStatus(true);
      };
      
      const disconnectListener = () => {
        console.log('Socket disconnected');
        setConnectionStatus(false);
      };
      
      // Simulate connection
      const timeout = setTimeout(() => {
        connectListener();
      }, 1000);
      
      // Simulate occasional disconnections
      const disconnectInterval = setInterval(() => {
        if (Math.random() > 0.8) {
          disconnectListener();
          setTimeout(connectListener, 2000);
        }
      }, 10000);
      
      return () => {
        clearTimeout(timeout);
        clearInterval(disconnectInterval);
        socket.disconnect();
      };
    }
  }, [setConnectionStatus]);
};