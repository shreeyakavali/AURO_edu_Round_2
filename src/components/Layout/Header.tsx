import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { ThemeToggle } from '../UI/ThemeToggle';
import useChatStore from '../../stores/chatStore';
import { NetworkStatus } from '../UI/NetworkStatus';

export const Header = () => {
  const { isConnected } = useChatStore();

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AI EduChat
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NetworkStatus />
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;