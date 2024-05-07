import React from 'react';
import { TimePicker } from 'antd';

const TimeRange = ({ startTime, endTime, onTimeChange }) => {
    const parseTimeStringToHour = (timeString) => {
        const timeElements = timeString.split(' ');
        var hour = 0;
        hour = parseInt(timeString.split(' ')[0], 10);
        if (timeElements[1] === 'pm' && hour !== 12) {
            hour += 12;
        }
        else if (timeElements[1] === 'am' && hour === 12) {
            hour = 0;
        }
        return hour;
    };

    const handleCalendarChange = (timeString, info) => {
        if (info[0]) {
            const newStartTime = parseTimeStringToHour(info[0]);
            onTimeChange(newStartTime, endTime);
        }
        if (info[1]) {
            const newEndTime = parseTimeStringToHour(info[1]);
            onTimeChange(startTime, newEndTime);
        }
        if (info[0] && info[1]){
            const newStartTime = parseTimeStringToHour(info[0]);
            const newEndTime = parseTimeStringToHour(info[1]);
            onTimeChange(newStartTime, newEndTime);
        }
    };

    const RangeDisabledTime = (now, type) => {
        var disabledHours = () => [];
        if (startTime === null && endTime === null) {
            disabledHours = () => [];
        }
        if (type === 'start' && endTime !== null) {
            disabledHours = () => {
                const hours = [];
                for (let i = endTime; i <= 23; i++) {
                    hours.push(i);
                }
                return hours;
            };
        }
        else if (type === 'end' && startTime !== null) {
            disabledHours = () => {
                const hours = [];
                for (let i = 0; i <= startTime; i++) {
                    hours.push(i);
                }
                return hours;
            };
        }
        return { disabledHours };
    };

    return (
        <TimePicker.RangePicker
            format="h a"
            use12Hours={true}
            onCalendarChange={handleCalendarChange}
            disabledTime={(now, type) => RangeDisabledTime(now, type)}
            size="large"
            allowClear={false}
            needConfirm={false}
        />
    );
};

export default TimeRange;
