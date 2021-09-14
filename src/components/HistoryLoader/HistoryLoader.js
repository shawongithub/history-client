import React from 'react';
import { useState, useEffect } from 'react';

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
    const users = [... new Set(history.map(data => data.user))]
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


        let searched = filteredData.some(data => data.keyword === event.target.name)
        if (searched) {
            const removedData = filteredData.filter(data => data.keyword !== event.target.name)
            setFilteredData(removedData)
        } else {
            const result = history.filter(data => data.keyword === event.target.name)
            setFilteredData([...filteredData, ...result])
        }

    }
    console.log(filteredData)
    console.log(users);

    return (
        <div>
            {
                countedKeywords.map((element, index) => <div key={index}>
                    <input type="checkbox" name={element.name} id="" onClick={selectHandler} />
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
        </div>
    );
};

export default HistoryLoader;