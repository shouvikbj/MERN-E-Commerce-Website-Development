const express = require("express");
const router = express.Router();
const {
    isSignedIn,
    isAuthenticated,
    isAdmin
} = require("../controllers/auth")
const {
    getUserById,
    pushOrderInPurchaseList
} = require("../controllers/user")
const {
    updateStock
} = require("../controllers/product")
const {
    getOrderById,
    createOrder,
    getAllOrders,
    getOrderStatus,
    updateStatus
} = require("../controllers/order")

// params
router.param("userId", getUserById)
router.param("orderId", getOrderById)

// actual routes
//// create order routes
router.post("/order/create/:userId",
    isSignedIn,
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStock,
    createOrder
)

//// read routes
router.get("/order/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrders
)

// order status route
router.get("/order/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrderStatus
)
router.put("/order/:orderId/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateStatus
)



module.exports = router
