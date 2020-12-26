import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import ImageUploader from "react-images-upload";
import { makeStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { setBrand } from "../../redux/brand/brand.actions";
import { fetchUsers } from "../../redux/user/user.actions";

import BrandApi from "../../services/BrandApi";
import ImageViewer from "../../components/common/ImageViewer";

const useStyles = makeStyles((theme) => ({
  formCtrl: {
    width: "100%",
  },
  uploadRow: {
    paddingBottom: "25px",
    paddingRight: "25px",
  },
  uploadCol: {
    width: "50%",
    float: "left",
  },
  imageCol: {
    width: "50%",
    float: "left",
  },
}));

function BrandDialog({
  users,
  setBrand,
  fetchUsers,
  brand,
  opened,
  onClose,
  onSubmit,
}) {
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  
  const handleClose = () => {
    onClose(false);
  };

  const handleOk = (d) => {
    onSubmit(d, brand._id);
    onClose(false);
  };

  const handleRemovePicture = () => {
    const confirm = window.confirm("Do you really want to remove this image?");
    if (confirm) {
      const newModel = { ...brand };
      newModel.pictures.splice(0, 1);
      setBrand(newModel);
    }
  };

  const handleUpload = (picture) => {
    let file = picture;
    if (Array.isArray(file)) {
      file = file[0];
    }
    BrandApi.upload(file, brand._id).then((brand) => {
      if (brand) {
        setBrand({ ...brand });
      } else {
        // setAlert({
        //   message: t("Upload failed"),
        //   severity: "error"
        // });
      }
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add New Brand</DialogTitle>
      {brand && (
        <form onSubmit={handleSubmit(handleOk)}>
          <DialogContent>
            <DialogContentText>
              To add a brand, please enter the name and description here.
            </DialogContentText>

            <Controller
              control={control}
              name="name"
              defaultValue={brand.name}
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
              defaultValue={brand.description}
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
              <InputLabel id="brand-status-select-label">Status</InputLabel>
              <Controller
                control={control}
                name="status"
                defaultValue={brand.status}
                rules={{ required: true }}
                as={
                  <Select id="brand-status-select">
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

            <FormControl className={classes.formCtrl}>
              <InputLabel id="brand-owner-select-label">Owner</InputLabel>
              <Controller
                control={control}
                name="owner"
                defaultValue={brand.owner && brand.owner._id}
                rules={{ required: true }}
                as={
                  <Select id="brand-owner-select">
                    {users &&
                      users.map((user) => (
                        <MenuItem key={user._id} value={user._id}>
                          {user.username}
                        </MenuItem>
                      ))}
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

      <div className={classes.uploadRow}>
        <div className={classes.uploadCol}>
          <ImageUploader
            withIcon={true}
            buttonText="Upload image"
            onChange={(picture) => handleUpload(picture)}
            imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
            maxFileSize={5242880}
          />
        </div>
        <div className={classes.imageCol}>
          <ImageViewer
            url={
              brand && brand.pictures && brand.pictures.length > 0
                ? brand.pictures[0].url
                : ""
            }
            onRemove={handleRemovePicture}
          />
        </div>
      </div>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  brand: state.brand,
  users: state.users,
});

export default connect(mapStateToProps, {
  setBrand,
  fetchUsers,
})(BrandDialog);
