import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import { useStyles } from "../Styles"
import Title from "../components/Title";

import Pic1 from '../images/MoreInfo1.png'
import Pic2 from '../images/MoreInfo2.jpg'
import Pic3 from '../images/MoreInfo3.jpg'
import Pic4 from '../images/MoreInfo4.jpg'
import Pic5 from '../images/MoreInfoQR1.png'
import Pic6 from '../images/MoreInfoQR2.png'
import Line from '../images/clarksonGreen.png'

const MoreInfo = () => {
    const classes = useStyles()
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Title>More Information</Title>
                        <div>A ducted turbine uses a duct or shroud to increase the mass flow through the wind turbine rotor. This increases the wind power that the rotor ‘sees’ and thus the amount of energy it can extract from the air. Ducted turbines can double the output energy for a given rotor size, but there is an increased cost for the additional structure.</div>
                        <img alt="Not Loaded" src={Pic1} height='800px' width='100%'></img>
                        <div>Note that the smaller opening of the duct is, non-intuitively, pointing upstream.</div>
                        <br></br>
                        <br></br>
                        <img alt="Not Loaded" src={Line} height='10px' width='100%'></img>
                        <br></br>
                        <br></br>
                        <div>Clarkson University Associate Professor Ken Visser, discovered that by moving the rotor farther aft into the duct, the energy from the turbine could be increased. After a series of successful wind tunnel tests at the University of Waterloo in 2016 he started a company to commercialize the technology called Ducted Wind Turbines, Inc..</div>
                        <br></br>
                        <div class="column">
                            <img alt="Not Loaded" src={Pic2} height='500px' width='50%'></img>
                            <img alt="Not Loaded" src={Pic3} height='500px' width='50%'></img>
                        </div>
                        <br></br>
                        <div>For more of the test results or DWT use one of the QR codes below.</div>
                        <div class="column">
                            <img alt="Not Loaded" src={Pic5} height='200px' width='235px'></img>
                            <img alt="Not Loaded" src={Pic6} height='210px' width='200px'></img>
                        </div>
                        <br></br>
                        <br></br>
                        <img alt="Not Loaded" src={Line} height='10px' width='100%'></img>
                        <br></br>
                        <br></br>
                        <div>In 2017, the Clarkson campus voted to use the annual Institute for a Sustainable Environment’s Sustainability Fund to build a prototype ducted wind turbine on campus. Professor Visser, the lead designer and implementer, continues to use it as a research test bed to improve the system design.</div>
                        <br></br>
                        <img alt="Not Loaded" src={Pic4} height='600px' width='100%'></img>
                        <div>For more information, contact Dr. Visser at kvisser@clarkson.edu</div>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
};


export default MoreInfo;
