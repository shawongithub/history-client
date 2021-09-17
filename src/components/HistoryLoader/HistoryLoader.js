import React from 'react';
import moment from 'moment';

import './HistoryLoader.css'
import { useState, useEffect } from 'react';
import KeywordsData from '../KeywordsData/KeywordsData'
import 'date-fns';

import UsersData from '../UsersData/UsersData';
import ByTimeData from '../ByTimeData/ByTimeData';
import TimeRangeData from '../TimeRangeData/TimeRangeData';
import TimeRangeSearch from '../TimeRangeSearch/TimeRangeSearch';
import ByTimeSearch from '../ByTimeSearch/ByTimeSearch';
import KeywordSearch from '../KeywordSearch/KeywordSearch';
import UserSearch from '../UserSearch/UserSearch';


const HistoryLoader = () => {

    const [history, setHistory] = useState([])
    const [keywordFiltered, setkeywordFiltered] = useState([])
    const [userFiltered, setuserFiltered] = useState([])
    const [timelapseFiltered, setTimelapseFiltered] = useState([])
    const [timerangeFiltered, setTimerangeFiltered] = useState([])


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
    }

    const searchHandler = (start, end) => {
        const startDate = moment(start).format('YYYY-MM-DD')
        const endDate = moment(end).format('YYYY-MM-DD')
        const result = history.filter(data => data.created_at >= startDate && data.created_at <= endDate)
        setTimerangeFiltered(result)
    }
    const setDataHandler = result => {
        setTimelapseFiltered(result)
    }

    return (
        <div className="container">
            <div className="search-criteria">
                <KeywordSearch countedKeywords={countedKeywords} selectHandler={selectHandler} />
                <UserSearch users={users} selectHandler={selectHandler}/>
                <ByTimeSearch history={history} setDataHandler={setDataHandler} />
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