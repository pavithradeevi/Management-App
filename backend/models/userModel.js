const mongoose=require('mongoose');
const bcrypt= require('bcryptjs')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add a name"]
    },
    email:{
        type:String,
        required:[true,"Please add a Email"],
        unique:true,
        trim:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please Enter Valid Email"
        ]
    },
    password:{
        type:String,
        required:[true,"Please enter password"],
        minLength:[6,"Password must be morethan 6 character"],
        // maxLength:[23,"Password must be upto 23 character"]
    },
    photo:{
        type:String,
        required:[true,"Please insert photo"],
        default:"https://t4.ftcdn.net/jpg/00/63/06/45/360_F_63064599_c2YEM1vnauuB1eenrhrAhhaSNwUHx2vQ.jpg",

    },
    phone:{
        type:String,
        default:"+91",

    },
    bio:{
        type: String,
        maxLength: [250, "Bio must not be more than 250 characters"],
        default: "bio",

    }
},{
    timestamps:true,
});

 // encript password before saving to db
 userSchema.pre("save",async function(next){

    // hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password,salt);
    this.password = hashedPassword
 })

const User=mongoose.model("User",userSchema)
module.exports=User