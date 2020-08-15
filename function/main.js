// main.js

//change chart
$(document).ready(function () {
  var active = "phong_xa";
  var dps = [],
    chart,
    temp;

  // function getData() {
  //   return new Promise(function (resolve) {
  //     $.get("http://nguyen-nulab.ddns.net:8001/web/updatert").then(function (
  //       response
  //     ) {
  //       // $.get("https://rewes.herokuapp.com/").then(function (response) {
  //       // $.get("https://dummy-data-rewes.herokuapp.com/").then(function (
  //       //   response
  //       // ) {
  //       resolve(response);
  //     });
  //   });
  // }

  function changeActive(id) {
    $("#btn_phong_xa").removeClass("active");
    $("#btn_nhiet_do").removeClass("active");
    $("#btn_do_am").removeClass("active");
    $("#btn_khi_co2").removeClass("active");
    $("#btn_khi_ch4").removeClass("active");
    $("#btn_sensor_3").removeClass("active");
    $("#" + id + "").addClass("active");
  }

  function drawChart(title, titleY, labelY) {
    chart = new CanvasJS.Chart("chart1", {
      theme: "light2",
      title: {
        text: title,
      },
      axisX: {},
      axisY: {
        title: titleY,
        labelFormatter: function (e) {
          return e.value + " " + labelY;
        },
      },
      data: [
        {
          type: "line",
          markerSize: 10,
          dataPoints: dps,
        },
      ],
    });
    chart.render();
  }

  //update chart
  function updateChart(x, y) {
    dps.push({
      x: x,
      y: y.value,
      label: y.label,
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
      label: y.label,
    });
    if (dps.length > 20) {
      dps.shift();
    }
    chart.render();
  }

  function updateStatic(
    createDate,
    dose,
    temperature,
    humidity,
    sensor1,
    sensor2,
    sensor3
  ) {
    $("#static_createDate").text(
      new Date(createDate).toLocaleDateString("vi-VN") +
        " " +
        new Date(createDate).toLocaleTimeString("vi-VN")
    );
    $("#static_dose").text(dose);
    $("#static_temperature").text(temperature);
    $("#static_humidity").text(humidity);
    $("#static_sensor1").text(sensor1);
    $("#static_sensor2").text(sensor2);
    $("#static_sensor3").text(sensor3);
  }

  drawChart("Suất liều", "dose", "μSv/h");
  $("#btn_phong_xa").click(function () {
    dps = [];
    active = "phong_xa";
    drawChart("Dose Chart", "dose", "μSv/h");
    changeActive("btn_phong_xa");
  });
  $("#btn_nhiet_do").click(function () {
    dps = [];
    active = "nhiet_do";
    drawChart("Nhiệt độ", "temperature", "°C");
    changeActive("btn_nhiet_do");
  });
  $("#btn_do_am").click(function () {
    dps = [];
    active = "do_am";
    drawChart("Độ ẩm", "humidity", "%");
    changeActive("btn_do_am");
  });
  $("#btn_khi_co2").click(function () {
    dps = [];
    active = "khi_co2";
    drawChart("Khí CO", "CO", "ppm");
    changeActive("btn_khi_co2");
  });
  $("#btn_khi_ch4").click(function () {
    dps = [];
    active = "khi_ch4";
    drawChart("Khí CH4", "CH4", "ppm");
    changeActive("btn_khi_ch4");
  });
  $("#btn_sensor_3").click(function () {
    dps = [];
    active = "khi_ch4";
    drawChart("Bụi mịn", "Bụi mịn", "µg/m3");
    changeActive("btn_sensor_3");
  });
  // var socket = io.connect('http://localhost');
  var x = 0;
  setInterval(function () {
    getData().then(function (data) {
      var response = data;
      x += 1;
      var label = new Date().toLocaleTimeString("vi-VN");
      updateStatic(
        new Date(),
        response.dose.toFixed(4),
        response.temperature.toFixed(4),
        response.humidity.toFixed(4),
        response.CO.toFixed(4),
        response.CH4.toFixed(4),
        response.dust.toFixed(4)
      );
      switch (active) {
        case "phong_xa":
          updateChart(x, { label: label, value: response.dose });
          break;
        case "nhiet_do":
          updateChart(x, { label: label, value: response.temperature });
          break;
        case "do_am":
          updateChart(x, { label: label, value: response.humidity });
          break;
        case "khi_co2":
          updateChart(x, { label: label, value: response.CO });
          break;
        case "khi_ch4":
          updateChartCH4(x, { label: label, value: response.CH4 });
          break;
        case "sensor3":
          updateChart(x, { label: label, value: response.dust });
          break;
      }
    });
  }, 2000);
});
