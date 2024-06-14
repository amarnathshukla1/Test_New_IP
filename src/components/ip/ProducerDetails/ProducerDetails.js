import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import RemoveIcon from "../../../images/remove.png"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import { postRequest } from '../../../API/global';
import { getRequest, postRequest } from '../../../API/IP';
import { GLOBAL_URL } from '../../../API/global';
import { useParams } from 'react-router-dom';

import DeleteDialog from '../DeleteDialog';
import { Grid } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { validateEmail } from '../../Helper';





const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const style = {
  position: "absolute",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflow: 'auto',
  p: 4,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const ProducerDetails = ({ formData, setFormData, errors, setProducerErrors }) => {
  const { id = null } = useParams();
  console.log({ id });

  const scrollUp = () => {

    const body = document.querySelector('#coproducer-pop-form');

    body.scrollIntoView({
      behavior: 'smooth'
    }, 500)
  }


  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [prepareDelete, setPrepareDelete] = useState(null);

  const handleDeleteOpen = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPrepareDelete(value);
    setOpenDeleteConfirm(true);
  };

  const handleDeleteClose = (e) => {
    e.preventDefault();
    setOpenDeleteConfirm(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    await postRequest('ip_co_producers/delete', { co_producer_id: prepareDelete, ip_application_form_id: id });
    setOpenDeleteConfirm(false);
    // alert("Co producer deleted successfully.");
    await loadpreData()
  };

  const [preData, setPredata] = useState([]);

  const loadpreData = async () => {
    const predata = await postRequest('ip_co_producers/list', { ip_application_form_id: id });
    if (predata?.data)
      setPredata(predata?.data);
  }
  useEffect(() => {
    // Show modal when component mounts
    loadpreData();
  }, []);

  // const [individualProducer, setIndividualProducer] = React.useState(false);
  const [wheatherProducerIs, setWheatherProducerIs] = React.useState(formData.producer_is);
  const [indianEntity, setIndianEntity] = React.useState(false);
  const [producerAddressSame, setProducerAddressSame] = React.useState(false);
  const [rightholderSame, setRightHolderSame] = React.useState(false);


  const [coProducerformData, setCoProducerFormData] = useState({
    co_producer_is: '',
    name: '',
    email: '',
    landline: '',
    mobile: '',
    website: '',
    address: '',
    is_indian_entity: '',
    nationality: '',
    producer_address: '',
    co_producer_id_proof: '',
    passport_image: '',
    is_gov_id_proof: '',
    is_passport_image: '',
    //  ip_application_form_id: id,

  });

  console.log(coProducerformData, "coProducerformData")


  const [open, setOpen] = React.useState(false);
  const [CoProduceropen, setCoProducerOpen] = React.useState(false);
  const handleCoProducerOpen = () => {
    console.log("testing");
    setSelectedPassportFile(null);
    setSelectedGovtFile(null)
    setCoProducerOpen(true)
  }
  const handleCoProducerClose = () => setCoProducerOpen(false);
  const [coProducers, setCoProducers] = useState([]);

  // const handleCoProducerForm = () => {

  // }

  // Function to handle adding a new Co-Producer
  const handleAddCoProducer = () => {
    setCoProducers([...coProducers, {}]); // Add a new co-producer object to the array
  };

  // Function to handle removing a Co-Producer
  const handleRemoveCoProducer = (index) => {
    const updatedCoProducers = [...coProducers];
    updatedCoProducers.splice(index, 1); // Remove the co-producer at the specified index
    setCoProducers(updatedCoProducers);
  };

  // Render Co-Producers dynamically
  const renderCoProducers = () => {
    return coProducers.map((coProducer, index) => (
      <div key={index}>
        {/* Co-Producer input fields */}
        {/* Remove button */}
        <button onClick={() => handleRemoveCoProducer(index)}>
          Remove Co Producer
        </button>
      </div>
    ));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)

    if (name == 'company_is_registered_as_indian_entity' && (value === 0 || value === "0")) {
      // console.log('hdhdhdhdhdh');
      setOpen(true)
      setFormData(prevData => ({
        ...prevData,
        [name]: null,
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: parseInt(value),
      }));
      errors[name] = ""
      setProducerErrors(errors);

      const newValue = value.replace(/\D/g, '').slice(0, 10);

      if (name == "producer_mobile" || name == "right_holder_mobile" || name == "return_address_mobile") {
        setFormData(prevData => ({
          ...prevData,
          [name]: newValue
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));

      }

      if (name === 'producer_email') {
        validateProducerEmail(value);
      }

      setProducerErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const [country, setCountry] = React.useState('');
  const [mobile, setMobile] = useState('');

  // const handleChange = (event) => {
  //   setCountry(event.target.value);
  // };


  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedGovtFile, setSelectedGovtFile] = useState(null);
  const [selectedPassportFile, setSelectedPassportFile] = useState(null);


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const file = event.target.files[0];
    // Do something with the uploaded file

    setFormData((prevState) => ({
      ...prevState,
      producer_id_proof: file,
      is_producer_id_proof: true,
    }));
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      // You can use FormData API to send the file to the server via fetch or Axios
      // For example:
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // Then use fetch or Axios to send formData to your backend
    } else {
      console.log("No file selected");
    }
  };

  const handleGovtFileChange = (event) => {
    setSelectedGovtFile(event.target.files[0]);
    const file = event.target.files[0];
    // Do something with the uploaded file
    console.log(file, "file");
    setCoProducerFormData((prevState) => ({
      ...prevState,
      co_producer_id_proof: file,
      is_gov_id_proof: true
    }));

  };

  const handlePassportFileChange = (event) => {
    setSelectedPassportFile(event.target.files[0]);
    const file = event.target.files[0];
    // Do something with the uploaded file
    console.log(file);
    console.log("Selected Director file:", selectedPassportFile);
    setCoProducerFormData((prevState) => ({
      ...prevState,
      passport_image: file,
      is_passport_image: file,
    }));
    // const formDataToSubmit = new FormData();
    // formDataToSubmit.append('director_id_proof', formData.director_id_proof);
    // You can use FormData API to send the file to the server via fetch or Axios
    // For example:
    // const formData = new FormData();
    // formData.append('file', selectedFile);
    // Then use fetch or Axios to send formData to your backend
  };

  const handleProducerAddressSameChange = (e) => {
    const { name, value } = e.target;

    if (value == 1) {
      setProducerAddressSame(1)
    } else {
      console.log(value);
      setProducerAddressSame(2)
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    errors[name] = ""
    setProducerErrors(errors);
  }

  // handleRightHolderSameChange

  const handleRightHolderSameChange = (e) => {
    const { name, value } = e.target;

    if (value == 1) {
      setRightHolderSame(1)
    } else {
      console.log(value);
      setRightHolderSame(2)
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    errors[name] = ""
    setProducerErrors(errors);
  }


  const [errorsCoProducer, setErrorsCoProducer] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const validateForm = () => {

    const errorsCoProducer = {};
    if (!(coProducerformData.co_producer_is == 1 || coProducerformData.co_producer_is == 2)) errorsCoProducer.co_producer_is = 'Select one option';
    if (!(coProducerformData.is_indian_entity == 1 || coProducerformData.is_indian_entity === 0 || coProducerformData.is_indian_entity === '0')) errorsCoProducer.is_indian_entity = 'Select one option';
    if (!coProducerformData.name) errorsCoProducer.name = 'Enter your name';
    if (!coProducerformData.email) errorsCoProducer.email = 'Enter Email id';
    else {
      if (!validateEmail(coProducerformData.email)) {
        errorsCoProducer.email = "Email is not valid.";
      }

    }
    // if (!coProducerformData.landline) newErrors.landline = 'Landline is required';
    if (!coProducerformData.mobile) {
      errorsCoProducer.mobile = 'Enter mobile number';
    } else {

      if ((coProducerformData.mobile).length < 10 || (coProducerformData.mobile).length > 10) {
        errorsCoProducer.mobile = "Mobile number must be of 10 digit.";
      }

    }


    // if (!coProducerformData.website) newErrors.website = 'Website is required';
    if (!coProducerformData.address) errorsCoProducer.address = 'Enter your address';
    if (!coProducerformData.is_gov_id_proof && coProducerformData.is_indian_entity == 1) errorsCoProducer.co_producer_id_proof = 'Photo ID is required';
    // if (!(coProducerformData.co_producer_id_proof && coProducerformData.is_indian_entity == 1)) newErrors.co_producer_id_proof = 'Photo ID is required';
    // if (!coProducerformData.is_passport_image && coProducerformData.is_indian_entity == 0) newErrors.co_producer_id_proof = 'Photo ID is required';
    if (!coProducerformData.is_passport_image && coProducerformData.is_indian_entity == 0) errorsCoProducer.is_passport_image = 'Photo ID is required';
    // if (!(coProducerformData.is_passport_image && ( coProducerformData.is_indian_entity === 0 || coProducerformData.is_indian_entity === '0' ))) newErrors.is_passport_image = 'Photo ID is required';
    if (!coProducerformData.nationality && coProducerformData.is_indian_entity == 0) errorsCoProducer.nationality = "Enter country name"
    console.log(errorsCoProducer);
    setErrorsCoProducer(errorsCoProducer);
    return Object.keys(errorsCoProducer).length === 0;
  };


  const handleIndividualProducerChange = (e) => {
    const { name, value } = e.target;
    console.log({ value })
    console.log({ name })
    setFormData({
      ...formData,
      [name]: parseInt(value),
    });
    errors[name] = ""



    setProducerErrors(errors)
  }

  const handleFirmOwnedChange = (e) => {
    const { name, value } = e.target;
    console.log({ value });
    if (value == 0) {
      setWheatherProducerIs(3)
    } else {
      console.log(value);
      setWheatherProducerIs(1)
    }
    setFormData({
      ...formData,
      [name]: parseInt(value),
    });
    errors[name] = ""
    setProducerErrors(errors)
  }

  const handleIndianEntityChange = (e) => {
    const { name, value } = e.target;
    console.log(value);

    if (value == 1) {
      setIndianEntity(1)
    } else {
      setIndianEntity(2)
    }
    setCoProducerFormData({
      ...coProducerformData,
      [name]: parseInt(value),
    });
    errorsCoProducer[name] = ""
    setErrorsCoProducer(errorsCoProducer);
  }

  const handleCoProducerChange = (event) => {
    const { name, value, files } = event.target;
    const newCoProducerValue = value.replace(/\D/g, '').slice(0, 10);
    if (files) {
      setCoProducerFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
      errorsCoProducer[name] = ""
      setErrorsCoProducer(errorsCoProducer);

      setSelectedFile(files[0]);
    } else {
      setCoProducerFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      errorsCoProducer[name] = ""
      setErrorsCoProducer(errorsCoProducer);
    }

    if (name === 'email') {
      validateCoProducerEmail(value);
    }

    if (name == "mobile") {
      setCoProducerFormData((prevState) => ({
        ...prevState,
        [name]: newCoProducerValue,
      }));
    }
  };

  const validateCoProducerEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setErrorsCoProducer({
        ...errorsCoProducer,
        email: 'Invalid email format'
      });
    } else {
      setErrorsCoProducer({
        ...errorsCoProducer,
        email: ''
      });
    }
  };



  const validateProducerEmail = (email) => {
    const emailProducerRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailProducerRegex.test(email)) {
      setProducerErrors((prevErrors) => ({
        ...prevErrors,
        producer_email: 'Invalid email format',
      }));
    } else {
      setProducerErrors((prevErrors) => ({
        ...prevErrors,
        producer_email: '',
      }));
    }
  };


  const handleCoProducerForm = async (e) => {
    e.preventDefault();
    scrollUp();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      Object.keys(coProducerformData).forEach((key) => {
        formData.append(key, coProducerformData[key]);
      });

      const payload = {
        ...coProducerformData,
        ip_application_form_id: id
      };
      console.log({ payload })
      // const data = await postRequestGlobal('register', payload)
      const response = await postRequest('ip_co_producers/add', payload)
      setCoProducerOpen(false)
      if (!response.status) {

        throw new Error(`Error: ${response.status} ${response.message}`);

      } else {
        setCoProducerFormData({
          co_producer_is: '',
          name: '',
          email: '',
          landline: '',
          mobile: '',
          website: '',
          address: '',
          is_indian_entity: '',
          nationality: '',
          producer_address: '',
          co_producer_id_proof: '',
          passport_image: '',
          is_gov_id_proof: '',

        });
        // setAlertMessage('Form has been submitted successfully!');
        //   setAlertSeverity('success');
        // setAlertOpen(true);
        alert('Form has submitted successfully!');
        await loadpreData()
      }

    } catch (error) {
      console.error("Error: ", error);
      alert(error);
      setErrorsCoProducer('Invalid form data. Please try again.');
      setAlertMessage('Invalid form data. Please try again.');
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  };
  const [labelfirm, setlabelfirm] = useState("name of the firm")

  //   const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  //   const validateEmail = () => {
  //     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  //     if (!emailRegex.test(email)) {
  //         setError('Please enter a valid email address');
  //     } else {
  //         setError('');
  //     }
  // };

  const handleKeyDown = (event) => {
    // Prevent the letter 'e', '+', '-', '.' and other non-numeric characters
    if (['e', 'E', '+', '-', '.'].includes(event.key)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    // Fetch data from backend and ensure that null values are converted to empty strings
    const fetchData = async () => {
      const backendData = {
        producer_landline: null,
        producer_website: null,



      };

      setFormData(prevData => ({
        ...prevData,
        producer_website: backendData.producer_website ?? '',


      }));
    };

    fetchData();
  }, [setFormData]);
  return (
    <>
      <h4 className="text-capitalize">
        Producer's Information
      </h4>
      <form>
        <div className='row'>
          <div className="col-sm-12 col-lg-6 mt-4">
            <h6>Wheather Producer is <span className='text-danger'>*</span></h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="producer_is"
                id="producer_is_yes"
                value="1"
                checked={formData.producer_is == 1}
                onChange={handleIndividualProducerChange}
              />
              <label className="form-check-label" htmlFor="producer_is_yes">
                Individual
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="producer_is"
                id="producer_is_no"
                value="2"
                checked={formData.producer_is == 2}
                onChange={handleIndividualProducerChange}
              />
              <label className="form-check-label" htmlFor="producer_is_no">
                Company/Institute/Other Such Entity
              </label>
            </div>
            {errors.producer_is && (
              <p className="text-danger">{errors.producer_is}</p>
            )}

          </div>



          {formData.producer_is == 2 ?
            <></>
            :
            <>
              <div className='row mt-2'>
                <div className="col-sm-12 col-lg-6 mt-4">
                  <h6>Wheather any proprietor firm is owned by the individual making entry</h6>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="firm_is_owned_by_individual"
                      id="firm_is_owned_by_individual_yes"
                      value="1"
                      checked={formData.firm_is_owned_by_individual == 1}
                      onChange={handleFirmOwnedChange}
                    />
                    <label className="form-check-label" htmlFor="firm_is_owned_by_individual_yes">
                      Yes
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="firm_is_owned_by_individual"
                      id="firm_is_owned_by_individual_no"
                      value="0"
                      checked={formData.firm_is_owned_by_individual == 0}
                      onChange={handleFirmOwnedChange}
                    />
                    <label className="form-check-label" htmlFor="firm_is_owned_by_individual_no">
                      No
                    </label>
                  </div>
                  {errors.firm_is_owned_by_individual && (
                    <p className="text-danger">{errors.firm_is_owned_by_individual}</p>
                  )}
                </div>
              </div>
            </>
          }




          <Grid container spacing={2} className='mt-3'>

            {
              (
                formData.producer_is == 2
              ) ?
                <>
                 
                </>
                :
                ((formData.producer_is == 1 && (formData.firm_is_owned_by_individual == 0 || formData.firm_is_owned_by_individual == '0')) ?
                  <>
                   
                  </>
                  :
                  ""
                )
            }

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box className="input_field">
                <TextField
                  type='text'
                  fullWidth
                  label={
                    (formData.producer_is == 2) ? "Name of the production house" : (
                      (formData.producer_is == 1 && (formData.firm_is_owned_by_individual == 0 || formData.firm_is_owned_by_individual == '0')) ?
                        "Name of the producer making the entry" : "Name of the Firm"

                    )

                  }
                  //label="Name of the firm"
                  className="input_border"
                  name="name_of_firm"
                  value={formData.name_of_firm}
                  onChange={handleChange}
                />
                {errors.name_of_firm && (
                  <p className="text-danger">{errors.name_of_firm}</p>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box className="input_field">
                <TextField
                  type='email'
                  fullWidth
                  label='E-mail'
                  className="input_border"
                  name="producer_email"
                  value={formData.producer_email}
                  onChange={handleChange}
                />
                {errors.producer_email && (
                  <p className="text-danger">{errors.producer_email}</p>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box>
                <TextField
                  type='number'
                  fullWidth
                  label='Landline (optional)'
                  className="input_border"
                  name="producer_landline"
                  // value={formData.producer_landline}
                  value={formData.producer_landline ?? ''}

                  onChange={handleChange}
                />
              </Box>
              {errors.producer_landline && (
                <p className="text-danger">{errors.producer_landline}</p>
              )}

            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box>
                <TextField
                  type='number'
                  fullWidth
                  label='Mobile'
                  className="input_border"
                  name="producer_mobile"
                  value={formData.producer_mobile}
                  onChange={handleChange}
                  inputProps={{ maxLength: 10, }}
                  onKeyDown={handleKeyDown}
                // maxLength={10}
                />
              </Box>
              {errors.producer_mobile && (
                <p className="text-danger">{errors.producer_mobile}</p>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box className="input_field">
                <TextField
                  variant="outlined"
                  fullWidth
                  label='Website (optional)'
                  className="input_border"
                  name="producer_website"
                  // value={formData.producer_website}
                  value={formData.producer_website ?? ''}
                  onChange={handleChange}
                />
                {errors.producer_website && (
                  <p className="text-danger">{errors.producer_website}</p>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box class="form-floating">
                <textarea class="form-control" placeholder="Address" id="floatingTextarea2" style={{ height: "100px", borderRadius: "5px" }}
                  name="producer_address"
                  value={formData.producer_address}
                  onChange={handleChange}

                ></textarea>
                <label for="floatingTextarea2">Address</label>
                {errors.producer_address && (
                  <p className="text-danger">{errors.producer_address}</p>
                )}
              </Box>
            </Grid>
          </Grid>
        </div>


        <div className='row'>
          <div className="col-sm-12 col-lg-12 mt-4">
            <React.Fragment>
              <div>
                <h6>Wheather Company is Registered as an Indian entity.<span className='text-danger'>*</span>Public Ltd./Private Ltd./Partnership/Proprietorship or Wheather Indian national (as per the clause number 2(d))</h6>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="company_is_registered_as_indian_entity"
                    id="company_is_registered_as_indian_entity_yes"
                    value="1"
                    checked={formData.company_is_registered_as_indian_entity == 1}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="company_is_registered_as_indian_entity_yes">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="company_is_registered_as_indian_entity"
                    id="company_is_registered_as_indian_entity_no"
                    value="0"
                    checked={formData.company_is_registered_as_indian_entity === 0 || formData.company_is_registered_as_indian_entity == '0'}
                    onChange={handleChange}
                  // onClick={handleClickOpen}
                  />
                  <label className="form-check-label" htmlFor="company_is_registered_as_indian_entity_no">
                    No
                  </label>
                </div>
                {errors.company_is_registered_as_indian_entity && (
                  <p className="text-danger">{errors.company_is_registered_as_indian_entity}</p>
                )}
              </div>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >

                <DialogContent dividers>
                  <Typography gutterBottom>
                    Producer must be an Indian
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    Ok
                  </Button>
                </DialogActions>
              </BootstrapDialog>
            </React.Fragment>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12 col-lg-6 mt-4'>
            <h6>Attach Photo ID issued by Govt. of India (for Indian National)<span className='text-danger'>*</span></h6>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
              onChange={handleFileChange}
              style={{ display: 'none', width: "100%" }}
              id="fileInput"
              name="producer_id_proof"
            // value={formData.producer_id_proof}
            // onChange={handleChange} 
            />
            {!(formData?.documentData?.[1]) ? <></> : (
              <div>
                <span className="Attach_Photo_ID">
                  <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[1].file}`}>{formData?.documentData?.[1].name}</a>
                </span>
              </div>
            )}
            <label htmlFor="fileInput" style={{ width: "100%", height: "100%" }}>
              <TextField
                variant="outlined"
                placeholder="Upload Your File in PDF Format Only"
                value={selectedFile ? selectedFile.name : ''}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => document.getElementById('fileInput').click()}
                        edge="end"
                      >
                        <AttachFileIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    // border: "1px solid #CF528A",
                    borderRadius: "5px",
                    height: "108px",
                  },
                }}
                fullWidth
              />

            </label>
            {errors.producer_id_proof && (
              <p className="text-danger">{errors.producer_id_proof}</p>
            )}

          </div>
        </div>

        <div className='row'>
          <div className='col-sm-12 col-lg-6 mt-4'>
            <h5>DCP/Blu-ray of the Film to be returned to<span className='text-danger'>*</span></h5>
          </div>
        </div>

        <div className='row'>
          <div className="col-sm-12 col-lg-6 mt-4">
            <h6>Is the address same as Producer ?</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="is_address_same_as_producer"
                id="is_address_same_as_producer_yes"
                value="1"
                checked={formData.is_address_same_as_producer == 1}
                onChange={handleProducerAddressSameChange}
              />
              <label className="form-check-label" htmlFor="is_address_same_as_producer_yes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="is_address_same_as_producer"
                id="is_address_same_as_producer_no"
                value="0"
                checked={formData.is_address_same_as_producer == 0}
                onChange={handleProducerAddressSameChange}
              />
              <label className="form-check-label" htmlFor="is_address_same_as_producer_no">
                No
              </label>
            </div>
            {errors.is_address_same_as_producer && (
              <p className="text-danger">{errors.is_address_same_as_producer}</p>
            )}
          </div>
        </div>

        {(formData.is_address_same_as_producer == 1) ?

          <>

          </>
          :
          <>


            <Grid container spacing={2} className='mt-3'>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label='Name'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    className="input_border"
                    name="return_address_name"
                    value={formData.return_address_name}
                    onChange={handleChange}
                  />
                  {errors.return_address_name && (
                    <p className="text-danger">{errors.return_address_name}</p>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label='Email ID'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    className="input_border"
                    name="return_address_email"
                    value={formData.return_address_email}
                    onChange={handleChange}
                  />
                  {errors.return_address_email && (
                    <p className="text-danger">{errors.return_address_email}</p>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    variant="outlined"
                    type='number'
                    fullWidth
                    label='Landline (Optional)'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}

                    className="input_border"
                    name="return_address_landline"
                    value={formData.return_address_landline}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    variant="outlined"
                    type='number'
                    fullWidth
                    label='Mobile'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    inputProps={{ maxLength: 10 }}
                    className="input_border"
                    name="return_address_mobile"
                    value={formData.return_address_mobile}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                  {errors.return_address_mobile && (
                    <p className="text-danger">{errors.return_address_mobile}</p>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label='Fax Number (Optional)'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    className="input_border"
                    name="return_address_fax"
                    value={formData.return_address_fax}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <textarea class="form-control" placeholder="Address" id="Address" style={{ height: "100px", borderRadius: "5px" }}
                    name="return_address"
                    value={formData.return_address}
                    onChange={handleChange}
                  ></textarea>
                  {/* <label for="Address">Address</label> */}
                  {errors.return_address && (
                    <p className="text-danger">{errors.return_address}</p>
                  )}
                </Box>
              </Grid>
            </Grid>
          </>
        }




        <div className='row mt-4'>
          <h6>In the case of a co-production (including foreign entity), details of the Co-Producer(s)</h6>
          {
            preData.map((item, index) => (
              <div className="card" style={{ width: "50%" }}>
                <div className="card-body">
                  <h5 className="card-title">Co Producer Details
                    <button variant="outlined" name="delete" value={item.id} className='btn btn-danger btn-sm float-end' onClick={handleDeleteOpen}>
                      Delete
                    </button>
                    <DeleteDialog open={openDeleteConfirm} handleClose={handleDeleteClose} handleDelete={handleDelete} />
                  </h5>

                  <p>Whether Co-producer is : <b>{(item.co_producer_is == 1) ? 'Invidual' : 'Company / Institute /Other such entity'}</b></p>
                  <p>Name : <b>{item.name}</b></p>
                  <p>Email : <b>{item.email}</b></p>
                  <p>Landline  <b>{item.landline}</b></p>
                  <p>Mobile : <b>{item.mobile}</b></p>
                  <p>Website <b>{item.website}</b></p>
                  <p className="card-text">Address:-<b>{item.address}</b></p>

                  <p>Wheather the company(s) is registered as an Indian Entity,
                    Mention(In accordance with cause 6.2.2) <b>{(item.co_producer_is == 1) ? 'Yes' : 'No'}</b></p>
                  {
                    (item.co_producer_is == 1) ?
                      <p>Attach Photo ID issued by Govt. of India (for Indian National) <b> <a href={`${GLOBAL_URL}downloadfile/IP/${item.ip_application_form_id}/${item.file}`}>{item.documents_name}</a></b></p> :
                      <p>Attach copy of Passport <b> <a href={item.file}>{item.documents_name}</a></b></p>
                  }

                  <p>Registration Details : <b>{item.registration_details}</b> </p>

                  <p>The name of the Producer along with Co-Producers(s), if any who is to be credited in the Certificate :
                    <b> {item.name_of_producers}</b></p>


                </div>
              </div>
            ))}
          <div className='col-sm-12 col-lg-12' >
            <Button
              onClick={handleCoProducerOpen}
              //addCoproducer.addCoproducer()
              // onClick={handleCoProducerForm} 
              className='text-capitalize mt-3' style={{
                background: 'linear-gradient(90deg, #CF528A 100%, #632340 0%)',
                color: "white",
                outline: "none",
                padding: "8px 16px",
                border: "none",
                borderRadius: "5px"
              }}>
              add co producer
            </Button>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-sm-12 col-lg-12 '>
            <h6>Details of the Foreign Right holder:-<span className='text-danger'>*</span></h6>
          </div>
        </div>
        <div className='row mt-2'>

          <div className="col-sm-12 col-lg-6 mt-4">
            <h6>Whether the Indian and Foreign right holder is same</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="whether_indian_foreign_right_holder_same"
                id="whether_indian_foreign_right_holder_same_yes"
                value="1"
                checked={formData.whether_indian_foreign_right_holder_same == 1}
                onChange={handleRightHolderSameChange}
              />
              <label className="form-check-label" htmlFor="whether_indian_foreign_right_holder_same_yes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="whether_indian_foreign_right_holder_same"
                id="whether_indian_foreign_right_holder_same_no"
                value="0"
                checked={formData.whether_indian_foreign_right_holder_same == 0}
                onChange={handleRightHolderSameChange}
              />
              <label className="form-check-label" htmlFor="whether_indian_foreign_right_holder_same_no">
                No
              </label>
            </div>
            {errors.whether_indian_foreign_right_holder_same && (
              <p className="text-danger">{errors.whether_indian_foreign_right_holder_same}</p>
            )}
          </div>
        </div>

        {(formData.whether_indian_foreign_right_holder_same == 1) ?
          <>
          </>
          :
          <>
            <Grid container spacing={2} className='mt-3'>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label='Name'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    className="input_border"
                    name="right_holder_name"
                    value={formData.right_holder_name}
                    onChange={handleChange}
                  />
                  {errors.right_holder_name && (
                    <p className="text-danger">{errors.right_holder_name}</p>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label='Email ID'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    className="input_border"
                    name="right_holder_email"
                    value={formData.right_holder_email}
                    onChange={handleChange}
                  />
                  {errors.right_holder_email && (
                    <p className="text-danger">{errors.right_holder_email}</p>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    variant="outlined"
                    type='number'
                    fullWidth
                    label='Landline (Optional)'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    className="input_border"
                    name="right_holder_landline"
                    value={formData.right_holder_landline}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    variant="outlined"
                    type='number'
                    fullWidth
                    label='Mobile'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    className="input_border"
                    name="right_holder_mobile"
                    value={formData.right_holder_mobile}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                  {errors.right_holder_mobile && (
                    <p className="text-danger">{errors.right_holder_mobile}</p>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label='Fax Number (Optional)'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    className="input_border"
                    name="right_holder_fax_number"
                    value={formData.right_holder_fax_number}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <textarea class="form-control" placeholder="Address" id="address_details" style={{ height: "100px", borderRadius: "5px" }}
                    name="right_holder_address"
                    value={formData.right_holder_address}
                    onChange={handleChange}
                  ></textarea>
                  {/* <label for="address_details">Address</label> */}
                  {errors.right_holder_address && (
                    <p className="text-danger">{errors.right_holder_address}</p>
                  )}
                </Box>
              </Grid>
            </Grid>

          </>
        }

        <div className='row mt-4'>
          <div className='col-sm-12 col-lg-12'>
            <p className='text-uppercase' style={{ color: '#FF0000' }}>Note: ALL The name of the producer(s) (As per the clause number 2(d)) must be filled up in the entry form. No request for change in the name would be entertained later.</p>
          </div>
        </div>
      </form >

      {/* Add Co Producer Modal */}
      < Modal
        open={CoProduceropen}
        onClose={handleCoProducerClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         
         
          <form id="coproducer-pop-form">
            <div className='row'>
              <div className="col-sm-12 col-lg-12 mt-4">
                <h6>Wheather Co-Producer is <span className='text-danger'>*</span></h6>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="co_producer_is"
                    id="co_producer_is_yes"
                    value="1"
                    checked={coProducerformData.co_producer_is == 1}
                    onChange={handleCoProducerChange}
                  />
                  <label className="form-check-label" htmlFor="co_producer_is_yes">
                    Individual
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="co_producer_is"
                    id="co_producer_is_no"
                    value="2"
                    checked={(coProducerformData.co_producer_is === 2 || coProducerformData.co_producer_is === '2')}
                    onChange={handleCoProducerChange}
                  />
                  <label className="form-check-label" htmlFor="co_producer_is_no">
                    Company/Institute/Other Such Entity
                  </label>
                </div>
                {errorsCoProducer.co_producer_is && (
                  <p className="text-danger">{errorsCoProducer.co_producer_is}</p>
                )}
              </div>
            </div>
            
            <Grid container spacing={2} className='mt-3'>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label='Name'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    className="input_border"
                    name="name"
                    value={coProducerformData.name}
                    onChange={handleCoProducerChange}
                  />
                  {errorsCoProducer.name && (
                    <p className="text-danger">{errorsCoProducer.name}</p>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label='E-mail'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    className="input_border"
                    name="email"
                    value={coProducerformData.email}
                    onChange={handleCoProducerChange}
                  />
                  {errorsCoProducer.email && (
                    <p className="text-danger">{errorsCoProducer.email}</p>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    variant="outlined"
                    type='number'
                    fullWidth
                    label='Landline (Optional)'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    className="input_border"
                    name="landline"
                    value={coProducerformData.landline}
                    onChange={handleCoProducerChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    variant="outlined"
                    type='number'
                    fullWidth
                    label='Mobile'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    className="input_border"
                    name="mobile"
                    value={coProducerformData.mobile}
                    onKeyDown={handleKeyDown}
                    onChange={handleCoProducerChange}
                  />
                  {errorsCoProducer.mobile && (
                    <p className="text-danger">{errorsCoProducer.mobile}</p>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label='Website (Optional)'
                    // InputProps={{
                    //   style: {
                    //     border: "1px solid #CF528A",
                    //     borderRadius: "5px",
                    //   },
                    // }}
                    className="input_border"
                    name="website"
                    value={coProducerformData.website}
                    onChange={handleCoProducerChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <textarea class="form-control" placeholder="Address" id="CoProducer_address" style={{ height: "100px", borderRadius: "5px" }}
                    name="address"
                    value={coProducerformData.address}
                    onChange={handleCoProducerChange}
                  ></textarea>
                  {/* <label for="CoProducer_address">Address</label> */}
                  {errorsCoProducer.address && (
                    <p className="text-danger">{errorsCoProducer.address}</p>
                  )}
                </Box>
              </Grid>
            </Grid>


            <div className='row'>
              <div className="col-sm-12 col-lg-12 mt-4">
                <h6>Wheather the company(s) is registered as an Indian Entity, Mention(In accordance with cause 6.2.2) <span className='text-danger'>*</span></h6>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="is_indian_entity"
                    id="is_indian_entity_yes"
                    value="1"
                    checked={coProducerformData.is_indian_entity == 1}
                    onChange={handleIndianEntityChange}
                  />
                  <label className="form-check-label" htmlFor="is_indian_entity_yes">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="is_indian_entity"
                    id="is_indian_entity_no"
                    value="0"
                    // checked={coProducerformData.is_indian_entity == 0}
                    checked={(coProducerformData.is_indian_entity === 0 || coProducerformData.is_indian_entity === '0')}
                    onChange={handleIndianEntityChange}
                  />
                  <label className="form-check-label" htmlFor="is_indian_entity_no">
                    No
                  </label>
                </div>
                {errorsCoProducer.is_indian_entity && (
                  <p className="text-danger">{errorsCoProducer.is_indian_entity}</p>
                )}
              </div>
            </div>
            {
              (coProducerformData.is_indian_entity == 1) ?
                <>
                  <div className='col-sm-12 col-lg-12 mt-4'>
                    <h6>Attach Photo ID issued by Govt. of India (for Indian National)</h6>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
                      onChange={handleGovtFileChange}
                      style={{ display: 'none', width: "100%" }}
                      id="fileGovtPhotoId"
                      name="co_producer_id_proof"
                    // value={formData.producer_id_proof}
                    // onChange={handleChange} 
                    />
                    <label htmlFor="fileGovtPhotoId" style={{ width: "100%", height: "100%" }}>
                      <TextField
                        variant="outlined"
                        placeholder="Upload Your File in PDF Format Only"
                        value={selectedGovtFile ? selectedGovtFile.name : ''}
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => document.getElementById('fileGovtPhotoId').click()}
                                edge="end"
                              >
                                <AttachFileIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                          style: {
                            // border: "1px solid #CF528A",
                            borderRadius: "5px",
                            height: "108px",
                          },
                        }}
                        fullWidth
                      />
                      {errorsCoProducer.gov_id_proof && (
                        <p className="text-danger">{errorsCoProducer.gov_id_proof}</p>
                      )}
                    </label>
                  </div>
                </>


                : (coProducerformData.is_indian_entity === 0) ?
                  <>

                    <Grid item xs={12} sm={12} md={12} lg={12} className='mt-3'>
                      <Box>
                        <TextField
                          type="text"
                          fullWidth
                          label="Please mention the country of the nationality."
                          // InputProps={{
                          //   style: {
                          //     border: "1px solid #CF528A",
                          //     borderRadius: "5px",
                          //   },
                          // }}
                          className="input_border"
                          name="nationality"
                          value={coProducerformData.nationality}
                          onChange={handleCoProducerChange}
                        />
                        {errorsCoProducer.nationality && (
                          <p className="text-danger">{errorsCoProducer.nationality}</p>
                        )}
                      </Box>
                    </Grid>

                    <div className='col-sm-12 col-lg-12 mt-4'>
                      <h6>Attach copy of Passport</h6>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
                        onChange={handlePassportFileChange}
                        style={{ display: 'none', width: "100%" }}
                        id="fileInputPassport"
                        name="passport_image"
                      // value={formData.producer_id_proof}
                      // onChange={handleChange} 
                      />
                      <label htmlFor="fileInputPassport" style={{ width: "100%", height: "100%" }}>
                        <TextField
                          variant="outlined"
                          placeholder="Upload Your File in PDF Format Only"
                          value={selectedPassportFile ? selectedPassportFile.name : ''}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => document.getElementById('fileInputPassport').click()}
                                  edge="end"
                                >
                                  <AttachFileIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                            style: {
                              // border: "1px solid #CF528A",
                              borderRadius: "5px",
                              height: "108px",
                            },
                          }}
                          fullWidth
                        />
                        {errorsCoProducer.passport_image && (
                          <p className="text-danger">{errorsCoProducer.passport_image}</p>
                        )}
                      </label>
                    </div>
                  </>
                  :
                  <>

                  </>
            }

            <div className='row'>
              <div className='col-sm-12 col-lg-12 mt-4'>
              </div>
              <div className='col-sm-12 col-lg-12 mt-4'>
                <div class="form-floating">
                  <textarea class="form-control" placeholder="Title Registration Details (In accordance with cause 6.2.3)" id="Registration" style={{ height: "100px", borderRadius: "5px" }}
                    name="registration_details"
                    value={coProducerformData.registration_details}
                    onChange={handleCoProducerChange}
                  ></textarea>
                  <label for="Registration">Title Registration Details (In accordance with cause 6.2.3)</label>
                  {errorsCoProducer.registration_details && (
                    <p className="text-danger">{errorsCoProducer.registration_details}</p>
                  )}
                </div>
              </div>
              <div className='col-sm-12 col-lg-12 mt-4'>
                <div class="form-floating">
                  <textarea class="form-control" placeholder="The name of the Producer along with Co-Producers(s), if any who is to be credited in the Certificate" id="Producer" style={{ height: "100px", borderRadius: "5px" }}
                    name="name_of_producers"
                    value={coProducerformData.name_of_producers}
                    onChange={handleCoProducerChange}
                  ></textarea>
                  <label for="Producer">The name of the Producer along with Co-Producers(s), if any who is to be credited in the Certificate</label>
                  {errorsCoProducer.name_of_producers && (
                    <p className="text-danger">{errorsCoProducer.name_of_producers}</p>
                  )}
                </div>
              </div>
            </div>

            <div className='row'>
              <div>
                <div className='col-sm-12 col-lg-12 mt-4'>
                </div>
                <div className='d-flex justify-content-end'>
                  <Button
                    // onClick={handleCoProducerOpen}
                    //addCoproducer.addCoproducer()
                    onClick={handleCoProducerForm}
                    className='text-capitalize mt-3' style={{
                      background: 'linear-gradient(90deg, #CF528A 100%, #632340 0%)',
                      color: "white",
                      outline: "none",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "5px"
                    }}>Submit
                  </Button>
                </div>
              </div>
            </div>
          </form>
          <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
            onClose={() => setAlertOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert
              onClose={() => setAlertOpen(false)}
              severity={alertSeverity}
              variant="filled"
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Modal >
    </>
  )
}

export default ProducerDetails