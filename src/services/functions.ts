import bcryptjs  from 'bcryptjs';
import prisma from '@/libs/prisma';
import generateUniqueId from "generate-unique-id";


export const hashPassword = async (password: string) => {
    return await bcryptjs.hash(password, 12)
}

export const comparePassword = async (password: string, passwordHash: string) => {
    return await bcryptjs.compare(password, passwordHash);
}


export const generateTransactionID = async (): Promise<string> => {
    const id = generateUniqueId({
        length: 16,
        useLetters: true
    });

    const transaction = await prisma.transaction.findFirst({
        where: {
            tx_ref: id
        },
        select: {
            tx_ref: true
        }
    })

    if (transaction) return await generateTransactionID()

    return id
}
