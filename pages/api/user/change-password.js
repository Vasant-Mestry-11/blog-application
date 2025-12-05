// route:  /api/user/change-password
import { hashPassword, verifyPassword } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
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
    res.status(403).json({
      message: 'Invalid Password.'
    })
    client.close()
    return
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
  res.status(200).json({
    message: "Password updated!"
  })

}


export default handler