import React, { useEffect, useState } from "react";
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

import { setQrcode } from "../../redux/qrcode/qrcode.actions";
import { fetchBrands } from "../../redux/brand/brand.actions";

import { CLIENT_HOST } from "../../const";

var QRCode = require("qrcode-react");

const useStyles = makeStyles((theme) => ({
  formCtrl: {
    width: "100%",
  },
  qrcodeRow: {
    padding: "25px",
  },
  qrcodeCol: {
    width: "50%",
    float: "left",
  },
}));

function QrcodeDialog({
  qrcode,
  brands,
  setQrcode,
  fetchBrands,
  opened,
  onClose,
  onSubmit,
}) {
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const [val, setValue] = useState();
  // qrcode && qrcode._id && qrcode.brand ?
  // `${CLIENT_HOST}/${qrcode.brand}/${qrcode._id}` : null);

  const handleClose = () => {
    onClose(false);
  };

  const handleOk = (d) => {
    onSubmit(d, qrcode._id);
    onClose(false);
  };

  const handleBrandChange = (e) => {
    const newModel = { ...qrcode };
    newModel.brand = e.target.value;
    setQrcode(newModel);
    setValue(`${CLIENT_HOST}/?brandId=${e.target.value}&qrcode=${qrcode._id}`);
  };

  const handleStatusChange = (e) => {
    const newModel = { ...qrcode };
    newModel.status = e.target.value;
    setQrcode(newModel);
  };

  useEffect(() => {
    if (qrcode && qrcode._id && qrcode.brand) {
      setValue(`${CLIENT_HOST}/?brandId=${qrcode.brand}&qrcode=${qrcode._id}`);
    }
  }, [qrcode]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add New Qrcode</DialogTitle>
      {qrcode && (
        <form onSubmit={handleSubmit(handleOk)}>
          <DialogContent>
            <DialogContentText>
              To add a qrcode, please enter the name and description here.
            </DialogContentText>

            <Controller
              control={control}
              name="name"
              defaultValue={qrcode.name}
              as={
                <TextField
                  autoFocus
                  margin="dense"
                  label="name"
                  type="text"
                  fullWidth
                />
              }
            />

            <Controller
              control={control}
              name="description"
              defaultValue={qrcode.description}
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
              <InputLabel id="qrcode-status-select-label">Status</InputLabel>
              <Controller
                control={control}
                name="status"
                defaultValue={qrcode.status}
                rules={{ required: true }}
                as={
                  <Select
                    id="qrcode-status-select"
                    // onChange={handleStatusChange}
                  >
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
              <InputLabel id="qrcode-brand-select-label">Brand</InputLabel>
              <Controller
                control={control}
                name="brand"
                rules={{ required: true }}
                defaultValue={qrcode.brand && qrcode.brand._id}
                render={({ onChange, value, onBlur, name }) => (
                  <Select
                    id="qrcode-brand-select"
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                      handleBrandChange(e);
                      return e;
                    }}
                  >
                    {brands &&
                      brands.map((brand) => (
                        <MenuItem key={brand._id} value={brand._id}>
                          {brand.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
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

      <div className={classes.qrcodeRow}>
        <div className={classes.qrcodeCol}>{val && <QRCode value={val} />}</div>
      </div>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  qrcode: state.qrcode,
  brands: state.brands,
});

export default connect(mapStateToProps, {
  setQrcode,
  fetchBrands,
})(QrcodeDialog);
