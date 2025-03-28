import { Chip, Box } from '@mui/material';
import { Wifi, WifiOff, Cached } from '@mui/icons-material';
import useChatStore from '../../stores/chatStore';

export const NetworkStatus = () => {
  const { isConnected, isLoading } = useChatStore();

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
      <Chip
        icon={isConnected ? <Wifi /> : <WifiOff />}
        label={isConnected ? "Online" : "Reconnecting..."}
        color={isConnected ? "success" : "error"}
        sx={{ mr: 1 }}
      />
      {isLoading && (
        <Chip
          icon={<Cached />}
          label="Loading..."
          color="info"
        />
      )}
    </Box>
  );
};

export default NetworkStatus;