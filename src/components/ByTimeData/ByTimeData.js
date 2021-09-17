import React from 'react';

const ByTimeData = props => {
    const dataArray = props.timelapseFiltered
    return (
        <div style={{ margin: '0px 10px' }}>
            <p>Timelapse Filtered data: count={dataArray.length}</p>
            {
                dataArray.map(data => <div key={data.id}>
                    <div style={{ backgroundColor: 'tomato', margin: '2px 0px', color: 'white', padding: '2px' }}>
                        <p>Result : {data.result}</p>
                        <p>Date : {data.created_at}</p>
                    </div>
                </div>)
            }

        </div>
    );
};

export default ByTimeData;