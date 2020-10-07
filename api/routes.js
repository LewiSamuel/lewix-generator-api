// -------------------------------
/******   IMPORT MODULES   ******/
const express = require('express');
const routes = new express.Router();
const multer = require('multer');
const bcrypt = require("bcrypt");

// controllers
const UserController = require("./controllers/UserController");
const PostController = require("./controllers/PostController");

// MiddleWares
const AuthToken = require('./middlewares/AuthToken');
const UploadImage = require('./middlewares/uploadImage');
const UserMiddleWare = require('./middlewares/UserMiddle');
const PostMiddleWare = require('./middlewares/PostMiddle');

// Models
const User = require('./models/User');
const Post = require('./models/Post');

// Relations
User.hasMany(Post, {foreignKey: 'idUser'});
Post.belongsTo(User, {foreignKey: 'idUser'});

// Rota Principal
routes.get("/", (req, res) =>  res.send("LEWIX GENERATOR - API"));
routes.post("/token", UserController.getToken );


/****************************/
//
//      SERVICES USER
//
/****************************/
routes.post("/user/auth",     [ AuthToken, UserMiddleWare.ValidateFields, UserMiddleWare.Authenticate ], UserController.Authenticate);
routes.post("/user/save",     [            UserMiddleWare.ValidateFields, UserMiddleWare.save ],         UserController.save);
routes.post("/user/update",   [ AuthToken, UserMiddleWare.ValidateFields, UserMiddleWare.update ],       UserController.update);
routes.post("/user/list",     [ AuthToken, UserMiddleWare.ValidateFields, UserMiddleWare.list ],         UserController.list);
routes.post("/user/list/:id", [ AuthToken, UserMiddleWare.ValidateFields, UserMiddleWare.listOne ],      UserController.listOne);
routes.post("/user/delete",   [ AuthToken, UserMiddleWare.ValidateFields, UserMiddleWare.delete ],       UserController.delete);

// /****************************/
// //
// //      SERVICES POST
// //
// /****************************/
routes.post("/post/save",     [ AuthToken, PostMiddleWare.ValidateFields, PostMiddleWare.save ],      PostController.save);
routes.post("/post/update",   [ AuthToken, PostMiddleWare.ValidateFields, PostMiddleWare.update ],    PostController.update);
routes.post("/post/list",     [ AuthToken, PostMiddleWare.ValidateFields, PostMiddleWare.list ],      PostController.list);
routes.post("/post/list/:id", [ AuthToken, PostMiddleWare.ValidateFields, PostMiddleWare.listOne ],   PostController.listOne);
routes.post("/post/delete",   [ AuthToken, PostMiddleWare.ValidateFields, PostMiddleWare.delete ],    PostController.delete);

module.exports = routes;