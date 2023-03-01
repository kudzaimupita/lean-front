import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Avatar, Badge } from "components/ui";
import { DataTable } from "components/shared";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

import { useDispatch, useSelector } from "react-redux";
import { getData, setTableData } from "./store/dataSlice";

// import useThemeClass from "utils/hooks/useThemeClass";
import {
  setSelectedRows,
  addRowItem,
  removeRowItem,
  setDeleteMode,
  setSelectedRow,
} from "./store/stateSlice";
import useThemeClass from "utils/hooks/useThemeClass";
import {
  setSortedColumn,
  setSelectedProduct,
  // setSelectedRow,
} from "./store/stateSlice";
import { toggleDeleteConfirmation } from "./store/stateSlice";

// import ProductDeleteConfirmation from '../sales/ProductList/components/ProductDeleteConfirmation'
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
// import {getVehicles,getNewVehicles} from '../../services/vehicleService'

const ActionColumn = ({ row }) => {
  const dispatch = useDispatch();
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();

  const onEdit = () => {
    navigate(`/app/vehicleTypes/edit/${row._id}`);
  };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedProduct(row._id));
  };

  return (
    <div className="flex justify-end text-md">
      <span
        className={`cursor-pointer pr-3 hover:${textTheme}`}
        onClick={onEdit}
      >
        <HiOutlinePencil />
      </span>
      <span
        className="cursor-pointer pr-3 hover:text-red-500"
        onClick={onDelete}
      >
        <HiOutlineTrash />
      </span>
    </div>
  );
};

const ProductTable = ({ dataMethod, deleteMethod, newColumns, showSelect }) => {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.dataList.data.tableData
  );
  // const filterData = useSelector((state) => state.dataList.data.filterData)
  const loading = useSelector((state) => state.dataList.data.loading);
  const data = useSelector((state) => state.dataList.data.productList);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchData();
    dispatch(setSelectedRows([]));
    // console.log("huiiiiiiiiiiiiiiiiiii", pageIndex, pageSize, sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  const fetchData = async () => {
    dispatch(
      getData({
        dataMethod,
        pagination: {
          pageIndex,
          pageSize,
          sort,
          query,
          // populate: "fields",
        },
      })
    );
  };

  const columns = useMemo(
    () => [
      ...newColumns,
      {
        Header: "Created At",
        accessor: "createdAt",
        sortable: true,
        Cell: (props) => {
          const row = props.row.original;
          return <span className="capitalize">{row.createdAt}</span>;
        },
      },

      {
        Header: "",
        id: "action",
        accessor: (row) => row,
        Cell: (props) => <ActionColumn row={props.row.original} />,
      },
    ],
    []
  );

  const onPaginationChange = (page) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page;
    console.log(page);
    dispatch(setTableData(newTableData));
  };

  const onSelectChange = (value) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageSize = Number(value);
    newTableData.pageIndex = 1;
    dispatch(setTableData(newTableData));
  };

  const onSort = (sort, sortingColumn) => {
    console.log(sort, sortingColumn);
    const newTableData = cloneDeep(tableData);
    newTableData.sort = sort;
    dispatch(setTableData(newTableData));
    dispatch(setSortedColumn(sortingColumn));
  };

  const onRowSelect = (checked, row) => {
    if (checked) {
      dispatch(addRowItem([row.id]));
    } else {
      dispatch(removeRowItem(row.id));
    }
  };

  const onAllRowSelect = useCallback(
    (checked, rows) => {
      if (checked) {
        const originalRows = rows.map((row) => row.original);
        const selectedIds = [];
        originalRows.forEach((row) => {
          selectedIds.push(row.id);
        });
        dispatch(setSelectedRows(selectedIds));
      } else {
        dispatch(setSelectedRows([]));
      }
    },
    [dispatch]
  );

  return (
    <>
      <DataTable
        selectable={showSelect}
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: "rounded-sm" }}
        loading={loading}
        pagingData={tableData}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
        onSort={onSort}
        pageSizes={[10, 20, 50, 100]}
        onIndeterminateCheckBoxChange={onAllRowSelect}
        onCheckBoxChange={onRowSelect}
      />
      {/* <ProductDeleteConfirmation /> */}
    </>
  );
};

export default ProductTable;
