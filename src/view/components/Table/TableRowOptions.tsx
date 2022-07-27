import React, { FunctionComponent, useState } from "react";
import Popover from "@mui/material/Popover";
import {
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { RootState } from "../../../application/store/configureStore";

export type RowCommand = "edit" | "editMany" | "delete";

type Props = {
  onRowCommand: (command: RowCommand, row: string[]) => void;
  row: string[];
};

export const TableRowOptions: FunctionComponent<Props> = ({
  onRowCommand,
  row,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [inEditField, setInEditField] = useState(false);
  const [inDeleteField, setInDeleteField] = useState(false);
  const { isAdmin, user } = useSelector((state: RootState) => state.auth);

  const isCompanyAdminOrMasterAdmin = () => {
    return (
      user?.accessType === "Administrador" ||
      // user?.accessType === "Editor" ||
      isAdmin
    );
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleEdit = () => {
    // setInEditField((prev) => !prev);
    onRowCommand("edit", row);
  };

  const handleEditMany = () => {
    // setInEditField((prev) => !prev);
    onRowCommand("editMany", row);
  };

  const handleDelete = () => {
    onRowCommand("delete", row);
  };

  return !isCompanyAdminOrMasterAdmin() ? (
    <></>
  ) : (
    <div>
      <IconButton aria-describedby={id} color="secondary" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Popover
        sx={{ width: 300 }}
        PaperProps={{ style: { width: 200 } }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Opções
            </ListSubheader>
          }
        >
          {(user?.accessType === "Administrador" ||
            // user?.accessType === "Editor" ||
            isAdmin) && (
            <>
              <ListItemButton onClick={handleEdit}>
                <EditIcon></EditIcon>
                <ListItemText primary="Editar" />
              </ListItemButton>
              <ListItemButton onClick={handleEditMany}>
                <EditIcon></EditIcon>
                <ListItemText primary="Editar cadastro em massa" />
              </ListItemButton>
              <ListItemButton onClick={handleDelete}>
                <DeleteIcon></DeleteIcon>
                <ListItemText primary="Deletar" />
              </ListItemButton>
            </>
          )}
        </List>
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        {/* {inEditField && (
          <EditField
            formId={formId}
            field={field}
            open={inEditField}
            toggleOpen={onCloseEditField}
          />
        )}
        {inDeleteField && (
          <DeleteField
            formId={formId}
            field={field}
            inDeleteField={inDeleteField}
            onCancelDelete={toggleInDeleteField}
          />
        )} */}
      </Popover>
    </div>
  );
};
