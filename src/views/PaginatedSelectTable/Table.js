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

const Table = ({
  dataMethod,
  deleteMethod,
  newColumns,
  filter,
  resource,
  showSelect = true,
  hideDateColumn = false,
}) => {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.paginatedSelect.data.tableData
  );
  const loading = useSelector((state) => state.paginatedSelect.data.loading);
  const data = useSelector((state) => state.paginatedSelect.data.productList);

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
      <DataTable
        // selectable={showSelect}
        columns={newColumns}
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
    </>
  );
};

export default Table;
