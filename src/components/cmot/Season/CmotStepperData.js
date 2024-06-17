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
import PersonalDetail from '../PersonalDetail/PersonalDetail';
import AddressIdentification from '../AddressIdentification/AddressIdentification';
import FilmsDetails from '../FilmsDetails/FilmsDetails';
import Declaration from '../Declaration/Declaration';
import '../cmotStyle.css';

import { Container } from '@mui/material';

// image import
import logo from '../../../images/pecock.png';
import logo1 from '../../../images/ashok-logo.png';
import logo2 from '../../../images/NFDC-Logo.png';

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
                return <PersonalDetail />
            case 1:
                return <AddressIdentification />;
            case 2:
                return <FilmsDetails />;
            case 3:
                return <Declaration />;
            default:
                return 'Unknown step';
        }
    };

    return (
        <>
            <div className=''>
                <div className='d-flex justify-content-between m-3 align-items-center'>
                    <div className='imgLogo'><img src={logo} alt="Logo" style={{ width: '100%', height: '100%' }} /></div>
                    <div className='imgLogo'><img src={logo1} alt="Logo" style={{ width: '100%', height: '100%' }} /></div>
                    <div className='imgLogo'><img src={logo2} alt="Logo" style={{ width: '100%', height: '100%' }} /></div>
                </div>
                <container>
                    <div className='text-center m-3'>
                        <h5>Creative minds of Tomorrow</h5>
                    </div>
                    <div className='m-3 d-flex justify-content-between'>
                        <Button variant="outlined">Dashboard</Button>
                        <Button variant="outlined" color="error">Log Out</Button>
                    </div>
                </container>
            </div>
            <Container>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep} className='comtsteper'>
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
                                <Button onClick={handleSubmit} className='bttnn'>Submit</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                {renderStepContent(activeStep)}
                            </Typography>
                            <Box sx={{ pb: 2, display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button variant="outlined"
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                ><ChevronLeftIcon />
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext} className='bttnn'>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    <NavigateNextIcon style={{ color: 'white' }} />
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Box>
            </Container>
        </>
    );
}

export default CmotStepperData