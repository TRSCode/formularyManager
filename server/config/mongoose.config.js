// const mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/formularyManager", { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("Established a connection to the database"))
//     .catch(err => console.log("Something went wrong when connecting to the database", err));


const mongoose = require('mongoose');
const connection = process.env.connection;
mongoose.set("strictQuery", false);

const connectToMonoDB = async () => {
    try {
        await mongoose.connect(connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Established a connection to the database");
    } catch (error) {
        console.log("Something went wrong when connecting to the database", error);
    }
};

connectToMonoDB();

module.exports = mongoose;