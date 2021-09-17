import React from 'react';
import './TimeRangeData.css'
const TimeRangeData = props => {
    const dataArray = props.timerangeFiltered
    return (
        <div style={{ margin: '0px 10px' }}>
            <p>Timerange Filtered data: count={dataArray.length}</p>
            {
                dataArray.map(data => <div key={data.id}>
                    <div className="range-card">
                        <p>Result : {data.result}</p>
                        <p>Date : {data.created_at}</p>
                    </div>
                </div>)
            }
        </div>
    );
};

export default TimeRangeData;