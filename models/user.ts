import { IUser } from '@/interface/user_interface';
import mongoose, { Model, Schema } from 'mongoose';
import { string } from 'zod';

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        role: { type: String, enum: ['admin', 'user'], default: 'user' },
        provider: { type: String }, // To store the authentication provider (e.g., 'credentials', 'github', 'google')
        providerId: { type: String }, // To store the user's ID from the authentication provider
    },
    {
        timestamps: true,
    }
);

const User =
    mongoose.models?.User || mongoose.model('User', userSchema);

export default User;
