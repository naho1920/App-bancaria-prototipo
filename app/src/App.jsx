import { useState, useRef } from 'react';
import LoginScreen        from './screens/LoginScreen';
import DashboardScreen    from './screens/DashboardScreen';
import ContactsListScreen from './screens/ContactsListScreen';
import AddContactScreen   from './screens/AddContactScreen';
import AmountScreen       from './screens/AmountScreen';
import ReceiptScreen      from './screens/ReceiptScreen';
import FinalScreen        from './screens/FinalScreen';

const SCREENS = ['login', 'dashboard', 'contacts', 'addContact', 'amount', 'receipt', 'final'];

export default function App() {
  const [screen,  setScreen]  = useState('login');
  const [contact, setContact] = useState({ name: '', bank: '', account: '', routing: '', address: '' });
  const [amount,  setAmount]  = useState(0);
  const prevIdx = useRef(0);

  const go = next => {
    prevIdx.current = SCREENS.indexOf(screen);
    setScreen(next);
  };

  const idx = SCREENS.indexOf(screen);
  const dir = idx >= prevIdx.current ? 'slide-in-right' : 'slide-in-left';

  const handleSelectContact = c => { setContact(c); go('amount'); };
  const handleNewContact = data => { setContact(data); go('amount'); };
  const handleTransfer = amt => { setAmount(amt); go('receipt'); };
  const handleFinish = () => go('final');

  const handleHome = () => {
    setContact({ name: '', bank: '', account: '', routing: '', address: '' });
    setAmount(0);
    go('dashboard');
  };

  return (
    <div className="phone">
      <div key={screen} className={`screen ${dir}`}>
        {screen === 'login' && (
          <LoginScreen onLogin={() => go('dashboard')} />
        )}
        {screen === 'dashboard' && (
          <DashboardScreen onNewTransfer={() => go('contacts')} />
        )}
        {screen === 'contacts' && (
          <ContactsListScreen
            onBack={() => go('dashboard')}
            onSelect={handleSelectContact}
            onAddNew={() => go('addContact')}
          />
        )}
        {screen === 'addContact' && (
          <AddContactScreen
            onBack={() => go('contacts')}
            onContinue={handleNewContact}
          />
        )}
        {screen === 'amount' && (
          <AmountScreen
            contact={contact}
            onBack={() => go('contacts')}
            onTransfer={handleTransfer}
          />
        )}
        {screen === 'receipt' && (
          <ReceiptScreen
            contact={contact}
            amount={amount}
            onFinish={handleFinish}
          />
        )}
        {screen === 'final' && (
          <FinalScreen />
        )}
      </div>
    </div>
  );
}
