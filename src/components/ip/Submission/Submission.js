
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Success from "../../../images/Success.png"
import Failure from "../../../images/Failure.png"
import Pending from "../../../images/Pending.png"
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../../AlertMessage';
import { useState } from 'react';
import { useEffect } from 'react';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const Submission = () => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const [alertData, setAlertData] = useState({
        heading: "",
        content: ""
    });
    useEffect(() => {
        setAlertData({
            heading: "Payment Status",
            content: (<><p style={{ display: "flex", justifyContent: "center" }}><img src={Success} alt='' width="70px" height="70px" /> </p>
                <h4 style={{ display: 'flex', justifyContent: "center" }}>Payment Successfull</h4>
                <Typography gutterBottom >
                    <p style={{ textAlign: "center", marginTop: "10px" }} className='text-center'> Congratulations! Your payment has been successfully processed. Thank you for your transaction.  </p>
                </Typography></>)
        });
        handleClickOpen();
    }, []);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        // Redirect to home page
        navigate('/dashboard');
    };


    return (
        <>
            <AlertMessage handleClickOpen={handleClickOpen} setOpen={setOpen} open={open} handleClose={handleClose}

                data={alertData}
            />

        </>
    )
}

export default Submission