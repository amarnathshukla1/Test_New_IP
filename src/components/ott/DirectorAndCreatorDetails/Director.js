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
import dayjs from 'dayjs';
import ApiClient from '../../common/ApiClient';
import { useEffect } from 'react';
import DeleteDialog from '../../ip/DeleteDialog';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router-dom';

import { getRequestGlobal } from "../../../API/global"
import InputLabel from '@mui/material/InputLabel';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const Director = ({ proms = {}, setFormDataMain, setDirectorCreatorErrors, errors }) => {
    const { id = null } = useParams();
    const { putRequest, getRequest, deleteRequest } = ApiClient();
    const [errorsForm, setErrorsForm] = useState({});
    const [preData, setPreData] = useState([]);
    const [countryId, setCountryId] = useState({})
    const [formData, setformData] = React.useState({
        name: '',
        country_id: null,
        phone: null,
        email: null,
        website: null,
        ott_form_id: id,
    });
    const loadData = async () => {
        const preData = await getRequest(`ott/${id}/creator/type/${proms.type}`);
        const data = preData.data;

        if (proms.type == 1) {
            if (data.length > 0) {

                setFormDataMain(prevData => ({
                    ...prevData,
                    is_creator_added: 1
                }));
                setDirectorCreatorErrors({
                    ...errors,
                    is_creator_added: null
                })
            } else {

                setFormDataMain(prevData => ({
                    ...prevData,
                    is_creator_added: null
                }));
            }
        } else if (proms.type == 2) {
            if (data.length > 0) {

                setFormDataMain(prevData => ({
                    ...prevData,
                    is_director_added: 1
                }));
                setDirectorCreatorErrors({
                    ...errors,
                    is_director_added: null
                })
            } else {

                setFormDataMain(prevData => ({
                    ...prevData,
                    is_director_added: null
                }));
            }
        }




        setPreData(data);
    }
    useEffect(() => {
        loadData();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Enter name';
        if (!formData.country_id) newErrors.country_id = 'Select nationality';
        if (!formData.phone) newErrors.phone = 'Enter phone number';
        if (!formData.email) newErrors.email = 'Enter email id';
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
            validateDirectorEmail(value);
        }

    };
    const handleCompetitionDate = (e) => {

        if (e) {
            const formattedDate = e.format('YYYY-MM-DD');
            setformData(prevData => ({
                ...prevData,
                competition_date: dayjs(formattedDate)
            }));
        }

    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {

            const response = await putRequest(`ott/${id}/creator/type/${proms.type}`, formData)

            if (!response.status) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            console.log("Response producer:", response);

            // Reset form after co-Producer submission
            setformData({
                name: '',
                country_id: null,
                phone: null,
                email: null,
                website: null,
                ott_form_id: id,
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
            const response = await deleteRequest(`ott/${id}/creator/${prepareDelete}`, formData)

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

    useEffect(() => {
        getRequestGlobal('country', {})
            .then((data) => {
                console.log({ data })
                setCountryId(data.data)
            })
            .catch((error) => {
            });

    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("")
        setformData({
            ...formData,
            [name]: value
        });
        errorsForm[name] = ""
        setErrorsForm(errorsForm);

    };

    const handleKeyDown = (event) => {
        // Prevent the letter 'e', '+', '-', '.' and other non-numeric characters
        if (['e', 'E', '+', '-', '.'].includes(event.key)) {
            event.preventDefault();
        }
    };

    const validateDirectorEmail = (email) => {
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

    return (
        <>
            {/* {preData && preData.length > 0 ? ( */}
            <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align="center">country</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Website</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {preData.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">
                                    {/* {row.country_id} */}
                                    {countryId[row.country_id] || ''}
                                    </TableCell>
                                <TableCell align="center">{row.phone}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.website}</TableCell>
                                <TableCell align="center">
                                    <Button value={row.id} onClick={handleDeleteOpen} variant="outlined" color="error" startIcon={<DeleteIcon style={{ color: '#d32f2f' }} />}>
                                        Delete
                                    </Button>
                                    <DeleteDialog open={openDeleteConfirm} handleClose={handleDeleteClose} handleDelete={submitDelete} />
                                </TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell align="center" colSpan={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                        <Box>
                                            <TextField
                                                label={(proms.type == 1) ? `Name of the creator's` : `Name of the director's`}
                                                type="text"
                                                fullWidth
                                                name="name"
                                                onChange={handleFormData}
                                            />
                                        </Box>
                                        {errorsForm.name && (
                                            <p className="text-danger">{errorsForm.name}</p>
                                        )}
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                        <Box>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Nationality</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    onChange={handleFormData}
                                                    name="country_id"
                                                    label="Nationality"
                                                    value={formData.country_id || ''}
                                                >
                                                    <MenuItem key="0" value="">Nationality</MenuItem>

                                                    {Object.entries(countryId).map(([key, value]) => (
                                                        <MenuItem key={key} value={key}>
                                                            {value}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            {errorsForm.country_id && (
                                                <p className="text-danger">{errorsForm.country_id}</p>
                                            )}

                                        </Box>

                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                        <Box className='d-flex align-items-center'>
                                            <TextField
                                                variant="outlined"
                                                type='number'
                                                fullWidth
                                                label="Number"
                                                name="phone"
                                                value={formData.phone}
                                                inputProps={{ maxLength: 10 }}
                                                InputProps={{
                                                    style: {
                                                        border: "1px",
                                                        borderRadius: "5px",
                                                    },
                                                }}
                                                className="input_border"
                                                onChange={handleFormData}
                                                onKeyDown={handleKeyDown}
                                            />

                                        </Box>
                                        {errorsForm.phone && (
                                            <p className="text-danger">{errorsForm.phone}</p>
                                        )}
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            placeholder='Email ID'
                                            name="email"
                                            InputProps={{
                                                style: {
                                                    border: "1px",
                                                    borderRadius: "5px",
                                                },
                                            }}
                                            className="input_border"
                                            onChange={handleFormData}
                                        />
                                        {errorsForm.email && (
                                            <p className="text-danger">{errorsForm.email}</p>
                                        )}
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            placeholder='Website'
                                            name="website"
                                            onChange={handleFormData}
                                            InputProps={{
                                                style: {
                                                    border: "1px",
                                                    borderRadius: "5px",
                                                },
                                            }}
                                            className="input_border"

                                        />
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                        <Box>
                                            <Button variant="contained" color="success" onClick={submitForm}>
                                                Submit & Add 
                                            </Button>
                                            {proms.type == 1 && errors.is_creator_added && (
                                                <p className="text-danger error-handling">{errors.is_creator_added}</p>
                                            )}
                                            {proms.type == 2 && errors.is_director_added && (
                                                <p className="text-danger error-handling">{errors.is_director_added}</p>
                                            )}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    {/* </TableFooter> */}
                </Table>
            </TableContainer>
            {/* )} */}


        </>
    )
}

export default Director