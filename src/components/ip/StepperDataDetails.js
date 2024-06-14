// HorizontalNonLinearStepper.js

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import IP_Page from "../images/IP_Page.png"
import FilmDetails from './FilmDetails/FilmDetails';
import ProducerDetails from './ProducerDetails/ProducerDetails';
import DirectorDetails from './DirectorDetails/DirectorDetails';
import CrewDetails from './CrewDetails/CrewDetails';
import CbfcCertification from './CbfcCertification/CbfcCertification';
import OtherDetails from './OtherDetails/OtherDetails';
import Documents from './Documents/Documents';
import Declaration from './Declaration/Declaration';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const steps = [
  "Film's Details",
  "Producer's Details",
  "Director's Details",
  "Crew Details",
  "CBFC Certification",
  "Other Details",
  "Documents",
  "Declaration/Payment",
  "Submission"
];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  console.log(activeStep, "activeStep")
  const [completed, setCompleted] = useState({});
  const [formData, setFormData] = useState({});
  const [filmErrors, setFilmErrors] = useState({});
  const [producerErrors, setProducerErrors] = useState({});
  const [directorErrors, setDirectorErrors] = useState({});
  const [crewErrors, setCrewErrors] = useState({});
  const [cbfcErrors, setCbfcErrors] = useState({});
  const [otherErrors, setOtherErrors] = useState({});
  const [documentErrors, setDocumentErrors] = useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };




  const handleNext = () => {
    // console.log(activeStep, "activeStep")

    if (activeStep === 0) {
      // Validation for the Film Details step
      const { isValid, errors } = validateFilmDetails(formData);
      console.log(errors);
      if (!isValid) {
        setFilmErrors(errors);
        return; // Stop execution if validation fails
      }
    }

    if (activeStep === 1) {
      // Validation for the Producer Details step
      const { isValidProducer, errorsProducer } = validateProducerDetails(formData);
      console.log(isValidProducer, "isValidProducer")
      if (!isValidProducer) {
        setProducerErrors(errorsProducer);
        return; // Stop execution if validation fails
      }
    }

    if (activeStep === 2) {
      // Validation for the Director Details step
      const { isValidDirector, errorsDirector } = validateDirectorDetails(formData);
      //    console.log(isValidProducer, "isValidProducer")
      if (!isValidDirector) {
        setDirectorErrors(errorsDirector);
        return;
      }
    }

    if (activeStep === 3) {
      // Validation for the Crew Details step
      const { isValidCrew, errorsCrew } = validateCrewDetails(formData);
      if (!isValidCrew) {
        setCrewErrors(errorsCrew);
        return;
      }
    }

    if (activeStep === 4) {
      // Validation for the CBFC Certification Details step
      const { isValidCbfc, errorsCbfc } = validateCbfcDetails(formData);
      if (!isValidCbfc) {
        setCbfcErrors(errorsCbfc);
        return;
      }
    }

    if (activeStep === 5) {
      // Validation for the Other Details step
      const { isValidOther, errorsOther } = validateOtherDetails(formData);
      if (!isValidOther) {
        setOtherErrors(errorsOther);
        return;
      }
    }

    if (activeStep === 6) {
      // Validation for the Other Details step
      const { isValidDocument, errorsDocument } = validateDocumentDetails(formData);
      if (!isValidDocument) {
        setDocumentErrors(errorsDocument);
        return;
      }
    }

    const newActiveStep = isLastStep()
      ? steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateFilmDetails = (formData) => {
    const { title_of_film_in_roman, title_of_film_in_devanagari, english_translation_of_film, title_of_script_langauge, whether_subtitle_english, is_dcp_unencrypted, language_of_film, dci_compliant_jpeg_2000, subtitle_to_be_burned_in_picture, dcp_should_cru_hard_disk, hard_disk_partition_format, blueray, value_of_dcp_or_blueray } = formData;
    const errors = {};

    if (!title_of_film_in_roman) {
      errors.title_of_film_in_roman = 'Title of the film in roman is required';
    }

    if (!title_of_film_in_devanagari) {
      errors.title_of_film_in_devanagari = 'Title of the film in devanagari is required';
    }
    if (!english_translation_of_film) {
      errors.english_translation_of_film = 'English translation of film is required';
    }

    // if (!title_of_script_langauge) {
    //     errors.title_of_script_langauge = 'Title of script language is required';
    // }

    if (!whether_subtitle_english) {
      errors.whether_subtitle_english = 'Whether subtitle english language is required';
    }
    if (!is_dcp_unencrypted) {
      errors.is_dcp_unencrypted = 'Is dcp unencrypted is required';
    }

    // if (!language_of_film) {
    //     errors.language_of_film = 'Title of script language is required';
    // }

    if (!value_of_dcp_or_blueray) {
      errors.value_of_dcp_or_blueray = 'Value of dcp or blueray is required';
    }

    // if (!dci_compliant_jpeg_2000) {
    //   errors.dci_compliant_jpeg_2000 = 'DCI compliant is required';
    // }

    // if (!subtitle_to_be_burned_in_picture) {
    //   errors.subtitle_to_be_burned_in_picture = 'Subtitle to be burned in picture is required';
    // }

    // if (!dcp_should_cru_hard_disk) {
    //   errors.dcp_should_cru_hard_disk = 'DCP should CRU Hard Disk is required';
    // }

    // if (!hard_disk_partition_format) {
    //   errors.hard_disk_partition_format = 'Hard disk partition format is required';
    // }

    if (!value_of_dcp_or_blueray) {
      errors.value_of_dcp_or_blueray = 'Value of dcp or blueray is required';
    }
    // if (!blueray) {
    //     errors.blueray = "DCP or Blueray is required";
    // }





    const isValid = Object.keys(errors).length === 0;

    return { isValid, errors };
  };

  const validateProducerDetails = (formData) => {
    const { right_holder_address, right_holder_mobile, right_holder_landline, right_holder_email, right_holder_name, whether_indian_foreign_right_holder_same, right_holder_fax_number, is_address_same_as_producer, company_is_registered_as_indian_entity, producer_is, firm_is_owned_by_individual, name_of_firm, producer_email, email_producer, producer_landline, producer_mobile, producer_website, producer_address, producer_id_proof } = formData;
    const errorsProducer = {};


    if (!right_holder_address) {
      errorsProducer.right_holder_address = "Right holder address is required"
    }
    if (!right_holder_mobile) {
      errorsProducer.right_holder_mobile = "Right holder mobile is required"
    }
    if (!right_holder_landline) {
      errorsProducer.right_holder_landline = "Right holder landline is required"
    }

    if (!right_holder_email) {
      errorsProducer.right_holder_email = "Right holder email is required"
    }
    if (!right_holder_name) {
      errorsProducer.right_holder_name = "Right holder name is required"
    }
    if (!whether_indian_foreign_right_holder_same) {
      errorsProducer.whether_indian_foreign_right_holder_same = "Wheather Indian foreign right holder is required"
    }
    if (!right_holder_fax_number) {
      errorsProducer.right_holder_fax_number = "Fax no is required"
    }


    if (!is_address_same_as_producer) {
      errorsProducer.is_address_same_as_producer = "Is the address same as Producer yes or no required";
    }

    if (!company_is_registered_as_indian_entity) {
      errorsProducer.company_is_registered_as_indian_entity = "Company is Registered as an Indian entity is required";
    }

    if (!producer_is) {
      errorsProducer.producer_is = "Producer is required";
    }

    if (!firm_is_owned_by_individual) {
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

    if (!email_producer) {
      errorsProducer.email_producer = "Email is required";
    }

    if (!producer_website) {
      errorsProducer.producer_website = "Producer website is required";
    }
    if (!producer_address) {
      errorsProducer.producer_address = "Producer address is required";
    }
    if (!producer_id_proof) {
      errorsProducer.producer_id_proof = "Producer id proof is required"
    }


    const isValidProducer = Object.keys(errorsProducer).length === 0;

    return { isValidProducer, errorsProducer };
  };

  const validateDirectorDetails = (formData) => {
    const { director_name, director_email, director_landline, director_mobile, director_fax, director_website, director_address, producer_email, email_producer, producer_landline, producer_mobile, producer_website, producer_address, producer_id_proof } = formData;
    const errorsDirector = {};

    if (!director_name) {
      errorsDirector.director_name = "Director name is required";
    }

    if (!director_email) {
      errorsDirector.director_email = "Director email is required";
    }

    if (!director_landline) {
      errorsDirector.director_landline = "Director landline is required";
    }
    if (!director_mobile) {
      errorsDirector.director_mobile = "Director mobile is required";
    }
    if (!director_fax) {
      errorsDirector.director_fax = "Director fax is required";
    }
    if (!director_website) {
      errorsDirector.director_website = "Director website is required";
    }
    if (!director_address) {
      errorsDirector.director_address = "Director address is required";
    }


    const isValidDirector = Object.keys(errorsDirector).length === 0;

    return { isValidDirector, errorsDirector };
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
    if (!sound_re_recordist_optional) {
      errorsCrew.sound_re_recordist_optional = "Sound re recordist is required";
    }

    if (!principal_cast_optional) {
      errorsCrew.principal_cast_optional = "Principal cast is required";
    }

    if (!duration_running_time) {
      errorsCrew.duration_running_time = "duration running is required";
    }

    if (!no_of_dcp_blueray) {
      errorsCrew.no_of_dcp_blueray = "No of dcp blueray is required";
    }

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
    const { film_is_certified_by_cbfc_or_uncensored, date_of_cbfc_certificate, certificate_no, declaration_clause_file, file_cbfc_certificate } = formData;
    const errorsCbfc = {};

    if (!film_is_certified_by_cbfc_or_uncensored) {
      errorsCbfc.film_is_certified_by_cbfc_or_uncensored = "Film is certified by cbfc or uncensored is required";
    }

    if (!date_of_cbfc_certificate) {
      errorsCbfc.date_of_cbfc_certificate = "Date of cbfc is required";
    }

    if (!certificate_no) {
      errorsCbfc.certificate_no = "Certificate is required";
    }

    if (!declaration_clause_file) {
      errorsCbfc.declaration_clause_file = "Declaration clause is required";
    }

    if (!file_cbfc_certificate) {
      errorsCbfc.file_cbfc_certificate = "Cbfc certificate is required";
    }

    const isValidCbfc = Object.keys(errorsCbfc).length === 0;
    return { isValidCbfc, errorsCbfc };
  };

  const validateOtherDetails = (formData) => {
    const { film_comletion_during_12month, film_screened_any_indian_international_festival, name_of_festival, address_of_festival, date_of_festival, film_shown_broadcast_on_internate_tv, film_screened_commercially_inside_india, film_screened_commercially_outside_india, film_participated_in_any_compentitaion, is_directore_debute_film, film_distribution_limited_to_india_only, date_of_release, name_of_country, date_of_release_date, name_of_compentitaion_festival, details_of_awards_won_if_any } = formData;
    const errorsOther = {};

    if (!film_comletion_during_12month) {
      errorsOther.film_comletion_during_12month = "Film completion during 12th month is required";
    }
    if (!film_screened_any_indian_international_festival) {
      errorsOther.film_screened_any_indian_international_festival = "Film screened any indian international festival is required";
    }

    if (!name_of_festival) {
      errorsOther.name_of_festival = "Name of festival is required";
    }

    if (!address_of_festival) {
      errorsOther.address_of_festival = "Address of festival is required";
    }

    if (!date_of_festival) {
      errorsOther.date_of_festival = "Date of festival is required";
    }

    if (!film_shown_broadcast_on_internate_tv) {
      errorsOther.film_shown_broadcast_on_internate_tv = "Film shown broadcast on internate tv is required";
    }

    if (!film_screened_commercially_inside_india) {
      errorsOther.film_screened_commercially_inside_india = "Film screened commercially inside india is required";
    }
    if (!film_screened_commercially_outside_india) {
      errorsOther.film_screened_commercially_outside_india = "Film screened commercially outside india is required";
    }
    if (!film_participated_in_any_compentitaion) {
      errorsOther.film_participated_in_any_compentitaion = "Film participated in any international competition is required";
    }

    if (!is_directore_debute_film) {
      errorsOther.is_directore_debute_film = "Is Director debute film is required yes or no";
    }

    if (!film_distribution_limited_to_india_only) {
      errorsOther.film_distribution_limited_to_india_only = "Film distribution limited to india only is required yes or no";
    }

    if (!date_of_release) {
      errorsOther.date_of_release = "Date of release is required";
    }

    if (!name_of_country) {
      errorsOther.name_of_country = "Name of country is required";
    }


    if (!date_of_release_date) {
      errorsOther.date_of_release_date = "Date of release date is required";
    }

    if (!name_of_compentitaion_festival) {
      errorsOther.name_of_compentitaion_festival = "Name of compentitation festival is required";
    }

    if (!details_of_awards_won_if_any) {
      errorsOther.details_of_awards_won_if_any = "Details of awards won if any is required";
    }

    const isValidOther = Object.keys(errorsOther).length === 0;
    return { isValidOther, errorsOther };
  };

  const validateDocumentDetails = (formData) => {
    const { authorization_latter, declaration_latter, synopsis_in_english, directors_profile, producers_profile, details_of_cast_crew, requisite_documents } = formData;
    const errorsDocument = {};

    if (!authorization_latter) {
      errorsDocument.authorization_latter = "Authorization latter is required";
    }

    if (!declaration_latter) {
      errorsDocument.declaration_latter = "Declaration latter is required";
    }

    if (!synopsis_in_english) {
      errorsDocument.synopsis_in_english = "Synopsis in english is required";
    }

    if (!directors_profile) {
      errorsDocument.directors_profile = "Director profile is required";
    }

    if (!producers_profile) {
      errorsDocument.producers_profile = "Producer profile is required";
    }

    if (!details_of_cast_crew) {
      errorsDocument.details_of_cast_crew = "Details of cast crew is required";
    }
    if (!requisite_documents) {
      errorsDocument.requisite_documents = "Requisite documents is required";
    }

    const isValidDocument = Object.keys(errorsDocument).length === 0;
    return { isValidDocument, errorsDocument };
  };


  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <FilmDetails formData={formData} setFormData={setFormData} errors={filmErrors} />;
      case 1:
        return <ProducerDetails formData={formData} setFormData={setFormData} errors={producerErrors} />;
      case 2:
        return <DirectorDetails formData={formData} setFormData={setFormData} errors={directorErrors} />;
      case 3:
        return <CrewDetails formData={formData} setFormData={setFormData} errors={crewErrors} />;
      case 4:
        return <CbfcCertification formData={formData} setFormData={setFormData} errors={cbfcErrors} />;
      case 5:
        return <OtherDetails formData={formData} setFormData={setFormData} errors={otherErrors} />;
      case 6:
        return <Documents formData={formData} setFormData={setFormData} errors={documentErrors} />;
      case 7:
        return <Declaration />;
      default:
        return 'Unknown step';
    }
  };












  return (
    <Box className="stepper">
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-12 col-md-12 col-lg-12'>
            <img src={IP_Page} alt="IP" width="100%" height="130px" />
          </div>
        </div>
      </div>
      <div>
        <h1 className='text-center mt-4'>INDIAN PANOROMA FORM - I</h1>
      </div>
      <Stepper nonLinear activeStep={activeStep} sx={{
        width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
        display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex' },
        alignItems: { xs: 'flex-start', sm: 'flex-start', md: 'flex-start', lg: 'flex' },
        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' }
      }} >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={() => setActiveStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <div>
        <Typography variant="h5">{steps[activeStep]}</Typography>
        {renderStepContent(activeStep)}
        <div>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>

          {activeStep !== steps.length - 1 && (
            <Button variant="contained" onClick={handleNext}>
              {isLastStep() ? 'Finish' : 'Next'}
            </Button>
          )}
        </div>
      </div>
    </Box>
  );
}
