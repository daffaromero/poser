import React from 'react';
import InvoiceForm from './components/InvoiceForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Create Invoice</h1>
      <InvoiceForm />
    </div>
  );
};

export default App;