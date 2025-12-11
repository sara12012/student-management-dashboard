import { Router } from "express";
import Student from "../models/Student.js";

const router = Router();

function parsePagination(query) {
  const page = Math.max(1, Number(query.page || 1));
  const limit = Math.max(1, Math.min(100, Number(query.limit || 10)));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

router.post("/", async (req, res) => {
  try {
    const { full_name, email, course, admission_year } = req.body;
    if (!full_name || !email) {
      return res.status(400).json({ error: "full_name and email are required" });
    }
    const payload = { full_name, email, course, admission_year };
    const student = await Student.create(payload);
    res.status(201).json(student);
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(400).json({ error: "Invalid data" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    const { page, limit, skip } = parsePagination(req.query);
    const filter = search
      ? {
          $or: [
            { full_name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
          ]
        }
      : {};
    const total = await Student.countDocuments(filter);
    const students = await Student.find(filter)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    res.json({ data: students, page, limit, total, pages: Math.ceil(total / limit) });
  } catch {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email, course, admission_year } = req.body;
    if (!full_name || !email) {
      return res.status(400).json({ error: "full_name and email are required" });
    }
    const updated = await Student.findByIdAndUpdate(
      id,
      { full_name, email, course, admission_year },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(updated);
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(400).json({ error: "Invalid data" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(204).send();
  } catch {
    res.status(400).json({ error: "Invalid id" });
  }
});

export default router;
