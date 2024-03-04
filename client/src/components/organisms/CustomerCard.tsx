import { Card, CardContent, Grid, Typography, Stack, Divider } from "@mui/material";
import CustomerForm from "../molecules/CustomerForm";
import Button from "../atoms/Button";

const CustomerCard = (props: any) => {
    const { customers, error, setCustomers, act, handleAddCustomer, handleEditCustomer, navigate } = props;

    return (
        <Card sx={{ minWidth: 275, marginRight: 5, height: "77vh", marginTop: 2, p: 1, position: 'relative' }}>
            <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                    Customer Information
                </Typography>
                <Grid container>
                    <CustomerForm customers={customers} error={error} setCustomers={setCustomers} />
                </Grid>
            </CardContent>
            <Grid item xs={12} sx={{ position: 'absolute', bottom: '100px', right: '100px', width: "85%" }}>
                <Divider />
            </Grid>
            <Stack direction="row" spacing={2} sx={{ position: 'absolute', bottom: '20px', right: '20px' }}>
                <Button variant="outlined" onClick={() => navigate("/")}>Cancel</Button>
                <Button variant="contained" onClick={act === 'add' ? handleAddCustomer : handleEditCustomer} color="primary">
                    {act === 'add' ? "Create New" : "Update"}
                </Button>
            </Stack>
        </Card>
    );
};

export default CustomerCard;
