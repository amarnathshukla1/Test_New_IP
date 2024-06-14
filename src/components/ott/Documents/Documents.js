import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormControl, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { GLOBAL_URL } from '../../../API/global';

const Documents = ({ formData, setFormData, errors }) => {

    const [selectedSynopsisProfile, setSelectedSynopsisProfile] = useState(null);
    const [selectedCreatorProfile, setSelectedCreatorProfile] = useState(null);
    const [selectedDirectorProfile, setSelectedDirectorProfile] = useState(null);
    const [selectedProducerProfile, setSelectedProducerProfile] = useState(null);

    const [showAuthorisationRemoveButton, setShowAuthorisationRemoveButton] = useState(false);
    const [showDeclarationRemoveButton, setShowDeclarationRemoveButton] = useState(false);
    const [showSynopsisRemoveButton, setShowSynopsisRemoveButton] = useState(false);
    const [showDirectorProfileRemoveButton, setShowDirectorProfileRemoveButton] = useState(false);

    // const handleChange = (e) => {
    //     console.log("handleChange");
    //     const { name, value } = e.target;
    //     console.log(name)
    //     console.log(value)

    //     setFormData(prevData => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    //     errors[name] = ""
    //     setDocumentErrors(errors);
    // };

    const handleSelectedProfileOfSynopsis = (event) => {
        setSelectedSynopsisProfile(event.target.files[0]);
        console.log("is_synopsis_profile success")
        const profileOfSynopsis = event.target.files[0];
        console.log(profileOfSynopsis);
        // console.log("Selected Director file:", selectedDirectorFile);
        setFormData((prevState) => ({
            ...prevState,
            synopsis: profileOfSynopsis,
            is_synopsis_profile: 1,
        }));
    };

    const handleSelectedProfileOfCreator = (event) => {
        setSelectedCreatorProfile(event.target.files[0]);
        console.log("is_creator_profile success")
        const profileOfCreator = event.target.files[0];
        console.log(profileOfCreator);
        setFormData((prevState) => ({
            ...prevState,
            brief_profile_of_creator: profileOfCreator,
            is_creator_profile: 1,
        }));
    };


    const handleSelectedProfileOfDirector = (event) => {
        setSelectedDirectorProfile(event.target.files[0]);
        console.log("is_creator_profile success")
        const profileOfDirector = event.target.files[0];
        console.log(profileOfDirector);
        setFormData((prevState) => ({
            ...prevState,
            brief_profile_of_director: profileOfDirector,
            is_director_profile: 1,

        }));
    };


    const handleSelectedProfileOfProducer = (event) => {
        setSelectedProducerProfile(event.target.files[0]);
        console.log("is_producer_profile success")
        const ProfileOfProducer = event.target.files[0];
        console.log(ProfileOfProducer);
        setFormData((prevState) => ({
            ...prevState,
            brief_profile_of_producer: ProfileOfProducer,
            is_brief_profile_of_producer: 1,
        }));
    }
    return (
        <>
            <h5 className="text-capitalize">
                Documents to be uploaded<span className="text-danger">*</span>
            </h5>
            <p className='text-danger'>NOTE:</p>
            <p className='text-danger text-capitalize'>In case of multiple Director's, Creator's, Producer's, Their profile should be consolidated in one document</p>


            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
                                        onChange={handleSelectedProfileOfSynopsis}
                                        style={{ display: 'none', width: "100%" }}
                                        id="synopsis"
                                        name="synopsis"
                                    />
                                    <label htmlFor="synopsis" style={{ width: "100%", height: "100%" }}>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Synopsis Of The Web-Series(Precise, Not Exceeding 200 words)"
                                            value={selectedSynopsisProfile ? selectedSynopsisProfile.name : ''}
                                            InputProps={{
                                                readOnly: true,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => document.getElementById('synopsis').click()}
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
                                        {errors.synopsis && (
                                            <p className="text-danger">{errors.synopsis}</p>
                                        )}
                                        {!(formData?.documentData?.[1]) ? <></> : (
                                            <div>
                                                <span className="Attach_Photo_ID">
                                                    <a href={`${GLOBAL_URL}downloadfile/ott/${formData.id}/${formData?.documentData?.[1].file}`}>{formData?.documentData?.[1].name}</a>
                                                </span>
                                            </div>
                                        )}
                                    </label>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
                                        onChange={handleSelectedProfileOfCreator}
                                        style={{ display: 'none', width: "100%" }}
                                        id="profileOfCreator"
                                        name="brief_profile_of_creator"
                                    />
                                    <label htmlFor="profileOfCreator" style={{ width: "100%", height: "100%" }}>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Brief Profile Of Creator's (Precise, Not Exceeding 200 words)"
                                            value={selectedCreatorProfile ? selectedCreatorProfile.name : ''}
                                            InputProps={{
                                                readOnly: true,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => document.getElementById('profileOfCreator').click()}
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
                                        {errors.brief_profile_of_creator && (
                                            <p className="text-danger">{errors.brief_profile_of_creator}</p>
                                        )}
                                        {!(formData?.documentData?.[2]) ? <></> : (
                                            <div>
                                                <span className="Attach_Photo_ID">
                                                    <a href={`${GLOBAL_URL}downloadfile/ott/${formData.id}/${formData?.documentData?.[2].file}`}>{formData?.documentData?.[2].name}</a>
                                                </span>
                                            </div>
                                        )}


                                    </label>


                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
                                        onChange={handleSelectedProfileOfDirector}

                                        style={{ display: 'none', width: "100%" }}
                                        id="profileOfDirector"
                                        name="brief_profile_of_director"
                                    />
                                    <label htmlFor="profileOfDirector" style={{ width: "100%", height: "100%" }}>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Brief Profile Of Director's (Precise, Not Exceeding 200 words)"
                                            value={selectedDirectorProfile ? selectedDirectorProfile.name : ''}
                                            InputProps={{
                                                readOnly: true,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => document.getElementById('profileOfDirector').click()}
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
                                        {errors.brief_profile_of_director && (
                                            <p className="text-danger">{errors.brief_profile_of_director}</p>
                                        )}
                                        {!(formData?.documentData?.[3]) ? <></> : (
                                            <div>
                                                <span className="Attach_Photo_ID">
                                                    <a href={`${GLOBAL_URL}downloadfile/ott/${formData.id}/${formData?.documentData?.[3].file}`}>{formData?.documentData?.[3].name}</a>
                                                </span>
                                            </div>
                                        )}
                                    </label>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
                                        onChange={handleSelectedProfileOfProducer}
                                        style={{ display: 'none', width: "100%" }}
                                        id="profileOfProducer"
                                        name="brief_profile_of_producer"
                                    />
                                    <label htmlFor="profileOfProducer" style={{ width: "100%", height: "100%" }}>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Brief Profile Of Producer's (Precise, Not Exceeding 200 words)"
                                            value={selectedProducerProfile ? selectedProducerProfile.name : ''}
                                            InputProps={{
                                                readOnly: true,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => document.getElementById('profileOfProducer').click()}
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
                                        {errors.brief_profile_of_producer && (
                                            <p className="text-danger">{errors.brief_profile_of_producer}</p>
                                        )}
                                        {!(formData?.documentData?.[4]) ? <></> : (
                                            <div>
                                                <span className="Attach_Photo_ID">
                                                    <a href={`${GLOBAL_URL}downloadfile/ott/${formData.id}/${formData?.documentData?.[4].file}`}>{formData?.documentData?.[4].name}</a>
                                                </span>
                                            </div>
                                        )}
                                    </label>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default Documents