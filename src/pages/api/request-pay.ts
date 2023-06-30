import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionCookie, validateUserApi } from '@/services/session';
import prisma from '@/libs/prisma';
import { ApiResponse } from '@/libs/types';
import ServerError from '@/services/errors/serverError';
import { generateTransactionID } from '@/services/functions';


export default withIronSessionApiRoute(
    async function requestPay(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {

        try {

            const  { user }  = await validateUserApi(req)

            if (!user) return new ServerError(res, 401, "Unauthorized")

            const { token, amount, narration } = req.body

            const tx_ref = await generateTransactionID()

            const transaction = await prisma.transaction.create({
                data: {
                    tx_ref:  tx_ref,
                    address: user.address,
                    amount: Number(amount),
                    narration,
                    source: "app",
                    requestedToken: Number(token)
                }
            })

            return res.send({ 
                status: 'success', 
                statusCode: 200,
                message: "Payment link created successfully",
                data: transaction
            });
            
        } catch (e) {
            console.log(e)
            return new ServerError(res,  400, "Bad Request")
        }

    },
    sessionCookie(),
);

