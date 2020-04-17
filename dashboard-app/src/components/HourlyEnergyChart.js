import React from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import {
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line
} from "recharts";
import { Label } from 'bizcharts';

const CartesianChart = ({ resultSet, children, ChartComponent }) => (
  <ResponsiveContainer width={500} height={350}>
    <ChartComponent data={resultSet.chartPivot()}>
      <XAxis dataKey="x" label={{value: ''}} />

      <YAxis label={{ value: 'Hourly Energy DC (kWh/h)', angle: -90, position: 'left', offset: 10}} />
      <CartesianGrid />
      { children }
      <Tooltip />
    </ChartComponent>
  </ResponsiveContainer>
)

const colors = ['#FF6492', '#141446', '#7A77FF'];

const barRender = ({ resultSet }) => (
  <CartesianChart resultSet={resultSet} ChartComponent={BarChart}>
    {resultSet.seriesNames().map((series, i) => (
      <Bar
        key={series.key}
        stackId="a"
        dataKey={series.key}
        name={series.title}
        fill={colors[i]}
      />
    ))}
  </CartesianChart>
);

const API_URL = "http://localhost:4000"; // change to your actual endpoint

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODY4Nzg3NDEsImV4cCI6MTU4Njk2NTE0MX0.li3h32bfPGZ7JkuoFahMWZrBhMaIoJdaX-UqIPOJ1rU",
  { apiUrl: API_URL + "/cubejs-api/v1" }
);

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
        "dateRange": ['2020-04-02','2020-04-03']

      }
    ],
    "filters": []
  }}
  cubejsApi={cubejsApi}
  render={renderChart(barRender)}
/>;

export default HourlyEnergyChart;
