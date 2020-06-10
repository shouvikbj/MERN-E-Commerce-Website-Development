const express = require("express");

const app = express();

const port = 5001;


app.get('/', (req, res) => {
    return res.send("Hello Shouvik !");
});

//
//// Demo of middlewares start here
const admin = (req, res) => {
    console.log("Re-routing to Admin page");
    return res.send("This is admin dashboard !");
}
const isAdmin = (req, res, next) => {
    console.log("isAdmin running..");
    next();
}
const isLoggedIn = (req, res, next) =>{
    // var loggedIn = true;
    var loggedIn = false;
    if (loggedIn) {
        console.log("User logged in.");
        next();
    } else {
        console.log("User not logged in..");
        return res.send("You need to login first.!");
    }
}
app.get('/admin', isLoggedIn, isAdmin, admin);
//// Demo of middlewares end here
//

app.get('/login', (req, res) => {
    return res.send("You are visiting login route.!");
});

app.get("/logout", (req, res) => {
    return res.send("<h1>You are logged out !!</h1>");
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}...`);
});


// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

