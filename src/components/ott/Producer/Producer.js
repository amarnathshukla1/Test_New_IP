import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormControl, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import RemoveIcon from "../../../images/remove.png"
import PlusIcon from "../../../images/plus_icon.png"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Producer = ({ formData, setFormData, errors, setDocumentErrors }) => {
    const [showCastAndCrewRemoveButton, setShowCastAndCrewRemoveButton] = useState(false)
    const [selectedDetailsCastCrewFile, setSelectedDetailsCastCrewFile] = useState(null);


    const [country, setCountry] = React.useState('');

    const handleselectedDetailsCastCrewFile = (event) => {
        setSelectedDetailsCastCrewFile(event.target.files[0]);
        setShowCastAndCrewRemoveButton(true)
        const DetailsCastCrewfile = event.target.files[0];
        // Do something with the uploaded file
        console.log(DetailsCastCrewfile);
        setFormData((prevState) => ({
            ...prevState,
            details_of_cast_crew: DetailsCastCrewfile,
            is_details_of_cast_crew: 1,
        }));
    };
    const handleCastAndCrewAttachClick = () => {
        setShowCastAndCrewRemoveButton(true)
    }

    const handleCastAndCrewRemoveClick = () => {
        setShowCastAndCrewRemoveButton(false)
        setSelectedDetailsCastCrewFile(null)

    }
    return (
        <>



            <h5 className="text-capitalize">
                Details Of Production<span className="text-danger">*</span>
            </h5>


            <form>
                <Grid container spacing={2} className='mt-2'>
                    <Grid item xs={12} sm={12} md={12} lg={12}>

                        <div>
                            <h6>Wheather the web series is a co-production</h6>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="is_co_producer"
                                    id="category_yes"
                                />
                                <label className="form-check-label" htmlFor="category_yes">
                                    Yes
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="is_co_producer"
                                    id="category_no"
                                />
                                <label className="form-check-label" htmlFor="category_no">
                                    No
                                </label>
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>

                        <div>
                            <h6>Select one of them</h6>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="is_co_producer1"
                                    id="category_yes"
                                />
                                <label className="form-check-label" htmlFor="category_yes">
                                    OTT
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="is_co_producer1"
                                    id="category_no"
                                />
                                <label className="form-check-label" htmlFor="category_no">
                                    Production House's
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="category"
                                    id="category_no"
                                />
                                <label className="form-check-label" htmlFor="category_no">
                                    Individual Producer's
                                </label>
                            </div>
                        </div>



                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} className='mt-3'>
                        <Typography className='text-danger text-capitalize'>Note:</Typography>
                        <Typography className='text-danger text-capitalize'>1.Please Save and Submit The Entries Of Each Type Individually After Filling The Data</Typography>
                        <Typography className='text-danger text-capitalize'>2. The Name Of the Ott Platform/Producer's/Production House's/Co-Producer's Will be credited as declared in the application form. No request for the change of names would be Entertained at any Stage</Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}  >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Typography>(1) OTT <span className='text-danger'>*</span></Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} className='d-flex justify-content-end'>
                                <Box className='d-flex align-items-center'>
                                    <Box>
                                        {showCastAndCrewRemoveButton ? (
                                            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#FF0000', width: '100%' }} onClick={handleCastAndCrewRemoveClick}>
                                                <img src={RemoveIcon} alt='remove icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Remove</p>
                                            </button>
                                        ) : (
                                            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'black', width: '100%' }} onClick={handleCastAndCrewAttachClick}>
                                                <img src={PlusIcon} alt='plus icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Add More</p>
                                            </button>
                                        )}
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
                                placeholder='Name'
                                InputProps={{
                                    style: {
                                        border: "1px solid #CF528A",
                                        borderRadius: "5px",
                                    },
                                }}
                                // Other props as needed
                                className="input_border"
                                name="Name"

                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <textarea class="form-control" placeholder="Address" id="floatingTextarea2" style={{ height: "100px", border: "1px solid #CF528A", borderRadius: "5px" }}
                            name="Address">
                        </textarea>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box className='d-flex align-items-center'>
                            <FormControl
                                //  sx={{ m: 1, minWidth: 120 }}>
                                sx={{ minWidth: 120 }}
                                style={{ border: "1px solid #CF528A", borderRadius: "5px" }}
                            >
                                <Select
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label', border: "1px solid #CF528A", borderRadius: "5px", }}
                                // InputProps={{
                                //   style: {
                                //     border: "1px solid #CF528A",
                                //     borderRadius: "5px",
                                //   },
                                // }}
                                >
                                    <MenuItem value="">
                                        +91
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                variant="outlined"
                                type='number'
                                fullWidth
                                placeholder='Mobile'
                                InputProps={{
                                    style: {
                                        border: "1px solid #CF528A",
                                        borderRadius: "5px",
                                    },
                                }}
                                className="input_border"
                                name="producer_mobile"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder='Email ID'
                            InputProps={{
                                style: {
                                    border: "1px solid #CF528A",
                                    borderRadius: "5px",
                                },
                            }}
                            className="input_border"
                            name="Email"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box>
                            <h6>Wheather the OTT Platform has furnished information under Rule 18 of IT Rules, 2021 to the Ministry of information and Broadcasting, Government in India.</h6>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="category"
                                    id="category_yes"
                                />
                                <label className="form-check-label" htmlFor="category_yes">
                                    Yes
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="category"
                                    id="category_no"
                                />
                                <label className="form-check-label" htmlFor="category_no">
                                    No
                                </label>
                            </div>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box>
                            <h6>Wheather the web series is its original production</h6>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="category"
                                    id="category_yes"
                                />
                                <label className="form-check-label" htmlFor="category_yes">
                                    Yes
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="category"
                                    id="category_no"
                                />
                                <label className="form-check-label" htmlFor="category_no">
                                    No
                                </label>
                            </div>
                        </Box>
                    </Grid>


                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder='Website'
                            InputProps={{
                                style: {
                                    border: "1px solid #CF528A",
                                    borderRadius: "5px",
                                },
                            }}
                            name="website"
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div>
                            <h6>Whether the production house is incorporated/registered in India</h6>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="category"
                                    id="category_yes"
                                />
                                <label className="form-check-label" htmlFor="category_yes">
                                    Yes
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="category"
                                    id="category_no"
                                />
                                <label className="form-check-label" htmlFor="category_no">
                                    No
                                </label>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"

                                style={{ display: 'none', width: "100%" }}
                                id="fileInput"
                                name="authorization_latter"
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
                                            border: "1px solid #CF528A",
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
                                    name="category"
                                    id="category_yes"
                                />
                                <label className="form-check-label" htmlFor="category_yes">
                                    Yes
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="category"
                                    id="category_no"
                                />
                                <label className="form-check-label" htmlFor="category_no">
                                    No
                                </label>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </form>










        </>
    )
}

export default Producer