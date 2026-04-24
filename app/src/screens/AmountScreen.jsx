import { useState } from 'react';
import { ArrowLeft, Delete, Send } from 'lucide-react';
import Btn from '../components/Btn';
import { C, T } from '../tokens';

const KEYS = ['1','2','3','4','5','6','7','8','9','.','0','back'];

export default function AmountScreen({ contact, onBack, onTransfer }) {
  const [digits,  setDigits]  = useState('0');
  const [decimal, setDecimal] = useState(false);
  const [cents,   setCents]   = useState('');

  const display = decimal
    ? `${Number(digits).toLocaleString('en-US')}.${cents}`
    : Number(digits).toLocaleString('en-US');

  const tap = k => {
    if (k === 'back') {
      if (decimal) {
        if (cents.length > 0) setCents(c => c.slice(0, -1));
        else setDecimal(false);
      } else {
        setDigits(d => d.length > 1 ? d.slice(0, -1) : '0');
      }
      return;
    }
    if (k === '.') { if (!decimal) { setDecimal(true); setCents(''); } return; }
    if (decimal)   { if (cents.length < 2) setCents(c => c + k); return; }
    setDigits(d => d === '0' ? k : d.length < 7 ? d + k : d);
  };

  const numericValue = parseFloat(`${digits}.${cents || '00'}`);
  const valid = numericValue > 0;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.white }}>
      {/* Header */}
      <div style={{ padding: '52px 24px 20px', flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: C.sec, marginBottom: '20px', padding: 0, fontFamily: T.body, fontSize: '14px' }}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Contact pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: C.surface, borderRadius: '9999px', padding: '8px 16px 8px 8px', marginBottom: '28px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '9999px', background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.display, fontSize: '13px', fontWeight: '600', color: C.white, flexShrink: 0 }}>
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{ fontFamily: T.body, fontSize: '13px', fontWeight: '500', color: C.dark }}>
              {contact.name}
            </p>
            <p style={{ fontFamily: T.body, fontSize: '11px', color: C.muted }}>
              {contact.bank}
            </p>
          </div>
        </div>

        {/* Amount display */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: T.body, fontSize: '13px', color: C.muted, marginBottom: '8px' }}>
            How much would you like to send?
          </p>
          <div style={{ fontFamily: T.display, fontSize: display.length > 8 ? '40px' : '54px', fontWeight: '600', color: C.dark, lineHeight: 1, letterSpacing: '-1px', transition: 'font-size 0.1s' }}>
            ${display}{decimal && cents.length === 0 ? '.' : ''}
          </div>
          {valid && (
            <p style={{ fontFamily: T.body, fontSize: '12px', color: C.muted, marginTop: '6px' }}>
              ≈ {numericValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD
            </p>
          )}
        </div>
      </div>

      {/* Keypad */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '0 12px', alignContent: 'start' }}>
        {KEYS.map(k => (
          <button
            key={k}
            onClick={() => tap(k)}
            style={{ background: 'none', border: 'none', padding: '16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', fontFamily: T.display, fontSize: '26px', fontWeight: '500', color: C.dark }}
          >
            {k === 'back' ? <Delete size={24} color={C.dark} /> : k}
          </button>
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: '12px 24px 32px', flexShrink: 0 }}>
        <Btn label="Transfer" icon={Send} onClick={() => onTransfer(numericValue)} variant="dark" disabled={!valid} />
      </div>
    </div>
  );
}
