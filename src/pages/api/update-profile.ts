import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from "iron-session/next";
import { createUserSession, sessionCookie, validateUserApi } from '@/services/session';
import prisma from '@/libs/prisma';
import { ApiResponse } from '@/libs/types';
import ServerError from '@/services/errors/serverError';
import { generateKey } from "@/services/functions";



export default withIronSessionApiRoute(
    async function updateProfile(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {

        const { email } = req.body

        try {

            const  { user }  = await validateUserApi(req)

            if (!user) return new ServerError(res, 401, "Unauthorized")


            await prisma.user.update({
                where: {
                    address: user.address
                },
                data: {
                    email
                }
            })
    
            return res.send({ 
                status: 'success', 
                statusCode: 200,
                message: "Updated successfully",
                data: null
            });
            
        } catch (e) {
            console.log(e)
            return new ServerError(res,  400, "Bad Request")
        }

    },
    sessionCookie(),
);

