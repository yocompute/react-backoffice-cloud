import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from "prop-types"

import Button from '@material-ui/core/Button'
import { CartItemList } from '../../components/cart/CartItemList';
import { PaymentMethodSelect } from '../../components/common/PaymentMethodSelect'

// import Header from '../../components/common/Header'
// import SwaggerUI from 'swagger-ui'
// import 'swagger-ui/dist/swagger-ui.css';

// const spec = require('./swagger.json');

// const ui = SwaggerUI({
//     spec,
//     dom_id: '#swagger',
//   });

// import SwaggerUI from "swagger-ui-react"
// import "swagger-ui-react/swagger-ui.css"

const OrderListPage = ({cart}) => {
    const handlePaymentMethodSelect = () => {

    }

    return (
        <div>Order List
             {/* <div id="swagger"></div>
              */}
              {/* <SwaggerUI url="/swagger.json" /> */}
            {/* <Header title={'Order Page'}></Header>
            <CartItemList items={cart.items}/>
            <div className="label payment-label">Payment Method</div>
            <PaymentMethodSelect onSelect={handlePaymentMethodSelect}></PaymentMethodSelect> */}
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(
    mapStateToProps,
    null
)(OrderListPage);