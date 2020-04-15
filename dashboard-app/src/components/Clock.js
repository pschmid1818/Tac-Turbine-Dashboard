import React from "react";
import Moment from "moment";
import { Typography } from "@material-ui/core";


class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: Moment().format('MMMM Do, YYYY, h:mm A'),
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            30000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: Moment().format('MMMM Do, YYYY, h:mm A')
        });
    }

    render() {
        return (
            <React.Fragment>
                <div id="clock">
                    <Typography>{this.state.date}</Typography>
                </div>
            </React.Fragment>
        );
    }
}

export default Clock;