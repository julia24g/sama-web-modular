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
            title: "Researcher, FAST Lab",
            location: "Western University"
        }
    ]

    return (
        <>
            <h1>CONTACT</h1>
            <Box sx={{ flexGrow: 1 }} id="contact">
                <Grid container spacing={2}>
                    <Grid item sm={6}>
                        <ContactPerson name={people[0].name} title={people[0].title} location={people[0].location} email={people[0].email} />
                    </Grid>
                    <Grid item sm={6}>
                        <ContactPerson name={people[1].name} title={people[1].title} location={people[1].location} email={people[1].email} />
                    </Grid >
                </Grid >
            </Box>
        </>
    );
};
export default Contact;