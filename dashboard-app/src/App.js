import React from "react";
import "./App.css";
import "./body.css";
import CssBaseline from '@material-ui/core/CssBaseline';
import Sidebar from "./Sidebar";
import { Layout } from "antd";
import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import WebSocketTransport from "@cubejs-client/ws-transport";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useStyles } from './Styles';



const drawerWidth = 240;

const API_URL = "http://localhost:4000";
const CUBEJS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODE3MTA2OTUsImV4cCI6MTU4MTc5NzA5NX0.AL6s61veoVLuDMQj1wS7qpup06n3eYofKOEfK_YtFAU";
const cubejsApi = cubejs({
  transport: new WebSocketTransport({
    authorization: CUBEJS_TOKEN,
    apiUrl: API_URL.replace("http", "ws")
  })
});



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Caleb DeLaBruere
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const App = ({ children }) => 
{
  const classes = useStyles();

return (
  <div className={classes.root}>
  <CssBaseline/>
  <Sidebar/>
    <main className={classes.Content}>
      <div className={classes.appBarSpacer}>
        <CubeProvider cubejsApi={cubejsApi}>
          <Layout.Content>{children}</Layout.Content>
        </CubeProvider>
      </div>
    </main>
  <Copyright/>
  </div>

);
}
export default App;
