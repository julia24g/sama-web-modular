import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const About = () => {
    return (
        <Box id="about">
            <div className="aboutText">
                <Typography variant="h5" gutterBottom>
                    About us
                </Typography>
                <Typography variant="h2" classname="landingTitle" gutterBottom>
                    We're on a mission to make solar energy more accessible
                </Typography>
                <br></br>
                <p>SAMA-web is the world's first-ever publicly available web tool to help homeowners calculate the cost of building and maintaining an off-grid solar photovoltaic (PV) system and compare it to grid electric costs. SAMA-web is built on the <a href='https://www.appropedia.org/A_Free_and_open-source_microgrid_optimization_tool:_SAMA_the_Solar_Alone_Multi-Objective_Advisor' target='blank'>open source the Solar Alone Multi-Objective Advisor (SAMA)</a>.</p>
                <br></br>
                <p>Our goal is to make information about solar PV systems more accessible to the general public. By providing a simple tool to assist homeowners with understanding the associated costs of generating their own electrical power, we aim to encourage more people to switch to greener energy alternatives.
                    SAMA was developed by Seyyed Ali Sadat and Julia Groza, members of the Free Appropriate Sustainability Technology (FAST) research group at Western University in London, ON, Canada led by Dr. Joshua Pearce.</p>
                <br></br>
                <p>To learn more about SAMA see: Seyyed Ali Sadat, Jonathan Takahashi, Joshua M. Pearce, A Free and open-source microgrid optimization tool: SAMA the solar alone Multi-Objective Advisor, <i>Energy Conversion and Management</i>, 298, 2023, 117686, <a href='https://www.sciencedirect.com/science/article/abs/pii/S0196890423010324?via%3Dihub' target='blank'>https://doi.org/10.1016/j.enconman.2023.117686.Academia OA</a></p>
            </div>
        </Box>
    );
}
export default About;
