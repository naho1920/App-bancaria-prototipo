import { C, T } from '../tokens';

const variants = {
  dark:     { background: C.dark,    color: C.white, border: 'none' },
  blue:     { background: C.blue,    color: C.white, border: 'none' },
  teal:     { background: C.teal,    color: C.white, border: 'none' },
  outlined: { background: 'transparent', color: C.dark, border: `2px solid ${C.dark}` },
  disabled: { background: C.border,  color: C.white, border: 'none' },
};

export default function Btn({ label, icon: Icon, onClick, variant = 'dark', disabled = false, style: extra = {} }) {
  const v = disabled ? variants.disabled : variants[variant];
  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{
        width: '100%',
        padding: '14px 32px',
        borderRadius: '9999px',
        fontFamily: T.display,
        fontSize: '16px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        letterSpacing: '0.16px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...v,
        ...extra,
      }}
    >
      {Icon && <Icon size={18} />}
      {label}
    </button>
  );
}
