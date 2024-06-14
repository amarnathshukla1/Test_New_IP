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
    // Fetch data from backend and ensure that null values are converted to empty strings
    const fetchData = async () => {
      const backendData = {
        costume_designer: null, // Example data from backend
        sound_re_recordist: null,
        principal_cast: null,
        no_of_dcp_blueray: null
      };

      setFormData(prevData => ({
        ...prevData,
        costume_designer: backendData.costume_designer ?? '',
        sound_re_recordist: backendData.sound_re_recordist ?? '',
        principal_cast: backendData.principal_cast ?? '',
        no_of_dcp_blueray: backendData.no_of_dcp_blueray ?? ''
      }));
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
                value={formData.costume_designer ?? ''}
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
                value={formData.sound_re_recordist ?? ''}
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
                value={formData.principal_cast ?? ''}
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

                className="input_border"
                name="no_of_dcp_blueray"
                // value={formData.no_of_dcp_blueray}
                value={formData.no_of_dcp_blueray ?? ''}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                fullWidth
                label='Colour or B&W'
                // InputProps={{
                //   style: {
                //     border: "1px solid #CF528A",
                //     borderRadius: "5px",
                //   },
                // }}
                className="input_border"
                name="color_b_w"
                value={formData.color_b_w}
                onChange={handleChange}
              />
              {errors.color_b_w && (
                <p className="text-danger">{errors.color_b_w}</p>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                fullWidth
                label='Sound System: Optical Mono /Dolby/ DTS/Atmos or others'
                // InputProps={{
                //   style: {
                //     border: "1px solid #CF528A",
                //     borderRadius: "5px",
                //   },
                // }}
                className="input_border"
                name="sound_system"
                value={formData.sound_system}
                onChange={handleChange}
              />
              {errors.sound_system && (
                <p className="text-danger">{errors.sound_system}</p>
              )}
            </Box>
          </Grid>
        </Grid>

        <Grid container className='mt-4'>
          <Grid item xs={12} sm={12} md={6} lg={6}>
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
