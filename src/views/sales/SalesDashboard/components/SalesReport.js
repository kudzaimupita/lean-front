import React from "react";
import { Card, Button } from "components/ui";
import { Chart } from "components/shared";

const SalesReport = ({ className, data = {} }) => {
  return (
    <Chart
      series={data.series}
      xAxis={data.categories}
      height="200px"
      customOptions={{ legend: { show: false } }}
    />
  );
};

export default SalesReport;
