"use strict";
// const express = require("express");
// const app = express();
// const morgan = require("morgan");
// require("dotenv").config();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = require("dotenv");
const index_1 = require("./db/index");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.post("/auth/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_type, user_language, subject_expertise, grade, password, username, email, } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const result = yield (0, index_1.query)(`insert into users (user_type,user_language,subject_expertise,grade,username,password_hash,email) values ($1,$2,$3,$4,$5,$6,$7)`, [
        user_type,
        user_language,
        subject_expertise,
        grade,
        username,
        hashedPassword,
        email,
    ]);
    console.log(result);
    const jwtToken = jsonwebtoken_1.default.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
    res.status(201).json({
        result,
        token: jwtToken,
    });
}));
app.post("/auth/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { rows } = yield (0, index_1.query)(`select * from users where email=$1`, [email]);
    const user = rows[0];
    const realPassword = yield bcryptjs_1.default.compare(password, user.password_hash);
    if (realPassword) {
        res.status(200).json({
            rows,
            realPassword,
        });
    }
    else {
        res.status(401).json({ msg: "Username or password incorrect" });
    }
}));
app.get("/tutor/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currTime = Date.now();
    (0, index_1.query)(`insert into tutoravailability (tutor_id,last_ping_time) values ($1,to_timestamp($2/1000.0))`, [2, currTime]);
}));
app.put("/tutor/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currTime = Date.now();
    const result = yield (0, index_1.query)(`update tutoravailability set last_ping_time=(to_timestamp($1/1000.0))`, [currTime]);
    res.status(200).json({ result });
}));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log("GET request recieved");
    const { rows } = yield (0, index_1.query)("select * from users", []);
    console.log(rows);
    res.send("hello");
}));
app.listen(process.env.PORT || 3001, () => {
    console.log(`server started at port ${process.env.PORT}`);
});
