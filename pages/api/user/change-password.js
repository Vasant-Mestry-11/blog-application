// route:  /api/user/change-password
import authOptions from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth";

async function handler(req, res) {

  if (req.method !== 'PATHC') {
    return;
  }

  const session = await getServerSession(req, res, authOptions)

  console.log("===============", session);


  if (!session) {
    res.status(401).json({
      message: 'Not authenticated!'
    })
    return;
  }

}


export default handler