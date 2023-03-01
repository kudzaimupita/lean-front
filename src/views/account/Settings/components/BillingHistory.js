import React from "react";
import { Table, Badge } from "components/ui";
import { useTable } from "react-table";
import NumberFormat from "react-number-format";
import dayjs from "dayjs";
import { BiUserPlus } from "react-icons/bi";
import { FaFileUpload } from "react-icons/fa";

const { Tr, Th, Td, THead, TBody } = Table;

const statusColor = {
  paid: "bg-emerald-500",
  pending: "bg-amber-400",
};

const columns = [
  {
    Header: "Product",
    accessor: "status",
    Cell: (props) => {
      const row = props.row.original;
      return (
        <div className="flex items-center">
          <Badge className={statusColor[row.status]} />
          <span className="ml-2 rtl:mr-2 capitalize">
            {row.lines.data[0].description}
          </span>
        </div>
      );
    },
  },
  {
    Header: "customer_email",
    accessor: "id",
    Cell: (props) => {
      const row = props.row.original;
      return (
        <div>
          <span className="cursor-pointer">{row.customer_email}</span>
        </div>
      );
    },
  },
  {
    Header: "Product",
    accessor: "item",
    Cell: (props) => {
      const row = props.row.original;
      return (
        <div className="flex items-center">
          {/* <Badge className={statusColor[row.status]} /> */}
          <span className="ml-2 rtl:mr-2 capitalize">
            {dayjs.unix(row.lines.data[0].period.start).format("MM/DD/YYYY")} t0{" "}
            {dayjs.unix(row.lines.data[0].period.end).format("MM/DD/YYYY")}
          </span>
        </div>
      );
    },
  },

  {
    Header: "Date",
    accessor: "created",
    Cell: (props) => {
      const row = props.row.original;
      return (
        <div className="flex items-center">
          {dayjs.unix(row.created).format("MM/DD/YYYY")}
        </div>
      );
    },
  },
  {
    Header: "Amount",
    accessor: "amount_paid",
    Cell: (props) => {
      const row = props.row.original;
      return (
        <div className="flex items-center">
          <NumberFormat
            displayType="text"
            value={Math.round(row.amount_paid / 100).toFixed(2)}
            prefix={"$"}
            thousandSeparator={true}
          />
        </div>
      );
    },
  },
  {
    Header: "",
    id: "actrion",
    accessor: (row) => row,
    Cell: (props) => (
      <div className="flex justify-end text-lg">
        {" "}
        <span className={`cursor-pointer pr-3 `}>
          <a
            // className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
            href={`${props.row?.original?.invoice_pdf}`}
          >
            <FaFileUpload />
          </a>
          {/* <FcUpload /> */}
        </span>
        {/* <span>
          <a
            // className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
            href={`${props.row?.original?.hosted_invoice_url}`}
          >
            <BiUserPlus />
          </a>
        </span> */}
      </div>
    ),
  },
];

const BillingHistory = ({ data = [], ...rest }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div {...rest}>
      <Table {...getTableProps()}>
        <THead className="!bg-transparent">
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </THead>
        <TBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </TBody>
      </Table>
    </div>
  );
};

export default BillingHistory;
