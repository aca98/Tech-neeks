import React, { Component } from "react";
import { getAnalytics, getMonthlyAnalytics } from "../../services/httpService";
import ApexChart from "./Analytics";

class GeneralAnalytics extends Component {
  state = {
    seriesYear: [
      {
        name: "",
        data: [0],
      },
    ],
    seriesPrevious: [
      {
        name: "",
        data: [0],
      },
    ],
    seriesCurrent: [
      {
        name: "",
        data: [0],
      },
    ],
  };
  categories = [
    "Januar",
    "Februa",
    "Mart",
    "April",
    "Maj",
    "Jun",
    "Jul",
    "Avgust",
    "Septembar",
    "Octobar",
    "Novembar",
    "Decembar",
  ];

  async componentDidMount() {
    let date = new Date();
    let year = await getAnalytics(date.getFullYear());
    let prevMonth =
      date.getMonth() - 1 >= 0
        ? await getMonthlyAnalytics(date.getFullYear(), date.getMonth() - 1)
        : {};
    let curMonth = await getMonthlyAnalytics(
      date.getFullYear(),
      date.getMonth()
    );
    let yearValues = [];
    Object.entries(year).forEach((value) => yearValues.push(value[1]));
    let prevMonthValues = [];
    Object.entries(prevMonth).forEach((value) =>
      prevMonthValues.push(value[1])
    );
    let curMonthValues = [];
    Object.entries(curMonth).forEach((value) => curMonthValues.push(value[1]));
    this.setState({
      ...this.state,
      seriesYear: [{ name: "", data: yearValues }],
      seriesPrevious: [{ name: "", data: prevMonthValues }],
      seriesCurrent: [{ name: "", data: curMonthValues }],
    });
  }

  arrayDays = (year, month) => {
    let days = [];
    for (let index = 1; index <= new Date(year, month, 0).getDate(); index++) {
      days.push(index);
    }
    return days;
  };

  render() {
    let date = new Date();
    return (
      <div className="row w-100">
        <div className="row w-100">
          <ApexChart
            series={this.state.seriesYear}
            options={{
              chart: {
                height: 350,
                type: "bar",
              },
              plotOptions: {
                bar: {
                  dataLabels: {
                    position: "top", // top, center, bottom
                  },
                },
              },
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  return val + "";
                },
                offsetY: -20,
                style: {
                  fontSize: "12px",
                  colors: ["#304758"],
                },
              },

              xaxis: {
                categories: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "Maj",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                position: "top",
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                crosshairs: {
                  fill: {
                    type: "gradient",
                    gradient: {
                      colorFrom: "#D8E3F0",
                      colorTo: "#BED1E6",
                      stops: [0, 100],
                      opacityFrom: 0.4,
                      opacityTo: 0.5,
                    },
                  },
                },
                tooltip: {
                  enabled: true,
                },
              },
              yaxis: {
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                labels: {
                  show: false,
                  formatter: function (val) {
                    return val + "";
                  },
                },
              },
              title: {
                text: "Analitika prodaje za godinu",
                floating: true,
                offsetY: 330,
                align: "center",
                style: {
                  color: "#444",
                },
              },
            }}
          />
        </div>
        {date.getMonth() - 1 >= 0 && (
          <div className="row w-100">
            <ApexChart
              series={this.state.seriesPrevious}
              options={{
                chart: {
                  height: 350,
                  type: "bar",
                },
                plotOptions: {
                  bar: {
                    dataLabels: {
                      position: "top", // top, center, bottom
                    },
                  },
                },
                dataLabels: {
                  enabled: true,
                  formatter: function (val) {
                    return val + "";
                  },
                  offsetY: -20,
                  style: {
                    fontSize: "12px",
                    colors: ["#304758"],
                  },
                },

                xaxis: {
                  categories: this.arrayDays(
                    date.getFullYear(),
                    date.getMonth() - 1
                  ),
                  position: "top",
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                  crosshairs: {
                    fill: {
                      type: "gradient",
                      gradient: {
                        colorFrom: "#D8E3F0",
                        colorTo: "#BED1E6",
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                      },
                    },
                  },
                  tooltip: {
                    enabled: true,
                  },
                },
                yaxis: {
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                  labels: {
                    show: false,
                    formatter: function (val) {
                      return val + "";
                    },
                  },
                },
                title: {
                  text:
                    "Analitika prodaje za prethodni mesec - " +
                    this.categories[date.getMonth() - 1],
                  floating: true,
                  offsetY: 330,
                  align: "center",
                  style: {
                    color: "#444",
                  },
                },
              }}
            />
          </div>
        )}
        <div className="row w-100">
          <ApexChart
            series={this.state.seriesCurrent}
            options={{
              chart: {
                height: 350,
                type: "bar",
              },
              plotOptions: {
                bar: {
                  dataLabels: {
                    position: "top", // top, center, bottom
                  },
                },
              },
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  return val + "";
                },
                offsetY: -20,
                style: {
                  fontSize: "12px",
                  colors: ["#304758"],
                },
              },

              xaxis: {
                categories: this.arrayDays(date.getFullYear(), date.getMonth()),
                position: "top",
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                crosshairs: {
                  fill: {
                    type: "gradient",
                    gradient: {
                      colorFrom: "#D8E3F0",
                      colorTo: "#BED1E6",
                      stops: [0, 100],
                      opacityFrom: 0.4,
                      opacityTo: 0.5,
                    },
                  },
                },
                tooltip: {
                  enabled: true,
                },
              },
              yaxis: {
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                labels: {
                  show: false,
                  formatter: function (val) {
                    return val + "";
                  },
                },
              },
              title: {
                text:
                  "Analitika prodaje za prethodni mesec - " +
                  this.categories[date.getMonth()],
                floating: true,
                offsetY: 330,
                align: "center",
                style: {
                  color: "#444",
                },
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default GeneralAnalytics;
