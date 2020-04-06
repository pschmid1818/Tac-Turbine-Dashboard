import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import ChartRenderer from "../components/ChartRenderer";
import DashboardItem from "../components/DashboardItem";
import { useStyles } from "../Styles"
import { Container } from "@material-ui/core";
import Title from "../components/Title";

// const tempQuery = ;

const DashboardPage = () => {
  const dashboardItem = item => (
    <Grid item xs={12} lg={6} key={item.id}>
      <DashboardItem title={item.name}>
        <ChartRenderer vizState={item.vizState} />
      </DashboardItem>
    </Grid>

  );
  const classes = useStyles()


  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item>
          <Paper className={classes.paper}>
            <Title>Temperature</Title>
            <ChartRenderer vizState={{
              query: {
                measures: ["InverterAndWeatherData.tempCelsius"],
                timeDimensions: [
                  {
                    dimension: "InverterAndWeatherData.timeStamp",
                    granularity: "day"
                  }
                ],
                filters: []
              },
              chartType: "line"
            }} />
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <Title>Live View</Title>
            <img alt="Not Loaded" src="https://zoneminder.clarkson.edu/cgi-bin-zm/zms?mode=jpeg&maxfps=30&monitor=15&user=viewer1&pass=media4u" height="720" width="1280" />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>




  );
};

export default DashboardPage;
