import React from "react";
import { toast, Notification } from "components/ui";
import { ConfirmDialog } from "components/shared";
import { useSelector, useDispatch } from "react-redux";
import { toggleDeleteConfirmation } from "./store/stateSlice";
import { deleteProduct, getData } from "./store/dataSlice";
import {
  setDeleteMode,
  setSelectedRow,
  setSelectedRows,
} from "./store/stateSlice";

const ProductDeleteConfirmation = ({ deleteMethod, dataMethod }) => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.dataList.state.deleteConfirmation
  );
  const deleteMode = useSelector((state) => state.dataList.state.deleteMode);
  const selectedProduct = useSelector(
    (state) => state.dataList.state.selectedProduct
  );
  const tableData = useSelector((state) => state.dataList.data.tableData);
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.dataList.data.tableData
  );
  const onDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };

  const onDelete = async () => {
    if (deleteMode === "batch") {
      selectedProduct.map((row) => {
        deleteMethod(row);
      });
      toast.push(
        <Notification
          title={"Successfuly Deleted"}
          type="success"
          duration={2500}
        >
          Record successfuly deleted
        </Notification>,
        {
          placement: "top-center",
        }
      );
      // deleteSucceed(success, selectedRows.length)
      dispatch(setSelectedRows([]));
    } else {
      deleteMethod(selectedProduct).then(() => {
        dispatch(
          getData({ dataMethod, pagination: { pageIndex, pageSize, sort } })
        );
        toast.push(
          <Notification
            title={"Successfuly Deleted"}
            type="success"
            duration={2500}
          >
            Record successfuly deleted
          </Notification>,
          {
            placement: "top-center",
          }
        );
      });
    }

    dispatch(toggleDeleteConfirmation(false));
  };

  return (
    <ConfirmDialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Delete record"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
    >
      <p>
        Are you sure you want to delete this record? This action cannot be
        undone.
      </p>
    </ConfirmDialog>
  );
};

export default ProductDeleteConfirmation;
