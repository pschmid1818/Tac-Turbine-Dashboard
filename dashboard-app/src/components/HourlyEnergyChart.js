import React from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { API_URL, CUBEJS_TOKEN } from '../App'

import * as d3 from 'd3';
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

  // Transform data into D3 format
  const keys = resultSet.seriesNames().map(s => s.key)
  const data = d3.stack()
    .keys(keys)
    (resultSet.chartPivot())

  // Color palette
  const color = d3.scaleOrdinal()
    .domain(keys)
    .range(COLORS_SERIES)

  // Add X axis
  const x = d3.scaleBand()
    .range([0, width])
    .domain(resultSet.chartPivot().map(c => c.x))
    .padding(0.3)

  const xx = d3.scaleBand()
    .range([0, width])
    .domain(resultSet.chartPivot().map(c => d3.isoParse(c.x)))
    .padding(0.3)


  const xaxis = d3.axisBottom()
    .scale(xx)
    .tickFormat(d3.timeFormat("%I %p"))
    .tickValues(xx.domain().filter(function (d, i) { return !(i % 4) }));


  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xaxis);
  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, d3.max(data.map((s) => d3.max(s, (i) => i[1])))])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add the bars
  svg.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(data)
    .enter().append("g")
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    // enter a second time = loop subgroup per subgroup to add all rectangles
    .data(d => d)
    .enter().append("rect")
    .attr("x", d => x(d.data.x))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth())

}

const barRender = ({ resultSet }) => (
  <div ref={el => el && draw(el, resultSet, 'bar')} />
)

const cubejsApi = cubejs(CUBEJS_TOKEN, { apiUrl: API_URL + "/cubejs-api/v1" });

const renderChart = (Component) => ({ resultSet, error }) => (
  (resultSet && <Component resultSet={resultSet} />) ||
  (error && error.toString()) ||
  (<Spin />)
)


const HourlyEnergyChart = () => <QueryRenderer
  query={{
    "measures": [
      "DashboardData.Power"
    ],
    "timeDimensions": [
      {
        "dimension": "DashboardData.time",
        "granularity": "hour",
        "dateRange": ['2020-04-02', '2020-04-03']

      }
    ],
    "filters": []
  }}
  cubejsApi={cubejsApi}
  render={renderChart(barRender)}
/>;

export default HourlyEnergyChart;
