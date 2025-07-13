import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Box, Button, useTheme, useMediaQuery, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import HotelIcon from '@mui/icons-material/Hotel';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

const sections = [
  { id: 'hero', label: 'Ana Sayfa', path: '/', icon: <HomeIcon /> },
  { id: 'about', label: 'Hakkımızda', path: '/#about', icon: <InfoIcon /> },
  { id: 'rooms', label: 'Odalarımız', path: '/#rooms', icon: <HotelIcon /> },
];

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const drawer = (
    <List sx={{ width: 250, bgcolor: '#1a1a1a', height: '100%', color: 'white' }}>
      {sections.map((section) => (
        <ListItem
          key={section.id}
          component={Link}
          href={section.path}
          onClick={() => setDrawerOpen(false)}
          sx={{
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 500,
            '&:hover': { 
              bgcolor: 'rgba(212,175,55,0.1)',
              color: '#d4af37'
            },
          }}
        >
          <ListItemIcon sx={{ color: '#d4af37' }}>{section.icon}</ListItemIcon>
          <ListItemText primary={section.label} />
        </ListItem>
      ))}
      <ListItem sx={{ mt: 2 }}>
        <Button
          component="a"
          href="https://turgut-apart-otel.hmshotel.net/"
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          fullWidth
          sx={{
            fontWeight: 700,
            fontSize: 16,
            boxShadow: '0 4px 12px rgba(212,175,55,0.2)',
            borderRadius: 2,
            py: 1.2,
            bgcolor: '#d4af37',
            color: 'white',
            '&:hover': { 
              bgcolor: '#c19b2e',
              boxShadow: '0 6px 16px rgba(212,175,55,0.3)',
            },
          }}
        >
          <EventAvailableIcon sx={{ mr: 1 }} /> Rezervasyon
        </Button>
      </ListItem>
    </List>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'rgba(26,26,26,0.95)',
        color: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        minHeight: 64,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(212,175,55,0.2)',
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2, p: 2, color: '#d4af37' }}
            >
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{ sx: { width: 260 } }}
            >
              {drawer}
            </Drawer>
            <Box sx={{ flexGrow: 1 }} />
            <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', height: 20 }}>
              <Image 
                src="/krem_logo.png" 
                alt="Turgut Apart Otel Logo" 
                height={20} 
                width={50} 
                style={{ 
                  objectFit: 'contain', 
                  maxWidth: '100%', 
                  height: 'auto'
                }} 
              />
            </Box>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box component={Link} href="/" sx={{ mr: 4, display: 'flex', alignItems: 'center', height: 48 }}>
              <Image src="/krem_logo.png" alt="Turgut Apart Otel Logo" height={40} width={80} style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }} />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
              {sections.map((section) => (
                <Button
                  key={section.id}
                  component={Link}
                  href={section.path}
                  startIcon={section.icon}
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: 'rgba(255,255,255,0.7)',
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'rgba(212,175,55,0.1)',
                      color: '#d4af37',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  {section.label}
                </Button>
              ))}
            </Box>
            <Button
              component="a"
              href="https://turgut-apart-otel.hmshotel.net/"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              sx={{
                fontWeight: 700,
                fontSize: 16,
                boxShadow: '0 4px 12px rgba(212,175,55,0.2)',
                borderRadius: 2,
                py: 1.2,
                px: 3,
                ml: 2,
                bgcolor: '#d4af37',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  bgcolor: 'black',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(212,175,55,0.4)',
                  '&::after': {
                    opacity: 1,
                    transform: 'scale(1)',
                  }
                },
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                  opacity: 0,
                  transform: 'scale(1.2)',
                  transition: 'all 0.3s ease',
                }
              }}
              startIcon={<EventAvailableIcon />}
            >
              Rezervasyon
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
} 