import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import CardIp from './CardIp';
import CardOtt from './CardOtt';
import NavBar from './NavBar';
import LeftBar from './LeftBar';
import "../../../assets/style/style.css";

const Container = styled(Box)({
    height: '100vh',
});

const TabPanelContainer = styled(Box)({
    padding: '16px',
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <TabPanelContainer>
                    {children}
                </TabPanelContainer>
            )}
        </div>
    );
}

export default function Home() {
    const [value, setValue] = useState(0);
    const [cardData] = useState([
        { id: 1, title: "Avatar" },
        { id: 2, title: "Inception" },
        { id: 3, title: "Titanic" },
        { id: 4, title: "Skylines" },
    ]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const allStepsCompleted = () => {
        return true;
    };

    return (
        <Container>
            <Grid container>
                <Grid item md={2} sm={3} xs={6}>
                    <LeftBar value={value} onChange={handleChange} />
                </Grid>
                <Grid item md={10} sm={9} xs={6}>
                    <NavBar activeTab={value} />
                    <TabPanel value={value} index={0}>
                        <div className='top_head'>
                            <h3>Indian Panorama</h3>
                        </div>
                        <div className='card-container'>
                            <CardIp cardData={cardData} allStepsCompletedFn={allStepsCompleted} />
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className='top_head'>
                            <h3>Web Series (OTT)</h3>
                        </div>
                        <div className='card-container'>
                            <CardOtt cardData={cardData} />
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div className='top_head'>
                            <h3>Creative Minds of Tomorrow</h3>
                        </div>
                        <div className='card-container'>
                            {/* Add content for this tab */}
                        </div>
                    </TabPanel>
                </Grid>
            </Grid>
        </Container>
    );
}
