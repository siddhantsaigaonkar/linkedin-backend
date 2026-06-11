import Joi from "joi";

export const signupValidation = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "string.empty": "First name is required",
  }),

  lastName: Joi.string().trim().required().messages({
    "string.empty": "Last name is required",
  }),

  userName: Joi.string().trim().required().messages({
    "string.empty": "User name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Enter a valid email",
    "string.empty": "Email is required",
  }),

  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.empty": "Password is required",
  }),
}); 