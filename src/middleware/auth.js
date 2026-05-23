import 'dotenv/config';
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: 'failed',
      message: 'Invalid or expired token',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      status: 'failed',
      message: 'Invalid or expired token',
    });
  }
};

export default auth;
