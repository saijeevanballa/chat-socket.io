import * as bcrypt from 'bcryptjs';

const SALTROUNDS = 10;

//  Hash password
export function hashPassword(password: string): Promise<string> {
    try {
        return bcrypt.hashSync(password, SALTROUNDS);
    } catch (err) {
        console.error(err);
        throw err;
    };
};

//  Compare Password
export function comparePassword(password: string, hash_password: string): Promise<boolean> {
    try {
        return bcrypt.compareSync(password, hash_password)
    } catch (err) {
        console.error(err);
        throw err;
    };
};
