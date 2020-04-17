import React from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from "recharts";

const CartesianChart = ({ resultSet, children, ChartComponent }) => (
  <ResponsiveContainer width={600} height={350}>
    <ChartComponent data={resultSet.chartPivot()}>
      <XAxis dataKey="x" />
      <YAxis />
      <CartesianGrid />
      { children }
      <Legend />
      <Tooltip />
    </ChartComponent>
  </ResponsiveContainer>
)

const colors = ['#FF6492', '#141446', '#7A77FF'];

const lineRender = ({ resultSet }) => (
  <CartesianChart resultSet={resultSet} ChartComponent={LineChart}>
      {resultSet.seriesNames().map((series, i) => (
        <Line
          key={series.key}
          stackId="a"
          dataKey={series.key}
          name={series.title}
          stroke={colors[i]}
        />
      ))}
  </CartesianChart>
);

const API_URL = "http://localhost:4000"; // change to your actual endpoint

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODcwNzU4NjYsImV4cCI6MTU4NzE2MjI2Nn0.6Ij0Ha-OzwmtZUQfnzqC8BfdFNrleResOu-EjjrSUns",
  { apiUrl: API_URL + "/cubejs-api/v1" }
);

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
        "dateRange": ['2020-04-02','2020-04-03']
      }
    ],
    "filters": []
  }}
  cubejsApi={cubejsApi}
  render={renderChart(lineRender)}
/>;

export default InstantaneousPowerChart;
