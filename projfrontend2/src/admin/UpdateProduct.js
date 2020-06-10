import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { getCategories, getProduct, updateProduct } from "./helper/adminapicall"
import { isAuthenticated } from '../auth/helper';



const UpdateProduct = ({ match }) => {

    const { user, token } = isAuthenticated()

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getaRedirect: false,
        formData: ""
    });

    const {
        name,
        description,
        price,
        stock,
        categories,
        category,
        loading,
        error,
        createdProduct,
        getaRedirect,
        formData
    } = values;

    const preload = (productId) => {
        getProduct(productId).then(data => {
            //console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                preloadCategories()
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    stock: data.stock,
                    formData: new FormData()
                });
            }
        });
    };

    const preloadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            }
            else {
                setValues({
                    categories: data,
                    formData: new FormData()
                })
            }
        })
    }

    useEffect(() => {
        preload(match.params.productId);
    }, []);


    // TODO: work on this later on
    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        updateProduct(match.params.productId, user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        price: "",
                        photo: "",
                        stock: "",
                        loading: false,
                        createdProduct: data.name
                    });
                }
            });
    };

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: createdProduct ? "" : "none" }}
        >
            <h4>Product details updated successfully</h4>
        </div>
    );

    // const errorMessage = () => (
    //     <div className="alert alert-danger mt-3"
    //         style={{ display: createdProduct ? "none" : "" }}
    //     >
    //         <h4>{createdProduct} cannot be created</h4>
    //     </div>
    // )

    const createProductForm = () => (
        <form >
            <div className="p-4">
                <span>Post photo</span>
                <div className="form-group">
                    <label className="btn btn-block btn-success text-left">
                        <input
                            onChange={handleChange("photo")}
                            type="file"
                            name="photo"
                            accept="image"
                            placeholder="choose a file"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange("name")}
                        name="photo"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        onChange={handleChange("description")}
                        name="photo"
                        className="form-control"
                        placeholder="Description"
                        value={description}
                    />
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange("price")}
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        value={price}
                    />
                </div>
                <div className="form-group">
                    <select
                        onChange={handleChange("category")}
                        className="form-control"
                        placeholder="Category"
                    >
                        <option>Select Category</option>
                        {categories && categories.map((cate, index) => (
                            <option key={index} value={cate._id}>{cate.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange("stock")}
                        type="number"
                        className="form-control"
                        placeholder="Quantity"
                        value={stock}
                    />
                </div>

                <button type="submit" onClick={onSubmit} className="btn btn-primary rounded">
                    Update Product Details
          </button>
            </div>
        </form>
    );

    return (
        <Base title="Add a Product" description="Welcome to product creation section" className="container bg-warning p-4 rounded" >
            <Link to="/admin/products" className="btn btn-md btn-dark mb-3 rounded">Products' List</Link>
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3 rounded ml-4">Admin Home</Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    );
}

export default UpdateProduct;
