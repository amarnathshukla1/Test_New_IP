import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';




const PersonalDetail = ({ formData, setFormData, errors, setWebSeriesErrors }) => {
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log("")
    //     setFormData({
    //         ...formData,
    //         [name]: value
    //     });
    //     errors[name] = ""
    //     setWebSeriesErrors(errors);

    // };
    const Root = styled('div')(({ theme }) => ({
        width: '100%',
        margin: '10px',
        // ...theme.typography.body2,
        color: theme.palette.text.secondary,
        '& > :not(style) ~ :not(style)': {
            marginTop: theme.spacing(2),
        },
    }));

    return (
        <>
            <form>
                <Grid container spacing={2} className='mt-3'>
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
                    <Grid item xs={12} sm={12} md={6} lg={6} className='p-1'>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="Applicant Brief Bio (Not exceed 200 words)"
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
                    <Grid item xs={12} sm={12} md={6} lg={6} className='p-1'>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="Why Do You Want To Participate In The Program?"
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
                    <Root>
                        <Divider>
                            <Chip label="Optional" size="small" />
                        </Divider>
                    </Root>
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
                    <Grid item xs={12} sm={12} md={6} lg={12} className='p-1'>
                        <Box>
                            <TextField
                                variant="outlined"
                                label="Applicant Brief Bio (Not exceed 200 words)"
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
                </Grid>
            </form>
        </>
    )
}

export default PersonalDetail