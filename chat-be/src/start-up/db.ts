import * as mongoose from 'mongoose';

export = () => {
    mongoose.connect(process.env.MONGO_URL as any, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("DB Connection established successfully.");
    }, err => {
        console.log("DB Connection to established failed.");
    });
}
