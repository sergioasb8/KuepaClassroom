const usersCtrl = {};

const UserModel = require('../models/UserModel.js');
//-------------------------------------//
//   creating the required functions   //
//-------------------------------------//

usersCtrl.getUsers = (req, res) => {
    res.json({message: []})
}

usersCtrl.createUsers = (req, res) => {
    res.json({message: []})
}

usersCtrl.getUser = (req, res) => {
    res.json({message: []})
}

usersCtrl.updateUsers = (req, res) => {
    res.json({message: []})
}

usersCtrl.deleteUsers = (req, res) => {
    res.json({message: []})
}

module.exports = usersCtrl;