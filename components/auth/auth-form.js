import { useState } from 'react';
import classes from './auth-form.module.css';
import { createUser } from '@/service/authentication';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (e) => {

    e.preventDefault();

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      })

      if (!result.error) {
        router.replace("/profile")
      }

    } else {
      try {
        const res = await createUser(
          email, password
        );
        console.log(res)

      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
