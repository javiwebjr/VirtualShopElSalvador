import User from "../models/userModel.js";
import Handler from "../middlewares/Handler.js";
import bcrypt from "bcryptjs";
import token from "../utilities/tokenJWT.js";
import emailConfirmation from "../utilities/emailConfirmation.js";

const createUser = Handler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        throw new Error('Please fill all the inputs');
    }
    const userExists = await User.findOne({email})
    if(userExists){
        throw new Error('User already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPasssword =  await bcrypt.hash(password, salt)
    const newUser = new User({username, email, password: hashedPasssword});
    try {
        await newUser.save();
        token(res, newUser._id);
        res.status(201).json({
            _id: newUser._id, 
            username: newUser.username, 
            email: newUser.email, 
            isAdmin: newUser.isAdmin,
        });
        emailConfirmation({
            email, username, token: newUser.token
        });
    } catch (error) {
        res.status(400)
        throw new Error("Invalid data");
    }
});

const loginUser = Handler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        throw new Error('Please fill all the inputs');
    }
    const userExist = await User.findOne({email});
    if(!userExist) return res.status(400).json({message:'This user does not exist'});
    if(userExist){
        const validPasswor = await bcrypt.compare(password, userExist.password);
        if(!validPasswor) return res.status(400).json({message:'Invalid Password'});
        if(validPasswor){
            token(res, userExist._id);
            res.status(201).json({
                _id: userExist._id, 
                username: userExist.username, 
                email: userExist.email, 
                isAdmin: userExist.isAdmin,
                isConfirmed: userExist.isConfirmed
            });
            return;
        }
    }
});

const logoutUser = Handler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({message: "Logged Out"})
});

const getAllUsers = Handler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const getProfile = Handler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        res.json({_id: user._id, 
            username: user.username, 
            email: user.email
        });
    }else{
        res.status(403);
        throw new Error('User Not Found')
    }
});

const updateProfile = Handler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPasssword =  await bcrypt.hash(req.body.password, salt);
            user.password = hashedPasssword;
        }
        const updateUser = await user.save()
        res.json({
            _id: updateUser._id,
            username: updateUser.username,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        });
    }else{
        res.status(403);
        throw new Error('User Not Found')
    }
});

const deleteUser = Handler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        if(user.isAdmin){
            res.status(400);
            throw new Error("Admin Users Can not be deleted..");
        }
        await User.deleteOne({_id: user._id});
        res.json({message: 'User Removed'})
    }else{
        res.status(403);
        throw new Error("User Not Found")
    }
});

const getUser = Handler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -updatedAt -__v');
    if(user){
        res.json(user);
    }else{
        res.status(404);
        throw new Error('User Not Found');
    }
});

const updateUser = Handler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user.isAdmin){
        throw new Error('Admins Can Not Be Edited');
    }
    if(user){
        user.username = req.body.username || user.username;
        user.isAdmin = Boolean(req.body.isAdmin) || user.isAdmin;
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            isAdmin: updatedUser.isAdmin
        });
    }else{
        res.status(404);
        throw new Error('User Not Found');
    }
});

const confirmAccount = Handler(async (req, res) => {
    const {token} = req.params;

    const userConfirmed = await User.findOne({token});
    if(!userConfirmed){
        res.status(403);
        throw new Error('Invalid Token');
    }
    try {
        userConfirmed.token = null;
        userConfirmed.isConfirmed = true;
        await userConfirmed.save();
        res.json({message:"This User Has Been Confirmed Succesfully"});
    } catch (error) {
        console.log(error);
    }
});

export {createUser, loginUser, logoutUser, getAllUsers, getProfile, updateProfile, deleteUser, getUser, updateUser, confirmAccount};