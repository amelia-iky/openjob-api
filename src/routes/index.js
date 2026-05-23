import express from 'express';
import authRoutes from './auth.routes.js';
import bookmarkRoutes from './bookmarks.routes.js';
import categoriesRoutes from './categories.routes.js';
import companyRoutes from './companies.routes.js';
import jobRoutes from './jobs.routes.js';
import applicationRoutes from './aplications.routes.js';
import profileRoutes from './profile.routes.js';
import userRoutes from './user.routes.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

router.use('/authentications', authRoutes);
router.use('/bookmarks', bookmarkRoutes);
router.use('/categories', categoriesRoutes);
router.use('/companies', companyRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/profile', profileRoutes);
router.use('/users', userRoutes);

export default router;
