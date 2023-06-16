
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from 'next';
import { createSession, sessionCookie } from '@/services/session';
import { comparePassword } from "@/services/functions";
import prisma from '@/libs/prisma';
import { ApiResponse } from '@/libs/types';
import ServerError from '@/services/errors/serverError';


  
export default withIronSessionApiRoute(
  async function loginRoute(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {

    try {

        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase(),
            },
        })

        if (!user) throw new Error()

        if(await comparePassword(password, user.password)) {

            user.password = ""

            await createSession(user, req)
    
            return res.send({ status: 'success', statusCode: 200, message: 'Authentication successful redirecting...', data: user });
    
        };
        
        return new ServerError(res, 400, "Email or Password is incorrect")

    } catch (e) {
        return new ServerError(res, 400, "Email or Password is incorrect")
    }


  },
  sessionCookie(),
);

