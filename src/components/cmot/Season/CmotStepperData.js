import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const steps = ['Personal Detail', 'Address & Identification', 'Films Details', 'Declaration'];

const CmotStepperData = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleSubmit = () => {
        <Alert variant="filled" icon={<CheckIcon fontSize="inherit" />} severity="success">
            Your Form is Success full submit
        </Alert>
    };



    const renderStepContent = (step) => {
        console.log({ step })
        switch (step) {
            case 0:
                return
            // {activeStep + 1}
            case 1:
                return
            case 2:
                return
            case 3:
                return
            case 4:
                return
            default:
                return 'Unknown step';
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    {/* <Typography sx={{ mt: 2, mb: 1 }}>
                        Aditya
                    </Typography> */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleSubmit}>Submit</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Aditya {activeStep + 1}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        ><ChevronLeftIcon />
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            <NavigateNextIcon />
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

export default CmotStepperData