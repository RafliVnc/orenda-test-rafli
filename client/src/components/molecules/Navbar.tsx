import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function Navbar() {
  return (
    <Box sx={{ display: 'flex ' }}>
      <AppBar component="nav" sx={{ backgroundColor: 'white', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',width:"97.3%"}}>
        <Toolbar >
          {/* <h1 style={{color:"black"}}>Navbar</h1> */}
        </Toolbar>
      </AppBar>
     
    </Box>
  );
}
