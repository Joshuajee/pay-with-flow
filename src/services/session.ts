import prisma from "@/libs/prisma"

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


export const createSession = async (user: any, req: any) => {
  await req.session.destroy();
  user.password === undefined
  user.email_otp === undefined
  req.session.user = user
  await req.session.save();
}

export const getUserFromSession = (req: any) =>  {
  return req.session.user 
}


export const validateUser = async (req: any) => {

  const session = req.session.user 

  if (!session) return ({redirect: '/auth/login'})

  try {

    const user = await prisma.user.findUnique({
      where: {
        email: session.email
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        workspaces: true,
      }, 
    })

    if (user) return user

    const member = await prisma.member.findFirst({
      where: {
        email: session.email,
        workspaceId: session.workspaceId 
      }
    })

    const workspaces = await prisma.workspace.findFirst({
      where: {
        id: session.workspaceId 
      }
    })

    return { ...member, firstName: member?.name, workspaces:[workspaces]}

  } catch (e) {
    console.error(e)  
  }

  return ({redirect: '/auth/login'})

}


export const validateUserApi = async (req: any, workspaceId: number) => {

  const session = req.session.user 

  if (!session) return false

  try {

    const user = await prisma.user.findUnique(
      {
        where: {
          email: session.email
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          workspaces: {
            where: {
              id: workspaceId
            }
          },
        }, 
      }
    )

    if (user) return user

    const member = await prisma.member.findFirst({
      where: {
        email: session.email,
        workspaceId: session.workspaceId 
      }
    })

    const workspaces = await prisma.workspace.findFirst({
      where: {
        id: session.workspaceId 
      }
    })

    return { ...member, firstName: member?.name, workspaces:[workspaces]}

  } catch (e) {
  
  }

  return false

}




export const sessionRedirects = (destination: string) => { 
  
  return (
    {
      redirect: {
        permanent: false,
        destination,
      }
    }
  )

}