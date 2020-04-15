import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import ReactSpeedometer from "react-d3-speedometer";
import { withStyles } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";
import Title from "../components/Title";
import { getDefaultSettings } from "http";
import Clock from "../components/Clock";
import { classStyles } from "../ClassStyles";


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
    this.getWeatherData();
    // TODO: Uncomment for refreshing weather data
    // this.timerID = setInterval(
    //   () => this.getWeatherData(),
    //   120000
    // );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  kToF(temp) {
    return (Math.round((temp - 273.15) * (9 / 5) + 32));
  }

  getWeatherData() {
    let apiKey = 'c26f03572e5e48b6c0a1809e6071fae2';
    let cityId = '5132103';
    let url = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`;
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => this.setState({
          w_heading: result.wind.deg,
          w_speed: result.wind.speed,
          humidity: result.main.humidity,
          temp: this.kToF(result.main.temp),
          pressure: result.main.pressure,
        })
      )
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item>
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item>
                  <div id="conditions_title" align="center">
                    <Title>Current Conditions</Title>
                    <Typography variant='subtitle1'><i>Clarkson University, Potsdam, NY</i></Typography>
                  </div>
                  <div align="center">
                    <Clock />
                  </div>
                  <div id="w_heading" align="center">
                    <b>Wind Heading: </b> {this.state.w_heading}°
                </div>
                  <div id="humidity" align="center">
                    <b>Humidity: </b> {this.state.humidity}%
                </div>
                  <div id="temp" align="center">
                    <b>Temperature: </b> {this.state.temp}°F
                </div>
                  <div id="pressure" align="center">
                    <b>Pressure: </b> {this.state.pressure} mbar
                </div>
                </Grid>
                <Grid item>
                  <ReactSpeedometer
                    maxValue={45}
                    value={this.state.w_speed}
                    currentValueText="Wind Speed: ${value} mph" />

                  <ReactSpeedometer
                    maxValue={4500}
                    value={this.state.power}
                    currentValueText="Power: ${value} W" />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item>
            <Paper className={classes.paper}>
              <Title>Live View</Title>
              <img alt="Not Loaded" src="https://zoneminder.clarkson.edu/cgi-bin-zm/zms?mode=jpeg&maxfps=30&monitor=15&user=viewer1&pass=media4u" height="480" width="704" />
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

// function updateWeather(w_heading, humidity, temp, pressure) {
//   this.setState({
//     w_heading: w_heading,
//     humidity: humidity,
//     temp: temp,
//     pressure: pressure
//   })
// }

// function updateSpeed(newSpeed) {
//   this.setState({
//     windSpeed: newSpeed
//   })
// }



export default withStyles(classStyles)(DashboardPage);
