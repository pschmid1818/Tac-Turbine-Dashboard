import React from "react";
import "./App.css";
import "./body.css";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useStyles } from './Styles';
import Container from '@material-ui/core/Container';

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
