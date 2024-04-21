import React from 'react';

const ContactPerson = ({ name, title, location }) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>{title}</p>
            <p>{location}</p>
        </div>
    );
}

export default ContactPerson;