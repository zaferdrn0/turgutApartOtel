import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  useTheme,
  FormControlLabel,
  Checkbox,
  Grid,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Chip,
  TablePagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WifiIcon from '@mui/icons-material/Wifi';
import HotTubIcon from '@mui/icons-material/HotTub';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PoolIcon from '@mui/icons-material/Pool';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Mock data types
interface Room {
  id: number;
  number: string;
  type: string;
  price: number;
  status: 'available' | 'occupied';
  features: {
    wifi: boolean;
    jacuzzi: boolean;
    airConditioning: boolean;
    tv: boolean;
    parking: boolean;
    pool: boolean;
  };
  images: string[];
}

interface Reservation {
  id: number;
  roomId: number;
  guestName: string;
  phoneNumber: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

// Mock data
const mockRooms: Room[] = [
  {
    id: 1,
    number: '101',
    type: 'Standart',
    price: 500,
    status: 'available',
    features: {
      wifi: true,
      jacuzzi: false,
      airConditioning: true,
      tv: true,
      parking: true,
      pool: false,
    },
    images: [],
  },
  {
    id: 2,
    number: '102',
    type: 'Deluxe',
    price: 800,
    status: 'occupied',
    features: {
      wifi: true,
      jacuzzi: true,
      airConditioning: true,
      tv: true,
      parking: true,
      pool: true,
    },
    images: [],
  },
  {
    id: 3,
    number: '201',
    type: 'Suite',
    price: 1200,
    status: 'available',
    features: {
      wifi: true,
      jacuzzi: true,
      airConditioning: true,
      tv: true,
      parking: true,
      pool: true,
    },
    images: [],
  },
];

const mockReservations: Reservation[] = [
  {
    id: 1,
    roomId: 1,
    guestName: 'Ahmet Yılmaz',
    phoneNumber: '0532 123 4567',
    checkIn: '2024-03-20',
    checkOut: '2024-03-25',
    status: 'confirmed',
  },
  {
    id: 2,
    roomId: 2,
    guestName: 'Mehmet Demir',
    phoneNumber: '0533 987 6543',
    checkIn: '2024-03-22',
    checkOut: '2024-03-24',
    status: 'pending',
  },
];

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ResponsiveTableContainer = styled(TableContainer)(({ theme }) => ({
  width: '100%',
  overflowX: 'auto',
  WebkitOverflowScrolling: 'touch',
  '& .MuiTable-root': {
    minWidth: 800,
    width: '100%',
  },
  '& .MuiTableCell-root': {
    whiteSpace: 'nowrap',
    padding: theme.spacing(2),
    '&:last-child': {
      paddingRight: theme.spacing(2),
    },
  },
  '& .MuiTableHead-root .MuiTableCell-root': {
    backgroundColor: theme.palette.background.paper,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    fontWeight: 600,
  },
  '& .MuiTableBody-root .MuiTableRow-root:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
  },
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

const ImagePreviewContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const ImagePreview = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 150,
  height: 150,
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const ImageDeleteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 4,
  right: 4,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
}));

const UploadButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export default function AdminDashboard() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [openRoomDialog, setOpenRoomDialog] = useState(false);
  const [openReservationDialog, setOpenReservationDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = localStorage.getItem('adminAuthenticated');
      if (!isAuthenticated) {
        await router.replace('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    router.push('/admin/login');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...newImages]);
    }
  };

  const handleImageDelete = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setSelectedImages([]);
    setOpenRoomDialog(true);
  };

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setSelectedImages(room.images || []);
    setOpenRoomDialog(true);
  };

  const handleDeleteRoom = (roomId: number) => {
    setRooms(rooms.filter(room => room.id !== roomId));
  };

  const handleAddReservation = () => {
    setSelectedReservation(null);
    setOpenReservationDialog(true);
  };

  const handleEditReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setOpenReservationDialog(true);
  };

  const handleDeleteReservation = (reservationId: number) => {
    setReservations(reservations.filter(res => res.id !== reservationId));
  };

  const handleReservationStatus = (reservationId: number, status: 'confirmed' | 'cancelled') => {
    setReservations(reservations.map(res => 
      res.id === reservationId ? { ...res, status } : res
    ));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'rooms':
        return (
          <StyledPaper>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Oda Yönetimi
              </Typography>
              <Button 
                variant="contained" 
                onClick={handleAddRoom}
                startIcon={<AddIcon />}
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 3,
                  py: 1
                }}
              >
                Yeni Oda Ekle
              </Button>
            </Box>
            <ResponsiveTableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Oda No</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Tip</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Fiyat</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Durum</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Özellikler</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>İşlemler</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rooms
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((room) => (
                    <TableRow 
                      key={room.id}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          transition: 'background-color 0.2s ease-in-out'
                        }
                      }}
                    >
                      <TableCell>{room.number}</TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>{room.price} TL</TableCell>
                      <TableCell>
                        <Chip 
                          label={room.status === 'available' ? 'Müsait' : 'Dolu'} 
                          color={room.status === 'available' ? 'success' : 'error'}
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {room.features.wifi && <WifiIcon color="primary" />}
                          {room.features.jacuzzi && <HotTubIcon color="primary" />}
                          {room.features.airConditioning && <AcUnitIcon color="primary" />}
                          {room.features.tv && <TvIcon color="primary" />}
                          {room.features.parking && <LocalParkingIcon color="primary" />}
                          {room.features.pool && <PoolIcon color="primary" />}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          onClick={() => handleEditRoom(room)}
                          sx={{ 
                            color: 'primary.main',
                            '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDeleteRoom(room.id)}
                          sx={{ 
                            color: 'error.main',
                            '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.08)' }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rooms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Sayfa başına satır:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
              />
            </ResponsiveTableContainer>
          </StyledPaper>
        );

      case 'reservations':
        return (
          <StyledPaper>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Rezervasyon Yönetimi
              </Typography>
              <Button 
                variant="contained" 
                onClick={handleAddReservation}
                startIcon={<AddIcon />}
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 3,
                  py: 1
                }}
              >
                Yeni Rezervasyon
              </Button>
            </Box>
            <ResponsiveTableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Oda No</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Misafir</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Telefon</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Giriş</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Çıkış</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Durum</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>İşlemler</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservations
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((reservation) => (
                    <TableRow 
                      key={reservation.id}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          transition: 'background-color 0.2s ease-in-out'
                        }
                      }}
                    >
                      <TableCell>{rooms.find(r => r.id === reservation.roomId)?.number}</TableCell>
                      <TableCell>{reservation.guestName}</TableCell>
                      <TableCell>{reservation.phoneNumber}</TableCell>
                      <TableCell>{reservation.checkIn}</TableCell>
                      <TableCell>{reservation.checkOut}</TableCell>
                      <TableCell>
                        <Chip 
                          label={reservation.status === 'confirmed' ? 'Onaylandı' : 
                                 reservation.status === 'pending' ? 'Beklemede' : 'İptal Edildi'} 
                          color={reservation.status === 'confirmed' ? 'success' : 
                                 reservation.status === 'pending' ? 'warning' : 'error'}
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          onClick={() => handleEditReservation(reservation)}
                          sx={{ 
                            color: 'primary.main',
                            '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDeleteReservation(reservation.id)}
                          sx={{ 
                            color: 'error.main',
                            '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.08)' }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={reservations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Sayfa başına satır:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
              />
            </ResponsiveTableContainer>
          </StyledPaper>
        );

      case 'requests':
        return (
          <StyledPaper>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, color: 'text.primary' }}>
              Rezervasyon İstekleri
            </Typography>
            <ResponsiveTableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Oda No</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Misafir</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Telefon</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Giriş</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Çıkış</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>İşlemler</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservations
                    .filter(res => res.status === 'pending')
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((reservation) => (
                      <TableRow 
                        key={reservation.id}
                        sx={{ 
                          '&:hover': { 
                            backgroundColor: 'rgba(0, 0, 0, 0.02)',
                            transition: 'background-color 0.2s ease-in-out'
                          }
                        }}
                      >
                        <TableCell>{rooms.find(r => r.id === reservation.roomId)?.number}</TableCell>
                        <TableCell>{reservation.guestName}</TableCell>
                        <TableCell>{reservation.phoneNumber}</TableCell>
                        <TableCell>{reservation.checkIn}</TableCell>
                        <TableCell>{reservation.checkOut}</TableCell>
                        <TableCell>
                          <IconButton 
                            onClick={() => handleReservationStatus(reservation.id, 'confirmed')}
                            sx={{ 
                              color: 'success.main',
                              '&:hover': { backgroundColor: 'rgba(46, 125, 50, 0.08)' }
                            }}
                          >
                            <CheckIcon />
                          </IconButton>
                          <IconButton 
                            onClick={() => handleReservationStatus(reservation.id, 'cancelled')}
                            sx={{ 
                              color: 'error.main',
                              '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.08)' }
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={reservations.filter(res => res.status === 'pending').length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Sayfa başına satır:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
              />
            </ResponsiveTableContainer>
          </StyledPaper>
        );

      default:
        return (
          <StyledPaper>
            <Typography variant="h5" gutterBottom sx={{ mb: 4, fontWeight: 600, color: 'text.primary' }}>
              Hoş Geldiniz
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={3}>
                <StatCard>
                  <StatValue>{rooms.length}</StatValue>
                  <StatLabel>Toplam Oda</StatLabel>
                </StatCard>
              </Grid>
              <Grid item xs={12} lg={3}>
                <StatCard>
                  <StatValue>{reservations.length}</StatValue>
                  <StatLabel>Toplam Rezervasyon</StatLabel>
                </StatCard>
              </Grid>
              <Grid item xs={12} lg={3}>
                <StatCard>
                  <StatValue>
                    {reservations.filter(res => res.status === 'pending').length}
                  </StatValue>
                  <StatLabel>Bekleyen İstek</StatLabel>
                </StatCard>
              </Grid>
            </Grid>
          </StyledPaper>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Turgut Apart Otel - Admin Panel
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="inherit" 
              onClick={() => setCurrentPage('dashboard')}
              sx={{ 
                backgroundColor: currentPage === 'dashboard' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
              }}
            >
              Dashboard
            </Button>
            <Button 
              color="inherit" 
              onClick={() => setCurrentPage('rooms')}
              sx={{ 
                backgroundColor: currentPage === 'rooms' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
              }}
            >
              Odalar
            </Button>
            <Button 
              color="inherit" 
              onClick={() => setCurrentPage('reservations')}
              sx={{ 
                backgroundColor: currentPage === 'reservations' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
              }}
            >
              Rezervasyonlar
            </Button>
            <Button 
              color="inherit" 
              onClick={() => setCurrentPage('requests')}
              sx={{ 
                backgroundColor: currentPage === 'requests' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
              }}
            >
              İstekler
            </Button>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Main>
        <Toolbar />
        <Container maxWidth={false} sx={{ 
          px: { xs: 1, sm: 2, md: 3 },
          width: '100%',
          overflow: 'hidden',
          '& .MuiContainer-root': {
            maxWidth: '100% !important',
          }
        }}>
          {renderContent()}
        </Container>
      </Main>

      {/* Room Dialog */}
      <Dialog open={openRoomDialog} onClose={() => setOpenRoomDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedRoom ? 'Oda Düzenle' : 'Yeni Oda Ekle'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} lg={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Oda No"
                fullWidth
                defaultValue={selectedRoom?.number}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                margin="dense"
                label="Tip"
                fullWidth
                defaultValue={selectedRoom?.type}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                margin="dense"
                label="Fiyat"
                type="number"
                fullWidth
                defaultValue={selectedRoom?.price}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Oda Özellikleri
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} lg={4}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked={selectedRoom?.features.wifi} />}
                    label="WiFi"
                  />
                </Grid>
                <Grid item xs={6} lg={4}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked={selectedRoom?.features.jacuzzi} />}
                    label="Jakuzi"
                  />
                </Grid>
                <Grid item xs={6} lg={4}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked={selectedRoom?.features.airConditioning} />}
                    label="Klima"
                  />
                </Grid>
                <Grid item xs={6} lg={4}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked={selectedRoom?.features.tv} />}
                    label="TV"
                  />
                </Grid>
                <Grid item xs={6} lg={4}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked={selectedRoom?.features.parking} />}
                    label="Otopark"
                  />
                </Grid>
                <Grid item xs={6} lg={4}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked={selectedRoom?.features.pool} />}
                    label="Havuz"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
                Oda Fotoğrafları
              </Typography>
              <Box sx={{ 
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                mb: 2
              }}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />
                <UploadButton
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ mb: 2 }}
                >
                  Fotoğraf Yükle
                </UploadButton>
                <Typography variant="body2" color="text.secondary">
                  Birden fazla fotoğraf seçebilirsiniz
                </Typography>
              </Box>
              <ImagePreviewContainer>
                {selectedImages.map((image, index) => (
                  <ImagePreview key={index}>
                    <img src={image} alt={`Oda fotoğrafı ${index + 1}`} />
                    <ImageDeleteButton
                      size="small"
                      onClick={() => handleImageDelete(index)}
                    >
                      <DeleteForeverIcon />
                    </ImageDeleteButton>
                  </ImagePreview>
                ))}
              </ImagePreviewContainer>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoomDialog(false)}>İptal</Button>
          <Button onClick={() => setOpenRoomDialog(false)} variant="contained">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reservation Dialog */}
      <Dialog open={openReservationDialog} onClose={() => setOpenReservationDialog(false)}>
        <DialogTitle>
          {selectedReservation ? 'Rezervasyon Düzenle' : 'Yeni Rezervasyon'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Misafir Adı"
            fullWidth
            defaultValue={selectedReservation?.guestName}
          />
          <TextField
            margin="dense"
            label="Telefon Numarası"
            fullWidth
            defaultValue={selectedReservation?.phoneNumber}
            placeholder="0532 123 4567"
          />
          <TextField
            margin="dense"
            label="Giriş Tarihi"
            type="date"
            fullWidth
            defaultValue={selectedReservation?.checkIn}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Çıkış Tarihi"
            type="date"
            fullWidth
            defaultValue={selectedReservation?.checkOut}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReservationDialog(false)}>İptal</Button>
          <Button onClick={() => setOpenReservationDialog(false)} variant="contained">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 