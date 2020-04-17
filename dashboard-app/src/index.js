import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CssBaseline from '@material-ui/core/CssBaseline';
import Sidebar from "./Sidebar";
import App from "./App";
import { useStyles } from "./Styles"
import * as serviceWorker from "./serviceWorker";
import { HashRouter as Router, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import HistoricalData from "./pages/HistoricalData";
import SystemPage from "./pages/System";
import MoreInfo from "./pages/MoreInfo";
import theme from "./Theme";
import {ThemeProvider} from "@material-ui/core";

function Main() {
  const classes = useStyles();
  return (
    <Router>
      <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Sidebar />
        <div className={classes.content}>
          <App>
            <Route exact path="/" component={DashboardPage} />
            <Route exact path="/historical_data" component={HistoricalData} />
            <Route exact path="/system" component={SystemPage} />
            <Route exact path="/more_info" component={MoreInfo} />
          </App>
        </div>
      </div>
      </ThemeProvider>
    </Router>
  );

};


ReactDOM.render(
  <Main />
  ,
  document.getElementById("root")
); // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();