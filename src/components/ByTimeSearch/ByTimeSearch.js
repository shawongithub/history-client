import React from 'react';
import { useRef } from 'react';
import moment from 'moment';
import subDays from 'date-fns/subDays';

const ByTimeSearch = props => {

    const ycheckbox = useRef(null);
    const wcheckbox = useRef(null);
    const mcheckbox = useRef(null);
    const selectHandler = event => {
        if (event.target.name === "date") {
            const today = moment(new Date()).format('YYYY-MM-DD')
            if (ycheckbox.current.checked || wcheckbox.current.checked || mcheckbox.current.checked === false) {
                props.setDataHandler([])
            }
            if (event.target.value === "yesterday") {

                if (ycheckbox.current.checked) {
                    const yesterday = moment(subDays(new Date(), 1)).format('YYYY-MM-DD')
                    wcheckbox.current.checked = false
                    mcheckbox.current.checked = false
                    const result = props.history.filter(data => data.created_at >= yesterday && data.created_at <= today)
                    props.setDataHandler(result)
                }

            }
            if (event.target.value === "lastweek") {
                if (wcheckbox.current.checked) {
                    const lastweek = moment(subDays(new Date(), 7)).format('YYYY-MM-DD')
                    ycheckbox.current.checked = false
                    mcheckbox.current.checked = false
                    const result = props.history.filter(data => data.created_at >= lastweek && data.created_at <= today)
                    props.setDataHandler(result)
                }
            }
            if (event.target.value === "lastmonth") {
                if (mcheckbox.current.checked) {
                    const lastmonth = moment(subDays(new Date(), 30)).format('YYYY-MM-DD')
                    ycheckbox.current.checked = false
                    wcheckbox.current.checked = false
                    const result = props.history.filter(data => data.created_at >= lastmonth && data.created_at <= today)
                    props.setDataHandler(result)
                }
            }

        }
    }
    return (
        <div>
            <p>By Time</p>
            <div>
                <input type="checkbox" name="date" value="yesterday" ref={ycheckbox} onClick={selectHandler} />
                <span>See data from yesterday</span>
                <br />
                <input type="checkbox" name="date" value="lastweek" ref={wcheckbox} onClick={selectHandler} />
                <span>See data from last week</span>
                <br />
                <input type="checkbox" name="date" value="lastmonth" ref={mcheckbox} onClick={selectHandler} />
                <span>See data from last month</span>
            </div>
        </div>
    );
};

export default ByTimeSearch;