
import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from "iron-session/next";
import generateUniqueId from "generate-unique-id";
import { createSession, sessionCookie } from '@/services/session';
import { hashPassword } from "@/services/functions";
import prisma from '@/libs/prisma';
import { ApiResponse } from '@/libs/types';
import ServerError from '@/services/errors/serverError';

const DAY = 24 * 3600

const id = generateUniqueId({
    length: 32,
    useLetters: false
});


export default withIronSessionApiRoute(
  async function createRoute(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {

    try {

        const { email, password, firstName, lastName } = req.body

        const hash = await hashPassword(password)

        const token = await hashPassword(email + id)

    
        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hash,
                firstName,
                lastName,
                emailToken: token,
                resetToken: token,
                tokenExpireAt: new Date(Number(Date.now()) + DAY)
            },
        })

        await createSession(user, req)

        return res.send({ 
            status: 'success', 
            statusCode: 201,
            message: "Account Created Successfully",
            data: user, 
        });
        
    } catch (e) {
        return new ServerError(res,  400, "Email already exists please login")
    }

  },
  sessionCookie(),
);

