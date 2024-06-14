import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import RemoveIcon from "../../../images/remove.png"
import PlusIcon from "../../../images/plus_icon.png"
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { GLOBAL_URL } from '../../../API/global';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Documents = ({ formData, setFormData, setDocumentErrors }) => {


    const handleChange = (e) => {
      const { name, value } = e.target;
      const newValue = value.replace(/\D/g, '').slice(0, 10); // Ensure numeric input
  
      // Prepare an updated form data object
      let updatedFormData = {};
  
      if (name === "requisite_documents" && (value === 0 || value === "0")) {
          setOpen(true);
          updatedFormData[name] = null;
      } else {
              updatedFormData[name] = newValue;
          }
  
          // If the field is supposed to be an integer, parse it
          if (["some_integer_field_name_1", "some_integer_field_name_2"].includes(name)) {
              updatedFormData[name] = parseInt(value, 10);
          }

          setFormData(prevData => ({
            ...prevData,
            ...updatedFormData,
        }));
    
        // Clear the errors for the current field
        errors[name] = "";
        setDocumentErrors(errors);
    };
   

    const [selectedAttachCopyFile, setSelectedAttachCopyFile] = useState(null);
    
    const [selectedDeclarationLetterFile, setSelectedDeclarationLetterFile] = useState(null);
   
    const [selectedSynopsisCopyFile, setSelectedSynopsisCopyFile] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [errors, setErrors] = useState({});
    const [selectedDirectorFile, setSelectedDirectorFile] = useState(null);
    const [selectedProducerFile, setSelectedProducerFile] = useState(null);
    const [selectedDetailsCastCrewFile, setSelectedDetailsCastCrewFile] = useState(null);

    const [openRequisiteDocumentsopen, setOpenRequisiteDocumentsopen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [showAuthorisationRemoveButton, setShowAuthorisationRemoveButton] = useState(false);
    const [showDeclarationRemoveButton, setShowDeclarationRemoveButton] = useState(false);
    const [showSynopsisRemoveButton, setShowSynopsisRemoveButton] = useState(false);
    const [showDirectorProfileRemoveButton, setShowDirectorProfileRemoveButton] = useState(false);
    const [showProducerProfileRemoveButton, setShowProducerProfileRemoveButton] = useState(false);
    const [showCastAndCrewRemoveButton, setShowCastAndCrewRemoveButton] = useState(false)


    const handleFileAttachCopyChange = (event) => {
      const file = event.target.files[0];
      let newErrors = { ...errors }; // Copy the existing errors
  
      if (file) {
          if (file.type !== 'application/pdf') {
              newErrors.authorization_latter = 'Please upload a PDF file.';
              setSelectedAttachCopyFile(null);
              setFormData((prevState) => ({
                  ...prevState,
                  authorization_latter: null,
                  is_authorization_latter: 0,
              }));
          } else {
              // Clear all errors when a valid PDF is uploaded
              newErrors.authorization_latter = null; // Clear all errors
              setSelectedAttachCopyFile(file);
              setFormData((prevState) => ({
                  ...prevState,
                  authorization_latter: file,
                  is_authorization_latter: 1,
              }));
          }
      }
  
      // Ensure both formErrors and errors are updated
      setFormErrors(newErrors);
      setErrors(newErrors); // Ensure the global errors state is updated as well
  };
  
    const handleDeclarationLetter = (event) => {
        const filedeclaration = event.target.files[0];
    
        let newErrors = { ...errors }; // Copy the existing errors
    
        if (filedeclaration) {
          if (filedeclaration.type !== 'application/pdf') {
            newErrors.declaration_latter = 'Please upload a PDF file.';
            setSelectedDeclarationLetterFile(null);
            setFormData((prevState) => ({
              ...prevState,
              declaration_latter: null,
              is_declaration_latter: 0,
            }));
          } else {
            // Clear all errors when a valid PDF is uploaded
            newErrors.declaration_latter = null; // Clear all errors
            setSelectedDeclarationLetterFile(filedeclaration);
            setFormData((prevState) => ({
              ...prevState,
              declaration_latter: filedeclaration,
              is_declaration_latter: 1,
            }));
          }
        }
    
        setFormErrors(newErrors);
    };


    const handleSynopsisCopyChange = (event) => {
        const fileSynopsis = event.target.files[0];
        let newErrors = { ...errors }; // Copy the existing errors
    
        if (fileSynopsis) {
          if (fileSynopsis.type !== 'application/pdf') {
            newErrors.synopsis_in_english = 'Please upload a PDF file.';
            setSelectedSynopsisCopyFile(null);
            setShowSynopsisRemoveButton(false);
            setFormData((prevState) => ({
              ...prevState,
              synopsis_in_english: null,
              is_synopsis_in_english: 0,
            }));
          } else {
            // Clear all errors when a valid PDF is uploaded
            newErrors.synopsis_in_english = null; // Clear all errors
            setSelectedSynopsisCopyFile(fileSynopsis);
            setShowSynopsisRemoveButton(true);
            setFormData((prevState) => ({
              ...prevState,
              synopsis_in_english: fileSynopsis,
              is_synopsis_in_english: 1,
            }));
          }
        }
    
        setFormErrors(newErrors);
      };

      const handleDirectorFileChange = (event) => {
        const fileDirector = event.target.files[0];
        let newErrors = { ...errors };
    
        if (fileDirector) {
          if (fileDirector.type !== 'application/pdf') {
            newErrors.directors_profile = 'Please upload a PDF file.';
            setSelectedDirectorFile(null);
            setShowDirectorProfileRemoveButton(false);
            setFormData((prevState) => ({
              ...prevState,
              directors_profile: null,
              is_directors_profile: 0,
            }));
          } else {
            newErrors.directors_profile  = null;
            setSelectedDirectorFile(fileDirector);
            setShowDirectorProfileRemoveButton(true);
            setFormData((prevState) => ({
              ...prevState,
              directors_profile: fileDirector,
              is_directors_profile: 1,
            }));
          }
        }
    
        setFormErrors(newErrors);
      };

      const handleProducerFileChange = (event) => {
        const fileProducer = event.target.files[0];
        let newErrors = { ...errors };
    
        if (fileProducer) {
          if (fileProducer.type !== 'application/pdf') {
            newErrors.producers_profile = 'Please upload a PDF file.';
            setSelectedProducerFile(null);
            setFormData((prevState) => ({
              ...prevState,
              producers_profile: null,
              is_producers_profile: 0,
            }));
          } else {
            newErrors.producers_profile  = null;
            setSelectedProducerFile(fileProducer);
            setFormData((prevState) => ({
              ...prevState,
              producers_profile: fileProducer,
              is_producers_profile: 1,
            }));
          }
        }
    
        setFormErrors(newErrors);
      };
    
      const handleselectedDetailsCastCrewFile = (event) => {
        const fileDetailsCastCrew = event.target.files[0];
        let newErrors = { ...errors };
    
        if (fileDetailsCastCrew) {
          if (fileDetailsCastCrew.type !== 'application/pdf') {
            newErrors.details_of_cast_crew = 'Please upload a PDF file.';
            setSelectedDetailsCastCrewFile(null);
            setFormData((prevState) => ({
              ...prevState,
              details_of_cast_crew: null,
              is_details_of_cast_crew: 0,
            }));
          } else {
            newErrors.details_of_cast_crew  = null;
            setSelectedDetailsCastCrewFile(fileDetailsCastCrew);
            setFormData((prevState) => ({
              ...prevState,
              details_of_cast_crew: fileDetailsCastCrew,
              is_details_of_cast_crew: 1,
            }));
          }
        }
    
        setFormErrors(newErrors);
      };



      const handleClose = () => {
        setOpen(false);
      };

    const handleRequisiteDocumentsClickOpen = () => {
        setOpenRequisiteDocumentsopen(true);
    };

    const handleAuthorisationAttachClick = () => {
        setShowAuthorisationRemoveButton(true);
        // document.getElementById('fileInput').click();
    };


    const handleAuthorisationRemoveClick = () => {
        setSelectedAttachCopyFile();
        // setSelectedAttachCopyFile(null);
        setShowAuthorisationRemoveButton(false);
        // You may also want to clear the selected file here if needed
    };

    const handleDeclarationLetterAttachClick = () => {
        setShowDeclarationRemoveButton(true)
    }

    const handleDeclarationLetterRemoveClick = () => {
        // setSelectedDeclarationLetterFile(null)
        setSelectedDeclarationLetterFile()
        setShowDeclarationRemoveButton(false)
    }

    const handleSynopsisAttachClick = () => {
        setShowSynopsisRemoveButton(true)
    }

    const handleSynopsisRemoveClick = () => {
        setSelectedSynopsisCopyFile(null)
        setShowSynopsisRemoveButton(false)
    }

    const handleDirectorProfileAttachClick = () => {
        setShowDirectorProfileRemoveButton(true)
    }

    const handleDirectorProfileRemoveClick = () => {
        setSelectedDirectorFile(null)
        setShowDirectorProfileRemoveButton(false)
    }

    const handleProducerProfileAttachClick = () => {
        setShowProducerProfileRemoveButton(true)
    }

    const handleProducerProfileRemoveClick = () => {
        setShowProducerProfileRemoveButton(false)
        setSelectedProducerFile(null)

    }

    const handleCastAndCrewAttachClick = () => {
        setShowCastAndCrewRemoveButton(true)
    }

    const handleCastAndCrewRemoveClick = () => {
        setShowCastAndCrewRemoveButton(false)
        setSelectedDetailsCastCrewFile(null)

    }



    return (
        <>
            <h5>Documents(For Feature Film and Non Feature Film)</h5>
            <form>
                <p style={{ fontWeight: "500", color: "#615A5B" }}>(1) Upload Documents:-</p>

                <div className='row'>
                    <div className='col-sm-12 col-lg-12' style={{ color: '#FF0000', lineHeight: "2px", fontWeight: "500" }}>
                        <p className='text-uppercase' style={{ color: '#FF0000' }}>Note:</p>
                        <p>1.SYNOPSIS IN ENGLISH(NOT EXCEEDING 200 WORDS)</p>
                        <p>2.PRODUCER's PROFILE(NOT EXCEEDING 100 WORDS)</p>
                        <p>3.DIRECTOR'S PROFILE(NOT EXCEEDING 100 WORDS) & NOTE NOT EXCEEDING 30 WORDS</p>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col-sm-12 col-lg-6 mt-4'>
                        <div className='row'>
                            <div className='col-sm-12 col-lg-10'>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
                                    onChange={handleFileAttachCopyChange}
                                    style={{ display: 'none', width: "100%" }}
                                    id="fileInput"
                                    name="authorization_latter"
                                />
                                <label htmlFor="fileInput" style={{ width: "100%", height: "100%" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder="(A) Authorisation Letter in Favour Of NFDC(FORM I.P.-11) in PDF"
                                        value={selectedAttachCopyFile ? selectedAttachCopyFile.name : ''}
                                        InputProps={{
                                            readOnly: true,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => document.getElementById('fileInput').click()}
                                                        edge="end"
                                                    >
                                                        <AttachFileIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            style: {
                                                border: "1px solid #CF528A",
                                                borderRadius: "5px",
                                                height: "108px",
                                            },
                                        }}
                                        fullWidth
                                    //name="authorization_latter"
                                    // value={formData.authorization_latter}
                                    //onChange={handleChange}
                                    />
                            {formErrors.authorization_latter && (
    <p className="text-danger">{formErrors.authorization_latter}</p>
)}
{!formErrors.authorization_latter && errors.authorization_latter && (
    <p className="text-danger">{errors.authorization_latter}</p>
)}
                                    {!(formData?.documentData?.[5]) ? <></> : (
                                        <div>
                                            <span className="Attach_Photo_ID">
                                                <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[5].file}`}>{formData?.documentData?.[5].name}</a>
                                            </span>
                                        </div>
                                    )}


                                </label>

                            </div>
                            <div className='col-sm-12 col-lg-2 d-flex align-items-center'>
                                <div style={{ width: "100%" }}>
                                    {/* <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#FF0000', width: '100%' }}>
                                        <img src={RemoveIcon} alt='remove icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Remove</p>
                                    </button>

                                    <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'black', width: '100%' }}>
                                            <img src={PlusIcon} alt='remove icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Attach</p>
                                        </button> */}
                                    {/* 
                                    {showAuthorisationRemoveButton ? (
                                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#FF0000', width: '100%' }} onClick={handleAuthorisationRemoveClick}>
                                            <img src={RemoveIcon} alt='remove icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Remove</p>
                                        </button>
                                    ) : (
                                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'black', width: '100%' }} onClick={handleAuthorisationAttachClick}>
                                            <img src={PlusIcon} alt='plus icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Attach</p>
                                        </button>
                                    )} */}


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-lg-6 mt-4'>
                        <div className='row'>
                            <div className='col-sm-12 col-lg-10'>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
                                    onChange={handleDeclarationLetter}
                                    style={{ display: 'none', width: "100%" }}
                                    id="fileInputDeclaration"
                                    name='declaration_latter'
                                // name="date_of_completion_production"
                                // value={formData.date_of_completion_production}
                                // onChange={handleChange} 
                                />
                                <label htmlFor="fileInputDeclaration" style={{ width: "100%", height: "100%" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder="(B) Declaration Letter (As Per The Clause No 7.2(C)) in PDF"
                                        value={selectedDeclarationLetterFile ? selectedDeclarationLetterFile.name : ''}
                                        InputProps={{
                                            readOnly: true,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => document.getElementById('fileInputDeclaration').click()}
                                                        edge="end"
                                                    >
                                                        <AttachFileIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            style: {
                                                border: "1px solid #CF528A",
                                                borderRadius: "5px",
                                                height: "108px",
                                            },
                                        }}
                                        fullWidth
                                    />
                        {formErrors.declaration_latter && (
              <p className="text-danger">{formErrors.declaration_latter}</p>
            )}
            {!formErrors.declaration_latter && errors.declaration_latter && (
              <p className="text-danger">{errors.declaration_latter}</p>
            )}
                                    {!(formData?.documentData?.[6]) ? <></> : (
                                        <div>
                                            <span className="Attach_Photo_ID">
                                                <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[6].file}`}>{formData?.documentData?.[6].name}</a>
                                            </span>
                                        </div>
                                    )}

                                </label>

                            </div>
                            <div className='col-sm-12 col-lg-2 d-flex align-items-center'>
                                <div style={{ width: "100%" }}>
                                    {/* {showDeclarationRemoveButton ? (
                                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#FF0000', width: '100%' }} onClick={handleDeclarationLetterRemoveClick}>
                                            <img src={RemoveIcon} alt='remove icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Remove</p>
                                        </button>
                                    ) : (
                                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'black', width: '100%' }} onClick={handleDeclarationLetterAttachClick}>
                                            <img src={PlusIcon} alt='plus icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Attach</p>
                                        </button>
                                    )} */}

                                </div>
                            </div>
                            {/* <div className='col-sm-12 col-lg-2 d-flex align-items-center'>
                                <div style={{ width: "100%" }}>
                                    {showRemoveButton ? (
                                        <button
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#FF0000',
                                                width: '100%'
                                            }}
                                            onClick={handleRemoveClick}
                                        >
                                            <RemoveIcon style={{ marginRight: '5px' }} />
                                            <span>Remove</span>
                                        </button>
                                    ) : (
                                        <button
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'transparent',
                                                border: 'none',
                                                color: 'black',
                                                width: '100%'
                                            }}
                                            onClick={handleAttachClick}
                                        >
                                            <AttachFileIcon style={{ marginRight: '5px' }} />
                                            <span>Attach</span>
                                        </button>
                                    )}
                                </div>
                            </div> */}

                        </div>
                    </div>
<div className='col-sm-12 col-lg-6 mt-4'>
      <div className='row'>
        <div className='col-sm-12 col-lg-10 mt-4'>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
            onChange={handleSynopsisCopyChange}
            style={{ display: 'none', width: "100%" }}
            id="fileInputSynopsis"
            name="synopsis_in_english"
          />

          <label htmlFor="fileInputSynopsis" style={{ width: "100%", height: "100%" }}>
            <TextField
              variant="outlined"
              placeholder="(E) Synopsis in English (Not Exceeding 100 words) In .Doc Format"
              value={selectedSynopsisCopyFile ? selectedSynopsisCopyFile.name : ''}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => document.getElementById('fileInputSynopsis').click()}
                      edge="end"
                    >
                      <AttachFileIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  border: "1px solid #CF528A",
                  borderRadius: "5px",
                  height: "108px",
                },
              }}
              fullWidth
            />
            {formErrors.synopsis_in_english && (
              <p className="text-danger">{formErrors.synopsis_in_english}</p>
            )}
            {!formErrors.synopsis_in_english && errors.synopsis_in_english && (
              <p className="text-danger">{errors.synopsis_in_english}</p>
            )}
            {!(formData?.documentData?.[9]) ? <></> : (
              <div>
                <span className="Attach_Photo_ID">
                  <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[9].file}`}>
                    {formData?.documentData?.[9].name}
                  </a>
                </span>
              </div>
            )}
          </label>
        </div>
        <div className='col-sm-12 col-lg-1 d-flex align-items-center'>
          <div>
            {/* Your attach/remove buttons here */}
          </div>
        </div>
      </div>
    </div>
    <div className='col-sm-12 col-lg-6 mt-4'>
        <div className='row'>
          <div className='col-sm-12 col-lg-10'>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
              onChange={handleDirectorFileChange}
              style={{ display: 'none', width: "100%" }}
              id="fileInputDirector"
              name="directors_profile"
            />
            <label htmlFor="fileInputDirector" style={{ width: "100%", height: "100%" }}>
              <TextField
                variant="outlined"
                placeholder="(D) Director's Profile (Not Exceeding 100 words) & Note (Not Exceeding 30 words) In Doc Format"
                value={selectedDirectorFile ? selectedDirectorFile.name : ''}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => document.getElementById('fileInputDirector').click()}
                        edge="end"
                      >
                        <AttachFileIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    border: "1px solid #CF528A",
                    borderRadius: "5px",
                    height: "108px",
                  },
                }}
                fullWidth
              />
              {formErrors.directors_profile && (
                <p className="text-danger">{formErrors.directors_profile}</p>
              )}
              {!formErrors.directors_profile && errors.directors_profile && (
                <p className="text-danger">{errors.directors_profile}</p>
              )}
              {!(formData?.documentData?.[8]) ? <></> : (
                <div>
                  <span className="Attach_Photo_ID">
                    <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[8].file}`}>
                      {formData?.documentData?.[8].name}
                    </a>
                  </span>
                </div>
              )}
            </label>
          </div>
          <div className='col-sm-12 col-lg-2 d-flex align-items-center'>
            <div>
              {/* Your attach/remove buttons here */}
            </div>
          </div>
        </div>
      </div>
                    <div className='col-sm-12 col-lg-6 mt-4'>
                        <div className='row'>
                            <div className='col-sm-12 col-lg-10 mt-4'>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
                                    onChange={handleProducerFileChange}
                                    style={{ display: 'none', width: "100%" }}
                                    id="fileInputProducer"
                                    name="producers_profile"
                                />

                                <label htmlFor="fileInputProducer" style={{ width: "100%", height: "100%" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder="(E) Producer's Profile(Not Exceeding 100 words) In.Doc Format"
                                        value={selectedProducerFile ? selectedProducerFile.name : ''}
                                        InputProps={{
                                            readOnly: true,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => document.getElementById('fileInputProducer').click()}
                                                        edge="end"
                                                    >
                                                        <AttachFileIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            style: {
                                                border: "1px solid #CF528A",
                                                borderRadius: "5px",
                                                height: "108px",
                                            },
                                        }}
                                        fullWidth
                                    />
                                     {formErrors.producers_profile && (
              <p className="text-danger">{formErrors.producers_profile}</p>
            )}
            {!formErrors.producers_profile && errors.producers_profile && (
              <p className="text-danger">{errors.producers_profile}</p>
            )}

                                    {!(formData?.documentData?.[9]) ? <></> : (
                                        <div>
                                            <span className="Attach_Photo_ID">
                                                <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[9].file}`}>{formData?.documentData?.[9].name}</a>
                                            </span>
                                        </div>
                                    )}

                                </label>


                            </div>
                            <div className='col-sm-12 col-lg-1 d-flex align-items-center'>
                                <div>
                                    {/* {showProducerProfileRemoveButton ? (
                                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#FF0000', width: '100%' }} onClick={handleProducerProfileRemoveClick}>
                                            <img src={RemoveIcon} alt='remove icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Remove</p>
                                        </button>
                                    ) : (
                                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'black', width: '100%' }} onClick={handleProducerProfileAttachClick}>
                                            <img src={PlusIcon} alt='plus icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Attach</p>
                                        </button>
                                    )} */}


                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-lg-6 mt-4'>
                        <div className='row'>
                            <div className='col-sm-12 col-lg-10'>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
                                    onChange={handleselectedDetailsCastCrewFile}
                                    style={{ display: 'none' }}
                                    id="fileInputDetailsCastCrew"
                                    name="details_of_cast_crew"
                                />
                                <label htmlFor="fileInputDetailsCastCrew" style={{ width: "100%" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder="(F) Details Of Cast & Crew In.Doc Format"
                                        value={selectedDetailsCastCrewFile ? selectedDetailsCastCrewFile.name : ''}
                                        InputProps={{
                                            readOnly: true,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => document.getElementById('fileInputDetailsCastCrew').click()}
                                                        edge="end"
                                                    >
                                                        <AttachFileIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            style: {
                                                border: "1px solid #CF528A",
                                                borderRadius: "5px",
                                                height: "108px"
                                            },
                                        }}
                                        fullWidth />
                                     {formErrors.details_of_cast_crew && (
              <p className="text-danger">{formErrors.details_of_cast_crew}</p>
            )}
            {!formErrors.details_of_cast_crew && errors.details_of_cast_crew && (
              <p className="text-danger">{errors.details_of_cast_crew}</p>
            )}

                                </label>
                                {!(formData?.documentData?.[10]) ? <></> : (
                                    <div>
                                        <span className="Attach_Photo_ID">
                                            <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[10].file}`}>{formData?.documentData?.[10].name}</a>
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className='col-sm-12 col-lg-2 d-flex align-items-center'>
                                <div>
                                    {/* {showCastAndCrewRemoveButton ? (
                                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#FF0000', width: '100%' }} onClick={handleCastAndCrewRemoveClick}>
                                            <img src={RemoveIcon} alt='remove icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Remove</p>
                                        </button>
                                    ) : (
                                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'black', width: '100%' }} onClick={handleCastAndCrewAttachClick}>
                                            <img src={PlusIcon} alt='plus icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Attach</p>
                                        </button>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-4'>
                    <p>(2) Following must be mailed to <span style={{ color: "#AD4172", fontWeight: "800" }}>indianpanorama@nfdcindia.com:-</span></p>
                    <div className='row'>
                        <div className='col-sm-12 col-lg-12' style={{ lineHeight: "2px" }}>
                            <p>a.&nbsp;&nbsp;Film stills (2 nos.), 300 dpi<span className='text-danger'>*</span></p>
                            <p>b.&nbsp;&nbsp;Director's working stills (1 nos.) 300 dpi<span className='text-danger'>*</span></p>
                            <p>c.&nbsp;&nbsp;Producer's Still or Logo<span className='text-danger'>*</span></p>
                        </div>
                    </div>
                </div>
                <div className='row mt-4'>

                    <div className="col-sm-12 col-lg-12">
                        <React.Fragment>
                            <div>
                                <h6>d.Wheather the requisite documents(s) at serial alphabet (a),(b),(c) are sent by email</h6>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="requisite_documents"
                                        id="requisite_documents_yes"
                                        value="1"
                                        checked={formData.requisite_documents == 1}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="requisite_documents_yes">
                                        Yes
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="requisite_documents"
                                        id="requisite_documents_no"
                                        value="0"
                                        checked={formData.requisite_documents == 0}
                                        onChange={handleChange}
                                        onClick={handleRequisiteDocumentsClickOpen}
                                    />
                                    <label className="form-check-label" htmlFor="requisite_documents_no">
                                        No
                                    </label>
                                </div>
                                {errors.requisite_documents && (
                                    <p className="text-danger">{errors.requisite_documents}</p>
                                )}
                            </div>
                            <BootstrapDialog
                                onClose={handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={open}
                            >
                                <DialogContent dividers>
                                    <Typography gutterBottom>
                                        Material at serial number (a),(b),(c) are mandatory.
                                    </Typography>
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={handleClose}>
                                        Ok
                                    </Button>
                                </DialogActions>
                            </BootstrapDialog>
                        </React.Fragment>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-sm-12 col-lg-12'>
                        <p className='text-uppercase' style={{ color: '#FF0000', fontWeight: "500" }}>Note: Soft copies of the documents at serial no. 1(A TO F), AND 2 (A,B,C,D) MUST BE SENT IN A DVD/CD alongwith the entry form.</p>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Documents