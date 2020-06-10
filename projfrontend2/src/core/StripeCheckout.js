import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from '../backend';
import { createOrder } from "./helper/orderHelper"


const StripeCheckout = ({
    products,
    setReload = f => f,
    reload = undefined
}) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalPrice = () => {
        let amount = 0
        products.map(p => {
            amount = amount + p.price
        })
        return amount
    }

    const makePayment = token => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
            .then(response => {
                console.log(response)
                // call further methods
                const { status } = response
                console.log("STATUS : ", status)
            })
            .catch(error => console.log(error))
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
                stripeKey="pk_test_ZzpLSoefGwWpd832cSTPQONp00ntEBPMPo"
                token={makePayment}
                amount={getFinalPrice() * 100}
                name="Checkout Orders"
                shippingAddress
                billingAddress
            >
                <button className="btn btn-primary btn-block rounded">Pay with Stripe</button>
            </StripeCheckoutButton>
        ) : (
                <Link to="/signin">
                    <button className="btn btn-warning btn-lg rounded">Signin</button>
                </Link>
            )
    }

    return (
        <div>
            <h4 className="text-white">Pay <b>$ {getFinalPrice()}</b> on Checkout</h4>
            <br /><br />
            {showStripeButton()}
        </div>
    );
}

export default StripeCheckout;
