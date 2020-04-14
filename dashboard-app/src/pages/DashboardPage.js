import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import ReactSpeedometer from "react-d3-speedometer";
import ChartRenderer from "../components/ChartRenderer";
import DashboardItem from "../components/DashboardItem";
import { useStyles } from "../Styles";
import { Container } from "@material-ui/core";
import Title from "../components/Title";
import { getDefaultSettings } from "http";
import Clock from "../components/Clock";
const jQuery = require('jquery');

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

function KtoF(temp) {
  return (Math.round((temp - 273.15) * (9 / 5) + 32))
}



function getWeatherData() {
  let apiKey = 'c26f03572e5e48b6c0a1809e6071fae2';
  let cityId = '5132103';
  let url = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`;
  jQuery.ajax({
    url: url,
    type: 'get',
    success: function (response) {
      var temp = KtoF(response.main.temp);
      console.log(response)
      document.getElementById("w_heading").innerHTML = `<Typography align='center'><b>Wind Heading: </b>${response.wind.deg}°</Typography>`
      document.getElementById("humidity").innerHTML = `<Typography align='center'><b>Humidity: </b>${response.main.humidity}%</Typography>`
      document.getElementById("temp").innerHTML = `<Typography align='center'><b>Temperature: </b>${temp}°F</Typography>`
      document.getElementById("pressure").innerHTML = `<Typography align='center'><b>Pressure: </b>${response.main.pressure} mbar</Typography>`

    }
  });
}

const DashboardPage = () => {
  const classes = useStyles()
  jQuery(window).ready(function () {
    getWeatherData();
    // setInterval(getWeatherData, 120000); //uncomment if you want to refresh weather data
  })
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
                  <b>Wind Heading: </b> Loading
                </div>
                <div id="humidity" align="center">
                  <b>Humidity: </b> Loading
                </div>
                <div id="temp" align="center">
                  <b>Temperature: </b> Loading
                </div>
                <div id="pressure" align="center">
                  <b>Pressure: </b> Loading
                </div>
              </Grid>
              <Grid item>
                <ReactSpeedometer
                  maxValue={45}
                  value={8}
                  currentValueText="Wind Speed: ${value} mph" />

                <ReactSpeedometer
                  maxValue={4500}
                  value={300}
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
};

export default DashboardPage;
