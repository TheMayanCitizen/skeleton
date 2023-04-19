const router = require("express").Router();

const postlogin = require("./auth.services");

router.post("/login", postlogin);

module.exports = router;
