cube(`DashboardData`, {
  sql: `SELECT * FROM tacturbine_dashboard.dashboard_data`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: []
    },

    AC_Current: {
      sql:'currAC',
      type:'number',

    },
    AC_Frequency: {
      sql:'freqAC',
      type:'number',

    },
    Frequency: {
      sql:'frequency',
      type:'number',

    },
    InverterI: {
      sql:'inverterI',
      type:'number',

    },
    InverterL: {
      sql:'inverterL',
      type:'number',

    },

    InverterV: {
      sql:'inverterV',
      type:'number',

    },

    Power: {
      sql:'power',
      type:'number',

    },

    AC_Voltage: {
      sql:'voltAC',
      type:'number',

    },

    Voltage: {
      sql:'voltage',
      type:'number',

    },
    
    phlosscount: {
      sql: 'phLossCount',
      type: 'number'
    }
  },
  
  dimensions: {
    time: {
      sql: `time`,
      type: `time`
    }
  }
});
