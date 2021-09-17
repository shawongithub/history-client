import React from 'react';

const UserSearch = props => {
    return (
        <div>
            <p>Users</p>
            {
                props.users.map((user, index) => <div key={index}>
                    <input type="checkbox" name="user" value={user} id="" onClick={props.selectHandler} />
                    <span>{user}</span>

                </div>)
            }
        </div>
    );
};

export default UserSearch;