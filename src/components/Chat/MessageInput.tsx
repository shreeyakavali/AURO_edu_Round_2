import { Box, TextField, IconButton, Tooltip, Typography } from '@mui/material';
import { Send, InsertEmoticon, FormatBold, FormatItalic, Link } from '@mui/icons-material';
import { useState, useRef, KeyboardEvent } from 'react';
import { useChat } from '../../hooks/useChat';
import EmojiPicker from '../UI/EmojiPicker';

export const MessageInput = () => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { sendMessage } = useChat();

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const addEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const applyFormatting = (format: string) => {
    const formats: Record<string, [string, string]> = {
      bold: ['**', '**'],
      italic: ['_', '_'],
      link: ['[', '](url)']
    };
    
    const [start, end] = formats[format] || ['', ''];
    const input = inputRef.current;
    if (!input) return;
    
    const startPos = input.selectionStart || 0;
    const endPos = input.selectionEnd || 0;
    const selectedText = message.substring(startPos, endPos);
    
    const newText = message.substring(0, startPos) + start + selectedText + end + message.substring(endPos);
    setMessage(newText);
    
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(startPos + start.length, endPos + start.length);
    }, 0);
  };

  return (
    <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Tooltip title="Bold">
          <IconButton onClick={() => applyFormatting('bold')} size="small">
            <FormatBold fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Italic">
          <IconButton onClick={() => applyFormatting('italic')} size="small">
            <FormatItalic fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Link">
          <IconButton onClick={() => applyFormatting('link')} size="small">
            <Link fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Emoji">
          <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)} size="small">
            <InsertEmoticon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {showEmojiPicker && (
        <Box sx={{ position: 'absolute', bottom: '80px', zIndex: 10 }}>
          <EmojiPicker onSelect={addEmoji} />
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          inputRef={inputRef}
          fullWidth
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          variant="outlined"
          sx={{ mr: 1 }}
        />
        <IconButton onClick={handleSend} color="primary" disabled={!message.trim()}>
          <Send />
        </IconButton>
      </Box>

      <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 1 }}>
        {message.length}/500
      </Typography>
    </Box>
  );
};

export default MessageInput;