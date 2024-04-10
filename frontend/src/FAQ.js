import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const FAQ = () => {

    const questionsAndAnswers = [
        {
            question: "What is SAMA?",
            answer: "SAMA (Solar Alone Multi-objective Advisor) is the first-ever publicly available tool for determining the viability of transitioning off-grid."
        },
        {
            question: "What is the difference between the General and Advanced calculators?",
            answer: "The General calculator is ideal for quick grid defection estimates or for newcomers to energy systems. The Advanced calculator is tailored for researchers seeking precision with detailed input options."
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