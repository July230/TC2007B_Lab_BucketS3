const express = require("express");
const router = express.Router();

router.get("/todo", (req, res) => {
    // res.send(All.users");
    res.render("index", {title: "Home Page"});
})

module.exports = router;