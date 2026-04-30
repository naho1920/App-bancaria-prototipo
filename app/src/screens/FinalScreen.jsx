import Logo from '../components/Logo';
import { C, T } from '../tokens';

export default function FinalScreen() {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: C.white,
      padding: '40px 32px',
      textAlign: 'center',
    }}>
      <Logo />

      <p style={{
        fontFamily: T.display,
        fontSize: '22px',
        fontWeight: '600',
        color: C.dark,
        lineHeight: 1.4,
        marginTop: '48px',
      }}>
        Transfer complete!
      </p>
      <p style={{
        fontFamily: T.body,
        fontSize: '16px',
        color: C.sec,
        lineHeight: 1.6,
        marginTop: '12px',
      }}>
        Now, please return to WhatsApp to finish the process.
      </p>
    </div>
  );
}
