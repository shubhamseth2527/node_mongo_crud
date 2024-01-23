const UsersModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const findAll = async(req, res) => {
  try {
    const users =  await UsersModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving users."
    });
  }
};

const findOne = async (req, res) => {
    try {
        const user = await UsersModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
const findByCondition = async(req, res) => {
    console.log('Calling findByCondition Request Q,P,B -> ' , req.query,req.params, req.body);
    try {
        const where = req.query.where;
        const name = req.query.name
        if (where === 'y' && req.query.name){
            const users =  await UsersModel
            .find( {name: { "$regex": name, "$options": "i" }});
            console.log(`Fetched by condition :`, users);
            res.status(200).json(users);
        }
      } catch (error) {
        res.status(500).send({
            message:
              error.message || "Some error occurred while retrieving users."
        });
      }
}

const findByIdAndUpdate = async(req, res) => {
    console.log('Calling findByIdAndUpdate Request Q,P,B -> ' , req.query,req.params, req.body);
    try {
        const data = req.body;
        const paramsId = req.params.id;
        const filter = { _id: new ObjectId(paramsId) };
        const options = { upsert: true };
        const updateDoc = {
            $set: {
            user: data.user,
            email: data.email,
            },
        };
        await UsersModel.updateOne(filter, updateDoc, options);
        res
        .status(200)
        .json({message:'User updated successfully!'});
    } catch (error) {
        res.status(200).json({ 
            message:'User not updated!', 
            error:error
        });
    }
}

const register = async(req, res) => { 
    console.log('Calling register -> ' ,req.body);
    try {
      const emailExist = await UsersModel.findOne({email: req.body.email});
      const message = `Email already exists : ${emailExist}`;
      if (emailExist) {
        res
        .status(400)
        .json({ 
            message:message, 
            email: emailExist.email
        });
      } else {
        bcrypt
        .hash(req.body.password, 10)
        .then((hashedPassword) => {
          const user = new UsersModel({
            email: req.body.email,
            password: hashedPassword,
          });
          user
          .save()
          .then((result) => {
            res.status(201).send({
              message: "User Created Successfully",
              result,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Error creating user",
              error,
            });
          });
        })
        .catch((e) => {
            response.status(500).send({
            message: "Password was not hashed successfully",
            e,
            }); 
        });
      }
    } catch (error){
      console.log('Error')
    }
}
const create = async(req, res) => {
    console.log('Calling save Request Q,P,B -> ' , req.query,req.params, req.body);
    try {
    const doesEmailExist = await UsersModel.findOne({email: req.body.email});
    const message = `Email already exists : ${doesEmailExist}`;
    if (doesEmailExist) {
        res
        .status(400)
        .json({ 
            message:message, 
            email: doesEmailExist.email
        });
    } else {
        const post = new UsersModel({
            name:  req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            place: req.body.place,
        });
        await post.save(post);
        res
        .status(200)
        .json({message:'User added susccessfully!'});
    }
    } catch (error) {
        res.status(200).json({ 
            message:'User not added!', 
            error:error
        });
    }
}
const findByIdAndDelete = async(req, res) => {
    console.log('Calling findByIdAndDelete Request Q,P,B -> ' , req.query,req.params, req.body);
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        await UsersModel.deleteOne(query);
        res
        .status(200)
        .json({message:'User Deleted successfully!'});
    } catch (error) {
        res.status(200).json({ 
            message:'User not deleted!', 
            error:error
        });
    }
}
const login  = (req, res) => {
    console.log('Calling login Request body -> ' ,req.body);
    UsersModel.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordCheck) => {
          if(!passwordCheck) {
            return res.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          res.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    .catch((e) => {
      res.status(404).send({
        message: "Email not found",
        e,
      });
    });
}

const findByEmail = async(req, res) => {
  console.log('Calling findByEmail Request body-> ' , req.body.email);
  try {
    const user = await UsersModel.findOne({email: req.body.email});
    res.status(200).json(user);
  } catch(error) {
      res.status(404).json({ message: error.message});
  }
}
module.exports = {
    findAll,
    findOne,
    findByCondition,
    findByIdAndUpdate,
    create,
    findByIdAndDelete,
    register,
    login,
    findByEmail,
}