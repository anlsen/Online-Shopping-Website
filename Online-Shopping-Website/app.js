const express = require("express");
const csrf=require("csurf");
const session = require('express-session');


const db = require("./data/database");
const authRoutes=require("./routes/auth-routes");
const baseRoutes=require("./routes/base-routes");
const productsRoutes=require("./routes/products-routes");
const adminRoutes=require("./routes/admin-routes");
const cartRoutes=require("./routes/cart-routes");
const ordersRoutes=require("./routes/orders-routes");


const csrfMiddleware=require("./middlewares/csrf-middleware");
const errorMiddleware=require("./middlewares/error-middleware");
const authLocalsMiddleware=require("./middlewares/auth-middleware");
const initializeCartMiddleware=require("./middlewares/cart-middleware");
const protectionMiddleware=require("./middlewares/protection-middleware");
const refreshCartMiddleware=require("./middlewares/refresh-cart-middleware");

const sessionConfig=require("./config/session-config");

const app = express();

app.set("view engine", 'ejs');
app.set("views", "./views");


app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(express.static('public'));
app.use("/products/assets",express.static("product-data"));


app.use(session(sessionConfig()));
app.use(csrf());

app.use(csrfMiddleware);
app.use(authLocalsMiddleware);
app.use(initializeCartMiddleware);
app.use(refreshCartMiddleware);


app.use(authRoutes);
app.use(baseRoutes);
app.use(productsRoutes);
app.use("/cart",cartRoutes);
app.use(protectionMiddleware.protectAuthenticationRoutes);
app.use("/orders",ordersRoutes);
app.use(protectionMiddleware.protectAdminRoutes);
app.use("/admin",adminRoutes);


app.use(errorMiddleware);


db.connectToDatabase().then(function () {
  app.listen(3000);
}).catch(function(err){
  console.log(`Failed to connect to DB server: ${err}`);
});
