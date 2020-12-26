import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import Button from '@material-ui/core/Button';
import { CartItemList } from '../../components/cart/CartItemList';
import { PaymentMethodSelect } from '../../components/common/PaymentMethodSelect';

// import Header from '../../components/common/Header';
import ListTable from '../../components/table/ListTable';
import PaymentDialog from './PaymentDialog';

import { fetchPayments, createPayment, updatePayment } from '../../redux/payment/payment.actions';
import { selectPopulatedPayments } from '../../redux/payment/payment.selectors';
const columns = [
    { field: "createUTC", label: "Created Date" },
    { field: "user", label: "User", type: 'object', property:'username' },
    { field: "total", label: "Total" },
    { field: "description", label: "Description" },
    { field: "status", label: "Status" },
    { field: "actions", label: "Actions" },
];

const defaultSort = ['createUTC', -1];

const DEFAULT_BRAND = {
    _id: '',
    logoUrl:'',
    name:'',
    description:'',
    status: '',
    owner:'',
    createUTC:'',
    actions:'',
}

const PaymentListPage = ({ fetchPayments, createPayment, updatePayment, payments }) => {

    const [dialogOpened, setDialogOpen] = useState(false);
    const [data, setData] = useState(DEFAULT_BRAND);


    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    const handlePaymentMethodSelect = () => {

    }

    const handleOpenPaymentDialog = () => {
        setData(DEFAULT_BRAND);
        setDialogOpen(true);
    }

    const handleSave = (data) => {
        if(data && data._id){
            updatePayment(data);
        }else{
            createPayment(data);
        }
    }

    const handleEditRow = (row) => {
        setData(row);
        setDialogOpen(true);
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpenPaymentDialog}>Add</Button>
            <PaymentDialog
                data={data}
                opened={dialogOpened}
                onClose={setDialogOpen}
                onSubmit={handleSave}
            />
            {
                payments &&
                <ListTable
                    label="payment"
                    defaultSort={defaultSort}
                    columns={columns}
                    rows={payments}
                    onEditRow={handleEditRow}
                />
            }
        </div>
    )
}

const mapStateToProps = state => ({
    payments: selectPopulatedPayments(state)
});

export default connect(
    mapStateToProps,
    { 
        fetchPayments,
        createPayment,
        updatePayment
    }
)(PaymentListPage);