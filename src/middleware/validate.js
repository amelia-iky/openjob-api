const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }

  req.body = value;
  next();
};

module.exports = validate;
