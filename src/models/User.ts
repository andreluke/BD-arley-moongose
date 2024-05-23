import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    mail: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "O e-mail é obrigatório"],
        validate: {
            validator: function (value: string) {
            // expressão regular para validar o formato do e-mail
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(value);
            },
            message: (props:any) => `${props.value} não é um formato de e-mail válido`,
    }
},
status:{
    type: String,
    enum: ["user", "adm"],
    default: "user"
},
    password: {
        type: String, 
        minlength: 6, 
        maxlength: 100, 
        select: false,
        trim: true,
        required: [true, "A senha é obrigatória"]
    }
}, {
    toJSON: {
        transform: function(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

const UserModel = mongoose.model("User", UserSchema, "users")

export default UserModel