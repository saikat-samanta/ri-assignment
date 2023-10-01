import React from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";
import type { SnackbarProps, AlertProps, SnackbarCloseReason } from "@mui/material";

export interface AlertSnackbarProps
  extends Omit<SnackbarProps, "onClose" | "message" | "children"> {
  alertProps: Omit<AlertProps, "onClose">;
  onClose?: (
    event: Event | React.SyntheticEvent<Element, Event>,
    reason?: SnackbarCloseReason,
  ) => void;
  children?: AlertProps["children"];
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert ref={ref} {...props} sx={{ ...props?.sx, width: "100%" }} />;
});

export function AlertSnackbar({
  onClose,
  alertProps,
  children,
  ...rest
}: AlertSnackbarProps): React.JSX.Element {
  return (
    <Snackbar {...rest} onClose={onClose}>
      <Alert {...alertProps} onClose={onClose}>
        {children}
      </Alert>
    </Snackbar>
  );
}
