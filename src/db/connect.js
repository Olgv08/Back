//src/db/connect.js
import mongoose from 'mongoose';

let cached = global.mongooseConn;
if (!cached) chached = global.mongooseConn = { conn: null, promise: null };

export async function connectToDB() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        const { MONGODB_URI } = process.env;
        if (!MONGODB_URI) throw new Error('Por favor, define la variable de entorno MONGODB_URI');
        cached.promise = mongoose.connect(MONGODB_URI, {dbName: "BackPWA"}).then((m) => m.connection);
    }
    cached.conn = await cached.promise;
    return cached.conn; 
}