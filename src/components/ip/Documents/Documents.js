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

const Documents = ({ formData, setFormData, errors, setDocumentErrors }) => {


    const handleChange = (e) => {
        console.log("handleChange");
        const { name, value } = e.target;
        console.log(name)
        console.log(value)

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        errors[name] = ""
        setDocumentErrors(errors);
    };
    // const [selectedFile, setSelectedFile] = useState(null);
    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     console.log(file);
    // };



    const [selectedAttachCopyFile, setSelectedAttachCopyFile] = useState(null);
    const [selectedDeclarationLetterFile, setSelectedDeclarationLetterFile] = useState(null);
    const [selectedSynopsisCopyFile, setSelectedSynopsisCopyFile] = useState(null);
    const [selectedDirectorFile, setSelectedDirectorFile] = useState(null);
    const [selectedProducerFile, setSelectedProducerFile] = useState(null);
    const [selectedDetailsCastCrewFile, setSelectedDetailsCastCrewFile] = useState(null);

    const [openRequisiteDocumentsopen, setOpenRequisiteDocumentsopen] = React.useState(false);

    const [showAuthorisationRemoveButton, setShowAuthorisationRemoveButton] = useState(false);
    const [showDeclarationRemoveButton, setShowDeclarationRemoveButton] = useState(false);
    const [showSynopsisRemoveButton, setShowSynopsisRemoveButton] = useState(false);
    const [showDirectorProfileRemoveButton, setShowDirectorProfileRemoveButton] = useState(false);
    const [showProducerProfileRemoveButton, setShowProducerProfileRemoveButton] = useState(false);
    const [showCastAndCrewRemoveButton, setShowCastAndCrewRemoveButton] = useState(false)


    const handleFileAttachCopyChange = (event) => {
        setSelectedAttachCopyFile(event.target.files[0]);
        console.log("is_authorization_latter success")
        const file = event.target.files[0];
        console.log(file);
        console.log("Selected Director file:", selectedDirectorFile);
        setFormData((prevState) => ({
            ...prevState,
            authorization_latter: file,
            is_authorization_latter: 1,
        }));

        // setSelectedAttachCopyFile(file);
        setShowAuthorisationRemoveButton(true);


        if (selectedAttachCopyFile) {
            // console.log("Selected Attach copy file:", selectedAttachCopyFile);
            // You can use FormData API to send the file to the server via fetch or Axios
            // For example:
            // const formData = new FormData();
            // formData.append('file', selectedFile);
            // Then use fetch or Axios to send formData to your backend
        } else {
            console.log("No file selected");
        }
    };
    const handleDeclarationLetter = (event) => {
        setSelectedDeclarationLetterFile(event.target.files[0]);
        setShowDeclarationRemoveButton(true)
        const file = event.target.files[0];

        // Do something with the uploaded file
        console.log(file);
        console.log("Selected Director file:", selectedDirectorFile);
        setFormData((prevState) => ({
            ...prevState,
            declaration_latter: file,
            is_declaration_latter: 1,
        }));
        // Do something with the uploaded file
        // console.log(fileDeclaration);
        // if (selectedDeclarationLetterFile) {
        //     console.log("Selected Declaration file:", selectedDeclarationLetterFile);

        // } else {
        //     console.log("No file selected");
        // }
    };


    const handleSynopsisCopyChange = (event) => {
        setSelectedSynopsisCopyFile(event.target.files[0]);
        setShowSynopsisRemoveButton(true)
        const fileSynopsis = event.target.files[0];
        // Do something with the uploaded file
        console.log(fileSynopsis);
        setFormData((prevState) => ({
            ...prevState,
            synopsis_in_english: fileSynopsis,
            is_synopsis_in_english: 1,

        }));
    };


    const handleselectedDirectorFileChange = (event) => {
        setSelectedDirectorFile(event.target.files[0]);
        setShowDirectorProfileRemoveButton(true)
        const Directorfile = event.target.files[0];
        // Do something with the uploaded file
        console.log(Directorfile);
        setFormData((prevState) => ({
            ...prevState,
            directors_profile: Directorfile,
            is_directors_profile: 1,
        }));
    }

    const handleProducerFileChange = (event) => {
        setSelectedProducerFile(event.target.files[0]);
        setShowProducerProfileRemoveButton(true)
        const Producerfile = event.target.files[0];
        // Do something with the uploaded file
        console.log(Producerfile);
        setFormData((prevState) => ({
            ...prevState,
            producers_profile: Producerfile,
            is_producers_profile: 1,
        }));
    };


    const handleselectedDetailsCastCrewFile = (event) => {
        setSelectedDetailsCastCrewFile(event.target.files[0]);
        setShowCastAndCrewRemoveButton(true)
        const DetailsCastCrewfile = event.target.files[0];
        // Do something with the uploaded file
        console.log(DetailsCastCrewfile);
        setFormData((prevState) => ({
            ...prevState,
            details_of_cast_crew: DetailsCastCrewfile,
            is_details_of_cast_crew: 1,
        }));
    };




    const handleRequisiteDocumentsClose = () => {
        setOpenRequisiteDocumentsopen(false)
    }


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
            <h5>Documents(For FF and NFF)</h5>
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
                                    {errors.authorization_latter && (
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
                                    {errors.declaration_latter && (
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
                            <div className='col-sm-12 col-lg-10'>
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
                                        placeholder="(C) Synopsis in English (Not Exceeding 200 Words) In PDF"
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
                                    {errors.synopsis_in_english && (
                                        <p className="text-danger">{errors.synopsis_in_english}</p>
                                    )}
                                    {!(formData?.documentData?.[7]) ? <></> : (
                                        <div>
                                            <span className="Attach_Photo_ID">
                                                <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[7].file}`}>{formData?.documentData?.[7].name}</a>
                                            </span>
                                        </div>
                                    )}

                                </label>

                            </div>
                            <div className='col-sm-12 col-lg-2 d-flex align-items-center'>
                                <div>
                                    {/* {showSynopsisRemoveButton ? (
                                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#FF0000', width: '100%' }} onClick={handleSynopsisRemoveClick}>
                                            <img src={RemoveIcon} alt='remove icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Remove</p>
                                        </button>
                                    ) : (
                                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'black', width: '100%' }} onClick={handleSynopsisAttachClick}>
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
                                    onChange={handleselectedDirectorFileChange}
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
                                    {errors.directors_profile && (
                                        <p className="text-danger">{errors.directors_profile}</p>
                                    )}
                                    {!(formData?.documentData?.[8]) ? <></> : (
                                        <div>
                                            <span className="Attach_Photo_ID">
                                                <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[8].file}`}>{formData?.documentData?.[8].name}</a>
                                            </span>
                                        </div>
                                    )}

                                </label>

                            </div>
                            <div className='col-sm-12 col-lg-2 d-flex align-items-center'>
                                <div>
                                    {/* {showDirectorProfileRemoveButton ? (
                                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#FF0000', width: '100%' }} onClick={handleDirectorProfileRemoveClick}>
                                            <img src={RemoveIcon} alt='remove icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Remove</p>
                                        </button>
                                    ) : (
                                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'black', width: '100%' }} onClick={handleDirectorProfileAttachClick}>
                                            <img src={PlusIcon} alt='plus icon' style={{ marginRight: '5px' }} /><p style={{ margin: 0 }}>Attach</p>
                                        </button>
                                    )} */}


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
                                    {errors.producers_profile && (
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
                                    {errors.details_of_cast_crew && (
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
                                onClose={handleRequisiteDocumentsClose}
                                aria-labelledby="customized-dialog-title"
                                open={openRequisiteDocumentsopen}
                            >
                                <DialogContent dividers>
                                    <Typography gutterBottom>
                                        Material at serial number (a),(b),(c) are mandatory.
                                    </Typography>
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={handleRequisiteDocumentsClose}>
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