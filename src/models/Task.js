import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true, default: "" },
        status: { type: String, enum: ['Pendiente', 'En Progreso', 'Completada'], default: 'Pendiente' },
        clienteId: { type: String },
        deleted: { type: Boolean, default: false },
        style: {
            fontFamily: { type: String, default: "Inter, system-ui, sans-serif" },
            color: { type: String, default: "#0f172a" },
            fontSize: { type: String, enum: ["sm", "md", "lg"], default: "md" },
            bold: { type: Boolean, default: false },
            italic: { type: Boolean, default: false },
            underline: { type: Boolean, default: false },
            bgColor: { type: String, default: "" },
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Task", taskSchema);