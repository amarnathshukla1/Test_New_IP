import React, { useEffect, useState } from 'react'
import ApiClient from '../../common/ApiClient';
import { useLocation, useParams } from 'react-router-dom';



import Typography from '@mui/material/Typography';
import AlertMessage from '../../AlertMessage';

import Failure from "../../../images/Failure.png"
import Pending from "../../../images/Pending.png"

const DeclarationAndPayment = () => {

    const { id = null, response = null } = useParams();

    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
    });
    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setCheckboxes({
            ...checkboxes,
            [id]: checked,
        });
    };
    const allChecked = Object.values(checkboxes).every(Boolean);
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
    const processToPay = async (e) => {

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
                "callbackUrl": `${process.env.REACT_APP_SERVER_URL}/payment-response`
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
            <h5 className="text-capitalize payment">
                I/We give consent to screen the web series for consideration for Best Web Series (OTT) Award.
            </h5>


            <form>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12 col-lg-3'>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    id='checkbox1'
                                    name='checkbox1'
                                    checked={checkboxes.checkbox1}
                                    onChange={handleCheckboxChange}
                                />
                                <label className='form-check-label' htmlFor='checkbox1'>
                                    <p className='text-capitalize' style={{ color: '#3E393A' }}>
                                        I/we have No Objection for screening of this web series for the preview committee /Jury or any of their cards, as well as the use of web series stills/ posters and trailers/visual clips by the Ministry of Information and Broadcasting, Government of India, for the purpose of promoting the International Film Festival of India (IFFI) or any other associated events.
                                    </p>
                                </label>
                            </div>
                        </div>
                        <div className='col-sm-12 col-lg-3'>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    id='checkbox2'
                                    name='checkbox2'
                                    checked={checkboxes.checkbox2}
                                    onChange={handleCheckboxChange}
                                />
                                <label className='form-check-label' htmlFor='checkbox2'>
                                    <p className='text-capitalize' style={{ color: '#3E393A' }}>
                                        I/we declare that I/we have read the Best web series (OTT) Award Regulations and accept them without reservation. In particular, I/we note the conditions of Clause 6.7 of the Regulations stipulating that my/our entry will be rejected unless the entry form along with all the required material is received by the Ministry of Information and Broadcasting, Government of India on or before 23.08.2023.
                                    </p>
                                </label>
                            </div>
                        </div>
                        <div className='col-sm-12 col-lg-3'>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    id='checkbox3'
                                    name='checkbox3'
                                    checked={checkboxes.checkbox3}
                                    onChange={handleCheckboxChange}
                                />
                                <label className='form-check-label' htmlFor='checkbox3'>
                                    <p className='text-capitalize' style={{ color: '#3E393A' }}>
                                        Only one entry has been submitted by me/us. In case more than one entry is submitted by me/us, I understand that the entries are liable to be rejected.
                                    </p>
                                </label>
                            </div>
                        </div>
                        <div className='col-sm-12 col-lg-3'>
                            <div className='form-check'>
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    id='checkbox4'
                                    name='checkbox4'
                                    checked={checkboxes.checkbox4}
                                    onChange={handleCheckboxChange}
                                />
                                <label className='form-check-label' htmlFor='checkbox3'>
                                    <p className='text-capitalize' style={{ color: '#3E393A' }}>
                                        I/We hereby declare that the information provided is true to the best of my/our knowledge and corresponds with the credit titles of the web series. I/we also understand that the Ministry of Information and Broadcasting, Government of India has the right to reject any entry at any stage, if the information entered in this form is found to be incomplete or incorrect.
                                    </p>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-sm-12 col-lg-12'>
                        <p className='text-uppercase' style={{ color: '#FF0000', fontWeight: "500" }}>Note: check all the details of form before final submission</p>
                    </div>
                </div>


            </form>
            <button className='btn btn-success' onClick={processToPay} disabled={!allChecked}>Pay & Submit</button>

            <AlertMessage handleClickOpen={handleClickOpen} setOpen={setOpen} open={open} handleClose={handleClose}

                data={alertData}
            />

        </>
    )
}

export default DeclarationAndPayment