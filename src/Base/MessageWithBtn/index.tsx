import React from "react";
import { Button, Grid, Link, Typography } from "@mui/material";

interface MessageWithBtnProps {
  message: string;
  onClick?: () => void;
  label: string;
}

export const MessageWithBtn = ({
  message,
  onClick,
  label,
}: MessageWithBtnProps): React.JSX.Element => (
  <Grid item container justifyContent="space-between" gap={2}>
    <Grid item>
      <Typography>{message}</Typography>
    </Grid>
    <Grid item>
      <Link component={Button} size="small" onClick={onClick} color="inherit">
        {label}
      </Link>
    </Grid>
  </Grid>
);
