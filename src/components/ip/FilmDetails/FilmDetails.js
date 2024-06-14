import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./FilmDetailsData.css"
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
// import {getRequestGlobal } from "../../../API/global"
import { getRequestGlobal } from "../../../API/global"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const FilmDetails = ({ formData, setFormData, errors, setFilmErrors }) => {

  const [onDcpEnabled, setOnDcpEnabled] = React.useState(formData.dcp);
  const [featureFilm, setFeatureFilm] = useState(false)

  const [open, setOpen] = React.useState(false);
  const [openBlueray, setOpenBlueray] = React.useState(false);
  const [openUnencrypted, setOpenUnencryptedOpen] = React.useState(false);


  // const [formData, setFormData] = React.useState({
  //   whether_subtitle_english: "Yes",
  //   language_of_film: "",
  // });

  const [featureData, setFeatureData] = useState(1);

  // const handleFeatureChange = (value) => {
  //   setFeatureData(value)
  //   setFormData({
  //     ...formData,
  //     category: value
  //   });
  // };

  // const handleFeatureChange = (e) => {
  //   const { value } = e.target;
  //   setFeatureData(value)
  //   setFormData({
  //     ...formData,
  //     category: value
  //   });
  //   setFormData({
  //     ...formData,
  //     [category]: parseInt(value),
  //   });
  //   errors[name] = ""
  //   setFilmErrors(errors);
  // };



  const handleFeatureChange = (value) => {
    setFeatureData(value);
    setFormData({
      ...formData,
      category: parseInt(value),
    });
    // Clear the validation message for the category field
    setFilmErrors({
      ...errors,
      category: "", // Assuming 'category' is the key for the error message
    });
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    errors[name] = ""
    setFilmErrors(errors);

    // If "No" is selected, show the modal

    if (name === "whether_subtitle_english" && value === "No") {
      setOpen(true);


    }
    // if (name === "whether_subtitle_english") {
    //   setOpen(true);
    // }

    if (name === "blueray_free_pal" && value === "No") {
      setOpenBlueray(true);
    }

    if (name === "is_dcp_unencrypted" && value === "No") {
      setOpenUnencryptedOpen(true);
    }
  };

  const handleEnglishSubtitleChange = (e) => {
    const { name, value } = e.target;

    if (value === 0 || value === '0') {
      setOpen(true);
      setFormData({
        ...formData,
        [name]: null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: parseInt(value),
      });
      errors[name] = ""
      setFilmErrors(errors);
    }

  };

  const handleBluerayChange = (e) => {
    const { name, value } = e.target;

    if(value === 0 || value === "0"){
      setOpenBlueray(true);
      setFormData({
        ...formData,
        [name]: null,
      })
    }else{
      setFormData({
        ...formData,
        [name]: parseInt(value),
      });
      errors[name] = ""
      setFilmErrors(errors);
    }
  }

  const handleDcpUnencryptedChange = (e) => {
    const { name, value } = e.target;

    if (value === 0 || value === '0'){
      setOpenUnencryptedOpen(true);
      setFormData({
        ...formData,
        [name]: null,
      })
    } else{

      setFormData({
        ...formData,
        [name]: parseInt(value),
      })
      errors[name] = ""
      setFilmErrors(errors);
    }
   

  }

  const handleDcpBlueray = true;
  const handleDcpBluerayChange = (e) => {
    const { name, value } = e.target;
    console.log(value, "value");
    setOnDcpEnabled(value)

    setFormData({
      ...formData,
      [name]: parseInt(value),
    });
    errors[name] = ""
    setFilmErrors(errors);
  }

  const handleDcpBluerayPendriveChange = (e) => {
    const { name, value } = e.target;
    if (value == 1) {
      setOnDcpEnabled(1)
    }
    setFormData({
      ...formData,
      [name]: parseInt(value),
    });
  }



  const handleClickBluerayOpen = () => {
    setOpenBlueray(true);
  };

  const handleClickUnencryptedOpen = () => {
    setOpenUnencryptedOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseBlueray = () => {
    setOpenBlueray(false)
  }

  const handleUnencryptedClose = () => {
    setOpenUnencryptedOpen(false)
  }



  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prevData => ({
  //     ...prevData,
  //     [name]: value
  //   }));
  // };
  const [dci_compliant_jpeg_2000, setCheckeddci_compliant_jpeg_2000] = useState(formData?.dci_compliant_jpeg_2000 ?? null);
  const [dcp_should_cru_hard_disk, setCheckeddcp_should_cru_hard_disk] = useState(formData?.dcp_should_cru_hard_disk ?? null);
  const [subtitle_to_be_burned_in_picture, setCheckedsubtitle_to_be_burned_in_picture] = useState(formData?.subtitle_to_be_burned_in_picture ?? null);
  // const [hard_disk_partition_format, setCheckedhard_disk_partition_format] = useState(false);
  const [hard_disk_format_ext2_ext3, setHard_disk_format_ext2_ext3] = useState(formData?.hard_disk_format_ext2_ext3 ?? null);

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


  const handleChangeCheckbox = (event) => {
    console.log({ "checkstatus": event.target.checked })

    const { name, value } = event.target;
    if (name == 'dci_compliant_jpeg_2000') {
      setCheckeddci_compliant_jpeg_2000(event.target.checked);
    }
    else if (name == 'subtitle_to_be_burned_in_picture') {
      setCheckedsubtitle_to_be_burned_in_picture(event.target.checked);
    }
    else if (name == 'dcp_should_cru_hard_disk') {
      setCheckeddcp_should_cru_hard_disk(event.target.checked);
    }
    else if (name == 'hard_disk_format_ext2_ext3') {
      setHard_disk_format_ext2_ext3(event.target.checked);
    }


    const manupulateValue = event.target.checked ? 1 : 0
    setFormData({
      ...formData,
      [name]: manupulateValue
    });
    errors[name] = ""
    setFilmErrors(errors);
  };
  const language_id = formData.language_id ?? '';

  //   const handleFeatureChange = (category) => {
  //     setFormData({
  //         ...formData,
  //         category: category === 1 ? "featured" : "non-featured",
  //     });
  // };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Process form data
    console.log("Form data submitted:", formData);
  };


  return (
    <>

      <h4>
        Category of the film<span className="text-danger">*</span>
      </h4>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="category"
          id="category_yes"
          value="1"
          checked={formData.category == 1}
          onClick={() => handleFeatureChange(1)}
        />
        <label className="form-check-label" htmlFor="category_yes">
          Featured film
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="category"
          id="category_no"
          value="2"
          checked={formData.category == 2}
          onClick={() => handleFeatureChange(2)}
        />
        <label className="form-check-label" htmlFor="category_no">
          Non-featured film
        </label>
      </div>
      {errors.category && (
        <p className="text-danger">{errors.category}</p>
      )
      }


      <form autoComplete="off">
        <div className="row mt-3">
          <h5>Title of the film <span className="text-danger">*</span></h5>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} >
            <Box>
              <TextField
                label="Title of the film in Roman Script"
                type="text"
                fullWidth
                className="input_border"
                name="title_of_film_in_roman"
                value={formData.title_of_film_in_roman}
                onChange={handleChange}
              />
            </Box>
            {errors.title_of_film_in_roman && (
              <p className="text-danger">{errors.title_of_film_in_roman}</p>
            )}

          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                type="text"
                fullWidth
                label="Title of the Film in Devanagari script"
                className="input_border"
                name="title_of_film_in_devanagari"
                value={formData.title_of_film_in_devanagari}
                onChange={handleChange}
              />
              {errors.title_of_film_in_devanagari && (
                <p className="text-danger">{errors.title_of_film_in_devanagari}</p>
              )}

            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                type="text"
                fullWidth
                placeholder="English translation of the Film title"
                label="English translation of the Film title"

                className="input_border"
                name="english_translation_of_film"
                value={formData.english_translation_of_film}
                onChange={handleChange}
              />
            </Box>
            {errors.english_translation_of_film && (
              <p className="text-danger">{errors.english_translation_of_film}</p>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                type="text"
                fullWidth
                label="Title of the Film in the script of the language of the Film"
                className="input_border"
                name="title_of_script_langauge"
                value={formData.title_of_script_langauge}
                onChange={handleChange}
              />
            </Box>
            {errors.title_of_script_langauge && (
              <p className="text-danger">{errors.title_of_script_langauge}</p>
            )
            }
          </Grid>
        </Grid>


        <div className="row mt-3">
          <h5>Language of the film <span className="text-danger">*</span></h5>
          <div className="col-sm-12 col-lg-6 mt-4">
            <div className="input_field">
              <FormControl
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                }}
              >
                <Select
                  name="language_id"
                  displayEmpty
                  value={formData.language_id || ''}
                  // value={formData.language_id}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "Language of the Film" }}
                >
                  <MenuItem key="0" value="">Language of the Film</MenuItem>
                  {/* <MenuItem value={1}>Hindi</MenuItem>
                      <MenuItem value={2}>English</MenuItem> */}
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


          <div className="col-sm-12 col-lg-6 mt-4">

            {(formData.language_id == 5) ? <></> : <>  <React.Fragment>
              <div>
                <h6>Whether subtitled in English language</h6>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="whether_subtitle_english"
                    id="whether_subtitle_english_yes"
                    value="1"
                    checked={formData.whether_subtitle_english == 1}
                    onChange={handleEnglishSubtitleChange}
                  />
                  <label htmlFor="whether_subtitle_english_yes">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="whether_subtitle_english"
                    id="whether_subtitle_english_no"
                    value="0"
                    checked={formData.whether_subtitle_english === 0 || formData.whether_subtitle_english === '0'}
                    onChange={handleEnglishSubtitleChange}

                  />
                  <label htmlFor="whether_subtitle_english_no">No</label>
                </div>
                {errors.whether_subtitle_english && (
                  <p className="text-danger">{errors.whether_subtitle_english}</p>
                )}
              </div>

              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <DialogContent dividers>
                  <Typography gutterBottom>
                    Films other than English language must carry English subtitles.
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    Ok
                  </Button>
                </DialogActions>
              </BootstrapDialog>
            </React.Fragment></>}

          </div>

        </div>

        {formData.category == 1 || formData.category == 2  ?
        <> 
        <div className="row">
          <h5 className="mt-3">Format of the submitted Film<span className="text-danger">*</span></h5>
          <div className="col-sm-12 col-lg-6 mt-4">

            {(featureData == 2 ? <h6>Non Feature Film<span className="text-danger">*</span></h6> : <h6>Feature Film</h6>)}
            {/* <h6>Feature Film<span className="text-danger">*</span></h6> */}
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="dcp"
                id="dcp_yes"
                value={1}
                // value={formData.dcp == 1 ? 1 : ''}
                // checked={formData.dcp ? formData.dcp == 1 : ''}
                checked={formData.dcp == 1}
                onChange={handleDcpBluerayChange}
              />
              <label className="form-check-label" htmlFor="dcp_yes">
                DCP
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="dcp"
                id="dcp_no"
                // value={formData.blueray ? 1 : ''}
                // checked={formData.blueray ? formData.blueray == 1 : ''}
                value={2}
                checked={formData.dcp == 2}
                // checked={formData.blueray ? 1 : ''}
                onChange={handleDcpBluerayChange}
              />
              <label className="form-check-label" htmlFor="dcp_no">
                Blueray
              </label>
            </div>

            {(featureData == 2) ?
              <> <div className="form-check form-check-inline">

                <input
                  className="form-check-input"
                  type="radio"
                  name="dcp"
                  id="dcp_no"
                  // value={formData.blueray ? 1 : ''}
                  // checked={formData.blueray ? formData.blueray == 1 : ''}
                  value={3}
                  checked={formData.dcp == 3}
                  // checked={formData.blueray ? 1 : ''}
                  onChange={handleDcpBluerayChange}
                />
                <label className="form-check-label" htmlFor="dcp_no">
                  Pendrive
                </label>
              </div></> : ""}
            {errors.dcp && (
              <p className="text-danger">{errors.dcp}</p>
            )}
          </div>
          {
            (formData.dcp == 1) ?
              <>
                <div className="col-sm-12 col-lg-6 mt-4" id="dcpOptions">
                  <React.Fragment>
                    <div>
                      <h6>Is the DCP Unencrypted?</h6>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="is_dcp_unencrypted"
                          id="is_dcp_unencrypted_yes"
                          value="1"
                          checked={formData.is_dcp_unencrypted == 1}
                          onChange={handleDcpUnencryptedChange}
                        />
                        <label className="form-check-label" htmlFor="is_dcp_unencrypted_yes">
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="is_dcp_unencrypted"
                          id="is_dcp_unencrypted_no"
                          value="0"
                          checked={formData.is_dcp_unencrypted === 0 || formData.is_dcp_unencrypted === '0'}
                          onChange={handleDcpUnencryptedChange}
                          // onClick={handleClickUnencryptedOpen}
                        />
                        <label className="form-check-label" htmlFor="is_dcp_unencrypted_no">
                          No
                        </label>
                      </div>
                      {errors.is_dcp_unencrypted && (
                        <p className="text-danger">{errors.is_dcp_unencrypted}</p>
                      )}
                    </div>
                    <BootstrapDialog
                      onClose={handleUnencryptedClose}
                      aria-labelledby="customized-dialog-title"
                      open={openUnencrypted}
                    >
                      <DialogContent dividers>
                        <Typography gutterBottom>
                          Encrypted DCP is not acceptable.
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleUnencryptedClose}>
                          Ok
                        </Button>
                      </DialogActions>
                    </BootstrapDialog>
                  </React.Fragment>
                </div>
                <div className="row mt-4" id="dcpOptions" >
                  <div className="col-sm-12 col-lg-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="dci_compliant_jpeg_2000"
                        name="dci_compliant_jpeg_2000"
                        onChange={handleChangeCheckbox}
                        checked={formData.dci_compliant_jpeg_2000 == 1}
                      />
                      <label className="form-check-label" htmlFor="dci_compliant_jpeg_2000">
                        DCI Compliant JPEG2000 (J2K) Interop or SMPTE DCP (Note: J2K Interop DCP to be only in 24 fps) <span className="text-danger">*</span>
                      </label>
                    </div>
                    {errors.dci_compliant_jpeg_2000 && (
                      <p className="text-danger">{errors.dci_compliant_jpeg_2000}</p>
                    )}

                  </div>
                  <div className="col-sm-12 col-lg-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="subtitle_to_be_burned_in_picture"
                        name="subtitle_to_be_burned_in_picture"
                        onChange={handleChangeCheckbox}
                        checked={formData.subtitle_to_be_burned_in_picture == 1}
                      />
                      <label className="form-check-label" htmlFor="subtitle_to_be_burned_in_picture">
                        The subtitles to be burned in the picture or in TI CineCanvas™ Format <span className="text-danger">*</span>
                      </label>
                    </div>
                    {errors.subtitle_to_be_burned_in_picture && (
                      <p className="text-danger">{errors.subtitle_to_be_burned_in_picture}</p>
                    )}

                  </div>
                  <div className="col-sm-12 col-lg-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="dcp_should_cru_hard_disk"
                        name="dcp_should_cru_hard_disk"
                        onChange={handleChangeCheckbox}
                        checked={formData.dcp_should_cru_hard_disk == 1}
                      />
                      <label className="form-check-label" htmlFor="dcp_should_cru_hard_disk">
                        The DCP should be preferably sent in CRU Hard Disk <span className="text-danger">*</span>
                      </label>
                    </div>
                    {errors.dcp_should_cru_hard_disk && (
                      <p className="text-danger">{errors.dcp_should_cru_hard_disk}</p>
                    )}

                  </div>
                  <div className="col-sm-12 col-lg-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="hard_disk_format_ext2_ext3"
                        name="hard_disk_format_ext2_ext3"
                        onChange={handleChangeCheckbox}
                        checked={formData.hard_disk_format_ext2_ext3 == 1}
                      />
                      <label className="form-check-label" htmlFor="hard_disk_format_ext2_ext3">
                        The Hard Disk partition format shall be NTFS or EXT2/EXT3 (with Inode size 128 bytes)
                      </label>
                    </div>
                    {errors.hard_disk_format_ext2_ext3 && (
                      <p className="text-danger">{errors.hard_disk_format_ext2_ext3}</p>
                    )}
                  </div>
                </div>
              </>

              : ((formData.dcp == 2) ?
                <div className="col-sm-12 col-lg-6 mt-4" id="bluerayOptions">
                  <React.Fragment>
                    <div>
                      <h6>Is the Blueray region free PAL?</h6>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="blueray_region_free_pal"
                          id="blueray_region_free_pal_yes"
                          value="1"
                          checked={formData.blueray_region_free_pal == 1}
                          onChange={handleBluerayChange}
                        />
                        <label className="form-check-label" htmlFor="blueray_region_free_pal_yes">
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="blueray_region_free_pal"
                          id="blueray_region_free_pal_no"
                          value="0"
                          checked={formData.blueray_region_free_pal === 0 || formData.blueray_region_free_pal === '0'}
                          onChange={handleBluerayChange}
                          // onClick={handleClickBluerayOpen}
                        />
                        <label className="form-check-label" htmlFor="blueray_region_free_pal_no">
                          No
                        </label>
                      </div>
                      {errors.blueray_region_free_pal && (
                        <p className="text-danger">{errors.blueray_region_free_pal}</p>
                      )}
                    </div>
                    <BootstrapDialog
                      onClose={handleCloseBlueray}
                      aria-labelledby="customized-dialog-title"
                      open={openBlueray}
                    >
                      <DialogContent dividers>
                        <Typography gutterBottom>
                          Only region free PAL blueray is eligible
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleCloseBlueray}>
                          Ok
                        </Button>
                      </DialogActions>
                    </BootstrapDialog>
                  </React.Fragment>
                </div> : ((onDcpEnabled == 3) ? <div className="col-sm-12 col-lg-6 mt-4" id="bluerayOptions">
                  <React.Fragment>
                    <div>
                      <h6>Is the Pendrive containing HD Files in MP4/ MOV format; Aspect ratio- 1920x1080 HD; Video codec- H.264?</h6>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="is_pendrive_containing_hd_files"
                          id="is_pendrive_containing_hd_files_yes"
                          value="1"
                          checked={formData.is_pendrive_containing_hd_files == 1}
                          onChange={handleBluerayChange}
                        />
                        <label className="form-check-label" htmlFor="is_pendrive_containing_hd_files_yes">
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="is_pendrive_containing_hd_files"
                          id="is_pendrive_containing_hd_files_no"
                          value="0"
                          checked={formData.is_pendrive_containing_hd_files === 0 || formData.is_pendrive_containing_hd_files == '0'}
                          onChange={handleBluerayChange}
                          onClick={handleClickBluerayOpen}
                        />
                        <label className="form-check-label" htmlFor="is_pendrive_containing_hd_files_no">
                          No
                        </label>
                      </div>
                      {errors.is_pendrive_containing_hd_files && (
                        <p className="text-danger">{errors.is_pendrive_containing_hd_files}</p>
                      )}
                    </div>
                    <BootstrapDialog
                      onClose={handleCloseBlueray}
                      aria-labelledby="customized-dialog-title"
                      open={openBlueray}
                    >
                      <DialogContent dividers>
                        <Typography gutterBottom>
                          Only Pendrive containing HD Files in MP4/ MOV format; Aspect ratio- 1920x1080 HD; Video codec- H.264 formats are acceptable.
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleCloseBlueray}>
                          Ok
                        </Button>
                      </DialogActions>
                    </BootstrapDialog>
                  </React.Fragment>
                </div> : ''))
          }
        </div>
        {(featureData == 2 ? <h6 className="mt-3">Value of the DCP/Bluray/Pendrive</h6> : <h6 className="mt-3"> Value of the DCP/Bluray</h6>)}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <TextField
                type="text"
                fullWidth
                placeholder="Value"
                label="Value"
                className="input_border"
                name="value_of_dcp_or_blueray"
                value={formData.value_of_dcp_or_blueray}
                onChange={handleChange}
              />
            </Box>
            {errors.value_of_dcp_or_blueray && (
              <p className="text-danger">{errors.value_of_dcp_or_blueray}</p>
            )}
          </Grid>
        </Grid>
        </> 
        : 
        <></>
        }

      </form>

    </>
  );
};

export default FilmDetails;
