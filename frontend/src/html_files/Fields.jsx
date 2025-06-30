// Field.jsx
import React from 'react';
import { Typography, Stack } from '@mui/material';

const Field = ({ label, value }) => (
  <Stack direction="row" spacing={1} className="mb-2">
    <Typography variant="subtitle2" color="text.secondary" width={170}>
      {label}:
    </Typography>
    <Typography variant="body1" fontWeight="500">
      {value || "--"}
    </Typography>
  </Stack>
);

export default Field;
