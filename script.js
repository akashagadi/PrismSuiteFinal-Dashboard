let modalChart;

/* BASE OPTIONS */
const baseOptions = {
  chart: { type: 'area', height: 230, toolbar: { show: false } },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  xaxis: { categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] }
};

/* CHARTS */
const charts = {
  health: new ApexCharts(
    document.querySelector("#chart-health"),
    { ...baseOptions, series: [{ name: 'Health %', data: [82,85,88,90,87,91,93] }] }
  ),

  // performance: new ApexCharts(
  //   document.querySelector("#chart-performance"),
  //   { chart: { type: 'bar', height: 230 },
  //     series: [{ name: 'Score', data: [75,80,78,85,88] }],
  //     xaxis: { categories: ['Node1','Node2','Node3','Node4','Node5'] }
  //   }
  // ),

  security: new ApexCharts(
    document.querySelector("#chart-security"),
    { chart: { type: 'donut', height: 230 },
      series: [65, 25, 10],
      labels: ['Secure','Warnings','Critical']
    }
  ),

  config: new ApexCharts(
    document.querySelector("#chart-config"),
    { ...baseOptions, series: [{ name: 'Compliance', data: [60,68,72,75,78,82,85] }] }
  ),

  gap: new ApexCharts(
    document.querySelector("#chart-gap"),
    { chart: { type: 'bar', height: 230 },
      series: [{ name: 'Gaps Found', data: [12,9,7,5,3] }],
      xaxis: { categories: ['Infra','Network','IAM','Apps','Policies'] }
    }
  )
};

/* RENDER ALL */
Object.values(charts).forEach(c => c.render());
Highcharts.chart('chart-performance', {

    chart: {
        type: 'gauge',
        height: 230,
        backgroundColor: 'transparent',
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: null
    },

    pane: {
        startAngle: -90,
        endAngle: 90,
        background: null,
        center: ['50%', '75%'],
        size: '110%'
    },

    yAxis: {
        min: 0,
        max: 100,
        tickPosition: 'inside',
        tickLength: 10,
        tickWidth: 2,
        lineWidth: 0,
        labels: {
            distance: 15,
            style: { fontSize: '11px' }
        },
        plotBands: [{
            from: 0,
            to: 60,
            color: '#ef4444',
            thickness: 15
        }, {
            from: 60,
            to: 80,
            color: '#facc15',
            thickness: 15
        }, {
            from: 80,
            to: 100,
            color: '#22c55e',
            thickness: 15
        }]
    },

    series: [{
        name: 'Performance Score',
        data: [78],
        tooltip: {
            valueSuffix: '%'
        },
        dataLabels: {
            format: '<div style="text-align:center">' +
                    '<span style="font-size:20px;font-weight:600">{y}%</span><br/>' +
                    '<span style="font-size:12px;opacity:0.6">Score</span>' +
                    '</div>',
            borderWidth: 0,
            useHTML: true
        },
        dial: {
            radius: '80%',
            backgroundColor: '#6366f1',
            baseWidth: 8,
            baseLength: '0%',
            rearLength: '0%'
        },
        pivot: {
            backgroundColor: '#6366f1',
            radius: 5
        }
    }]

});


document.querySelectorAll('.chart-click').forEach(chartEl => {
  chartEl.addEventListener('click', () => {

    const moduleKey = chartEl.id.replace('chart-', '');
    const modalTitleMap = {
      health: 'Health Quotient – Detailed Metrics',
      performance: 'Performance & HA Grading',
      security: 'Security Posture Findings',
      config: 'Configuration Assistance Details',
      gap: 'Gap Analysis & Recommendations'
    };

    document.getElementById('modalTitle').innerText =
      modalTitleMap[moduleKey];

    document.getElementById('modalTableContainer').innerHTML =
      tables[moduleKey];
  });
});

