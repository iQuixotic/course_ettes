// pacakages and internal files
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './app/routes';

// variables
const app = express();
const PORT = process.env.PORT || 4044;

// Define middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '/client/build')));
}

// listen on port PORT
app.listen(PORT, () => {
  console.log(`You know that I will always be there for you on port ${PORT}`);
});

