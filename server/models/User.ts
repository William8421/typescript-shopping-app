import {Model, Schema, model} from 'mongoose';

interface User {
    username: string; 
    firstName: string; 
    lastName: string; 
    email: string; 
    password: string;
    confirmPassword?: string;
    id?: number;
}

interface UserModel extends Model<User> {
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
}

const userSchema = new Schema<User>({
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

userSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};
userSchema.statics.findByUsername = function (username: string) {
  return this.findOne({ username });
};


const User = model<User, UserModel>('User', userSchema);

export default User