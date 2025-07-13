import { useState } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardMedia,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";
import KingBedIcon from "@mui/icons-material/KingBed";
import PeopleIcon from "@mui/icons-material/People";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import BlockIcon from '@mui/icons-material/Block';
import MainLayout from '../../layout/MainLayout';

interface Reservation {
  startDate: string;
  endDate: string;
}

interface Room {
  id: number;
  name: string;
  image: string;
  capacity: number;
  beds: number;
  size: number;
  price: number;
  features: string[];
  reservations: Reservation[];
}

const rooms: Room[] = [
  {
    id: 1,
    name: "Deluxe Oda",
    image: "/room-1.jpg",
    capacity: 2,
    beds: 1,
    size: 35,
    price: 1500,
    features: ["WiFi", "Klima", "Deniz Manzarası"],
    reservations: [
      { startDate: "2024-03-15", endDate: "2024-03-20" },
      { startDate: "2024-03-25", endDate: "2024-03-30" },
    ],
  },
  {
    id: 2,
    name: "Suit Oda",
    image: "/room-2.jpg",
    capacity: 4,
    beds: 2,
    size: 50,
    price: 2500,
    features: ["WiFi", "Klima", "Jakuzi", "Deniz Manzarası"],
    reservations: [
      { startDate: "2024-03-18", endDate: "2024-03-22" },
    ],
  },
  {
    id: 3,
    name: "Aile Odası",
    image: "/room-3.jpg",
    capacity: 6,
    beds: 3,
    size: 70,
    price: 3500,
    features: ["WiFi", "Klima", "Mutfak", "Deniz Manzarası"],
    reservations: [
      { startDate: "2025-03-10", endDate: "2025-03-15" },
      { startDate: "2025-03-20", endDate: "2025-03-25" },
    ],
  },
];

const generateDateRange = (startDate: string, days: number) => {
  const dates = [];
  const currentDate = new Date(startDate);
  for (let i = 0; i < days; i++) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

function formatDateYMD(date: Date): string {
  return date.toISOString().slice(0, 10);
}

const isDateInRange = (date: Date, reservations: { startDate: string; endDate: string }[]) => {
  const d = formatDateYMD(date);
  return reservations.some(reservation => {
    const start = reservation.startDate;
    const end = reservation.endDate;
    return d >= start && d <= end;
  });
};

// Mock price and stock data for each room and date
type RoomAvailability = {
  [date: string]: {
    status: 'available' | 'not_available' | 'closed',
    price?: number,
    stock?: number,
  }
};

const getRoomAvailability = (room: Room, dates: Date[]): RoomAvailability => {
  const result: RoomAvailability = {};
  dates.forEach((date, i) => {
    const dateStr = date.toISOString().slice(0, 10);
    // Satışa kapalı gün örneği: her pazar (0) kapalı
    if (date.getDay() === 0) {
      result[dateStr] = { status: 'closed' };
      return;
    }
    // Eğer rezervasyon varsa: not_available
    if (isDateInRange(date, room.reservations)) {
      result[dateStr] = { status: 'not_available' };
      return;
    }
    // Müsait günler: available
    result[dateStr] = { status: 'available', price: 130 + room.id, stock: 1 + (room.id % 2) };
  });
  return result;
};

const ReservationCalendar = ({ checkIn, rooms }: { checkIn: string; rooms: Room[] }) => {
  if (!checkIn) return null;
  const daysToShow = 15;
  const dates = generateDateRange(checkIn, daysToShow);
  const monthYear = dates.length > 0 ? dates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '';

  return (
    <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 3, boxShadow: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell rowSpan={2} sx={{ fontWeight: 700, fontSize: 18, background: '#f3f6f9', color: '#222' }}>Rooms</TableCell>
            <TableCell colSpan={dates.length} align="center" sx={{ background: '#f3f6f9', fontWeight: 700, color: '#222' }}>{monthYear}</TableCell>
          </TableRow>
          <TableRow>
            {dates.map((date) => (
              <TableCell key={date.toISOString()} align="center" sx={{ background: '#f3f6f9', p: 0.5, color: '#222' }}>
                <Box sx={{ fontWeight: 600 }}>{date.toLocaleDateString('en-GB', { day: '2-digit' })}</Box>
                <Box sx={{ fontSize: 12, color: '#888' }}>{date.toLocaleDateString('en-GB', { weekday: 'short' })}</Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell sx={{ fontWeight: 600, fontSize: 16, color: '#222' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PeopleIcon fontSize="small" />
                  {room.name}
                </Box>
              </TableCell>
              {dates.map((date) => {
                const dateStr = date.toISOString().slice(0, 10);
                // Satışa kapalı gün örneği: her pazar (0) kapalı
                if (date.getDay() === 0) {
                  return (
                    <TableCell key={dateStr} align="center" sx={{ bgcolor: '#f3f6f9', color: '#757575' }}>
                      <BlockIcon fontSize="small" />
                    </TableCell>
                  );
                }
                // Eğer rezervasyon varsa: not_available
                if (isDateInRange(date, room.reservations)) {
                  return (
                    <TableCell key={dateStr} align="center" sx={{ bgcolor: '#ffeaea', color: '#d32f2f', fontWeight: 700 }}>
                      <CloseIcon fontSize="small" />
                    </TableCell>
                  );
                }
                // Müsait günler: available
                return (
                  <TableCell key={dateStr} align="center" sx={{ bgcolor: '#e8f5e9', color: '#388e3c', fontWeight: 700, p: 0.5 }}>
                    <CheckIcon fontSize="small" />
                    <Box sx={{ fontSize: 12, fontWeight: 500 }}>{130 + room.id}</Box>
                    <Box sx={{ fontSize: 10, color: '#388e3c' }}>{1 + (room.id % 2)}</Box>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', p: 2, fontSize: 14 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><CheckIcon sx={{ color: '#388e3c', fontSize: 18 }} /> <span style={{color:'#388e3c'}}>Available Days</span></Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><CloseIcon sx={{ color: '#d32f2f', fontSize: 18 }} /> <span style={{color:'#d32f2f'}}>Not Available</span></Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><BlockIcon sx={{ color: '#757575', fontSize: 18 }} /> <span style={{color:'#757575'}}>Closed for sale or no room</span></Box>
      </Box>
    </TableContainer>
  );
};

export default function Rezervasyon() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      setError('Lütfen giriş ve çıkış tarihlerini seçiniz.');
      setShowResults(false);
      return;
    }
    setError(null);
    setShowResults(true);
  };

  return (
    <MainLayout>
      <Head>
        <title>Rezervasyon - Turgut Apart Otel</title>
        <meta name="description" content="Otel rezervasyon sayfası" />
        <link rel="icon" href="/siyah_logo.png" type="image/png" />
      </Head>

      <Box>
        <Container sx={{ pt: 15, pb: 8 }}>
          {error && (
            <Alert severity="warning" sx={{ mb: 3 }}>{error}</Alert>
          )}
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Typography variant="h3" sx={{ mb: 4 }}>
              Rezervasyon
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                label="Giriş Tarihi"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ width: isMobile ? "100%" : "auto" }}
              />
              <TextField
                label="Çıkış Tarihi"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ width: isMobile ? "100%" : "auto" }}
              />
              <Button
                variant="contained"
                size="large"
                onClick={handleSearch}
                sx={{ width: isMobile ? "100%" : "auto" }}
              >
                Ara
              </Button>
            </Box>
          </Box>

          {showResults && (
            <>
              <ReservationCalendar checkIn={checkIn} rooms={rooms} />
              
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {rooms.map((room) => (
                  <Card key={room.id} sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", height: isMobile ? 'auto' : 300 }}>
                    <Box sx={{ width: isMobile ? '100%' : '40%', minWidth: isMobile ? 'unset' : 300 }}>
                      <CardMedia
                        component="img"
                        height={isMobile ? 180 : "100%"}
                        image={room.image}
                        alt={room.name}
                        sx={{ objectFit: "cover" }}
                      />
                    </Box>
                    <Box sx={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      flex: 1, 
                      p: 3,
                      position: "relative",
                      justifyContent: isMobile ? 'flex-start' : 'unset',
                      alignItems: isMobile ? 'flex-start' : 'unset',
                    }}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
                          {room.name}
                        </Typography>
                        <Typography variant="h6" color="primary" gutterBottom>
                          {room.price} TL / Gece
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: "flex", gap: 2, mb: 2, flexDirection: isMobile ? 'column' : 'row' }}>
                        <Stack direction="row" spacing={1}>
                          <Chip
                            icon={<PeopleIcon />}
                            label={`${room.capacity} Kişilik`}
                            size="small"
                          />
                          <Chip
                            icon={<KingBedIcon />}
                            label={`${room.beds} Yatak`}
                            size="small"
                          />
                          <Chip
                            icon={<SquareFootIcon />}
                            label={`${room.size} m²`}
                            size="small"
                          />
                        </Stack>
                      </Box>

                      <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                        {room.features.map((feature, index) => (
                          <Chip
                            key={index}
                            label={feature}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>

                      <Button
                        variant="contained"
                        sx={{ 
                          mt: isMobile ? 2 : 0,
                          alignSelf: isMobile ? 'stretch' : 'flex-end',
                          position: isMobile ? 'static' : 'absolute',
                          bottom: isMobile ? 'unset' : 16,
                          right: isMobile ? 'unset' : 16,
                          minWidth: 150
                        }}
                        disabled={isDateInRange(new Date(checkIn), room.reservations)}
                      >
                        {isDateInRange(new Date(checkIn), room.reservations) ? "Müsait Değil" : "Rezervasyon Yap"}
                      </Button>
                    </Box>
                  </Card>
                ))}
              </Box>
            </>
          )}
        </Container>
      </Box>
    </MainLayout>
  );
} 