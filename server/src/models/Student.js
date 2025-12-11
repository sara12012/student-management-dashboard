import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      }
    },
    course: { type: String, default: "", trim: true },
    admission_year: { type: Number },
    created_at: { type: Date, default: Date.now }
  },
  { versionKey: false }
);
export default mongoose.model("Student", studentSchema);
