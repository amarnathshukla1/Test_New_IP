// Import necessary modules and components from React and Material-UI
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import "../Dashboard/dashboard.css";
import CardIp from './CardIp';
import CardOtt from './CardOtt'
import Button from '@mui/material/Button';
import NavBar from './NavBar';
import LeftBar from './LeftBar';

const Container = styled(Box)({
    // Full height of the viewport
    height: '100vh',
});
// Styled component for the TabPanel container
const TabPanelContainer = styled(Box)({
    // Padding inside the TabPanel
    padding: '16px',
});


// TabPanel component to handle the content of each tab
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    // Log the received props for debugging
    console.log("Received props in TabPanel:", props);

    return (
        <div
            role="tabpanel"
            hidden={value !== index} // Hide the panel if it's not the active tab
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

// Main Home component
export default function Home() {
    const [value, setValue] = useState(0); // State for tab value
    // State to store the card data
    const [cardData] = useState([
        { id: 1, title: "Avatar" },
        { id: 2, title: "Inception" },
        { id: 3, title: "Titanic" },
        { id: 4, title: "Skylines" },
    ]);

    // Handle tab change
    const handleChange = (event, newValue) => {
        setValue(newValue);
        // console.log('printing home component ', newValue);
    };

    const allStepsCompleted = () => {
        return true;
      };
          

    return (
        <Container>
            <Grid container>
                <Grid item md={2} sm={3} xs={6}>
                    <LeftBar value={value} onChange={handleChange} /> {/* Pass value and handleChange to LeftBar */}
                </Grid>
                <Grid item md={10} sm={9} xs={6}>
                    <div>
                        <NavBar /> {/* Render the NavBar component */}
                    </div>
                    <TabPanel value={value} index={0}>
                        <div className='top_head'>
                            <h3>Indian Panorama</h3>
                        </div>
                        <div className='card-container'>
                            <CardIp cardData={cardData} allStepsCompletedFn={allStepsCompleted}/>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    <div className='top_head'>
                            <h3>Web Series (OTT)</h3>
                        </div>
                        <div className='card-container'>
                            <CardOtt cardData={cardData} />
                        </div>
                        {/* <div className='top_head'>
                            <h3>Web Series (OTT)</h3>
                        </div>
                        <div className='empty_crd'>
                            <h4>You haven't added any entries yet. To get started, simply click on </h4>
                        </div> */}

                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div className='top_head'>
                            <h3>Creative minds of Tomorrow</h3>
                        </div>
                        <div className='card-container'>
                            {/* <Card cardData={cardData} />  */}
                            {/* Render cards with card data */}
                        </div>
                    </TabPanel>
                </Grid>
            </Grid>
        </Container>
    );
}

// Card component to display individual cards

