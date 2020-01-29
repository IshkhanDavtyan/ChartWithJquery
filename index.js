let mainObj = {
    apple: 25,
    banana: 36,
    apricot: 44,
    milk: 55
}

let translatedObj = {
    apple: "խնձոր",
    banana: "բանան",
    apricot: "ծիրան",
    milk: "կաթ"
}



const colors = ["red", "green", "yellow", "black"]


createChart = (main, translated, needId) => {

    let keysArr = [];
    let valueArr = [];

    for (let [key, val] of Object.entries(main)) {
        valueArr.push(val)
    }

    for (let [key, val] of Object.entries(translated)) {
        keysArr.push(val)
    }

    let valueProcent = [];
    let sum = 0

    valueArr.forEach(el => {
        sum += el
    })
    valueArr.forEach(el => {
        valueProcent.push(Math.round(el / sum * 100))
    })

    const dataLengthColors = []



    for (let i = 0; i < valueProcent.length; i++) {
        dataLengthColors.push(colors[i])

    }

    // Chart.pluginService.register({
    //     beforeDraw: function (chart) {
    //         var width = chart.chart.width,
    //             height = chart.chart.height,
    //             ctx = chart.chart.ctx;
    //         ctx.restore();
    //         var fontSize = (height / 114).toFixed(2);
    //         ctx.font = fontSize + "em sans-serif";
    //         ctx.textBaseline = "middle";
    //         ctx.save();
    //     }
    // });

    // var chartData = [{"visitor": 39, "visit": 1}, {"visitor": 18, "visit": 2}, {"visitor": 9, "visit": 3}, {"visitor": 5, "visit": 4}, {"visitor": 6, "visit": 5}, {"visitor": 5, "visit": 6}, {"visitor": 98, "visit": 6}]

    // var visitorData = [],
    //     sum = 0,
    //     visitData = [];

    // for (var i = 0; i < chartData.length; i++) {
    //     visitorData.push(chartData[i]['visitor'])
    //     visitData.push(chartData[i]['visit'])

    //     sum += chartData[i]['visitor'];
    // }

    // var textInside = sum.toString();

    var myChart = new Chart(document.getElementById(needId), {
        type: 'doughnut',
        animation: {
            animateScale: true
        },
        data: {
            labels: keysArr,
            datasets: [{
                label: 'Visitor',
                data: valueProcent,
                backgroundColor: dataLengthColors
            }]
        },
        options: {

            responsive: true,
            legend: false,
            legendCallback: function (chart) {
                var legendHtml = [];
                legendHtml.push('<ul>');
                var item = chart.data.datasets[0];
                for (var i = 0; i < item.data.length; i++) {
                    legendHtml.push('<li>');
                    legendHtml.push('<span class="chart-legend-label-text">' + item.data[i] + ' % ' + ' </span>');
                    legendHtml.push('<span class="chart-legend" style="background-color:' + item.backgroundColor[i] + '"></span>');
                    legendHtml.push('<span class="chart-legend-label-text">' + chart.data.labels[i] + '</span>');
                    legendHtml.push('</li>');
                }

                legendHtml.push('</ul>');
                return legendHtml.join("");
            },
            tooltips: {
                enabled: true,
                mode: 'label',
                callbacks: {
                    label: function (tooltipItem, data) {
                        var indice = tooltipItem.index;
                        return data.datasets[0].data[indice] + " : " + data.labels[indice] ;
                    }
                },

                bodyFontSize: 20,
                backgroundColor: "#6F6B6A",
                position: "average",
                footerFontSize: 10,
                bodyFontColor: "#0C0B0A",
                displayColors: false

            },
        }
    });

    $('#my-legend-con').html(myChart.generateLegend());

    console.log(document.getElementById('my-legend-con'));

}

createChart(mainObj, translatedObj, "mychart")

