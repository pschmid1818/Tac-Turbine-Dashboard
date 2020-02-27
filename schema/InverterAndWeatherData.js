cube(`InverterAndWeatherData`, {
  sql: `SELECT * FROM blackboard_gui.inverter_and_weather_data`,
  
  joins: {
    
  },
  
  measures: {

    tempCelsius: {
      sql: `temp_celsius`,
      type: `number`
    },

    count: {
      type: `count`,
      drillMembers: [idc1, idc2, relativeHumidity]
    }

    
  },
  
  dimensions: {
    dewpointCelsius: {
      sql: `dewpoint_celsius`,
      type: `string`
    },
    
    energy: {
      sql: `${CUBE}.\`ENERGY\``,
      type: `string`
    },
    
    genfreq: {
      sql: `${CUBE}.\`GENFREQ\``,
      type: `string`
    },
    
    iac: {
      sql: `${CUBE}.\`IAC\``,
      type: `string`
    },
    
    idc1: {
      sql: `${CUBE}.\`IDC1\``,
      type: `string`
    },
    
    idc2: {
      sql: `${CUBE}.\`IDC2\``,
      type: `string`
    },
    
    ileak: {
      sql: `${CUBE}.\`ILEAK\``,
      type: `string`
    },
    
    pac: {
      sql: `${CUBE}.\`PAC\``,
      type: `string`
    },
    
    pdc1: {
      sql: `${CUBE}.\`PDC1\``,
      type: `string`
    },
    
    pdc2: {
      sql: `${CUBE}.\`PDC2\``,
      type: `string`
    },
    
    pressureMb: {
      sql: `pressure_mb`,
      type: `string`
    },
    
    relativeHumidity: {
      sql: `relative_humidity`,
      type: `string`
    },
    
    riso: {
      sql: `${CUBE}.\`RISO\``,
      type: `string`
    },
    

    
    tint: {
      sql: `${CUBE}.\`TINT\``,
      type: `string`
    },
    
    tinv: {
      sql: `${CUBE}.\`TINV\``,
      type: `string`
    },
    
    vac: {
      sql: `${CUBE}.\`VAC\``,
      type: `string`
    },
    
    vdc1: {
      sql: `${CUBE}.\`VDC1\``,
      type: `string`
    },
    
    vdc2: {
      sql: `${CUBE}.\`VDC2\``,
      type: `string`
    },
    
    windHeading: {
      sql: `wind_heading`,
      type: `string`
    },
    
    windspeedMph: {
      sql: `windspeed_mph`,
      type: `string`
    },
    
    timeStamp: {
      sql: `time_stamp`,
      type: `time`
    }
  }
});
