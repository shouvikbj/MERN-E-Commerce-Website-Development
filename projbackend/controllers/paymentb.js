var braintree = require("braintree")

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "g22pmfb6fwrdmqpw",
    publicKey: "trvxf9b4ddph2jpt",
    privateKey: "544c2a32ec91418eefe3d3eefccda14c"
})

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.send(response)
        }
    })
}

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, function (err, result) {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.send(result)
        }
    })
}

