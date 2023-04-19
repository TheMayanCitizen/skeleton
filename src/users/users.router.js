const router = require("express").Router();

const userServices = require("./users.services");
const JwtPassport = require("../middlewares/passport.middleware");

router
  .route("/")
  .get(
    JwtPassport.authenticate("jwt", { session: false }),
    userServices.getAllUsers
  )
  .post(userServices.postNewUser);

router
  .route("/me")
  .get(
    JwtPassport.authenticate("jwt", { session: false }),
    userServices.getMyUser
  );

router
  .route("/:id")
  .get(userServices.getUserById)
  .patch(userServices.patchUser)
  .delete(userServices.deleteUser);

module.exports = router;
