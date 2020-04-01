cube(`DashboardData`, {
  sql: `SELECT * FROM tacturbine_dashboard.dashboard_data`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: []
    },
    
    phlosscount: {
      sql: `${CUBE}.\`phLossCount\``,
      type: `sum`
    }
  },
  
  dimensions: {
    time: {
      sql: `time`,
      type: `time`
    }
  }
});
