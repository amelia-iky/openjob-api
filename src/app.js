require('dotenv').config();

const express = require('express');

const userRoutes = require('./api/users/routes');
const authRoutes = require('./api/authentications/routes');
const profileRoutes = require('./api/profile/routes');
const jobRoutes = require('./api/jobs/routes');
const companyRoutes = require('./api/companies/routes');
const categoryRoutes = require('./api/categories/routes');
const applicationRoutes = require('./api/applications/routes');
const bookmarkRoutes = require('./api/bookmarks/routes');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(authRoutes);
app.use(profileRoutes);
app.use(jobRoutes);
app.use(companyRoutes);
app.use(bookmarkRoutes);
app.use(categoryRoutes);
app.use(applicationRoutes);

app.get('/', (req, res) => {
  res.send('API RUNNING');
});

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server jalan di ${port}`);
});
