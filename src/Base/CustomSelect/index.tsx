import React from "react";
import {
  TextField,
  type TextFieldProps,
  useMediaQuery,
  useTheme,
  Drawer,
  MenuItem,
} from "@mui/material";

interface CustomSelectProps extends Omit<TextFieldProps, "options"> {
  options?: { key: string; value: string }[];
}

export function CustomSelect({
  InputProps,
  options = [],
  ...rest
}: CustomSelectProps): React.JSX.Element {
  const selectRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up("md"));
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = (): void => {
    setIsDrawerOpen(!match && true);
  };

  const closeDrawer = (): void => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <TextField
        {...rest}
        ref={selectRef}
        InputProps={{
          ...InputProps,
          readOnly: !match,
        }}
        onClick={openDrawer}
        select
      >
        <MenuItem value="none">{rest.placeholder ?? "No option"}</MenuItem>
        {options.map((el, i) => (
          <MenuItem key={`${el.value}-${i}`} value={el.value}>
            {el.key}
          </MenuItem>
        ))}
      </TextField>
      <Drawer
        PaperProps={{
          sx: {
            borderTopLeftRadius: theme.spacing(2),
            borderTopRightRadius: theme.spacing(2),
            paddingY: theme.spacing(2),
          },
        }}
        anchor="bottom"
        onClose={closeDrawer}
        open={isDrawerOpen}
      >
        <MenuItem
          selected={rest.value === "none"}
          value="none"
          onClick={(ev) => {
            if (selectRef.current !== null) {
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              rest.onChange?.({
                type: ev.type,
                target: {
                  ...(selectRef.current as EventTarget & HTMLInputElement),
                  name: rest.name ?? "",
                  value: "none",
                },
              } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
              setIsDrawerOpen(false);
            }
          }}
        >
          {rest.placeholder ?? "No option"}
        </MenuItem>
        {options.map((el, i) => (
          <MenuItem
            selected={rest.value === el.value}
            key={`${el.value}-${i}`}
            value={el.value}
            onClick={(ev) => {
              if (selectRef.current !== null) {
                // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                rest.onChange?.({
                  type: ev.type,
                  target: {
                    ...(selectRef.current as EventTarget & HTMLInputElement),
                    name: rest.name ?? "",
                    value: el.value,
                  },
                } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
                setIsDrawerOpen(false);
              }
            }}
          >
            {el.key}
          </MenuItem>
        ))}
      </Drawer>
    </>
  );
}
