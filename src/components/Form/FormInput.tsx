import React  from 'react';
import { FormikValues } from 'formik'
import { FormLabel, FormControl, Input, FormHelperText } from '@material-ui/core';

type FieldFormType = {
    name: string
    field: FormikValues
    form: FormikValues
    placeholder: string
    type?: string
    label: string
}

const FieldForm: React.FC<FieldFormType> = ({ name, field, placeholder, form, type, label }) => {
    console.log("Field",  field )
    console.log("Form",  form )
    const typeInput = type === "" ? "text" : "textarea"
    return (
        <FormControl>
                  {/* <FormLabel htmlFor={name}>{label}</FormLabel> */}
                  <Input {...field} name={name} {...{placeholder}} type={typeInput} style={{ alignSelf: "center"}} />
                  <FormHelperText>{form.errors.name}</FormHelperText>
         </FormControl>
    );
};

export default FieldForm;