import * as App from "../App";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChartRenderer from "../components/ChartRenderer";
import DashboardItem from "../components/DashboardItem";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Paper from '@material-ui/core/Paper';
import Title from "../components/Title";
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { useStyles } from "../Styles"
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import { Spin } from 'antd';
import { Chart, Axis, Tooltip, Geom, Coord, Legend } from 'bizcharts';


const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODY4Nzg3NDEsImV4cCI6MTU4Njk2NTE0MX0.li3h32bfPGZ7JkuoFahMWZrBhMaIoJdaX-UqIPOJ1rU",
    { apiUrl: App.API_URL + "/cubejs-api/v1" }
  );

enum GraphTypes {
    totalEnergyGraph = "Total Energy",
    averageTemperature = "Average Temperature",
    averageWindSpeed = "Average Wind Speed",
    averageWindHeading = "Average Wind heading",
    averageAirPressure = "Average Air Pressure",
    typicalHouseholdElectricityNeeds = "Typical Household Electricity Needs"
};

const GraphTypeToColumnMap = new Map<string, string>();
GraphTypeToColumnMap.set(GraphTypes.totalEnergyGraph, "DashboardData.Power");
GraphTypeToColumnMap.set(GraphTypes.averageTemperature, "");
GraphTypeToColumnMap.set(GraphTypes.averageWindSpeed, "");
GraphTypeToColumnMap.set(GraphTypes.averageWindHeading, "");
GraphTypeToColumnMap.set(GraphTypes.averageAirPressure, "");
GraphTypeToColumnMap.set(GraphTypes.typicalHouseholdElectricityNeeds, "");

const stackedChartData = (resultSet) => {
    const data = resultSet.pivot().map(
      ({ xValues, yValuesArray }) =>
        yValuesArray.map(([yValues, m]) => ({
          x: resultSet.axisValuesString(xValues, ', '),
          color: resultSet.axisValuesString(yValues, ', '),
          measure: m && Number.parseFloat(m)
        }))
    ).reduce((a, b) => a.concat(b), []);
  
    return data;
}

const barRender = ({ resultSet }) => (
    <Chart scale={{ x: { tickCount: 8 } }} height={400} data={stackedChartData(resultSet)} forceFit>
      <Axis name="x" />
      <Axis name="measure" />
      <Tooltip />
      <Geom type="intervalStack" position={`x*measure`} color="color" />
    </Chart>
  );

const renderChart = (Component) => ({ resultSet, error }) => (
    (resultSet && <Component resultSet={resultSet} />) ||
    (error && error.toString()) || 
    (<Spin />)
  )

class GraphInstance extends React.Component {
    constructor(props: any) {
        super(props);
        
        this.selectedType = GraphTypes.totalEnergyGraph;
        this.setGraphMeasuresColumn();
    }

    selectedType: GraphTypes;

    renderGraphSelectorItems(): JSX.Element[] {
        const output: JSX.Element[] = [];
        for(const type in GraphTypes) {
            console.log(type)
            output.push(<MenuItem value={type}>{type}</MenuItem>);
        }
        return output;
    }

    graphQuery: any = {
        "measures": [],
        "timeDimensions": [
            {
                "dimension": "DashboardData.time",
                "granularity": "day"
            }
        ],
        "filters": []
    };

    setGraphMeasuresColumn() {
        this.graphQuery.measures = [GraphTypeToColumnMap.get(this.selectedType)];
    }

    graph(): JSX.Element {
        return (
            <QueryRenderer
                query={this.graphQuery}
                cubejsApi={cubejsApi}
                render={renderChart(barRender)}
            >

            </QueryRenderer>
        );
    }

    renderGraphSelector(): JSX.Element {
        return (
            <div>
                <Select
                    name='graphSelector'
                    value={this.selectedType}
                    onChange={() => {this.setGraphMeasuresColumn()}}
                >
                    {this.renderGraphSelectorItems()}
                </Select>
                {this.graph()}
            </div>
        );
    }

    render(): JSX.Element {
        return (
            <Paper>
                {this.renderGraphSelector()}
            </Paper>
        );
    }
}

class DateSelector extends React.Component {
    constructor(props: any) {
        super(props);
    }

    date = new Date();

    handleUpdate(): void {

    }

    render(): JSX.Element {
        return (
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={this.date}
                onChange={this.handleUpdate}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        );
    }
}

class DateRangeSelector extends React.Component {
    render(): JSX.Element {
        return (
            <Paper>
                <Title>Date Range</Title>
                <MuiPickersUtilsProvider utils = {DateFnsUtils}>
                    <DateSelector></DateSelector>
                    <DateSelector></DateSelector>
                </MuiPickersUtilsProvider>
            </Paper>
        );  
    }
}

class HistoricalDataPage extends React.Component {
    render(): JSX.Element {
        return (
            <Grid container spacing={3}>
                <Grid item>
                    <GraphInstance></GraphInstance>                
                </Grid>
                <Grid item>
                    <GraphInstance></GraphInstance>                
                </Grid>
                <Grid item>
                    <DateRangeSelector></DateRangeSelector>
                </Grid>
            </Grid>
        );
    }
}

const HistoricalData = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <HistoricalDataPage></HistoricalDataPage>
        </div>
    );
};


export default HistoricalData;
