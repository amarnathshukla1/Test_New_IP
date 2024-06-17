import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const AddressIdentification = () => {
    return (
        <>
            <form>
                <Grid container spacing={2} className='mt-3'>
                    <Grid item xs={12} sm={12} md={6} lg={12} className='p-1'>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="Full Name"
                                type="text"
                                fullWidth
                                name="title"
                            // value={formData.title}
                            // onChange={handleChange}
                            />
                        </Box>
                        {/* {errors.title && (
                            <p className="text-danger">{errors.title}</p>
                        )} */}

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} className='p-1'>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="Date Of Birth"
                                type="text"
                                fullWidth
                                name="title"
                            // value={formData.title}
                            // onChange={handleChange}
                            />
                        </Box>
                        {/* {errors.title && (
                            <p className="text-danger">{errors.title}</p>
                        )} */}

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} className='p-1'>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="Age"
                                type="text"
                                fullWidth
                                name="title"
                            // value={formData.title}
                            // onChange={handleChange}
                            />
                        </Box>
                        {/* {errors.title && (
                            <p className="text-danger">{errors.title}</p>
                        )} */}

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} className='p-1'>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="Gender"
                                type="text"
                                fullWidth
                                name="title"
                            // value={formData.title}
                            // onChange={handleChange}
                            />
                        </Box>
                        {/* {errors.title && (
                            <p className="text-danger">{errors.title}</p>
                        )} */}

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={12} className='p-1'>
                        <FormGroup>
                            <FormControlLabel
                                required
                                control={<Checkbox style={{ color: '#2C3E50' }} className='checkboxcmot'/>}
                                label="Check If Permanent Address And Residential Address Are Same"
                            />
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4} className='p-1'>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="Contact Number "
                                type="number"
                                fullWidth
                                name="title"
                            // value={formData.title}
                            // onChange={handleChange}
                            />
                        </Box>
                        {/* {errors.title && (
                            <p className="text-danger">{errors.title}</p>
                        )} */}

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} className='p-1'>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="Email ID"
                                type="email"
                                fullWidth
                                name="title"
                            // value={formData.title}
                            // onChange={handleChange}
                            />
                        </Box>
                        {/* {errors.title && (
                            <p className="text-danger">{errors.title}</p>
                        )} */}

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} className='p-1'>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="Full Name"
                                type="text"
                                fullWidth
                                name="title"
                            // value={formData.title}
                            // onChange={handleChange}
                            />
                        </Box>
                        {/* {errors.title && (
                            <p className="text-danger">{errors.title}</p>
                        )} */}

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} className='p-1'>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="Date Of Birth"
                                type="text"
                                fullWidth
                                name="title"
                            // value={formData.title}
                            // onChange={handleChange}
                            />
                        </Box>
                        {/* {errors.title && (
                            <p className="text-danger">{errors.title}</p>
                        )} */}

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} className='p-1'>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="Age"
                                type="text"
                                fullWidth
                                name="title"
                            // value={formData.title}
                            // onChange={handleChange}
                            />
                        </Box>
                        {/* {errors.title && (
                            <p className="text-danger">{errors.title}</p>
                        )} */}

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} className='p-1'>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="Gender"
                                type="text"
                                fullWidth
                                name="title"
                            // value={formData.title}
                            // onChange={handleChange}
                            />
                        </Box>
                        {/* {errors.title && (
                            <p className="text-danger">{errors.title}</p>
                        )} */}

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} className='p-1'>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="Contact Number "
                                type="number"
                                fullWidth
                                name="title"
                            // value={formData.title}
                            // onChange={handleChange}
                            />
                        </Box>
                        {/* {errors.title && (
                            <p className="text-danger">{errors.title}</p>
                        )} */}

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} className='p-1'>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="Email ID"
                                type="email"
                                fullWidth
                                name="title"
                            // value={formData.title}
                            // onChange={handleChange}
                            />
                        </Box>
                        {/* {errors.title && (
                            <p className="text-danger">{errors.title}</p>
                        )} */}

                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default AddressIdentification