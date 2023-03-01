import {
  Input,
  InputGroup,
  Button,
  DatePicker,
  Select,
  FormItem,
  FormContainer,
} from "components/ui";
import { Field, Form, Formik } from "formik";
import NumberFormat from "react-number-format";
import { countryList } from "constants/countries.constant";
import {} from "../../../../services/dataEntry.service";
import { storeVehicle } from "../../../../services/vehicleService";
import { components } from "react-select";
import * as Yup from "yup";
import { setCurrentStep } from "../store/stateSlice";
import _ from 'lodash'

import { RichTextEditor } from "components/shared";
const { SingleValue } = components;

const genderOptions = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
  { label: "Others", value: "O" },
];

const NumberInput = (props) => {
  return <Input {...props} value={props.field.value} />;
};

const NumberFormatInput = ({ onValueChange, ...rest }) => {
  return (
    <NumberFormat
      customInput={Input}
      type="text"
      onValueChange={onValueChange}
      autoComplete="off"
      {...rest}
    />
  );
};

const PhoneSelectOption = ({ innerProps, data, isSelected }) => {
  return (
    <div
      className={`cursor-pointer flex items-center justify-between p-2 ${
        isSelected
          ? "bg-gray-100 dark:bg-gray-500"
          : "hover:bg-gray-50 dark:hover:bg-gray-600"
      }`}
      {...innerProps}
    >
      <div className="flex items-center gap-2">
        <span>
          ({data.value}) {data.dialCode}
        </span>
      </div>
    </div>
  );
};

const PhoneControl = ({ children, ...props }) => {
  const selected = props.getValue()[0];
  return (
    <SingleValue {...props}>
      {selected && <span>{selected.dialCode}</span>}
    </SingleValue>
  );
};


const validationSchema = Yup.object().shape({
  name: Yup.string().required("First Name Required"),
  lastName: Yup.string().required("Last Name Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
  nationality: Yup.string().required("Please select your nationality"),
  phoneNumber: Yup.string().required("Please enter your phone number"),
  dob: Yup.string().required("Please enter your date of birth"),
  gender: Yup.string().required("Please enter your gender"),
  maritalStatus: Yup.string().required("Please enter your marital status"),
  dialCode: Yup.string().required("Please select dial code"),
});

const personalInformation = ({
  onBack,
  data = {
    firstName: "",
    lastName: "",
    email: "",
    residentCountry: "",
    nationality: "",
    dialCode: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    maritalStatus: "",
  },
  onNextChange,
  currentStepStatus,
  vehicleType,
  asset,
}) => {
  const onNext = (values, setSubmitting) => {
    onNextChange?.(
      { customFields: values, asset: asset },
      "personalInformation",
      setSubmitting
    );
  };
  console.log('test',vehicleType?.fields)
  function groupItemBy(array, property) {
    var hash = {},
        props = property.split('.');
    for (var i = 0; i < array?.length; i++) {
        var key = props.reduce(function(acc, prop) {
            return acc && acc[prop];
        }, array[i]);
        if (!hash[key]) hash[key] = [];
        hash[key].push(array[i]);
    }
    return hash;
}
  const result = _.chain(data)
  .groupBy("category.name")
  .toPairs()
  .map(pair => _.zipObject(['cat', 'categories'], pair))
  .value();
  // var result = _.chain(vehicleType?.fields)
  //   .groupBy("category.name")
  //   .pairs()
  //   .map(function(currentItem) {
  //       return _.object(_.zip(["category", "categories"], currentItem));
  //   })
  //   .value();
// console.log( groupItemBy(vehicleType?.fields,'category.name'))
//   const obj={}

const newFields=Object.keys( groupItemBy(vehicleType?.fields,'category.name')).map((item)=>{
  return {name:item,fields:groupItemBy(vehicleType?.fields,'category.name')[item]}
})
console.log(Object.keys( groupItemBy(vehicleType?.fields,'category.name')).map((item)=>{
  return {name:item,fields:groupItemBy(vehicleType?.fields,'category.name')[item]}
}))
  return (
    <>
    
      <Formik
        initialValues={{ ...vehicleType, description: "" }}
        enableReinitialize={true}
        // validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onNext(values, true);
        }}
      >
     
        {({ values, touched, errors, isSubmitting }) => {
          return (
            <Form>
              <FormContainer>
              {newFields.map((field)=>{
                return (   <>   <div className="mb-2">
                <h5 className="mb-2">{field.name}</h5>
                {/* <p>Basic information for an account opening</p> */}
              </div>
              <div className="md:grid grid-cols-3 gap-4">  {field?.fields?.map((field) => {
                    
                    return (
                      <FormItem
                        label={field.name}
                        // invalid={errors.firstName && touched.firstName}
                        // errorMessage={errors.firstName}
                      >
                        <Field
                          type="text"
                          size="sm"
                          autoComplete="off"
                          name={`customField-${field._id}`}
                          placeholder={field.name}
                          component={Input}
                          // required={field?.isRequired}
                        />
                      </FormItem>
                    );
                  })} </div>
            
              
              </>)
              })}
          
            
                <FormItem
                  label="Description"
                  labelClass="!justify-start"
                  invalid={errors.description && touched.description}
                  errorMessage={errors.description}
                >
                  <Field name="description">
                    {({ field, form }) => (
                      <RichTextEditor
                        value={field.value}
                        onChange={(val) => form.setFieldValue(field.name, val)}
                      />
                    )}
                  </Field>
                </FormItem>
                <div className="md:grid grid-cols-3 gap-4">
                  {/* <FormItem
                    label="Unique ID"
                    invalid={errors.licensePlate && touched.licensePlate}
                    errorMessage={errors.licensePlate}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="licensePlate"
                      placeholder="Unique ID..."
                      component={Input}
                      required={true}
                    />
                  </FormItem>{" "} */}
                  <FormItem
                    size="sm"
                    label="Location"
                    invalid={errors.licensePlate && touched.licensePlate}
                    errorMessage={errors.licensePlate}
                  >
                    <Field
                      size="sm"
                      type="text"
                      autoComplete="off"
                      name="location"
                      placeholder="Location..."
                      component={Input}
                      // required={true}
                    />
                  </FormItem>
                  <FormItem
                    label="Department"
                    invalid={errors.licensePlate && touched.licensePlate}
                    errorMessage={errors.licensePlate}
                  >
                    <Field
                      size="sm"
                      type="text"
                      autoComplete="off"
                      name="department"
                      placeholder="Department..."
                      component={Input}
                      // required={true}
                    />
                  </FormItem>
                  {/* {console.log(vehicleType)}
                  <h3 className="mb-2">Provide Information</h3> */}
                
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" onClick={onBack}>
                    Back
                  </Button>
                  <Button
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                    // onClick={() => onNext(values, true)}
                  >
                    Next
                  </Button>
                </div>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default personalInformation;
