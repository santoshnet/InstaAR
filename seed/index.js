var Admin = require("../models/Admin");
var dotenv = require("dotenv");

var mongoose = require("mongoose");
const Setting = require("../models/Setting");
const ShippingCharge = require("../models/ShippingCharge");
dotenv.config();

mongoose.connect(process.env.DATABASE_DEV_CONNECTION, function (error) {
  if (error) throw error;
  console.log(`connect mongodb success`);
});

var newAdmin = new Admin({
  email: "artistokart@yopmail.com",
  password: "password",
  name: "Admin",
  role: "admin",
  phone: "9876543210",
});

Admin.createUser(newAdmin, function (err, user) {
  if (err) throw err;
  console.log(user);
});


var newSetting = new Setting({
  email: "artistokart@yopmail.com",
  title: "Artistokart",
  phone: "9876543210",
  currency: "₹",
});

Setting.createSetting(newSetting, function (err, user) {
  if (err) throw err;
  console.log(user);
});

var newShippingCharge1 = new ShippingCharge({
  "title": "Free Shipping",
  "deliverable": "4-5 days",
  "minimum_order_amount": 1000,
  "price": 0,
  "status": "active",
});



function exit() {
  mongoose.disconnect();
}
