import mongoose from 'mongoose';

const postModel=new mongoose.Schema({
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String,
        maxLength:500
    },
    image:{
        type:String,
        
    },
    likes:{
        //array of objects
        type:[mongoose.Schema.Types.ObjectId],
        ref:'User',
        default:[]

    },
    replies:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true,


            },
            text:{
                type:String
            },
            userProfilePic:{
                type:String,

            },
            userName:{
                type:String
            }
        }
    ]
},{
    timestamps:true
})


const Post=mongoose.model('Post',postModel)

export default Post;