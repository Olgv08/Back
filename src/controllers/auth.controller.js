import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: "Por favor, complete todos los campos" });

        const exists = await User.findOne({ email });
        if (exists) return res.status(409).json({ message: "El correo electrónico ya está en uso" });

        const hash = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hash });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'changeme', { expiresIn: "7d" });

        res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (e) {
        res.status(500).json({ message: "Error al registrar el usuario" });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Correo electrónico o contraseña incorrectos" });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(404).json({ message: "Correo electrónico o contraseña incorrectos" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'changeme', { expiresIn: "7d" });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });

    } catch (e) {
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
}

export async function profile(req, res) {
    const user = await User.findById(req.userId).select('_id name email');
    res.json({ user });
}

export async function changePassword(req, res) {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword)
            return res.status(400).json({ message: "Faltan campos requeridos" });
        if (newPassword.length < 6)
            return res.status(400).json({ message: "La nueva contraseña debe tener al menos 6 caracteres" });

        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        const ok = await bcrypt.compare(currentPassword, user.password);
        if (!ok) return res.status(401).json({ message: "La contraseña actual es incorrecta" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Contraseña actualizada correctamente" });
    } catch (e) {
        res.status(500).json({ message: "Error al cambiar la contraseña" });
    }
}