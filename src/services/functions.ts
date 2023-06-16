import bcryptjs  from 'bcryptjs';


export const hashPassword = async (password: string) => {
    return await bcryptjs.hash(password, 12)
}

export const comparePassword = async (password: string, passwordHash: string) => {
    return await bcryptjs.compare(password, passwordHash);
}

