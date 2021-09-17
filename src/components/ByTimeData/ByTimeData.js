import React from 'react';
import './ByTimeData.css'

const ByTimeData = props => {
    const dataArray = props.timelapseFiltered
    return (
        <div>
            <p>Timelapse Filtered data: count={dataArray.length}</p>
            {
                dataArray.map(data => <div key={data.id}>
                    <div className="by-time-card">
                        <p>Result : {data.result}</p>
                        <p>Date : {data.created_at}</p>
                    </div>
                </div>)
            }

        </div>
    );
};

export default ByTimeData;