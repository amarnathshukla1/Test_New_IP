import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormControl, TextField } from '@mui/material';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { getRequestGlobal } from "../../../API/global"
import InputLabel from '@mui/material/InputLabel';




const DetailsOfWebSeries = ({ formData, setFormData, errors, setWebSeriesErrors }) => {

    const [language, setLanguage] = useState({});
    const [genre, setGenre] = useState({});
    const [subtitlelanguage, setSubtitleLanguage] = useState({});
   


    useEffect(() => {
        getRequestGlobal('language_list', {})
            .then((data) => {
                setLanguage(data.data);
            })
            .catch((error) => {
            });
            getRequestGlobal('genre', {})
            .then((data)=> {
                console.log({data})
                setGenre(data.data)
            })
            .catch((error) => {
            });
            getRequestGlobal('language_list', {})
            .then((data)=> {
                console.log({data})
                setSubtitleLanguage(data.data)
            })
            .catch((error) => {
            });
           
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("")
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
                    <Grid item xs={12} sm={12} md={6} lg={6} >
                        <Box>
                            <TextField
                                variant="outlined"
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

                    <Grid item xs={12} sm={12} md={6} lg={6}>
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

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div className="input_field">
                            <FormControl
                                sx={{
                                    width: "100%",
                                    borderRadius: "5px",
                                }}
                                fullWidth
                            >
                                <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                                <Select
                                    name="genre_id"
                                  
                                    value={formData.genre_id || ''}
                                    onChange={handleChange}
                                    inputProps={{ "aria-label": "Genre id" }}
                                    label="Genre"
                                >
                                    
                                    <MenuItem key="0" value="">Genre</MenuItem>
                                            {Object.entries(genre).map(([key, value]) => (
                                                <MenuItem key={key} value={key}>
                                                    {value}
                                                </MenuItem>
                                            ))}
                                </Select>
                            </FormControl>
                            {errors.genre_id && (
                                <p className="text-danger">{errors.genre_id}</p>
                            )}
                        </div>
                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Language in which the Web Series was originally released</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={handleChange}
                                    name="language_id"
                                    label="Language in which the Web Series was originally released"
                                    value={formData.language_id || ''}
                                    inputProps={{ "aria-label": "Language in which the Web Series was originally released" }}
                                >

                                    <MenuItem key="0" value="">Language in which the Web Series was originally released</MenuItem>

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

                        </Box>

                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div>
                            <h6>Whether the series is subtitled in English</h6>
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
                                    checked={formData.is_subtitle_language_eng === 0 || formData.is_subtitle_language_eng === "0"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="is_subtitle_language_eng_no">No</label>
                            </div>
                            {errors.is_subtitle_language_eng && (
                                <p className="text-danger">{errors.is_subtitle_language_eng}</p>
                            )}
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div>
                            <div>
                                <div className="input_field">
                                    <FormControl
                                    fullWidth
                                        // sx={{
                                        //     width: "100%",
                                        //     borderRadius: "5px",
                                        // }}
                                    >
                                         <InputLabel id="demo-simple-select-label">Other languages in which subtitles are available(if any)</InputLabel>
                                        <Select
                                            name="subtitle_other_language"
                                          
                                            value={formData.subtitle_other_language || ''}
                                            onChange={handleChange}
                                            label="Other languages in which subtitles are available(if any)"
                                            // inputProps={{ "aria-label": "Language of the Film" }}
                                        >
                                            <MenuItem key="0" value="">Other languages in which subtitles are available(if any)</MenuItem>
                                            {Object.entries(subtitlelanguage).map(([key, value]) => (
                                                <MenuItem key={key} value={key}>
                                                    {value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {errors.subtitle_other_language && (
                                        <p className="text-danger">{errors.subtitle_other_language}</p>
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