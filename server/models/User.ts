import {Model, Schema, model} from 'mongoose';

interface IUser {
    username: string; 
    firstName: string; 
    lastName: string; 
    email: string; 
    password: string;
    confirmPassword: string;
    id: number;
    name: string;
}

interface UserModel extends Model<IUser> {
  findByEmail(email: string): Promise<IUser>;
  findByUsername(username: string): Promise<IUser>;
  findUserById(id: string): Promise<IUser>;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: {
        validator: (value: any) =>
          value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        message: (props: any) => `${props.value} is not a valid email`,
      },
    },
    password: { type: String, required: true, minLength: 6 },
    confirmPassword: { type: String },
    id: Number,
});

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};
userSchema.statics.findByUsername = function (username) {
  return this.findOne({ username: username });
};

userSchema.statics.findUserById = function (id) {
  return this.findOne({id: id})
};

const User = model<IUser, UserModel>('User', userSchema);

export default User