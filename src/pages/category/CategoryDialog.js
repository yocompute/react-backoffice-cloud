import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Controller, useForm } from "react-hook-form";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  formCtrl: {
    width: "100%",
  },
}));

const CategoryDialog = ({ category, opened, onClose, onSubmit }) => {
  const { control, handleSubmit } = useForm();
  const classes = useStyles();

  const handleClose = () => {
    onClose(false);
  };

  const handleOk = (d) => {
    onSubmit(d, category._id);
    onClose(false);
  };

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add New Category</DialogTitle>
      {category && (
        <form onSubmit={handleSubmit(handleOk)}>
          <DialogContent>
            <DialogContentText>
              To add a category, please enter the name and description here.
            </DialogContentText>
            <Controller
              control={control}
              name="name"
              defaultValue={category.name}
              as={
                <TextField
                  autoFocus
                  margin="dense"
                  label="Name"
                  type="text"
                  fullWidth
                />
              }
            />

            <Controller
              control={control}
              name="description"
              defaultValue={category.description}
              as={
                <TextField
                  autoFocus
                  margin="dense"
                  label="Description"
                  type="text"
                  fullWidth
                />
              }
            />

            <FormControl className={classes.formCtrl}>
              <InputLabel id="category-status-select-label">Status</InputLabel>
              <Controller
                control={control}
                name="status"
                defaultValue={category.status}
                rules={{ required: true }}
                as={
                  <Select id="category-status-select">
                    <MenuItem key={"A"} value={"A"}>
                      Active
                    </MenuItem>
                    <MenuItem key={"I"} value={"I"}>
                      Inactive
                    </MenuItem>
                  </Select>
                }
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps)(CategoryDialog);
