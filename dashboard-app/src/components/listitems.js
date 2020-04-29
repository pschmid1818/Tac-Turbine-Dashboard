import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InfoIcon from '@material-ui/icons/Info';
import ComputerIcon from '@material-ui/icons/Computer';
import BarChartIcon from '@material-ui/icons/BarChart';
import { Link } from 'react-router-dom'
import ClarksonLogo from '../images/clarksonlogo.svg'


export const mainListItems = (
  <div>
    <ListItem>
      <img alt="CU Logo"style={{ height: '100%', width: '100%' }} src={ClarksonLogo}></img>
    </ListItem>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component={Link} to="/historical_data">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Historical Data" />
    </ListItem>
    <ListItem button component={Link} to="/system">
      <ListItemIcon>
        <ComputerIcon />
      </ListItemIcon>
      <ListItemText primary="System" />
    </ListItem>
    <ListItem button component={Link} to="/more_info">
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="More Info" />
    </ListItem>

  </div>
);
