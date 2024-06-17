import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import IP_Page from "../../images/IP_Page.png"
// import FilmDetails from './FilmDetails/FilmDetails';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { convertDate } from '../Helper';
import DetailsOfWebSeries from './DetailsOfWebSeries/DetailsOfWebSeries';
import Season from './Season/Season';
import Producer from './Producer/Producer';
import OttPlatform from './OttPlatform/OttPlatform';
import DirectorAndCreatorDetails from './DirectorAndCreatorDetails/DirectorAndCreatorDetails';
import Documents from './Documents/Documents';
import Declaration from '../ip/Declaration/Declaration';
import DeclarationAndPayment from './DeclarationAndPayment/DeclarationAndPayment';

import { useMediaQuery, useTheme } from '@mui/material';
import ApiClient from '../common/ApiClient';

import Preview from './OttPreview/Preview';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const steps = [
    "Details Of Web Series",
    "Season & Episodes",
    "Producer",
    "OTT-Platform",
    "Director & Creator",
    "Documents",
    "Preview",
    "Declaration & Payment",
];
const OttStepperData = () => {
    const { postRequest, getRequest } = ApiClient();
    const { id = null, ip_step = 1 } = useParams();

    const [preData, setPredata] = useState({});
    const [datatest, setDatatest] = useState(null);

    const loadpreData = async () => {
        if (id) {
            const predata = await getRequest(`ott/${id}`, {});
            const loadpredata = predata.data;

            setActiveStep(loadpredata.step)
            const documentData = {};
            if (loadpredata.documents) {
                for (const document of loadpredata.documents) {
                    if (document.documents_type == 1) loadpredata.is_synopsis_profile = 1;
                    else if (document.documents_type == 2) loadpredata.is_creator_profile = 1;
                    else if (document.documents_type == 3) loadpredata.is_director_profile = 1;
                    else if (document.documents_type == 4) loadpredata.is_brief_profile_of_producer = 1;

                    documentData[document.documents_type] = {
                        file: document.file,
                        name: document.documents_name
                    }
                }
            }
            loadpredata.documentData = documentData;
            console.log({ documentData })
            setFormData({
                ...loadpredata,
                release_date: dayjs(loadpredata.release_date),
                //date_of_completion_production: dayjs(loadpredata.date_of_completion_production),
            });
            setPredata(predata.data);
        }
    }
    useEffect(() => {
        // Show modal when component mounts
        console.log("1st use effect")
        loadpreData();

        setActiveStep(parseInt(ip_step - 1))
    }, []);

    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0);
    //console.log(activeStep, "activeStepDetails")
    const [completed, setCompleted] = useState({});
    // console.log(completed, "completed")

    const [formData, setFormData] = useState({

    });
    // const [filmErrors, setFilmErrors] = useState({});
    const [webSeriesErrors, setWebSeriesErrors] = useState({});
    const [seasonEpisodeErrors, setSeasonEpisodeErrors] = useState({});
    const [producerErrors, setProducerErrors] = useState({});
    const [ottPlatformErrors, setOttPlatformErrors] = useState({});
    const [directorErrors, setDirectorErrors] = useState({});
    const [crewErrors, setCrewErrors] = useState({});
    const [cbfcErrors, setCbfcErrors] = useState({});
    const [otherErrors, setOtherErrors] = useState({});
    const [directorCreatorErrors, setDirectorCreatorErrors] = useState({});
    const [documentErrors, setDocumentErrors] = useState({});


    const totalSteps = () => {
        return steps.length;
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = async () => {
        //  console.log("dsfdfds")

        const newCompleted = { ...completed };
        newCompleted[activeStep] = true;
        //  handleNext();
        console.log({ activeStep })
        if (activeStep === 0) {
            const { isValid, errors } = validateDetailsOfWebSeries(formData);
            console.log(errors);
            if (!isValid) {
                setWebSeriesErrors(errors)
                return;
            }
            try {
                let response
                console.log({ formData })
                if (id) {
                    response = await postRequest(`ott/${id}`, { ...formData, step: 1 });

                } else {
                    response = await postRequest("ott", { ...formData, step: 1 });
                }

                if (response.status && !id) {

                    navigate(`/ott/${response.data.id}`);
                    setActiveStep(1);
                } else if (response.status && id) {
                    handleNext();
                }
                else {
                    alert(response.message)
                }

            } catch (error) {
                console.error("Error:", error);
            }
            // formData.step=1;
            // await postRequest("ip_applcation_form",formData);
        }

        if (activeStep === 1) {
            // Validation for the Producer Details step
            const { isValidSeasonEpisode, errorsSeasonAndEpisode } = validateSeasonAndEpisode(formData);
            // console.log(isValidProducer, "isValidProducer")
            console.log(errorsSeasonAndEpisode)
            if (!isValidSeasonEpisode) {
                setSeasonEpisodeErrors(errorsSeasonAndEpisode);
                return; // Stop execution if validation fails
            }

            // formData.step=2;
            // await postRequest("ip_applcation_form",formData);

            if (!id) {
                console.error("ID is not available.");
                return;
            }
            const updatedFormData = {
                ...formData,
                step: 2,

            };
            console.log({ updatedFormData });
            try {
                updatedFormData.release_date = convertDate(updatedFormData.release_date);
                const producer_data_check = await postRequest(`ott/${id}`, updatedFormData);

                if (producer_data_check.status)
                    handleNext();
                else {
                    alert(producer_data_check.message)
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }


        if (activeStep === 2) {

            console.log("validateProducerDetails");
            // Validation for the Producer Details step
            const { isValidProducer, errorsProducer } = validateProducerDetails(formData);
            // console.log(isValidProducer, "isValidProducer")
            console.log(errorsProducer)
            if (!isValidProducer) {
                setProducerErrors(errorsProducer);
                return; // Stop execution if validation fails
            }

            // formData.step=2;
            // await postRequest(`ott/${id}`,formData);

            if (!id) {
                console.error("ID is not available.");
                return;
            }
            const updatedFormData = {
                ...formData,
                step: 3,

            };
            console.log({ updatedFormData });
            try {
                const producer_data_check = await postRequest(`ott/${id}`, updatedFormData);

                if (producer_data_check.status)
                    handleNext();
                else {
                    alert(producer_data_check.message)
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }

        if (activeStep === 3) {
            // Validation for the Director Details step
            const { isValidOttPlatform, errorsOttPlatform } = validateOttPlatformDetails(formData);
            // console.log(isValidOttPlatform, "isValidOttPlatform")
            console.log(errorsOttPlatform)
            if (!isValidOttPlatform) {
                setOttPlatformErrors(errorsOttPlatform);
                return;
            }

            if (!id && false) {
                console.error("ID is not available.");
                return;
            }
            const updatedFormData = {
                ...formData,
                step: 4,

            };
            try {
                const producer_data_check = await postRequest(`ott/${id}`, updatedFormData);
                console.log(producer_data_check);
                if (producer_data_check.status)
                    handleNext();
                else {
                    alert(producer_data_check.message)
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }

        if (activeStep === 4) {
            console.log("errorsDirectorAndCreator");
            // Validation for the CBFC Certification Details step
            const { isValidDirectorAndCreator, errorsDirectorAndCreator } = validateDirectorAndCreatorDetails(formData);
            // console.log(isValidCbfc, "isValidCbfc")
            console.log(errorsDirectorAndCreator)

            if (!isValidDirectorAndCreator) {
                setDirectorCreatorErrors(errorsDirectorAndCreator);
                return;
            }
            if (!id) {
                console.error("ID is not available.");
                return;
            }
            const updatedFormData = {
                ...formData,
                step: 5,

            };
            // try {
            //     await postRequest(`ott/${id}`, updatedFormData);
            // } catch (error) {
            //     console.error("Error:", error);
            // } convertDate
            try {
                updatedFormData.date_of_cbfc_certificate = convertDate(updatedFormData.date_of_cbfc_certificate);
                updatedFormData.date_of_completion_production = convertDate(updatedFormData.date_of_completion_production);
                const producer_data_check = await postRequest(`ott/${id}`, updatedFormData);


                if (producer_data_check.status)
                    handleNext();
                else {
                    alert(producer_data_check.message)
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }

        if (activeStep === 5) {
            console.log("step 5")
            const { isValidDocument, errorsDocument } = validateDocumentDetails(formData);

            if (!isValidDocument) {
                setDocumentErrors(errorsDocument);
                return;
            }
            if (!id) {
                console.error("ID is not available.");
                return;
            }
            const updatedFormData = {
                ...formData,
                step: 6,

            };

            try {
                const producer_data_check = await postRequest(`ott/${id}`, updatedFormData);

                if (producer_data_check.status)
                    handleNext();
                else {
                    alert(producer_data_check.message)
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }

        if (activeStep === 6) {
            console.log("step 6")
            //   handleNext();
            const updatedFormData = {
                ...formData,
                step: 7,

            };

            try {
                const producer_data_check = await postRequest(`ott/${id}`, updatedFormData);

                if (producer_data_check.status)
                    handleNext();
                else {
                    alert(producer_data_check.message)
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }



        if (activeStep === steps.length - 1) {
            // Final step, make the API call
            await submitFormData();
        } else {
            ///  x
        }
        //handleNext();

        loadpreData();

    };

    const submitFormData = async () => {
        try {
            const payload = {
                ...formData,
            };
            // const data = await postRequestGlobal('register', payload)
            const data = await postRequest('ip_applcation_form', payload)
            console.log(data, "data");

            // const responseData = await response.json();
            console.log('Success:', data);
            alert('Form submitted successfully');
        } catch (error) {
            console.error('Error:', error);
            alert('Form submission failed');
        }
    };

    const validateDetailsOfWebSeries = (formData) => {

        const { genre_id, title, title_in_english, subtitle_other_language, is_subtitle_language_eng, language_id } = formData;
        const errors = {};

        if (!title) {
            errors.title = "Enter title of Web Series";
        }
        if (!title_in_english) {
            errors.title_in_english = "Enter english translation of the title";
        }
        if (!genre_id) {
            errors.genre_id = "Enter genre of Web Series";
        }

        if (!is_subtitle_language_eng && is_subtitle_language_eng !== 0) {
            errors.is_subtitle_language_eng = "Select one option";
        }
        if (!language_id) {
            errors.language_id = 'Select language';
        }

        if (!subtitle_other_language) {
            errors.subtitle_other_language = "Select language of subtitle";
        }
        const isValid = Object.keys(errors).length === 0;

        return { isValid, errors };
    };

    const validateSeasonAndEpisode = (formData) => {

        const { is_episode_added = null, season, runtime, number_of_episode, is_long_duration_timing, release_date, episode_number, title_in_english, subtitle_other_language, is_subtitle_language_eng, language_id } = formData;
        const errorsSeasonAndEpisode = {};

        if (!season) {
            errorsSeasonAndEpisode.season = "Season is required";
        }
        if (!runtime) {
            errorsSeasonAndEpisode.runtime = "Total Runtime is required";
        }

        if (!number_of_episode) {
            errorsSeasonAndEpisode.number_of_episode = "Number of episodes is required";
        }
        if (!is_long_duration_timing) {
            errorsSeasonAndEpisode.is_long_duration_timing = "Duration of each episodes of the season is required";
        }
        if (!release_date) {
            errorsSeasonAndEpisode.release_date = "Release date is required";
        }
        if (!is_episode_added) {
            errorsSeasonAndEpisode.is_episode_added = "Please add episode for the season.";
        }

        const isValidSeasonEpisode = Object.keys(errorsSeasonAndEpisode).length === 0;

        return { isValidSeasonEpisode, errorsSeasonAndEpisode };
    };

    const validateProducerDetails = (formData) => {

        const { have_producer = null, has_coproduction, coproducer_type, coproducer_name, coproducer_address, coproducer_phone, coproducer_email, coproducer_is_follow_it_rules, coproducer_is_original_production, coproducer_is_registered, coproducer_is_residing_in_country } = formData;
        const errorsProducer = {};

        if (has_coproduction === null) {
            errorsProducer.has_coproduction = "Select one option";
        }



        if (has_coproduction === 0 || has_coproduction === '0') {
            if (!coproducer_type) {
                errorsProducer.coproducer_type = "Select production type";
            }

            if (!coproducer_name) {
                errorsProducer.coproducer_name = " Enter your name";
            }

            if (!coproducer_address) {
                errorsProducer.coproducer_address = "Enter your address";
            }

            if (!coproducer_phone) {
                errorsProducer.coproducer_phone = "Enter your phone number";
            }
            if (!coproducer_email) {
                errorsProducer.coproducer_email = "Enter your email id";
            }

            if (!coproducer_is_follow_it_rules) {
                errorsProducer.coproducer_is_follow_it_rules = "Select one option";
            }

            if (!coproducer_is_original_production) {
                errorsProducer.coproducer_is_original_production = "Select one option";
            }


            if (!coproducer_is_registered) {
                errorsProducer.coproducer_is_registered = "Select one option";
            }

            if (!coproducer_is_residing_in_country) {
                errorsProducer.coproducer_is_residing_in_country = "Select one option";
            }

        } else {
            if (have_producer === null) {
                errorsProducer.have_producer = "Please add at least one co-producer.";
            }
        }


        const isValidProducer = Object.keys(errorsProducer).length === 0;

        return { isValidProducer, errorsProducer };
    };

    const validateOttPlatformDetails = (formData) => {
        const { ott_released_platform, is_other_released_platform_available, is_released_other_country,
            is_thretrical_screening, is_streamed_other_media, is_international_competition,
            is_streamed_country = null,
            is_international_competetions_added = null,
            is_threatical_screening_added = null,
            is_broadcasted_added = null,


        } = formData;
        console.log({ formData })
        const errorsOttPlatform = {};

        if (is_international_competition === null) {
            errorsOttPlatform.is_international_competition = "Select one option"
        } else {
            if (is_international_competition == 1) {
                if (!is_international_competetions_added) {
                    errorsOttPlatform.is_international_competetions_added = "Please add at least one international competetions."
                }
            }
        }

        if (!is_streamed_other_media) {
            errorsOttPlatform.is_streamed_other_media = "Select one option"
        } else {
            if (is_streamed_other_media == 1) {
                if (!is_broadcasted_added) {
                    errorsOttPlatform.is_broadcasted_added = "Please add at least one threatical screening."
                }
            }
        }

        if (!is_thretrical_screening) {
            errorsOttPlatform.is_thretrical_screening = "Select one option"
        } else {
            if (is_thretrical_screening == 1) {
                if (!is_threatical_screening_added) {
                    errorsOttPlatform.is_threatical_screening_added = "Please add at least one threatical screening."
                }
            }
        }

        if (is_released_other_country === null) {
            errorsOttPlatform.is_released_other_country = "Select one option"
        } else {
            if (is_released_other_country == 1) {
                console.log({ is_streamed_country })
                if (!is_streamed_country) {
                    errorsOttPlatform.is_streamed_country = "Please add at least one streamed country."
                }
            }
        }

        if (!ott_released_platform) {
            errorsOttPlatform.ott_released_platform = "Enter name of the OTT Platform"
        }

        if (is_other_released_platform_available === null) {
            errorsOttPlatform.is_other_released_platform_available = "Select one option"
        }



        const isValidOttPlatform = Object.keys(errorsOttPlatform).length === 0;

        return { isValidOttPlatform, errorsOttPlatform };
    };

    const validateDirectorAndCreatorDetails = (formData) => {
        const { is_director_added = null, is_creator_added = null } = formData;
        const errorsDirectorAndCreator = {};

        if (!is_creator_added) {
            errorsDirectorAndCreator.is_creator_added = "Please add at least one Creator."
        }
        if (!is_director_added) {
            errorsDirectorAndCreator.is_director_added = "Please add at least one  Director."
        }

        const isValidDirectorAndCreator = Object.keys(errorsDirectorAndCreator).length === 0;
        return { isValidDirectorAndCreator, errorsDirectorAndCreator };
    };

    const validateDocumentDetails = (formData) => {
        const { is_brief_profile_of_producer = null, is_synopsis_profile = null, is_creator_profile = null, is_director_profile = null, is_producer_profile = null } = formData;
        const errorsDocument = {};

        if (!is_synopsis_profile) {
            errorsDocument.synopsis = "Synopsis Of The Web-Series(Precise, Not Exceeding 200 words) is required";
        }

        if (!is_creator_profile) {
            errorsDocument.brief_profile_of_creator = "Brief Profile Of Creator's (Precise, Not Exceeding 200 words) is required";
        }

        if (!is_director_profile) {
            errorsDocument.brief_profile_of_director = "Brief Profile Of Director's (Precise, Not Exceeding 200 words) is required";
        }

        if (!is_brief_profile_of_producer) {
            errorsDocument.brief_profile_of_producer = "Brief Profile Of Producer's (Precise, Not Exceeding 200 words) is required";
        }

        const isValidDocument = Object.keys(errorsDocument).length === 0;
        return { isValidDocument, errorsDocument };
    };

    const handleNext = () => {
        console.log("test")
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const isStepCompleted = (step) => {
        return completed[step];
    };

    const addCoproducer = (step) => {
        console.log('testing sumit')
    };


    // const handleIpStepperSubmit = async () => {
    //     try {
    //         // Make API call with formData
    //         const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
    //         console.log('API response:', response.data);
    //         // Reset form data and step
    //         setFormData({
    //             firstName: '',
    //             email: '',
    //             password: '',
    //             age: '',
    //             gender: '',
    //             address: ''
    //         });
    //         setStep(1); // Go back to the first step
    //         alert('Form submitted successfully!');
    //     } catch (error) {
    //         console.error('Error submitting form:', error);
    //         alert('Error submitting form. Please try again later.');
    //     }
    // };

    const renderStepContent = (step) => {
        console.log('aditya', { step })
        switch (step) {
            case 0:
                return <DetailsOfWebSeries formData={formData} setFormData={setFormData} errors={webSeriesErrors} setWebSeriesErrors={setWebSeriesErrors} />
            //<FilmDetails preData={preData} formData={formData} setFormData={setFormData} errors={filmErrors} setFilmErrors={setFilmErrors} />;
            case 1:
                return <Season formData={formData} setFormData={setFormData} errors={seasonEpisodeErrors} setSeasonEpisodeErrors={setSeasonEpisodeErrors} />
            case 2:
                return <Producer formData={formData} setFormData={setFormData} errors={producerErrors} setProducerErrors={setProducerErrors} />
            case 3:
                return <OttPlatform datatest={datatest} formData={formData} setFormData={setFormData} errors={ottPlatformErrors} setOttPlatformErrors={setOttPlatformErrors} />
            case 4:
                return <DirectorAndCreatorDetails formData={formData} setFormData={setFormData} errors={directorCreatorErrors} setDirectorCreatorErrors={setDirectorCreatorErrors} />
            case 5:
                return <Documents formData={formData} setFormData={setFormData} errors={documentErrors} setDocumentErrors={setDocumentErrors} />
            case 6:
                return <Preview formData={formData} setActiveStep={setActiveStep} />
            case 7:
                return <DeclarationAndPayment />
            case 8:
                return
            // <Declaration />;
            default:
                return 'Unknown step';
        }
    };

    const [showModal, setShowModal] = useState(true);

    const handleCloseModal = () => {
        setShowModal(false);
    };
    useEffect(() => {
        setShowModal(true);
    }, []);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <>
            <Box className="steppper">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-12 col-lg-12'>
                            <img src={IP_Page} alt="IP" width="100%" height="130px" />
                        </div>
                    </div>
                </div>
                {/* <Stepper nonLinear activeStep={activeStep} connector={<hr className='connector-line' />}>
                {steps.map((label, index) => (
                    <Step key={label} completed={isStepCompleted(index)}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                        <div className='step-text text-center'>{label}</div>
                    </Step>
                ))}
            </Stepper> */}
                {/* <Stepper activeStep={activeStep}  alternativeLabel className='container'
                    sx={{
                        width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
                        display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex' },
                        alignItems: { xs: 'flex-start', sm: 'flex-start', md: 'flex-start', lg: 'flex' },
                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' }
                    }} >

                    {steps.map((label, index) => (
                        <Step key={label} completed={isStepCompleted(index)}>
                            <StepButton onClick={handleStep(index)}>
                                <StepLabel>{label}</StepLabel>
                            </StepButton>
                        </Step>
                    ))}
                </Stepper> */}
                {/* <Stepper
                activeStep={activeStep}
                alternativeLabel
                className="container"
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' },
                    alignItems: { xs: 'stretch', sm: 'stretch', md: 'center', lg: 'center' },
                    justifyContent: 'center',
                    '& .MuiStep-vertical': {
                    width: { xs: '100%', sm: '100%', md: 'auto', lg: 'auto' },
                    },
                    '& .MuiStepLabel-label': {
                    whiteSpace: { xs: 'normal', sm: 'normal', md: 'nowrap', lg: 'nowrap' },
                    textAlign: { xs: 'center', sm: 'center', md: 'inherit', lg: 'inherit' },
                    },
                }}
                >
                {steps.map((label, index) => (
                    <Step key={label} completed={isStepCompleted(index)}>
                    <StepButton onClick={handleStep(index)}>
                        <StepLabel>{label}</StepLabel>
                    </StepButton>
                    </Step>
                ))}
                </Stepper> */}


                <Stepper
                    activeStep={activeStep}
                    orientation={isMobile ? 'vertical' : 'horizontal'}
                    alternativeLabel={!isMobile}
                    className='container'

                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: isMobile ? 'stretch' : 'center',
                        justifyContent: 'center',
                        '& .MuiStep-root': {
                            width: isMobile ? '100%' : 'auto',
                        },
                        '& .MuiStepLabel-label': {
                            whiteSpace: isMobile ? 'normal' : 'nowrap',
                            textAlign: isMobile ? 'center' : 'inherit',
                        },
                    }}
                >
                    {steps.map((label, index) => (
                        <Step key={label} completed={isStepCompleted(index)}>
                            <StepButton onClick={handleStep(index)}>
                                <StepLabel>{label}</StepLabel>
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>


                <div className='container mt-5'>
                    {renderStepContent(activeStep)}
                    <div className='row mt-4'>
                        <div className='col-lg-12 text-end'>
                            <div className='d-flex justify-content-between mb-3'>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                >
                                    <ChevronLeftIcon />
                                    Back
                                </Button>
                                {activeStep !== steps.length - 1 && (
                                    <Button onClick={handleComplete} style={{ backgroundColor: isStepCompleted(activeStep) ? "#4CAF50" : "#632340", color: "#fff" }}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        <NavigateNextIcon style={{ color: '#ffffff' }} />
                                    </Button>

                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default OttStepperData