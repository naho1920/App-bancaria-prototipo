import { useState } from 'react';
import { Check, Share2, RefreshCw, Home } from 'lucide-react';
import { C, T } from '../tokens';

export default function ReceiptScreen({ contact, amount, onFinish }) {
  const now    = new Date();
  const date   = now.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
  const time   = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const [ref]  = useState(() => `PJM-${Math.floor(Math.random() * 9e6 + 1e6)}`);
  const fmtAmt = amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const rows = [
    ['Recipient',        contact.name],
    ['Destination bank', contact.bank],
    ['Account / CBU',    contact.account],
    ...(contact.reference ? [['Recipient ref.', contact.reference]] : []),
    ['Date & time',      `${date}, ${time}`],
    ['Operation no.',    ref],
    ['Status',           '✓ Completed'],
  ];

  const dashedBorder = `repeating-linear-gradient(90deg, ${C.border} 0, ${C.border} 8px, transparent 8px, transparent 16px)`;

  return (
    <div className="screen-scroll" style={{ background: C.surface }}>
      <div style={{ padding: '52px 24px 40px' }}>

        {/* Success badge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '9999px', background: C.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
            <Check size={36} color={C.white} strokeWidth={2.5} />
          </div>
          <h1 style={{ fontFamily: T.display, fontSize: '22px', fontWeight: '600', color: C.dark, textAlign: 'center', marginBottom: '4px' }}>
            Transfer Successful!
          </h1>
          <p style={{ fontFamily: T.body, fontSize: '14px', color: C.sec, letterSpacing: '0.16px' }}>
            Your money is on its way
          </p>
        </div>

        {/* Amount hero */}
        <div style={{ background: C.dark, borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '14px' }}>
          <p style={{ fontFamily: T.body, fontSize: '13px', color: C.muted, marginBottom: '8px' }}>Amount transferred</p>
          <p style={{ fontFamily: T.display, fontSize: '42px', fontWeight: '600', color: C.white, letterSpacing: '-0.5px', lineHeight: 1 }}>
            ${fmtAmt}
          </p>
        </div>

        {/* Ticket */}
        <div style={{ background: C.white, borderRadius: '20px', overflow: 'hidden', marginBottom: '24px' }}>
          <div style={{ height: '1px', background: dashedBorder }} />
          {rows.map(([lbl, val], i) => (
            <div
              key={lbl}
              style={{ padding: '13px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.surface}` : 'none' }}
            >
              <span style={{ fontFamily: T.body, fontSize: '13px', color: C.muted, flexShrink: 0 }}>{lbl}</span>
              <span style={{ fontFamily: T.body, fontSize: '13px', fontWeight: '500', color: lbl === 'Status' ? C.teal : C.dark, textAlign: 'right', wordBreak: 'break-all' }}>
                {val}
              </span>
            </div>
          ))}
          <div style={{ height: '1px', background: dashedBorder }} />
        </div>

        {/* Actions — all lead to the final screen */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          <button
            onClick={onFinish}
            style={{
              width: '100%',
              padding: '14px 32px',
              borderRadius: '9999px',
              background: C.dark,
              color: C.white,
              border: 'none',
              fontFamily: T.display,
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Share2 size={18} />
            Share receipt
          </button>

          <button
            onClick={onFinish}
            style={{
              width: '100%',
              padding: '14px 32px',
              borderRadius: '9999px',
              background: C.surface,
              color: C.dark,
              border: 'none',
              fontFamily: T.display,
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <RefreshCw size={18} />
            New transfer
          </button>

          <button
            onClick={onFinish}
            style={{
              width: '100%',
              padding: '14px 32px',
              borderRadius: '9999px',
              background: 'transparent',
              color: C.sec,
              border: 'none',
              fontFamily: T.display,
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Home size={18} />
            Back to home
          </button>

        </div>
      </div>
    </div>
  );
}
