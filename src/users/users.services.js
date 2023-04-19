const userControllers = require("./users.controlles");

const getAllUsers = (req, res) => {
  userControllers
    .findAllUsers()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const getUserById = (req, res) => {
  const id = req.params.id;

  userControllers
    .findUserbyId(id)
    .then((data) => {
      if (!data)
        return res
          .status(404)
          .json({ message: `User with id ${id} does not exist` });
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const postNewUser = (req, res) => {
  const userObj = req.body;
  userControllers
    .createNewUser(userObj)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const patchUser = (req, res) => {
  const id = req.params.id;
  const userObj = req.body;

  userControllers
    .updateUser(id, userObj)
    .then((data) => {
      if (!data) return res.status(404).json({ message: "Invalid ID" });
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  userControllers
    .deleteUser(id)
    .then((data) => {
      if (!data) return res.status(404).json({ message: "Invalid ID" });
      res.status(204).json();
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const getMyUser = (req, res) => {
  const user = req.user;
  res.status(200).json(user);
};
module.exports = {
  getAllUsers,
  getUserById,
  getMyUser,
  postNewUser,
  deleteUser,
  patchUser,
};
