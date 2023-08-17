const express = require("express");
const router = express.Router();
const user = require('../models/user')

router.post("/register", async (req, res) => {
  const newUser = new user({ name: req.body.name, email: req.body.email, password: req.body.password });

  try {
    const savedUser = await newUser.save();
    res.send('User Registered Successfully');
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {

    const { email, password } = req.body


    try {
        const user = User.findone({ email: email, password: password })
        if (user) {
            res.send(user)
        }
        else {
            return res.status(400).json({ message: 'Login Failed' });

        }
    } catch (error) {
        return res.status(400).json({ error });

    }
})

module.exports = router;