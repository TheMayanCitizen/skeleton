const Users = require("../models/users.models");
const uuid = require("uuid");
const { hashPassword } = require("../utils/crypto");

const createNewUser = async (userObj) => {
  const newUser = {
    id: uuid.v4(),
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    email: userObj.email,
    password: hashPassword(userObj.password),
    birthday: userObj.birthday,
    phone: userObj.phone,
  };

  const data = await Users.create(newUser);
  return data;
};

const findAllUsers = async () => {
  const users = await Users.findAll();
  return users;
};

const findUserbyId = async (id) => {
  const data = await Users.findOne({
    where: {
      id,
    },
  });
  return data;
};

const findUserByEmail = async (email) => {
  const data = await Users.findOne({
    where: {
      email: email,
    },
  });

  return data;
};

const updateUser = async (id, userObj) => {
  const selectedUser = await Users.findOne({
    where: {
      id,
    },
  });

  if (!selectedUser) return null;

  const user = Users.update(userObj);
  return user;
};

const deleteUser = async (id) => {
  const user = await Users.findOne({
    where: {
      id,
    },
  });

  return user;
};

module.exports = {
  createNewUser,
  findAllUsers,
  findUserbyId,
  findUserByEmail,
  updateUser,
  deleteUser,
};

/* 
const Users = require('../models/users.model')
const uuid = require('uuid')
const { hashPassword } = require('../utils/crypto')

const findAllUsers = async () => {
    const users = await Users.findAll()
    return users
}

const findUserById = async (id) => {
    const data = await Users.findOne({
        where: {
            id: id,
        }
    })
    return data
}

const createUser = async (userObj) => {
    const newUser = await Users.create({
        id: uuid.v4(),
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        email: userObj.email,
        password: hashPassword(userObj.password)
    })
    return newUser
}

const updateUser = async(id, userObj) => {

    const selectedUser = await Users.findOne({
        where: {
            id: id
        }
    })
    
    if(!selectedUser) return null

    const modifiedUser = await selectedUser.update(userObj)
    return modifiedUser
}

const deleteUser = async(id) => {
    const user = await Users.destroy({
        where: {
            id: id
        }
    })
    return user // 1 || 0
}

module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser
}
*/
