import React from  'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { bathroomTypeValues, applianceTypeValues, insertAllHouseholdData, resetState } from './household-slice';

const ReviewSubmit = props => {
    const { stepChangeFunction, intialValues } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
        <Container maxWidth="md">
                <Typography 
                    variant="h4" 
                    sx={{fontWeight: 300, marginBottom: '1.0rem'}}
                    gutterBottom>
                    Review & Submit
                </Typography>

                <Typography 
                    variant="h5" 
                    sx={{fontWeight: 300, marginBottom: '1.0rem'}}
                    gutterBottom>
                    Household Info
                </Typography>

                <div className="ordinal-divider">
                    <Typography 
                        variant="body1" 
                        gutterBottom>
                        <span className="review-line-header">Email:</span> { intialValues?.email }
                    </Typography>
                    <Typography 
                        variant="body1" 
                        gutterBottom>
                        <span className="review-line-header">Postal Code:</span> { intialValues?.postalCode }
                    </Typography>
                    {
                        (intialValues?.phone) &&
                            <Typography 
                                variant="body1" 
                                gutterBottom>
                                <span className="review-line-header">Phone:</span> ( { intialValues?.phone.areaCode } ) { intialValues?.phone.number }, Type: { intialValues?.phone.type }
                            </Typography>
                    }
                    <Typography 
                        variant="body1" 
                        gutterBottom>
                        <span className="review-line-header">Household Type:</span> { intialValues?.householdType }
                    </Typography>
                    <Typography 
                        variant="body1" 
                        gutterBottom>
                        <span className="review-line-header">Square Footage:</span> { intialValues?.squareFootage }
                    </Typography>
                    <Typography 
                        variant="body1" 
                        gutterBottom>
                        <span className="review-line-header">Occupants:</span> { intialValues?.occupantCount }
                    </Typography>
                    <Typography 
                        variant="body1" 
                        gutterBottom>
                        <span className="review-line-header">Bedrooms:</span> { intialValues?.bedroomCount }
                    </Typography>
                </div>
                

                <Typography 
                    variant="h5" 
                    sx={{fontWeight: 300, marginBottom: '1.0rem'}}
                    gutterBottom>
                    Bathroom Info
                </Typography>

                {
                    intialValues.bathrooms?.map((bathroom, index) => 
                        <div key={bathroom.ordinal} className="ordinal-divider">
                            <Typography 
                                variant="body1" 
                                gutterBottom>
                                <span className="review-line-header">Bathroom #:</span> { bathroom.ordinal }
                            </Typography>
                            <Typography 
                                variant="body1" 
                                gutterBottom>
                                <span className="review-line-header">Bathroom Type:</span> { (bathroom.bathroomType === bathroomTypeValues.FULL_BATHROOM) ? 'Full Bathroom' : 'Half Bathroom' }
                            </Typography>
                            <Typography 
                                variant="body1" 
                                gutterBottom>
                                <span className="review-line-header">Sinks:</span> { bathroom.sinkCount }
                            </Typography>
                            <Typography 
                                variant="body1" 
                                gutterBottom>
                                <span className="review-line-header">Commodes:</span> { bathroom.commodeCount }
                            </Typography>
                            <Typography 
                                variant="body1" 
                                gutterBottom>
                                <span className="review-line-header">Bidets:</span> { bathroom.bidetCount }
                            </Typography>
                            { 
                                (bathroom.bathroomType === bathroomTypeValues.FULL_BATHROOM) 
                                ?
                                    <>
                                        <Typography 
                                            variant="body1" 
                                            gutterBottom>
                                            <span className="review-line-header">Showers:</span> { bathroom.showerCount }
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            gutterBottom>
                                            <span className="review-line-header">Bathtubs:</span> { bathroom.bathtubCount }
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            gutterBottom>
                                            <span className="review-line-header">Tub/Showers:</span> { bathroom.tubShowerCount }
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            gutterBottom>
                                            <span className="review-line-header">Primary Bathroom:</span> { (bathroom.primary) ? 'Yes' : 'No' }
                                        </Typography>
                                    </>
                                :
                                    <>
                                        <Typography 
                                            variant="body1" 
                                            gutterBottom>
                                            <span className="review-line-header">Bathroom Name:</span> { bathroom.name }
                                        </Typography>
                                    </>
                            }
                            
                        </div>
                    
                    )
                }

                <Typography 
                    variant="h5" 
                    sx={{fontWeight: 300, marginBottom: '1.0rem'}}
                    gutterBottom>
                    Appliance Info
                </Typography>

                {
                    intialValues.appliances?.map((appliance, index) => 
                        <div key={appliance.ordinal} className="ordinal-divider">
                            <Typography 
                                variant="body1" 
                                gutterBottom>
                                <span className="review-line-header">Appliance #:</span> { appliance.ordinal }
                            </Typography>
                            <Typography 
                                variant="body1" 
                                gutterBottom>
                                <span className="review-line-header">Appliance Type:</span> 
                                { 
                                    (appliance.applianceType === applianceTypeValues.REFRIGERATOR_FREEZER.value) && 
                                        <> { applianceTypeValues.REFRIGERATOR_FREEZER.name }</>
                                }
                                { 
                                    (appliance.applianceType === applianceTypeValues.COOKER.value) && 
                                        <> { applianceTypeValues.COOKER.name }</>
                                }
                                { 
                                    (appliance.applianceType === applianceTypeValues.DRYER.value) && 
                                        <> { applianceTypeValues.DRYER.name }</>
                                }
                                { 
                                    (appliance.applianceType === applianceTypeValues.WASHER.value) && 
                                        <> { applianceTypeValues.WASHER.name }</>
                                }
                                { 
                                    (appliance.applianceType === applianceTypeValues.TV.value) && 
                                        <> { applianceTypeValues.TV.name }</>
                                }
                            </Typography>
                            <Typography 
                                variant="body1" 
                                gutterBottom>
                                <span className="review-line-header">Manufacturer:</span> { appliance.manufacturer }
                            </Typography>
                            <Typography 
                                variant="body1" 
                                gutterBottom>
                                <span className="review-line-header">Model Name:</span> { appliance.modelName }
                            </Typography>
                            
                            { 
                                (appliance.applianceType === applianceTypeValues.REFRIGERATOR_FREEZER.value) && 
                                    <Typography 
                                        variant="body1" 
                                        gutterBottom>
                                        <span className="review-line-header">Refrigerator/Freezer Type:</span> { appliance.refrigeratorFreezerType }
                                    </Typography>
                            }
                            { 
                                (appliance.applianceType === applianceTypeValues.COOKER.value) && 
                                    <>
                                        <Typography 
                                            variant="body1" 
                                            gutterBottom>
                                            <span className="review-line-header">Oven Type:</span> { appliance.ovenType }
                                        </Typography>
                                            <Typography 
                                            variant="body1" 
                                            gutterBottom>
                                            <span className="review-line-header">Oven Heat Sources:</span> { appliance.ovenHeatSources.join(', ') }
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            gutterBottom>
                                            <span className="review-line-header">Cooktop Heat Source:</span> { appliance.cooktopHeatSource }
                                        </Typography>
                                    </>
                            }
                            { 
                                (appliance.applianceType === applianceTypeValues.DRYER.value) && 
                                <Typography 
                                    variant="body1" 
                                    gutterBottom>
                                    <span className="review-line-header">Heat Source:</span> { appliance.heatSource }
                                </Typography>
                            }
                            { 
                                (appliance.applianceType === applianceTypeValues.WASHER.value) && 
                                    <Typography 
                                        variant="body1" 
                                        gutterBottom>
                                        <span className="review-line-header">Loading Type:</span> { appliance.loadingType }
                                    </Typography>
                            }
                            { 
                                (appliance.applianceType === applianceTypeValues.TV.value) && 
                                    <>
                                        <Typography 
                                            variant="body1" 
                                            gutterBottom>
                                            <span className="review-line-header">Display Type:</span> { appliance.displayType }
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            gutterBottom>
                                            <span className="review-line-header">Display Size:</span> { appliance.displaySize }"
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            gutterBottom>
                                            <span className="review-line-header">Maximum Resolution:</span> { appliance.maxResolution }
                                        </Typography>
                                    </>
                            }

                        </div>
                    )
                }                
            <Grid container spacing={2} sx={{marginTop: '0.5rem', marginBottom: '5.0rem'}} alignItems="center">
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between">
                        <Button color="primary" variant="contained" onClick={() => {
                                stepChangeFunction(-1);
                            }
                        }>
                            Previous
                        </Button>
                        <Button color="primary" variant="contained" onClick={() => {
                                dispatch(insertAllHouseholdData()).then(
                                    result => {
                                        if(!result.error){
                                            dispatch(resetState());
                                            navigate("/success");
                                        }
                                        else{
                                            console.log(result.error);
                                        }
                                    }, error => {
                                        console.error(error);
                                    });
                            }}>
                            Submit & Save
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ReviewSubmit;