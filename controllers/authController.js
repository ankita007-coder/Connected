
import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { comparePassword, hashedPassword } from '../utils/passwordUtils.js';
import { createJWT } from '../utils/tokenUtils.js';

export const register = async (req, res) => {
  try {    
    const hashPassword = await hashedPassword(req.body.password);
    const response = await User.create({ name: req.body.name, 
                                         email: req.body.email, 
                                         password: hashPassword,
                                         gender: req.body.gender,
                                         bio: req.body.bio
                                        });
    const token = createJWT({ email: req.body.email, password: req.body.password });
    const oneDay = 24*60*60
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: true,
      expires: new Date(Date.now()+oneDay),
      secure: process.env.NODE_ENV === 'production'
    });

    return res.status(StatusCodes.CREATED).json({ msg: 'User created successfully',token });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  try {
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new NotFoundError(`User ${req.body.email} not found`);
    }

    if (!comparePassword(req.body.password, user.password)) {
      throw new Error(`User password incorrect`);
    }

    const token = createJWT({ email: req.body.email, password: req.body.password });

    const oneDay = 24*60*60
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: true,
      expires: new Date(Date.now()+oneDay),
      secure: process.env.NODE_ENV === 'production', 
    });
    return res.status(StatusCodes.OK).json({ msg: 'Login successful',token});
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};
