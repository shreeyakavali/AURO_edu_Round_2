import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { Header } from './components/Layout/Header';
import { MessageList } from './components/Chat/MessageList';
import { MessageInput } from './components/Chat/MessageInput';
import { NetworkStatus } from './components/UI/NetworkStatus';
import useChatStore from './stores/chatStore';
import { GlobalStyles } from './styles/globalStyles';
import { useEffect } from 'react';

function App() {
  const { theme, isConnected, setConnectionStatus } = useChatStore();

  // Create theme with additional configuration
  const appTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: theme === 'dark' ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: theme === 'dark' ? '#f48fb1' : '#f50057',
      },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.3s ease',
          },
        },
      },
    },
  });

  // Set theme attribute on HTML element for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Simulate connection status changes (remove in production)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(() => {
        setConnectionStatus(Math.random() > 0.2);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [setConnectionStatus]);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <GlobalStyles theme={appTheme} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <MessageList />
          <MessageInput />
        </Box>
        <NetworkStatus />
      </Box>
    </ThemeProvider>
  );
}

export default App;