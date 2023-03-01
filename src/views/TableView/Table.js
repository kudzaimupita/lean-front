import React, { useEffect, useMemo, useCallback } from "react";
import { DataTable } from "components/shared";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

import { useDispatch, useSelector } from "react-redux";
import { getData, setTableData } from "./store/dataSlice";
import { AuthorityCheck } from "components/shared";
// import useThemeClass from "utils/hooks/useThemeClass";
import { setSelectedRows, addRowItem, removeRowItem } from "./store/stateSlice";
import useThemeClass from "utils/hooks/useThemeClass";
import { setSortedColumn, setSelectedProduct } from "./store/stateSlice";
import { toggleDeleteConfirmation } from "./store/stateSlice";
import { useNavigate } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import { PlusIcon } from "@heroicons/react/20/solid";

const ActionColumn = ({ row, resource, showEdit, showDate, editRoute }) => {
  const dispatch = useDispatch();
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();

  const onEdit = () => {
    navigate(`${editRoute}/${row._id}`);
  };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedProduct(row._id));
  };
  const permissions = useSelector((state) => state.auth.user.authority);
  return (
    <div className="flex justify-end text-md">
      {editRoute && (
        <AuthorityCheck
          authority={["updateAssets"]}
          userAuthority={permissions}
          key={"secondarySubNav.key"}
        >
          {" "}
          <span
            className={`cursor-pointer pr-3 hover:${textTheme}`}
            onClick={onEdit}
          >
            <HiOutlinePencil />
          </span>
        </AuthorityCheck>
      )}

      <AuthorityCheck
        authority={["deleteAssets"]}
        userAuthority={permissions}
        key={"secondarySubNav.key"}
      >
        <span
          className="cursor-pointer pr-3 hover:text-red-500"
          onClick={onDelete}
        >
          <HiOutlineTrash />
        </span>
      </AuthorityCheck>
    </div>
  );
};

const Table = ({
  editRoute = "",
  showDate = false,
  showEdit,
  dataMethod,
  deleteMethod,
  newColumns,
  filter,
  resource,
  showSelect = true,
  showDateColumn = false,
}) => {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.dataList.data.tableData
  );
  const loading = useSelector((state) => state.dataList.data.loading);
  const data = useSelector((state) => state.dataList.data.productList);

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize, sort]);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  const fetchData = async (num) => {
    dispatch(
      getData({
        dataMethod,
        pagination: {
          pageIndex,
          pageSize,
          sort,
          query,
          filter,
        },
      })
    );
  };
  console.log(showDate);
  const columns = useMemo(
    () => [
      ...newColumns,
      // {
      //     Header: "Created At",
      //     accessor: "createdAt",
      //     sortable: true,
      //     Cell: (props) => {
      //       const row = props.row.original;
      //       return (
      //         <span className="capitalize">{row?.createdAt?.slice(0, 16)}</span>
      //       );
      //     },
      //   },

      {
        Header: "",
        id: "action",
        accessor: (row) => row,
        Cell: (props) => (
          <ActionColumn
            showEdit={showEdit}
            resource={resource}
            row={props.row.original}
            editRoute={editRoute}
          />
        ),
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
  console.log(tableData);
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
          selectedIds.push(row._id);
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
      {!loading && data.length === 0 ? (
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No projects
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new project.
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add New
            </button>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Table;
