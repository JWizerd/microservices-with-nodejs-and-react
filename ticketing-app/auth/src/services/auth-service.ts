import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { sign, verify } from 'jsonwebtoken';

const scrpytAsync = promisify(scrypt);
const signAsync = promisify(sign);
const verifyAsync = promisify(verify);

export class AuthService {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buffer = await scrpytAsync(password, salt, 64) as Buffer;
    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compareHashes(password: string, storedPassword: string) {
    const [hash, salt] = storedPassword.split(".");
    const buffer = await scrpytAsync(password, salt, 64) as Buffer;
    return buffer.toString('hex') === hash;
  }

  static async sign(payload: any) {
    const token = await signAsync(
      JSON.stringify(payload),
      process.env.JWT_SECRET as string,
    );

    return token;
  }

  static async verify(jwt: string) {
    return new Promise((resolve, reject) => {
      try {
        const valid = verify(jwt, process.env.JWT_SECRET as string);
        resolve(valid);
      } catch (error) {
        reject(error)
      }
    });
  }
}