import React from "react";
import { ArrowForward, Person } from "@mui/icons-material";
import { Grid, InputAdornment, TextField } from "@mui/material";
import { type FormikConfig, useFormik } from "formik";
import moment from "moment";
import { CustomDatePicker, CustomSelect } from "../../Base";
import { EmployeeSchema } from "../../schemas";
import { RoleList } from "../../constant";

interface AddEmployeeFormProps {
  value: EmployeeSchema;
  onSubmit: FormikConfig<AddEmployeeFormProps["value"]>["onSubmit"];
}

export const AddEmployeeForm = React.forwardRef<HTMLFormElement, AddEmployeeFormProps>(
  function MyComponent({ value, onSubmit }: AddEmployeeFormProps, ref): React.JSX.Element {
    const formRef = React.useRef<HTMLFormElement>(null);

    const formik = useFormik({
      initialValues: value,
      onSubmit,
      enableReinitialize: true,
      validate(values) {
        const formErrors: Record<string, unknown> = {};
        try {
          EmployeeSchema.parse(values);
        } catch (error) {
          const errors = (error as Record<string, unknown>).errors as Record<string, unknown>[];
          errors.forEach((subError) => {
            formErrors[(subError.path as string[])[0]] = subError.message;
          });
        }

        return formErrors;
      },
    });
    React.useImperativeHandle(
      ref,
      () => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return {
          submit: formik.submitForm as HTMLFormElement["submit"],
          reset: formik.resetForm as HTMLFormElement["reset"],
        } as HTMLFormElement;
      },
      [formRef],
    );

    return (
      <form onSubmit={formik.handleSubmit} ref={formRef}>
        <Grid container paddingX={1} spacing={2}>
          <Grid item xs={12}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              fullWidth
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Employee name"
              value={formik.values.name}
              error={formik.touched.name === true ? Boolean(formik.errors.name) : undefined}
              helperText={
                formik.touched.name === true && formik.errors.name !== undefined
                  ? formik.errors.name
                  : undefined
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CustomSelect
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              fullWidth
              name="role"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              options={RoleList}
              placeholder="Select role"
              value={formik.values.role}
              error={formik.touched.role === true ? Boolean(formik.errors.role) : undefined}
              helperText={
                formik.touched.role === true && formik.errors.role !== undefined
                  ? formik.errors.role
                  : undefined
              }
            />
          </Grid>
          <Grid alignItems="center" container item justifyContent="center">
            <Grid item xs={5.5}>
              <CustomDatePicker
                name="startDate"
                placeholder="Start date"
                onBlur={formik.handleBlur}
                onChange={(_value) => {
                  void formik.setFieldValue("startDate", _value?.format());
                }}
                value={moment(formik.values.startDate)}
                error={
                  formik.touched.startDate === true ? Boolean(formik.errors.startDate) : undefined
                }
                helperText={
                  formik.touched.startDate === true && formik.errors.startDate !== undefined
                    ? formik.errors.startDate
                    : undefined
                }
              />
            </Grid>
            <Grid container item justifyContent="center" xs={1} color="#1976d2">
              <ArrowForward />
            </Grid>
            <Grid item xs={5.5}>
              <CustomDatePicker
                name="endDate"
                onBlur={formik.handleBlur}
                placeholder="End date"
                onChange={(_value) => {
                  void formik.setFieldValue("endDate", _value?.format());
                }}
                value={
                  formik.values.endDate !== undefined ? moment(formik.values.endDate) : undefined
                }
                error={formik.touched.endDate === true ? Boolean(formik.errors.endDate) : undefined}
                helperText={
                  formik.touched.endDate === true && formik.errors.endDate !== undefined
                    ? formik.errors.endDate
                    : undefined
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  },
);
