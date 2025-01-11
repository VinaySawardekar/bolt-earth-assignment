import mongoose = require("mongoose");
const Schema = mongoose.Schema;
import bcrypt = require("bcryptjs");

// Define userSchema
const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, unique: false, required: false },
    email: { type: String, unique: true, required: true },
    role: {
      type: String,
      unique: false,
      default: "User",
      enum: ["User", "Admin"],
    },
    status: {
      type: String,
      unique: false,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
  },
  { timestamps: true }
);

function hashPassword(plainTextPassword: string): string | null | undefined {
  return bcrypt.hashSync(plainTextPassword, 10);
}

// Define hooks for pre-saving
userSchema.pre("save", function (next) {
  if (this.password) {
    this.password = hashPassword(this.password);
    next();
  }
});

const User = mongoose.model("User", userSchema);
export default User;
