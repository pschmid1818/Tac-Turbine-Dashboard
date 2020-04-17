import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import ChartRenderer from "../components/ChartRenderer";
import DashboardItem from "../components/DashboardItem";
import { useStyles } from "../Styles"
import Title from "../components/Title";
import test from '../images/TurbineSystemPic.png'


const SystemPage = () => {
    const classes = useStyles()
    return (
     	<React.Fragment>
      	  <Grid container spacing={3}>
            <Grid item>
		<Paper className={classes.paper}>
            	    <Title>Small Wind Turbine Systems</Title>
		      <body1>Small wind turbines are much different than their larger cousins. They are typically installed behind the electric meter and offset the cost of electricity to the consumer directly.  They may be used in on- or off-grid situations.<br></br>
		      <img src={test} alt="Turbine System Overview" height="345" width="500"></img><br></br>

	Small wind systems use a rectifier/controller to convert the wild AC from the turbine into DC. <br></br><br></br>
For grid-tied systems, this then is re-converted into AC to match the local grid. <br></br><br></br>
For off-grid systems, it is then connected to a battery. <br></br><br></br>


		      </body1>
		</Paper>
            </Grid>
	  </Grid>
	</React.Fragment>
    )
};


export default SystemPage;
