import React from 'react';
import moment from 'moment';
import subDays from 'date-fns/subDays';
import './HistoryLoader.css'

import { useState, useEffect, useRef } from 'react';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const HistoryLoader = () => {
    const [history, setHistory] = useState([])
    const [keywordFiltered, setkeywordFiltered] = useState([])
    const [userFiltered, setuserFiltered] = useState([])
    const [timelapseFiltered, setTimelapseFiltered] = useState([])
    const [timerangeFiltered, setTimerangeFiltered] = useState([])

    const ycheckbox = useRef(null);
    const wcheckbox = useRef(null);
    const mcheckbox = useRef(null);
    useEffect(() => {
        fetch('https://search-history-qtec.herokuapp.com/api/v1/gethistories/')
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
            let searched = keywordFiltered.some(data => data.keyword === event.target.value)
            if (searched) {
                const removedData = keywordFiltered.filter(data => data.keyword !== event.target.value)
                setkeywordFiltered(removedData)
            } else {
                const result = history.filter(data => data.keyword === event.target.value)
                setkeywordFiltered([...keywordFiltered, ...result])
            }
        }
        if (event.target.name === "user") {
            console.log("clicked")
            let searched = userFiltered.some(data => data.user === event.target.value)
            if (searched) {
                const removedData = userFiltered.filter(data => data.user !== event.target.value)
                setuserFiltered(removedData)
            } else {
                const result = history.filter(data => data.user === event.target.value)
                setuserFiltered([...userFiltered, ...result])
            }
        }
        if (event.target.name === "date") {
            const today = moment(new Date()).format('YYYY-MM-DD')
            if (ycheckbox.current.checked || wcheckbox.current.checked || mcheckbox.current.checked === false) {
                setTimelapseFiltered([])
            }
            if (event.target.value === "yesterday") {

                if (ycheckbox.current.checked) {
                    const yesterday = moment(subDays(new Date(), 1)).format('YYYY-MM-DD')
                    wcheckbox.current.checked = false
                    mcheckbox.current.checked = false
                    const result = history.filter(data => data.created_at >= yesterday && data.created_at <= today)
                    setTimelapseFiltered(result)
                }

            }
            if (event.target.value === "lastweek") {
                if (wcheckbox.current.checked) {
                    const lastweek = moment(subDays(new Date(), 7)).format('YYYY-MM-DD')
                    ycheckbox.current.checked = false
                    mcheckbox.current.checked = false
                    const result = history.filter(data => data.created_at >= lastweek && data.created_at <= today)
                    setTimelapseFiltered(result)
                }
            }
            if (event.target.value === "lastmonth") {
                if (mcheckbox.current.checked) {
                    const lastmonth = moment(subDays(new Date(), 30)).format('YYYY-MM-DD')
                    ycheckbox.current.checked = false
                    wcheckbox.current.checked = false
                    const result = history.filter(data => data.created_at >= lastmonth && data.created_at <= today)
                    setTimelapseFiltered(result)
                }
            }

        }

    }

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
    const searchHandler = () => {
        const startDate = moment(selectedDate.start).format('YYYY-MM-DD')
        const endDate = moment(selectedDate.end).format('YYYY-MM-DD')
        const result = history.filter(data => data.created_at >= startDate && data.created_at <= endDate)
        setTimerangeFiltered(result)
    }


    return (
        <div className="container">
            <div className="search-criteria">
                <p>Keywords</p>
                {
                    countedKeywords.map((element, index) => <div key={index}>
                        <input type="checkbox" name="keyword" value={element.name} onClick={selectHandler} />
                        <span>{element.name} : {element.value}</span>

                    </div>)
                }
                <p>Users</p>
                {
                    users.map((user, index) => <div key={index}>
                        <input type="checkbox" name="user" value={user} id="" onClick={selectHandler} />
                        <span>{user}</span>

                    </div>)
                }
                <p>Timerange</p>
                <div>
                    <input type="checkbox" name="date" value="yesterday" ref={ycheckbox} onClick={selectHandler} />
                    <span>See data from yesterday</span>
                    <br />
                    <input type="checkbox" name="date" value="lastweek" ref={wcheckbox} onClick={selectHandler} />
                    <span>See data from last week</span>
                    <br />
                    <input type="checkbox" name="date" value="lastmonth" ref={mcheckbox} onClick={selectHandler} />
                    <span>See data from last month</span>
                </div>
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
                    <button onClick={searchHandler}>Search Result</button>
                </div>

            </div>
            <div className="filtered-result">
                <div style={{ margin: '0px 10px' }}>
                    <p>Keyword Filtered data: count={keywordFiltered.length}</p>
                    {
                        keywordFiltered.map(data => <div key={data.id}>
                            <div style={{ backgroundColor: 'purple', color: 'white', margin: '2px 0px', padding: '2px' }}>
                                <p>Keyword : {data.keyword}</p>
                                <p>Result : {data.result}</p>
                            </div>

                        </div>)
                    }
                </div>
                <div style={{ margin: '0px 10px' }}>
                    <p>User Filtered data: count={userFiltered.length}</p>
                    {
                        userFiltered.map(data => <div key={data.id}>
                            <div style={{ backgroundColor: 'maroon', margin: '2px 0px', color: 'white', padding: '2px' }}>
                                <p>Result : {data.result}</p>
                                <p>User : {data.user}</p>
                            </div>
                        </div>)
                    }
                </div>
                <div style={{ margin: '0px 10px' }}>
                    <p>Timelapse Filtered data: count={timelapseFiltered.length}</p>
                    {
                        timelapseFiltered.map(data => <div key={data.id}>
                            <div style={{ backgroundColor: 'tomato', margin: '2px 0px', color: 'white', padding: '2px' }}>
                                <p>Result : {data.result}</p>
                                <p>Date : {data.created_at}</p>
                            </div>
                        </div>)
                    }

                </div>

                <div style={{ margin: '0px 10px' }}>
                    <p>Timerange Filtered data: count={timerangeFiltered.length}</p>
                    {
                        timerangeFiltered.map(data => <div key={data.id}>
                            <div style={{ backgroundColor: 'green', margin: '2px 0px', color: 'white', padding: '2px' }}>
                                <p>Result : {data.result}</p>
                                <p>Date : {data.created_at}</p>
                            </div>
                        </div>)
                    }
                </div>


            </div>

        </div>
    );
};

export default HistoryLoader;