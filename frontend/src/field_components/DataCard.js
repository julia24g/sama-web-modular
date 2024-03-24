import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function DataCard({ title, count, unit }) {
    let displayCount = count;
    if (count) {
        if (unit === 'kW') {
            displayCount = `${count} ${unit}`;
        } else if (unit === '$') {
            displayCount = `$ ${count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
        }
        return (
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {displayCount}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

}