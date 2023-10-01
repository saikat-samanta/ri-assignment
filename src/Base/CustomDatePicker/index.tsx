import React from "react";
import { CalendarIcon, MobileDatePicker, type MobileDatePickerProps } from "@mui/x-date-pickers";
import { type Moment } from "moment";
import { InputAdornment } from "@mui/material";

export interface CustomDatePickerProps extends MobileDatePickerProps<Moment> {
  name?: string;
  error?: boolean;
  helperText?: React.ReactNode;
  placeholder?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export function CustomDatePicker({
  value,
  onChange,
  error,
  helperText,
  placeholder,
  onBlur,
  name,
  ...rest
}: CustomDatePickerProps): React.JSX.Element {
  return (
    <MobileDatePicker
      {...rest}
      onChange={onChange}
      slotProps={{
        textField: {
          name,
          fullWidth: true,
          error,
          helperText,
          onBlur,
          InputProps: {
            placeholder,
            startAdornment: (
              <InputAdornment position="start">
                <CalendarIcon />
              </InputAdornment>
            ),
          },
        },
        toolbar: {},
      }}
      value={value}
    />
  );
}
