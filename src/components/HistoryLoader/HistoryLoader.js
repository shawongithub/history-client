import React from 'react';
import moment from 'moment';
import subDays from 'date-fns/subDays';

import { useState, useEffect } from 'react';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const HistoryLoader = () => {
    const [history, setHistory] = useState([])
    const [filteredData, setFilteredData] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/v1/gethistories/')
            .then(res => res.json())
            .then(data => {
                setHistory(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    const keywords = history.map(data => data.keyword)
    const users = [...new Set(history.map(data => data.user))]

    const keywordCounts = {}
    for (let i = 0; i < keywords.length; i++) {
        keywordCounts[keywords[i]] = 1 + (keywordCounts[keywords[i]] || 0)
    }

    let countedKeywords = []
    for (const key in keywordCounts) {
        let obj = {
            name: key,
            value: keywordCounts[key]
        }
        countedKeywords.push(obj)

    }

    const selectHandler = (event) => {

        if (event.target.name === "keyword") {
            let searched = filteredData.some(data => data.keyword === event.target.value)
            if (searched) {
                const removedData = filteredData.filter(data => data.keyword !== event.target.value)
                setFilteredData(removedData)
            } else {
                const result = history.filter(data => data.keyword === event.target.value)
                setFilteredData([...filteredData, ...result])
            }
        }
        if (event.target.name === "date") {
            const today = moment(new Date()).format('YYYY-MM-DD')
            if (event.target.value === "yesterday") {
                const yesterday = moment(subDays(new Date(), 1)).format('YYYY-MM-DD')
                const result = history.filter(data => data.created_at >= yesterday && data.created_at <= today)
                console.log(result)
            }
            if (event.target.value === "lastweek") {
                const lastweek = moment(subDays(new Date(), 7)).format('YYYY-MM-DD')
                const result = history.filter(data => data.created_at >= lastweek && data.created_at <= today)
                console.log(result)
            }
            if (event.target.value === "lastmonth") {
                console.log("hello")
                const lastmonth = moment(subDays(new Date(), 30)).format('YYYY-MM-DD')
                const result = history.filter(data => data.created_at >= lastmonth && data.created_at <= today)
                console.log(result)
            }

        }

    }
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };




    return (
        <div>
            {
                countedKeywords.map((element, index) => <div key={index}>
                    <input type="checkbox" name="keyword" value={element.name} onClick={selectHandler} />
                    <span>{element.name} : {element.value}</span>

                </div>)
            }
            <br />
            <br />
            {
                users.map((user, index) => <div key={index}>
                    <input type="checkbox" name={user} id="" />
                    <span>{user}</span>

                </div>)
            }
            <br />
            <div>
                <input type="checkbox" name="date" value="yesterday" id="" onClick={selectHandler} />
                <span>See data from yesterday</span>
                <br />
                <input type="checkbox" name="date" value="lastweek" id="" onClick={selectHandler} />
                <span>See data from last week</span>
                <br />
                <input type="checkbox" name="date" value="lastmonth" id="" onClick={selectHandler} />
                <span>See data from last month</span>
            </div>
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justifyContent="space-around">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />

                    </Grid>
                </MuiPickersUtilsProvider>
            </div>

        </div>
    );
};

export default HistoryLoader;