import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChartRenderer from "../components/ChartRenderer";
import Dashboard from "../components/Dashboard";
import DashboardItem from "../components/DashboardItem";
import { useStyles } from "../Styles"
const DashboardItems = [
  {
    id: 0,
    name: "Temperature",
    vizState: {
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
    }
  },
  {
    id: 1,
    name: "New Chart",
    vizState: {
      query: {
        measures: ["InverterAndWeatherData.tempCelsius"],
        timeDimensions: [
          {
            dimension: "InverterAndWeatherData.timeStamp",
            granularity: "hour"
          }
        ],
        filters: []
      },
      chartType: "line"
    }
  }
];

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
    <div className={classes.container}>
      <Dashboard>{DashboardItems.map(dashboardItem)}</Dashboard>
    </div>
  );
};

export default DashboardPage;
