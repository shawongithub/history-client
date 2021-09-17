import React from 'react';
import { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
const TimeRangeSearch = props => {

    const [selectedDate, setSelectedDate] = useState({
        start: new Date(),
        end: new Date()
    });

    const handleCheckInDateChange = (date) => {
        const newDate = { ...selectedDate }
        newDate.start = date
        setSelectedDate(newDate)
    };
    const handleCheckOutDateChange = (date) => {
        const newDate = { ...selectedDate }
        newDate.end = date
        setSelectedDate(newDate)
    };

    return (
        <div>
            <p>Custom timerange</p>
            <div className="range-div">
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <Grid>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog-start"
                            label="Start Date"
                            format="dd/MM/yyyy"
                            value={selectedDate.start}
                            onChange={handleCheckInDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog-end"
                            label="End Date"
                            format="dd/MM/yyyy"
                            value={selectedDate.end}
                            onChange={handleCheckOutDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />

                    </Grid>
                </MuiPickersUtilsProvider>
                <button onClick={() => props.searchHandler(selectedDate.start, selectedDate.end)}>Search Result</button>
            </div>
        </div>
    );
};

export default TimeRangeSearch;