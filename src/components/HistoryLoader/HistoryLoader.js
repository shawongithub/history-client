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
    const keywordCounts = {}
    for (let i = 0; i < keywords.length; i++) {
        keywordCounts[keywords[i]] = 1 + (keywordCounts[keywords[i]] || 0)
    }

    let dummy = []
    for (const key in keywordCounts) {
        let obj = {
            name: key,
            value: keywordCounts[key]
        }
        dummy.push(obj)

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



        // const newFilteredData = [...filteredData, ...result]
    }
    console.log(filteredData)

    return (
        <div>
            {
                dummy.map((element, index) => <div key={index}>
                    <input type="checkbox" name={element.name} id="" onClick={selectHandler} />
                    <span>{element.name} : {element.value}</span>

                </div>)
            }
        </div>
    );
};

export default HistoryLoader;