const router = require("express").Router();
const User = require("..models/User");

//Register
router.post("/register", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const savedUser = await newUser.save();
    // console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    // console.log(err);
    res.status(501).json(err);
  }
});

module.exports = router;
