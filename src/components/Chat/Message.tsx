import { Avatar, Box, Typography, Paper, IconButton } from '@mui/material';
import { Edit, Done, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { Message as MessageType } from '../../types/chatTypes';

interface MessageProps {
  message: MessageType;
  isCurrentUser: boolean;
  onEdit: (id: string, newContent: string) => void;
}

export const Message = ({ message, isCurrentUser, onEdit }: MessageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);

  const handleEdit = () => {
    onEdit(message.id, editedContent);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', justifyContent: isCurrentUser ? 'flex-end' : 'flex-start', marginBottom: '16px' }}
    >
      {!isCurrentUser && (
        <Avatar sx={{ mr: 1, alignSelf: 'flex-end' }}>
          {message.sender.charAt(0).toUpperCase()}
        </Avatar>
      )}

      <Box sx={{ maxWidth: '70%' }}>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            backgroundColor: isCurrentUser ? 'primary.light' : 'background.paper',
            color: isCurrentUser ? 'primary.contrastText' : 'text.primary',
            borderRadius: isCurrentUser ? '18px 18px 0 18px' : '18px 18px 18px 0',
          }}
        >
          {isEditing ? (
            <Box>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                style={{ width: '100%', minHeight: '60px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <IconButton onClick={handleEdit} size="small">
                  <Done fontSize="small" />
                </IconButton>
                <IconButton onClick={() => setIsEditing(false)} size="small">
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <>
              <ReactMarkdown>{message.content}</ReactMarkdown>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {message.isEdited && ' (edited)'}
                </Typography>
                {isCurrentUser && (
                  <IconButton onClick={() => setIsEditing(true)} size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </>
          )}
        </Paper>
        {isCurrentUser && (
          <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}>
            {message.status === 'sending' && 'Sending...'}
            {message.status === 'sent' && 'Sent'}
            {message.status === 'delivered' && 'Delivered'}
            {message.status === 'read' && 'Read'}
            {message.status === 'failed' && 'Failed'}
          </Typography>
        )}
      </Box>
    </motion.div>
  );
};

export default Message;