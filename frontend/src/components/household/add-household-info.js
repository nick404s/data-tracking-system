import React, { useState } from  'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';

import { householdInfoValidationSchema } from './household-validation';
import { postalCodeCheck, phoneCheck, updateStateValues, validPostalCode, showPhone, phoneInitialState } from './household-slice';

const AddHouseholdInfo = props => {
    
    const { stepChangeFunction, intialValues } = props;

    const dispatch = useDispatch();
    const isValidPostalCode = useSelector(state => state.household.validPostalCode);
    const shouldShowPhone = useSelector(state => state.household.showPhone);
    const postalCodeDetail = useSelector(state => state.household.postalCodeDetail);

    const formik = useFormik({
        initialValues: intialValues,
        validationSchema: householdInfoValidationSchema,
        onSubmit: (values) => {
            dispatch(phoneCheck(values.phone)).then(result => {
                if(!result.error){
                    dispatch(updateStateValues(values));
                    stepChangeFunction(1);
                }
                else{
                    formik.setErrors({ phoneError: 'Phone number is already in use. Use another number.' });
                }
            }, error => {})
        },
    });

    const [openDialog, setOpenDialog] = useState(false);

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const validatePostalCode = () => {
        dispatch(validPostalCode(false));
        formik.validateForm().then(
            result => {
                formik.setFieldTouched('postalCode', true);
                if(!result.postalCode){
                    dispatch(postalCodeCheck(formik.values.postalCode)).then(
                        result => {
                            if(!result.error){
                                handleDialogOpen();
                            }   
                            else{
                                formik.setErrors({ postalCode: 'Postal Code not found.' });
                                // formik.setFieldTouched('postalCode', true);
                            }
                        }, 
                        error => {
                            console.log(error);
                        });
                    
                }
                else{
                    dispatch(validPostalCode(false));
                }
            }, 
            error => {
                console.error(error);
            });
    };

    const [phoneState, setPhoneState] = useState(phoneInitialState);

    const handlePhoneToggleSwitch = (event, newAlignment) => {
        dispatch(showPhone(newAlignment));
        // keep phone state when toggling between yes and no.
        if(newAlignment)
        {
            // have to set and remove fields for validation to work properly.
            formik.setFieldValue('phone', phoneState);
        }
        else{
            // save phone state here.
            setPhoneState(formik.values.phone);
            // have to set and remove fields for validation to work properly.
            formik.setFieldValue('phone', undefined);
        }
    };

    return (
        <Container maxWidth="md">
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Postal Code"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You entered {postalCodeDetail?.postalcode} which is 
                        in {postalCodeDetail?.city}, {postalCodeDetail?.astate}. 
                        Is this correct?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>No</Button>
                    <Button onClick={() => {handleDialogClose(); dispatch(validPostalCode(true));}} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <form onSubmit={formik.handleSubmit}>
                {
                    (!isValidPostalCode) && 
                        <Typography 
                            variant="body1" 
                            sx={{fontWeight: 300, marginBottom: '1.0rem'}}
                            gutterBottom>
                            Enter your 5 digit postal code and then click the check button to continue.
                        </Typography>
                }
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="postalCode"
                            name="postalCode"
                            label="Postal Code"
                            size="small"
                            variant="outlined"
                            fullWidth
                            value={formik.values.postalCode}
                            onChange={formik.handleChange}
                            error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                            helperText={formik.touched.postalCode && formik.errors.postalCode}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Button color="primary" variant="contained" onClick={validatePostalCode}>
                            Check
                        </Button>
                    </Grid>
                    {
                        (isValidPostalCode) &&
                        <Grid item xs={12}>
                            <Typography 
                                variant="body1" 
                                sx={{fontWeight: 500}}>
                                {postalCodeDetail.city}, {postalCodeDetail.astate}, {postalCodeDetail.postalcode}
                            </Typography>
                        </Grid>
                    }
                </Grid>
                {
                    (isValidPostalCode) &&
                        <Grid container spacing={2} sx={{marginTop: '0.5rem'}} alignItems="center">
                            <Grid item xs={6}>
                                <Typography 
                                    variant="body1" 
                                    sx={{fontWeight: 300}} 
                                    gutterBottom>
                                    Would you like to enter a phone number?
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={shouldShowPhone}
                                    exclusive
                                    onChange={handlePhoneToggleSwitch}
                                    aria-label="Platform"
                                    size="small">
                                    <ToggleButton value={true}>Yes</ToggleButton>
                                    <ToggleButton value={false}>No</ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            {
                                (formik.errors.phoneError && Boolean(formik.submitCount > 0)) &&
                                <Grid item xs={12}>
                                    <InputLabel 
                                        error={true}
                                        sx={{fontWeight: 500}}>
                                        {formik.errors.phoneError}
                                    </InputLabel>
                                </Grid>
                            }
                            {
                                (shouldShowPhone) &&
                                    <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="areaCode"
                                                name="phone.areaCode"
                                                label="Area Code"
                                                size="small"
                                                variant="outlined"
                                                type="number"
                                                fullWidth
                                                value={formik.values.phone?.areaCode}
                                                onChange={formik.handleChange}
                                                error={formik.touched.phone?.areaCode && Boolean(formik.errors.phone?.areaCode)}
                                                helperText={formik.touched.phone?.areaCode && formik.errors.phone?.areaCode}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="number"
                                                name="phone.number"
                                                label="Number"
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                value={formik.values.phone?.number}
                                                onChange={formik.handleChange}
                                                error={formik.touched.phone?.number && Boolean(formik.errors.phone?.number)}
                                                helperText={formik.touched.phone?.number && formik.errors.phone?.number}/>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControl 
                                                sx={{ m: 0, minWidth: "100%" }} 
                                                size="small"
                                                error={formik.touched.phone?.type && Boolean(formik.errors.phone?.type)}>
                                                <InputLabel id="phoneType">Phone Type</InputLabel>
                                                <Select
                                                    labelId="phoneType"
                                                    id="phoneType"
                                                    name="phone.type"
                                                    label="Phone Type"
                                                    value={(formik.values.phone?.type) ? formik.values.phone.type : ''}
                                                    onChange={formik.handleChange}>
                                                    <MenuItem value="Home">Home</MenuItem>
                                                    <MenuItem value="Mobile">Mobile</MenuItem>
                                                    <MenuItem value="Work">Work</MenuItem>
                                                    <MenuItem value="Other">Other</MenuItem>
                                                </Select>
                                                <FormHelperText>{formik.touched.phone?.type && formik.errors.phone?.type}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                            }
                            <Grid item xs={12}>
                                <Typography 
                                    variant="h5" 
                                    sx={{fontWeight: 300}}>
                                    Household Information
                                </Typography>
                            </Grid>
                            <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
                                <Grid item xs={6}>
                                    <TextField
                                        id="squareFootage"
                                        name="squareFootage"
                                        label="Square Footage"
                                        size="small"
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                        value={formik.values.squareFootage}
                                        onChange={formik.handleChange}
                                        error={formik.touched.squareFootage && Boolean(formik.errors.squareFootage)}
                                        helperText={formik.touched.squareFootage && formik.errors.squareFootage}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl 
                                        sx={{ m: 0, minWidth: "100%" }} 
                                        size="small"
                                        error={formik.touched.householdType && Boolean(formik.errors.householdType)}>
                                        <InputLabel id="householdType">Household Type</InputLabel>
                                        <Select
                                            labelId="householdType"
                                            id="householdType"
                                            name="householdType"
                                            label="Household Type"
                                            value={formik.values.householdType}
                                            onChange={formik.handleChange}>
                                            <MenuItem value="House">House</MenuItem>
                                            <MenuItem value="Apartment">Apartment</MenuItem>
                                            <MenuItem value="Townhome">Townhome</MenuItem>
                                            <MenuItem value="Condominium">Condominium</MenuItem>
                                            <MenuItem value="Mobile Home">Mobile Home</MenuItem>
                                        </Select>
                                        <FormHelperText>{formik.touched.householdType && formik.errors.householdType}</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
                                <Grid item xs={6}>
                                    <TextField
                                        id="occupantCount"
                                        name="occupantCount"
                                        label="Occupants"
                                        size="small"
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                        value={formik.values.occupantCount}
                                        onChange={formik.handleChange}
                                        error={formik.touched.occupantCount && Boolean(formik.errors.occupantCount)}
                                        helperText={formik.touched.occupantCount && formik.errors.occupantCount}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="bedroomCount"
                                        name="bedroomCount"
                                        label="Bedrooms"
                                        size="small"
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                        value={formik.values.bedroomCount}
                                        onChange={formik.handleChange}
                                        error={formik.touched.bedroomCount && Boolean(formik.errors.bedroomCount)}
                                        helperText={formik.touched.bedroomCount && formik.errors.bedroomCount}/>
                                </Grid>
                            </Grid>
                        </Grid>
                }
                <Grid container spacing={2} sx={{marginTop: '0.5rem'}} alignItems="center">
                    <Grid item xs={12}>
                        <Grid container justifyContent="space-between">
                            <Button color="primary" variant="contained" onClick={() => {
                                    dispatch(updateStateValues(formik.values));
                                    stepChangeFunction(-1);
                                }
                            }>
                                Previous
                            </Button>
                            {
                                (isValidPostalCode) && 
                                <Button color="primary" variant="contained" type="submit">
                                    Next
                                </Button>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default AddHouseholdInfo;