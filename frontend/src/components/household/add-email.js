import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { updateStateValues, emailCheck } from './household-slice';

import { emailValidationSchema } from './household-validation';

const AddEmail = props => {

    const { stepChangeFunction, intialValues } = props;

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: intialValues,
        validationSchema: emailValidationSchema,
        onSubmit: (values, { setErrors }) => {
            dispatch(emailCheck(values.email)).then(
                result => {
                    if(!result.error){
                        dispatch(updateStateValues(values));
                        stepChangeFunction(1);
                    }   
                    else{
                        setErrors({ email: 'Email is already in use. Use another email.' });
                    }
                },
                error => {
                    console.log(error);
                }
            );
            // dispatch(updateStateValues(values));
            // stepChangeFunction(1);
        },
    });

    return(
        <Container maxWidth="md">
            <form onSubmit={formik.handleSubmit}>
                <Typography 
                    variant="body1" 
                    sx={{fontWeight: 300, marginBottom: '1.0rem'}}
                    gutterBottom>
                    Start by entering you email address.
                </Typography>
            
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            size="small"
                            variant="outlined"
                            fullWidth
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="flex-end">
                            <Button color="primary" variant="contained" type="submit">
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default AddEmail;