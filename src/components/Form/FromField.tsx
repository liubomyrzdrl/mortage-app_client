import React from "react";
import { Field, FormikValues } from "formik";
import FormInput from "./FormInput";

type FormFieldType = {
    name: string
    placeholder: string
    type?: string
    label: string
}

const FormField: React.FC<FormFieldType> = ({ name, placeholder, type, label }) => {
  return (
    <Field name={name}>
      {({ field, form }: FormikValues) => (
        <FormInput 
            name={name}
            field={field} 
            placeholder={placeholder} 
            form={form} 
            type={type} 
            {...{label}}
        />
      )}
    </Field>
  );
};

export default FormField;
