const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    status: 'error',
    message: 'Terjadi kegagalan pada server',
  });
};

module.exports = errorHandler;
