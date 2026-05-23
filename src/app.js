import 'dotenv/config';
import express from 'express';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.use('/', routes);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
