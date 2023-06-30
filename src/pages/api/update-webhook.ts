import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionCookie, validateUserApi } from '@/services/session';
import prisma from '@/libs/prisma';
import { ApiResponse } from '@/libs/types';
import ServerError from '@/services/errors/serverError';


export default withIronSessionApiRoute(
    async function updateWebhook(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {

        try {

            const  { user }  = await validateUserApi(req)

            if (!user) return new ServerError(res, 401, "Unauthorized")

            const { webhook_url } = req.body

            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    webhookUrl: webhook_url
                }
            })

            return res.send({ 
                status: 'success', 
                statusCode: 200,
                message: "Updated successfully",
                data: webhook_url
            });
            
        } catch (e) {
            console.log(e)
            return new ServerError(res,  400, "Bad Request")
        }

    },
    sessionCookie(),
);

