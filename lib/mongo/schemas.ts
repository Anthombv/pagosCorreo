import mongoose from "mongoose";
import {
  User,
  UserDeparment,
  Auditory
} from "../types";

const DeparmentSchema = new mongoose.Schema<UserDeparment>(
  {
    name: { type: String },
  },
  { timestamps: true }
);

// Duplicate the ID field.
DeparmentSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
DeparmentSchema.set("toJSON", {
  virtuals: true,
});

export const DeparmentModel =
  mongoose.models.Deparments || mongoose.model("Deparments", DeparmentSchema);

const UserSchema = new mongoose.Schema<User>(
  {
    userName: { type: String },
    password: { type: String },
    email: { type: String },
    department: { type: DeparmentSchema },
    name: { type: String },
    role: { type: Number },
    identificationCard: { type: String },
    dateBirth: { type: String },
    age: { type: Number },
    dateAdmission: { type: String },
    position: { type: String },
    cellphone: { type: String },
  },
  { timestamps: true }
);

// Duplicate the ID field.
UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set("toJSON", {
  virtuals: true,
});

export const UserModel =
  mongoose.models.Users || mongoose.model("Users", UserSchema);

const AuditorySchema = new mongoose.Schema<Auditory>(
  {
    date: { type: String },
    user: { type: String },
    action: { type: String },
  },
  { timestamps: true }
);

// Duplicate the ID field.
AuditorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
AuditorySchema.set("toJSON", {
  virtuals: true,
});

export const AuditoryModel =
  mongoose.models.Auditory || mongoose.model("Auditory", AuditorySchema);
