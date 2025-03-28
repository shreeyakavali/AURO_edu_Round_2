import { Box, Typography, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const TypingIndicator = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Avatar sx={{ mr: 1 }}>A</Avatar>
      <Box>
        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
          AI Tutor is typing
        </Typography>
        <Box sx={{ display: 'flex' }}>
          {[1, 2, 3].map((dot) => (
            <motion.div
              key={dot}
              animate={{ y: [0, -5, 0]