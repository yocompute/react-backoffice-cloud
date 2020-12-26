import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { fetchUsers } from '../../redux/user/user.actions';
const useStyles = makeStyles((theme) => ({
    formCtrl: {
      width: '100%'
    },
}));
function PaymentDialog({ users, fetchUsers, data, opened, onClose, onSubmit }) {
    const classes = useStyles();
    const { control, handleSubmit } = useForm();
    const handleClose = () => {
        onClose(false);
    };

    const handleOk = (d) => {
        onSubmit(d);
        onClose(false);
    }

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <Dialog open={opened} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add New Payment</DialogTitle>
            <form onSubmit={handleSubmit(handleOk)}>
                <DialogContent>
                    <DialogContentText>
                        To add a payment, please enter the name and description here.
                    </DialogContentText>

                    <Controller
                        control={control}
                        name="name"
                        defaultValue={data.name}
                        as={<TextField
                            autoFocus
                            margin="dense"
                            label="name"
                            type="text"
                            fullWidth
                        />}
                    />

                    <Controller
                        control={control}
                        name="description"
                        as={<TextField
                            autoFocus
                            margin="dense"
                            label="Description"
                            type="text"
                            fullWidth
                        />}
                    />

                    <FormControl className={classes.formCtrl}>
                        <InputLabel id="product-status-select-label">Status</InputLabel>
                        <Controller
                            control={control}
                            name="status"
                            rules={{ required: true }}
                            as={
                                <Select id="product-status-select">
                                    <MenuItem key={"A"} value={"A"}>Active</MenuItem>
                                    <MenuItem key={"I"} value={"I"}>Inactive</MenuItem>
                                </Select>
                            }
                        />
                    </FormControl>

                    <FormControl className={classes.formCtrl}>
                        <InputLabel id="payment-user-select-label">Owner</InputLabel>
                        <Controller
                            control={control}
                            name="user"
                            rules={{ required: true }}
                            as={
                                <Select id="payment-user-select">
                                    {
                                        users &&
                                        users.map(user =>
                                            <MenuItem key={user._id} value={user._id}>{user.username}</MenuItem>
                                        )
                                    }
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
        </Dialog>
    );
}



const mapStateToProps = state => ({
    users: state.users
});

export default connect(
    mapStateToProps,
    {
        fetchUsers
    }
)(PaymentDialog);