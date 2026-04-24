import { useState } from 'react';
import { Eye, EyeOff, Shield, User } from 'lucide-react';
import Logo from '../components/Logo';
import Btn from '../components/Btn';
import Field from '../components/Field';
import { C, T } from '../tokens';

export default function LoginScreen({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 28px', background: C.white }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
        <Logo />
      </div>

      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: T.display, fontSize: '26px', fontWeight: '500', color: C.dark, marginBottom: '6px', lineHeight: 1.2 }}>
          Welcome back
        </h1>
        <p style={{ fontFamily: T.body, fontSize: '15px', color: C.sec, lineHeight: 1.5, letterSpacing: '0.16px' }}>
          Sign in to your bank account
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '12px' }}>
        <Field
          label="Username"
          value={user}
          onChange={e => setUser(e.target.value)}
          placeholder="you@email.com"
          icon={User}
        />
        <Field
          label="Password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          placeholder="••••••••"
          type={show ? 'text' : 'password'}
          icon={Shield}
          rightSlot={
            <button
              onClick={() => setShow(s => !s)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, display: 'flex', padding: 0 }}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />
      </div>

      <div style={{ textAlign: 'right', marginBottom: '28px' }}>
        <span style={{ fontFamily: T.body, fontSize: '13px', color: C.blue, cursor: 'pointer', letterSpacing: '0.16px' }}>
          Forgot your password?
        </span>
      </div>

      <Btn label="Sign In" onClick={onLogin} variant="dark" />

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <span style={{ fontFamily: T.body, fontSize: '13px', color: C.sec }}>
          Don't have an account?{' '}
          <span style={{ color: C.blue, fontWeight: '500', cursor: 'pointer' }}>Sign up</span>
        </span>
      </div>
    </div>
  );
}
