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
import { useParams } from 'react-router-dom';

import styles from "../../ott/OttPlatform/Stream.module.css"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const ThreatricalScreening = ({ setFormDataMain, setOttPlatformErrors, errors, formDataMain }) => {

    const { id = null } = useParams();
    const { putRequest, getRequest, deleteRequest } = ApiClient();
    const [errorsForm, setErrorsForm] = useState({});
    const [preData, setPreData] = useState([]);
    const [formData, setformData] = React.useState({
        ott_form_id: id,
        festival_name: "",
        date_of_festival: null,
        address: "",
    });
    const loadData = async () => {
        const preData = await getRequest(`ott/${id}/threatrical-screening`);
        const data = preData.data;
        if (data.length > 0) {

            setFormDataMain(prevData => ({
                ...prevData,
                is_threatical_screening_added: 1
            }));
            setOttPlatformErrors({
                ...errors,
                is_threatical_screening_added: null
            })
        } else {
            setFormDataMain(prevData => ({
                ...prevData,
                is_threatical_screening_added: null
            }))
        }
        //  if (data && data.length < 5) setShowAddNewEntry(true)
        setPreData(data);
    }
    useEffect(() => {
        loadData();

    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.festival_name) newErrors.festival_name = 'Enter festival name';
        if (!formData.date_of_festival) newErrors.date_of_festival = 'Select date of festival';
        if (!formData.address) newErrors.address = 'Enter address of the festival';
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

    };
    const handleReleaseDate = (e) => {

        if (e) {
            const formattedDate = e.format('YYYY-MM-DD');
            setformData(prevData => ({
                ...prevData,
                date_of_festival: dayjs(formattedDate)
            }));
        }

    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {

            const response = await putRequest(`ott/${id}/threatrical-screening`, formData)

            if (!response.status) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            console.log("Response producer:", response);

            // Reset form after co-Producer submission
            setformData({
                festival_name: "",
                date_of_festival: null,
                address: "",
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
            const response = await deleteRequest(`ott/${id}/threatrical-screening/${prepareDelete}`, formData)

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

    return (
        <>
            {preData && preData.length > 0 ? (
                <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Name of the Festival/Screening</TableCell>
                                <TableCell align="center">Date of the Festival/Screening</TableCell>
                                <TableCell align="center">Address of the festival</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {preData.map((row) => (
                                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center">{row.festival_name}</TableCell>
                                    <TableCell align="center">{row.date_of_festival}</TableCell>
                                    <TableCell align="center">{row.address}</TableCell>
                                    <TableCell align="center">
                                        <Button value={row.id} onClick={handleDeleteOpen} variant="outlined" color="error" startIcon={<DeleteIcon style={{ color: '#d32f2f' }} />}>
                                            Delete
                                        </Button>
                                        <DeleteDialog open={openDeleteConfirm} handleClose={handleDeleteClose} handleDelete={submitDelete} />
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell align="center" colSpan={4}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3} sm={3} md={3} lg={3}>
                                            <Box>
                                                <TextField
                                                    name="festival_name"
                                                    label="Name of the Festival/Screening"
                                                    type="text"
                                                    fullWidth
                                                    variant="outlined"
                                                    onChange={handleFormData}
                                                />
                                            </Box>
                                            {errorsForm.festival_name && (
                                                <p className="text-danger">{errorsForm.festival_name}</p>
                                            )}

                                        </Grid>
                                        <Grid item xs={3} sm={3} md={3} lg={3}>
                                            <Box style={{ width: "100%" }}>
                                                <FormControl>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}  >
                                                        <DemoContainer components={['DatePicker']}>
                                                            <DatePicker
                                                                label="Date of Festival/Screening"
                                                                name="date_of_festival"
                                                                value={formData.date_of_festival}
                                                                onChange={handleReleaseDate}
                                                                minDate={dayjs('2023-08-01')}
                                                                maxDate={dayjs('2024-07-31')}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </FormControl>
                                                {errorsForm.date_of_festival && (
                                                    <p className="text-danger">{errorsForm.date_of_festival}</p>
                                                )}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={3} sm={3} md={3} lg={3}>
                                            <Box>
                                                <TextField
                                                    name="address"
                                                    label="Address of the festival"
                                                    type="text"
                                                    fullWidth
                                                    onChange={handleFormData}
                                                />
                                            </Box>
                                            {errorsForm.address && (
                                                <p className="text-danger">{errorsForm.address}</p>
                                            )}
                                        </Grid>
                                        <Grid item xs={3} sm={3} md={3} lg={3}>
                                            <Box>
                                                <Button variant="contained" color="success" onClick={submitForm}>
                                                    Submit and Add More
                                                </Button>
                                                {errors.is_threatical_screening_added && (
                                                    <p className="text-danger error-handling">{errors.is_threatical_screening_added}</p>
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
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <Box>
                            <TextField
                                name="festival_name"
                                label="Name of the Festival/Screening"
                                type="text"
                                fullWidth
                                onChange={handleFormData}
                            />
                        </Box>
                        {errorsForm.festival_name && (
                            <p className="text-danger">{errorsForm.festival_name}</p>
                        )}

                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <Box style={{ width: "100%" }}>
                            <FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}  >
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Date of Festival/Screening"
                                            name="date_of_festival"
                                            value={formData.date_of_festival}
                                            onChange={handleReleaseDate}
                                            minDate={dayjs('2023-08-01')}
                                            maxDate={dayjs('2024-07-31')}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormControl>
                            {errorsForm.date_of_festival && (
                                <p className="text-danger">{errorsForm.date_of_festival}</p>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <Box>
                            <TextField
                                name="address"
                                label="Address of the festival"
                                type="text"
                                fullWidth
                                onChange={handleFormData}
                            />
                        </Box>
                        {errorsForm.address && (
                            <p className="text-danger">{errorsForm.address}</p>
                        )}
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <Box>
                            <Button variant="contained" color="success" onClick={submitForm}>
                                Submit and Add More
                            </Button>
                            {errors.is_threatical_screening_added && (
                                <p className="text-danger error-handling">{errors.is_threatical_screening_added}</p>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default ThreatricalScreening