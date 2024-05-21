import mongoose, { ObjectId, Schema, Types } from "mongoose";
import User from "./User";
import Products from "./Products"

const SpentsSchema = new Schema({
    iduser: {
        type: Types.ObjectId,
        ref: User,
        required: [true, "O usuário é obrigatório"],
        validate:{
            validator: async function(_id:ObjectId) {
                const document = await mongoose.models.Category.findById(_id);
                return !!document;
            },
            message:"O usuário não existe no cadastro"
        }
    }, 
    idproduct: {
        type: Types.ObjectId,
        ref: Products,
        required: [true, "O usuário é obrigatório"],
        validate:{
            validator: async function(_id:ObjectId) {
                const document = await mongoose.models.Category.findById(_id);
                return !!document;
            },
            message:"O usuário não existe no cadastro"
        }
    }, datetime:{
        type: Date
    },
    value:{
        type: Number,
        required: true,
    }
},{
    toJSON: {
        transform: function(doc,ret,options){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
    }
}
});

const SpentsModel = mongoose.model("Spents", SpentsSchema, "products")

export default SpentsModel