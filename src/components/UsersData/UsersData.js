import React from 'react';
import './UsersData.css'
const UsersData = props => {
    const dataArray = props.userFiltered
    return (
        <div style={{ margin: '0px 10px' }}>
            <p>User Filtered data: count={dataArray.length}</p>
            {
                dataArray.map(data => <div key={data.id}>
                    <div className="users-card">
                        <p>Result : {data.result}</p>
                        <p>User : {data.user}</p>
                    </div>
                </div>)
            }
        </div>
    );
};

export default UsersData;