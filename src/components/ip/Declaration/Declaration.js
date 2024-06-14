import React, { useEffect, useState } from 'react'
import ApiClient from '../../common/ApiClient';
import { useLocation, useParams } from 'react-router-dom';


import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AlertMessage from '../../AlertMessage';


import Success from "../../../images/Success.png"
import Failure from "../../../images/Failure.png"
import Pending from "../../../images/Pending.png"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Declaration = ({ formData}) => {
    
    const { id = null, response = null } = useParams();


    const { putRequest, getRequest, deleteRequest } = ApiClient();

    const [paymentMessage, setPaymentMessage] = useState('');
    const [paymentResponse, setPaymentResponse] = useState(response);
    const [alertData, setAlertData] = useState({
        heading: "",
        content: ""
    });
    const generatePaymentMsg = async () => {

        const predata = await putRequest('go_to_payment', { last_id: id });

        if (predata.status) {
            console.log(predata.data.msg)
            setPaymentMessage(predata.data.msg);
        }
        //  console.log({ paymentMessage });
    }
    const search = useLocation().search;
    const daata = new URLSearchParams(search).get("response");

    const paymentResponseLastTransation = async () => {


        if (daata === 'pending') {
            setAlertData({
                heading: "Payment Status",
                content: (<>
                    <p style={{ display: "flex", justifyContent: "center" }}><img src={Pending} alt='' width="60px" height="60px" /> </p>
                    <h4 style={{ display: 'flex', justifyContent: "center" }}>Transaction Pending</h4>
                    <Typography gutterBottom >
                        <p style={{ textAlign: "center", marginTop: "10px" }} className='text-center'> Your transaction is currently in pending. We're working to process it as quickly as possible. Thanks for your patience! </p>
                    </Typography>
                </>)
            });
            handleClickOpen();
        }
        if (daata === 'failed') {
            setAlertData({
                heading: "Payment Status",
                content: (<>
                    <p style={{ display: "flex", justifyContent: "center" }}><img src={Failure} alt='' width="78px" height="78px" /> </p>
                    <h4 style={{ display: 'flex', justifyContent: "center" }}>Payment Failed</h4>
                    <Typography gutterBottom >
                        <p style={{ textAlign: "center", marginTop: "10px" }} className='text-center'> We regret to inform you that your payment has failed to process. Please review your payment details and try again. </p>
                    </Typography>
                </>)
            });
            handleClickOpen();
        }

    }
    useEffect(() => {
        paymentResponseLastTransation()
        generatePaymentMsg();
        // Load BillDesk script dynamically
        const script = document.createElement('script');
        script.src = 'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js';
        script.async = true;
        script.onload = () => {
            // Script has been loaded, now you can use bdPayment
            console.log('BillDesk script loaded');
        };
        document.body.appendChild(script);

        // Cleanup function
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    const processToPay = async () => {
        // console.log({ SERVER_URL: process.env.REACT_APP_BASE_URL });

        if (window.bdPayment) {
            console.log('Pay Msg : : ', paymentMessage);
            window.bdPayment.initialize({
                "msg": paymentMessage,//"NFDCLTD|NFAI-FCM-64|NA|1770.00|NA|NA|NA|INR|NA|R|nfdcltd|NA|NA|F|abhisheksrivastava0022@gmail.com|7985430710|NFAI|Abhishek Srivastava|NFAI-FCM-64|NA|NA|NA|4449748D363C5227F532121F004C3CFBD09F9AEBCCCE7334F7C5FB61F77E2821",
                "options": {
                    "enableChildWindowPosting": true,
                    "enablePaymentRetry": true,
                    "retry_attempt_count": 2
                },
                "callbackUrl": `${process.env.REACT_APP_BASE_URL}/payment-response`
            });
        } else {
            console.error('BillDesk script not loaded yet');
        }
    }

    const fetchPaymentStatus = async () => {
        try {
            // const response = await axios.get('http://localhost:3001/api/payment/status'); // Your endpoint to check payment status
            //setPaymentStatus(response.data);
        } catch (error) {
            console.error('Error fetching payment status:', error);
        }
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log("handleClickOpen");
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <h5>Declaration <span className='text-danger'>*</span></h5>
            <form>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12 col-lg-4'>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" style={{ backgroundColor: '#AD4172' }} />
                                <label class="form-check-label" for="flexCheckChecked">
                                    <p className='text-capitalize' style={{ color: "#3E393A" }}>I/We Have No Objection For Screening of this film for Jury Or any of their Panels, for non-commercial public shows of the film as part of promotion of quality Indian Cinema within India and abroad in festivals/ Special expositions organized/ Supported By the National Film Development Corporation In Any digital format. As well as promotion of the film through the use of film Stills/Posters and Trailers/ Visual Clips. I/We also assure that this no objection for the NFDC will remain valid notwithstanding any rights assigned by Me/Us to any other individual/Organization For screening the Film in any Territory on Commercial/non-Commercial Basis in Future </p>
                                </label>
                            </div>
                        </div>
                        <div className='col-sm-12 col-lg-4'>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" style={{ backgroundColor: '#AD4172' }} />
                                <label class="form-check-label" for="flexCheckChecked">
                                    <p className='text-capitalize' style={{ color: "#3E393A" }}>I/We Declare that I/We Have read the Indian Panorama Regulations And Accept them without reservation. In particular, I/We note the condition of regulations 7.8 Stipulating that My/Our entry form along with all the required material including the DCP/Bluray or DV Cam is Received By The National Film Development Corporation on or before 18.08.2023</p>
                                </label>
                            </div>
                        </div>
                        <div className='col-sm-12 col-lg-4'>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" style={{ backgroundColor: '#AD4172' }} />
                                <label class="form-check-label" for="flexCheckChecked">
                                    <p className='text-capitalize' style={{ color: "#3E393A" }}>I/We certify that the film entered is not a Dubbed/Revised/Remake/ Re-edited version of a film and has not been submitted earlier.</p>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-lg-12'>
                        <h5>Entry Fees:  {formData.category == 1 ? <span style={{ color: "#973A64", fontSize: "28px", fontWeight: "500" }}>INR 11800/-</span> : <span style={{ color: "#973A64", fontSize: "28px", fontWeight: "500" }}>INR 3540/-</span> }
                            {/* <span style={{ color: "#973A64", fontSize: "28px", fontWeight: "500" }}>INR 11800/-</span> */} 
                        </h5>
                    </div>
                </div>

                {/* <div className='row'>
                    <div className='col-sm-12 col-lg-12'>
                        <p className='text-capitalize' style={{ color: "#615A5B" }}>Payment Mode<span className='text-danger'>*</span></p>
                    </div>
                </div> */}
                {/* <div className='row'>
                    <div className='col-sm-12 col-lg-12'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" style={{ backgroundColor: '#813256' }} />
                            <label class="form-check-label" for="flexRadioDefault1">
                                UPI
                            </label>
                        </div>
                    </div>
                    <div className='col-sm-12 col-lg-12'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" style={{ backgroundColor: '#813256' }} />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Credit Card
                            </label>
                        </div>
                    </div>
                    <div className='col-sm-12 col-lg-12'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" style={{ backgroundColor: '#813256' }} />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Debit Card
                            </label>
                        </div>
                    </div>
                    <div className='col-sm-12 col-lg-12'>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" style={{ backgroundColor: '#813256' }} />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Internet Banking
                            </label>
                        </div>
                        <div className='col-sm-12 col-lg-12'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" style={{ backgroundColor: '#813256' }} />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    QR Code-customed-IFFI
                                </label>
                            </div>
                        </div>
                    </div>
                </div> */}


                <div className='row mt-4'>
                    <div className='col-sm-12 col-lg-12'>
                        <p className='text-uppercase' style={{ color: '#FF0000', fontWeight: "500" }}>Note: check all the details of form before final submission</p>
                    </div>
                </div>


            </form>
            <button className='btn btn-success' onClick={processToPay}>Pay & sumit</button>

            <AlertMessage handleClickOpen={handleClickOpen} setOpen={setOpen} open={open} handleClose={handleClose}

                data={alertData}
            />


        </>
    )
}

export default Declaration