import React from "react";
import "./App.css";
import "./body.css";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useStyles } from './Styles';
import Container from '@material-ui/core/Container';

export const API_URL = "http://localhost:4000";
export const CUBEJS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODU1Nzk4Mjl9.0aSyAcNtMg2zU6M6ufshAr2-SBrZPvoC9_ljvdkvhNY";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://hasthelargehadroncolliderdestroyedtheworldyet.com/">
        Caleb DeLaBruere, Zachary Damato
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
      <Container maxWidth="xl" className={classes.container} >
          <div>{children}</div>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>


  );
}
export default App;
