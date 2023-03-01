import React, { useEffect } from "react";
import {
  Input,
  Button,
  Dialog,
  FormItem,
  FormContainer,
  Select,
} from "components/ui";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getData, setTableData } from "../../TableView/store/dataSlice";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import {
  getNewCustomFieldss,
  storeCustomFields,
} from "../../../services/customFieldService";
const validationSchema = Yup.object().shape({
  cardHolderName: Yup.string().required("Card holder name required"),
  ccNumber: Yup.string()
    .required("Credit card number required")
    .matches(
      /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
      "Invalid credit card number"
    ),
  cardExpiry: Yup.string()
    .required("Card holder name required")
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "Invalid Date"),
  code: Yup.string()
    .required()
    .matches(/^[0-9]{3}$/, "Invalid CVV"),
});

function limit(val, max) {
  if (val.length === 1 && val[0] > max[0]) {
    val = "0" + val;
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      val = "01";
    } else if (val > max) {
      val = max;
    }
  }

  return val;
}

export const categories = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

export const fieldTypes = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Address", value: "address" },
  { label: "TextArea", value: "textArea" },
  { label: "Select", value: "select" },
  { label: "Radio", value: "radio" },

  { label: "Date", value: "date" },
  { label: "Boolean", value: "Boolean" },
  { label: "Radio", value: "radio" },
];

function cardExpiryFormat(val) {
  let month = limit(val.substring(0, 2), "12");
  let date = limit(val.substring(2, 4), "31");

  return month + (date.length ? "/" + date : "");
}

const EditPaymentMethod = ({
  dialogOpen,
  onDialogClose,
  AssetTypeId,
  values,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    // const rquestParam = { id: path };
    // setLoading(true);
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
    // getNewCustomFieldss(path).then((data) => {
    //   // setVehicle(data);
    //   // setLoading(false);
    // });
    // fetchData(rquestParam);
    // console.log(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const onUpdateCreditCard = (values) => {
  //   let newData = cloneDeep(data);
  //   const { cardHolderName, ccNumber, cardExpiry } = values;

  //   const updatedCard = {
  //     cardHolderName,
  //     last4Number: ccNumber.substr(ccNumber.length - 4),
  //     expYear: cardExpiry.substr(cardExpiry.length - 2),
  //     expMonth: cardExpiry.substring(0, 2),
  //   };

  //   newData = newData.map((payment) => {
  //     if (payment.last4Number === selectedCard.last4Number) {
  //       payment = { ...payment, ...updatedCard };
  //     }
  //     return payment;
  //   });

  //   onDialogClose();
  //   dispatch(updatePaymentMethodData(newData));
  // };

  // const onDialogClose = () => {
  //   dispatch(closeEditPaymentMethodDialog());
  // };
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.dataList.data.tableData
  );
  const dispatch = useDispatch();
  const fetchData = () => {
    console.log("hhhhhhhhhhhh");
    dispatch(
      getData({
        dataMethod: getNewCustomFieldss,
        pagination: {
          pageIndex,
          pageSize,
          sort,
          query,
          filter: `vehicleType=${AssetTypeId.id}`,
        },
      })
    );
  };

  return (
    <Dialog
      isOpen={dialogOpen}
      onClose={(data) => onDialogClose(false)}
      onRequestClose={(data) => onDialogClose(false)}
    >
      <h4>Add Field</h4>
      <div className="mt-6">
        <Formik
          initialValues={{
            vehicleType: AssetTypeId.id,
            ...values,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ touched, errors, values }) => (
            <Form>
              <FormContainer>
                <FormItem label="Name">
                  <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    component={Input}
                    placeholder="Name"
                  />
                </FormItem>
                <FormItem label="Is Required">
                  <Field name="isRequired">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={categories}
                        value={categories.filter(
                          (category) => category.value === values.isRequired
                        )}
                        onChange={(option) => {
                          // console.log(field.status, option.value);
                          form.setFieldValue("isRequired", option.value);
                        }}
                      />
                    )}
                  </Field>
                </FormItem>
                <FormItem label="Field Type">
                  <Field name="fieldType">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        options={fieldTypes}
                        value={fieldTypes.filter(
                          (category) => category.value === values.fieldType
                        )}
                        onChange={(option) => {
                          // console.log(field.status, option.value);
                          form.setFieldValue("fieldType", option.value);
                        }}
                      />
                    )}
                  </Field>
                </FormItem>

                <div className="grid grid-cols-2 gap-4"></div>
                <FormItem className="mb-0 text-right">
                  <Button
                    block
                    variant="solid"
                    onClick={() => {
                      storeCustomFields(values, values.id).then(async () => {
                        // navigate(`/app/vehicleTypes/edit/${AssetTypeId.id}`);
                        fetchData();
                        onDialogClose(false);
                      });
                    }}
                  >
                    Save
                  </Button>
                </FormItem>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default EditPaymentMethod;
