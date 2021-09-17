import React from 'react';

const KeywordSearch = props => {
    return (
        <div>
            <p>Keywords</p>
            {
                props.countedKeywords.map((element, index) => <div key={index}>
                    <input type="checkbox" name="keyword" value={element.name} onClick={props.selectHandler} />
                    <span>{element.name} : {element.value}</span>

                </div>)
            }
        </div>
    );
};

export default KeywordSearch;