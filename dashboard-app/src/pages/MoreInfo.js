import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChartRenderer from "../components/ChartRenderer";
import DashboardItem from "../components/DashboardItem";
import { useStyles } from "../Styles"


const MoreInfo = () => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <h1>more info</h1>
        </div>
    )
};


export default MoreInfo;