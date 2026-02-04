import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const LargeButton = styled(Button)(({ theme }) => ({
    padding: '0.5rem 2.0rem'
}));

const Home = () => {
    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography 
                    variant="h5" 
                    sx={{fontWeight: 300}} 
                    align="center" 
                    gutterBottom>
                    Keep track of your household data with
                </Typography>
                <Typography 
                    variant="h3" 
                    align="center" 
                    sx={{fontWeight: 700, color: blue[700]}} 
                    gutterBottom>
                    Hemkraft!
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: '1.0rem' }}>
                <Stack spacing={2} direction="row" sx={{ justifyContent: 'center' }}>
                    <Link to="/add-household" className="link-button">
                        <LargeButton variant="contained" size="large">Enter Data</LargeButton>
                    </Link>
                    <Link to="/view-reports" className="link-button">
                        <LargeButton variant="outlined" size="large">View Reports</LargeButton>
                    </Link>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default Home;