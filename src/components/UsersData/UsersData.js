import React from 'react';

const UsersData = props => {
    const dataArray = props.userFiltered
    return (
        <div style={{ margin: '0px 10px' }}>
            <p>User Filtered data: count={dataArray.length}</p>
            {
                dataArray.map(data => <div key={data.id}>
                    <div style={{ backgroundColor: 'blue', marginBottom: '5px', color: 'white', padding: '5px' }}>
                        <p>Result : {data.result}</p>
                        <p>User : {data.user}</p>
                    </div>
                </div>)
            }
        </div>
    );
};

export default UsersData;