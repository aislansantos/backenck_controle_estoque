import * as bcrypt from "bcrypt";

// Criptografa o password
export const cryptPassword = async (password: string) => {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
};
