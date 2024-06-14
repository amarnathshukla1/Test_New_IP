// import React, { useState } from 'react'
import React, { useEffect } from 'react';
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const CrewDetails = ({ formData, setFormData, errors, setCrewErrors }) => {


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    errors[name] = ""
    setCrewErrors(errors);
  };

  useEffect(() => {
    // Function to fetch data from backend
    const fetchData = async () => {
        try {
            // Simulate fetching data from the backend
            const backendData = {
              costume_designer: "null", // Example data from backend
              sound_re_recordist: "null",
              principal_cast: "null",
              no_of_dcp_blueray:"null"
            };

            console.log('Raw backend data:', backendData); // Log raw data

                 // Helper function to replace null or "null" or undefined with an empty string
                 const replaceNull = (value) => {
                  console.log('Checking value:', value); // Log the value being checked
                  return (value === null || value === "null" || value === undefined || value === "undefined"  ? '' : value);
              };
              
            // Processed data
            const processedData = {
              costume_designer: replaceNull(backendData.costume_designer),
              sound_re_recordist: replaceNull(backendData.sound_re_recordist),
              principal_cast: replaceNull(backendData.principal_cast),
              no_of_dcp_blueray: replaceNull(backendData.no_of_dcp_blueray),
            };

            console.log('Processed data:', processedData); // Log processed data

            // Update form data with fetched data
            setFormData(prevData => ({
                ...prevData,
                ...processedData,
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error as needed (e.g., show a notification to the user)
        }
    };

    fetchData();
}, [setFormData]);

  return (
    <>
      <h4 className="text-capitalize">Crew Details<span className="text-danger">*</span>:-</h4>
      <form>
       
        <Grid container spacing={2} className='mt-4'>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                fullWidth
                label='Story writer/ Author'
                // InputProps={{
                //   style: {
                //     border: "1px solid #CF528A",
                //     borderRadius: "5px",
                //   },
                // }}
                className="input_border"
                name="story_write_aurthor"
                value={formData.story_write_aurthor}
                onChange={handleChange}
              />
              {errors.story_write_aurthor && (
                <p className="text-danger">{errors.story_write_aurthor}</p>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                fullWidth
                label='Screenplay/ Script writer'
                // InputProps={{
                //   style: {
                //     border: "1px solid #CF528A",
                //     borderRadius: "5px",
                //   },
                // }}
                className="input_border"
                name="screenplay_script_write"
                value={formData.screenplay_script_write}
                onChange={handleChange}
              />
              {errors.screenplay_script_write && (
                <p className="text-danger">{errors.screenplay_script_write}</p>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                fullWidth
                label='Director of photography'
                // InputProps={{
                //   style: {
                //     border: "1px solid #CF528A",
                //     borderRadius: "5px",
                //   },
                // }}

                className="input_border"
                name="director_of_photography"
                value={formData.director_of_photography}
                onChange={handleChange}
              />
              {errors.director_of_photography && (
                <p className="text-danger">{errors.director_of_photography}</p>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                fullWidth
                label='Editor'
                // InputProps={{
                //   style: {
                //     border: "1px solid #CF528A",
                //     borderRadius: "5px",
                //   },
                // }}

                className="input_border"
                name="editor"
                value={formData.editor}
                onChange={handleChange}
              />
              {errors.editor && (
                <p className="text-danger">{errors.editor}</p>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                fullWidth
                label='Art Director'
                // InputProps={{
                //   style: {
                //     border: "1px solid #CF528A",
                //     borderRadius: "5px",
                //   },
                // }}

                className="input_border"
                name="art_director"
                value={formData.art_director}
                onChange={handleChange}
              />
              {errors.art_director && (
                <p className="text-danger">{errors.art_director}</p>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                fullWidth
                label='Costume Designer (Optional)'
                // InputProps={{
                //   style: {
                //     border: "1px solid #CF528A",
                //     borderRadius: "5px",
                //   },
                // }}
                className="input_border"
                name="costume_designer"
                // value={formData.costume_designer}
                value={formData.costume_designer}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              fullWidth
              label='Music Director'
              // InputProps={{
              //   style: {
              //     border: "1px solid #CF528A",
              //     borderRadius: "5px",
              //   },
              // }}

              className="input_border"
              name="music_director"
              value={formData.music_director}
              onChange={handleChange}
            />
            {errors.music_director && (
              <p className="text-danger">{errors.music_director}</p>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                fullWidth
                label='(A) Sound Recordist'
                // InputProps={{
                //   style: {
                //     border: "1px solid #CF528A",
                //     borderRadius: "5px",
                //   },
                // }}

                className="input_border"
                name="sound_recordist"
                value={formData.sound_recordist}
                onChange={handleChange}
              />
              {errors.sound_recordist && (
                <p className="text-danger">{errors.sound_recordist}</p>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                fullWidth
                label='(B) Sound Re-recordist (Optional)'
                // InputProps={{
                //   style: {
                //     border: "1px solid #CF528A",
                //     borderRadius: "5px",
                //   },
                // }}

                className="input_border"
                name="sound_re_recordist"
                // value={formData.sound_re_recordist}
                value={formData.sound_re_recordist}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                fullWidth
                label='Principal Cast (Optional)'
                // InputProps={{
                //   style: {
                //     border: "1px solid #CF528A",
                //     borderRadius: "5px",
                //   },
                // }}

                className="input_border"
                name="principal_cast"
                // value={formData.principal_cast}
                value={formData.principal_cast}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                fullWidth
                label='Duration/Running time (in minutes)'
                // InputProps={{
                //   style: {
                //     border: "1px solid #CF528A",
                //     borderRadius: "5px",
                //   },
                // }}

                className="input_border"
                name="duration_running_time"
                value={formData.duration_running_time}
                onChange={handleChange}
              />
              {errors.duration_running_time && (
                <p className="text-danger">{errors.duration_running_time}</p>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                fullWidth
                label='No. of DCP/Bluray (Optional)'
                // InputProps={{
                //   style: {
                //     border: "1px solid #CF528A",
                //     borderRadius: "5px",
                //   },
                // }}
type='number'
                className="input_border"
                name="no_of_dcp_blueray"
                // value={formData.no_of_dcp_blueray}
                value={formData.no_of_dcp_blueray}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
            <h6>Colour or B&W</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="color_b_w"
                id="color_b_w"
                value="Colour"
                checked={formData.color_b_w == "Colour"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="sound_system_Colour">
              Colour
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="color_b_w"
                id="color_b_w"
                value="B&W"
                checked={formData.color_b_w == "B&W"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="sound_system_B&W">
              B&W
              </label>
            </div>
            {errors.color_b_w && (
              <p className="text-danger">{errors.color_b_w}</p>
            )}
            </Box>
          </Grid>
      
        </Grid>

        <Grid container className='mt-4'>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <h6>Sound System</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="sound_system"
                id="sound_system"
                value="Optical Mono"
                checked={formData.sound_system == "Optical Mono"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="sound_system_optical">
              Optical Mono
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="sound_system"
                id="sound_system"
                value="Dolby"
                checked={formData.sound_system == "Dolby"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="sound_system_dolby">
              Dolby
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="sound_system"
                id="sound_system"
                value="DTS"
                checked={formData.sound_system == "DTS"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="sound_system_DTS">
              DTS
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="sound_system"
                id="sound_system"
                value="Atmos"
                checked={formData.sound_system == "Atmos"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="sound_system_Atmos">
              Atmos
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="sound_system"
                id="sound_system"
                value="Others"
                checked={formData.sound_system == "Others"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="sound_system_Others">
              Others
              </label>
            </div>
            {errors.sound_system && (
              <p className="text-danger">{errors.sound_system}</p>
            )}
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <h6>Aspect Ratio</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="aspect_ratio"
                id="aspect_ratio_yes"
                value="16:9"
                checked={formData.aspect_ratio == "16:9"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="aspect_ratio_yes">
                16:9
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="aspect_ratio"
                id="aspect_ratio_no"
                value="4.3"
                checked={formData.aspect_ratio == "4.3"}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="aspect_ratio_no">
                4:3
              </label>
            </div>
            {errors.aspect_ratio && (
              <p className="text-danger">{errors.aspect_ratio}</p>
            )}
          </Grid>
        </Grid>

      </form>
    </>
  )
}

export default CrewDetails
