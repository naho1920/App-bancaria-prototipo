import { useState } from 'react';
import { ArrowLeft, User, Building2, Hash, Shield, BookMarked } from 'lucide-react';
import Btn from '../components/Btn';
import Field from '../components/Field';
import { C, T } from '../tokens';

export default function AddContactScreen({ onBack, onContinue }) {
  const [form, setForm] = useState({ name: '', bank: '', account: '', reference: '' });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const valid = form.name.trim() && form.bank.trim() && form.account.trim();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.white }}>
      {/* Header */}
      <div style={{ padding: '52px 24px 24px', flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: C.sec, marginBottom: '20px', padding: 0, fontFamily: T.body, fontSize: '14px' }}
        >
          <ArrowLeft size={20} />
          Contactos
        </button>
        <h1 style={{ fontFamily: T.display, fontSize: '26px', fontWeight: '500', color: C.dark, marginBottom: '6px' }}>
          Nuevo contacto
        </h1>
        <p style={{ fontFamily: T.body, fontSize: '14px', color: C.sec, letterSpacing: '0.16px' }}>
          Ingresa los datos del destinatario
        </p>
      </div>

      {/* Form */}
      <div style={{ flex: 1, padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '18px', overflowY: 'auto' }}>
        <Field
          label="Nombre del destinatario"
          value={form.name}
          onChange={set('name')}
          placeholder="Ej: María García"
          icon={User}
        />
        <Field
          label="Banco"
          value={form.bank}
          onChange={set('bank')}
          placeholder="Ej: Bank of America"
          icon={Building2}
        />
        <Field
          label="Número de cuenta / CBU"
          value={form.account}
          onChange={set('account')}
          placeholder="Ej: 0000 1234 5678 9012"
          icon={Hash}
        />
        <Field
          label="Número de referencia"
          value={form.reference}
          onChange={set('reference')}
          placeholder="Ej: REF-00123456 (opcional)"
          icon={BookMarked}
        />

        <div style={{ background: '#EEF0FF', borderRadius: '12px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <Shield size={16} color={C.blue} style={{ flexShrink: 0, marginTop: '1px' }} />
          <p style={{ fontFamily: T.body, fontSize: '13px', color: C.blue, lineHeight: 1.5 }}>
            Verifica los datos antes de continuar. Las transferencias son irreversibles.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '24px', flexShrink: 0 }}>
        <Btn label="Continuar al monto" onClick={() => onContinue(form)} variant="dark" disabled={!valid} />
      </div>
    </div>
  );
}
