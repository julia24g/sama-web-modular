import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import VariableTable from './VariableTable';

function createData(name, value, unit) {
    return { name, value, unit };
}

const generalRows = [
    createData('Soiling losses', 5, '%')
];

const advancedRows = [

];

const FAQ = () => {

    const questionsAndAnswers = [
        {
            question: "What are the default values in the General Calculator?",
            answer: (
                <VariableTable rows={generalRows} />
            )
        },
        {
            question: "What are the default values in the Advanced Calculator?",
            answer: (
                <VariableTable rows={advancedRows} />
            )
        },
        {
            question: "Where can I get the source code for SAMA?",
            answer: (
                <Typography>
                    The source code for SAMA is available on GitHub at {' '}
                    <a href="https://osf.io/geqwf/" target="_blank" rel="noopener noreferrer">
                        https://osf.io/geqwf/
                    </a>.
                </Typography>
            )
        },
        {
            question: "How can the Python version be used?",
            answer: (
                <Typography>
                    The methods for running the Python version can be found {' '}
                    <a href="https://www.appropedia.org/Solar_Alone_Multi-objective_Advisor_(SAMA)" target="_blank" rel="noopener noreferrer">
                        here
                    </a>.
                </Typography>
            )
        },
        {
            question: "Where is the SAMA user manual?",
            answer: (
                <Typography>
                    The user manual for SAMA can be found at {' '}
                    <a href="https://osf.io/7ztae" target="_blank" rel="noopener noreferrer">
                        https://osf.io/7ztae
                    </a>.
                </Typography>
            )
        },
        {
            question: "How can I lower the cost of the PV system?",
            answer: (
                <Typography>
                    Do some of the work yourself. If you do a DIY PV system, you can cut the cost in half. See{' '}
                    <a href="https://www.appropedia.org/To_Catch_the_Sun" target="_blank" rel="noopener noreferrer">
                        To Catch the Sun
                    </a>, a free book on exactly how to do it.
                </Typography>
            )
        }
    ]

    return (
        <Box id="faq">
            <Typography variant="h3" gutterBottom>
                Frequently Asked Questions
            </Typography>
            {questionsAndAnswers.map((q) => (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        {q.question}
                    </AccordionSummary>
                    <AccordionDetails>
                        {q.answer}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}

export default FAQ;