
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/user");

exports.createUser =  (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new UserModel({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({

message: "Invalid authentication credentials !"

        });
      });
  });
},

exports.userLogin =  (req, res, next) => {
  let fetchedUser;
  UserModel.findOne({ email: req.body.email })
    .then(user => {

      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {

      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }

console.log("result.email = "+result.email);
console.log("result._id = "+result._id);

console.log("fetchedUser.email = "+fetchedUser.email);
console.log("fetchedUser._id = "+fetchedUser._id);

      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      console.log(token);
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Invalid authentication credentials !"
      });
    });
}
