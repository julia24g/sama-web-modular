import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ContactPerson from './ContactPerson';

const Contact = () => {

    const people = [
        {
            profileImage: "",
            name: "Dr. Joshua Pearce",
            title: "John M. Thompson Chair in Information Technology and Innovation, Thompson Centre for Engineering Leadership & Innovation",
            location: "Western University"
        },
        {
            profileImage: "",
            name: "Seyyed Ali Sadat",
            title: "Graduate Researcher, FAST Lab",
            location: "Western University",
            email: "ssadat6@uwo.ca"
        }
    ]

    return (
        <Box sx={{ textAlign: 'center', py: 5 }}>
            <Box id="contact">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <ContactPerson classname="contact_person" name={people[1].name} title={people[1].title} location={people[1].location} email={people[1].email} />
                    </Grid >
                    <Grid item xs={12} md={6}>
                        <ContactPerson classname="contact_person" name={people[0].name} title={people[0].title} location={people[0].location}/>
                    </Grid>
                </Grid >
            </Box>
        </Box>
    );
};
export default Contact;