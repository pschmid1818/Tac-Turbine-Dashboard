import React from "react";
import PropTypes from "prop-types";
import { useCubeQuery } from "@cubejs-client/react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Chart, Axis, Tooltip, Geom, Coord, Legend } from "bizcharts";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const stackedChartData = resultSet => {
  const data = resultSet
    .pivot()
    .map(({ xValues, yValuesArray }) =>
      yValuesArray.map(([yValues, m]) => ({
        x: resultSet.axisValuesString(xValues, ", "),
        color: resultSet.axisValuesString(yValues, ", "),
        measure: m && Number.parseFloat(m)
      }))
    )
    .reduce((a, b) => a.concat(b), []);
  return data;
};

const TypeToChartComponent = {
  line: ({ resultSet }) => (
    <Chart
      scale={{
        x: {
          tickCount: 8
        }
      }}
      height={400}
      data={stackedChartData(resultSet)}
      forceFit
    >
      <Axis name="x" />
      <Axis name="measure" />
      <Tooltip
        crosshairs={{
          type: "y"
        }}
      />
      <Geom type="line" position={`x*measure`} size={2} color="color" />
    </Chart>
  ),
  bar: ({ resultSet }) => (
    <Chart
      scale={{
        x: {
          tickCount: 8
        }
      }}
      height={400}
      data={stackedChartData(resultSet)}
      forceFit
    >
      <Axis name="x" />
      <Axis name="measure" />
      <Tooltip />
      <Geom type="intervalStack" position={`x*measure`} color="color" />
    </Chart>
  ),
  area: ({ resultSet }) => (
    <Chart
      scale={{
        x: {
          tickCount: 8
        }
      }}
      height={400}
      data={stackedChartData(resultSet)}
      forceFit
    >
      <Axis name="x" />
      <Axis name="measure" />
      <Tooltip
        crosshairs={{
          type: "y"
        }}
      />
      <Geom type="areaStack" position={`x*measure`} size={2} color="color" />
    </Chart>
  ),
  pie: ({ resultSet }) => (
    <Chart height={400} data={resultSet.chartPivot()} forceFit>
      <Coord type="theta" radius={0.75} />
      {resultSet.seriesNames().map(s => (
        <Axis name={s.key} />
      ))}
      <Legend position="right" />
      <Tooltip />
      {resultSet.seriesNames().map(s => (
        <Geom type="intervalStack" position={s.key} color="category" />
      ))}
    </Chart>
  ),
  number: ({ resultSet }) => (
    <Typography
      variant="h4"
      style={{
        textAlign: "center"
      }}
    >
      {resultSet.seriesNames().map(s => resultSet.totalRow()[s.key])}
    </Typography>
  ),
  table: ({ resultSet }) => (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          {resultSet.tableColumns().map(c => (
            <TableCell key={c.key}>{c.title}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {resultSet.tablePivot().map((row, index) => (
          <TableRow key={index}>
            {resultSet.tableColumns().map(c => (
              <TableCell key={c.key}>{row[c.key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
};
const TypeToMemoChartComponent = Object.keys(TypeToChartComponent)
  .map(key => ({
    [key]: React.memo(TypeToChartComponent[key])
  }))
  .reduce((a, b) => ({ ...a, ...b }));

const renderChart = Component => ({ resultSet, error, ...props }) =>
  (resultSet && <Component resultSet={resultSet} {...props} />) ||
  (error && error.toString()) || <CircularProgress />;

const ChartRenderer = ({ vizState }) => {
  const { query, chartType, ...options } = vizState;
  const component = TypeToMemoChartComponent[chartType];
  const renderProps = useCubeQuery(query);
  return component && renderChart(component)({ ...options, ...renderProps });
};

ChartRenderer.propTypes = {
  vizState: PropTypes.object,
  cubejsApi: PropTypes.object
};
ChartRenderer.defaultProps = {
  vizState: {},
  cubejsApi: null
};
export default ChartRenderer;
