import React from 'react';

const KeywordsData = props => {
    const dataArray = props.keywordFiltered
    return (
        <div style={{ margin: '0px 10px' }}>
            <p>Keyword Filtered data: count={dataArray.length}</p>
            {
                dataArray.map(data => <div key={data.id}>
                    <div style={{ backgroundColor: 'blue', marginBottom: '5px', color: 'white', padding: '5px' }}>
                        <p>Keyword : {data.keyword}</p>
                        <p>Result : {data.result}</p>
                    </div>

                </div>)
            }
        </div>
    );
};

export default KeywordsData;