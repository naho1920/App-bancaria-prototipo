import { useState } from 'react';
import { Check, Share2, RefreshCw, Home } from 'lucide-react';
import { C, T } from '../tokens';

export default function ReceiptScreen({ contact, amount, onHome, onNewTransfer }) {
  const [shared, setShared] = useState(false);

  const now    = new Date();
  const date   = now.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
  const time   = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const ref    = useState(() => `JPM-${Math.floor(Math.random() * 9e6 + 1e6)}`)[0];
  const fmtAmt = amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const rows = [
    ['Destinatario', contact.name],
    ['Banco destino', contact.bank],
    ['Cuenta / CBU',  contact.account],
    ...(contact.reference ? [['Ref. destinatario', contact.reference]] : []),
    ['Fecha y hora',  `${date}, ${time}`],
    ['N.º operación', ref],
    ['Estado',        '✓ Completada'],
  ];

  const dashedBorder = `repeating-linear-gradient(90deg, ${C.border} 0, ${C.border} 8px, transparent 8px, transparent 16px)`;

  const handleShare = async () => {
    const text = `Comprobante de transferencia\n\nMonto: $${fmtAmt}\nDestinatario: ${contact.name}\nBanco: ${contact.bank}\nCuenta: ${contact.account}${contact.reference ? `\nRef. destinatario: ${contact.reference}` : ''}\nFecha: ${date}, ${time}\nN.º operación: ${ref}\nEstado: Completada`;
    if (navigator.share) {
      await navigator.share({ title: 'Comprobante JP Morgan', text });
    } else {
      await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  return (
    <div className="screen-scroll" style={{ background: C.surface }}>
      <div style={{ padding: '52px 24px 40px' }}>

        {/* Success badge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '9999px', background: C.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
            <Check size={36} color={C.white} strokeWidth={2.5} />
          </div>
          <h1 style={{ fontFamily: T.display, fontSize: '22px', fontWeight: '600', color: C.dark, textAlign: 'center', marginBottom: '4px' }}>
            ¡Transferencia Exitosa!
          </h1>
          <p style={{ fontFamily: T.body, fontSize: '14px', color: C.sec, letterSpacing: '0.16px' }}>
            El dinero está en camino
          </p>
        </div>

        {/* Amount hero */}
        <div style={{ background: C.dark, borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '14px' }}>
          <p style={{ fontFamily: T.body, fontSize: '13px', color: C.muted, marginBottom: '8px' }}>Monto transferido</p>
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
              <span style={{ fontFamily: T.body, fontSize: '13px', fontWeight: '500', color: lbl === 'Estado' ? C.teal : C.dark, textAlign: 'right', wordBreak: 'break-all' }}>
                {val}
              </span>
            </div>
          ))}
          <div style={{ height: '1px', background: dashedBorder }} />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Compartir — primary */}
          <button
            onClick={handleShare}
            style={{
              width: '100%',
              padding: '14px 32px',
              borderRadius: '9999px',
              background: shared ? C.teal : C.dark,
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
              transition: 'background 0.2s ease',
            }}
          >
            {shared ? <Check size={18} /> : <Share2 size={18} />}
            {shared ? '¡Copiado al portapapeles!' : 'Compartir comprobante'}
          </button>

          {/* Nueva transferencia — secondary */}
          <button
            onClick={onNewTransfer}
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
            Nueva transferencia
          </button>

          {/* Volver al inicio — ghost */}
          <button
            onClick={onHome}
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
            Volver al inicio
          </button>

        </div>
      </div>
    </div>
  );
}
