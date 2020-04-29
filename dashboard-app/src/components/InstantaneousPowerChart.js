import React from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { API_URL, CUBEJS_TOKEN } from '../App'

import * as d3 from 'd3';
const COLORS_SERIES = ['#FF6492', '#141446', '#7A77FF'];

const draw = (node, resultSet, chartType) => {
  // Set the dimensions and margins of the graph
  const margin = {top: 10, right: 30, bottom: 30, left: 60},
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
    .domain(data.map(d => d.key ))
    .range(COLORS_SERIES)

  // Add X axis
  const x = d3.scaleTime()
    .domain(d3.extent(resultSet.chartPivot(), c => d3.isoParse(c.x)))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, d3.max(data.map((s) => d3.max(s.values, (i) => i.value)))])
    .range([ height, 0 ]);
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

const cubejsApi = cubejs(CUBEJS_TOKEN, { apiUrl: API_URL + "/cubejs-api/v1" });


const renderChart = (Component) => ({ resultSet, error }) => (
  (resultSet && <Component resultSet={resultSet} />) ||
  (error && error.toString()) || 
  (<Spin />)
)

const InstantaneousPowerChart = () => <QueryRenderer
  query={{
    "measures": [
      "DashboardData.Power"
    ],
    "timeDimensions": [
      {
        "dimension": "DashboardData.time",
        "granularity": "minute",
        "dateRange": ['	2020-04-02T12:00:00','	2020-04-02T15:00:00']
      }
    ],
    "filters": []
  }}
  cubejsApi={cubejsApi}
  render={renderChart(lineRender)}
/>;

export default InstantaneousPowerChart;
