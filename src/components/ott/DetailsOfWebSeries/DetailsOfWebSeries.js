import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormControl, TextField } from '@mui/material';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { getRequestGlobal } from "../../../API/global"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const DetailsOfWebSeries = ({ formData, setFormData, errors, setWebSeriesErrors }) => {

    const [language, setLanguage] = useState({});
    console.log(language, "language")

    useEffect(() => {
        getRequestGlobal('language_list', {})
            .then((data) => {
                setLanguage(data.data);
            })
            .catch((error) => {
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        errors[name] = ""
        setWebSeriesErrors(errors);

    };
    return (
        <>


            <h5 className="text-capitalize">
                Details Of Web Series<span className="text-danger">*</span>
            </h5>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                label="Title of Web Series(in the original language of release)"
                                type="text"
                                fullWidth
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </Box>
                        {errors.title && (
                            <p className="text-danger">{errors.title}</p>
                        )}

                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                label="English translation of the title"
                                type="text"
                                fullWidth
                                name="title_in_english"
                                value={formData.title_in_english}
                                onChange={handleChange}
                            />
                        </Box>
                        {errors.title_in_english && (
                            <p className="text-danger">{errors.title_in_english}</p>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                label="Genre"
                                type="text"
                                fullWidth
                                name="genre_id"
                                value={formData.genre_id}
                                onChange={handleChange}
                            />
                        </Box>
                        {errors.genre_id && (
                            <p className="text-danger">{errors.genre_id}</p>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField
                                label="Language in which the Web Series was originally released"
                                type="text"
                                fullWidth
                                name="subtitle_other_language"
                                value={formData.subtitle_other_language}
                                onChange={handleChange}
                            />
                        </Box>
                        {errors.subtitle_other_language && (
                            <p className="text-danger">{errors.subtitle_other_language}</p>
                        )}
                    </Grid>

                    <Grid item xs={6}>
                        <div>
                            <h6>Whether the series in subtitled in English</h6>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="is_subtitle_language_eng"
                                    id="is_subtitle_language_eng_yes"
                                    value="1"
                                    checked={formData.is_subtitle_language_eng == 1}
                                    onChange={handleChange}
                                />
                                <label htmlFor="is_subtitle_language_eng_yes">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="is_subtitle_language_eng"
                                    id="is_subtitle_language_eng_no"
                                    value="0"
                                    checked={formData.is_subtitle_language_eng == 0}
                                    onChange={handleChange}
                                />
                                <label htmlFor="is_subtitle_language_eng_no">No</label>
                            </div>
                            {errors.is_subtitle_language_eng && (
                                <p className="text-danger">{errors.is_subtitle_language_eng}</p>
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <h6 className="text-capitalize">language of the film</h6>
                            <div>
                                <div className="input_field">
                                    <FormControl
                                        sx={{
                                            width: "100%",
                                            // border: "1px solid #CF528A",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        <Select
                                            name="language_id"
                                            displayEmpty
                                            value={formData.language_id || ''}
                                            onChange={handleChange}
                                            inputProps={{ "aria-label": "Language of the Film" }}
                                        >
                                            {/* <MenuItem key="0" value="">There language in which subtitles are available(if any)</MenuItem>
                                        <MenuItem value={1}>Hindi</MenuItem>
                                        <MenuItem value={2}>English</MenuItem> */}
                                            <MenuItem key="0" value="">There language in which subtitles are available(if any)</MenuItem>
                                            {Object.entries(language).map(([key, value]) => (
                                                <MenuItem key={key} value={key}>
                                                    {value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {errors.language_id && (
                                        <p className="text-danger">{errors.language_id}</p>
                                    )}
                                </div>
                            </div>




                        </div>
                    </Grid>
                </Grid>
            </form>










        </>
    )
}

export default DetailsOfWebSeries