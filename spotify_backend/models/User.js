const mongoose=require("mongoose")
// how to create a model
// step 1 require mongoose
// step 2 create mongoose schema (structure of user)
// step 3 : create a model

const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    password: {
        type:String,
        required:true,
        private:true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email:{
        type: String,
        required: true,
    },
    username:{
        type:String,
        required: true,
    },
    likedSongs:{
        type: String,
        default: "",
    },
    likedPlaylist:{
        type:String,
        default:"",

    },
    subscribedArtists: {
        type:String,
        default:"",
    },
});

const UserModel= mongoose.model("User",User);
module.exports=UserModel;