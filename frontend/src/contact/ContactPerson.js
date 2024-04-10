import React from 'react';

const ContactPerson = ({ name, title, location, email }) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>{title}</p>
            <p>{location}</p>
            <p>{email}</p>
        </div>
    );
}

export default ContactPerson;