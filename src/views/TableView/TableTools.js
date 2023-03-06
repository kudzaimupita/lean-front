import React from "react";
import { Button } from "components/ui";
import { HiDownload, HiPlusCircle } from "react-icons/hi";
import ProductTableSearch from "../sales/ProductList/components/ProductTableSearch";
// import ProductFilter from './ProductFilter'
import { useSelector, useDispatch } from "react-redux";
import { setDeleteMode, setSelectedRows } from "./store/stateSlice";
import { HiOutlineTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { getData } from "./store/dataSlice";
import { toast, Notification } from "components/ui";

const BatchDeleteButton = ({ deleteMethod, dataMethod, selectedRows }) => {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.dataList.data.tableData
  );

  const onBatchDelete = () => {
    deleteMethod({ ids: selectedRows }).then(() => {
      dispatch(
        getData({ dataMethod, pagination: { pageIndex, pageSize, sort } })
      );
      dispatch(setSelectedRows([]));
      toast.push(
        <Notification
          title={"Successfully Deleted"}
          type="success"
          duration={2500}
        >
          Records successfully deleted
        </Notification>,
        {
          placement: "top-center",
        }
      );
    });
  };

  return (
    <Button
      variant="solid"
      color="red-600"
      size="sm"
      icon={<HiOutlineTrash />}
      onClick={onBatchDelete}
    >
      Batch Delete
    </Button>
  );
};
const TableTools = ({ deleteMethod, dataMethod, addNewItemButton }) => {
  const selectedRows = useSelector(
    (state) => state?.dataList?.state?.selectedRows
  );
  const data = useSelector((state) => state.dataList.data.productList);
  const loading = useSelector((state) => state.dataList.data.loading);
  console.log(selectedRows);
  return (
    <>
      {" "}
      {!loading && false !== 0 && (
        <div className="flex flex-col lg:flex-row lg:items-center gap-2">
          {selectedRows?.length > 0 && (
            <BatchDeleteButton
              deleteMethod={deleteMethod}
              dataMethod={dataMethod}
              selectedRows={selectedRows}
            />
          )}
          <ProductTableSearch />
          <Button
            variant="solid"
            color="sky-700"
            size="sm"
            icon={<HiOutlineTrash />}
            // onClick={onBatchDelete}
          >
            Batch Operations
          </Button>
          <Link
            className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
            to="/data/product-list.csv"
            target="_blank"
            download
          >
            <Button block size="sm" icon={<HiDownload />}>
              Export
            </Button>
          </Link>
          {addNewItemButton}
        </div>
      )}
    </>
  );
};

export default TableTools;
