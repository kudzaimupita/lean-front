import React, { useState } from "react";
import {
  AdaptableCard,
  ConfirmDialog,
  DoubleSidedImage,
} from "components/shared";
import { FormItem, Dialog, Upload } from "components/ui";
import { HiEye, HiTrash } from "react-icons/hi";
import { Field } from "formik";
import cloneDeep from "lodash/cloneDeep";
import Schedule from "./Schedule";

const da = [
  {
    id: "0",
    time: "10:00am",
    eventName: "Sprint Planning",
    desciption: "via Zoom",
    type: "meeting",
  },
  {
    id: "1",
    time: "1:00pm",
    eventName: "Design discussion",
    desciption: "via Microsoft Teams",
    type: "meeting",
  },
  {
    id: "2",
    time: "3:00pm",
    eventName: "Create daily report",
    desciption: "Daily task",
    type: "task",
  },
  {
    id: "3",
    time: "4:00pm",
    eventName: "MySql online workshop",
    desciption: "Online workshop",
    type: "workshop",
  },
];
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
  console.log(values);
  const beforeUpload = (file) => {
    let valid = true;

    const allowedFileType = ["image/jpeg", "image/png"];
    const maxFileSize = 500000;

    for (let f of file) {
      if (!allowedFileType.includes(f.type)) {
        valid = "Please upload a .jpeg or .png file!";
      }

      if (f?.size >= maxFileSize) {
        valid = "Upload image cannot more then 500kb!";
      }
    }

    return valid;
  };

  const onUpload = (form, field, files) => {
    let imageId = "1-img-0";
    const latestUpload = files.length - 1;
    if (values.images?.length > 0) {
      const prevImgId = values.imageList[values.imageList.length - 1];
      const splitImgId = prevImgId.split("-");
      const newIdNumber = parseInt(splitImgId[splitImgId.length - 1]) + 1;
      splitImgId.pop();
      const newIdArr = [...splitImgId, ...[newIdNumber]];
      imageId = newIdArr.join("-");
    }
    const image = {
      id: imageId,
      name: files[latestUpload].name,
      img: URL.createObjectURL(files[latestUpload]),
    };
    const imageList = [...values.imgList, ...[image]];
    console.log("imageList", imageList);
    form.setFieldValue(field.name, imageList);
  };

  const people = [
    {
      name: "Leonard Krasner",
      handle: "leonardkrasner",
      imageUrl:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Floyd Miles",
      handle: "floydmiles",
      imageUrl:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Emily Selman",
      handle: "emilyselman",
      imageUrl:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Kristin Watson",
      handle: "kristinwatson",
      imageUrl:
        "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  const handleImageDelete = (form, field, deletedImg) => {
    let imgList = cloneDeep(values.imgList);
    imgList = imgList.filter((img) => img !== deletedImg.id);
    form.setFieldValue(field.name, imgList);
  };

  // console.log(docs);
  return (
    <AdaptableCard className="mb-4">
      <h5>Images</h5>
      <p className="mb-6">Add or change image for the product</p>
      <FormItem>
        <Field name="images">
          {({ field, form }) => {
            if (values?.images?.length > 0) {
              return (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  <ImageList
                    imgList={values?.images}
                    onImageDelete={(img) => handleImageDelete(form, field, img)}
                  />
                  <Upload
                    className="min-h-fit"
                    beforeUpload={beforeUpload}
                    onChange={(files) => onUpload(form, field, files)}
                    showList={false}
                    draggable
                  >
                    <div className="max-w-full flex flex-col px-4 py-2 justify-center items-center">
                      <DoubleSidedImage
                        src="/img/others/upload.png"
                        darkModeSrc="/img/others/upload-dark.png"
                      />
                      <p className="font-semibold text-center text-gray-800 dark:text-white">
                        Upload
                      </p>
                    </div>
                  </Upload>
                </div>
              );
            }

            return (
              <Upload
                beforeUpload={beforeUpload}
                onChange={(files) => onUpload(form, field, files)}
                showList={false}
                draggable
              >
                <div className="my-16 text-center">
                  <DoubleSidedImage
                    className="mx-auto"
                    src="/img/others/upload.png"
                    darkModeSrc="/img/others/upload-dark.png"
                  />
                  <p className="font-semibold">
                    <span className="text-gray-800 dark:text-white">
                      Drop your image here, or{" "}
                    </span>
                    <span className="text-blue-500">browse</span>
                  </p>
                  <p className="mt-1 opacity-60 dark:text-white">
                    Support: jpeg, png
                  </p>
                </div>
              </Upload>
            );
          }}
        </Field>
      </FormItem>
      {/* <h5>Documents</h5>
      <p className="mb-6">Add or change image for the product</p> */}
      {/* <Schedule data={da} /> */}
      {/* <div>
        <div className="flow-root mt-6">
          <ul className="-my-5 divide-y divide-gray-200">
            {values.documents.map((person) => (
              <li key={person} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8  rounded-full"
                      src={
                        "https://banner2.cleanpng.com/20180331/vww/kisspng-computer-icons-document-memo-5ac0480f061158.0556390715225507990249.jpg"
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {person}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {"@" + person.substring(person.lastIndexOf(".") + 1)}
                    </p>
                  </div>
                  <div>
                    <a
                      onClick={() => setOpenDoc(true)}
                      href="#"
                      className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <a
            href="#"
            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            View all
          </a>
        </div>
      </div> */}
      {/* <DocViewer
        // theme={{
        //   primary: "#5296d8",
        //   secondary: "#ffffff",
        //   tertiary: "#5296d899",
        //   textPrimary: "#ffffff",
        //   textSecondary: "#5296d8",
        //   textTertiary: "#00000099",
        //   disableThemeScrollbar: false,
        // }}
        // initialActiveDocument={docs[1]}
        documents={[
          {
            uri: "https://matfuvit.github.io/UVIT/predavanja/literatura/TutorialsPoint%20JavaScript.pdf",
          },
        ]}
        height={{ height: 500 }}
        pluginRenderers={DocViewerRenderers}
      /> */}

      {/* { <DocViewer
        pluginRenderers={DocViewerRenderers}
        documents={docs}
        config={{
          header: {
            disableHeader: false,
            disableFileName: false,
            retainURLParams: false,
          },
        }}
        style={{ height: 500 }}
      />} */}
    </AdaptableCard>
  );
};

export default ProductImages;
