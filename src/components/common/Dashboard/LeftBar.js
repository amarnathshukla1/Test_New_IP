import React from 'react';
import logo from "../../../assets/images/logo.svg"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const LeftBar = ({ value, onChange }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        if (typeof onChange === 'function') {
            onChange(event, newValue);
        }
    };

    return (
        <div className='deshbord-leftSide'>
            <div style={{ textAlign: 'center', padding: '10px' }}>
                <div className="logo" href="#home">
                    <img
                        src={logo}
                        width="100%"
                        height=""
                        className=""
                        alt="NFDC Cinemas of india"
                    />
                </div>

            </div>
            <Tabs
                orientation={isMobile ? "horizontal" : "vertical"}
                variant="scrollable"
                scrollButtons={isMobile ? "auto" : "on"}
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: isMobile ? 0 : 1, borderColor: 'divider' }}
            >
                <Tab label="Indian Panorama" {...a11yProps(0)} />
                <Tab label="OTT" {...a11yProps(1)} />
                <Tab label="CMOT" {...a11yProps(2)} />
            </Tabs>
            <div className='log_out_btn' style={{ padding: '10px' }}>
                <Button variant="outlined" startIcon={<LogoutIcon />} style={{ color: 'white', border: 'none', marginRight: '2rem' }} href="/logout">
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default LeftBar;
