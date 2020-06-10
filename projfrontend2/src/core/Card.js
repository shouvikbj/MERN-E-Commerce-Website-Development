import React, { useState, useEffect } from 'react';
import ImageHelper from "./helper/ImageHelper"
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';



const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    setReload = f => f, // <equivalent_statements> function(f){return f}
    reload = undefined
}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const cartTitle = product ? product.name : "A photo from pixels"
    const cartDescription = product ? product.description : "Default Desc."
    const cartPrice = product ? product.price : "DEFAULT"

    const addToCart = () => {
        addItemToCart(product, () => setRedirect(true))
    }

    const getRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }


    const showAddToCart = addtoCart => {
        return (
            addtoCart && (
                <button
                    onClick={addToCart}
                    className="btn btn-block btn-primary mt-2 mb-2 rounded"
                >
                    Add to Cart
                </button>
            )
        )
    }

    const showRemoveFromCart = removeFromCart => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {
                        removeItemFromCart(product._id)
                        setReload(!reload)
                    }}
                    className="btn btn-block btn-danger mt-2 mb-2 rounded"
                >
                    Remove from cart
                </button>
            )
        )
    }

    return (
        <div className="card text-white bg-dark border border-wzrning ">
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
                {getRedirect(redirect)}
                <ImageHelper product={product} />
                <br />
                <p className="lead bg-info text-white font-weight-normal text-wrap pl-2 rounded">
                    {cartDescription}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddToCart(addtoCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Card

