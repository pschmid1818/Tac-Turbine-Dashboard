import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import ReactSpeedometer from "react-d3-speedometer";
import { withStyles } from '@material-ui/core/styles';
import Title from "../components/Title";
import Clock from "../components/Clock";
import { classStyles } from "../ClassStyles";
import HourlyEnergyChart from "../components/HourlyEnergyChart";
import InstantaneousPowerChart from "../components/InstantaneousPowerChart";
import { API_URL, CUBEJS_TOKEN } from '../App';
import cubejs from '@cubejs-client/core';
import WebSocketTransport from '@cubejs-client/ws-transport';
import { useCubeQuery } from '@cubejs-client/react';
import { Row, Col, Statistic, Table } from 'antd';



const cubejsApi = cubejs({
  transport: new WebSocketTransport({ authorization: CUBEJS_TOKEN, apiUrl: 'ws://localhost:4000/' })
});

const Weather = ({ query, cubejsApi }) => {
  const { resultSet, error, isLoading } = useCubeQuery(query, { subscribe: true, cubejsApi });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <pre>{error.toString()}</pre>;
  }

  if (!resultSet) {
    return null;
  }

  return (
    <div>
      {resultSet
        .seriesNames()
        .map(s => (
          <Typography >{resultSet.totalRow()[s.key]}</Typography>
        ))}
    </div>
  )
};

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: 1000,
      w_heading: 0,
      humidity: 0,
      temp: 0,
      pressure: 0,
      w_speed: 0,
    }
  }

  componentDidMount() {
    // this.getWeatherData();
    // this.timerID = setInterval(
    //   () => this.getWeatherData(),
    //   500000
    // );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  kToF(temp) {
    return (Math.round((temp - 273.15) * (9 / 5) + 32));
  }

  getWeatherData() {

  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={3} className={classes.centerGrid}>
          <Grid item lg={5}>
            <Paper className={classes.rowPaper}>
              <Grid container spacing={3} justify="space-evenly">
                <Grid item >
                  <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid item id="conditions_title" >
                      <Title>Current Conditions</Title>
                    </Grid>
                    <Grid item>
                      <Typography variant='subtitle1'><i>Clarkson University, Potsdam, NY</i></Typography>
                    </Grid>
                    <Grid item>
                      <Clock />
                    </Grid>
                    <Grid item id="w_heading" >
                      <b>Wind Heading: </b> {this.state.w_heading}°
                    </Grid>
                    <Grid item id="humidity" >
                      <b>Humidity: </b> {this.state.humidity}%
                    </Grid>
                    <Grid item id="temp" >
                      <Typography><Weather query={{
                        "measures": [
                          "WeatherData.tempF"
                        ],
                        "timeDimensions": [
                          {
                            "dimension": "WeatherData.time",
                            "dateRange": "Last 1 day"
                          }
                        ],
                        "limit": 1,
                        "filters": []
                      }} cubejsApi={cubejsApi} /> °F</Typography>
                      
                    </Grid>
                    <Grid item id="pressure" >
                      <b>Pressure: </b> {this.state.pressure} mbar
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column" spacing={3} style={{ padding: 15 }}>
                    <Grid item>
                      <ReactSpeedometer
                        maxValue={45}
                        value={this.state.w_speed}
                        // eslint-disable-next-line
                        currentValueText="Wind Speed: ${value} mph"
                        startColor="lightgreen"
                        endColor="red"
                        width={250}
                        height={150}
                      />
                    </Grid>
                    <Grid item>
                      <ReactSpeedometer
                        maxValue={4500}
                        value={this.state.power}
                        // eslint-disable-next-line
                        currentValueText="Power: ${value} W"
                        startColor="lightgreen"
                        endColor="red"
                        width={250}
                        height={150} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item lg={5}>
            <Paper className={classes.paper}>
              <img className={classes.media}
                alt="Not Loaded"
                src="https://zoneminder.clarkson.edu/cgi-bin-zm/zms?mode=jpeg&maxfps=30&monitor=15&user=viewer1&pass=media4u"
              />
            </Paper>
          </Grid>
          <Grid item lg={5}>
            <Paper className={classes.paper} >
              <div align="center">
                <Title>Hourly Energy Output (kWh/h)</Title>
              </div>
              <HourlyEnergyChart />
            </Paper>
          </Grid>
          <Grid item lg={5}>
            <Paper className={classes.paper}>
              <div align="center">
                <Title>Instantaneous Power Output (W)</Title>
              </div>
              <InstantaneousPowerChart />
            </Paper>
          </Grid>
        </Grid>

      </React.Fragment >
    );
  }
}


export default withStyles(classStyles)(DashboardPage);
