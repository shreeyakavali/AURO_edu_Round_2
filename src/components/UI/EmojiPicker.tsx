// src/components/UI/EmojiPicker.tsx

import React from 'react';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect }) => {
  const emojis = ['😊', '😂', '❤️', '👍', '🔥', '😎'];

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {emojis.map((emoji) => (
        <button key={emoji} onClick={() => onSelect(emoji)}>
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiPicker;  // ✅ Ensure you have a default export
