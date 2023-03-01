import React, { useState } from "react";
import { Card, Avatar, Button, Notification, toast } from "components/ui";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";
import { HiPencilAlt, HiOutlineTrash, HiArrowCircleLeft } from "react-icons/hi";
import { ConfirmDialog } from "components/shared";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCustomer } from "../store/dataSlice";
import { openEditCustomerDetailDialog } from "../store/stateSlice";
import EditCustomerProfile from "./EditCustomerProfile";

const CustomerInfoField = ({ title, value }) => {
  return (
    <div>
      <span>{title}</span>
      <p className="text-gray-700 dark:text-gray-200 font-semibold">{value}</p>
    </div>
  );
};
const getReadableDate = (utcDate) => {
  if (!utcDate) {
    return "Invalid Date";
  }

  const options = { year: "numeric", month: "long", day: "numeric" };
  // @ts-ignore
  return new Date(utcDate).toLocaleDateString(undefined, options);
};
const CustomerProfileAction = ({ id }) => {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  const onDialogOpen = () => {
    setDialogOpen(true);
  };

  const onDelete = () => {
    setDialogOpen(false);
    dispatch(deleteCustomer({ id }));
    navigate("/app/crm/customers");
    toast.push(
      <Notification title={"Successfuly Deleted"} type="success">
        Customer successfuly deleted
      </Notification>
    );
  };

  const onEdit = () => {
    dispatch(openEditCustomerDetailDialog());
  };

  return (
    <>
      <Button
        block
        icon={<HiArrowCircleLeft />}
        onClick={() => navigate("/app/vehicles")}
      >
        Back
      </Button>
      <Button
        icon={<HiPencilAlt />}
        block
        variant="solid"
        onClick={() => navigate(`/app/vehicles/edit/${id}`)}
      >
        Edit
      </Button>
      <ConfirmDialog
        isOpen={dialogOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
        type="danger"
        title="Delete customer"
        onCancel={onDialogClose}
        onConfirm={onDelete}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete this customer? All record related to
          this customer will be deleted as well. This action cannot be undone.
        </p>
      </ConfirmDialog>
      <EditCustomerProfile />
    </>
  );
};

const CustomerProfile = ({ data = {} }) => {
  return (
    <Card>
      <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
        <div className="flex xl:flex-col items-center gap-4">
          <Avatar
            size={150}
            shape="circle"
            src={`https://baboon-images.s3.amazonaws.com/${data?.imageCover}`}
          />
          <h4 className="font-bold">{data?.name}</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-2 gap-y-2 gap-x-4 mt-8">
          <CustomerInfoField title="Make" value={data?.make} />
          <CustomerInfoField title="Model" value={data?.model} />
          <CustomerInfoField
            title="Vehicle Type"
            value={data?.vehicleType?.name}
          />
          <CustomerInfoField
            title="Asset Value"
            value={`R ${data?.currentMarketValue}`}
          />
          <CustomerInfoField title="Status" value={data?.status} />
          <CustomerInfoField
            title="Created On"
            value={getReadableDate(data?.createdAt)}
          />
          {/* <CustomerInfoField title="Id" value={data?.id} /> */}
          <CustomerInfoField title="Location" value={data?.location} />
          <CustomerInfoField title="Department" value={data?.department} />
          <CustomerInfoField title="Added By" value={data?.addedBy?.name} />
          {data?.fields?.length > 0 &&
            data?.fields?.map((field) => {
              return (
                <CustomerInfoField
                  title={field?.customField?.name || "field"}
                  value={field?.value}
                />
              );
            })}
        </div>
        <div className="mt-4 flex flex-col xl:flex-row gap-2">
          <CustomerProfileAction id={data?._id} />
        </div>
      </div>
    </Card>
  );
};

export default CustomerProfile;
