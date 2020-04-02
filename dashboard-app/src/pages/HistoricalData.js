import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChartRenderer from "../components/ChartRenderer";
import Dashboard from "../components/Dashboard";
import DashboardItem from "../components/DashboardItem";
import { useStyles } from "../Styles"


const HistoricalData = () => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <h1>data</h1>
        </div>
    )
};


export default HistoricalData;
