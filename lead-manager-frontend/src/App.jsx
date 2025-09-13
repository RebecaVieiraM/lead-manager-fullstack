import React, { useState, useEffect } from 'react';
import LeadsInvited from './components/LeadsInvited';
import LeadsAccepted from './components/LeadsAccepted';
import LeadsDeclined from './components/LeadsDeclined';
import AddLeadForm from './components/AddLeadForm';
import api from './services/api';
import './styles/App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('invited');
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await api.get('/leads');
      setLeads(res.data);
    } catch (e) {
      console.error('Erro ao buscar leads', e);
    }
  };

  const handleLeadAdded = (lead) => {
    setLeads(prev => [...prev, lead]);
  };

  const handleStatusChange = (updatedLead) => {
    setLeads(prev =>
      prev.map(lead =>
        lead.id === updatedLead.id ? { ...lead, ...updatedLead } : lead
      )
    );
  };


  return (
    <div className="app-container">
      <h1>Gerente de Leads</h1>

      <nav className="tab-menu">
        <button
          className={activeTab === 'invited' ? 'active' : ''}
          onClick={() => setActiveTab('invited')}
        >
          Leads Convidados
        </button>
        <button
          className={activeTab === 'accepted' ? 'active' : ''}
          onClick={() => setActiveTab('accepted')}
        >
          Leads Aceitos
        </button>
        <button
          className={activeTab === 'declined' ? 'active' : ''}
          onClick={() => setActiveTab('declined')}
        >
          Leads Recusados
        </button>
      </nav>

      <main>
        {activeTab === 'invited' && (
          <>
            <AddLeadForm onLeadAdded={handleLeadAdded} />
            <LeadsInvited leads={leads} onStatusChange={handleStatusChange} />
          </>
        )}
        {activeTab === 'accepted' && <LeadsAccepted leads={leads.filter(l => l.status === 1)} />}
        {activeTab === 'declined' && <LeadsDeclined leads={leads.filter(l => l.status === 2)} />}
      </main>
    </div>
  );
}
