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
import FormControl from "@material-ui/core/FormControl";


const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODY4Nzg3NDEsImV4cCI6MTU4Njk2NTE0MX0.li3h32bfPGZ7JkuoFahMWZrBhMaIoJdaX-UqIPOJ1rU",
    { apiUrl: App.API_URL + "/cubejs-api/v1" }
  );

const GraphTypes = {
    turbineVoltage: "Turbine Voltage",
    totalEnergyGraph: "Total Energy",
    inverterCurrent: "Inverter Current",
    inverterPower: "Inverter Power",
    inverterVoltage: "Inverter Voltage"
};

const GranularityTypes =  {
    day: "day",
    // hour: "hour",
    month: "month",
    year: "year"
};

const GraphTypeToColumnMap = new Map<String, String>();
//These columns were not available to us at the time of development, so they could not be populated here
GraphTypeToColumnMap.set(GraphTypes.turbineVoltage, "DashboardData.Voltage");
GraphTypeToColumnMap.set(GraphTypes.totalEnergyGraph, "DashboardData.Power");
GraphTypeToColumnMap.set(GraphTypes.inverterCurrent, "DashboardData.InverterI");
GraphTypeToColumnMap.set(GraphTypes.inverterPower, "DashboardData.InverterL");
GraphTypeToColumnMap.set(GraphTypes.inverterVoltage, "DashboardData.InverterV");


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

function renderGraph(graphType: String, startDate: Date, endDate: Date, granularity: string): JSX.Element {
    const graphQuery = {
        "measures": [
            GraphTypeToColumnMap.get(graphType),
        ],
        "timeDimensions": [
            {
                "dimension": "DashboardData.time",
                dateRange: [startDate, endDate],
                "granularity": granularity
            }
        ],
        "filters": []
    };

    return (
        <QueryRenderer
            query={graphQuery}
            cubejsApi={cubejsApi}
            render={renderChart(barRender)}
        >

        </QueryRenderer>
    );
}

function renderSelectorItemsFromObject(obj): JSX.Element[] {
    const output: JSX.Element[] = [];
    for(const prop in obj) {
        const name = obj[prop];
        output.push(<MenuItem value={name}>{name}</MenuItem>);
    }
    return output;
}

const startDateOffset = 60;

const HistoricalData = () => {
    const classes = useStyles();

    const [graph1Type, setGraph1Type] = React.useState(GraphTypes.totalEnergyGraph);
    const [graph2Type, setGraph2Type] = React.useState(GraphTypes.totalEnergyGraph);
    const [startDate, setStartDate] = React.useState(new Date( Date.now() - ( startDateOffset * 24 * 60 * 60 * 1000)));
    const [endDate, setEndDate] = React.useState(new Date());

    const [granularity, setGranularity] = React.useState(GranularityTypes.day);

    function renderDateRangeSelector(): JSX.Element {
        return (
            <Paper>
                <Title>Date Range</Title>
                <MuiPickersUtilsProvider utils = {DateFnsUtils}>
                <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Start date"
                value={startDate}
                onChange={(date, value) => { setStartDate(value as any) }}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="End date"
                value={endDate}
                onChange={(date, value) => { setEndDate(value as any) }}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
                </MuiPickersUtilsProvider>
            </Paper>
        );  
    }

    function renderGranularitySelector(granularity: string, setGranularity): JSX.Element {
        return (
            <Paper>
                <Title>Set Time Scale</Title>
                <FormControl>
                    <Select
                        value={granularity}
                        onChange={(event) => { setGranularity(event.target.value) }}
                    >
                    {renderSelectorItemsFromObject(GranularityTypes)}
                    </Select>
                </FormControl>
            </Paper>
        );
    }
    
    function renderGraphBox(graphType: string, setGraphType): JSX.Element {
        return (
            <Paper>
                <FormControl>
                    <Select
                        value={graphType}
                        onChange={(event) => { setGraphType(event.target.value) } }
                    >
                        {renderSelectorItemsFromObject(GraphTypes)}
                    </Select>
                </FormControl>
                {renderGraph(graphType, startDate, endDate, granularity)}
            </Paper>
        );
    }
    
    return (
        <Grid container spacing={3}>
            <Grid item>
                {renderGraphBox(graph1Type, setGraph1Type)}
            </Grid>
            <Grid item>
                {renderGraphBox(graph2Type, setGraph2Type)}
            </Grid>
            <Grid item>
                {renderDateRangeSelector()}
            </Grid>
            <Grid item>
                {renderGranularitySelector(granularity, setGranularity)}
            </Grid>
        </Grid>
    );
};


export default HistoricalData;
