import React from "react";
import "./App.css";
import "./body.css";
import Box from '@material-ui/core/Box';

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
    <React.Fragment>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container} >
          <div>{children}</div>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>


  );
}
export default App;
