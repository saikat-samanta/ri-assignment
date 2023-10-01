import React from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import moment from "moment";
import type { EmployeeSchema } from "../../schemas";
import { RoleList } from "../../constant";

export interface ListItemProps {
  value: EmployeeSchema;
  onEdit?: (data: EmployeeSchema) => void;
  onDelete?: (data: EmployeeSchema) => void;
}

export function ListItem({ value, onEdit, onDelete }: ListItemProps): React.JSX.Element {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid key={value.id} container alignItems="center" paddingX={2} paddingY={1} borderBottom={0.1}>
      <Grid item container flexDirection="column" flex={1}>
        <Grid item>
          <Typography fontSize="16px" fontWeight="500">
            {value.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography fontSize="14px" fontWeight="400">
            {RoleList.find((el) => el.value === value.role)?.key}
          </Typography>
        </Grid>
        <Grid alignItems="center" container item>
          <Grid item>
            <Typography fontSize="12px" fontWeight="400">
              {value.endDate === undefined ? "From " : ""}
              {moment(value.startDate).format("DD-MM-YYYY")}
            </Typography>
          </Grid>
          {value.endDate !== undefined ? (
            <Grid item>
              <Typography fontSize="12px" fontWeight="400">
                &nbsp;-&nbsp;
              </Typography>
            </Grid>
          ) : null}
          <Grid item>
            <Typography fontSize="12px" fontWeight="400">
              {value.endDate !== undefined ? moment(value.endDate).format("DD-MM-YYYY") : undefined}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {match ? (
        <Grid item>
          <Grid item container gap={1}>
            <Grid item>
              <IconButton color="info" onClick={() => onEdit?.(value)}>
                <Edit />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="error" onClick={() => onDelete?.(value)}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
}
