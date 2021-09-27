import React from "react";

import { Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";

function FormikMuiField({ label, name, required = true, type = "text", sx }) {
  return (
    <Box sx={{ mt: "20px", ...sx }}>
      <Field
        as={TextField}
        label={label}
        name={name}
        required={required}
        type={type}
        fullWidth
        helperText={
          <ErrorMessage name={name} id="component-error-text"></ErrorMessage>
        }
      />
    </Box>
  );
}

export default FormikMuiField;
