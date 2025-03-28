import { Skeleton, Box } from '@mui/material';

export const LoadingSkeleton = () => (
  <Box sx={{ p: 2 }}>
    {[...Array(3)].map((_, i) => (
      <Box key={i} sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={100} />
        </Box>
        <Skeleton variant="rounded" height={60} />
      </Box>
    ))}
  </Box>
);

export default LoadingSkeleton;