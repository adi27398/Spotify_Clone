const express = require("express");
const mongoose=require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport=require("passport");
const User=require("./models/User");
const authRoutes=require("./routes/auth");
const songRoutes=require("./routes/song");
const playlistRoutes=require("./routes/playlist");
require("dotenv").config();
const cors =require("cors");
const app = express();

const port = 8000;
app.use(express.json());
app.use(cors());


//connect mongodb to our node app.
//mongoose.connect() takes 2 arguments: 1.which db to connect to (db url),2. connection options
mongoose.connect(
    "mongodb+srv://adityagoja8:" + process.env.MONGO_PASSWORD + "@cluster0.k45pi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }
)
.then((x)=>{
    console.log("Connected to Mongo!");
})
.catch((err)=>{
    console.log("Error while connecting to Mongo");

});
//setup passport-jwt

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        console.log("🔹 JWT Payload received:", jwt_payload);

        const user = await User.findById(jwt_payload.identifier); // ✅ Use identifier
        if (!user) {
            console.log("❌ User not found");
            return done(null, false);
        }

        console.log("✅ User authenticated:", user.username);
        return done(null, user);
    })
);




//API : GET type : / : return text "hello world"
app.get("/",(req,res)=>{
    //req contains all the data for the request
    // res contains all the data for the response 
    res.send("Hello world");
});
app.use("/auth",authRoutes);
app.use("/song",songRoutes);
app.use("/playlist",playlistRoutes);
// now we want to tell express that out express is running on localhost 8000
app.listen(port,()=>{
    console.log("App is running on port  " + port);

});
