import * as JWT from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;

export const jwt = {
    generate(value: object) {
        return JWT.sign(value, SECRET, { expiresIn: '1h' });
    },
    
    decode(token: string) {
        return JWT.verify(token, SECRET);
    }
}