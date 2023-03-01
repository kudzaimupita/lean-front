import React from "react";
import { Card, Avatar, Button } from "components/ui";
import { GrowShrinkTag } from "components/shared";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";

const HoldingCard = ({ data = {} }) => {
  return (
    <Card className="bg-gray-50 dark:bg-gray-700 border-0">
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          <Avatar className="bg-transparent" src={data.icon} shape="circle" />
          <div>
            <h6 className="font-bold">{data.symbol}</h6>
            <p>{data.name}</p>
          </div>
        </div>
        <div className="text-right rtl:text-left">
          <h6 className="mb-2">
            <NumberFormat
              displayType="text"
              value={data.fiatValue}
              suffix=" USD"
              thousandSeparator={true}
            />
          </h6>
          <GrowShrinkTag value={data.growshrink} suffix="%" />
        </div>
      </div>
    </Card>
  );
};

const Holding = ({ data = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      {data.map((holding) => (
        <HoldingCard key={holding.symbol} data={holding} />
      ))}
    </div>
  );
};

export default Holding;
