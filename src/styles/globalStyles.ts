import { createGlobalStyle } from 'styled-components';
import { Theme } from '@mui/material/styles';

interface GlobalStyleProps {
  theme: Theme;
}

export const GlobalStyles = createGlobalStyle<GlobalStyleProps>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    height: 100%;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.5;
    color: ${({ theme }) => theme.palette.text.primary};
    background-color: ${({ theme }) => theme.palette.background.default};
    height: 100%;
    overflow-x: hidden;
  }

  #root {
    height: 100%;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.primary.main};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
  }

  /* Animation for message transitions */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Markdown content styling */
  .markdown-content {
    h1, h2, h3, h4, h5, h6 {
      margin: 1rem 0;
      color: ${({ theme }) => theme.palette.text.primary};
    }

    p {
      margin: 0.5rem 0;
    }

    a {
      color: ${({ theme }) => theme.palette.primary.main};
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }

    ul, ol {
      padding-left: 1.5rem;
      margin: 0.5rem 0;
    }

    code {
      background: ${({ theme }) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9em;
    }

    pre {
      background: ${({ theme }) => theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]};
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      margin: 1rem 0;
    }

    blockquote {
      border-left: 3px solid ${({ theme }) => theme.palette.primary.main};
      padding-left: 1rem;
      margin: 1rem 0;
      color: ${({ theme }) => theme.palette.text.secondary};
    }
  }

  /* Accessibility improvements */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Print styles */
  @media print {
    body {
      background-color: white !important;
      color: black !important;
    }

    .no-print {
      display: none !important;
    }
  }
`;