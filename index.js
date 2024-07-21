require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;
const sequelize  = require('./config/sequelize')
const mongoose = require('./config/mongoose');
const fs = require('fs');
const passport = require('passport');
const passportConfig = require('./config/passport-config')(passport);
const checkApiKey = require('./middleware/apiKey');

// MODELS
const User = require('./models/User');
const Post = require('./models/Post');

// ROUTES
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route');

// KEYS
const privateKEY = fs.readFileSync('./private.pem', 'utf8');
const publicKEY = fs.readFileSync('./public.pem', 'utf8');

const app = express();
app.use(cors());
app.use(passport.initialize());
app.use(checkApiKey);
app.use(bodyParser.json());

app.use('/api',authRoute);
app.use('/api/users',userRoute);
app.use('/api/posts',postRoute);

sequelize.sync({ alter: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });
