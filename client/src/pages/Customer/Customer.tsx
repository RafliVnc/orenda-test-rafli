import { Button, Box, Typography, Stack, Card, CardContent } from "@mui/material"
import Sidenav from "@components/molecules/Sidenav"
import Navbar from "@components/molecules/Navbar"
import TableCustomer from "@components/organisms/TableCustomer"
import { useNavigate } from 'react-router-dom';

function Customer() {
    const navigate = useNavigate()
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, paddingTop: 11, paddingLeft: 4}}>
                    <Navbar />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }} >
                        Customer Page
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        Main Menu
                    </Typography>

                    <Card sx={{ minWidth: 275, marginRight: 5, height: "76.5vh", marginTop: 2, p: 1 }}>
                        <CardContent>
                            <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'space-between',mb:2 }}>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    All Customer
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary" onClick={() => { navigate("/add") }}
                                >
                                    + Add New Customer
                                </Button>
                            </Stack>
                            <TableCustomer />
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </>
    )
}
export default Customer