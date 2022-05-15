import Joi from 'joi';

const validateUser = (body) => {
  const { name, email, password } = body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate({ name, email, password });
};

const validateLogin = (body) => {
  const { email, password } = body;

  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate({ email, password });
};

export { validateUser, validateLogin };
