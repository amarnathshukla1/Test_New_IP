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

const steps = [
    "Details Of Web Series",
    "Season & Episodes",
    "Producer",
    "OTT-Platform",
    "Director & Creator",
    "Documents",
    "Declaration & Payment",
];
const OttStepperData = () => {
    const { postRequest, getRequest, patchRequest } = ApiClient();
    const { id = null, ip_step = 1 } = useParams();
    const [preData, setPredata] = useState({});

    const loadpreData = async () => {
        if (id) {
            const predata = await getRequest(`ott/${id}`, {});
            const loadpredata = predata.data;
            setFormData({
                ...loadpredata,
                //date_of_cbfc_certificate: dayjs(loadpredata.date_of_cbfc_certificate),
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
    console.log(activeStep, "activeStepDetails")
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
        handleNext();
        if (activeStep === 0) {
            const { isValid, errors } = validateDetailsOfWebSeries(formData);
            if (!isValid) {
                setWebSeriesErrors(errors)
                return;
            }
            try {
                let response
                if (id) {
                    response = await patchRequest(`ott/${id}`, { ...formData, step: 1 });

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
                const producer_data_check = await patchRequest(`ott/${id}`, updatedFormData);

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
            // Validation for the Producer Details step
            const { isValidProducer, errorsProducer } = validateProducerDetails(formData);
            // console.log(isValidProducer, "isValidProducer")
            console.log(errorsProducer)
            if (!isValidProducer) {
                setProducerErrors(errorsProducer);
                return; // Stop execution if validation fails
            }

            // formData.step=2;
            // await patchRequest(`ott/${id}`,formData);

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
                const producer_data_check = await patchRequest(`ott/${id}`, updatedFormData);

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
                step: 3,

            };
            try {
                const producer_data_check = await patchRequest(`ott/${id}`, updatedFormData);
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
            // Validation for the Crew Details step
            const { isValidCrew, errorsCrew } = validateCrewDetails(formData);
            // console.log(isValidCrew, "isValidCrew")
            // console.log(errorsCrew,"errorsCrew")
            if (!isValidCrew) {
                setCrewErrors(errorsCrew);
                return;
            }
            if (!id) {
                console.error("ID is not available.");
                return;
            }
            const updatedFormData = {
                ...formData,
                step: 4,

            };
            // try {
            //     await patchRequest(`ott/${id}`, updatedFormData);
            // } catch (error) {
            //     console.error("Error:", error);
            // }
            try {
                const producer_data_check = await patchRequest(`ott/${id}`, updatedFormData);


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
            //     await patchRequest(`ott/${id}`, updatedFormData);
            // } catch (error) {
            //     console.error("Error:", error);
            // } convertDate
            try {
                updatedFormData.date_of_cbfc_certificate = convertDate(updatedFormData.date_of_cbfc_certificate);
                updatedFormData.date_of_completion_production = convertDate(updatedFormData.date_of_completion_production);
                const producer_data_check = await patchRequest(`ott/${id}`, updatedFormData);


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

            const { isValidDocument, errorsDocument } = validateDocumentDetails(formData);
            console.log(isValidDocument, "isValidDocument")
            console.log(errorsDocument, "errorsDocument")
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
                const producer_data_check = await patchRequest(`ott/${id}`, updatedFormData);

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

        const { title, title_in_english, genre_id, subtitle_other_language, is_subtitle_language_eng, language_id } = formData;
        const errors = {};

        if (!title) {
            errors.title = "Title of Web Series(in the original language of release) is required";
        }
        if (!title_in_english) {
            errors.title_in_english = "English translation of the title is required";
        }
        if (!genre_id) {
            errors.genre_id = "Genre is required";
        }
        if (!subtitle_other_language) {
            errors.subtitle_other_language = "Language in which the Web Series was originally released is required";
        }
        if (!is_subtitle_language_eng) {
            errors.is_subtitle_language_eng = " Subtitle language in english is required";
        }
        if (!language_id) {
            errors.language_id = 'Language is required';
        }
        const isValid = Object.keys(errors).length === 0;

        return { isValid, errors };
    };

    const validateSeasonAndEpisode = (formData) => {

        const { season, runtime, number_of_episode, is_long_duration_timing, release_date,episode_number, title_in_english, genre_id, subtitle_other_language, is_subtitle_language_eng, language_id } = formData;
        const errorsSeasonAndEpisode = {};

        if (!season) {
            errorsSeasonAndEpisode.season = "Season is required";
        }
        if (!runtime) {
            errorsSeasonAndEpisode.runtime = "Total Runtime is required";
        }
        if (!episode_number) {
            errorsSeasonAndEpisode.episode_number = "Episode number is required";
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
        if (!subtitle_other_language) {
            errorsSeasonAndEpisode.subtitle_other_language = "Language in which the Web Series was originally released is required";
        }
        if (!is_subtitle_language_eng) {
            errorsSeasonAndEpisode.is_subtitle_language_eng = " Subtitle language in english is required";
        }
        if (!language_id) {
            errorsSeasonAndEpisode.language_id = 'Language is required';
        }
        const isValidSeasonEpisode = Object.keys(errorsSeasonAndEpisode).length === 0;

        return { isValidSeasonEpisode, errorsSeasonAndEpisode };
    };

    const validateProducerDetails = (formData) => {
        console.log("data")
        const { is_producer_id_proof = null, name_of_producers, return_address, return_address_mobile, return_address_landline, return_address_email, return_address_name, name_of_production_house, right_holder_address, right_holder_mobile, right_holder_landline, right_holder_email, right_holder_name, whether_indian_foreign_right_holder_same, right_holder_fax_number, is_address_same_as_producer, company_is_registered_as_indian_entity, producer_is, firm_is_owned_by_individual, name_of_firm, producer_email, email_producer, producer_landline, producer_mobile, producer_website, producer_address, producer_id_proof } = formData;
        const errorsProducer = {};

        // if (!name_of_producers) {
        //     errorsProducer.name_of_producers = ""
        // }

        // && (is_address_same_as_producer===0 || is_address_same_as_producer ==='0')

        if (!return_address && (is_address_same_as_producer === 0 || is_address_same_as_producer === '0')) {
            errorsProducer.return_address = "Return address is required"
        }

        if (!return_address_mobile && (is_address_same_as_producer === 0 || is_address_same_as_producer === '0')) {
            errorsProducer.return_address_mobile = "Return address mobile is required"
        }

        if (!return_address_landline && (is_address_same_as_producer === 0 || is_address_same_as_producer === '0')) {
            errorsProducer.return_address_landline = "Return address landline is required"
        }

        if (!return_address_email && (is_address_same_as_producer === 0 || is_address_same_as_producer === '0')) {
            errorsProducer.return_address_email = "Return address email is required"
        }

        if (!return_address_name && (is_address_same_as_producer === 0 || is_address_same_as_producer === '0')) {
            errorsProducer.return_address_name = "Return address name is required"
        }

        if (!name_of_production_house) {
            //errorsProducer.name_of_production_house = "Name of production house is required"
        }
        if (!right_holder_address && (whether_indian_foreign_right_holder_same === 0 || whether_indian_foreign_right_holder_same === '0')) {
            errorsProducer.right_holder_address = "Right holder address is required"
        }
        if (!right_holder_mobile && (whether_indian_foreign_right_holder_same === 0 || whether_indian_foreign_right_holder_same === '0')) {
            errorsProducer.right_holder_mobile = "Right holder mobile is required"
        }
        if (!right_holder_landline && (whether_indian_foreign_right_holder_same === 0 || whether_indian_foreign_right_holder_same === '0')) {
            errorsProducer.right_holder_landline = "Right holder landline is required"
        }

        if (!right_holder_email && (whether_indian_foreign_right_holder_same === 0 || whether_indian_foreign_right_holder_same === '0')) {
            errorsProducer.right_holder_email = "Right holder email is required"
        }
        if (!right_holder_name && (whether_indian_foreign_right_holder_same === 0 || whether_indian_foreign_right_holder_same === '0')) {
            errorsProducer.right_holder_name = "Right holder name is required"
        }
        if (!(whether_indian_foreign_right_holder_same == 1 || whether_indian_foreign_right_holder_same === 0 || whether_indian_foreign_right_holder_same === '0')) {
            errorsProducer.whether_indian_foreign_right_holder_same = "Wheather Indian foreign right holder is required"
        }
        if (!right_holder_fax_number && (whether_indian_foreign_right_holder_same === 0 || whether_indian_foreign_right_holder_same === '0')) {
            //  errorsProducer.right_holder_fax_number = "Right holder Fax no is required"
        }


        if (!(is_address_same_as_producer == 1 || is_address_same_as_producer === 0 || is_address_same_as_producer === '0')) {
            errorsProducer.is_address_same_as_producer = "Is the address same as Producer yes or no required";
        }
        if (!company_is_registered_as_indian_entity || company_is_registered_as_indian_entity == '0') {
            console.log("$$$$$$$$testing$$$$")
            errorsProducer.company_is_registered_as_indian_entity = "Company is Registered as an Indian entity is required";
        }

        if (!producer_is) {
            errorsProducer.producer_is = "Producer is required";
        }

        if (!(firm_is_owned_by_individual == 1 || firm_is_owned_by_individual == 0 || firm_is_owned_by_individual == '0')) {
            errorsProducer.firm_is_owned_by_individual = "firm is owned by the individual is required";
        }
        if (!name_of_firm) {
            errorsProducer.name_of_firm = "Name of the producer is required";
        }
        if (!producer_email) {
            errorsProducer.producer_email = "Producer email is required";
        }

        if (!producer_landline) {
            errorsProducer.producer_landline = "Producer landline is required";
        }

        if (!producer_mobile) {
            errorsProducer.producer_mobile = "Producer mobile is required";
        }

        // if (!email_producer) {
        //     errorsProducer.email_producer = "Email is required";
        // }

        if (!producer_website) {
            errorsProducer.producer_website = "Producer website is required";
        }
        if (!producer_address) {
            errorsProducer.producer_address = "Producer address is required";
        }
        console.log("company_is_registered_as_indian_entity")
        console.log(company_is_registered_as_indian_entity)
        if (!is_producer_id_proof && (company_is_registered_as_indian_entity === 1)) {
            errorsProducer.producer_id_proof = "Photo ID is required"
        }


        const isValidProducer = Object.keys(errorsProducer).length === 0;

        return { isValidProducer, errorsProducer };
    };

    const validateOttPlatformDetails = (formData) => {
        const { ott_released_platform, is_other_released_platform_available, director_indian_natinality, director_name, director_email, director_landline, director_mobile, director_fax, director_website, director_address, director_id_proof = null, is_released_other_country, is_thretrical_screening, is_streamed_other_media, is_international_competition } = formData;
        const errorsOttPlatform = {};

        if (!is_international_competition) {
            errorsOttPlatform.is_international_competition = "Select one option"
        }

        if (!is_streamed_other_media) {
            errorsOttPlatform.is_streamed_other_media = "Select one option"
        }

        if (!is_thretrical_screening) {
            errorsOttPlatform.is_thretrical_screening = "Select one option"
        }

        if (!is_released_other_country) {
            errorsOttPlatform.is_released_other_country = "Select one option"
        }

        if (!ott_released_platform) {
            errorsOttPlatform.ott_released_platform = "Name of the OTT Platform is required"
        }

        if (!is_other_released_platform_available) {
            errorsOttPlatform.is_other_released_platform_available = "Select one option"
        }


        if (!director_id_proof) {
            errorsOttPlatform.director_id_proof = "Photo ID is required"
        }

        if (!director_indian_natinality) {
            errorsOttPlatform.director_indian_natinality = "Director indian nationality is required"
        }

        if (!director_name) {
            errorsOttPlatform.director_name = "Director name is required";
        }

        if (!director_email) {
            errorsOttPlatform.director_email = "Director email is required";
        }

        if (!director_landline) {
            errorsOttPlatform.director_landline = "Director landline is required";
        }
        if (!director_mobile) {
            errorsOttPlatform.director_mobile = "Director mobile is required";
        }
        if (!director_fax) {
            errorsOttPlatform.director_fax = "Director fax is required";
        }
        if (!director_website) {
            errorsOttPlatform.director_website = "Director website is required";
        }
        if (!director_address) {
            errorsOttPlatform.director_address = "Director address is required";
        }


        const isValidOttPlatform = Object.keys(errorsOttPlatform).length === 0;

        return { isValidOttPlatform, errorsOttPlatform };
    };

    const validateCrewDetails = (formData) => {
        const { story_write_aurthor, screenplay_script_write, director_of_photography, editor, art_director, costume_designer, music_director, sound_recordist, sound_re_recordist_optional, principal_cast_optional, duration_running_time, no_of_dcp_blueray, color_b_w, sound_system, aspect_ratio } = formData;
        const errorsCrew = {};

        if (!story_write_aurthor) {
            errorsCrew.story_write_aurthor = "Story writer author is required";
        }

        if (!screenplay_script_write) {
            errorsCrew.screenplay_script_write = "Screenplay script is required";
        }

        if (!director_of_photography) {
            errorsCrew.director_of_photography = "Director of photography is required";
        }
        if (!editor) {
            errorsCrew.editor = "Editor is required";
        }
        if (!art_director) {
            errorsCrew.art_director = "Art director is required";
        }
        if (!costume_designer) {
            errorsCrew.costume_designer = "Costume designer is required";
        }
        if (!music_director) {
            errorsCrew.music_director = "Music director is required";
        }
        if (!sound_recordist) {
            errorsCrew.sound_recordist = "Sound recordist is required";
        }
        // if (!sound_re_recordist_optional) {
        //     errorsCrew.sound_re_recordist_optional = "Sound re recordist is required";
        // }

        // if (!principal_cast_optional) {
        //     errorsCrew.principal_cast_optional = "Principal cast is required";
        // }

        if (!duration_running_time) {
            errorsCrew.duration_running_time = "duration running is required";
        }

        // if (!no_of_dcp_blueray) {
        //     errorsCrew.no_of_dcp_blueray = "No of dcp blueray is required";
        // }

        if (!color_b_w) {
            errorsCrew.color_b_w = "Color b w is required";
        }

        if (!sound_system) {
            errorsCrew.sound_system = "Sound system is required";
        }

        if (!aspect_ratio) {
            errorsCrew.aspect_ratio = "Aspect ratio is required";
        }


        const isValidCrew = Object.keys(errorsCrew).length === 0;

        return { isValidCrew, errorsCrew };
    };

    const validateCbfcDetails = (formData) => {
        const { is_declaration_clause_file = null, is_file_cbfc_certificate = null, date_of_completion_production, film_is_certified_by_cbfc_or_uncensored = null, date_of_cbfc_certificate, certificate_no, declaration_clause_file = null, file_cbfc_certificate = null } = formData;
        const errorsCbfc = {};

        if (!date_of_completion_production && (film_is_certified_by_cbfc_or_uncensored === 2 || film_is_certified_by_cbfc_or_uncensored === '2')) {
            errorsCbfc.date_of_completion_production = "Date of completion production is required"
        }

        if (!is_file_cbfc_certificate && film_is_certified_by_cbfc_or_uncensored == 1) {
            errorsCbfc.file_cbfc_certificate = "File cbfc certificate is required"
        }

        if (!date_of_cbfc_certificate && (film_is_certified_by_cbfc_or_uncensored == 1)) {
            errorsCbfc.date_of_cbfc_certificate = "Date of cbfc certificate is required"
        }

        // if (!(film_is_certified_by_cbfc_or_uncensored == 1 || film_is_certified_by_cbfc_or_uncensored === 0 || film_is_certified_by_cbfc_or_uncensored === '0')) {
        //     //errorsCbfc.film_is_certified_by_cbfc_or_uncensored = "Film is certified by cbfc or uncensored is required";
        // } film_is_certified_by_cbfc_or_uncensored

        // if (!date_of_cbfc_certificate) {
        //     errorsCbfc.date_of_cbfc_certificate = "Date of cbfc is required";
        // }

        if (!certificate_no && (film_is_certified_by_cbfc_or_uncensored == 1)) {
            //  errorsCbfc.certificate_no = "Certificate is required";
        }

        if (!is_declaration_clause_file && (film_is_certified_by_cbfc_or_uncensored == 2)) {
            errorsCbfc.declaration_clause_file = "Declaration is required";
        }

        // if(!(film_is_certified_by_cbfc_or_uncensored === 1 || film_is_certified_by_cbfc_or_uncensored === 0)){
        //     errorsCbfc.film_is_certified_by_cbfc_or_uncensored = "Wheather the film is certified by CBFC or uncensored"
        // }


        const isValidCbfc = Object.keys(errorsCbfc).length === 0;
        return { isValidCbfc, errorsCbfc };
    };

    const validateDirectorAndCreatorDetails = (formData) => {
        const { story_writer, screening_writer, director_of_photography, editior, art_director, costume_director, music_director, sound_designer, principal_cast, film_screened, film_broadcast_tv, film_screened_inside_india, film_screened_outside_india, film_participated_compentitaion, film_screened_any_indian_international_festival, name_of_festival, address_of_festival, date_of_festival, film_shown_broadcast_on_internate_tv, film_screened_commercially_inside_india, film_screened_commercially_outside_india, film_participated_in_any_compentitaion, is_directore_debute_film, film_distribution_limited_to_india_only, date_of_release, name_of_country, date_of_release_date, name_of_compentitaion_festival, details_of_awards_won_if_any } = formData;
        const errorsDirectorAndCreator = {};

        if (!story_writer) {
            errorsDirectorAndCreator.story_writer = "Story writer is required";
        }

        if (!screening_writer) {
            errorsDirectorAndCreator.screening_writer = "Screenplay writer is required";
        }

        if (!director_of_photography) {
            errorsDirectorAndCreator.director_of_photography = "Director of photography is required";
        }

        if (!editior) {
            errorsDirectorAndCreator.editior = "Editor is required";
        }

        if (!art_director) {
            errorsDirectorAndCreator.art_director = "Art director is required";
        }

        if (!costume_director) {
            errorsDirectorAndCreator.costume_director = "Costume director is required";
        }

        if (!music_director) {
            errorsDirectorAndCreator.music_director = "Music director is required";
        }

        if (!sound_designer) {
            errorsDirectorAndCreator.sound_designer = "Sound designer is required";
        }

        if (!principal_cast) {
            errorsDirectorAndCreator.principal_cast = "Principal cost is required";
        }

        // if (!(film_comletion_during_12month == 1 || film_comletion_during_12month === 0 || film_comletion_during_12month === '0')) {
        //     errorsDirectorAndCreator.film_comletion_during_12month = "Film completion during 12th month is required";
        // }
        if (!(film_screened || film_screened === 0 || film_screened === '0')) {
            errorsDirectorAndCreator.film_screened = "Film screened any indian international festival is required";
        }

        if (!name_of_festival && film_screened_any_indian_international_festival == 1) {
            errorsDirectorAndCreator.name_of_festival = "Name of festival is required";
        }

        if (!address_of_festival && film_screened_any_indian_international_festival == 1) {
            errorsDirectorAndCreator.address_of_festival = "Address of festival is required";
        }

        if (!date_of_festival && film_screened_any_indian_international_festival == 1) {
            errorsDirectorAndCreator.date_of_festival = "Date of festival is required";
        }

        if (!(film_broadcast_tv == 1 || film_broadcast_tv === 0 || film_broadcast_tv === '0')) {
            errorsDirectorAndCreator.film_broadcast_tv = "Film shown broadcast on internate tv is required";
        }

        if (!(film_screened_inside_india == 1 || film_screened_inside_india === 0 || film_screened_inside_india === '0')) {
            errorsDirectorAndCreator.film_screened_inside_india = "Film screened commercially inside india is required";
        }
        if (!date_of_release && film_screened_commercially_inside_india == 1) {
            errorsDirectorAndCreator.date_of_release = "Date of release is required";
        }
        if (!(film_screened_outside_india == 1 || film_screened_outside_india === 0 || film_screened_outside_india === '0')) {
            errorsDirectorAndCreator.film_screened_outside_india = "Film screened commercially outside india is required";
        }
        if (!name_of_country && film_screened_commercially_outside_india == 1) {
            errorsDirectorAndCreator.name_of_country = "Name of country is required";
        }


        if (!date_of_release_date && film_screened_commercially_outside_india == 1) {
            errorsDirectorAndCreator.date_of_release_date = "Date of release date is required";
        }
        if (!(film_participated_compentitaion == 1 || film_participated_compentitaion === 0 || film_participated_compentitaion === '0')) {
            errorsDirectorAndCreator.film_participated_compentitaion = "Film participated in any international competition is required";
        }

        if (!name_of_compentitaion_festival && film_participated_in_any_compentitaion == 1) {
            errorsDirectorAndCreator.name_of_compentitaion_festival = "Name of compentitation festival is required";
        }

        if (!(is_directore_debute_film == 1 || is_directore_debute_film === 0 || is_directore_debute_film === '0')) {
            errorsDirectorAndCreator.is_directore_debute_film = "Is Director debute film is required yes or no";
        }

        if (!(film_distribution_limited_to_india_only == 1 || film_distribution_limited_to_india_only === 0 || film_distribution_limited_to_india_only === '0')) {
            errorsDirectorAndCreator.film_distribution_limited_to_india_only = "Film distribution limited to india only is required yes or no";
        }
        if (!details_of_awards_won_if_any) {
            // errorsOther.details_of_awards_won_if_any = "Details of awards won if any is required";
        }

        const isValidDirectorAndCreator = Object.keys(errorsDirectorAndCreator).length === 0;
        return { isValidDirectorAndCreator, errorsDirectorAndCreator };
    };

    const validateDocumentDetails = (formData) => {
        const { is_synopsis_profile = null, is_creator_profile = null, is_director_profile = null, is_producer_profile = null } = formData;
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

        if (!is_producer_profile) {
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

        switch (step) {
            case 0:
                return <DetailsOfWebSeries formData={formData} setFormData={setFormData} errors={webSeriesErrors} setWebSeriesErrors={setWebSeriesErrors} />
            //<FilmDetails preData={preData} formData={formData} setFormData={setFormData} errors={filmErrors} setFilmErrors={setFilmErrors} />;
            case 1:
                return <Season formData={formData} setFormData={setFormData} errors={seasonEpisodeErrors} setSeasonEpisodeErrors={setSeasonEpisodeErrors} />
            case 2:
                return <Producer />
            case 3:
                return <OttPlatform formData={formData} setFormData={setFormData} errors={ottPlatformErrors} setOttPlatformErrors={setOttPlatformErrors} />
            case 4:
                return <DirectorAndCreatorDetails formData={formData} setFormData={setFormData} errors={directorCreatorErrors} setDirectorCreatorErrors={setDirectorCreatorErrors} />
            case 5:
                return <Documents formData={formData} setFormData={setFormData} errors={documentErrors} setDocumentErrors={setDocumentErrors} />
            case 6:
                return <DeclarationAndPayment />
            case 7:
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
                            <div className='d-flex justify-content-between'>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                {activeStep !== steps.length - 1 && (
                                    <Button onClick={handleComplete} style={{ backgroundColor: isStepCompleted(activeStep) ? "#4CAF50" : "#632340", color: "#fff" }}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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