import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import '../Preview/preview.css';
import { convertDate } from '../../Helper';
import { GLOBAL_URL } from '../../../API/global';
import MenuItem from "@mui/material/MenuItem";
import { getRequestGlobal } from "../../../API/global"
import { getRequest, postRequest } from '../../../API/IP';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteDialog from '../DeleteDialog';
import edit_button from "../../../images/edit.png"


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const style = {
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: 'auto',
    p: 4,
};

const Preview = ({ formData, setActiveStep }) => {

    const [language, setLanguage] = useState({});
    const [errorsCoProducer, setErrorsCoProducer] = useState({});
    const [CoProduceropen, setCoProducerOpen] = React.useState(false);
    const [selectedPassportFile, setSelectedPassportFile] = useState(null);
    const [country, setCountry] = React.useState('');
    const [indianEntity, setIndianEntity] = React.useState(false);
    const [selectedGovtFile, setSelectedGovtFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [prepareDelete, setPrepareDelete] = useState(null);

    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

    const handleCoProducerChange = (event) => {
        const { name, value, files } = event.target;
        if (files) {
            setCoProducerFormData((prevState) => ({
                ...prevState,
                [name]: files[0],
                ip_application_form_id: formData.id
            }));
            errorsCoProducer[name] = ""
            setErrorsCoProducer(errorsCoProducer);

            setSelectedFile(files[0]);
        } else {
            setCoProducerFormData((prevState) => ({
                ...prevState,
                [name]: value,
                ip_application_form_id: formData.id
            }));
            errorsCoProducer[name] = ""
            setErrorsCoProducer(errorsCoProducer);
        }
    };

    const handleIndianEntityChange = (e) => {
        const { name, value } = e.target;
        console.log(value);

        if (value == 1) {
            setIndianEntity(1)
        } else {
            setIndianEntity(2)
        }
        setCoProducerFormData({
            ...coProducerformData,
            [name]: parseInt(value),
            ip_application_form_id: formData.id
        });
        errorsCoProducer[name] = ""
        setErrorsCoProducer(errorsCoProducer);
    }

    const handleGovtFileChange = (event) => {
        setSelectedGovtFile(event.target.files[0]);
        const file = event.target.files[0];
        // Do something with the uploaded file
        console.log(file, "file");
        setCoProducerFormData((prevState) => ({
            ...prevState,
            co_producer_id_proof: file,
            is_gov_id_proof: true
        }));

    };

    const handlePassportFileChange = (event) => {
        setSelectedPassportFile(event.target.files[0]);
        const file = event.target.files[0];
        // Do something with the uploaded file
        console.log(file);
        console.log("Selected Director file:", selectedPassportFile);
        setCoProducerFormData((prevState) => ({
            ...prevState,
            passport_image: file,
            is_passport_image: file,
        }));
        // const formDataToSubmit = new FormData();
        // formDataToSubmit.append('director_id_proof', formData.director_id_proof);
        // You can use FormData API to send the file to the server via fetch or Axios
        // For example:
        // const formData = new FormData();
        // formData.append('file', selectedFile);
        // Then use fetch or Axios to send formData to your backend
    };

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
    const handleDelete = async (e) => {
        e.preventDefault();

        await postRequest('ip_co_producers/delete', { co_producer_id: prepareDelete, ip_application_form_id: id });
        setOpenDeleteConfirm(false);
        alert("Co producer deleted successfully.");
        await loadpreData()
    };




    const { id = null } = useParams();
    console.log({ id });

    const [preData, setPredata] = useState([]);
    const [coProducerformData, setCoProducerFormData] = useState({
        co_producer_is: '',
        name: '',
        email: '',
        landline: '',
        mobile: '',
        website: '',
        address: '',
        is_indian_entity: '',
        nationality: '',
        producer_address: '',
        co_producer_id_proof: '',
        passport_image: '',
        is_gov_id_proof: '',
        is_passport_image: '',
        ip_application_form_id: id,

    });

    useEffect(() => {
        loadpreData();
        getRequestGlobal('language_list', {})
            .then((data) => {
                console.log(data.data)
                setLanguage(data.data);
            })
            .catch((error) => {
            });
    }, []);

    const loadpreData = async () => {
        const predata = await postRequest('ip_co_producers/list', { ip_application_form_id: id });
        if (predata?.data)
            setPredata(predata?.data);
    }

    const handleRedirectStep = (value) => {

        setActiveStep(value)
    }



    return (
        <>
            {/* Film Details Page */}
            <div class="container mt-5">
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">

                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#filmdetails" aria-expanded="true" aria-controls="collapseOne">
                                Film Details
                                <button onClick={() => handleRedirectStep(0)} style={{ background: 'transparent', border: 'none', padding: "10px 15px 10px 15px" }}>
                                    <img src={edit_button} alt='' width="25px" height="25px" />
                                </button>
                            </button>
                        </h2>
                        <div id="filmdetails" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div class="row">

                                    <div class="col-md-6">
                                        <p ><span className="titleoffield">Category Of The Film:</span><span className="inputoffield"> {formData.category == 1 ? "Featured Film" : "Non-featured Film"}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p ><span className="titleoffield">Title of the film in Roman Script:</span><span className="inputoffield"> {formData.title_of_film_in_devanagari}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p ><span className="titleoffield">Title of the film in Devanagari: </span><span className="inputoffield"> {formData.title_of_film_in_devanagari}</span> </p>

                                    </div>
                                    <div class="col-md-6">
                                        <p ><span className="titleoffield">English translation of the film:</span><span className="inputoffield"> {formData.english_translation_of_film}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p ><span className="titleoffield">Title of the film in the script of the language of the Film:</span><span className="inputoffield"> {formData.title_of_script_langauge}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p ><span className="titleoffield">Language of the Film</span><span className="inputoffield"> :
                                            {(formData.language_id) ? (

                                                language?.[formData.language_id] ? language[formData.language_id] : ''
                                            ) : "data1"}



                                        </span>
                                        </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p ><span className="titleoffield">Wheather Subtitle in english</span><span className="inputoffield"> :{formData.whether_subtitle_english ? "Yes" : "No"}</span> </p>
                                    </div>
                                    <h5>Format of the submitted Film</h5>
                                    <div class="col-md-6">
                                        <p ><span className="titleoffield">Feature Film</span><span className="inputoffield"> :{formData.dcp == 1 ? "DCP" : formData.dcp == 2 ? "Blueray" : formData.dcp == 3 ? "Pendrive" : ""}
                                        </span> </p>
                                    </div>

                                    {(formData.dcp == 1) ?

                                        <>
                                            <div class="col-md-6">
                                                <p ><span className="titleoffield">DCI Compliant JPEG2000 (J2K) Interop or SMPTE DCP (Note: J2K Interop DCP to be only in 24 fps)</span><span className="inputoffield"> :{formData.dci_compliant_jpeg_2000}</span> </p>
                                            </div>
                                            <div class="col-md-6">
                                                <p ><span className="titleoffield">The subtitles to be burned in the picture or in TI CineCanvas™ Format</span><span className="inputoffield"> :{formData.subtitle_to_be_burned_in_picture}</span> </p>
                                            </div>
                                            <div class="col-md-6">
                                                <p ><span className="titleoffield">The DCP should be preferably sent in CRU Hard Disk</span><span className="inputoffield"> :{formData.dcp_should_cru_hard_disk}</span> </p>
                                            </div>
                                            <div class="col-md-6">
                                                <p ><span className="titleoffield">The Hard Disk partition format shall be NTFS or EXT2/EXT3 (with Inode size 128 bytes)</span><span className="inputoffield"> :{formData.hard_disk_format_ext2_ext3}</span> </p>
                                            </div>

                                            <div class="col-md-6">
                                                <p ><span className="titleoffield">Is the DCP Unencrypted?</span><span className="inputoffield"> :{formData.is_dcp_unencrypted}</span> </p>
                                            </div>
                                        </> : <></>}

                                    {(formData.dcp == 2) ? <> <div class="col-md-6">
                                        <p><span className="titleoffield">Is the Blueray region free PAL?</span><span className="inputoffield"> :{formData.blueray_region_free_pal ? "Yes" : "No"}</span> </p>
                                    </div></> : <></>}

                                    <div class="col-md-6">
                                        <p>
                                            <span className='titleoffield'>{(formData.category == 2 ? 'Value of the DCP/Bluray/Pendrive' : 'Value of the DCP/Bluray')}
                                                <span className='inputoffield'>:{formData.value_of_dcp_or_blueray}</span>
                                            </span>
                                        </p>
                                    </div>
                                    {/* <div class="col-md-6">
                                        {formData.pendrive}
                                    </div>
                                    <div class="col-md-6">
                                        {formData.is_pendrive_containing_hd_files}
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#producer-information" aria-expanded="false" aria-controls="collapseTwo">
                                Producer Information
                                <button onClick={() => handleRedirectStep(1)} style={{ background: 'transparent', border: 'none', padding: "10px 15px 10px 15px" }}>
                                    <img src={edit_button} alt='' width="25px" height="25px" />
                                </button>
                            </button>
                        </h2>
                        <div id="producer-information" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div class="row">

                                    <h6>Producer's Information</h6>

                                    <div class="col-md-6">
                                        <p ><span className="titleoffield">Wheather Producer is:</span><span className="inputoffield">  {formData.producer_is ? "Individual" : "Company/Institute/Other Such Entity"}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Wheather any proprietor firm is owned by the individual making entry:</span><span className="inputoffield">  {formData.firm_is_owned_by_individual ? "Yes" : "No"}</span> </p>
                                    </div>

                                    {(formData.producer_is == 1 && formData.firm_is_owned_by_individual == 1) ?
                                        <>
                                            <div class="col-md-6">
                                                <p><span className="titleoffield">Name of the firm:</span><span className="inputoffield">  {formData.name_of_firm}</span> </p>
                                            </div>
                                        </>
                                        :
                                        ((formData.producer_is == 1 && (formData.firm_is_owned_by_individual == 0 || formData.firm_is_owned_by_individual == 1)) ?
                                            <>
                                                <div class="col-md-6">
                                                    <p><span className="titleoffield">Name of the producer making the entry:</span><span className="inputoffield">  {formData.name_of_the_producer_making_entry}</span> </p>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div class="col-md-6">
                                                    <p><span className="titleoffield">Name of the production house:</span><span className="inputoffield">  {formData.name_of_production_house}</span> </p>
                                                </div>
                                            </>
                                        )}





                                    <div class="col-md-6">
                                        <p><span className="titleoffield">E-mail:</span><span className="inputoffield">  {formData.name_of_production_house}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Address:</span><span className="inputoffield">  {formData.producer_address}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Landline:</span><span className="inputoffield">  {formData.producer_landline}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Mobile:</span><span className="inputoffield">  {formData.producer_mobile}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Website:</span><span className="inputoffield">  {formData.producer_website}</span> </p>
                                    </div>
                                    <div class="col-md-6">

                                        <p><span className="titleoffield">Wheather Company is Registered as an Indian entity.*Public Ltd./Private Ltd./Partnership/Proprietorship or Wheather Indian national (as per the clause number 2(d)):</span><span className="inputoffield">  {formData.company_is_registered_as_indian_entity ? "Yes" : "No"}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Is the address same as Producer ?:</span><span className="inputoffield">  {formData.is_address_same_as_producer ? "Yes" : "No"}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Upload Your File in PDF Format Only:</span><span className="inputoffield">  {!(formData?.documentData?.[1]) ? <></> : (
                                            <div>
                                                <span className="Attach_Photo_ID">
                                                    <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[1].file}`}>{formData?.documentData?.[1].name}</a>
                                                </span>
                                            </div>
                                        )}</span> </p>
                                    </div>

                                    <div class="col-md-6">

                                        {formData.return_address_name ? <> <p><span className="titleoffield">Name:</span><span className="inputoffield">  {formData.return_address_name}</span> </p></> : <></>}

                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Landline:</span><span className="inputoffield">  {formData.return_address_landline}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Mobile:</span><span className="inputoffield">  {formData.return_address_mobile}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        {formData.return_address_fax ? <><p><span className="titleoffield">Fax Number:</span><span className="inputoffield">  {formData.return_address_fax}</span> </p></> : <></>}

                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Return Address:</span><span className="inputoffield">  {formData.return_address}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Whether the Indian and Foreign right holder is same:</span><span className="inputoffield">  {formData.whether_indian_foreign_right_holder_same ? "Yes" : "No"}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        {formData.right_holder_name ? <><p><span className="titleoffield">Right Holder Name:</span><span className="inputoffield">  {formData.right_holder_name}</span> </p></> : <></>}

                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Right Holder Email:</span><span className="inputoffield">  {formData.right_holder_email}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Right Holder Landline:</span><span className="inputoffield">  {formData.right_holder_landline}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Right Holder Mobile:</span><span className="inputoffield">  {formData.right_holder_mobile}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        {formData.right_holder_fax ? <><p><span className="titleoffield">Right Holder Fax:</span><span className="inputoffield">  {formData.right_holder_fax}</span> </p></> : <></>}

                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Right Holder Address:</span><span className="inputoffield">  {formData.right_holder_address}</span> </p>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-12 col-lg-12'>
                                        </div>
                                    </div>
                                    {
                                        preData.map((item, index) => (
                                            <div className='col-md-6'>
                                                <div className="card" style={{ width: "100%" }}>
                                                    <div className="card-body">
                                                        <p><span className="titleoffield">Co Producer Details</span>
                                                        </p>
                                                        <p><span className="titleoffield">Whether Co-producer is :</span><span className="inputoffield"> {(item.co_producer_is == 1) ? 'Invidual' : 'Company / Institute /Other such entity'}</span> </p>
                                                        <p><span className="titleoffield">Name :</span><span className="inputoffield"> {item.name}</span> </p>
                                                        <p><span className="titleoffield">Email :</span><span className="inputoffield"> {item.email}</span> </p>
                                                        <p><span className="titleoffield">Landline </span><span className="inputoffield"> {item.landline}</span> </p>
                                                        <p><span className="titleoffield">Mobile :</span><span className="inputoffield"> {item.mobile}</span> </p>
                                                        <p><span className="titleoffield">Website :</span><span className="inputoffield"> {item.website}</span> </p>
                                                        <p className="card-text"><span className="titleoffield">Address:-</span><span className="inputoffield"> {item.address}</span> </p>

                                                        <p><span className="titleoffield">Wheather the company(s) is registered as an Indian Entity,
                                                            Mention(In accordance with cause 6.2.2) </span><span className="inputoffield"> {(item.co_producer_is == 1) ? 'Yes' : 'No'}</span> </p>
                                                        {
                                                            (item.co_producer_is == 1) ?
                                                                <p><span className="titleoffield">Attach Photo ID issued by Govt. of India (for Indian National) </span><span className="inputoffield">  <a href={`${GLOBAL_URL}downloadfile/IP/${item.ip_application_form_id}/${item.file}`}>{item.documents_name}</a></span> </p> :
                                                                <p><span className="titleoffield">Attach copy of Passport </span><span className="inputoffield">  <a href={item.file}>{item.documents_name}</a></span> </p>
                                                        }

                                                        <p><span className="titleoffield">Registration Details :</span><span className="inputoffield"> {item.registration_details}</span> </p>

                                                        <p><span className="titleoffield">The name of the Producer along with Co-Producers(s), if any who is to be credited in the Certificate :
                                                        </span><span className="inputoffield">  {item.name_of_producers}</span> </p>


                                                    </div>
                                                </div>

                                            </div>

                                        ))}




                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#DirectorDetails" aria-expanded="false" aria-controls="collapseThree">
                                Director Details
                                <button onClick={() => handleRedirectStep(2)} style={{ background: 'transparent', border: 'none', padding: "10px 15px 10px 15px" }}>
                                    <img src={edit_button} alt='' width="25px" height="25px" />
                                </button>
                            </button>
                        </h2>
                        <div id="DirectorDetails" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div className='row'>
                                    <h6>Director's Details<span className='text-danger'>*</span></h6>
                                    <div class="col-md-6">

                                        <p><span className="titleoffield">Name:</span><span className="inputoffield">  {formData.director_name}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Email Id:</span><span className="inputoffield">  {formData.director_email}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Landline:</span><span className="inputoffield">  {formData.director_landline}</span> </p>
                                    </div>
                                    <div class="col-md-6">

                                        <p><span className="titleoffield">Mobile:</span><span className="inputoffield">  {formData.director_mobile}</span> </p>
                                    </div>
                                    <div class="col-md-6">

                                        <p><span className="titleoffield">Fax No:</span><span className="inputoffield">  {formData.director_fax}</span> </p>
                                    </div>
                                    <div class="col-md-6">

                                        <p><span className="titleoffield">Website:</span><span className="inputoffield">  {formData.director_website}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Address:</span><span className="inputoffield">  {formData.director_address}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Indian National:</span><span className="inputoffield">  {formData.director_indian_natinality ? "Yes" : "No"}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Upload Your File in PDF Format Only:</span><span className="inputoffield"> {!(formData?.documentData?.[2]) ? <></> : (
                                            <div>
                                                <span className="Attach_Photo_ID">
                                                    <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[2].file}`}>{formData?.documentData?.[2].name}</a>
                                                </span>
                                            </div>
                                        )}</span> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#CrewDetails" aria-expanded="false" aria-controls="collapseThree">
                                Crew Details
                                <button onClick={() => handleRedirectStep(3)} style={{ background: 'transparent', border: 'none', padding: "10px 15px 10px 15px" }}>

                                    <img src={edit_button} alt='' width="25px" height="25px" />
                                </button>
                            </button>
                        </h2>
                        <div id="CrewDetails" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#DirectorDetails">
                            <div class="accordion-body">
                                <div className='row'>
                                    <div class="col-md-6">

                                        <p><span className="titleoffield">Story writer/ Author:</span><span className="inputoffield">  {formData.story_write_aurthor}</span> </p>
                                    </div>
                                    <div class="col-md-6">

                                        <p><span className="titleoffield">Screenplay/ Script writer:</span><span className="inputoffield">  {formData.screenplay_script_write}</span> </p>
                                    </div>
                                    <div class="col-md-6">

                                        <p><span className="titleoffield">Director of photography:</span><span className="inputoffield">  {formData.director_of_photography}</span> </p>
                                    </div>
                                    <div class="col-md-6">


                                        <p><span className="titleoffield">Editor:</span><span className="inputoffield">  {formData.editor}</span> </p>
                                    </div>
                                    <div class="col-md-6">

                                        <p><span className="titleoffield">Art Director:</span><span className="inputoffield">  {formData.art_director}</span> </p>
                                    </div>
                                    <div class="col-md-6">

                                        <p><span className="titleoffield">Costume Designer:</span><span className="inputoffield">  {formData.costume_designer}</span> </p>
                                    </div>
                                    <div class="col-md-6">

                                        <p><span className="titleoffield">Music Director:</span><span className="inputoffield">  {formData.music_director}</span> </p>
                                    </div>
                                    <div class="col-md-6">

                                        <p><span className="titleoffield">(A) Sound Recordist:</span><span className="inputoffield">  {formData.sound_recordist}</span> </p>
                                    </div>
                                    <div class="col-md-6">

                                        <p><span className="titleoffield">(B) Sound Re-recordist (Optional):</span><span className="inputoffield">  {formData.sound_re_recordist}</span> </p>
                                    </div>

                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Principal Cast:</span><span className="inputoffield">  {formData.principal_cast}</span> </p>
                                    </div>

                                    <div class="col-md-6">

                                        <p><span className="titleoffield">Duration/Running time (in minutes):</span><span className="inputoffield">  {formData.duration_running_time}</span> </p>
                                    </div>
                                    <div class="col-md-6">

                                        <p><span className="titleoffield">No. of DCP/Bluray (Optional):</span><span className="inputoffield">  {formData.duration_running_time}</span> </p>
                                    </div>
                                    <div class="col-md-6">

                                        <p><span className="titleoffield">Colour or B&W:</span><span className="inputoffield">  {formData.color_b_w}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Sound System: Optical Mono /Dolby/ DTS/Atmos or others:</span><span className="inputoffield">  {formData.sound_system}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Aspect Ratio:</span><span className="inputoffield">  {formData.aspect_ratio}</span> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#CBFCCertification" aria-expanded="false" aria-controls="collapseThree">
                                CBFC Certification
                                <button onClick={() => handleRedirectStep(4)} style={{ background: 'transparent', border: 'none', padding: "10px 15px 10px 15px" }}>

                                    <img src={edit_button} alt='' width="25px" height="25px" />
                                </button>
                            </button>
                        </h2>
                        <div id="CBFCCertification" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div className='row'>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">Wheather the film is certified by CBFC or uncensored:</span><span className="inputoffield">  {formData.film_is_certified_by_cbfc_or_uncensored ? "Certified by CBFC" : "Uncensored"}</span> </p>
                                    </div>
                                    {formData.film_is_certified_by_cbfc_or_uncensored ?
                                        <>

                                            <div class="col-md-6">
                                                <p><span className="titleoffield">Date of CBFC certificate:</span><span className="inputoffield">{convertDate(formData.date_of_cbfc_certificate)}</span> </p>
                                            </div>

                                            <div class="col-md-6">
                                                <p><span className="titleoffield">Certification No:</span><span className="inputoffield"> {formData.certificate_no}</span> </p>
                                            </div>

                                            <div className='col-md-6'>
                                                <p><span className="titleoffield">Attach Copy Of CBFC Certificate:</span><span className="inputoffield">{!(formData?.documentData?.[4]) ? <></> : (
                                                    <div>
                                                        <span className="Attach_Photo_ID">
                                                            <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[4].file}`}>{formData?.documentData?.[4].name}</a>
                                                        </span>
                                                    </div>
                                                )}</span>
                                                </p>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div class="col-md-6">
                                                <p><span className="titleoffield">Date of Completion of Production:</span><span className="inputoffield">{convertDate(formData.date_of_completion_production)}</span> </p>
                                            </div>

                                            <div class="col-md-6">
                                                <p>
                                                    <span className="titleoffield">Attach Copy Of Declaration As per Clause (7.2(C)):</span><span className="inputoffield">
                                                        {!(formData?.documentData?.[3]) ? <></> : (
                                                            <div>
                                                                <span className="Attach_Photo_ID">
                                                                    <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[3].file}`}>{formData?.documentData?.[3].name}</a>
                                                                </span>
                                                            </div>
                                                        )}
                                                    </span>
                                                </p>
                                            </div>
                                        </>
                                    }







                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#OtherDetails" aria-expanded="false" aria-controls="collapseThree">
                                Other Details
                                <button onClick={() => handleRedirectStep(5)} style={{ background: 'transparent', border: 'none', padding: "10px 15px 10px 15px" }}>
                                    <img src={edit_button} alt='' width="25px" height="25px" />
                                </button>
                            </button>
                        </h2>
                        <div id="OtherDetails" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div class="col-md-6">
                                    <p><span className="titleoffield">Wheather the Film has been completed during the last 12 months preceding the festival i.e 1st August, 2023 to 31st July, 2024:</span><span className="inputoffield">  {formData.film_comletion_during_12month ? "Yes" : "No"}</span> </p>
                                </div>
                                <div class="col-md-6">

                                    <p><span className="titleoffield">Wheather the Film has been screened in any Indian or International Film Festival:</span><span className="inputoffield">  {formData.film_screened ? "Yes" : "No"}</span> </p>
                                </div>

                                {(formData.film_screened == 1)
                                    ?
                                    <>
                                        <div class="col-md-6">
                                            <p><span className="titleoffield">Name of the festival:</span><span className="inputoffield">  {formData.name_of_festival}</span> </p>
                                        </div>
                                        <div class="col-md-6">
                                            <p><span className="titleoffield">Address of the Festival:</span><span className="inputoffield">  {formData.address_of_festival}</span> </p>
                                        </div>
                                        <div class="col-md-6">
                                            <p><span className="titleoffield">Date of Festival:</span><span className="inputoffield">{convertDate(formData.date_of_festival)}</span> </p>
                                        </div>
                                    </>
                                    :
                                    <>
                                    </>}


                                <div class="col-md-6">

                                    <p><span className="titleoffield">Wheather Film has been shown/broadcasted on the Internet/TV or other media:</span><span className="inputoffield">{formData.film_broadcast_tv ? "Yes" : "No"}</span> </p>
                                </div>
                                <div class="col-md-6">
                                    <p><span className="titleoffield">Wheather Film has been screened commercially inside India:</span><span className="inputoffield">{formData.film_screened_inside_india ? "Yes" : "No"}</span> </p>
                                </div>

                                {formData.film_screened_inside_india == 1 ?

                                    <>
                                        <div class="col-md-6">
                                            <p><span className="titleoffield">Date of release India:</span><span className="inputoffield">{formData.date_of_release_india}</span> </p>
                                        </div>
                                    </>
                                    :

                                    <></>}

                                <div class="col-md-6">

                                    <p><span className="titleoffield">Wheather Film has been screened commercially outside India:</span><span className="inputoffield">{formData.film_screened_outside_india ? "Yes" : "No"}</span> </p>
                                </div>

                                {formData.film_screened_outside_india == 1 ?

                                    <>
                                        <div class="col-md-6">
                                            <p><span className="titleoffield">Name of the country:</span><span className="inputoffield">{formData.name_of_country}</span> </p>
                                        </div>

                                        <div class="col-md-6">
                                            <p><span className="titleoffield">Date of release outside:</span><span className="inputoffield">{formData.date_of_release_outside}</span> </p>
                                        </div>
                                    </>
                                    :
                                    <>
                                    </>}


                                <div class="col-md-6">
                                    <p><span className="titleoffield">Wheather Film has participated in any International Competition:</span><span className="inputoffield">{formData.film_participated_compentitaion ? "Yes" : "No"}</span> </p>
                                </div>

                                {formData.film_participated_compentitaion == 1 ?
                                    <>
                                        <div class="col-md-6">
                                            <p><span className="titleoffield">Name of the festival:</span><span className="inputoffield">{formData.name_of_compentitaion_festival}</span> </p>
                                        </div>
                                    </>
                                    :
                                    <>

                                    </>
                                }



                                <div class="col-md-6">

                                    <p><span className="titleoffield">Wheather, it is Director's Debut Film:</span><span className="inputoffield">{formData.is_directore_debute_film ? "Yes" : "No"}</span> </p>

                                </div>
                                <div class="col-md-6">
                                    <p><span className="titleoffield">Wheather Film's distribution is limited to india only:</span><span className="inputoffield">{formData.film_distribution_limited_to_india_only ? "Yes" : "No"}</span> </p>
                                </div>
                                <div class="col-md-6">
                                    <p><span className="titleoffield">Details of the Awards won(if any):</span><span className="inputoffield">{formData.details_of_awards_won_if_any}</span> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Documents" aria-expanded="false" aria-controls="collapseThree">
                                Documents
                                <button onClick={() => handleRedirectStep(6)} style={{ background: 'transparent', border: 'none', padding: "10px 15px 10px 15px" }}>
                                    <img src={edit_button} alt='' width="25px" height="25px" />
                                </button>
                            </button>
                        </h2>
                        <div id="Documents" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div className='row'>

                                    <div className='col-md-6'>
                                        <p><span className="titleoffield">(A) Authorisation Letter in Favour Of NFDC(FORM I.P.-11) in PDF:</span><span className="inputoffield"> {!(formData?.documentData?.[5]) ? <></> : (
                                            <div>
                                                <span className="Attach_Photo_ID">
                                                    <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[5].file}`}>{formData?.documentData?.[5].name}</a>
                                                </span>
                                            </div>
                                        )}</span> </p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p><span className="titleoffield">(B) Declaration Letter (As Per The Clause No 7.2(C)) in PDF:</span><span className="inputoffield"> {!(formData?.documentData?.[6]) ? <></> : (
                                            <div>
                                                <span className="Attach_Photo_ID">
                                                    <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[6].file}`}>{formData?.documentData?.[6].name}</a>
                                                </span>
                                            </div>
                                        )}</span> </p>

                                    </div>
                                    <div className='col-md-6'>
                                        <p><span className="titleoffield">(C) Synopsis in English (Not Exceeding 200 Words) In PDF:</span><span className="inputoffield"> {!(formData?.documentData?.[7]) ? <></> : (
                                            <div>
                                                <span className="Attach_Photo_ID">
                                                    <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[7].file}`}>{formData?.documentData?.[7].name}</a>
                                                </span>
                                            </div>
                                        )}</span> </p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p><span className="titleoffield">(D) Director's Profile (Not Exceeding 100 words) & Note (Not Exceeding 30 words) In Doc Format:</span><span className="inputoffield">{!(formData?.documentData?.[8]) ? <></> : (
                                            <div>
                                                <span className="Attach_Photo_ID">
                                                    <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[8].file}`}>{formData?.documentData?.[8].name}</a>
                                                </span>
                                            </div>
                                        )}</span> </p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p><span className="titleoffield">(E) Producer's Profile(Not Exceeding 100 words) In.Doc Format:</span><span className="inputoffield"> {!(formData?.documentData?.[9]) ? <></> : (
                                            <div>
                                                <span className="Attach_Photo_ID">
                                                    <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[9].file}`}>{formData?.documentData?.[9].name}</a>
                                                </span>
                                            </div>
                                        )}</span> </p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p><span className="titleoffield">(F) Details Of Cast & Crew In.Doc Format:</span><span className="inputoffield"> {!(formData?.documentData?.[10]) ? <></> : (
                                            <div>
                                                <span className="Attach_Photo_ID">
                                                    <a href={`${GLOBAL_URL}downloadfile/IP/${formData.id}/${formData?.documentData?.[10].file}`}>{formData?.documentData?.[10].name}</a>
                                                </span>
                                            </div>
                                        )}</span> </p>
                                    </div>
                                    <div class="col-md-6">
                                        <p><span className="titleoffield">d.Wheather the requisite documents(s) at serial alphabet (a),(b),(c) are sent by email:</span><span className="inputoffield">{formData.requisite_documents ? "Yes" : "No"}</span> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {/* 
            <div class="row">
                <div class="col-md-6">
                    {formData.payment_status}
                </div>
            </div> */}
        </>
    )
}

export default Preview