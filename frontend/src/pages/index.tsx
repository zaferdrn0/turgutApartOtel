import Head from "next/head";
import Link from "next/link";
import { Box, Container, Typography, Button, useTheme, useMediaQuery, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import MainLayout from '../layout/MainLayout';
import { Montserrat } from 'next/font/google';
import PeopleIcon from '@mui/icons-material/People';
import KingBedIcon from '@mui/icons-material/KingBed';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import CheckIcon from '@mui/icons-material/Check';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Image from "next/image";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });

const heroSlides = [
  {
    image: "/kapak1.jpg",
    title: "Turgut Apart Otel",
    desc: "Eşsiz manzarası ve lüks konaklama imkanlarıyla unutulmaz bir tatil deneyimi",
  },
  {
    image: "/kapak2.jpg",
    title: "Denize Sıfır Konum",
    desc: "Masmavi deniz ve huzurlu plajlar sizi bekliyor. Şimdi rezervasyon yapın!",
  },
  {
    image: "/kapak3.jpg",
    title: "Aile Dostu Tatil",
    desc: "Geniş ve konforlu odalarımızda ailenizle keyifli bir tatil geçirin.",
  },
];

const HeroSection = styled(Box)<{ bg: string }>(({ theme, bg }) => ({
  height: "100vh",
  backgroundImage: `url('${bg}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  position: "relative",
  transition: "background-image 1s cubic-bezier(.4,0,.2,1)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: "1.1rem",
  marginTop: theme.spacing(2),
}));

const sections = [
  { id: "hero", label: "Ana Sayfa" },
  { id: "about", label: "Hakkımızda" },
  { id: "rooms", label: "Odalarımız" },
  { id: "contact", label: "İletişim" },
  { id: "rezervasyon", label: "Rezervasyon", path: "/rezervasyon" },
];

const reviews = [
  {
    name: "Ahmet Y.",
    rating: 5,
    date: "2 hafta önce",
    comment: "Harika bir tatil deneyimi yaşadık. Denize sıfır konumu, temiz odaları ve güler yüzlü personeli ile kesinlikle tavsiye ediyorum.",
    image: "/kapak1.jpg"
  },
  {
    name: "Ayşe K.",
    rating: 5,
    date: "1 ay önce",
    comment: "Ailemizle birlikte muhteşem bir tatil yaptık. Özellikle plajı ve odaların temizliği çok etkileyiciydi.",
    image: "/kapak2.jpg"
  },
  {
    name: "Mehmet S.",
    rating: 5,
    date: "2 ay önce",
    comment: "Personel çok ilgili ve yardımsever. Odalar geniş ve temiz. Kesinlikle tekrar geleceğiz.",
    image: "/kapak3.jpg"
  },
  {
    name: "Zeynep A.",
    rating: 5,
    date: "3 ay önce",
    comment: "Denize sıfır konumu muhteşem. Her sabah deniz manzarasıyla uyanmak harika bir deneyimdi.",
    image: "/kapak1.jpg"
  },
  {
    name: "Can B.",
    rating: 5,
    date: "4 ay önce",
    comment: "Çocuklarımızla birlikte çok keyifli bir tatil yaptık. Plaj güvenli ve temiz, personel çok ilgili.",
    image: "/kapak2.jpg"
  },
  {
    name: "Elif M.",
    rating: 5,
    date: "5 ay önce",
    comment: "Odalar çok ferah ve temiz. Kahvaltı çeşitliliği muhteşem. Kesinlikle tavsiye ediyorum.",
    image: "/kapak3.jpg"
  },
  {
    name: "Burak K.",
    rating: 5,
    date: "6 ay önce",
    comment: "Huzurlu ve sakin bir tatil için ideal bir yer. Deniz manzarası ve temiz plajı ile mükemmel.",
    image: "/kapak1.jpg"
  },
  {
    name: "Selin T.",
    rating: 5,
    date: "7 ay önce",
    comment: "Personel çok profesyonel ve yardımsever. Odaların temizliği ve konforu çok iyi.",
    image: "/kapak2.jpg"
  },
  {
    name: "Deniz Y.",
    rating: 5,
    date: "8 ay önce",
    comment: "Ailemizle birlikte harika bir tatil deneyimi yaşadık. Özellikle plajı ve odaların konumu çok iyi.",
    image: "/kapak3.jpg"
  }
];

const StyledLink = styled('a')({
  color: 'rgba(255,255,255,0.7)',
  textDecoration: 'none',
  transition: 'color 0.2s',
  '&:hover': { color: '#d4af37' }
});

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 3) % reviews.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const drawer = (
    <List>
      {sections.map((section) => (
        <ListItem
          key={section.id}
          component={section.path ? Link : "div"}
          href={section.path}
          onClick={() => {
            if (!section.path) {
              handleScroll(section.id);
            }
            setDrawerOpen(false);
          }}
        >
          <ListItemText primary={section.label} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <MainLayout>
      <Head>
        <title>Turgut Apart Otel</title>
        <meta name="description" content="Lüks ve konforlu konaklama deneyimi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/siyah_logo.png" type="image/png" />
      </Head>

      <Box>
        {/* Hero Section */}
        <HeroSection id="hero" bg={heroSlides[slide].image}>
          <Container>
            <Box sx={{ position: "relative", zIndex: 1, color: "white" }}>
              <motion.div
                key={slide}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: isMobile ? "2.5rem" : "4rem",
                    fontWeight: "bold",
                    mb: 2,
                    fontFamily: montserrat.style.fontFamily,
                    letterSpacing: 1,
                  }}
                >
                  {heroSlides[slide].title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    maxWidth: "600px",
                    fontFamily: montserrat.style.fontFamily,
                    fontWeight: 400,
                    fontSize: isMobile ? "1.1rem" : "1.5rem",
                    letterSpacing: 0.5,
                  }}
                >
                  {heroSlides[slide].desc}
                </Typography>
                <Link 
                  href="https://turgut-apart-otel.hmshotel.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <StyledButton 
                    variant="contained" 
                    sx={{ 
                      bgcolor: '#d4af37',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
                      '&:hover': {
                        bgcolor: '#c19b2e',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 25px rgba(212,175,55,0.4)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Rezervasyon Yap
                  </StyledButton>
                </Link>
              </motion.div>
            </Box>
            <Image
              src={heroSlides[slide].image}
              alt={heroSlides[slide].title}
              fill
              priority
              style={{
                objectFit: 'cover',
                zIndex: 0,
              }}
            />
          </Container>
        </HeroSection>

        {/* About Section */}
        <Section
          id="about"
          sx={{
            bgcolor: 'transparent',
            position: 'relative',
            minHeight: '100vh',
            py: { xs: 10, md: 14 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Background image with blur and overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              backgroundImage: "url('/kapak2.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(6px) brightness(0.7)',
              opacity: 0.85,
            }}
          />
          <Container sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ textAlign: "center", color: 'white', maxWidth: 800, mx: 'auto', p: { xs: 2, md: 4 }, borderRadius: 3, backdropFilter: 'blur(2px)', mb: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Typography 
                  variant="h2" 
                  sx={{ 
                    mb: 3, 
                    fontWeight: 700, 
                    fontFamily: 'Montserrat, Poppins, Arial',
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -10,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 80,
                      height: 3,
                      background: '#d4af37',
                    }
                  }}
                >
                  Hakkımızda
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: "1.2rem", 
                    mb: 4, 
                    fontWeight: 400,
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.9)',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  Turgut Apart Otel, konuklarına en üst düzey konfor ve hizmet sunmayı hedefleyen, modern mimarisi ve sıcak atmosferiyle öne çıkan bir işletmedir. Denize sıfır konumu ve özel plajıyla unutulmaz bir tatil deneyimi sunuyoruz.
                </Typography>
              </motion.div>
            </Box>

            {/* Google Reviews Section */}
            <Box sx={{ mt: 8 }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  textAlign: "center", 
                  mb: 6, 
                  fontWeight: 700, 
                  color: 'white',
                  fontFamily: 'Montserrat, Poppins, Arial',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 80,
                    height: 3,
                    background: '#d4af37',
                  }
                }}
              >
                Misafir Yorumları
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: '1fr 1fr',
                    md: '1fr 1fr 1fr',
                  },
                  gap: 4,
                  mt: 4,
                  position: 'relative',
                  minHeight: '200px',
                }}
              >
                {[0, 1, 2].map((offset) => {
                  const review = reviews[(currentReviewIndex + offset) % reviews.length];
                  return (
                    <motion.div
                      key={`${currentReviewIndex}-${offset}`}
                      initial={{ 
                        opacity: 0,
                        x: offset === 0 ? -100 : offset === 2 ? 100 : 0,
                        y: offset === 1 ? -50 : 0,
                        scale: 0.8,
                        rotateY: offset === 0 ? -45 : offset === 2 ? 45 : 0
                      }}
                      animate={{ 
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        rotateY: 0
                      }}
                      exit={{ 
                        opacity: 0,
                        x: offset === 0 ? -100 : offset === 2 ? 100 : 0,
                        y: offset === 1 ? 50 : 0,
                        scale: 0.8,
                        rotateY: offset === 0 ? -45 : offset === 2 ? 45 : 0
                      }}
                      transition={{ 
                        duration: 0.8,
                        ease: "easeOut",
                        delay: offset * 0.2
                      }}
                      style={{
                        position: 'relative',
                        perspective: '1000px',
                        height: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: 3,
                          p: 2.5,
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          border: '1px solid rgba(255,255,255,0.1)',
                          transition: 'all 0.3s ease',
                          transformStyle: 'preserve-3d',
                          '&:hover': {
                            transform: 'translateY(-5px) scale(1.02)',
                            bgcolor: 'rgba(255,255,255,0.15)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            border: '1px solid rgba(212,175,55,0.3)',
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + offset * 0.2 }}
                          >
                            <Image
                              src={review.image}
                              alt={review.name}
                              width={45}
                              height={45}
                              style={{
                                width: 45,
                                height: 45,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                marginRight: 16,
                                border: '2px solid #d4af37',
                                boxShadow: '0 4px 12px rgba(212,175,55,0.3)'
                              }}
                              loading="lazy"
                            />
                          </motion.div>
                          <Box>
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + offset * 0.2 }}
                            >
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white', fontSize: '0.95rem' }}>
                                {review.name}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                                {review.date}
                              </Typography>
                            </motion.div>
                          </Box>
                        </Box>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + offset * 0.2 }}
                        >
                          <Box sx={{ display: 'flex', mb: 1.5 }}>
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.6 + (i * 0.1) + offset * 0.2 }}
                              >
                                <StarIcon
                                  sx={{
                                    color: i < review.rating ? '#d4af37' : 'rgba(255,255,255,0.3)',
                                    fontSize: 18,
                                    filter: 'drop-shadow(0 2px 4px rgba(212,175,55,0.3))'
                                  }}
                                />
                              </motion.div>
                            ))}
                          </Box>
                        </motion.div>
                        <Box sx={{ position: 'relative', flex: 1 }}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 + offset * 0.2 }}
                          >
                            <FormatQuoteIcon
                              sx={{
                                position: 'absolute',
                                top: -8,
                                left: -8,
                                color: 'rgba(212,175,55,0.2)',
                                fontSize: 32,
                                transform: 'rotate(180deg)'
                              }}
                            />
                            <Typography
                              variant="body1"
                              sx={{
                                color: 'rgba(255,255,255,0.9)',
                                fontStyle: 'italic',
                                position: 'relative',
                                zIndex: 1,
                                pl: 2,
                                fontSize: '0.9rem',
                                lineHeight: 1.5,
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                              }}
                            >
                              {review.comment}
                            </Typography>
                          </motion.div>
                        </Box>
                      </Box>
                    </motion.div>
                  );
                })}
              </Box>
            </Box>
          </Container>
        </Section>

        {/* Rooms Section */}
        <Section 
          id="rooms" 
          sx={{ 
            position: 'relative',
            overflow: 'hidden',
            minHeight: '100vh',
            py: { xs: 10, md: 14 },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,250,250,0.95) 100%)',
              zIndex: 0,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url("/pattern.png")',
              opacity: 0.05,
              zIndex: 0,
              animation: 'patternMove 20s linear infinite',
            },
          }}
        >
          <Container sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  textAlign: "center", 
                  mb: 6, 
                  fontWeight: 700, 
                  color: '#1a1a1a', 
                  fontFamily: 'Montserrat, Arial',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 80,
                    height: 3,
                    background: '#d4af37',
                  }
                }}
              >
                Odalarımız
              </Typography>
            </motion.div>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                gap: 4,
                justifyContent: 'center',
              }}
            >
              {[
                {
                  id: 1,
                  image: '/kapak1.jpg',
                  title: 'Deluxe Oda',
                  desc: 'Deniz manzaralı, konforlu ve modern tasarımlı deluxe oda.',
                  price: '2.200 TL',
                  features: [
                    { icon: <PeopleIcon sx={{ fontSize: 20 }} />, label: '2 Kişilik' },
                    { icon: <KingBedIcon sx={{ fontSize: 20 }} />, label: '1 Yatak' },
                    { icon: <SquareFootIcon sx={{ fontSize: 20 }} />, label: '35 m²' },
                    { icon: <CheckIcon sx={{ fontSize: 20 }} />, label: 'WiFi' },
                    { icon: <CheckIcon sx={{ fontSize: 20 }} />, label: 'Klima' },
                  ],
                  tag: 'En Çok Tercih Edilen',
                },
                {
                  id: 2,
                  image: '/kapak2.jpg',
                  title: 'Aile Odası',
                  desc: 'Geniş aileler için ferah ve kullanışlı oda.',
                  price: '4.200 TL',
                  features: [
                    { icon: <PeopleIcon sx={{ fontSize: 20 }} />, label: '6 Kişilik' },
                    { icon: <KingBedIcon sx={{ fontSize: 20 }} />, label: '3 Yatak' },
                    { icon: <SquareFootIcon sx={{ fontSize: 20 }} />, label: '70 m²' },
                    { icon: <CheckIcon sx={{ fontSize: 20 }} />, label: 'WiFi' },
                    { icon: <CheckIcon sx={{ fontSize: 20 }} />, label: 'Klima' },
                    { icon: <CheckIcon sx={{ fontSize: 20 }} />, label: 'Mutfak' },
                  ],
                  tag: 'Aileye Uygun',
                },
                {
                  id: 3,
                  image: '/kapak3.jpg',
                  title: 'Deluxe Oda',
                  desc: 'Modern ve rahat, deniz manzaralı deluxe oda.',
                  price: '2.200 TL',
                  features: [
                    { icon: <PeopleIcon sx={{ fontSize: 20 }} />, label: '2 Kişilik' },
                    { icon: <KingBedIcon sx={{ fontSize: 20 }} />, label: '1 Yatak' },
                    { icon: <SquareFootIcon sx={{ fontSize: 20 }} />, label: '35 m²' },
                    { icon: <CheckIcon sx={{ fontSize: 20 }} />, label: 'WiFi' },
                    { icon: <CheckIcon sx={{ fontSize: 20 }} />, label: 'Klima' },
                  ],
                  tag: 'En Çok Tercih Edilen',
                },
              ].map((room, idx) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  style={{ height: '100%' }}
                >
                  <Box
                    sx={{
                      bgcolor: 'white',
                      borderRadius: 4,
                      boxShadow: 3,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: 420,
                      height: '100%',
                      position: 'relative',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
                    }}
                  >
                    <Image
                      src={room.image}
                      alt={room.title}
                      width={400}
                      height={200}
                      style={{ 
                        width: '100%', 
                        height: 200, 
                        objectFit: 'cover' 
                      }}
                      loading="lazy"
                    />
                    {room.tag && (
                      <Box sx={{ position: 'absolute', top: 16, left: 16, bgcolor: 'secondary.main', color: 'white', px: 2, py: 0.5, borderRadius: 2, fontWeight: 700, fontSize: 14, boxShadow: 2 }}>
                        {room.tag}
                      </Box>
                    )}
                    <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, color: '#1a237e', fontFamily: 'Montserrat, Arial' }}>
                          {room.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: 16 }}>
                          {room.desc}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {room.features.map((f, i) => (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f3f6f9', color: '#1a237e', borderRadius: 2, px: 1.5, py: 0.5, fontSize: 14, fontWeight: 500, gap: 0.5 }}>
                              {f.icon} {f.label}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                        <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 700, fontSize: 20 }}>
                          {room.price}
                        </Typography>
                        <Link 
                          href="https://turgut-apart-otel.hmshotel.net/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none' }}
                        >
                          <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ fontWeight: 700, borderRadius: 2, px: 3, py: 1, boxShadow: 2 }}
                          >
                            Rezervasyon Yap
                          </Button>
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Container>
        </Section>

        {/* Footer with Contact */}
        <Box
          component="footer"
          sx={{
            bgcolor: '#1a1a1a',
            color: 'white',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)',
            }
          }}
        >
          {/* Map Section */}
          <Box sx={{ height: { xs: '300px', md: '400px' }, position: 'relative' }}>
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Turgut%20Apart%20Otel%20Palamutb%C3%BCk%C3%BC,%20Cumal%C4%B1,%20palamutb%C3%BCk%C3%BC%20sokak%20no:80,%2048900%20Dat%C3%A7a/Mu%C4%9Fla+(Turgut%20Apart%20Otel%20Palamutb%C3%BCk%C3%BC)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>

          {/* Footer Content */}
          <Container sx={{ py: 6 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  md: '2fr 1fr 1fr 1fr',
                },
                gap: 4,
              }}
            >
              {/* Logo and Description */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: isMobile ? 1 : 2,
                mb: isMobile ? 2 : 0
              }}>
                <Box sx={{ mb: isMobile ? 1 : 2 }}>
                  <Image
                    src="/krem_logo.png"
                    alt="Turgut Apart Otel Logo"
                    width={isMobile ? 50 : 180}
                    height={isMobile ? 20 : 60}
                    style={{ 
                      objectFit: 'contain',
                      maxWidth: '100%',
                      height: 'auto'
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(255,255,255,0.7)', 
                  mb: isMobile ? 1 : 2,
                  fontSize: isMobile ? '0.875rem' : '1rem'
                }}>
                  Turgut Apart Otel, konuklarına en üst düzey konfor ve hizmet sunmayı hedefleyen, modern mimarisi ve sıcak atmosferiyle öne çıkan bir işletmedir.
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1,
                  justifyContent: isMobile ? 'flex-start' : 'flex-start'
                }}>
                  <IconButton
                    component="a"
                    href="https://www.facebook.com/turgutapartotel"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'white', '&:hover': { color: '#d4af37' } }}
                  >
                    <FacebookIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="https://www.instagram.com/turgutapartotel"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'white', '&:hover': { color: '#d4af37' } }}
                  >
                    <InstagramIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="https://wa.me/905306248048"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'white', '&:hover': { color: '#d4af37' } }}
                  >
                    <WhatsAppIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Quick Links */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#d4af37' }}>
                  Hızlı Linkler
                </Typography>
                <List sx={{ p: 0 }}>
                  {[
                    { label: 'Ana Sayfa', href: '/' },
                    { label: 'Hakkımızda', href: '/#about' },
                    { label: 'Odalarımız', href: '/#rooms' },
                  ].map((link) => (
                    <ListItem key={link.label} sx={{ p: 0, mb: 1 }}>
                      <Link href={link.href} passHref legacyBehavior>
                        <StyledLink>
                          {link.label}
                        </StyledLink>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Contact Info */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#d4af37' }}>
                  İletişim
                </Typography>
                <List sx={{ p: 0 }}>
                  <ListItem sx={{ p: 0, mb: 1, display: 'flex', alignItems: 'flex-start' }}>
                    <LocationOnIcon sx={{ mr: 1, color: '#d4af37', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Palamutbükü Sokak No:80, Cumalı, 48900 Datça/Muğla
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ p: 0, mb: 1, display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon sx={{ mr: 1, color: '#d4af37', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      +90 530 624 80 48
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ p: 0, mb: 1, display: 'flex', alignItems: 'center' }}>
                    <EmailIcon sx={{ mr: 1, color: '#d4af37', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      info@turgutapartotel.com
                    </Typography>
                  </ListItem>
                </List>
              </Box>

              {/* Rezervasyon */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#d4af37' }}>
                  Rezervasyon
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                  Hemen rezervasyon yapın, unutulmaz bir tatil deneyimi sizi bekliyor.
                </Typography>
                <Button
                  component="a"
                  href="https://turgut-apart-otel.hmshotel.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  sx={{
                    bgcolor: '#d4af37',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#c19b2e',
                    },
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                  }}
                >
                  Rezervasyon Yap
                </Button>
              </Box>
            </Box>

            {/* Copyright */}
            <Box
              sx={{
                mt: 6,
                pt: 3,
                borderTop: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center',
              }}
            >
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                © {new Date().getFullYear()} Turgut Apart Otel. Tüm hakları saklıdır.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </MainLayout>
  );
}
