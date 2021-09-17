import React from 'react';
import moment from 'moment';
import subDays from 'date-fns/subDays';
import './HistoryLoader.css'
import { useState, useEffect, useRef } from 'react';
import KeywordsData from '../KeywordsData/KeywordsData'
import 'date-fns';

import UsersData from '../UsersData/UsersData';
import ByTimeData from '../ByTimeData/ByTimeData';
import TimeRangeData from '../TimeRangeData/TimeRangeData';
import TimeRangeSearch from '../TimeRangeSearch/TimeRangeSearch';


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

    const searchHandler = (start, end) => {
        const startDate = moment(start).format('YYYY-MM-DD')
        const endDate = moment(end).format('YYYY-MM-DD')
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
                <TimeRangeSearch searchHandler={searchHandler} />

            </div>
            <div className="filtered-result">
                <KeywordsData keywordFiltered={keywordFiltered} />
                <UsersData userFiltered={userFiltered} />
                <ByTimeData timelapseFiltered={timelapseFiltered} />
                <TimeRangeData timerangeFiltered={timerangeFiltered} />
            </div>

        </div>
    );
};

export default HistoryLoader;