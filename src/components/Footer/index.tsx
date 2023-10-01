import { AppBar, Toolbar } from "@mui/material";
import React from "react";

export function Footer({ children }: React.PropsWithChildren): React.JSX.Element {
  return (
    <AppBar color="inherit" position="fixed" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
}
