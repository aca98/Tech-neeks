import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = ({ options, series }) => {
  return (
    <div className="p-3 w-100">
      <ReactApexChart
        key={1}
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ApexChart;
