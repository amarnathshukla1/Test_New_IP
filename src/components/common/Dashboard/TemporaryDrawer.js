import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LeftBar from '../Dashboard/LeftBar'

const TemporaryDrawer = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);

    const handleDrawerToggle = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleDrawerToggle(true)}>
                <MenuRoundedIcon />
            </Button>
            <Drawer open={open} onClose={handleDrawerToggle(false)}>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={handleDrawerToggle(false)}
                    onKeyDown={handleDrawerToggle(false)}
                >
                    <LeftBar value={value} onChange={handleTabChange} /> {/* Pass value and handleTabChange to Home */}
                </Box>
            </Drawer>
        </div>
    );
};

export default TemporaryDrawer;
