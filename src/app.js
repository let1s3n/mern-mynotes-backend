import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import usersRoutes from './routes/users';
import notesRoutes from './routes/notes';
import authRoutes from './routes/auth';
import {createRoles} from './libs/initialSetup';

const app = express();

var whitelist = ['https://mern-mynotes.herokuapp.com/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

createRoles();

//Settings
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2)

//Middlewares
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json()); 

//Routes
app.use('/api/users',usersRoutes );
app.use('/api/notes', notesRoutes);
app.use('/api/auth', authRoutes);

export default app;