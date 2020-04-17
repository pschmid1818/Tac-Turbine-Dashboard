import React from "react";
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
import HourlyEnergyChart from "../components/HourlyEnergyChart";
import InstantaneousPowerChart from "../components/InstantaneousPowerChart";


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
        (result) => {
          if (result.cod == 429) {

          }
          else {
            this.setState({
              w_heading: result.wind.deg,
              w_speed: result.wind.speed,
              humidity: result.main.humidity,
              temp: this.kToF(result.main.temp),
              pressure: result.main.pressure,
            });
          }
        },
        (error) => {
          this.setState({

          });
        }
      )
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item>
            <Paper className={classes.rowPaper}>
              <Grid container spacing={3}>
                <Grid item>
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
                      <b>Temperature: </b> {this.state.temp}°F
                    </Grid>
                    <Grid item id="pressure" >
                      <b>Pressure: </b> {this.state.pressure} mbar
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column" spacing={3}>
                    <Grid item>
                      <ReactSpeedometer
                        maxValue={45}
                        value={this.state.w_speed}
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
          <Grid item>
            <Paper className={classes.paper}>
              <Title>Live View</Title>
              <img
                alt="Not Loaded"
                src="https://zoneminder.clarkson.edu/cgi-bin-zm/zms?mode=jpeg&maxfps=30&monitor=15&user=viewer1&pass=media4u"
                height="302"
               />
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <div align="center">
              <Title>Hourly Energy Output</Title>
              </div>
              <HourlyEnergyChart />
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <div align="center">
              <Title>Instantaneous Power Output</Title>
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
