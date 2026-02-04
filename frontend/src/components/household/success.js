import { Link } from "react-router-dom";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Success = () => {
    return (
        <Container maxWidth="md">
            <Typography 
                variant="h4" 
                sx={{fontWeight: 300, marginBottom: '1.0rem'}}
                align="center"
                gutterBottom>
                Submission Saved Successfully! 
            </Typography>
            <Typography 
                variant="body1" 
                align="center"
                sx={{marginBottom: '1.0rem'}}
                gutterBottom>
                Thank you for providing your household information to Hemkraft.
            </Typography>
            <Box textAlign="center">
                <Link to="/" className="link-button">
                    <Button variant="contained">Back to the main menu</Button>
                </Link>
            </Box>
        </Container>
    );
};

export default Success;