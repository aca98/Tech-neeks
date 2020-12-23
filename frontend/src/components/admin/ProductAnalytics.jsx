import React, { Component } from "react";
import {
  getProduct,
  getProductAnalytics,
  getProductMonthlyAnalytics,
} from "../../services/httpService";
import ApexChart from "./Analytics";

class ProductAnalytics extends Component {
  state = {
    product: {},
    images: [],
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
    let product = await getProduct(this.props.match.params.id);
    let year = await getProductAnalytics(
      date.getFullYear(),
      this.props.match.params.id
    );
    let prevMonth =
      date.getMonth() - 1 >= 0
        ? await getProductMonthlyAnalytics(
            date.getFullYear(),
            date.getMonth() - 1,
            this.props.match.params.id
          )
        : {};
    let curMonth = await getProductMonthlyAnalytics(
      date.getFullYear(),
      date.getMonth(),
      this.props.match.params.id
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
      ...product,
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
          <div className="col-sm-12 col-md-4">
            <img
              src={"data:image/png;base64," + this.state.images[0]}
              className="card-img-top"
              alt="..."
            />
          </div>
          <div className="col-sm-12 col-md-8">
            <h2 className="border-bottom">{this.state.product.name}</h2>
            <ul className="list-group list-group-flush mt-auto">
              <li className="list-group-item p-2">
                <strong>ID: </strong>
                {this.state.product.id}
              </li>
              {this.state.product.discount !== "0" ? (
                <React.Fragment>
                  {" "}
                  <li className="list-group-item px-2 pt-1 pb-1">
                    <strong>Popust:</strong> {this.state.product.discount}%
                  </li>
                  <li className="list-group-item px-2 pt-1 pb-1">
                    <strong>Cena:</strong>{" "}
                    <strike>{this.state.product.price}</strike>{" "}
                    {this.state.product.price -
                      Math.floor(
                        this.state.product.price *
                          (this.state.product.discount / 100)
                      )}{" "}
                    RSD
                  </li>
                </React.Fragment>
              ) : (
                <li className="list-group-item px-2 pt-1 pb-1">
                  Cena: {this.state.product.price} RSD
                </li>
              )}
            </ul>
          </div>
        </div>
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

export default ProductAnalytics;
