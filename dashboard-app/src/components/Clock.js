import React from "react";
const moment = require('moment')

function updateClock(){
    document.getElementById("clock").innerHTML = `<Typography>${moment().format('MMMM Do, YYYY, h:mm A')}</Typography>`;
}

const Clock = () => {
    window.onload = function(){
        updateClock();
        setInterval(updateClock,30000);
    }
    return(
        <React.Fragment>
            <div id="clock">
                Loading
            </div>
        </React.Fragment>
    );
};

export default Clock;