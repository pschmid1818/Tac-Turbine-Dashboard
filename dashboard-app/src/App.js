import React from "react";
import "./App.css";
import "./body.css";
import CssBaseline from '@material-ui/core/CssBaseline';
import Sidebar from "./Sidebar";
import Dashboard from "./components/Dashboard"
import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import WebSocketTransport from "@cubejs-client/ws-transport";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useStyles } from './Styles';
import Container from '@material-ui/core/Container';


const API_URL = "http://localhost:4000";
const CUBEJS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODU1Nzk4Mjl9.0aSyAcNtMg2zU6M6ufshAr2-SBrZPvoC9_ljvdkvhNY";
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

const App = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar />
      <main className={classes.Content}>
        <Container className={classes.container}>
          <div className={classes.appBarSpacer}>
            <CubeProvider cubejsApi={cubejsApi}>
              <Dashboard>{children}</Dashboard>
            </CubeProvider>
          </div>
          <Copyright className={classes.copyright}/>
        </Container>
      </main>
    </div>

  );
}
export default App;
