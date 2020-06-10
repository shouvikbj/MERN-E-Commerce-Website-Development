import React, { useState, useEffect } from 'react'
import "../styles.css"
import { API } from "../backend"
import Base from "./Base"
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import StripeCheckout from './StripeCheckout'
import Paymentb from './Paymentb'


const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart())
    }, [reload]);

    const loadAllProducts = (products) => {
        return (
            <div>
                <h4>your cart</h4>
                <br />
                {products.map((product, index) => (
                    <div>
                        <Card
                            key={index}
                            product={product}
                            removeFromCart={true}
                            addtoCart={false}
                            setReload={setReload}
                            reload={reload}
                        />
                        <br />
                    </div>
                ))}
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <div>
                <h4>checkout</h4>
            </div>
        )
    }

    return (
        <Base title="Cart Page" description="Ready to place order">
            <div className="row text-center">
                <div className="col-4">
                    {products.length > 0 ? (
                        loadAllProducts(products)
                    ) : (
                            <h3>Your Cart is empty</h3>
                        )}
                </div>
                <div className="col-4">
                    <StripeCheckout products={products} setReload={setReload} />
                </div>
                <div className="col-4">
                    <Paymentb products={products} setReload={setReload} />
                </div>
            </div>
        </Base>
    )
}

export default Cart
