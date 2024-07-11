require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const sequelize  = require('./config/sequelize')
const fs = require('fs');
const passport = require('passport');
const passportConfig = require('./config/passport-config')(passport);
const checkApiKey = require('./middleware/apiKey');
// MODELS
const User = require('./models/User');

// ROUTES
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');

// KEYS
const privateKEY = fs.readFileSync('./private.pem', 'utf8');
const publicKEY = fs.readFileSync('./public.pem', 'utf8');

const app = express();
app.use(passport.initialize());
app.use(checkApiKey);
app.use(bodyParser.json());

app.use('/api',authRoute);
app.use('/api/users',userRoute);

sequelize.sync({ alter: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });
