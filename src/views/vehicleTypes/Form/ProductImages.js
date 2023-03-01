import React, { useState } from "react";
import {
  AdaptableCard,
  ConfirmDialog,
  DoubleSidedImage,
} from "components/shared";
import { FormItem, Dialog, Upload, Input, Button } from "components/ui";
import { HiEye, HiTrash, HiPlusCircle } from "react-icons/hi";
import { Field } from "formik";
import FieldsTable from "./fieldsTable";
import DialogModal from "./CustomFieldFormModal";
const ImageList = (props) => {
  console.log(props);
  const { imgList, onImageDelete } = props;

  const [selectedImg, setSelectedImg] = useState({});
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const onViewOpen = (img) => {
    setSelectedImg(img);
    setViewOpen(true);
  };

  const onDialogClose = () => {
    setViewOpen(false);
    setTimeout(() => {
      setSelectedImg({});
    }, 300);
  };

  const onDeleteConfirmation = (img) => {
    setSelectedImg(img);
    setDeleteConfirmationOpen(true);
  };

  const onDeleteConfirmationClose = () => {
    setSelectedImg({});
    setDeleteConfirmationOpen(false);
  };

  const onDelete = () => {
    onImageDelete?.(selectedImg);
    setDeleteConfirmationOpen(false);
  };

  return (
    <>
      {imgList.map((img) => (
        <div className="group relative rounded border p-2 flex" key={img}>
          <img
            className="rounded max-h-[140px] max-w-full"
            src={`https://baboon-images.s3.amazonaws.com/${img}`}
            alt={img.name}
          />
          <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
            <span
              onClick={() => onViewOpen(img)}
              className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
            >
              <HiEye />
            </span>
            <span
              onClick={() => onDeleteConfirmation(img)}
              className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
            >
              <HiTrash />
            </span>
          </div>
        </div>
      ))}
      <Dialog
        isOpen={viewOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <h5 className="mb-4">{selectedImg}</h5>
        <img
          className="w-full"
          src={`https://baboon-images.s3.amazonaws.com/${selectedImg}`}
          alt={selectedImg}
        />
      </Dialog>
      <ConfirmDialog
        isOpen={deleteConfirmationOpen}
        onClose={onDeleteConfirmationClose}
        onRequestClose={onDeleteConfirmationClose}
        type="danger"
        title="Remove image"
        onCancel={onDeleteConfirmationClose}
        onConfirm={onDelete}
        confirmButtonColor="red-600"
      >
        <p> Are you sure you want to remove this image? </p>
      </ConfirmDialog>
    </>
  );
};

const ProductImages = (props) => {
  const { values, setOpenDoc } = props;
  const [dialogOpen2, onDialogClose2] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  console.log(dialogOpen2);
  // console.log(docs);

  const setDialog = (values) => {
    setSelectedItem(values);
    onDialogClose2(true);
  };
  return (
    <>
      {values.id && (
        <AdaptableCard className="mb-4">
          <DialogModal
            AssetTypeId={values}
            onDialogClose={onDialogClose2}
            dialogOpen={dialogOpen2}
            values={selectedItem}
          />
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <h5>Fields</h5>

            <Button
              onClick={() => onDialogClose2(true)}
              variant="solid"
              size="sm"
              icon={<HiPlusCircle />}
              className="block lg:inline-block md:mb-0 mb-4"
            >
              Add New
            </Button>
          </div>
          <FieldsTable
            onDialogClose={setDialog}
            dialogOpen={dialogOpen2}
            assetTypeId={values.id}
          />
          {/* {values.fields.map((field) => (
      <FormItem>
        {" "}
        <Field
          type="text"
          autoComplete="off"
          name={field.name}
          placeholder={field.name}
          component={Input}
        />
      </FormItem>
    ))} */}
        </AdaptableCard>
      )}
    </>
  );
};

export default ProductImages;
