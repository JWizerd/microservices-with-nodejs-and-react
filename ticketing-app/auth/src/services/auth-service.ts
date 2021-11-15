import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scrpytAsync = promisify(scrypt);

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
}