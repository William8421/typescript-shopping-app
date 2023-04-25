"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnect_1 = require("./helper/dbConnect");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const testRouter_1 = __importDefault(require("./routes/testRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const shoppingItemsRouter_1 = __importDefault(require("./routes/shoppingItemsRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.json('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
(0, dbConnect_1.connectDB)();
mongoose_1.default.connection.on('open', () => {
    console.log('connected to DB');
});
mongoose_1.default.connection.on('error', (error) => {
    console.log('connection to DB has failed', error.message);
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/test', testRouter_1.default);
app.use('/user', userRouter_1.default);
app.use('/items', shoppingItemsRouter_1.default);
