import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import { CartItemList } from "../../components/cart/CartItemList";
import { PaymentMethodSelect } from "../../components/common/PaymentMethodSelect";

// import Header from '../../components/common/Header'
import ListTable from "../../components/table/ListTable";
import BrandDialog from "./BrandDialog";
import {
  setBrand,
  fetchBrands,
  createBrand,
  updateBrand,
} from "../../redux/brand/brand.actions";

const columns = [
  { field: "createUTC", label: "Created Date" },
  { field: "logoUrl", label: "Brand Logo", type: "image" },
  { field: "name", label: "Brand Name" },
  { field: "description", label: "Description" },
  { field: "status", label: "Status" },
  {
    field: "owner",
    label: "Owner",
    type: "object",
    property: "username",
  },
  { field: "actions", label: "Actions" },
];

const defaultSort = ["createUTC", 1];

const DEFAULT_BRAND = {
  _id: "",
  logoUrl: "",
  name: "",
  description: "",
  status: "",
  owner: "",
  createUTC: "",
  actions: "",
};

const BrandListPage = ({
  brands,
  setBrand,
  fetchBrands,
  createBrand,
  updateBrand,
}) => {
  const [dialogOpened, setDialogOpen] = useState(false);
  // const [data, setData] = useState(DEFAULT_BRAND);

  useEffect(() => {
    setBrand(DEFAULT_BRAND);
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handlePaymentMethodSelect = () => {};

  const handleOpenBrandDialog = () => {
    setBrand(DEFAULT_BRAND);
    setDialogOpen(true);
  };

  const handleSave = (data, id) => {
    if (id) {
      updateBrand(data, id);
    } else {
      createBrand(data);
    }
  };

  const handleEditRow = (row) => {
    setBrand(row);
    setDialogOpen(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenBrandDialog}
      >
        Add
      </Button>
      <BrandDialog
        opened={dialogOpened}
        onClose={setDialogOpen}
        onSubmit={handleSave}
      />
      {brands && (
        <ListTable
          label="brand"
          defaultSort={defaultSort}
          columns={columns}
          rows={brands}
          onEditRow={handleEditRow}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  brands: state.brands,
});

export default connect(mapStateToProps, {
  setBrand,
  fetchBrands,
  createBrand,
  updateBrand,
})(BrandListPage);
