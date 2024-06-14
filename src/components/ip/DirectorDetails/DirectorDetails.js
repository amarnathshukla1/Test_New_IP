import React, { useState, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { GLOBAL_URL } from '../../../API/global';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { handleKeyDown } from '../../Helper';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({

  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const DirectorDetails = ({ formData, setFormData, errors, setDirectorErrors }) => {
  const [open, setOpen] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = value.replace(/\D/g, '').slice(0, 10); // Ensure numeric input

    // Prepare an updated form data object
    let updatedFormData = {};

    if (name === "director_indian_natinality" && (value === 0 || value === "0")) {
        setOpen(true);
        updatedFormData[name] = null;
    } else {
        if (name === "director_mobile") {
            updatedFormData[name] = newValue;
        } else {
            updatedFormData[name] = value;
        }

        // If the field is supposed to be an integer, parse it
        if (["some_integer_field_name_1", "some_integer_field_name_2"].includes(name)) {
            updatedFormData[name] = parseInt(value, 10);
        }
    }

    setFormData(prevData => ({
        ...prevData,
        ...updatedFormData,
    }));

    // Clear the errors for the current field
    errors[name] = "";
    setDirectorErrors(errors);
};


  const handleClickOpen = () => {
    setOpen(true);
  };
  const [country, setCountry] = React.useState('');


  const handleClose = () => {
    setOpen(false);
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({ ...formData, [name]: value });
  // };



  // const handleChange = (e) => {
  //   const fieldName = e.target.name;
  //   const value = e.target.value;
  //   setInputFields({ ...inputFields, [fieldName]: value });
  //   setErrors({ ...errors, [fieldName]: '' });
  // };



  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setErrors(validateValues(inputFields));
  // };

  const [selectedDirectorFile, setSelectedDirectorFile] = useState(null);
  const [error, setError] = useState('');
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file && file.type === 'application/pdf') {
      setSelectedDirectorFile(file);
      setError('');
      setFormData((prevState) => ({
        ...prevState,
        director_id_proof: file,
        is_director_id_proof: 1,
      }));

      console.log("Selected file:", file);
      // You can use FormData API to send the file to the server via fetch or Axios
      // For example:
      // const formData = new FormData();
      // formData.append('file', file);
      // Then use fetch or Axios to send formData to your backend
    } else {
      setSelectedDirectorFile(null);
      setError('Please upload a PDF file.');
      setFormData((prevState) => ({
        ...prevState,
        director_id_proof: null,
        is_director_id_proof: false,
      }));
    }
  };

    
    // const formDataToSubmit = new FormData();
    // formDataToSubmit.append('director_id_proof', formData.director_id_proof);
    // You can use FormData API to send the file to the server via fetch or Axios
    // For example:
    // const formData = new FormData();
    // formData.append('file', selectedFile);
    // Then use fetch or Axios to send formData to your backend



  useEffect(() => {
    // Function to fetch data from backend
    const fetchData = async () => {
        try {
            // Simulate fetching data from the backend
            const backendData = {
                director_landline: "null", // Example data from backend
                director_fax: "null",
                director_website: "null",
            };

            console.log('Raw backend data:', backendData); // Log raw data

            // Helper function to replace null or "null" with an empty string
            const replaceNull = (value) => (value === null || value === "null" ? '' : value);

            // Processed data
            const processedData = {
                director_landline: replaceNull(backendData.director_landline),
                director_fax: replaceNull(backendData.director_fax),
                director_website: replaceNull(backendData.director_website),
            };

            console.log('Processed data:', processedData); // Log processed data

            // Update form data with fetched data
            setFormData(prevData => ({
                ...prevData,
                ...processedData,
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error as needed (e.g., show a notification to the user)
        }
    };

    fetchData();
}, [setFormData]);

  return (
    <>
      <h4 className="text-capitalize">Director's Details<span className="text-danger">*</span></h4>
      <form>
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
                name="director_name"
                value={formData.director_name}
                onChange={handleChange}
              />
              {errors.director_name && (
                <p className="text-danger">{errors.director_name}</p>
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
                name="director_email"
                value={formData.director_email}
                onChange={handleChange}
                inputProps={{ maxLength: 156 }}
              />
              {errors.director_email && (
                <p className="text-danger">{errors.director_email}</p>
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
                name="director_landline"
                // value={formData.director_landline}
                value={formData.director_landline}

                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                type='number'
                fullWidth
                label='Mobile'
                inputProps={{ maxLength: 10 }}
                className="input_border"
                name="director_mobile"
                value={formData.director_mobile}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              {errors.director_mobile && (
                <p className="text-danger">{errors.director_mobile}</p>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                fullWidth
                label='Fax No (Optional)'
                // InputProps={{
                //   style: {
                //     border: "1px solid #CF528A",
                //     borderRadius: "5px",
                //   },
                // }}
                className="input_border"
                name="director_fax"
                // value={formData.director_fax}
                value={formData.director_fax}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              fullWidth
              label='Website(Optional)'
              // InputProps={{
              //   style: {
              //     border: "1px solid #CF528A",
              //     borderRadius: "5px",
              //   },
              // }}
              className="input_border"
              name="director_website"
              // value={formData.director_website}
              value={formData.director_website}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <textarea class="form-control" placeholder="Address" id="Address" style={{ height: "100px", borderRadius: "5px" }}
                name="director_address"
                value={formData.director_address}
                onChange={handleChange}
              ></textarea>
              {/* <label for="Address" style={{ fontWeight: "normal" }}>Address</label> */}
              {errors.director_address && (
                <p className="text-danger">{errors.director_address}</p>
              )}
            </Box>
          </Grid>
        </Grid>

        <div className='row'>
          <div className="col-sm-12 col-lg-6 mt-4">
            <React.Fragment>
              <div>
                <h6>Indian National<span className='text-danger'>*</span></h6>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="director_indian_natinality"
                    id="director_indian_natinality_yes"
                    value="1"
                    checked={formData.director_indian_natinality == 1}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="director_indian_natinality_yes">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="director_indian_natinality"
                    id="director_indian_natinality_no"
                    value="0"
                    checked={formData.director_indian_natinality === 0 || formData.director_indian_natinality == "0"}
                    onChange={handleChange}
                  // onClick={handleClickOpen}
                  />
                  <label className="form-check-label" htmlFor="director_indian_natinality_no">
                    No
                  </label>
                </div>
                {errors.director_indian_natinality && (
                  <p className="text-danger">{errors.director_indian_natinality}</p>
                )}

              </div>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <DialogContent dividers>
                  <Typography gutterBottom>
                    Director must be an Indian
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
            <h6>Attach Photo ID issued by Govt. of India (for Indian National)

              {!(formData?.documentData?.[2]) ? <></> : (
                <div>
                  <span className="Attach_Photo_ID">
                    <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[2].file}`}>{formData?.documentData?.[2].name}</a>
                  </span>
                </div>
              )}
            </h6>

            <input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
              onChange={handleFileChange}
              style={{ display: 'none', width: "100%" }}
              id="fileInput"
              name="director_id_proof"
            // value={formData.producer_id_proof}
            // onChange={handleChange} 
            />
            <label htmlFor="fileInput" style={{ width: "100%" }}>
              <TextField
                variant="outlined"
                placeholder="Upload Your File in PDF Format Only"
                value={selectedDirectorFile ? selectedDirectorFile.name : ''}
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
            {error && (
          <p className="text-danger">{error}</p>
        )}
          </div>
        </div>
      </form>
    </>
  )
}

export default DirectorDetails
