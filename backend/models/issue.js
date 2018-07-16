import mongoose from 'mongoose';

const { Schema } = mongoose;

let issue  = new Schema({
    title:{
        type: String
    }
    // },
    // description:{
    //     type: String
    // },
    // responsible:{
    //     type: String
    // },
    // severity:{
    //     type:String
    // },
    // status:{
    //     type: String,
    //     default: 'Open'
    // }
});

export default mongoose.model('Issue', issue);