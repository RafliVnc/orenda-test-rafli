import { Typography, Container } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Oops! (404)
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Sorry, an unexpected error has occurred
      </Typography>
      <Typography variant="body1">
        Not Found
      </Typography>
    </Container>
  );
};

export default NotFoundPage;
