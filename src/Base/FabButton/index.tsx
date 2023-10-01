import React from "react";
import { Fab, type FabProps } from "@mui/material";

export function FABButton({
  children,
  ...rest
}: React.PropsWithChildren<FabProps>): React.JSX.Element {
  return (
    <Fab
      {...rest}
      sx={{ position: "absolute", bottom: 16, right: 16, borderRadius: "30%", ...rest.sx }}
    >
      {children}
    </Fab>
  );
}
