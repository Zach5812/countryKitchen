// Import Dependencies
const { ironSession } = require("iron-session/express");
const { authRouter } = require('./routes/auth.routes');
const { userRouter } = require('./routes/user.routes');
const express = require("express");
const cors = require("cors");
require('dotenv').config();
require("./configs/mongoose.config")

const app = express();


// Configure Express
app.use(
    cors({ credentials: true, origin: "http://localhost:3000" }),
    express.urlencoded({ extended: true }),
    express.json(),
    ironSession({
        cookieName: "UserCookie",
        password: process.env.COOKIE_SECRET,
        cookieOptions: { secure: process.env.NODE_ENV === "production" }
    })
);

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

// Routes & Controller logic(CRUD)
const Router = require("./routes/recipes.routes");
Router(app);


// Listen to the Port
app.listen(8000, () => console.log(`Listening to the port: 8000`));