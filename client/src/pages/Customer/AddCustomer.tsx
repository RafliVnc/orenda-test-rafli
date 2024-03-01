import { Box, Typography, Card, CardContent, Stack, Grid, TextField, Button, Divider } from "@mui/material"
import Sidenav from "../../components/Sidenav"
import Navbar from "../../components/Navbar"
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

interface AddCustomerProps {
    act: string;
}

function AddCustomer(props: AddCustomerProps) {
    const navigate = useNavigate()
    const [customers, setCustomers] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    });

    const { state } = useLocation()

    useEffect(() => {
        if (state !== null) {
            const { id_cust } = state
            axios.get(`http://localhost:3000/customer/${id_cust}`)
                .then(response => {
                    setCustomers(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, []);

    const handleEditCustomer = () => {
        const { id_cust } = state
        if (!customers.name && !customers.phone && !customers.email && !customers.address) {
            alert('All fields are required.');
            return;
        }
        axios.put(`http://localhost:3000/customer/${id_cust}`, customers)
            .then(response => {
                navigate("/");
            })
            .catch(error => {
                console.error('Error adding new todo:', error);
            });
    };

    const handleAddCustomer = () => {
        if (!customers.name && !customers.phone && !customers.email && !customers.address) {
            alert('All fields are required.');
            return;
        }
        axios.post('http://localhost:3000/customer', customers)
            .then(response => {
                navigate("/");
            })
            .catch(error => {
                console.error('Error adding new todo:', error);
            });
    };

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, paddingTop: 11, paddingLeft: 4 }}>
                    <Navbar />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }} >
                        Customer Page
                    </Typography>
                    <Stack spacing={2} direction="row" >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ color: 'red', cursor: 'pointer' }}
                            onClick={() => { navigate("/") }}
                        >
                            Main Menu
                        </Typography>

                        <Typography variant="body2" color="text.secondary" >
                            {">"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            Create New Customer
                        </Typography>
                    </Stack>

                    <Card sx={{ minWidth: 275, marginRight: 5, height: "77vh", marginTop: 2, p: 1, position: 'relative' }}>
                        <CardContent>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                                Customer Information
                            </Typography>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <TextField sx={{ width: '100%' }}
                                                        id="name"
                                                        label="Customer Name"
                                                        value={customers.name}
                                                        onChange={(e) => setCustomers({ ...customers, name: e.target.value })}
                                                        type="search" />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField sx={{ width: '100%' }}
                                                        id="phone"
                                                        label="Phone Number"
                                                        value={customers.phone}
                                                        onChange={(e) => setCustomers({ ...customers, phone: e.target.value })}
                                                        type="search" />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField sx={{ width: '100%' }}
                                                        id="email"
                                                        label="Email Address"
                                                        value={customers.email}
                                                        onChange={(e) => setCustomers({ ...customers, email: e.target.value })}
                                                        type="search" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField sx={{ width: '100%', height: '100%' }}
                                                rows={4.5}
                                                multiline
                                                id="address"
                                                label="Address"
                                                value={customers.address}
                                                onChange={(e) => setCustomers({ ...customers, address: e.target.value })}
                                                type="search"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sx={{ position: 'absolute', bottom: '100px', right: '100px', width: "90%" }}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12} sx={{ textAlign: 'right', position: 'absolute', bottom: '30px', right: '30px' }}>
                                    <Button variant="outlined"
                                        onClick={() => { navigate("/") }}
                                        sx={{
                                            color: 'black',
                                            width: '200px',
                                            backgroundColor: 'white',
                                        }}>Cancel</Button>
                                    <Button variant="contained" onClick={props.act === 'add' ? handleAddCustomer : handleEditCustomer} color="primary" sx={{ marginLeft: '8px', width: '200px' }}>{props.act === 'add' ? "Create New" : "Update"}</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </>
    )
}
export default AddCustomer