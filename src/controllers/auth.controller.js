import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'

export const signup = async (req, res) => {
  const { username, email, password, roles } = req.body

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password)
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles;
  } else {
    const role = await Role.findOne({ name: 'user' });
    newUser.roles = role;
  }

  const savedUser = await newUser.save();
  console.log(savedUser);

  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400
  });


  return res.json({ token, username: savedUser.username, roles: savedUser.roles });
}

export const signin = async (req, res) => {
  try {
    const userFound = await User.findOne({ username: req.body.username }).populate('roles');

    if (!userFound) return res.status(400).json({ message: 'User not found' });

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);

    if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid password' });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400
    });
    const { username, roles } = userFound;
    return res.json({ token, username, roles });
  } catch (error) {
    console.error(error);
  }


}