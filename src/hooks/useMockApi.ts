import { useState } from 'react';
import { mockApi } from '../utils/mockApi';
import useChatStore from '../stores/chatStore';

export const useMockApi = () => {
  const { addMessage, updateMessageStatus, setLoading, setError } = useChatStore();
  const [retryCount, setRetryCount] = useState(0);

  const sendMessage = async (content: string, userId: string) => {
    setLoading(true);
    try {
      // Optimistic UI update
      const tempId = `temp-${Date.now()}`;
      addMessage({
        id: tempId,
        content,
        sender: 'user',
        timestamp: new Date(),
        status: 'sending'
      });

      const sentMessage = await mockApi.sendMessage(content, userId);
      
      // Replace temp message with confirmed message
      updateMessageStatus(tempId, 'sent');
      addMessage(sentMessage);
      
      // Get AI response
      const aiResponse = await mockApi.getAIResponse(content);
      addMessage(aiResponse);
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      updateMessageStatus(`temp-${Date.now()}`, 'failed');
      if (retryCount < 3) {
        setTimeout(() => sendMessage(content, userId), 2000);
        setRetryCount(retryCount + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage };
};