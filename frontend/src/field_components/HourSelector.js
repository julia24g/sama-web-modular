import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TimeRange from './TimeRange';
import { Controller } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

const HourSelector = ({ season, tier }) => {
    const { setValue } = useFormContext();
    const [ranges, setRanges] = useState([{ startTime: null, endTime: null }]);
    const [onHours, setOnHours] = useState(Array(24).fill(0));

    useEffect(() => {
        updateOnHours();
    }, [ranges]);

    useEffect(() => {
        setValue(`${season}${tier}PeakHours`, onHours);
    }, [onHours, setValue, season, tier]);

    const updateOnHours = () => {
        const hours = Array(24).fill(0);
        ranges.forEach((range) => {
            if (range.startTime !== null && range.endTime !== null) {
                const startHour = range.startTime;
                const endHour = range.endTime;
                for (let i = startHour; i < endHour; i++) {
                    hours[i] = 1;
                }
            }
        });
        setOnHours(hours);
    };

    const handleAddRange = () => {
        const updatedRanges = [...ranges, { startTime: null, endTime: null }];
        setRanges(updatedRanges);
    };

    const handleRemoveRange = (index) => {
        if (ranges.length > 1) {
            const newRanges = [...ranges];
            newRanges.splice(index, 1);
            setRanges(newRanges);
        }
    };

    const handleChangeRange = (index, startTime, endTime, onChange) => {
        const newRanges = ranges.map((range, idx) => idx === index ? { startTime, endTime } : range);
        setRanges(newRanges);

        if (onChange) {
            onChange(newRanges); // This updates the form state with the new range values.
        }
    };

    return (
        <div>
            {ranges.map((range, index) => (
                <div key={index}>
                    {index === 0 ? (
                        <Controller
                            name={`${season}${tier}TimeRange`}
                            defaultValue={{ startTime: range.startTime, endTime: range.endTime }}
                            render={({ field }) => (
                                <TimeRange
                                    startTime={field.value.startTime}
                                    endTime={field.value.endTime}
                                    onTimeChange={(start, end) => handleChangeRange(index, start, end, field.onChange)}
                                    controlled
                                />
                            )}
                        />
                    ) : (
                        <TimeRange
                            startTime={range.startTime}
                            endTime={range.endTime}
                            onTimeChange={(startTime, endTime) =>
                                handleChangeRange(index, startTime, endTime)
                            }
                        />
                    )}
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleRemoveRange(index)}
                        disabled={ranges.length === 1}
                    >
                        Remove
                    </Button>
                </div>
            ))}
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleAddRange}
            >
                Add Time Range
            </Button>
            <Controller
                name={`${season}${tier}PeakHours`}
                defaultValue={onHours}
                render={({ field }) => <input type="hidden" {...field} />}
            />
            <div>
                Hour Availability: {onHours.join(', ')}
            </div>
        </div>
    );

};
export default HourSelector;