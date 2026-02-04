import React, { useState, useEffect } from  'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import { DataGrid } from '@mui/x-data-grid';
import { 
    applianceTypeValues, 
    applianceState,
    getAllManufacturers,
    addRefrigeratorFreezer,
    addCooker,
    addDryer,
    addWasher,
    addTv,
    refrigeratorFreezerInitialState,
    dryerInitialState,
    washerInitialState,
    cookerInitialState,
    tvInitialState
} from './household-slice';
import { applianceValidationSchema } from './household-validation';

const columns = [
    {
        field: 'ordinal',
        headerName: 'Appliance #',
        flex: 1,
    },
    {
        field: 'applianceType',
        headerName: 'Appliance Type',
        flex: 1,
        renderCell: ({ value }) => {
            switch(value){
                case applianceTypeValues.REFRIGERATOR_FREEZER.value:
                    return applianceTypeValues.REFRIGERATOR_FREEZER.name;
                case applianceTypeValues.COOKER.value:
                    return applianceTypeValues.COOKER.name;
                case applianceTypeValues.DRYER.value:
                    return applianceTypeValues.DRYER.name;
                case applianceTypeValues.WASHER.value:
                    return applianceTypeValues.WASHER.name;
                case applianceTypeValues.TV.value:
                    return applianceTypeValues.TV.name;
                default:
                    return 'UNKNOWN';
            }
        },
    },
    {
        field: 'manufacturer',
        headerName: 'Manufacturer',
        flex: 1,
    },
    {
        field: 'modelName',
        headerName: 'Model',
        flex: 1,
    },
];


const AddAppliance = props => {
    
    const { stepChangeFunction } = props;

    const dispatch = useDispatch();
    const applianceData = useSelector(state => state.household.data.appliances);
    const manufacturers = useSelector(state => state.household.manufacturers);

    const [showApplianceTable, setShowApplianceTable] = useState((applianceData?.length === 0) ? false : true);
    const [applianceType, setApplianceType] = useState(null);

    const formik = useFormik({
        initialValues: applianceState,
        validationSchema: applianceValidationSchema,
        onSubmit: (values, { resetForm, setErrors }) => {
            let hasErrors = false;
            switch(applianceType){
                case applianceTypeValues.REFRIGERATOR_FREEZER.value: 
                    dispatch(addRefrigeratorFreezer(values));
                    break;
                case applianceTypeValues.COOKER.value: 
                    dispatch(addCooker(values));
                    break;
                case applianceTypeValues.WASHER.value: 
                    dispatch(addWasher(values));
                    break;
                case applianceTypeValues.DRYER.value: 
                    dispatch(addDryer(values));
                    break;
                case applianceTypeValues.TV.value: 
                    dispatch(addTv(values));
                    break;
                default:
                    console.error('Unknown Appliance type.');
                    break;    
            }
            if(!hasErrors){
                resetForm();
                setApplianceType(null);
                setShowApplianceTable(true);
            }
        },
    });

    useEffect(() => {
        dispatch(getAllManufacturers());
    }, []);

    const handleSetApplianceType = (type) => {
        formik.setFieldValue('refrigeratorFreezer', undefined);
        formik.setFieldValue('dryer', undefined);
        formik.setFieldValue('washer', undefined);
        formik.setFieldValue('cooker', undefined);
        formik.setFieldValue('tv', undefined);

        switch(type){
            case applianceTypeValues.REFRIGERATOR_FREEZER.value: 
                formik.setFieldValue('refrigeratorFreezer', refrigeratorFreezerInitialState);
                break;
            case applianceTypeValues.COOKER.value: 
                formik.setFieldValue('cooker', cookerInitialState);
                break;
            case applianceTypeValues.WASHER.value: 
                formik.setFieldValue('washer', washerInitialState);
                break;
            case applianceTypeValues.DRYER.value: 
                formik.setFieldValue('dryer', dryerInitialState);
                break;
            case applianceTypeValues.TV.value: 
                formik.setFieldValue('tv', tvInitialState);
                break;
            default:
                console.error('Unknown Appliance type.');
                break;    
        }
        setApplianceType(type);
    };

    const AddApplianceButtons = () => (
        <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
            <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button 
                    color="primary" 
                    variant="outlined" 
                    sx={{ marginRight: '1.0rem' }} 
                    onClick={() => setShowApplianceTable(true)}>
                    Cancel
                </Button>
                <Button 
                    color="primary" 
                    variant="contained" 
                    type="submit">
                    Save Appliance
                </Button>
            </Grid>
        </Grid>
    );

    // console.log(formik);

    return(
        <Container maxWidth="md">
            <form onSubmit={formik.handleSubmit}>
                {
                    (!showApplianceTable)
                    ?
                        <>
                            <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
                                <Grid item xs={6}>
                                    <FormControl 
                                        sx={{ m: 0, minWidth: "100%" }} 
                                        size="small"
                                        error={formik.touched.applianceType && Boolean(formik.errors.applianceType)}>
                                        <InputLabel id="applianceType">Appliance Type</InputLabel>
                                        <Select
                                            labelId="applianceType"
                                            id="applianceType"
                                            name="applianceType"
                                            label="Appliance Type"
                                            value={formik.values.applianceType}
                                            onChange={e => {formik.handleChange(e); handleSetApplianceType(e.target.value);}}>
                                            <MenuItem value={applianceTypeValues.REFRIGERATOR_FREEZER.value}>{applianceTypeValues.REFRIGERATOR_FREEZER.name}</MenuItem>
                                            <MenuItem value={applianceTypeValues.COOKER.value}>{applianceTypeValues.COOKER.name}</MenuItem>
                                            <MenuItem value={applianceTypeValues.WASHER.value}>{applianceTypeValues.WASHER.name}</MenuItem>
                                            <MenuItem value={applianceTypeValues.DRYER.value}>{applianceTypeValues.DRYER.name}</MenuItem>
                                            <MenuItem value={applianceTypeValues.TV.value}>{applianceTypeValues.TV.name}</MenuItem>
                                        </Select>
                                        <FormHelperText>{formik.touched.applianceType && formik.errors.applianceType}</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        disablePortal
                                        size="small"
                                        id="manufacturer"
                                        name="manufacturer"
                                        options={manufacturers}
                                        sx={{ width: '100%' }}
                                        value={formik.values.manufacturer || null}
                                        onChange={(e, value) => { formik.setFieldValue('manufacturer', value); }}
                                        renderInput={(params) => 
                                            <TextField 
                                                {...params} 
                                                error={formik.touched.manufacturer && Boolean(formik.errors.manufacturer)} 
                                                label="Manufacturer" />
                                        }/>
                                        {
                                            (formik.touched.manufacturer && Boolean(formik.errors.manufacturer)) &&
                                                <InputLabel 
                                                    id="manufacturerError" 
                                                    error={true}
                                                    sx={{ fontSize: '0.75rem', margin: '4px 0 0 14px' }}>
                                                    {formik.errors.manufacturer}
                                                </InputLabel>
                                        }
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="modelName"
                                        name="modelName"
                                        label="Model Name (optional)"
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        value={formik.values.modelName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.modelName && Boolean(formik.errors.modelName)}
                                        helperText={formik.touched.modelName && formik.errors.modelName}/>
                                </Grid>
                                
                            </Grid>
                            
                            {
                                (applianceType === applianceTypeValues.REFRIGERATOR_FREEZER.value) &&
                                <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
                                    <Grid item xs={12}>
                                        <Typography 
                                            variant="h5" 
                                            sx={{fontWeight: 300}}>
                                            Refrigerator/Freezer
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl 
                                            sx={{ m: 0, minWidth: "100%" }} 
                                            size="small"
                                            error={formik.touched.refrigeratorFreezer?.refrigeratorFreezerType && Boolean(formik.errors.refrigeratorFreezer?.refrigeratorFreezerType)}>
                                            <InputLabel id="refrigeratorFreezerType">Refrigerator/Freezer Type</InputLabel>
                                            <Select
                                                labelId="refrigeratorFreezerType"
                                                id="refrigeratorFreezerType"
                                                name="refrigeratorFreezer.refrigeratorFreezerType"
                                                label="Refrigerator/Freezer Type"
                                                value={formik.values.refrigeratorFreezer?.refrigeratorFreezerType}
                                                onChange={formik.handleChange}>
                                                <MenuItem value="Bottom freezer refrigerator">Bottom freezer refrigerator</MenuItem>
                                                <MenuItem value="French door refrigerator">French door refrigerator</MenuItem>
                                                <MenuItem value="Side-by-side refrigerator">Side-by-side refrigerator</MenuItem>
                                                <MenuItem value="Top freezer refrigerator">Top freezer refrigerator</MenuItem>
                                                <MenuItem value="Chest freezer">Chest freezer</MenuItem>
                                                <MenuItem value="Upright freezer">Upright freezer</MenuItem>
                                            </Select>
                                            <FormHelperText>{formik.touched.refrigeratorFreezer?.refrigeratorFreezerType && formik.errors.refrigeratorFreezer?.refrigeratorFreezerType}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                    
                            }

                            {
                                (applianceType === applianceTypeValues.COOKER.value) &&
                                <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
                                    <Grid item xs={12}>
                                        <Typography 
                                            variant="h5" 
                                            sx={{fontWeight: 300}}>
                                            Cooker
                                        </Typography>
                                        {
                                            (Boolean(formik.errors.cooker) && Boolean(formik.submitCount > 0)) &&
                                                <InputLabel
                                                    id="ovenType"
                                                    error={true}
                                                    sx={{ fontSize: '0.75rem' }}>
                                                    {formik.errors.cooker}
                                                </InputLabel>
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography 
                                            variant="h6" 
                                            sx={{fontWeight: 300}}>
                                            Oven
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl 
                                            sx={{ m: 0, minWidth: "100%" }} 
                                            size="small"
                                            error={formik.touched.cooker?.ovenType && Boolean(formik.errors.cooker?.ovenType)}>
                                            <InputLabel id="ovenType">Oven Type</InputLabel>
                                            <Select
                                                labelId="ovenType"
                                                id="ovenType"
                                                name="cooker.ovenType"
                                                label="Oven Type"
                                                value={formik.values.cooker?.ovenType}
                                                onChange={formik.handleChange}>
                                                <MenuItem value="Convection">Convection</MenuItem>
                                                <MenuItem value="Conventional">Conventional</MenuItem>
                                            </Select>
                                            <FormHelperText>{formik.touched.cooker?.ovenType && formik.errors.cooker?.ovenType}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormGroup sx={{ display: 'table' }}>
                                            <Typography 
                                                variant="p" 
                                                sx={{fontWeight: 400, margin: '0 1.0rem 0 0'}}>
                                                Oven Heat Source(s)
                                            </Typography>
                                            <FormControlLabel control={
                                                <Checkbox 
                                                id="primary"
                                                name="cooker.ovenHeatSources.gas"
                                                value={formik.values.cooker?.ovenHeatSources?.gas}
                                                onChange={formik.handleChange}/>
                                                } label="Gas" />
                                            <FormControlLabel control={
                                                <Checkbox 
                                                id="primary"
                                                name="cooker.ovenHeatSources.electric"
                                                value={formik.values.cooker?.ovenHeatSources?.electric}
                                                onChange={formik.handleChange}/>
                                                } label="Electric" />
                                            <FormControlLabel control={
                                                <Checkbox 
                                                id="primary"
                                                name="cooker.ovenHeatSources.microwave"
                                                value={formik.values.cooker?.ovenHeatSources?.microwave}
                                                onChange={formik.handleChange}/>
                                                } label="Microwave" />
                                        </FormGroup>
                                        {
                                            (Boolean(formik.errors.ovenHeatSources) && Boolean(formik.submitCount > 0)) &&
                                                <InputLabel 
                                                    id="ovenType" 
                                                    error={true}
                                                    sx={{ fontSize: '0.75rem', marginLeft: '14px' }}>
                                                    {formik.errors.ovenHeatSources}
                                                </InputLabel>
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography 
                                            variant="h6" 
                                            sx={{fontWeight: 300}}>
                                            Cooktop
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl 
                                            sx={{ m: 0, minWidth: "100%" }} 
                                            size="small"
                                            error={formik.touched.cooker?.cooktopHeatSource && Boolean(formik.errors.cooker?.cooktopHeatSource)}>
                                            <InputLabel id="cooktopHeatSource">Cooktop Heat Source</InputLabel>
                                            <Select
                                                labelId="cooktopHeatSource"
                                                id="cooktopHeatSource"
                                                name="cooker.cooktopHeatSource"
                                                label="Cooktop Heat Source"
                                                value={formik.values.cooker?.cooktopHeatSource}
                                                onChange={formik.handleChange}>
                                                <MenuItem value="Gas">Gas</MenuItem>
                                                <MenuItem value="Electric">Electric</MenuItem>
                                                <MenuItem value="Radiant Electric">Radiant Electric</MenuItem>
                                                <MenuItem value="Induction">Induction</MenuItem>
                                            </Select>
                                            <FormHelperText>{formik.touched.cooker?.cooktopHeatSource && formik.errors.cooker?.cooktopHeatSource}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            }

                            {
                                (applianceType === applianceTypeValues.WASHER.value) &&
                                <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
                                    <Grid item xs={12}>
                                        <Typography 
                                            variant="h5" 
                                            sx={{fontWeight: 300}}>
                                            Washer
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl 
                                            sx={{ m: 0, minWidth: "100%" }} 
                                            size="small"
                                            error={formik.touched.washer?.loadingType && Boolean(formik.errors.washer?.loadingType)}>
                                            <InputLabel id="loadingType">Loading Type</InputLabel>
                                            <Select
                                                labelId="loadingType"
                                                id="loadingType"
                                                name="washer.loadingType"
                                                label="Loading Type"
                                                value={formik.values.washer?.loadingType}
                                                onChange={formik.handleChange}>
                                                <MenuItem value="Top">Top</MenuItem>
                                                <MenuItem value="Front">Front</MenuItem>
                                            </Select>
                                            <FormHelperText>{formik.touched.washer?.loadingType && formik.errors.washer?.loadingType}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            }

                            {
                                (applianceType === applianceTypeValues.DRYER.value) &&
                                <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
                                    <Grid item xs={12}>
                                        <Typography 
                                            variant="h5" 
                                            sx={{fontWeight: 300}}>
                                            Dryer
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl 
                                            sx={{ m: 0, minWidth: "100%" }} 
                                            size="small"
                                            error={formik.touched.dryer?.heatSource && Boolean(formik.errors.dryer?.heatSource)}>
                                            <InputLabel id="heatSource">Heat Source</InputLabel>
                                            <Select
                                                labelId="heatSource"
                                                id="heatSource"
                                                name="dryer.heatSource"
                                                label="Heat Source"
                                                value={formik.values.dryer?.heatSource}
                                                onChange={formik.handleChange}>
                                                <MenuItem value="Gas">Gas</MenuItem>
                                                <MenuItem value="Electric">Electric</MenuItem>
                                                <MenuItem value="None">None</MenuItem>
                                            </Select>
                                            <FormHelperText>{formik.touched.dryer?.heatSource && formik.errors.dryer?.heatSource}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            }

                            {
                                (applianceType === applianceTypeValues.TV.value) &&
                                <Grid container spacing={2} sx={{margin: '0 0 0 0'}}>
                                    <Grid item xs={12}>
                                        <Typography 
                                            variant="h5" 
                                            sx={{fontWeight: 300}}>
                                            TV
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl 
                                            sx={{ m: 0, minWidth: "100%" }} 
                                            size="small"
                                            error={formik.touched.tv?.displayType && Boolean(formik.errors.tv?.displayType)}>
                                            <InputLabel id="displayType">Display Type</InputLabel>
                                            <Select
                                                labelId="displayType"
                                                id="displayType"
                                                name="tv.displayType"
                                                label="Display Type"
                                                value={formik.values.tv?.displayType}
                                                onChange={formik.handleChange}>
                                                <MenuItem value="Tube">Tube</MenuItem>
                                                <MenuItem value="DLP">DLP</MenuItem>
                                                <MenuItem value="Plasma">Plasma</MenuItem>
                                                <MenuItem value="LCD">LCD</MenuItem>
                                                <MenuItem value="LED">LED</MenuItem>
                                            </Select>
                                            <FormHelperText>{formik.touched.tv?.displayType && formik.errors.tv?.displayType}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}></Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="displaySize"
                                            name="tv.displaySize"
                                            label="Display Size"
                                            size="small"
                                            variant="outlined"
                                            type="number"
                                            fullWidth
                                            value={formik.values.tv?.displaySize}
                                            onChange={formik.handleChange}
                                            error={formik.touched.tv?.displaySize && Boolean(formik.errors.tv?.displaySize)}
                                            helperText={formik.touched.tv?.displaySize && formik.errors.tv?.displaySize}/>
                                    </Grid>
                                    <Grid item xs={6}></Grid>
                                    <Grid item xs={6}>
                                        <FormControl 
                                            sx={{ m: 0, minWidth: "100%" }} 
                                            size="small"
                                            error={formik.touched.tv?.maxResolution && Boolean(formik.errors.tv?.maxResolution)}>
                                            <InputLabel id="maxResolution">Maximum Resolution</InputLabel>
                                            <Select
                                                labelId="maxResolution"
                                                id="maxResolution"
                                                name="tv.maxResolution"
                                                label="Maximum Resolution"
                                                value={formik.values.tv?.maxResolution}
                                                onChange={formik.handleChange}>
                                                <MenuItem value="480i">480i</MenuItem>
                                                <MenuItem value="576i">576i</MenuItem>
                                                <MenuItem value="720p">720p</MenuItem>
                                                <MenuItem value="1080i">1080i</MenuItem>
                                                <MenuItem value="1080p">1080p</MenuItem>
                                                <MenuItem value="1440p">1440p</MenuItem>
                                                <MenuItem value="2160p (4K)">2160p (4K)</MenuItem>
                                                <MenuItem value="4320p (8K)">4320p (8K)</MenuItem>
                                            </Select>
                                            <FormHelperText>{formik.touched.tv?.maxResolution && formik.errors.tv?.maxResolution}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                
                            }

                            <AddApplianceButtons />
                        </>
                    :
                        <>
                            <Grid container>
                                <Grid item xs={12}>
                                    <DataGrid
                                        rows={(applianceData) ? applianceData : []}
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
                                        onClick={() => setShowApplianceTable(false)}>
                                        Add Appliance
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{marginTop: '0.5rem'}} alignItems="center">
                                <Grid item xs={12}>
                                    <Grid container justifyContent="space-between">
                                        <Button color="primary" variant="contained" onClick={() => stepChangeFunction(-1)}>
                                            Previous
                                        </Button>
                                        <Button color="primary" variant="contained" 
                                            onClick={() => {
                                                stepChangeFunction(1);
                                            }
                                        }>
                                            Next
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                }
            </form>
        </Container>
    );
};

export default AddAppliance;