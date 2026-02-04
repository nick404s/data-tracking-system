import React, { useState } from  'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { DataGrid } from '@mui/x-data-grid';
import Alert from '@mui/material/Alert';
import { bathroomValidationSchema } from './household-validation';
import { bathroomTypeValues, bathroomState, addFullBathroom, addHalfBathroom } from './household-slice';

const columns = [
    {
        field: 'ordinal',
        headerName: 'Bathroom #',
        flex: 1,
    },
    {
        field: 'bathroomType',
        headerName: 'Bathroom Type',
        flex: 1,
        renderCell: ({ value }) => (value === bathroomTypeValues.FULL_BATHROOM) ? 'Full Bathroom' : 'Half Bathroom',
    },
    {
        field: 'primary',
        headerName: 'Primary',
        flex: 1,
        renderCell: ({ value }) => (value) ? 'Yes' : 'No',
    },
];

const AddBathroom = props => {

    const { stepChangeFunction } = props;

    const dispatch = useDispatch();
    const bathroomData = useSelector(state => state.household.data.bathrooms);
    const primarySelected = useSelector(state => state.household.primaryBathroomSelected);

    const [showAddBathroomTabs, setShowAddBathroomTabs] = useState((bathroomData?.length > 0) ? false : true);
    const [bathroomType, setBathroomType] = useState(bathroomTypeValues.FULL_BATHROOM);
    const [showPrimaryAlert, setShowPrimaryAlert] = useState(false);

    const formik = useFormik({
        initialValues: bathroomState,
        validationSchema: bathroomValidationSchema,
        onSubmit: (values, { resetForm }) => {
            switch(bathroomType){
                case bathroomTypeValues.FULL_BATHROOM: 
                    dispatch(addFullBathroom(values));
                    break;
                case bathroomTypeValues.HALF_BATHROOM: 
                    dispatch(addHalfBathroom(values));
                    break;
                default:
                    console.error('Unknown bathroom type.');
                    break;    
            }
            setShowAddBathroomTabs(false);
            resetForm();
        },
    });

    const handleTabChange = (event, newValue) => {
        setBathroomType(newValue);
    };

    const handleShowPrimaryAlert = (show) => {
        setShowPrimaryAlert(show);
    };    

    const AddBathroomButtons = () => (
        <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <Button 
                    color="primary" 
                    variant="outlined" 
                    sx={{ marginRight: '1.0rem' }} 
                    onClick={() => setShowAddBathroomTabs(false)}>
                    Cancel
                </Button>
                <Button 
                    color="primary" 
                    variant="contained" 
                    type="submit">
                    Save Bathroom
                </Button>
            </Grid>
        </Grid>
    );

    // if error is already showing and user has entered primary bathroom, hide alert.
    if(showPrimaryAlert && primarySelected){
        handleShowPrimaryAlert(false);
    }
    
    return(
        <Container maxWidth="md">
            { (showPrimaryAlert) &&
                <Alert severity="error" sx={{ marginBottom: '1.0rem' }}>
                    A <span className="text-bold">Primary</span> full bathroom must be added and/or selected.
                </Alert>
            }
            <form onSubmit={formik.handleSubmit}>
                {
                    (showAddBathroomTabs) 
                        ? 
                            <TabContext value={bathroomType}>
                                <Tabs value={bathroomType} onChange={handleTabChange}>
                                    <Tab value={bathroomTypeValues.FULL_BATHROOM} label="Full Bathroom" />
                                    <Tab value={bathroomTypeValues.HALF_BATHROOM} label="Half Bathroom" />
                                </Tabs>
                                <TabPanel value={bathroomTypeValues.FULL_BATHROOM} sx={{ padding: 0 }}>
                                    <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="sinkCount"
                                                name="fullBathroom.sinkCount"
                                                label="Sinks"
                                                size="small"
                                                variant="outlined"
                                                type="number"
                                                fullWidth
                                                value={formik.values.fullBathroom?.sinkCount}
                                                onChange={formik.handleChange}
                                                error={formik.touched.fullBathroom?.sinkCount && Boolean(formik.errors.fullBathroom?.sinkCount)}
                                                helperText={formik.touched.fullBathroom?.sinkCount && formik.errors.fullBathroom?.sinkCount}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="commodeCount"
                                                name="fullBathroom.commodeCount"
                                                label="Commodes"
                                                size="small"
                                                variant="outlined"
                                                type="number"
                                                fullWidth
                                                value={formik.values.fullBathroom?.commodeCount}
                                                onChange={formik.handleChange}
                                                error={formik.touched.fullBathroom?.commodeCount && Boolean(formik.errors.fullBathroom?.commodeCount)}
                                                helperText={formik.touched.fullBathroom?.commodeCount && formik.errors.fullBathroom?.commodeCount}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="bidetCount"
                                                name="fullBathroom.bidetCount"
                                                label="Bidets"
                                                size="small"
                                                variant="outlined"
                                                type="number"
                                                fullWidth
                                                value={formik.values.fullBathroom?.bidetCount}
                                                onChange={formik.handleChange}
                                                error={formik.touched.fullBathroom?.bidetCount && Boolean(formik.errors.fullBathroom?.bidetCount)}
                                                helperText={formik.touched.fullBathroom?.bidetCount && formik.errors.fullBathroom?.bidetCount}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="showerCount"
                                                name="fullBathroom.showerCount"
                                                label="Showers"
                                                size="small"
                                                variant="outlined"
                                                type="number"
                                                fullWidth
                                                value={formik.values.fullBathroom?.showerCount}
                                                onChange={formik.handleChange}
                                                error={formik.touched.fullBathroom?.showerCount && Boolean(formik.errors.fullBathroom?.showerCount)}
                                                helperText={formik.touched.fullBathroom?.showerCount && formik.errors.fullBathroom?.showerCount}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="bathtubCount"
                                                name="fullBathroom.bathtubCount"
                                                label="Bathtubs"
                                                size="small"
                                                variant="outlined"
                                                type="number"
                                                fullWidth
                                                value={formik.values.fullBathroom?.bathtubCount}
                                                onChange={formik.handleChange}
                                                error={formik.touched.fullBathroom?.bathtubCount && Boolean(formik.errors.fullBathroom?.bathtubCount)}
                                                helperText={formik.touched.fullBathroom?.bathtubCount && formik.errors.fullBathroom?.bathtubCount}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="tubShowerCount"
                                                name="fullBathroom.tubShowerCount"
                                                label="Tub/Showers"
                                                size="small"
                                                variant="outlined"
                                                type="number"
                                                fullWidth
                                                value={formik.values.fullBathroom?.tubShowerCount}
                                                onChange={formik.handleChange}
                                                error={formik.touched.fullBathroom?.tubShowerCount && Boolean(formik.errors.fullBathroom?.tubShowerCount)}
                                                helperText={formik.touched.fullBathroom?.tubShowerCount && formik.errors.fullBathroom?.tubShowerCount}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
                                        <Grid item xs={12}>
                                            <FormGroup sx={{ display: 'table' }}>
                                                <FormControlLabel control={
                                                    <Checkbox 
                                                    id="primary"
                                                    name="fullBathroom.primary"
                                                    value={formik.values.fullBathroom?.primary}
                                                    onChange={formik.handleChange}
                                                    disabled={primarySelected}/>
                                                    } label={ (primarySelected) ? "Primary bathroom already selected" : "Primary bathroom" } />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                    <AddBathroomButtons />
                                </TabPanel>
                                <TabPanel value={bathroomTypeValues.HALF_BATHROOM} sx={{ padding: 0 }}>
                                    <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="sinkCount"
                                                name="halfBathroom.sinkCount"
                                                label="Sinks"
                                                size="small"
                                                variant="outlined"
                                                type="number"
                                                fullWidth
                                                value={formik.values.halfBathroom?.sinkCount}
                                                onChange={formik.handleChange}
                                                error={formik.touched.halfBathroom?.sinkCount && Boolean(formik.errors.halfBathroom?.sinkCount)}
                                                helperText={formik.touched.halfBathroom?.sinkCount && formik.errors.halfBathroom?.sinkCount}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="commodeCount"
                                                name="halfBathroom.commodeCount"
                                                label="Commodes"
                                                size="small"
                                                variant="outlined"
                                                type="number"
                                                fullWidth
                                                value={formik.values.halfBathroom?.commodeCount}
                                                onChange={formik.handleChange}
                                                error={formik.touched.halfBathroom?.commodeCount && Boolean(formik.errors.halfBathroom?.commodeCount)}
                                                helperText={formik.touched.halfBathroom?.commodeCount && formik.errors.halfBathroom?.commodeCount}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="bidetCount"
                                                name="halfBathroom.bidetCount"
                                                label="Bidets"
                                                size="small"
                                                variant="outlined"
                                                type="number"
                                                fullWidth
                                                value={formik.values.halfBathroom?.bidetCount}
                                                onChange={formik.handleChange}
                                                error={formik.touched.halfBathroom?.bidetCount && Boolean(formik.errors.halfBathroom?.bidetCount)}
                                                helperText={formik.touched.halfBathroom?.bidetCount && formik.errors.halfBathroom?.bidetCount}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="name"
                                                name="halfBathroom.name"
                                                label="Bathroom Name (optional)"
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                value={formik.values.halfBathroom?.name}
                                                onChange={formik.handleChange}
                                                error={formik.touched.halfBathroom?.name && Boolean(formik.errors.halfBathroom?.name)}
                                                helperText={formik.touched.halfBathroom?.name && formik.errors.halfBathroom?.name}/>
                                        </Grid>
                                    </Grid>
                                    <AddBathroomButtons />
                                </TabPanel>
                            </TabContext>
                        : 
                            <>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <DataGrid
                                            rows={(bathroomData) ? bathroomData : []}
                                            columns={columns}
                                            autoHeight
                                            getRowId={row => row.ordinal}/>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sx={{marginTop: '1.0rem'}}>
                                    <Grid container justifyContent="flex-end">
                                        <Button 
                                            color="primary" 
                                            variant="contained" 
                                            onClick={() => {
                                                    setBathroomType(bathroomTypeValues.FULL_BATHROOM); 
                                                    setShowAddBathroomTabs(true);
                                                }
                                            }>
                                            Add Bathroom
                                        </Button>
                                    </Grid>
                                </Grid>
                            </>
                }
                {
                    (!showAddBathroomTabs) && 
                        <Grid container spacing={2} sx={{marginTop: '0.5rem'}} alignItems="center">
                            <Grid item xs={12}>
                                <Grid container justifyContent="space-between">
                                    <Button color="primary" variant="contained" onClick={() => {
                                            stepChangeFunction(-1);
                                        }
                                    }>
                                        Previous
                                    </Button>
                                    <Button color="primary" variant="contained" 
                                        onClick={() => {
                                                if(primarySelected){
                                                    handleShowPrimaryAlert(false);
                                                    stepChangeFunction(1);
                                                }
                                                else{
                                                    handleShowPrimaryAlert(true);
                                                }
                                            }
                                        }>
                                        Next
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                }
            </form>
        </Container>
    );
};

export default AddBathroom;