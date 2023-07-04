import * as fcl from "@onflow/fcl";
import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from "iron-session/next";
import { createUserSession, sessionCookie, validateUserApi } from '@/services/session';
import prisma from '@/libs/prisma';
import { ApiResponse } from '@/libs/types';
import ServerError from '@/services/errors/serverError';
import { PROJECT_NAME } from '@/libs/constants';
import { generateKey } from "@/services/functions";



export default withIronSessionApiRoute(
    async function verify(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {

        try {

            const data = JSON.parse(req.body.data)

            console.log(data)

            let user = await prisma.user.findUnique({
                where: {
                    address: data.address
                }
            })

            if (!user) {
                user = await prisma.user.create({
                    data: {
                        address: data.address,
                        secretKey: generateKey("secret"),
                        publicKey: generateKey("public")
                    }
                })
            }

            await createUserSession(user, req)
    
            return res.send({ 
                status: 'success', 
                statusCode: 200,
                message: "Verified successfully",
                data: null
            });
            
        } catch (e) {
            console.log(e)
            return new ServerError(res,  400, "Bad Request")
        }

    },
    sessionCookie(),
);

