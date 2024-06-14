import React, { useState } from 'react'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box';
import { FormControl, TextField } from '@mui/material';
import RemoveIcon from "../../../images/remove.png"
import PlusIcon from "../../../images/plus_icon.png"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const DirectorAndCreatorDetails = ({ formData, setFormData, errors, setDirectorCreatorErrors}) => {
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



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        errors[name] = ""
        setDirectorCreatorErrors(errors);
    };
    return (
        <>
            <h5 className="text-capitalize">
                Director's/Creator's Details<span className="text-danger">*</span>
            </h5>
            <p className='text-danger'>NOTE:</p>
            <p className='text-danger text-capitalize'>The Name of the Director/Creator's will be credited as declared in the Application form. No request for a change of name would be entertained at any stage.</p>

            <form>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={12} md={12} lg={12}>

                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <h3 className="text-capitalize">
                                    Creator's Details
                                </h3>
                                <Box className='d-flex align-items-center justify-content-end'>
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

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <TextField
                                        label="Name of the creator's"
                                        type="text"
                                        fullWidth
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <TextField
                                        label="Nationality"
                                        type="text"
                                        fullWidth
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box className='d-flex align-items-center'>
                                    <FormControl
                                        //  sx={{ m: 1, minWidth: 120 }}>
                                        sx={{ minWidth: 120 }}
                                        style={{ border: "1px", borderRadius: "5px" }}
                                    >
                                        <Select
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label', border: "1px", borderRadius: "5px", }}
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
                                        placeholder='Number'
                                        InputProps={{
                                            style: {
                                                border: "1px",
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
                                            border: "1px",
                                            borderRadius: "5px",
                                        },
                                    }}
                                    className="input_border"
                                    name="Email"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    placeholder='Website'
                                    InputProps={{
                                        style: {
                                            border: "1px",
                                            borderRadius: "5px",
                                        },
                                    }}
                                    className="input_border"
                                    name="Email"
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} className='mt-4'>


                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <h5 className="text-capitalize">
                                    Director's/Creator's Details<span className="text-danger">*</span>
                                </h5>
                                <Box className='d-flex align-items-center justify-content-end'>
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

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <TextField
                                        label="Name of the Director's"
                                        type="text"
                                        fullWidth
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <TextField
                                        label="Nationality"
                                        type="text"
                                        fullWidth
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box className='d-flex align-items-center'>
                                    <FormControl
                                        //  sx={{ m: 1, minWidth: 120 }}>
                                        sx={{ minWidth: 120 }}
                                        style={{ border: "1px", borderRadius: "5px" }}
                                    >
                                        <Select
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label', border: "1px", borderRadius: "5px", }}
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
                                        placeholder='Number'
                                        InputProps={{
                                            style: {
                                                border: "1px",
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
                                            border: "1px",
                                            borderRadius: "5px",
                                        },
                                    }}
                                    className="input_border"
                                    name="Email"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    placeholder='Website'
                                    InputProps={{
                                        style: {
                                            border: "1px",
                                            borderRadius: "5px",
                                        },
                                    }}
                                    className="input_border"
                                    name="Email"
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} className='mt-4'>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <h5 className="text-capitalize">
                                    Other's Details
                                </h5>
                                <Box className='d-flex align-items-center justify-content-end'>
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

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <TextField
                                        label="Story Writer"
                                        type="text"
                                        fullWidth
                                        name="story_writer"
                                        value={formData.story_writer}
                                        onChange={handleChange}
                                    />
                                </Box>
                                {errors.story_writer && (
                            <p className="text-danger">{errors.story_writer}</p>
                        )}
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <TextField
                                        label="Screenplay writer's"
                                        type="text"
                                        fullWidth
                                        name="screening_writer"
                                        value={formData.screening_writer}
                                        onChange={handleChange}
                                    />
                                </Box>
                                {errors.screening_writer && (
                            <p className="text-danger">{errors.screening_writer}</p>
                        )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <TextField
                                        label="Director of photography"
                                        type="text"
                                        fullWidth
                                        name="director_of_photography"
                                        value={formData.director_of_photography}
                                        onChange={handleChange}
                                    />
                                </Box>
                                {errors.director_of_photography && (
                            <p className="text-danger">{errors.director_of_photography}</p>
                        )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <TextField
                                        label="Editor"
                                        type="text"
                                        fullWidth
                                        name="editior"
                                        value={formData.editior}
                                        onChange={handleChange}
                                    />
                                </Box>
                                {errors.editior && (
                            <p className="text-danger">{errors.editior}</p>
                        )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <TextField
                                        label="Art director"
                                        type="text"
                                        fullWidth
                                        name="art_director"
                                        value={formData.art_director}
                                        onChange={handleChange}
                                    />
                                </Box>
                                {errors.art_director && (
                            <p className="text-danger">{errors.art_director}</p>
                        )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <TextField
                                        label="Costume designer"
                                        type="text"
                                        fullWidth
                                        name="costume_director"
                                        value={formData.costume_director}
                                        onChange={handleChange}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <TextField
                                        label="Director of music"
                                        type="text"
                                        fullWidth
                                        name="music_director"
                                        value={formData.music_director}
                                        onChange={handleChange}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <TextField
                                        label="Sound designer"
                                        type="text"
                                        fullWidth
                                        name="sound_designer"
                                        value={formData.sound_designer}
                                        onChange={handleChange}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <TextField
                                        label="Principal cost"
                                        type="text"
                                        fullWidth
                                        name="principal_cast"
                                        value={formData.principal_cast}
                                        onChange={handleChange}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form >
        </>
    )
}

export default DirectorAndCreatorDetails