import { C, T } from '../tokens';

export default function Field({ label, value, onChange, placeholder, type = 'text', icon: Icon, rightSlot }) {
  return (
    <div>
      {label && (
        <label style={{ display: 'block', fontFamily: T.body, fontSize: '13px', fontWeight: '500', color: C.dark, marginBottom: '8px', letterSpacing: '0.16px' }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {Icon && (
          <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: C.muted, display: 'flex', pointerEvents: 'none' }}>
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: `14px ${rightSlot ? '48px' : '16px'} 14px ${Icon ? '44px' : '16px'}`,
            background: C.surface,
            border: 'none',
            borderRadius: '12px',
            fontFamily: T.body,
            fontSize: '15px',
            color: C.dark,
            letterSpacing: '0.16px',
          }}
        />
        {rightSlot && (
          <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
            {rightSlot}
          </div>
        )}
      </div>
    </div>
  );
}
