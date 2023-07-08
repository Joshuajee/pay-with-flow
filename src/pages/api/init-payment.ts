import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionCookie, validateUserApi } from '@/services/session';
import prisma from '@/libs/prisma';
import { ApiResponse } from '@/libs/types';
import ServerError from '@/services/errors/serverError';
import { generateTransactionID } from '@/services/functions';


export default withIronSessionApiRoute(
    async function initPay(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {

        try {

            const { requestedToken, amount, narration, metadata, redirectUrl } = req.body

            console.log({ requestedToken, amount, narration, metadata, redirectUrl })

            const secretKey = req.headers["secret-key"]

            if (!secretKey) return new ServerError(res, 401, "Secret Key is Missing")

            const user = await prisma.user.findUnique({
                where: {
                    secretKey: secretKey as string
                }
            })

            if (!user) return new ServerError(res, 401, "Invalid secret key")

            const tx_ref = await generateTransactionID()

            const transaction = await prisma.transaction.create({
                data: {
                    tx_ref:  tx_ref,
                    address: user.address,
                    amount: Number(amount),
                    narration,
                    source: "api",
                    requestedToken: Number(requestedToken),
                    metadata: metadata,
                    redirectUrl
                }
            })

            const link = `${process.env.NEXT_PUBLIC_HOST}/pay/${transaction.address}/${transaction.tx_ref}`

            return res.send({ 
                status: 'success', 
                statusCode: 200,
                message: "Payment link created successfully",
                data: { link, transaction }
            });
            
        } catch (e) {
            console.log(e)
            return new ServerError(res,  400, "Bad Request")
        }

    },
    sessionCookie(),
);

