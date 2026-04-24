import { useState } from 'react';
import { ArrowLeft, User, Building2, Hash, Shield, MapPin } from 'lucide-react';
import Btn from '../components/Btn';
import Field from '../components/Field';
import { C, T } from '../tokens';

export default function AddContactScreen({ onBack, onContinue }) {
  const [form, setForm] = useState({ name: '', bank: '', account: '', routing: '', address: '' });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const valid = form.name.trim() && form.bank.trim() && form.account.trim() && form.routing.trim() && form.address.trim();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.white }}>
      {/* Header */}
      <div style={{ padding: '52px 24px 24px', flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: C.sec, marginBottom: '20px', padding: 0, fontFamily: T.body, fontSize: '14px' }}
        >
          <ArrowLeft size={20} />
          Contacts
        </button>
        <h1 style={{ fontFamily: T.display, fontSize: '26px', fontWeight: '500', color: C.dark, marginBottom: '6px' }}>
          New contact
        </h1>
        <p style={{ fontFamily: T.body, fontSize: '14px', color: C.sec, letterSpacing: '0.16px' }}>
          Enter recipient details
        </p>
      </div>

      {/* Form */}
      <div style={{ flex: 1, padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '18px', overflowY: 'auto' }}>
        <Field
          label="Recipient name"
          value={form.name}
          onChange={set('name')}
          placeholder="e.g. John Smith"
          icon={User}
        />
        <Field
          label="Bank"
          value={form.bank}
          onChange={set('bank')}
          placeholder="e.g. Bank of America"
          icon={Building2}
        />
        <Field
          label="Account number / CBU"
          value={form.account}
          onChange={set('account')}
          placeholder="e.g. 0000 1234 5678 9012"
          icon={Hash}
        />
        <Field
          label="Routing number"
          value={form.routing}
          onChange={set('routing')}
          placeholder="e.g. 021000021"
          icon={Hash}
        />
        <Field
          label="Address"
          value={form.address}
          onChange={set('address')}
          placeholder="e.g. 123 Main St, New York, NY"
          icon={MapPin}
        />

        <div style={{ background: '#EEF0FF', borderRadius: '12px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <Shield size={16} color={C.blue} style={{ flexShrink: 0, marginTop: '1px' }} />
          <p style={{ fontFamily: T.body, fontSize: '13px', color: C.blue, lineHeight: 1.5 }}>
            Verify all details before continuing. Transfers are irreversible.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '24px', flexShrink: 0 }}>
        <Btn label="Continue to amount" onClick={() => onContinue(form)} variant="dark" disabled={!valid} />
      </div>
    </div>
  );
}
