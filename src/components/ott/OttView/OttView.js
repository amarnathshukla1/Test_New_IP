import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, BorderColorTwoTone as BorderColorTwoToneIcon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import './ott.css';
import { convertDate } from '../../Helper';
import { getRequestGlobal } from '../../../API/global';
import { getRequest } from '../../../API/IP';
import { GLOBAL_URL } from '../../../API/global';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const OttView = ({ formData, setActiveStep }) => {
    // State variables
    const [language, setLanguage] = useState({});
    const [genre, setGenre] = useState({});
    const [preEpisodeData, setPreEpisodeData] = useState([]);
    const [coproData, setCoproData] = useState([]);
    const [streemOutData, setStreemOutData] = useState([]);
    const [screeningData, setScreeningData] = useState([]);
    const [broardcastData, setBroardcastData] = useState([]);
    const [Competition, setCompetition] = useState([]);
    const [createrDetails, setCreaterDetails] = useState([]);
    const [directorDetails, setDirectorDetails] = useState([]);

    // Get ID from URL parameters
    const { id = null } = useParams();

    useEffect(() => {

        const loadData = async () => {
            const coproResponse = await getRequest(`ott/${id}/coproducer`);
            const coproData = coproResponse.data;
            setCoproData(coproData);

            const episodeResponse = await getRequest(`ott/${id}/episode`);
            const episodeData = episodeResponse.data;
            setPreEpisodeData(episodeData);

            const languageResponse = await getRequestGlobal('language_list', {});
            setLanguage(languageResponse.data);

            const genreResponse = await getRequestGlobal('genre', {});
            setGenre(genreResponse.data);

            const streemOut = await getRequest(`ott/${id}/streamed-country`);
            setStreemOutData(streemOut.data);

            const screening = await getRequest(`ott/${id}/threatrical-screening`);
            setScreeningData(screening.data);

            const broardcast = await getRequest(`ott/${id}/broardcast`);
            setBroardcastData(broardcast.data);

            const competition = await getRequest(`ott/${id}/international-competition`);
            setCompetition(competition.data);

            const createrDetails = await getRequest(`ott/${id}/creator/type/1`);
            setCreaterDetails(createrDetails.data);

            const directorDetails = await getRequest(`ott/${id}/creator/type/2`);
            setDirectorDetails(directorDetails.data);
        };

        loadData();
    }, [id]);

    // Handler to redirect to a specific step
    const handleRedirectStep = (value) => setActiveStep(value);

    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div className="container mt-5">
            {/* Accordion for Web Series Details */}
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <button onClick={() => handleRedirectStep(0)} style={{ background: 'transparent', border: 'none', marginRight: '20px', color: '#1976d2' }}>
                        <BorderColorTwoToneIcon />
                    </button>
                    Details Of Web Series
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth="lg">
                        <div className="row">
                            <div className="col-md-12">
                                <p><span className="titleoffield">Title of Web Series (in the original language of release)</span><span className="inputoffield"> {formData.title}</span></p>
                            </div>
                            <div className="col-md-12">
                                <p><span className="titleoffield">Language in which the Web Series was originally released</span><span className="inputoffield"> : {language[formData.language_id] || ''}</span></p>
                            </div>
                            <div className="col-md-6">
                                <p><span className="titleoffield">English translation of the title:</span><span className="inputoffield"> {formData.title_in_english}</span></p>
                            </div>
                            <div className="col-md-6">
                                <p><span className="titleoffield">Genre</span><span className="inputoffield"> : {genre[formData.genre_id] || ''}</span></p>
                            </div>
                            <div className="col-md-6">
                                <p><span className="titleoffield">Whether the series is subtitled in English:</span><span className="inputoffield"> {formData.is_subtitle_language_eng === 1 ? "Yes" : "No"}</span></p>
                            </div>
                            <div className="col-md-6">
                                <p><span className="titleoffield">Language of the film</span><span className="inputoffield"> : {language[formData.language_id] || ''}</span></p>
                            </div>
                        </div>
                    </Container>
                </AccordionDetails>
            </Accordion>

            {/* Accordion for Season & Episodes Details */}
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
                    <button onClick={() => handleRedirectStep(1)} style={{ background: 'transparent', border: 'none', marginRight: '20px', color: '#1976d2' }}>
                        <BorderColorTwoToneIcon />
                    </button>
                    Details Of Season & Episodes
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth="lg">
                        <div className="row">
                            <div className="col-md-6">
                                <p><span className="titleoffield">Season :</span><span className="inputoffield"> {formData.season}</span></p>
                            </div>
                            <div className="col-md-6">
                                <p><span className="titleoffield">Total Runtime (in minutes) :</span><span className="inputoffield"> {formData.runtime}</span></p>
                            </div>
                            <div className="col-md-6">
                                <p><span className="titleoffield">Number of episodes :</span><span className="inputoffield"> {formData.number_of_episode}</span></p>
                            </div>
                            <div className="col-md-6">
                                <p><span className="titleoffield">Release date of the season :</span><span className="inputoffield">{convertDate(formData.release_date)}</span></p>
                            </div>
                            <div className="col-md-12">
                                <p><span className="titleoffield">Whether the duration of each episode of the season is 25 min or more :</span><span className="inputoffield"> {formData.is_long_duration_timing ? "Yes" : "No"}</span></p>
                            </div>
                            <div className="col-md-12">
                                <><TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align='center'>Episode Number</TableCell>
                                                <TableCell align="center">Release Date</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {preEpisodeData.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{row.episode_number}</TableCell>
                                                    <TableCell align="center">{row.release_date}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer></>
                            </div>
                        </div>
                    </Container>
                </AccordionDetails>
            </Accordion>

            {/* Accordion for Details Of Production */}
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3-content" id="panel3-header">
                    <button onClick={() => handleRedirectStep(2)} style={{ background: 'transparent', border: 'none', marginRight: '20px', color: '#1976d2' }}>
                        <BorderColorTwoToneIcon />
                    </button>
                    Details Of Production
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth="lg">
                        <div className="row">
                            <div className="col-md-12">
                                <p><span className="titleoffield">Whether the web series is a co-production :</span><span className="inputoffield"> {formData.has_coproduction ? "Yes" : "No"}</span></p>
                                <p><span className="titleoffield">Select one of them :</span>
                                    <span className="inputoffield">
                                        {formData.type === 1 ? "OTT" : formData.type === 2 ? "Production House's" : "Individual Producer's"}
                                    </span></p>
                                {formData.has_coproduction === 1 && (
                                    <div className="row">
                                        {coproData.map((item, index) => (
                                            <div className='col-md-12'>
                                                <div className="card" style={{ width: "100%", marginTop: "10px", marginRight: '15px' }}>
                                                    <div className="card-body">
                                                        <p><span className="titleoffield">Name :</span><span className="inputoffield"> {item.name}</span></p>
                                                        <p><span className="titleoffield">Address :</span><span className="inputoffield"> {item.address}</span></p>
                                                        <p><span className="titleoffield">Mobile :</span><span className="inputoffield"> {item.phone}</span></p>
                                                        <p><span className="titleoffield">Email :</span><span className="inputoffield"> {item.email}</span></p>
                                                        <p><span className="titleoffield">Website :</span><span className="inputoffield"> {item.website}</span></p>
                                                        <p><span className="titleoffield">Wheather the OTT Platform has furnished information under Rule 18 of IT Rules, 2021 to the Ministry of information and Broadcasting, Government in India. : </span><span className="inputoffield"> {item.is_follow_it_rules ? "Yes" : "No"}</span></p>
                                                        <p><span className="titleoffield">Wheather the web series is its original production. : </span><span className="inputoffield"> {item.is_original_production ? "Yes" : "No"}</span></p>
                                                        <p><span className="titleoffield">Whether the production house is incorporated/registered in India. : </span><span className="inputoffield"> {item.is_registered ? "Yes" : "No"}</span></p>
                                                        <p><span className="titleoffield">Wheather the individual Producer is normally working and residing in India. : </span><span className="inputoffield"> {item.is_residing_in_country ? "Yes" : "No"}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {formData.has_coproduction === 0 && (
                                    <div className="row">
                                        {/* {coproData.map((item, index) => ( */}
                                        <div className='col-md-12'>
                                            <div className="card" style={{ width: "100%", marginTop: "10px", marginRight: '15px' }}>
                                                <div className="card-body">
                                                    <p><span className="titleoffield">Name :</span><span className="inputoffield"> {formData.coproducer_name}</span></p>
                                                    <p><span className="titleoffield">Address :</span><span className="inputoffield"> {formData.coproducer_address}</span></p>
                                                    <p><span className="titleoffield">Mobile :</span><span className="inputoffield"> {formData.coproducer_phone}</span></p>
                                                    <p><span className="titleoffield">Email :</span><span className="inputoffield"> {formData.coproducer_email}</span></p>
                                                    <p><span className="titleoffield">Website :</span><span className="inputoffield"> {formData.coproducer_website}</span></p>
                                                    <p><span className="titleoffield">Wheather the OTT Platform has furnished information under Rule 18 of IT Rules, 2021 to the Ministry of information and Broadcasting, Government in India. : </span><span className="inputoffield"> {formData.coproducer_is_follow_it_rules ? "Yes" : "No"}</span></p>
                                                    <p><span className="titleoffield">Wheather the web series is its original production. : </span><span className="inputoffield"> {formData.coproducer_is_original_production ? "Yes" : "No"}</span></p>
                                                    <p><span className="titleoffield">Whether the production house is incorporated/registered in India. : </span><span className="inputoffield"> {formData.coproducer_is_registered ? "Yes" : "No"}</span></p>
                                                    <p><span className="titleoffield">Wheather the individual Producer is normally working and residing in India. : </span><span className="inputoffield"> {formData.coproducer_is_residing_in_country ? "Yes" : "No"}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ))} */}
                                    </div>
                                )}

                            </div>
                            {/* <div className="col-md-12">
                                <p><span className="titleoffield">Select one of them :</span>
                                    <span className="inputoffield">
                                        {formData.type === 1 ? "OTT" : formData.type === 2 ? "Production House's" : "Individual Producer's"}
                                    </span></p>
                            </div> */}
                        </div>
                    </Container>
                </AccordionDetails>
            </Accordion>

            {/* Accordion for OTT - Platform */}
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
                    <button onClick={() => handleRedirectStep(1)} style={{ background: 'transparent', border: 'none', marginRight: '20px', color: '#1976d2' }}>
                        <BorderColorTwoToneIcon />
                    </button>
                    Details Of Streaming OTT Platform
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth="lg">
                        <div className="row">
                            <div className="col-md-12">
                                <p><span className="titleoffield">Name of the OTT Platform where the web series was originally released :</span><span className="inputoffield"> {formData.ott_released_platform}</span></p>
                            </div>
                            <div className="col-md-12">
                                <p><span className="titleoffield">Other OTT platform(s) on which the Web Series is currently available, if any :</span><span className="inputoffield"> {formData.is_other_released_platform_available ? "yes" : "NO"}</span></p>
                            </div>
                            <h6 style={{ textAlign: 'center', color: 'gray' }}>Other Information</h6>

                            <div className="col-md-12 mt-3">
                                <p><span className="titleoffield">(A) Whether web series has been streamed outside India :</span><span className="inputoffield"> {formData.is_released_other_country ? "Yes" : "No"}</span></p>
                                {formData.is_released_other_country && streemOutData.length > 0 ? (
                                    <><TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align='center'>Country</TableCell>
                                                    <TableCell align="center">Platform Name</TableCell>
                                                    <TableCell align="center">Release Date</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {streemOutData.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align="center">{row.country_id}</TableCell>
                                                        <TableCell align="center">{row.platform_name}</TableCell>
                                                        <TableCell align="center">{row.release_date}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer></>
                                ) : (
                                    <></>
                                )}
                            </div>

                            <div className="col-md-12 mt-3">
                                <p><span className="titleoffield">(B) Whether web series has been presented for festival/theatrical screening :</span><span className="inputoffield"> {formData.is_thretrical_screening ? "Yes" : "No"}</span></p>
                                {formData.is_thretrical_screening && screeningData.length > 0 ? (
                                    <>

                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align='center'>Name of the festival</TableCell>
                                                        <TableCell align="center">Date of the festival</TableCell>
                                                        <TableCell align="center">Address of the festival</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {screeningData.map((row) => (
                                                        <TableRow
                                                            key={row.name}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell align="center">{row.festival_name}</TableCell>
                                                            <TableCell align="center">{row.date_of_festival}</TableCell>
                                                            <TableCell align="center">{row.address}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>

                            <div className="col-md-12 mt-3">
                                <p><span className="titleoffield">(C) Whether web series has been streamed/broadcasted on the Internet/TV or other media :</span><span className="inputoffield"> {formData.is_streamed_other_media ? "Yes" : "No"}</span></p>
                                {formData.is_streamed_other_media && broardcastData.length > 0 ? (
                                    <>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align='center'>Date of the Streaming</TableCell>
                                                        <TableCell align="center">Name of the platform</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {broardcastData.map((row) => (
                                                        <TableRow
                                                            key={row.name}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell align="center">{row.stream_date}</TableCell>
                                                            <TableCell align="center">{row.platform_name}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </>
                                ) : (<></>
                                )}
                            </div>

                            <div className="col-md-12 mt-3">
                                <p><span className="titleoffield">(D) Wheather web series has been participated in any International Competition :</span><span className="inputoffield"> {formData.is_international_competition ? "Yes" : "No"}</span></p>
                                {formData.is_international_competition && Competition.length > 0 ? (
                                    <>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align='center'>Name of the Competition</TableCell>
                                                        <TableCell align="center">Date of the Competition</TableCell>
                                                        <TableCell align="center">Details of the Awards won(if any)</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {Competition.map((row) => (
                                                        <TableRow
                                                            key={row.name}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell align="center">{row.competition_name}</TableCell>
                                                            <TableCell align="center">{row.competition_date}</TableCell>
                                                            <TableCell align="center">{row.details}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </>
                                ) : (<></>
                                )}
                            </div>
                        </div>
                    </Container>
                </AccordionDetails>
            </Accordion>

            {/* Accordion for Director's/Creator's Details */}
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
                    <button onClick={() => handleRedirectStep(1)} style={{ background: 'transparent', border: 'none', marginRight: '20px', color: '#1976d2' }}>
                        <BorderColorTwoToneIcon />
                    </button>
                    Director's/Creator's Details
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth="lg">
                        <div className="row">
                            <h6 style={{ textAlign: 'center', color: 'gray', padding: '10px' }}>Creator's Details</h6>
                            <div className="col-md-12">
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align='center'>Name</TableCell>
                                                <TableCell align="center">Country</TableCell>
                                                <TableCell align="center">Phone</TableCell>
                                                <TableCell align="center">Email</TableCell>
                                                <TableCell align="center">Website</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {createrDetails.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{row.name}</TableCell>
                                                    <TableCell align="center">{row.country_id}</TableCell>
                                                    <TableCell align="center">{row.phone}</TableCell>
                                                    <TableCell align="center">{row.email}</TableCell>
                                                    <TableCell align="center">{row.website}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            <h6 style={{ textAlign: 'center', color: 'gray', padding: '10px' }}>Director's Details</h6>
                            <div className="col-md-12">
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align='center'>Name</TableCell>
                                                <TableCell align="center">Country</TableCell>
                                                <TableCell align="center">Phone</TableCell>
                                                <TableCell align="center">Email</TableCell>
                                                <TableCell align="center">Website</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {directorDetails.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{row.name}</TableCell>
                                                    <TableCell align="center">{row.country_id}</TableCell>
                                                    <TableCell align="center">{row.phone}</TableCell>
                                                    <TableCell align="center">{row.email}</TableCell>
                                                    <TableCell align="center">{row.website}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </Container>
                </AccordionDetails>
            </Accordion>

            {/* Accordion for Document's */}
            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
                    <button onClick={() => handleRedirectStep(1)} style={{ background: 'transparent', border: 'none', marginRight: '20px', color: '#1976d2' }}>
                        <BorderColorTwoToneIcon />
                    </button>
                    Document's
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth="lg">
                        <div className="row">
                            <div class="col-md-12">
                                <p><span className="titleoffield">Synopsis Of The Web-Series(Precise, Not Exceeding 200 words) :  </span><span className="inputoffield"> {!(formData?.documentData?.[1]) ? <></> : (
                                    < span className="Attach_Photo_ID aline-item-right">
                                        <a href={`${GLOBAL_URL}downloadfile/ott/${formData.id}/${formData?.documentData?.[1].file}`}>
                                            <span><FileDownloadIcon />  </span>   {formData?.documentData?.[1].name}
                                        </a>
                                    </span>
                                )}</span> </p>
                            </div>
                            <div class="col-md-12">
                                <p><span className="titleoffield">Synopsis Of The Web-Series(Precise, Not Exceeding 200 words) :  </span><span className="inputoffield"> {!(formData?.documentData?.[2]) ? <></> : (
                                    < span className="Attach_Photo_ID aline-item-right">
                                        <a href={`${GLOBAL_URL}downloadfile/ott/${formData.id}/${formData?.documentData?.[2].file}`}>
                                            <span><FileDownloadIcon />  </span>   {formData?.documentData?.[2].name}
                                        </a>
                                    </span>
                                )}</span> </p>
                            </div>
                            <div class="col-md-12">
                                <p><span className="titleoffield">Synopsis Of The Web-Series(Precise, Not Exceeding 200 words) :  </span><span className="inputoffield"> {!(formData?.documentData?.[3]) ? <></> : (
                                    < span className="Attach_Photo_ID aline-item-right">
                                        <a href={`${GLOBAL_URL}downloadfile/ott/${formData.id}/${formData?.documentData?.[3].file}`}>
                                            <span><FileDownloadIcon />  </span>   {formData?.documentData?.[3].name}
                                        </a>
                                    </span>
                                )}</span> </p>
                            </div>
                            <div class="col-md-12">
                                <p><span className="titleoffield">Synopsis Of The Web-Series(Precise, Not Exceeding 200 words) :  </span><span className="inputoffield"> {!(formData?.documentData?.[4]) ? <></> : (
                                    < span className="Attach_Photo_ID aline-item-right">
                                        <a href={`${GLOBAL_URL}downloadfile/ott/${formData.id}/${formData?.documentData?.[4].file}`}>
                                            <span><FileDownloadIcon />  </span>   {formData?.documentData?.[4].name}
                                        </a>
                                    </span>
                                )}</span> </p>
                            </div>
                        </div>
                    </Container>
                </AccordionDetails>
            </Accordion>

        </div >
    );
}

export default OttView;
