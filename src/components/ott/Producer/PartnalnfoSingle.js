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

const PartnalnfoSingle = ({ formData, setFormData, errors, setProducerErrors }) => {

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        errors[name] = ""
        setProducerErrors(errors);
        const newValue = value.replace(/\D/g, '').slice(0, 10);
        if (name == "coproducer_phone") {
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

          if (name === 'coproducer_email') {
            validateProducerEmail(value);
          }

    };
    console.log(formData)

    const validateProducerEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            setProducerErrors({
            ...errors,
            coproducer_email: 'Invalid email format'
          });
        } else {
            setProducerErrors({
            ...errors,
            coproducer_email: ''
          });
        }
      };
    const handleKeyDown = (event) => {
        // Prevent the letter 'e', '+', '-', '.' and other non-numeric characters
        if (['e', 'E', '+', '-', '.'].includes(event.key)) {
          event.preventDefault();
        }
      };
    return (
        <>

            <Grid item xs={12} sm={12} md={12} lg={12}>

                <div>
                    <h6>Select one of them</h6>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="coproducer_type"
                            id="type_one"
                            value="1"
                            checked={formData.coproducer_type == 1}
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
                            name="coproducer_type"
                            id="type_two"
                            value="2"
                            checked={formData.coproducer_type == 2}
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
                            name="coproducer_type"
                            id="type_three"
                            value="3"
                            checked={formData.coproducer_type == 3}
                            onChange={handleFormData}
                        />
                        <label className="form-check-label" htmlFor="type_three">
                            Individual Producer's
                        </label>
                    </div>
                    {errors.coproducer_type && (
                        <p className="text-danger">{errors.coproducer_type}</p>
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
                        fullWidth
                        label="Name"
                        className="input_border"
                        name="coproducer_name"
                        onChange={handleFormData}
                    />
                </Box>
                {errors.coproducer_name && (
                    <p className="text-danger">{errors.coproducer_name}</p>
                )}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
                <textarea class="form-control" onChange={handleFormData} placeholder="Address" id="floatingTextarea2" 
                style={{ height: "100px",
                     borderRadius: "5px" }}
                    name="coproducer_address">
                </textarea>
                {errors.coproducer_address && (
                    <p className="text-danger">{errors.coproducer_address}</p>
                )}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box className='d-flex align-items-center'>
                    <TextField
                        type='number'
                        fullWidth
                        label="Mobile"
                        className="input_border"
                        name="coproducer_phone"
                        value={formData.coproducer_phone}
                        inputProps={{ maxLength: 10 }}
                        onChange={handleFormData}
                        onKeyDown={handleKeyDown}
                    />
                </Box>
                {errors.coproducer_phone && (
                    <p className="text-danger">{errors.coproducer_phone}</p>
                )}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                    fullWidth
                    label="Email ID"
                    className="input_border"
                    name="coproducer_email"
                    value={formData.coproducer_email}
                    onChange={handleFormData}
                />
                {errors.coproducer_email && (
                    <p className="text-danger">{errors.coproducer_email}</p>
                )}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                    <h6>Wheather the OTT Platform has furnished information under Rule 18 of IT Rules, 2021 to the Ministry of information and Broadcasting, Government in India.</h6>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="coproducer_is_follow_it_rules"
                            id="coproducer_is_follow_it_rules_yes"
                            value="1"
                            checked={formData.coproducer_is_follow_it_rules == 1}
                            onChange={handleFormData}

                        />
                        <label className="form-check-label" htmlFor="coproducer_is_follow_it_rules_yes">
                            Yes
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="coproducer_is_follow_it_rules"
                            id="coproducer_is_follow_it_rules_no"
                            value="0"
                            checked={formData.coproducer_is_follow_it_rules === 0 || formData.coproducer_is_follow_it_rules === "0"}
                            onChange={handleFormData}
                        />
                        <label className="form-check-label" htmlFor="coproducer_is_follow_it_rules_no">
                            No
                        </label>

                    </div>
                    {errors.coproducer_is_follow_it_rules && (
                        <p className="text-danger">{errors.coproducer_is_follow_it_rules}</p>
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
                            name="coproducer_is_original_production"
                            id="coproducer_is_original_production_yes"
                            value="1"
                            checked={formData.coproducer_is_original_production == 1}
                            onChange={handleFormData}
                        />
                        <label className="form-check-label" htmlFor="coproducer_is_original_production_yes">
                            Yes
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="coproducer_is_original_production"
                            id="coproducer_is_original_production_no"
                            value="0"
                            checked={formData.coproducer_is_original_production === 0 || formData.coproducer_is_original_production === "0"}
                            onChange={handleFormData}

                        />
                        <label className="form-check-label" htmlFor="coproducer_is_original_production_no">
                            No
                        </label>

                    </div>
                    {errors.coproducer_is_original_production && (
                        <p className="text-danger">{errors.coproducer_is_original_production}</p>
                    )}
                </Box>
            </Grid>


            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                    fullWidth
                    label="Website"
                    name="coproducer_website"
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
                            name="coproducer_is_registered"
                            id="coproducer_is_registered_yes"
                            value="1"
                            checked={formData.coproducer_is_registered == 1}
                            onChange={handleFormData}
                        />
                        <label className="form-check-label" htmlFor="coproducer_is_registered_yes">
                            Yes
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="coproducer_is_registered"
                            id="coproducer_is_registered_no"
                            value="0"
                            checked={formData.coproducer_is_registered === 0 || formData.coproducer_is_registered === "0"}
                            onChange={handleFormData}
                        />
                        <label className="form-check-label" htmlFor="coproducer_is_registered_no">
                            No
                        </label>

                    </div>
                    {errors.coproducer_is_registered && (
                        <p className="text-danger">{errors.coproducer_is_registered}</p>
                    )}
                </div>
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
                            name="coproducer_is_residing_in_country"
                            id="coproducer_is_residing_in_country_yes"
                            value="1"
                            checked={formData.coproducer_is_residing_in_country == 1}
                            onChange={handleFormData}

                        />
                        <label className="form-check-label" htmlFor="coproducer_is_residing_in_country_yes">
                            Yes
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="coproducer_is_residing_in_country"
                            id="coproducer_is_residing_in_country_no"
                            value="0"
                            checked={formData.coproducer_is_residing_in_country === 0 || formData.coproducer_is_residing_in_country === "0"}
                            onChange={handleFormData}
                        />
                        <label className="form-check-label" htmlFor="coproducer_is_residing_in_country_no">
                            No
                        </label>
                    </div>
                    {errors.coproducer_is_residing_in_country && (

                        <p className="text-danger">{errors.coproducer_is_residing_in_country}</p>
                    )}

                </div>

            </Grid>


        </>
    )
}

export default PartnalnfoSingle