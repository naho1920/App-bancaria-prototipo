import { useState } from 'react';
import { Send, Download, Clock, CreditCard, Plus, Eye, EyeOff, Bell, ShoppingBag, ArrowDownLeft, Repeat } from 'lucide-react';
import Btn from '../components/Btn';
import { C, T } from '../tokens';

const quickActions = [
  { Icon: Send,       label: 'Enviar' },
  { Icon: Download,   label: 'Recibir' },
  { Icon: CreditCard, label: 'Pagar' },
  { Icon: Clock,      label: 'Historial' },
];

const txs = [
  { Icon: ShoppingBag,   label: 'Amazon Prime',           sub: 'Hoy, 10:24',  amount: '-$14.99',  pos: false },
  { Icon: ArrowDownLeft, label: 'Transferencia recibida',  sub: 'Ayer, 18:05', amount: '+$500.00', pos: true  },
  { Icon: Repeat,        label: 'Netflix',                 sub: '18 abr',      amount: '-$15.99',  pos: false },
  { Icon: ShoppingBag,   label: 'Starbucks',               sub: '17 abr',      amount: '-$6.80',   pos: false },
];

export default function DashboardScreen({ onNewTransfer }) {
  const [balanceVisible, setBalanceVisible] = useState(true);

  return (
    <div className="screen-scroll" style={{ background: C.surface }}>
      {/* Header */}
      <div style={{ background: C.white, padding: '52px 24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <p style={{ fontFamily: T.body, fontSize: '13px', color: C.muted, marginBottom: '3px', letterSpacing: '0.24px' }}>
              Buenos días ☀️
            </p>
            <h2 style={{ fontFamily: T.display, fontSize: '20px', fontWeight: '500', color: C.dark }}>
              Carlos Rodríguez
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '9999px', background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.sec }}>
              <Bell size={18} />
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '9999px', background: C.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.display, fontSize: '14px', fontWeight: '600', color: C.white }}>
              CR
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div style={{ background: C.dark, borderRadius: '20px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <p style={{ fontFamily: T.body, fontSize: '13px', color: C.muted, letterSpacing: '0.24px' }}>
              Saldo disponible
            </p>
            <button
              onClick={() => setBalanceVisible(v => !v)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, display: 'flex', padding: 0 }}
            >
              {balanceVisible ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          <p style={{ fontFamily: T.display, fontSize: '38px', fontWeight: '600', color: C.white, letterSpacing: '-0.5px', marginBottom: '20px', lineHeight: 1 }}>
            {balanceVisible ? '$24,850.00' : '••••••'}
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[['Cuenta', '•••• 4821'], ['Tipo', 'Checking']].map(([lbl, val]) => (
              <div key={lbl} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 14px' }}>
                <p style={{ fontFamily: T.body, fontSize: '11px', color: C.muted, marginBottom: '2px' }}>{lbl}</p>
                <p style={{ fontFamily: T.body, fontSize: '13px', fontWeight: '500', color: C.white }}>{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
          {quickActions.map(({ Icon, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={21} color={C.dark} />
              </div>
              <span style={{ fontFamily: T.body, fontSize: '12px', color: C.sec }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 24px 0' }}>
        <Btn label="Nueva Transferencia" icon={Plus} onClick={onNewTransfer} variant="dark" />
      </div>

      {/* Transactions */}
      <div style={{ padding: '20px 24px 40px' }}>
        <p style={{ fontFamily: T.display, fontSize: '16px', fontWeight: '500', color: C.dark, marginBottom: '12px' }}>
          Movimientos recientes
        </p>
        <div style={{ background: C.white, borderRadius: '20px', overflow: 'hidden' }}>
          {txs.map(({ Icon, label, sub, amount, pos }, i) => (
            <div key={i} style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: i < txs.length - 1 ? `1px solid ${C.surface}` : 'none' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={17} color={C.sec} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: T.body, fontSize: '14px', fontWeight: '500', color: C.dark, marginBottom: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</p>
                <p style={{ fontFamily: T.body, fontSize: '12px', color: C.muted }}>{sub}</p>
              </div>
              <span style={{ fontFamily: T.display, fontSize: '14px', fontWeight: '600', color: pos ? C.teal : C.danger, flexShrink: 0 }}>
                {amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
