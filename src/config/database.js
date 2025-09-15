const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://ns_db_user:Ut4I56r7VKosbIuW@namastedev.3uoytah.mongodb.net/devTinder");
}

module.exports = {
    connectDB
}
