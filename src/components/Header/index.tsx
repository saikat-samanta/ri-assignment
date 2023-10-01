import React from "react";
import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "Employee List" }: HeaderProps): React.JSX.Element {
  return (
    <>
      <CssBaseline />
      <AppBar sx={{ boxShadow: "none" }}>
        <Toolbar>
          <Typography component="div" variant="h6">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
