import prisma from "@/libs/prisma"
import { User } from "@prisma/client";
import crypto from "crypto";

export const sessionCookie = (cookieName: string = "auth", age: number = 3600 * 24 * 7) => {

  const password : string = String(process.env.SESSION_PASSWORD)

  return ({
    cookieName,
    password,
    secure: true,// should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      maxAge: age
    },
  })
}


export const createUserSession = async (user: User, req: any) => {
  await req.session.destroy();
  req.session.user = user
  await req.session.save();
}

export const createNonceSession = async (req: any) => {
  await req.session.destroy();
  const nonce = crypto.randomBytes(32).toString('hex');
  req.session.nonce = nonce
  await req.session.save();
}

export const getUserFromSession = (req: any) =>  {
  return req.session.user 
}


export const validateUser = async (req: any) : Promise<{user: User | null, nonce: string | null }> => {

  const userSession = req.session.user || null
  let nonce = req.session.nonce || null

  if (!nonce && !userSession) {
    await createNonceSession(req)
    nonce = req.session.nonce
  }

  if (!userSession) return { user: null, nonce }

  try {

    const user = await prisma.user.findUnique({
      where: {
        address: userSession.address
      }
    })


    return { user, nonce }

  } catch (e) {
    console.error(e)  
  }

  return { user: null, nonce }

}


export const validateUserApi = async (req: any) : Promise<{user: User | null, nonce: string | null }>  => {

  const userSession = req.session.user || null
  const nonce = req.session.nonce || null


  try {

    const user = await prisma.user.findUnique(
      {
        where: {
          address: userSession.address
        }
      }
    )

    
    return { user, nonce }

  } catch (e) {
  
  }

  return { user: null, nonce }

}
