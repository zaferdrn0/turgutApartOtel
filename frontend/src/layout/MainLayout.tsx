import { ReactNode } from 'react';
import Navbar from './Navbar';
import Box from '@mui/material/Box';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <Box>
        {children}
      </Box>
    </>
  );
} 