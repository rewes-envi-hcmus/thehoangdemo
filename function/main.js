
// main.js

//change chart
$(document).ready(function () {
    var active = 'phong_xa';
    var dps = [], chart, temp;
    function getData() {
        return new Promise(function (resolve) {

            // $.get('http://nguyen-nulab.ddns.net:8001/web/updatert').then(function (response) {
            $.get('https://rewes.herokuapp.com/').then(function (response) {
                resolve(response);
            });
        });
    }

    function changeActive(id) {
        $('#btn_phong_xa').removeClass('active');
        $('#btn_nhiet_do').removeClass('active');
        $('#btn_do_am').removeClass('active');
        $('#btn_khi_co2').removeClass('active');
        $('#btn_khi_ch4').removeClass('active');
        $('#btn_sensor_3').removeClass('active');
        $('#' + id + '').addClass('active');
    }

    function drawChart(title, titleY, labelY) {
        chart = new CanvasJS.Chart('chart1', {
            theme: 'light2',
            title: {
                text: title
            },
            axisX: {

            },
            axisY: {
                title: titleY,
                labelFormatter: function (e) {
                    return e.value + ' ' + labelY;
                }
            },
            data: [{
                type: 'line',
                markerSize: 10,
                dataPoints: dps
            }]
        });
        chart.render();
    }

    //update chart
    function updateChart(x, y) {
        dps.push({
            x: x,
            y: y.value,
            label: y.label
        });
        if (dps.length > 8) {
            dps.shift();
        }
        chart.render();

    }
    function updateChartCH4(x, y) {
        dps.push({
            x: x,
            y: y.value,
            label: y.label
        });
        if (dps.length > 20) {
            dps.shift();
        }
        chart.render();

    }








    function updateStatic(createDate, dose, temperature, humidity, sensor1, sensor2, sensor3) {
        $('#static_createDate').text(new Date(createDate).toLocaleDateString('vi-VN') + ' ' + new Date(createDate).toLocaleTimeString('vi-VN'));
        $('#static_dose').text(dose);
        $('#static_temperature').text(temperature);
        $('#static_humidity').text(humidity);
        $('#static_sensor1').text(sensor1);
        $('#static_sensor2').text(sensor2);
        $('#static_sensor3').text(sensor3);
        // if (dose > 0.05) {
        //     document.getElementById("static_dose").style.color = "red";
        // }
        // else {
        //     document.getElementById("static_dose").style.color = "white";
        // }
        // if (temperature > 31) {
        //     document.getElementById("static_temperature").style.color = "red";
        // }
        // else {
        //     document.getElementById("static_temperature").style.color = "white";
        // }
        // if (humidity > 60) {
        //     document.getElementById("static_humidity").style.color = "red";
        // }
        // else {
        //     document.getElementById("static_humidity").style.color = "white";
        // }
        // if (sensor1 > 5) {
        //     document.getElementById("static_sensor1").style.color = "red";
        // }
        // else {
        //     document.getElementById("static_sensor1").style.color = "white";
        // }
        // if (sensor2 > 50) {
        //     document.getElementById("static_sensor2").style.color = "red";
        // }
        // else {
        //     document.getElementById("static_sensor2").style.color = "white";
        // }
        // if (sensor3 > 23.5) {
        //     document.getElementById("static_sensor3").style.color = "red";
        // }
        // else {
        //     document.getElementById("static_sensor3").style.color = "white";
        // }
    }
    drawChart('Dose Chart', 'dose', 'μSv/h');
    $('#btn_phong_xa').click(function () {
        dps = [];
        active = 'phong_xa';
        drawChart('Dose Chart', 'dose', 'μSv/h');
        changeActive('btn_phong_xa');
    });
    $('#btn_nhiet_do').click(function () {
        dps = [];
        active = 'nhiet_do';
        drawChart('Temperature Chart', 'temperature', '°C');
        changeActive('btn_nhiet_do');
    });
    $('#btn_do_am').click(function () {
        dps = [];
        active = 'do_am';
        drawChart('Humidity Chart', 'humidity', '%');
        changeActive('btn_do_am');
    });
    $('#btn_khi_co2').click(function () {
        dps = [];
        active = 'khi_co2';
        drawChart('CO Chart', 'co', 'ppm');
        changeActive('btn_khi_co2');
    });
    $('#btn_khi_ch4').click(function () {
        dps = [];
        active = 'khi_ch4';
        drawChart('CH4 Chart', 'ch', 'ppm');
        changeActive('btn_khi_ch4');
    });
    $('#btn_sensor_3').click(function () {
        dps = [];
        active = 'khi_ch4';
        drawChart('Sensor 3', 'sensor 3', 'ppm');
        changeActive('btn_sensor_3');
    });
    // var socket = io.connect('http://localhost');
    var x = 0;
    setInterval(function () {
        getData().then(function (data) {
            var response = data;
            x += 1;
            var label = new Date().toLocaleTimeString('vi-VN');
            updateStatic(new Date(), (response.dose).toFixed(4), (response.Te).toFixed(4), (response.Hu).toFixed(4), (response.sen1).toFixed(4), (response.sen2).toFixed(4), (response.sen3).toFixed(4));
            switch (active) {
                case 'phong_xa':
                    updateChart(x, { label: label, value: response.dose });
                    break;
                case 'nhiet_do':
                    updateChart(x, { label: label, value: response.Te });
                    break;
                case 'do_am':
                    updateChart(x, { label: label, value: response.Hu });
                    break;
                case 'khi_co2':
                    updateChart(x, { label: label, value: response.sen1 });
                    break;
                case 'khi_ch4':
                    updateChartCH4(x, { label: label, value: response.sen2 });
                    break;
                case 'sensor3':
                    updateChart(x, { label: label, value: response.sen3 });
                    break;
            }
        })
    }, 2000);
});