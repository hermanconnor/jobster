import User from '../models/User.js';
import { validateUser, validateLogin } from '../validation/validate';

// REGISTER
const registerUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    const msg = error.details[0].message;
    res.status(400);
    throw new Error(msg);
  }

  const { name, email, password } = req.body;

  const alreadyRegistered = await User.findOne({ email });
  if (alreadyRegistered) {
    res.status(400);
    throw new Error('User already registered');
  }

  const user = await User.create({ name, email, password });
  const token = user.createToken();

  res.status(201).json({
    user: {
      name: user.name,
      email: user.email,
      location: user.location,
    },
    token,
    location: user.location,
  });
};

// LOGIN
const loginUser = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    const msg = error.details[0].message;
    res.status(400);
    throw new Error(msg);
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    res.status(400);
    throw new Error('Invalid email or password');
  }

  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    res.status(400);
    throw new Error('Invalid email or password');
  }

  const token = user.createToken();

  user.password = undefined;

  res.status(200).json({ user, token, location: user.location });
};

// UPDATE
const updateUser = async (req, res) => {
  const { name, email, location } = req.body;

  const user = await User.findOne({ _id: req.user.userId });
};

export { registerUser, loginUser, updateUser };
