import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import { CartItemList } from "../../components/cart/CartItemList";
import { PaymentMethodSelect } from "../../components/common/PaymentMethodSelect";

// import Header from '../../components/common/Header'
import ListTable from "../../components/table/ListTable";
import UserDialog from "./UserDialog";

import {
  setUser,
  fetchUsers,
  createUser,
  updateUser,
} from "../../redux/user/user.actions";

const columns = [
  { field: "createUTC", label: "Created Date" },
  { field: "imageurl", label: "Portrait", type: "image" },
  { field: "username", label: "Username" },
  { field: "email", label: "Email" },
  { field: "phone", label: "Phone" },
  { field: "type", label: "Type" },
  { field: "balance", label: "Balance" },
  { field: "status", label: "Status" },
  // { field: "attribute", label: "Attribute" },
  { field: "actions", label: "Actions" },
];

const defaultSort = ["createUTC", -1];

const DEFAULT_USER = {
  _id: "",
  createUTC: "",
  username: "",
  email: "",
  phone: "",
  password: "",
};

const UserListPage = ({
  setUser,
  fetchUsers,
  createUser,
  updateUser,
  user,
  users,
}) => {
  const [dialogOpened, setDialogOpen] = useState(false);

  useEffect(() => {
    setUser(DEFAULT_USER);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePaymentMethodSelect = () => {};

  const handleOpenUserDialog = () => {
    setUser(DEFAULT_USER);
    setDialogOpen(true);
  };

  const handleSave = (data, id) => {
    if (id) {
      updateUser(data, id);
    } else {
      createUser(data);
    }
  };

  const handleEditRow = (row) => {
    setUser(row);
    setDialogOpen(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenUserDialog}
      >
        Add
      </Button>
      <UserDialog
        data={user}
        opened={dialogOpened}
        onClose={setDialogOpen}
        onSubmit={handleSave}
      />
      {users && (
        <ListTable
          label="user"
          defaultSort={defaultSort}
          columns={columns}
          rows={users}
          onEditRow={handleEditRow}
        />
      )}
      {/* <Header title={'User Page'}></Header>
            <CartItemList items={cart.items}/>
            <div className="label payment-label">Payment Method</div>
            <PaymentMethodSelect onSelect={handlePaymentMethodSelect}></PaymentMethodSelect> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  users: state.users,
});

export default connect(mapStateToProps, {
  setUser,
  fetchUsers,
  createUser,
  updateUser,
})(UserListPage);
