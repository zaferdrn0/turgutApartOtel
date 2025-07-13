import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a237e",
      light: "#534bae",
      dark: "#000051",
    },
    secondary: {
      main: "#f57c00",
      light: "#ffad42",
      dark: "#bb4d00",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.75rem",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.25rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "8px 24px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
