import React, { useState } from "react";
import classNames from "classnames";
import { Card, Calendar, Badge } from "components/ui";
import useThemeClass from "utils/hooks/useThemeClass";
import { HiVideoCamera, HiDocumentText, HiChatAlt2 } from "react-icons/hi";
import { AiFillFileExcel, AiFillFilePdf, AiFillFileWord } from "react-icons/ai";

const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const EventIcon = ({ type }) => {
  const baseClass =
    "rounded-lg h-10 w-10 text-lg flex items-center justify-center";

  switch (type) {
    case "meeting":
      return (
        <div
          className={classNames(
            baseClass,
            "text-emerald-600 bg-emerald-100 dark:text-emerald-100 dark:bg-emerald-500/20"
          )}
        >
          <AiFillFileExcel />
        </div>
      );
    case "task":
      return (
        <div
          className={classNames(
            baseClass,
            "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100"
          )}
        >
          <AiFillFileWord />
        </div>
      );
    case "workshop":
      return (
        <div
          className={classNames(
            baseClass,
            "text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20"
          )}
        >
          <AiFillFilePdf />
        </div>
      );
    default:
      return null;
  }
};

const Schedule = ({ data = [] }) => {
  const [value, setValue] = useState();

  const { textTheme } = useThemeClass();

  return (
    <Card className="mb-4">
      {/* <hr className="my-6" /> */}
      <h5 className="">Documents</h5>
      {data.map((event) => (
        <div
          key={event.id}
          className="flex items-center justify-between rounded-md mb-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-600/40 cursor-pointer user-select"
        >
          <div className="flex items-center gap-3">
            <EventIcon type={event.type} />
            <div>
              <h6 className="text-sm font-bold">{event.eventName}</h6>
              <p>{event.desciption}</p>
            </div>
          </div>
          <div>
            <a
              //   onClick={() => setOpenDoc(true)}
              href="#"
              className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
            >
              View
            </a>
          </div>
          {/* <span>{event.time}</span> */}
        </div>
      ))}
    </Card>
  );
};

export default Schedule;
