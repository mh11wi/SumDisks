import { createTheme, ThemeProvider } from '@mui/material/styles';
import pink from '@mui/material/colors/pink';
import Box from '@mui/material/Box';
import ReactDisks from 'react-disks';
import MenuBar from './components/MenuBar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: pink[500],
      light: pink[100],
      dark: pink[800]
    }
  },
});

function App() {
  const disksText = [
    [-11, -22, -33, -44, -55, -66],
    [-11, -22, -33, -44, -55, -66], 
    [-11, -22, -33, -44, -55, -66], 
    [-11, -22, -33, -44, -55, -66], 
    [-11, -22, -33, -44, -55, -66],
    [-11, -22, -33, -44, -55, -66],
    [-11, -22, -33, -44, -55, -66]
  ];
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <MenuBar />
        </Box>
        <Box role="main" sx={{ flexGrow: 1, height: "calc(100% - 4rem)"}}>
          <ReactDisks 
            disksText={disksText}
            theme={theme.palette.primary}
          />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
