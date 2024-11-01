import { IUser } from '@/interface/user_interface';
import mongoose, { Model, Schema } from 'mongoose';
import { string } from 'zod';

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        role: { type: String, enum: ['admin', 'user'], default: 'user' },
        provider: { type: String },
        providerId: { type: String },
    },
    {
        timestamps: true,
    }
);

const User =
    mongoose.models?.User || mongoose.model('User', userSchema);

export default User;
