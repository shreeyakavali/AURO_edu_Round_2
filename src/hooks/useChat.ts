import { useEffect } from 'react';
import useChatStore from '../stores/chatStore';
import { mockApi } from '../utils/mockApi';
import { Message } from '../types/chatTypes';

export const useChat = () => {
  const { 
    messages, 
    currentUser, 
    aiUser, 
    addMessage, 
    updateMessageStatus, 
    editMessage,
    setTypingStatus,
    setLoading,
    setError
  } = useChatStore();
  
  // Load initial chat history
  useEffect(() => {
    const loadChatHistory = async () => {
      setLoading(true);
      try {
        const history = await mockApi.fetchChatHistory(currentUser.id);
        history.forEach(msg => addMessage(msg));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load chat history');
      } finally {
        setLoading(false);
      }
    };
    
    loadChatHistory();
  }, [currentUser.id, addMessage, setLoading, setError]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Optimistic update
    const tempId = `temp-${Date.now()}`;
    const userMessage: Message = {
      id: tempId,
      content,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };
    
    addMessage(userMessage);
    setLoading(true);
    
    try {
      // Simulate sending to API
      const sentMessage = await mockApi.sendMessage(content, currentUser.id);
      
      // Update status
      updateMessageStatus(tempId, 'sent');
      addMessage(sentMessage);
      
      // Get AI response
      setTypingStatus(true);
      const aiResponse = await mockApi.getAIResponse(content);
      addMessage(aiResponse);
      
      setError(null);
    } catch (err) {
      updateMessageStatus(tempId, 'failed');
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setTypingStatus(false);
      setLoading(false);
    }
  };
  
  const handleEditMessage = (id: string, newContent: string) => {
    editMessage(id, newContent);
  };

  return {
    messages,
    currentUser,
    aiUser,
    sendMessage,
    editMessage: handleEditMessage
  };
};