const { Router} = require('express');
const User = require('../models/user');
const router = Router();

router.get("/signin", (req, res) => {
    return res.render("signin");
})
router.get("/signup", (req, res) => {
    return res.render("signup");
})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
         const token= await User.matchPasswordandGenerateToken(email, password);
 return res.cookie("token",token).redirect("/");
    } catch (error) {
        return res.render("signin",{
            error: "invalid email or password",
        });
    }
    console.log("token", token);
});

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
})

router.post("/signup", async (req, res) => {
    const { username , email, password } = req.body;
    await User.create({
        username,
        email,
        password,
    })
    return res.redirect("/");
});

module.exports = router