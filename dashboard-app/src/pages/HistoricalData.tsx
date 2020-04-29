import { API_URL, CUBEJS_TOKEN } from "../App"
import React from "react";
import Grid from "@material-ui/core/Grid";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Paper from '@material-ui/core/Paper';
import Title from "../components/Title";
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { useStyles } from "../Styles"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Spin } from 'antd';
import FormControl from "@material-ui/core/FormControl";
import * as d3 from 'd3';


const cubejsApi = cubejs(CUBEJS_TOKEN, { apiUrl: API_URL + "/cubejs-api/v1" });


const GraphTypes = {
    turbineVoltage: "Turbine Voltage",
    totalEnergyGraph: "Total Energy",
    inverterCurrent: "Inverter Current",
    inverterPower: "Inverter Power",
    inverterVoltage: "Inverter Voltage"
};

const GranularityTypes = {
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


const COLORS_SERIES = ['#FF6492', '#141446', '#7A77FF'];

const draw = (node, resultSet, chartType) => {
    // Set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = node.clientWidth - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    d3.select(node).html("");
    const svg = d3.select(node)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Prepare data in D3 format
    const data = resultSet.series().map((series) => ({
        key: series.title, values: series.series
    }));

    // color palette
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.key))
        .range(COLORS_SERIES)

    // Add X axis
    const x = d3.scaleTime()
        .domain(d3.extent(resultSet.chartPivot(), c => d3.isoParse(c.x)))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, d3.max(data.map((s) => d3.max(s.values, (i) => i.value)))])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Draw the lines
    svg.selectAll(".line")
        .data(data)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", d => color(d.key))
        .attr("stroke-width", 1.5)
        .attr("d", (d) => {
            return d3.line()
                .x(d => x(d3.isoParse(d.x)))
                .y(d => y(+d.value))
                (d.values)
        })

}

const lineRender = ({ resultSet }) => (
    <div ref={el => el && draw(el, resultSet, 'line')} />
)

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
            render={renderChart(lineRender)}
        >

        </QueryRenderer>
    );
}

function renderSelectorItemsFromObject(obj): JSX.Element[] {
    const output: JSX.Element[] = [];
    for (const prop in obj) {
        const name = obj[prop];
        output.push(<MenuItem value={name}>{name}</MenuItem>);
    }
    return output;
}

const startDateOffset = 60;

const HistoricalData = () => {
    const classes = useStyles();
    const [graph1Type, setGraph1Type] = React.useState(GraphTypes.totalEnergyGraph);
    const [graph1Granularity, setGraph1Granularity] = React.useState(GranularityTypes.day);
    const [graph2Type, setGraph2Type] = React.useState(GraphTypes.totalEnergyGraph);
    const [graph2Granularity, setGraph2Granularity] = React.useState(GranularityTypes.day);
    const [startDate, setStartDate] = React.useState(new Date(Date.now() - (startDateOffset * 24 * 60 * 60 * 1000)));
    const [endDate, setEndDate] = React.useState(new Date());

    function renderDateRangeSelector(): JSX.Element {
        return (
            <Paper className={classes.paper}>
                <Title>Date Range</Title>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
            <div>
                {/* <h3>Set Time Scale</h3> */}
                <FormControl>
                    <Select
                        value={granularity}
                        onChange={(event) => { setGranularity(event.target.value) }}
                    >
                        {renderSelectorItemsFromObject(GranularityTypes)}
                    </Select>
                </FormControl>
            </div>

        );
    }

    function renderGraphBox(graphType: string, setGraphType, granularity: string, setGranularity): JSX.Element {
        return (
            <Paper className={classes.paper}>
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item>
                        <FormControl>
                            <Select
                                value={graphType}
                                onChange={(event) => { setGraphType(event.target.value) }}
                            >
                                {renderSelectorItemsFromObject(GraphTypes)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        {renderGranularitySelector(granularity, setGranularity)}

                    </Grid>
                </Grid>
                {renderGraph(graphType, startDate, endDate, granularity)}
            </Paper>
        );
    }

    return (
        <Grid container spacing={3} className={classes.centerGrid}>
            <Grid item>
                {renderDateRangeSelector()}
            </Grid>
            <Grid item lg={7} >
                <Grid container spacing={3}>
                    <Grid item xl>
                        {renderGraphBox(graph2Type, setGraph2Type, graph2Granularity, setGraph2Granularity)}
                    </Grid>
                    <Grid item xl={12}>
                        {renderGraphBox(graph1Type, setGraph1Type, graph1Granularity, setGraph1Granularity)}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};


export default HistoricalData;
