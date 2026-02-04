import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import AddEmail from './add-email';
import AddHouseholdInfo from './add-household-info';
import AddBathroom from './add-bathroom';
import AddAppliance from './add-appliance';
import ReviewSubmit from './review-submit';

  const steps = [
    'Email',
    'Household',
    'Bathroom',
    'Appliances',
    'Review & Submit'
  ];

const AddHousehold = () => {
    const [activeStep, setActiveStep] = useState(0);

    const householdData = useSelector(state => state.household.data);

    const handleStepChange = (step) => {
        setActiveStep(activeStep + step);
    };
    
    const formSwitch = (step) => {
        switch(step)
        {
            case 0:
                return <AddEmail stepChangeFunction={handleStepChange} intialValues={householdData} />;
            case 1:
                return <AddHouseholdInfo stepChangeFunction={handleStepChange} intialValues={householdData} />;
            case 2:
                return <AddBathroom stepChangeFunction={handleStepChange} />;
            case 3:
                return <AddAppliance stepChangeFunction={handleStepChange} />;
            case 4:
                return <ReviewSubmit stepChangeFunction={handleStepChange} intialValues={householdData} />;
            default:
                return (
                    <Typography 
                        variant="h4" 
                        sx={{fontWeight: 300}} 
                        align="center" 
                        gutterBottom>
                        Something went wrong.
                    </Typography>
                );
        }
    };
    
    return(
        <Container maxWidth="lg">
            <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: '2.0rem' }}>
                {
                    steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
            { formSwitch(activeStep) }
        </Container>
    );
};

export default AddHousehold;