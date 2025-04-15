import React from 'react';
import { Box, Alert, AlertTitle, Button } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

const ErrorState = ({ message = 'An error occurred', onRetry }) => {
  return (
    <Box sx={{ my: 4 }}>
      <Alert 
        severity="error"
        variant="filled"
        action={
          onRetry && (
            <Button 
              color="inherit" 
              size="small" 
              startIcon={<RefreshIcon />}
              onClick={onRetry}
            >
              Retry
            </Button>
          )
        }
      >
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorState;
