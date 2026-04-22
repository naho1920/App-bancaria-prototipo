import { useState } from 'react';
import { ArrowLeft, Search, Plus, ChevronRight, UserPlus } from 'lucide-react';
import { CONTACTS, AVATAR_COLORS } from '../data/contacts';
import { C, T } from '../tokens';

function Avatar({ name, index, size = 44 }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '9999px',
      background: AVATAR_COLORS[index % AVATAR_COLORS.length],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: T.display,
      fontSize: size * 0.36,
      fontWeight: '600',
      color: '#ffffff',
      flexShrink: 0,
    }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function ContactsListScreen({ onBack, onSelect, onAddNew }) {
  const [query, setQuery] = useState('');

  const filtered = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.bank.toLowerCase().includes(query.toLowerCase())
  );

  const recent  = filtered.slice(0, 3);
  const others  = filtered.slice(3);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.white }}>
      {/* Header */}
      <div style={{ padding: '52px 24px 20px', flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: C.sec, marginBottom: '20px', padding: 0, fontFamily: T.body, fontSize: '14px' }}
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontFamily: T.display, fontSize: '26px', fontWeight: '500', color: C.dark, marginBottom: '4px' }}>
              Transferir a
            </h1>
            <p style={{ fontFamily: T.body, fontSize: '14px', color: C.sec }}>
              Elige o añade un destinatario
            </p>
          </div>
          {/* Add new contact button */}
          <button
            onClick={onAddNew}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '9999px',
              background: C.dark,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Plus size={20} color="#ffffff" />
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: C.muted, display: 'flex', pointerEvents: 'none' }}>
            <Search size={18} />
          </div>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar por nombre o banco..."
            style={{
              width: '100%',
              padding: '13px 16px 13px 44px',
              background: C.surface,
              border: 'none',
              borderRadius: '12px',
              fontFamily: T.body,
              fontSize: '15px',
              color: C.dark,
              letterSpacing: '0.16px',
            }}
          />
        </div>
      </div>

      {/* Contact list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
        {filtered.length === 0 ? (
          /* Empty state */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '48px', gap: '12px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '9999px', background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search size={28} color={C.muted} />
            </div>
            <p style={{ fontFamily: T.body, fontSize: '15px', color: C.muted, textAlign: 'center' }}>
              No encontramos "{query}"
            </p>
          </div>
        ) : (
          <>
            {/* Frequent contacts */}
            {recent.length > 0 && (
              <>
                <p style={{ fontFamily: T.body, fontSize: '12px', fontWeight: '600', color: C.muted, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '10px' }}>
                  {query ? 'Resultados' : 'Frecuentes'}
                </p>

                {/* Frecuentes: horizontal scroll avatars */}
                {!query && (
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
                    {recent.map((contact, i) => (
                      <button
                        key={contact.id}
                        onClick={() => onSelect(contact)}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
                      >
                        <Avatar name={contact.name} index={i} size={52} />
                        <span style={{ fontFamily: T.body, fontSize: '12px', color: C.dark, fontWeight: '500', maxWidth: '60px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {contact.name.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Full list */}
            <p style={{ fontFamily: T.body, fontSize: '12px', fontWeight: '600', color: C.muted, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '10px' }}>
              {query ? '' : 'Todos los contactos'}
            </p>
            <div style={{ background: C.white, borderRadius: '20px', overflow: 'hidden', border: `1px solid ${C.surface}` }}>
              {filtered.map((contact, i) => (
                <button
                  key={contact.id}
                  onClick={() => onSelect(contact)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    background: 'none',
                    border: 'none',
                    borderBottom: i < filtered.length - 1 ? `1px solid ${C.surface}` : 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <Avatar name={contact.name} index={i} size={44} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: T.body, fontSize: '15px', fontWeight: '500', color: C.dark, marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {contact.name}
                    </p>
                    <p style={{ fontFamily: T.body, fontSize: '13px', color: C.muted }}>
                      {contact.bank} • {contact.account.slice(-4).padStart(contact.account.length, '•').replace(/•+/, '••••')}
                    </p>
                  </div>
                  <ChevronRight size={18} color={C.border} />
                </button>
              ))}
            </div>

            {/* Spacer bottom */}
            <div style={{ height: '32px' }} />
          </>
        )}
      </div>

      {/* Add new contact — bottom CTA */}
      <div style={{ padding: '16px 24px 32px', flexShrink: 0, borderTop: `1px solid ${C.surface}` }}>
        <button
          onClick={onAddNew}
          style={{
            width: '100%',
            padding: '14px 32px',
            borderRadius: '9999px',
            background: 'transparent',
            border: `2px solid ${C.dark}`,
            fontFamily: T.display,
            fontSize: '15px',
            fontWeight: '500',
            color: C.dark,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <UserPlus size={18} />
          Añadir nuevo contacto
        </button>
      </div>
    </div>
  );
}
