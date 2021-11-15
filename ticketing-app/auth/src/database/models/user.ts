import mongoose from "mongoose";
import { AuthService } from "../../services/auth-service";

interface UserAttrs {
  email: string
  password: string
}

interface UserModel extends mongoose.Model<UserDocument> {
  build: (attrs: UserAttrs) => UserDocument
}

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

userSchema.pre("save", async function(done) {
  if (this.isModified('password')) {
    const hashed = await AuthService.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

userSchema.statics.build = (user: UserAttrs) => {
  return new User(user);
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };