import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import FormField from "../../Form/FromField";
import { Button, TableCell, TableRow } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";

type AddBankFormType = {
  handleSubmit: (values: any, actions: FormikHelpers<any>) => any;
  setIsAddBank: (isOk: boolean) => void;
};

const AddBankForm: React.FC<AddBankFormType> = ({
  handleSubmit,
  setIsAddBank,
}) => {
  return (
    // <Box className="container" display="flex">
       <TableRow>
      <Formik
        initialValues={{
          bankName: "",
          minDownPay: "",
          maxLoan: "",
          loanTerm: "",
          intrestRate: "",
        }}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
          //   setTimeout(() => {
          //     alert(JSON.stringify(values, null, 2));
          //     actions.setSubmitting(false);
          //   }, 1000);
        }}
      >
        {(props) => (
         
            <Form>
              <TableCell align="center" component="th" scope="row">
                <FormField
                  {...props}
                  name="bankName"
                  placeholder="bank name"
                  label="bank name"
                />
              </TableCell>
              <TableCell align="center">
                <FormField
                  {...props}
                  name="minDownPay"
                  placeholder="min down pay"
                  label="min down pay"
                />
              </TableCell>

              <TableCell align="center">
                <FormField
                  {...props}
                  name="maxLoan"
                  placeholder="max loan"
                  label="max loan"
                />
              </TableCell>

              <TableCell align="center">
                <FormField
                  {...props}
                  name="loanTerm"
                  placeholder="loan term"
                  label="loan term"
                />
              </TableCell>

              <TableCell align="center">
                <FormField
                  {...props}
                  name="intrestRate"
                  placeholder="intrest rate"
                  label="intrest rate"
                />
              </TableCell>

              <TableCell align="center">
                <Button type="submit">
                  <AddCircleIcon
                    style={{ color: green[500], cursor: "pointer" }}
                  />
                </Button>
              </TableCell>
              <TableCell align="center">
                <CancelIcon
                  style={{ color: red[500], cursor: "pointer" }}
                  onClick={() => setIsAddBank(false)}
                />
              </TableCell>
            </Form>
          
        )}
      </Formik>
      </TableRow>
    // </Box>
  );
};

export default AddBankForm;
