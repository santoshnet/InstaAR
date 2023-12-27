var User = require("../models/User");
var dotenv = require("dotenv");

var mongoose = require("mongoose");
const Setting = require("../models/Setting");

dotenv.config();
let DATABASE_CONNECTION = process.env.DATABASE_PROD_CONNECTION;
if (process.env.NODE_ENV === "development") {
  DATABASE_CONNECTION = process.env.DATABASE_DEV_CONNECTION;
}

mongoose.connect(DATABASE_CONNECTION).then((res) => {
  console.log("Database connected");
}).catch(error => {
  console.log(error);
});

var newAdmin = new User({
  email: "admin@admin.com",
  password: "password",
  name: "Admin",
  role: "admin",
  phone: "9876543210",
});

User.createUser(newAdmin, function (err, user) {
  if (err) throw err;
  console.log(user);
});


// var newSetting = new Setting({
//   email: "artistokart@yopmail.com",
//   title: "Artistokart",
//   phone: "9876543210",
//   currency: "₹",
// });
//
// Setting.createSetting(newSetting, function (err, user) {
//   if (err) throw err;
//   console.log(user);
// });
//



function exit() {
  mongoose.disconnect();
}
