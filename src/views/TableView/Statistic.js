import React, { useEffect } from "react";
import { Card, Avatar } from "components/ui";
import { GrowShrinkTag, MediaSkeleton, Loading } from "components/shared";
import { getTableStatistic } from "../crm/Customers/store/dataSlice";
import {
  HiOutlineUserGroup,
  HiOutlineUserAdd,
  HiOutlineUsers,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from "react-number-format";

const StatisticCard = (props) => {
  const { icon, avatarClass, label, value, growthRate, loading } = props;

  const avatarSize = 30;

  return (
    <Card bordered>
      <Loading
        loading={false}
        customLoader={
          <MediaSkeleton
            avatarProps={{
              className: "rounded",
              width: avatarSize,
              height: avatarSize,
            }}
          />
        }
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar className={avatarClass} size={avatarSize} icon={icon} />
            <div>
              <span>{label}</span>
              <h6>
                <NumberFormat
                  displayType="text"
                  value={value}
                  thousandSeparator
                />
              </h6>
            </div>
          </div>
          {/* <GrowShrinkTag value={growthRate} suffix="%" /> */}
        </div>
      </Loading>
    </Card>
  );
};

const TableStatistic = () => {
  const dispatch = useDispatch();

  // const statisticData = useSelector(
  //   (state) => state.crmCustomers.data.statisticData
  // );
  // const loading = useSelector(
  //   (state) => state.crmCustomers.data.statisticLoading
  // );

  // useEffect(() => {
  //   dispatch(getTableStatistic());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-2 mb-2">
      <StatisticCard
        icon={<HiOutlineUserGroup />}
        avatarClass="!bg-indigo-600"
        label="Total Assets"
        value={435}
        growthRate={5}
        loading={false}
      />
      <StatisticCard
        icon={<HiOutlineUsers />}
        avatarClass="!bg-yellow-500"
        label="Fuel Entries"
        value={768}
        growthRate={-4}
        loading={false}
      />
      <StatisticCard
        icon={<HiOutlineUserAdd />}
        avatarClass="!bg-emerald-500"
        label="Reminders"
        value={768}
        growthRate={2}
        loading={false}
      />
      <StatisticCard
        icon={<HiOutlineUserGroup />}
        avatarClass="!bg-cyan-600"
        label="Inspections"
        value={435}
        growthRate={5}
        loading={false}
      />
      <StatisticCard
        icon={<HiOutlineUserGroup />}
        avatarClass="!bg-indigo-600"
        label="Word Orders"
        value={435}
        growthRate={5}
        loading={false}
      />
    </div>
  );
};

export default TableStatistic;
