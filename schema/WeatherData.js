cube(`WeatherData`, {
  sql: `SELECT * FROM tacturbine_dashboard.weather_data`,

  joins: {

  },

  measures: {
    count: {
      type: `count`,
      drillMembers: []
    },
    wind_mph: {
      sql: 'windMPH',
      type: 'number',

    },
    tempF: {
      sql: 'tempF',
      type: 'number',

    },
    windDIR: {
      sql: 'windDIR',
      type: 'number',

    },
    pressureMB: {
      sql: 'pressureMB',
      type: 'number',

    },
    humidityRelative: {
      sql: 'humidityRelative',
      type: 'number',

    },
    dewpointF: {
      sql: 'dewpointF',
      type: 'number',

    },
  },

  dimensions: {
    time: {
      sql: `time`,
      type: `time`
    }
  }
});
