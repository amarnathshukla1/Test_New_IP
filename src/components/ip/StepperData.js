import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import IFFFI_LOGO from "../../images/IFFFI_LOGO.png"
import ashok_logo from "../../images/ashok-logo.png"
import NFDC_logo from "../../images/NFDC-Logo.png"
import FilmDetails from './FilmDetails/FilmDetails';
import ProducerDetails from './ProducerDetails/ProducerDetails';
import DirectorDetails from './DirectorDetails/DirectorDetails';
import CrewDetails from './CrewDetails/CrewDetails';
import CbfcCertification from './CbfcCertification/CbfcCertification';
import OtherDetails from './OtherDetails/OtherDetails';
import Documents from './Documents/Documents';
import Declaration from './Declaration/Declaration';
import StepLabel from '@mui/material/StepLabel';
import { postRequest, getRequest } from '../../API/IP';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { convertDate, validateEmail } from '../Helper';
import Preview from './Preview/Preview';
import Submission from './Submission/Submission';
import Typography from '@mui/material/Typography';
// import Success from "../../../images/Success.png"
import Success from "../../images/Success.png"
// import AlertMessage from '../../AlertMessage';
import AlertMessage from '../AlertMessage';
import { useMediaQuery, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Link }  from 'react-router';
import Loader from '../common/Loader/Loader';

const steps = [
    "Film's Details",
    "Producer's Details",
    "Director's Details",
    "Crew Details",
    "CBFC Certification",
    "Other Details",
    "Documents",
    "Preview",
    "Declaration/Payment",
    "Submission"
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const ModalComponent = ({ show, handleClose }) => {

    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" style={{ maxWidth: '60%' }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>(1) Please exercise great care in filling this form as it is the PRIMARY SOURCE of the data for NFDC and will be reflected in its publications. No request for change of details would be entertained at any stage.</p>
                        <p>(2) <b>The Producer must ensure that the name indicated in the entry form tally with the credit titles appearing in the Film.</b></p>
                        <p>(3) Entry Form must be filed by the Producer only</p>
                        <p><b>(4) Fields marked with * are mandatory</b></p>
                        <p>(5) The last date of filling the online entry form is 10th August, 2023 till 6.00 PM. The last date of receiving the hard copy of the filled online form along with the requisite materials is 18th August, 2023. (NOTE:- Both the versions of applications from must be same.)</p>
                        <p><b>(6) Original signed & stamped Form IP-I, Form IP-II, Declaration (as per clause No. 7.2 (c)), & Receipt of the online payment of entry fee must be sent (in Hard Copy) along the All Attached Documents.</b></p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" style={{ backgroundColor: '#B45880', color: 'white' }} onClick={handleClose}>Ok</button>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default function HorizontalNonLinearStepper() {
    const [loading, setLoading] = useState(true);
    const { id = null, ip_step = 1 } = useParams();

    const dashboardnavi = useNavigate();


    const scrollUp = () => {
        console.log("test");
        const body = document.querySelector('#root');

        body.scrollIntoView({
            behavior: 'smooth'
        }, 500)
    }
    // scrollUp()

    const verifyExistingRecord = async () => {
        if (id) return true;

        const predata = await getRequest('list');
        const data = predata.data;
        if (data.length >= 5) {
            alert("You have reached maximum limit.");
            dashboardnavi("/dashboard");
        }

    }
    const [activeStatus, setActiveStatus] = useState(1);

    const [preData, setPredata] = useState({});

    const loadpreData = async () => {
        if (id) {
          try {
            console.log('Fetching data...');
            const predata = await getRequest(`ip_details/${id}`, {}); // Make sure this function is defined and working correctly
            const loadpredata = predata.data;
            console.log('Data fetched:', loadpredata);
    
            setActiveStatus(loadpredata.step);
            setActiveStep(loadpredata.step);
            
            const documentData = {};
            if (loadpredata.documents) {
              for (const document of loadpredata.documents) {
                switch(document.type) {
                  case 1: loadpredata.is_producer_id_proof = 1; break;
                  case 2: loadpredata.is_director_id_proof = 1; break;
                  case 3: loadpredata.is_declaration_clause_file = 1; break;
                  case 4: loadpredata.is_file_cbfc_certificate = 1; break;
                  case 5: loadpredata.is_authorization_latter = 1; break;
                  case 6: loadpredata.is_declaration_latter = 1; break;
                  case 7: loadpredata.is_synopsis_in_english = 1; break;
                  case 8: loadpredata.is_directors_profile = 1; break;
                  case 9: loadpredata.is_producers_profile = 1; break;
                  case 10: loadpredata.is_details_of_cast_crew = 1; break;
                  default: break;
                }
                documentData[document.type] = {
                  file: document.file,
                  name: document.name
                }
              }
            }
            loadpredata.documentData = documentData;
    
            setFormData({
              ...loadpredata,
              date_of_cbfc_certificate: dayjs(loadpredata.date_of_cbfc_certificate),
              date_of_completion_production: dayjs(loadpredata.date_of_completion_production),
              date_of_festival: dayjs(loadpredata.date_of_festival),
              date_of_release: dayjs(loadpredata.date_of_release_india),
              date_of_release_date: dayjs(loadpredata.date_of_release_outside),
            });
    
            setPredata(loadpredata);
            setLoading(false); // Ensure loading is set to false after fetching data
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false); // Ensure loading is set to false even if an error occurs
          }
        }
      }
    useEffect(() => {
        console.log('Component mounted or id changed');
        verifyExistingRecord(); // Ensure this function is defined and working correctly
        loadpreData();
        setActiveStep(parseInt(ip_step - 1))

      }, [id]); // Depend on id to refetch data if it changes

    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0);
    console.log(activeStep, "activeStepDetails")
    const [completed, setCompleted] = useState({});
    // console.log(completed, "completed")

    const [formData, setFormData] = useState({

    });
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

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = async () => {


        const newCompleted = { ...completed };
        newCompleted[activeStep] = true;
        // handleNext();
        scrollUp()
        if (activeStep === 0) {


            // Validation for the Film Details step
            const { isValid, errors } = validateFilmDetails(formData);

            if (!isValid) {

                setFilmErrors(errors);
                return;
            }
            setLoading(true);
            // setTimeout(() => {
            //     setLoading(false);
            // }, 7000);
            try {

                if (id) {
                    formData['last_id'] = id
                }
                const response = await postRequest("ip_applcation_form", { ...formData, step: 1 });

                if (response.status) {
                    navigate(`/ip/${response.data.id}/`);
                    setActiveStep(1);
                } else {
                    alert(response.message)
                }

            } catch (error) {
                console.error("Error:", error);
            } finally {
                // setTimeout(() => {
                //     setLoading(false);
                // }, 700000);
                setLoading(false)
                
            }
            // formData.step=1;
            // await postRequest("ip_applcation_form",formData);
        }

        if (activeStep === 1) {
            // Validation for the Producer Details step
            const { isValidProducer, errorsProducer } = validateProducerDetails(formData);
            // console.log(isValidProducer, "isValidProducer")
            console.log(errorsProducer)
            if (!isValidProducer) {
                setProducerErrors(errorsProducer);
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
                last_id: id
            };
            console.log({ updatedFormData });
            setLoading(true)
            try {
                const producer_data_check = await postRequest("ip_applcation_form", updatedFormData);

                if (producer_data_check.status) {
                    handleNext();
                    //navigate(`/ip/${id}/2`);
                    // setActiveStep(2);
                }
                else {
                    alert(producer_data_check.message)
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false); // Set loading to false when the API call finishes
            }
        }

        if (activeStep === 2) {
            // Validation for the Director Details step
            const { isValidDirector, errorsDirector } = validateDirectorDetails(formData);
            // console.log(isValidDirector, "isValidDirector")
            console.log(errorsDirector)
            if (!isValidDirector) {
                setDirectorErrors(errorsDirector);
                return;
            }

            if (!id && false) {
                console.error("ID is not available.");
                return;
            }
            const updatedFormData = {
                ...formData,
                step: 3,
                last_id: id
            };
            setLoading(true)
            try {
                const producer_data_check = await postRequest("ip_applcation_form", updatedFormData);
                console.log(producer_data_check);
                if (producer_data_check.status) {
                    handleNext();
                    //navigate(`/ip/${id}/2`);
                    // setActiveStep(2);
                }
                //                    handleNext();
                else {
                    alert(producer_data_check.message)
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false); // Set loading to false when the API call finishes
            }
        }

        if (activeStep === 3) {
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
                last_id: id
            };
            // try {
            //     await postRequest("ip_applcation_form", updatedFormData);
            // } catch (error) {
            //     console.error("Error:", error);
            // }
            setLoading(true)
            try {
                const producer_data_check = await postRequest("ip_applcation_form", updatedFormData);


                if (producer_data_check.status) {
                    handleNext();
                    //navigate(`/ip/${id}/2`);
                    // setActiveStep(2);
                }
                // handleNext();
                else {
                    alert(producer_data_check.message)
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false); // Set loading to false when the API call finishes
            }
        }

        if (activeStep === 4) {
            // Validation for the CBFC Certification Details step
            const { isValidCbfc, errorsCbfc } = validateCbfcDetails(formData);
            // console.log(isValidCbfc, "isValidCbfc")
            console.log(errorsCbfc)

            if (!isValidCbfc) {
                setCbfcErrors(errorsCbfc);
                return;
            }
            if (!id) {
                console.error("ID is not available.");
                return;
            }
            const updatedFormData = {
                ...formData,
                step: 5,
                last_id: id
            };
            // try {
            //     await postRequest("ip_applcation_form", updatedFormData);
            // } catch (error) {
            //     console.error("Error:", error);
            // } convertDate
            setLoading(true)
            try {
                updatedFormData.date_of_cbfc_certificate = convertDate(updatedFormData.date_of_cbfc_certificate);
                updatedFormData.date_of_completion_production = convertDate(updatedFormData.date_of_completion_production);
                const producer_data_check = await postRequest("ip_applcation_form", updatedFormData);


                if (producer_data_check.status) {
                    handleNext();
                    //navigate(`/ip/${id}/2`);
                    // setActiveStep(2);
                    // navigate(`/ip/${id}/5`);
                    // setActiveStep(5);
                }
                else {
                    alert(producer_data_check.message)
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false); // Set loading to false when the API call finishes
            }
        }

        if (activeStep === 5) {
            // Validation for the Other Details step
            const { isValidOther, errorsOther } = validateOtherDetails(formData);
            // console.log(isValidOther,"isValidOther")
            console.log(errorsOther)
            if (!isValidOther) {
                setOtherErrors(errorsOther);
                return;
            }
            if (!id) {
                console.error("ID is not available.");
                return;
            }
            const updatedFormData = {
                ...formData,
                step: 6,
                last_id: id
            };
            // try {
            //     await postRequest("ip_applcation_form", updatedFormData);
            // } catch (error) {
            //     console.error("Error:", error);
            // }
            setLoading(true)
            try {

                updatedFormData.date_of_festival = convertDate(updatedFormData.date_of_festival);
                updatedFormData.date_of_release_india = convertDate(updatedFormData.date_of_release);
                updatedFormData.date_of_release_outside = convertDate(updatedFormData.date_of_release_date);

                const producer_data_check = await postRequest("ip_applcation_form", updatedFormData);

                if (producer_data_check.status) {
                    handleNext();
                    //navigate(`/ip/${id}/2`);
                    // setActiveStep(2);
                    // navigate(`/ip/${id}/6`);
                    // setActiveStep(6);
                }
                else {
                    alert(producer_data_check.message)
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false); // Set loading to false when the API call finishes
            }
        }

        if (activeStep === 6) {
            // Validation for the Other Details step
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
                step: 7,
                last_id: id
            };
            // try {
            //     await postRequest("ip_applcation_form", updatedFormData);
            // } catch (error) {
            //     console.error("Error:", error);
            // }
            setLoading(true)

            try {
                const producer_data_check = await postRequest("ip_applcation_form", updatedFormData);

                if (producer_data_check.status) {
                    handleNext();
                    //navigate(`/ip/${id}/2`);
                    // setActiveStep(2);

                    // navigate(`/ip/${id}/7`);
                    // setActiveStep(7);
                }
                else {
                    alert(producer_data_check.message)
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false); // Set loading to false when the API call finishes
            }
        }

        if (activeStep === 7) {

            const updatedFormData = {
                ...formData,
                step: 8,
                last_id: id
            };
            setLoading(true)
            try {
                const producer_data_check = await postRequest("ip_applcation_form", updatedFormData);

                if (producer_data_check.status)
                    handleNext();
                else {
                    alert(producer_data_check.message)
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false); // Set loading to false when the API call finishes
            }
        }
        // setCompleted(newCompleted);

        if (activeStep === steps.length - 1) {
            // Final Step
            await submitFormData();
        } else {
            // Check if the next step is not completed before proceeding
            if (!isStepCompleted(activeStep + 1)) {
                // Proceed to the next step
                handleNext();
            }
        }

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

    const validateFilmDetails = (formData) => {

        const { hard_disk_format_ext2_ext3, is_pendrive_containing_hd_files, blueray_region_free_pal, dcp, category, language_id, film_format, title_of_film_in_roman, title_of_film_in_devanagari, english_translation_of_film, title_of_script_langauge, whether_subtitle_english, is_dcp_unencrypted, language_of_film, dci_compliant_jpeg_2000, subtitle_to_be_burned_in_picture, dcp_should_cru_hard_disk, hard_disk_partition_format, blueray, value_of_dcp_or_blueray } = formData;
        const errors = {};

        if (!is_pendrive_containing_hd_files && dcp == 3) {
            errors.is_pendrive_containing_hd_files = 'Select one option';
        }
        if (!hard_disk_format_ext2_ext3 && dcp == 1) {
            errors.hard_disk_format_ext2_ext3 = 'This option is required';
        }


        if (!subtitle_to_be_burned_in_picture && dcp == 1) {
            errors.subtitle_to_be_burned_in_picture = "Subtitle to be burned in picture is required"
        }

        if (!dcp_should_cru_hard_disk && dcp == 1) {
            errors.dcp_should_cru_hard_disk = "Dcp should cru hard disk is required"
        }

        if (!dci_compliant_jpeg_2000 && dcp == 1) {
            errors.dci_compliant_jpeg_2000 = "Dci compliant jpej 2000 is required"
        }

        if (!blueray_region_free_pal && dcp == 2) {
            errors.blueray_region_free_pal = 'Select one option';
        }

        if (dcp == 1 && !is_dcp_unencrypted) {
            errors.is_dcp_unencrypted = 'Is dcp unencrypted is required';
        }

        if (!dcp) {
            errors.dcp = 'Select one option';
        }
        if (!language_id) {
            errors.language_id = 'Select language of the film';
        }
        if (!category) {
            errors.category = 'Select the category';
        }

        if (!title_of_film_in_roman) {
            errors.title_of_film_in_roman = 'Enter film title in roman';
        }

        if (!title_of_film_in_devanagari) {
            errors.title_of_film_in_devanagari = 'Enter film title in devganagari';
        }
        if (!english_translation_of_film) {
            errors.english_translation_of_film = 'Enter film title in english';
        }

        if (!title_of_script_langauge) {
            errors.title_of_script_langauge = "Enter title of the film"
        }

        if (!whether_subtitle_english && language_id != 5) {
            errors.whether_subtitle_english = 'Subtitle must be in english';
        }

        if (dcp == '1' && !is_dcp_unencrypted) {
            errors.is_dcp_unencrypted = 'Select one option';
        }

        // if (!language_of_film) {
        //     errors.language_of_film = 'Title of script language is required';
        // } blueray_region_free_pal

        if (!value_of_dcp_or_blueray) {
            // errors.value_of_dcp_or_blueray = 'Value of dcp or blueray is required';
        }

        if (dcp == '1' && !dci_compliant_jpeg_2000) {
            errors.dci_compliant_jpeg_2000 = 'This option is required';
        }

        if (dcp == '1' && !subtitle_to_be_burned_in_picture) {
            errors.subtitle_to_be_burned_in_picture = 'This option is required';
        }

        if (dcp == '1' && !dcp_should_cru_hard_disk) {
            errors.dcp_should_cru_hard_disk = 'This option is required';
        }

        if (dcp == '1' && !hard_disk_partition_format) {
            //  errors.hard_disk_partition_format = 'Hard disk partition format is required';
        }

        if (!value_of_dcp_or_blueray) {
            errors.value_of_dcp_or_blueray = 'Enter the value';
        }
        // if (!blueray) {
        //     errors.blueray = "DCP or Blueray is required";
        // }

        const isValid = Object.keys(errors).length === 0;

        return { isValid, errors };
    };

    const validateProducerDetails = (formData) => {

        const { producer_is, is_producer_id_proof = null, name_of_producers, return_address, return_address_mobile, return_address_landline, return_address_email, return_address_name, name_of_production_house, right_holder_address, right_holder_mobile, right_holder_landline, right_holder_email, right_holder_name, whether_indian_foreign_right_holder_same, right_holder_fax_number, is_address_same_as_producer, company_is_registered_as_indian_entity, firm_is_owned_by_individual, name_of_firm, producer_email, email_producer, producer_landline, producer_mobile, producer_website, producer_address, producer_id_proof, name_of_the_producer_making_entry } = formData;
        const errorsProducer = {};

        // if (!name_of_producers) { producer_is
        //     errorsProducer.name_of_producers = ""
        // }

        // && (is_address_same_as_producer===0 || is_address_same_as_producer ==='0')




        if ((!return_address && (is_address_same_as_producer === 0 || is_address_same_as_producer === '0'))) {
            errorsProducer.return_address = "Enter your address"
        }

        if ((!return_address_mobile && (is_address_same_as_producer === 0 || is_address_same_as_producer === '0'))) {
            errorsProducer.return_address_mobile = "Enter mobile number"
        } else {
            if (return_address_mobile) {
                if (return_address_mobile.length < 10) {
                    errorsProducer.return_address_mobile = "Mobile number must be of 10 digit.";
                }
            }
        }

        if (!return_address_landline && (is_address_same_as_producer === 0 || is_address_same_as_producer === '0')) {
            // errorsProducer.return_address_landline = "Return address landline is required"
        }

        if ((!return_address_email && (is_address_same_as_producer === 0 || is_address_same_as_producer === '0'))) {
            errorsProducer.return_address_email = "Enter Email id."
        }
        // else {
        //     if (!validateEmail(return_address_email)) {
        //         errorsProducer.return_address_email = "Email is not valid.";
        //     }
        // }
        else if (return_address_email && !validateEmail(return_address_email)) {
            errorsProducer.return_address_email = "Email is not valid.";
        }

        if ((!return_address_name && (is_address_same_as_producer === 0 || is_address_same_as_producer === '0'))) {
            errorsProducer.return_address_name = "Enter your name"
        }


        if ((!right_holder_address && (whether_indian_foreign_right_holder_same === 0 || whether_indian_foreign_right_holder_same === '0'))) {
            errorsProducer.right_holder_address = "Enter your address"
        }
        if ((!right_holder_mobile && (whether_indian_foreign_right_holder_same === 0 || whether_indian_foreign_right_holder_same === '0'))) {
            errorsProducer.right_holder_mobile = "Enter mobile number"
        } else {
            if (right_holder_mobile) {
                if (right_holder_mobile.length < 10) {
                    errorsProducer.right_holder_mobile = "Mobile number must be of 10 digit.";
                }
            }
        }
        if (!right_holder_landline && (whether_indian_foreign_right_holder_same === 0 || whether_indian_foreign_right_holder_same === '0')) {
            // errorsProducer.right_holder_landline = "Right holder landline is required"
        }

        if ((!right_holder_email && (whether_indian_foreign_right_holder_same === 0 || whether_indian_foreign_right_holder_same === '0'))) {
            errorsProducer.right_holder_email = "Enter Email id"
        }
        // else {
        //     if (!validateEmail(right_holder_email)) {
        //         errorsProducer.right_holder_email = "Email is not valid.";
        //     }
        // }
        else if (right_holder_email && !validateEmail(right_holder_email)) {
            errorsProducer.right_holder_email = "Email is not valid.";
        }


        if ((!right_holder_name && (whether_indian_foreign_right_holder_same === 0 || whether_indian_foreign_right_holder_same === '0'))) {
            errorsProducer.right_holder_name = "Enter your name"
        }
        if (!(whether_indian_foreign_right_holder_same == 1 || whether_indian_foreign_right_holder_same === 0 || whether_indian_foreign_right_holder_same === '0')) {
            errorsProducer.whether_indian_foreign_right_holder_same = "Wheather Indian foreign right holder is required"
        }
        if (!right_holder_fax_number && (whether_indian_foreign_right_holder_same === 0 || whether_indian_foreign_right_holder_same === '0')) {
            //  errorsProducer.right_holder_fax_number = "Right holder Fax no is required" firm_is_owned_by_individual
        }


        if (!(is_address_same_as_producer == 1 || is_address_same_as_producer === 0 || is_address_same_as_producer === '0')) {
            errorsProducer.is_address_same_as_producer = "Select one option";
        }
        if (!company_is_registered_as_indian_entity || company_is_registered_as_indian_entity == '0') {

            errorsProducer.company_is_registered_as_indian_entity = "Producer must be an Indian";
        }

        if (!producer_is) {
            errorsProducer.producer_is = "Select the Producer Type";
        }

        if (producer_is == 1 && (firm_is_owned_by_individual === 0 || firm_is_owned_by_individual === '0')) {
            errorsProducer.firm_is_owned_by_individual = "Select the Individual Producer type";
        }

        
        if (!name_of_firm) {
            errorsProducer.name_of_firm = (producer_is === 2) ? "Enter production house name" : (
                (producer_is == 1 && (firm_is_owned_by_individual == 0 || firm_is_owned_by_individual == '0')) ?
                    "Enter producer name"
                    :
                    "Enter firm name"
            )
        }
        if (!producer_email) {
            errorsProducer.producer_email = "Enter email id";
        } else {
            if (!validateEmail(producer_email)) {
                errorsProducer.producer_email = "Email is not valid.";
            }

        }

        if (!producer_landline) {
            // errorsProducer.producer_landline = "Enter landline number";
        }

        if (!producer_mobile) {
            errorsProducer.producer_mobile = "Enter mobile number";
        } else {
            if (producer_mobile.length < 10) {
                errorsProducer.producer_mobile = "Mobile number must be of 10 digit.";
            }
        }

        // if (!email_producer) {
        //     errorsProducer.email_producer = "Email is required";
        // }

        if (!producer_website) {
            // errorsProducer.producer_website = "Producer website is required";
        }
        if (!producer_address) {
            errorsProducer.producer_address = "Enter your address";
        }

        if (!is_producer_id_proof && (company_is_registered_as_indian_entity === 1)) {
            errorsProducer.producer_id_proof = "Attach producer's photo id"
        }


        const isValidProducer = Object.keys(errorsProducer).length === 0;

        return { isValidProducer, errorsProducer };
    };

    const validateDirectorDetails = (formData) => {
        const { is_director_id_proof = null, director_indian_natinality, director_name, director_email, director_landline, director_mobile, director_fax, director_website, director_address, email_producer, producer_landline, producer_mobile, producer_website, producer_address, producer_id_proof, director_id_proof = null } = formData;
        const errorsDirector = {};

        if (!is_director_id_proof) {
            errorsDirector.director_id_proof = "Attach Photo ID"
        }

        if (!director_indian_natinality) {
            errorsDirector.director_indian_natinality = "Director must be an Indian"
        }

        if (!director_name) {
            errorsDirector.director_name = "Enter your name";
        }

        if (!director_email) {
            errorsDirector.director_email = "Enter email id";
        } else {
            if (!validateEmail(director_email)) {
                errorsDirector.director_email = "Email is not valid.";
            }
        }

        if (!director_mobile) {
            errorsDirector.director_mobile = "Enter mobile number";
        } else {
            if ((director_mobile).length < 10 || (director_mobile).length > 10) {
                errorsDirector.director_mobile = "Mobile number must be of 10 digit.";
            }
        }
  
        if (!director_address) {
            errorsDirector.director_address = "Enter your address";
        }


        const isValidDirector = Object.keys(errorsDirector).length === 0;

        return { isValidDirector, errorsDirector };
    };

    const validateCrewDetails = (formData) => {
        const { story_write_aurthor, screenplay_script_write, director_of_photography, editor, art_director, costume_designer, music_director, sound_recordist, sound_re_recordist_optional, principal_cast_optional, duration_running_time, no_of_dcp_blueray, color_b_w, sound_system, aspect_ratio } = formData;
        const errorsCrew = {};

        if (!story_write_aurthor) {
            errorsCrew.story_write_aurthor = "Enter story writer";
        }

        if (!screenplay_script_write) {
            errorsCrew.screenplay_script_write = "Enter script writer";
        }

        if (!director_of_photography) {
            errorsCrew.director_of_photography = "Enter director of photography";
        }
        if (!editor) {
            errorsCrew.editor = "Enter editor";
        }
        if (!art_director) {
            errorsCrew.art_director = "Enter art director";
        }
        if (!costume_designer) {
            // errorsCrew.costume_designer = "Enter costume designer";
        }
        if (!music_director) {
            errorsCrew.music_director = "Enter music director";
        }
        if (!sound_recordist) {
            errorsCrew.sound_recordist = "Enter sound recordist";
        }
        // if (!sound_re_recordist_optional) {
        //     errorsCrew.sound_re_recordist_optional = "Sound re recordist is required";
        // }

        // if (!principal_cast_optional) {
        //     errorsCrew.principal_cast_optional = "Principal cast is required";
        // }

        if (!duration_running_time) {
            errorsCrew.duration_running_time = "Enter duration of the film";
        }

        // if (!no_of_dcp_blueray) {
        //     errorsCrew.no_of_dcp_blueray = "No of dcp blueray is required";
        // }

        if (!color_b_w) {
            errorsCrew.color_b_w = "Mention color or B&W";
        }

        if (!sound_system) {
            errorsCrew.sound_system = "Enter sound system";
        }

        if (!aspect_ratio) {
            errorsCrew.aspect_ratio = "Select aspect ratio";
        }


        const isValidCrew = Object.keys(errorsCrew).length === 0;

        return { isValidCrew, errorsCrew };
    };

    const validateCbfcDetails = (formData) => {
        const { is_declaration_clause_file = null, is_file_cbfc_certificate = null, date_of_completion_production, film_is_certified_by_cbfc_or_uncensored = null, date_of_cbfc_certificate, certificate_no, declaration_clause_file = null, file_cbfc_certificate = null } = formData;
        const errorsCbfc = {};

        if (!film_is_certified_by_cbfc_or_uncensored) {
            errorsCbfc.film_is_certified_by_cbfc_or_uncensored = "Select one option"
        }
        let dataDate = convertDate(date_of_completion_production);
        if ((!date_of_completion_production || dataDate == "NaN-NaN-NaN") && (film_is_certified_by_cbfc_or_uncensored === 2 || film_is_certified_by_cbfc_or_uncensored === '2')) {
            errorsCbfc.date_of_completion_production = "Date of completion production is required"
        }

        if (!is_file_cbfc_certificate && film_is_certified_by_cbfc_or_uncensored == 1) {
            errorsCbfc.file_cbfc_certificate = "Attach CBFC certificate"
        }
        dataDate = convertDate(date_of_cbfc_certificate);
        if ((!date_of_cbfc_certificate || dataDate == "NaN-NaN-NaN") && (film_is_certified_by_cbfc_or_uncensored == 1)) {
            errorsCbfc.date_of_cbfc_certificate = "Date of cbfc certificate is required"
        }

        // if (!(film_is_certified_by_cbfc_or_uncensored == 1 || film_is_certified_by_cbfc_or_uncensored === 0 || film_is_certified_by_cbfc_or_uncensored === '0')) {
        //     //errorsCbfc.film_is_certified_by_cbfc_or_uncensored = "Film is certified by cbfc or uncensored is required";
        // } film_is_certified_by_cbfc_or_uncensored

        // if (!date_of_cbfc_certificate) {
        //     errorsCbfc.date_of_cbfc_certificate = "Date of cbfc is required";
        // }

        if (!certificate_no && (film_is_certified_by_cbfc_or_uncensored == 1)) {
            errorsCbfc.certificate_no = "Enter certificate number";
        }

        if (!is_declaration_clause_file && (film_is_certified_by_cbfc_or_uncensored == 2)) {
            errorsCbfc.declaration_clause_file = "Attach copy of declaration";
        }

        // if(!(film_is_certified_by_cbfc_or_uncensored === 1 || film_is_certified_by_cbfc_or_uncensored === 0)){
        //     errorsCbfc.film_is_certified_by_cbfc_or_uncensored = "Wheather the film is certified by CBFC or uncensored"
        // }


        const isValidCbfc = Object.keys(errorsCbfc).length === 0;
        return { isValidCbfc, errorsCbfc };
    };

    const validateOtherDetails = (formData) => {
        const { film_comletion_during_12month, film_screened, film_broadcast_tv, film_screened_outside_india, film_participated_compentitaion, name_of_festival, address_of_festival, date_of_festival, film_shown_broadcast_on_internate_tv, film_screened_inside_india, is_directore_debute_film, film_distribution_limited_to_india_only, date_of_release, name_of_country, date_of_release_date, name_of_compentitaion_festival, details_of_awards_won_if_any } = formData;
        const errorsOther = {};
        let dataDate;
        let releaseDate;
        if (!(film_comletion_during_12month == 1 || film_comletion_during_12month === 0 || film_comletion_during_12month === '0')) {
            errorsOther.film_comletion_during_12month = "Select one option";
        }
        if (!(film_screened || film_screened === 0 || film_screened === '0')) {
            errorsOther.film_screened = "Select one option";
        }

        if (!name_of_festival && film_screened == 1) {
            errorsOther.name_of_festival = "Enter name of the festival";
        }

        if (!address_of_festival && film_screened == 1) {
            errorsOther.address_of_festival = "Enter address of the festival";
        }
        dataDate = convertDate(date_of_festival);
        if (!date_of_festival || dataDate == "NaN-NaN-NaN" && film_screened == 1) {
            errorsOther.date_of_festival = "Date of festival is required";
        }

        if (!(film_broadcast_tv == 1 || film_broadcast_tv === 0 || film_broadcast_tv === '0')) {
            errorsOther.film_broadcast_tv = "Select one option";
        }

        if (!(film_screened_inside_india == 1 || film_screened_inside_india === 0 || film_screened_inside_india === '0')) {
            errorsOther.film_screened_inside_india = "Select one option";
        }

        dataDate = convertDate(date_of_release);
        if (!date_of_release || dataDate == "NaN-NaN-NaN" && film_screened_inside_india == 1) {
            errorsOther.date_of_release = "Date of release is required";
        }
        if (!(film_screened_outside_india == 1 || film_screened_outside_india === 0 || film_screened_outside_india === '0')) {
            errorsOther.film_screened_outside_india = "Select one option";
        }
        if (!name_of_country && film_screened_outside_india == 1) {
            errorsOther.name_of_country = "Enter name of the country";
        }

        dataDate = convertDate(date_of_release_date);
        if (!date_of_release_date || dataDate == "NaN-NaN-NaN" && film_screened_outside_india == 1) {

            errorsOther.date_of_release_date = "Date of release date is required";
        }
        if (!(film_participated_compentitaion == 1 || film_participated_compentitaion === 0 || film_participated_compentitaion === '0')) {
            errorsOther.film_participated_compentitaion = "Select one option";
        }

        if (!name_of_compentitaion_festival && film_participated_compentitaion == 1) {
            errorsOther.name_of_compentitaion_festival = "Enter festival name";
        }

        if (!(is_directore_debute_film == 1 || is_directore_debute_film === 0 || is_directore_debute_film === '0')) {
            errorsOther.is_directore_debute_film = "Select one option";
        }

        if (!(film_distribution_limited_to_india_only == 1 || film_distribution_limited_to_india_only === 0 || film_distribution_limited_to_india_only === '0')) {
            errorsOther.film_distribution_limited_to_india_only = "Select one option";
        }
        if (!details_of_awards_won_if_any) {
            // errorsOther.details_of_awards_won_if_any = "Details of awards won if any is required";
        }

        const isValidOther = Object.keys(errorsOther).length === 0;
        return { isValidOther, errorsOther };
    };

    const validateDocumentDetails = (formData) => {
        const { is_authorization_latter = null, is_declaration_latter = null, is_synopsis_in_english = null, is_directors_profile = null, is_producers_profile = null, is_details_of_cast_crew = null, requisite_documents } = formData;
        const errorsDocument = {};

        if (!is_authorization_latter) {
            errorsDocument.authorization_latter = "Attach authorization letter";
        }

        if (!is_declaration_latter) {
            errorsDocument.declaration_latter = "Attach declaration letter";
        }

        if (!is_synopsis_in_english) {
            errorsDocument.synopsis_in_english = "Attach synopsis in english";
        }

        if (!is_directors_profile) {
            errorsDocument.directors_profile = "Attach director profile";
        }

        if (!is_producers_profile) {
            errorsDocument.producers_profile = "Attach producer profile";
        }

        if (!is_details_of_cast_crew) {
            errorsDocument.details_of_cast_crew = "Attach cast crew details";
        }
        if (!requisite_documents) {
            errorsDocument.requisite_documents = "Material at serial number (a),(b),(c) are mandatory";
        }

        const isValidDocument = Object.keys(errorsDocument).length === 0;
        return { isValidDocument, errorsDocument };
    };

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      };
   
      const handleBack = () => {
        if (activeStep > 0) {
          setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
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
                return <FilmDetails preData={preData} formData={formData} setFormData={setFormData} errors={filmErrors} setFilmErrors={setFilmErrors} />;
            case 1:
                return <ProducerDetails addCoproducer={addCoproducer} preData={preData} formData={formData} setFormData={setFormData} errors={producerErrors} setProducerErrors={setProducerErrors} />;
            case 2:
                return <DirectorDetails preData={preData} formData={formData} setFormData={setFormData} errors={directorErrors} setDirectorErrors={setDirectorErrors} />;
            case 3:
                return <CrewDetails preData={preData} formData={formData} setFormData={setFormData} errors={crewErrors} setCrewErrors={setCrewErrors} />;
            case 4:
                return <CbfcCertification preData={preData} formData={formData} setFormData={setFormData} errors={cbfcErrors} setCbfcErrors={setCbfcErrors} />;
            case 5:
                return <OtherDetails preData={preData} formData={formData} setFormData={setFormData} errors={otherErrors} setOtherErrors={setOtherErrors} />;
            case 6:
                return <Documents preData={preData} formData={formData} setFormData={setFormData} errors={documentErrors} setDocumentErrors={setDocumentErrors} />;
            case 7:
                return <Preview formData={formData} setActiveStep={setActiveStep} />
            case 8:
                return <Declaration formData={formData} />;
            case 9:
                return <Submission />;
            default:
                return 'Unknown step';
        }
    };
    //   console.log(ip_step)
    const [showModal, setShowModal] = useState((id) ? false : true);

    const [open, setOpen] = useState((id) ? false : true);

    const [alertData, setAlertData] = useState({
        heading: "",
        content: ""
    });


    useEffect(() => {
        setAlertData({
            heading: (<>

                <h5>Note</h5>

            </>),
            content:
                (
                    <>
                        <div>
                            <p>(1) Please exercise great care in filling this form as it is the PRIMARY SOURCE of the data for NFDC and will be reflected in its publications. No request for change of details would be entertained at any stage.</p>
                            <p>(2) <b>The Producer must ensure that the name indicated in the entry form tally with the credit titles appearing in the Film.</b></p>
                            <p>(3) Entry Form must be filed by the Producer only</p>
                            <p><b>(4) Fields marked with * are mandatory</b></p>
                            <p>(5) The last date of filling the online entry form is 10th August, 2023 till 6.00 PM. The last date of receiving the hard copy of the filled online form along with the requisite materials is 18th August, 2023. (NOTE:- Both the versions of applications from must be same.)</p>
                            <p><b>(6) Original signed & stamped Form IP-I, Form IP-II, Declaration (as per clause No. 7.2 (c)), & Receipt of the online payment of entry fee must be sent (in Hard Copy) along the All Attached Documents.</b></p>
                        </div>
                    </>
                )
        });
        handleClickOpen();
    }, []);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        // Redirect to home page
        // navigate('/dashboard');
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    useEffect(() => {
        // setShowModal((id) ? false : true);
        setOpen((id) ? false : true);

    }, []);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const allStepsCompleted = () => {
        return Object.keys(completed).length === steps.length;
      };
      
      console.log('Current loading state:', loading);
      console.log('Current preData:', preData);
      console.log('Current activeStep:', activeStep);
      console.log('Current formData:', formData);
    return (

        <>
            {/* <ModalComponent show={showModal} handleClose={handleCloseModal} /> */}

            <AlertMessage handleClickOpen={handleClickOpen} setOpen={setOpen} open={open} handleClose={handleClose} data={alertData} />



     
            {loading && <Loader />}


            <Box className={`steppper ${loading ? 'loading' : ''}`}>
          <div className='container'>
      <div className='row justify-content-center align-items-center mt-2 mb-2'>
        <div className='col-4 col-md-3 col-lg-4 col-xl-4'>
          <img src={IFFFI_LOGO} alt="IP" className='img-fluid' />
        </div>
        <div className='col-4 col-md-3 col-lg-4 col-xl-4'>
          <img src={ashok_logo} alt="IP" className='img-fluid' />
        </div>
        <div className='col-4 col-md-3 col-lg-4 col-xl-4'>
          <img src={NFDC_logo} alt="IP" className='img-fluid' />
        </div>
      </div>
    </div>
                <div className='sec_head'>
                <Button variant="contained" href="/dashboard" className="btn text-uppercase">Dashboard</Button>
                    <h1 className='mt-4 mb-4'>INDIAN PANOROMA FORM - I</h1>
                    
                <Button variant="contained" href="/logout" className="btn text-uppercase">Logout</Button>
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
                {/* <Stepper activeStep={activeStep} alternativeLabel className='container'
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
        {(activeStep !== steps.length - 2 && !isStepCompleted(activeStep + 1)) && (
          <Button
            onClick={handleComplete}
            style={{ backgroundColor: "#4CAF50", color: "#fff" }}
          >
            Next
          </Button>
        )}
        {activeStep === steps.length - 1 && isStepCompleted(activeStep) && (
          <Button
            onClick={handleComplete}
            style={{ backgroundColor: "#4CAF50", color: "#fff" }}
          >
            Finish
          </Button>
        )}
      </div>
    </div>
  </div>
</div>



            </Box>

        </>

    );
}
