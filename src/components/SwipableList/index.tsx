import React from "react";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { ListItem, type ListItemProps } from "../../Base";
import { Delete, Edit } from "@mui/icons-material";
import { Grid, useTheme, type GridProps, useMediaQuery } from "@mui/material";

const StyledIcon = ({
  icon,
  bgColor,
}: {
  icon: React.ReactNode;
  bgColor?: GridProps["bgcolor"];
}): React.JSX.Element => {
  return (
    <Grid
      alignItems="center"
      bgcolor={bgColor}
      boxSizing="border-box"
      container
      height="100%"
      justifyContent="center"
      paddingX="20px"
      sx={{ userSelect: "none" }}
    >
      <Grid item>{icon}</Grid>
    </Grid>
  );
};

interface TrailingActionProps {
  onEdit: () => void;
  onDelete: () => void;
}

const TrailingAction = ({ onEdit, onDelete }: TrailingActionProps): React.JSX.Element => (
  <TrailingActions>
    <SwipeAction onClick={onEdit}>
      <StyledIcon bgColor="orange" icon={<Edit />} />
    </SwipeAction>
    <SwipeAction destructive={true} onClick={onDelete}>
      <StyledIcon bgColor="red" icon={<Delete sx={{ color: "#fff" }} />} />
    </SwipeAction>
  </TrailingActions>
);

interface CustomListProps {
  options?: ListItemProps["value"][];
  onEdit?: ListItemProps["onEdit"];
  onDelete?: ListItemProps["onDelete"];
}

export function CustomList({ options = [], onEdit, onDelete }: CustomListProps): React.JSX.Element {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <SwipeableList type={Type.IOS}>
      {options?.map((el) => (
        <SwipeableListItem
          blockSwipe={match}
          key={el.id}
          maxSwipe={0.5}
          trailingActions={
            <TrailingAction onDelete={() => onDelete?.(el)} onEdit={() => onEdit?.(el)} />
          }
        >
          <ListItem onDelete={onDelete} onEdit={onEdit} value={el} />
        </SwipeableListItem>
      ))}
    </SwipeableList>
  );
}
