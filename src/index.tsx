import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyles } from './styles/globalStyles';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useChatStore from './stores/chatStore';

const Root = () => {
  const { theme } = useChatStore.getState();
  const muiTheme = createTheme({ palette: { mode: theme } });

  return (
    <ThemeProvider theme={muiTheme}>
      <GlobalStyles theme={muiTheme} />
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);