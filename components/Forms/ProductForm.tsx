import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Input } from "@/components";

type Props = {
  handleAdd: any;
  handleUpdate: any;
  initialValues?: any;
  isEdit: number;
};

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  sellPrice: Yup.number().required("Required"),
});

const ProductForm = (props: Props) => {
  const [errorsResponse, setErrorsResponse] = useState([]);
  if (errorsResponse.length > 0)
    setTimeout(() => {
      setErrorsResponse([]);
    }, 10000);
  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={schema}
      onSubmit={async (values, {}) => {
        props.isEdit === 0
          ? props
              .handleAdd(values)
              .catch(
                (err: any) =>
                  err.response && setErrorsResponse(err.response.data.errors)
              )
          : props
              .handleUpdate(props.isEdit, values)
              .catch(
                (err: any) =>
                  err.response && setErrorsResponse(err.response.data.errors)
              );
      }}
    >
      {({ isSubmitting, errors, isValid }) => (
        <Form className="flex flex-col justify-center items-stretch gap-4 ">
          {errorsResponse &&
            errorsResponse.map((err: any, index: any) => {
              return (
                <span key={index} className="text-red-500">
                  {err.message}
                </span>
              );
            })}
          <Input
            errors={errors.name}
            label="Product Name"
            name="name"
            placeholder="e.g Ketchup"
            type="text"
          />
          <Input
            errors={errors.sellPrice}
            label="Product Sell Price"
            name="sellPrice"
            placeholder="e.g 2000"
            type="number"
          />

          <button
            type="submit"
            disabled={!isValid}
            className="bg-gradient-to-tl from-green-700 to-lime-500 disabled:from-green-800 disabled:to-green-800 disabled:cursor-not-allowed font-semibold shadow-lg py-2 px-4 rounded-lg "
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
