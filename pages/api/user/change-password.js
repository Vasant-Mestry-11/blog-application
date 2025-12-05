// route:  /api/user/change-password
import { hashPassword, verifyPassword } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import authOptions from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth";

async function handler(req, res) {

  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({
      message: 'Not authenticated!'
    })
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();

  const userCollection = client.db().collection('users');

  const user = await userCollection.findOne({
    email: userEmail
  });

  if (!user) {
    res.status(404).json({
      message: "User not found."
    })
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
  if (!passwordsAreEqual) {
    client.close()
    return res.status(403).json({
      message: 'Invalid Password.'
    })
  }

  const hashedPassword = await hashPassword(newPassword)

  const result = await userCollection.updateOne({
    email: userEmail
  }, {
    $set: {
      password: hashedPassword
    }
  })


  client.close();
  return res.status(200).json({
    message: "Password updated!"
  })

}


export default handler