import React, { useState } from 'react'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box';
import { FormControl, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import ApiClient from '../../common/ApiClient';
import { useEffect } from 'react';
import DeleteDialog from '../../ip/DeleteDialog';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useParams } from 'react-router-dom';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';


const PartialInfo = ({ setFormDataMain, errors, FormDataMain, setProducerErrors }) => {
    const { id = null } = useParams();
    const { putRequest, getRequest, deleteRequest } = ApiClient();
    const [errorsForm, setErrorsForm] = useState({});
    const [preData, setPreData] = useState([]);
    const [formData, setformData] = React.useState({

        ott_form_id: id,
        type: "",
        name: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        is_follow_it_rules: "",
        is_original_production: "",
        is_registered: "",
        is_residing_in_country: "",
    });

    const loadData = async () => {
        const preData = await getRequest(`ott/${id}/coproducer`);
        const data = preData.data;

        if (data.length > 0) {
            setFormDataMain({
                ...FormDataMain,
                have_producer: 1
            });
            setProducerErrors({
                ...errors,
                have_producer: null
            })
        } else {
            setFormDataMain({
                ...FormDataMain,
                have_producer: null
            });
        }
        //  if (data && data.length < 5) setShowAddNewEntry(true)
        setPreData(data);
    }
    useEffect(() => {
        loadData();

    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.ott_form_id) newErrors.ott_form_id = 'form id  is missing';
        if (!formData.type) newErrors.type = 'Select production type';
        if (!formData.name) newErrors.name = 'Enter your name';
        if (!formData.address) newErrors.address = 'Enter your address';
        if (!formData.phone) newErrors.phone = 'Enter your phone number';
        if (!formData.email) newErrors.email = 'Enter your email id';
        if (!formData.is_follow_it_rules) newErrors.is_follow_it_rules = 'Select one option';
        if (!formData.is_original_production) newErrors.is_original_production = 'Select one option';
        if (!formData.is_registered) newErrors.is_registered = 'Select one option';
        if (!formData.is_residing_in_country) newErrors.is_residing_in_country = 'Select one option';


        setErrorsForm(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleFormData = (e) => {
        const { name, value } = e.target;
        setformData(prevData => ({
            ...prevData,
            [name]: value
        }));
        errorsForm[name] = ""
        setErrorsForm(errorsForm);

        const newValue = value.replace(/\D/g, '').slice(0, 10);
        if (name == "phone") {
            setformData(prevData => ({
                ...prevData,
                [name]: newValue
            }));
        } else {
            setformData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }

        if (name === 'email') {
            validateProducerEmail(value);
        }

    };

    const validateProducerEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            setErrorsForm({
                ...errorsForm,
                email: 'Invalid email format'
            });
        } else {
            setErrorsForm({
                ...errorsForm,
                email: ''
            });
        }
    };
    const handleReleaseDate = (e) => {

        if (e) {
            const formattedDate = e.format('YYYY-MM-DD');
            setformData(prevData => ({
                ...prevData,
                stream_date: dayjs(formattedDate)
            }));
        }

    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {

            const response = await putRequest(`ott/${id}/coproducer`, formData)
            console.log(response, "response")

            if (!response.status) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            console.log("Response producer:", response);

            // Reset form after co-Producer submission
            setformData({

                ott_form_id: id,
                type: "",
                name: "",
                address: "",
                phone: "",
                email: "",
                website: "",
                is_follow_it_rules: "",
                is_original_production: "",
                is_registered: "",
                is_residing_in_country: "",
            });

            loadData();
            alert('Form has submitted successfully!');
            //  await loadpreData();
        } catch (error) {
            console.error("Error: ", error);
            alert('Error submitting form. Please try again later.');
        }
    };

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
    const submitDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await deleteRequest(`ott/${id}/coproducer/${prepareDelete}`, formData)

            if (!response.status) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            loadData();
            alert('Record deleted successfully!');
            //  await loadpreData();
        } catch (error) {
            console.error("Error: ", error);
            alert('Error submitting form. Please try again later.');
        }
        setOpenDeleteConfirm(false);
    };


    const handleKeyDown = (event) => {
        // Prevent the letter 'e', '+', '-', '.' and other non-numeric characters
        if (['e', 'E', '+', '-', '.'].includes(event.key)) {
            event.preventDefault();
        }
    };



    return (
        <>


            {
                preData.map((item, index) => (

                    < Grid item xs={12} sm={12} md={12} lg={6} >
                        <div className="card">
                            <div className="card-body" style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                    <button className='btn btn-danger'
                                        // onClick=
                                        // {(event) => submitDelete(item.id, event)}
                                        value={item.id}
                                        onClick={handleDeleteOpen}
                                    >
                                        <DeleteOutlinedIcon style={{ color: 'white' }} />
                                    </button>
                                    {/* <Button value={item.id}
                                        onClick={handleDeleteOpen} variant="outlined" color="error" startIcon={<DeleteIcon style={{ color: '#d32f2f' }} />}>
                                        Delete
                                    </Button> */}
                                    <DeleteDialog open={openDeleteConfirm} handleClose={handleDeleteClose} handleDelete={submitDelete} />
                                </div>
                                <p>Name : <b>{item.name}</b></p>
                                <p>Address : <b>{item.address}</b></p>
                                <p>Mobile: <b>{item.phone}</b></p>
                                <p>Email : <b>{item.email}</b></p>
                                <p>Website: <b>{item.website}</b></p>
                                <p>Wheather the OTT Platform has furnished information under Rule 18 of IT Rules, 2021 to the Ministry of information and Broadcasting, Government in India.: <b>{item.is_follow_it_rules ? "Yes" : "No"}</b></p>
                                <p>Wheather the web series is its original production: <b>{item.is_original_production ? "Yes" : "No"}</b></p>
                                <p>Whether the production house is incorporated/registered in India: <b>{item.is_registered ? "Yes" : "No"}</b></p>
                                <p>Wheather the individual Producer is normally working and residing in India: <b>{item.is_residing_in_country ? "Yes" : "No"}</b></p>
                            </div>
                        </div>
                    </Grid >
                ))}



            <Grid item xs={12} sm={12} md={12} lg={12}>

                <div>
                    <h6>Select one of them</h6>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="type"
                            id="type_one"
                            value="1"
                            checked={formData.type == 1}
                            onChange={handleFormData}
                        />
                        <label className="form-check-label" htmlFor="type_one">
                            OTT
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="type"
                            id="type_two"
                            value="2"
                            checked={formData.type == 2}
                            onChange={handleFormData}
                        />
                        <label className="form-check-label" htmlFor="type_two">
                            Production House's
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="type"
                            id="type_three"
                            value="3"
                            checked={formData.type == 3}
                            onChange={handleFormData}
                        />
                        <label className="form-check-label" htmlFor="type_three">
                            Individual Producer's
                        </label>
                    </div>
                    {errorsForm.type && (
                        <p className="text-danger">{errorsForm.type}</p>
                    )}
                </div>



            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} className='mt-3'>
                <Typography className='text-danger text-capitalize'>Note:</Typography>
                <Typography className='text-danger text-capitalize'>1.Please Save and Submit The Entries Of Each Type Individually After Filling The Data</Typography>
                <Typography className='text-danger text-capitalize'>2. The Name Of the Ott Platform/Producer's/Production House's/Co-Producer's Will be credited as declared in the application form. No request for the change of names would be Entertained at any Stage</Typography>
            </Grid>



            <Grid item xs={12} sm={12} md={12} lg={12}  >
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Typography>(1) OTT <span className='text-danger'>*</span></Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} className='d-flex justify-content-end'>
                        <Box className='d-flex align-items-center'>
                            <Box>

                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                    <TextField
                        variant="outlined"
                        fullWidth
                        // placeholder='Name'
                        label="Name"
                        // InputProps={{
                        //     style: {
                        //         border: "1px solid #CF528A",
                        //         borderRadius: "5px",
                        //     },
                        // }}
                        // Other props as needed
                        className="input_border"
                        name="name"
                        onChange={handleFormData}
                    />
                </Box>
                {errorsForm.name && (
                    <p className="text-danger">{errorsForm.name}</p>
                )}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
                <textarea class="form-control" onChange={handleFormData} placeholder="Address" id="floatingTextarea2"
                    style={{
                        height: "100px",
                        //  border: "1px solid #CF528A", 
                        borderRadius: "5px"
                    }}
                    name="address">
                </textarea>
                {errorsForm.address && (
                    <p className="text-danger">{errorsForm.address}</p>
                )}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box className='d-flex align-items-center'>
                    {/* <FormControl
                        
                        style={{ border: "1px solid #CF528A", borderRadius: "5px" }}
                    >
                        <Select
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label', border: "1px solid #CF528A", borderRadius: "5px", }}
                    
                        >
                            <MenuItem value="">
                                +91
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl> */}
                    <TextField
                        // variant="outlined"
                        type='number'
                        fullWidth
                        // placeholder='Mobile'
                        label="Mobile"
                        // InputProps={{
                        //     style: {
                        //         border: "1px solid #CF528A",
                        //         borderRadius: "5px",
                        //     },
                        // }}
                        className="input_border"
                        inputProps={{ maxLength: 10 }}
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormData}
                        onKeyDown={handleKeyDown}
                    />
                </Box>
                {errorsForm.phone && (
                    <p className="text-danger">{errorsForm.phone}</p>
                )}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                    // variant="outlined"
                    fullWidth
                    // placeholder='Email ID'
                    label="Email ID"
                    // InputProps={{
                    //     style: {
                    //         border: "1px solid #CF528A",
                    //         borderRadius: "5px",
                    //     },
                    // }}
                    className="input_border"
                    name="email"
                    value={formData.email}
                    onChange={handleFormData}
                />
                {errorsForm.email && (
                    <p className="text-danger">{errorsForm.email}</p>
                )}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                    <h6>Wheather the OTT Platform has furnished information under Rule 18 of IT Rules, 2021 to the Ministry of information and Broadcasting, Government in India.</h6>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="is_follow_it_rules"
                            id="is_follow_it_rules_yes"
                            value="1"
                            checked={formData.is_follow_it_rules == 1}
                            onChange={handleFormData}

                        />
                        <label className="form-check-label" htmlFor="is_follow_it_rules_yes">
                            Yes
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="is_follow_it_rules"
                            id="is_follow_it_rules_no"
                            value="0"
                            checked={formData.is_follow_it_rules === 0 || formData.is_follow_it_rules === "0"}
                            onChange={handleFormData}
                        />
                        <label className="form-check-label" htmlFor="is_follow_it_rules_no">
                            No
                        </label>
                    </div>
                    {errorsForm.is_follow_it_rules && (
                        <p className="text-danger">{errorsForm.is_follow_it_rules}</p>
                    )}
                </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                    <h6>Wheather the web series is its original production</h6>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="is_original_production"
                            id="is_original_production_yes"
                            value="1"
                            checked={formData.is_original_production == 1}
                            onChange={handleFormData}
                        />
                        <label className="form-check-label" htmlFor="is_original_production_yes">
                            Yes
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="is_original_production"
                            id="is_original_production_no"
                            value="0"
                            checked={formData.is_original_production === 0 || formData.is_original_production === "0"}
                            onChange={handleFormData}

                        />
                        <label className="form-check-label" htmlFor="is_original_production_no">
                            No
                        </label>
                    </div>
                    {errorsForm.is_original_production && (
                        <p className="text-danger">{errorsForm.is_original_production}</p>
                    )}
                </Box>
            </Grid>


            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                    // variant="outlined"
                    fullWidth
                    // placeholder='Website'
                    label="Website"
                    // InputProps={{
                    //     style: {
                    //         border: "1px solid #CF528A",
                    //         borderRadius: "5px",
                    //     },
                    // }}
                    name="website"
                    onChange={handleFormData}

                />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
                <div>
                    <h6>Whether the production house is incorporated/registered in India</h6>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="is_registered"
                            id="is_registered_yes"
                            value="1"
                            checked={formData.is_registered == 1}
                            onChange={handleFormData}
                        />
                        <label className="form-check-label" htmlFor="is_registered_yes">
                            Yes
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="is_registered"
                            id="is_registered_no"
                            value="0"
                            checked={formData.is_registered === 0 || formData.is_registered === "0"}
                            onChange={handleFormData}
                        />
                        <label className="form-check-label" htmlFor="is_registered_no">
                            No
                        </label>
                    </div>
                </div>
                {errorsForm.is_registered && (
                    <p className="text-danger">{errorsForm.is_registered}</p>
                )}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"

                        style={{ display: 'none', width: "100%" }}
                        id="fileInput"
                    // name="is_registered"
                    />
                    <label htmlFor="fileInput" style={{ width: "100%", height: "100%" }}>
                        <TextField
                            variant="outlined"
                            placeholder="Upload Proof Of The Incorporation/Registration In India"
                            // value={selectedAttachCopyFile ? selectedAttachCopyFile.name : ''}
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




                </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
                <div>
                    <h6>Wheather the individual Producer is normally working and residing in India</h6>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="is_residing_in_country"
                            id="is_residing_in_country"
                            value="1"
                            checked={formData.is_residing_in_country == 1}
                            onChange={handleFormData}

                        />
                        <label className="form-check-label" htmlFor="is_residing_in_country_yes">
                            Yes
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="is_residing_in_country"
                            id="is_residing_in_country_no"
                            value="0"
                            checked={formData.is_residing_in_country === 0 || formData.is_residing_in_country === "0"}
                            onChange={handleFormData}
                        />
                        <label className="form-check-label" htmlFor="is_residing_in_country_no">
                            No
                        </label>
                    </div>
                </div>
                {errorsForm.is_residing_in_country && (
                    <p className="text-danger">{errorsForm.is_residing_in_country}</p>
                )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box className='d-flex align-items-center justify-content-end'>
                    <Box>
                        <button className='btn btn-success' onClick={submitForm}>Submit and Add More</button>
                        {errors.have_producer && (
                            <p className="text-danger">{errors.have_producer}</p>
                        )}
                    </Box>
                </Box>
            </Grid>
        </>
    )
}

export default PartialInfo