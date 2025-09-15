import React from 'react';
import api from '../services/api';
import '../styles/Leads.css';

export default function LeadsInvited({ leads, onStatusChange }) {
  const invitedLeads = leads.filter(lead => lead.status === 0);

  const formatPhone = (value) => {
    if (!value) return '-';
    value = value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) return `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
    else if (value.length > 2) return `(${value.slice(0,2)}) ${value.slice(2)}`;
    else if (value.length > 0) return `(${value}`;
    return '';
  };

  const acceptLead = async (lead) => {
    try {
      const finalPrice = lead.price > 500 ? lead.price * 0.9 : lead.price;
      const res = await api.put(`/leads/${lead.id}/accept`, {
        ...lead,
        price: finalPrice,
        status: 1
      });

      console.log(`E-mail simulado para vendas@test.com - Lead aceito: ${lead.id} - ${lead.firstName} ${lead.lastName}`);
      onStatusChange(res.data);
    } catch (e) {
      console.error('Erro ao aceitar lead:', e);
    }
  };

  const declineLead = async (lead) => {
    try {
      await api.put(`/leads/${lead.id}/decline`, { ...lead, status: 2 });

      console.log(`E-mail simulado para vendas@test.com - Lead recusado: ${lead.id} - ${lead.firstName} ${lead.lastName}`);

      onStatusChange({ id: lead.id, status: 2 });
    } catch (e) {
      console.error('Erro ao recusar lead:', e);
    }
  };


  if (invitedLeads.length === 0) return <p className="no-leads">Nenhum lead convidado no momento.</p>;

  return (
    <div>
      {invitedLeads.map(lead => (
        <div key={lead.id} className="lead-card invited">
          <p className="lead-name">{lead.firstName} {lead.lastName}</p>
          <p><b>Telefone:</b> {formatPhone(lead.phone)}</p>
          <p><b>Email:</b> {lead.email || '-'}</p>
          <p><b>Bairro:</b> {lead.suburb || '-'}</p>
          <p><b>Categoria:</b> {lead.category || '-'}</p>
          <p><b>Descrição:</b> {lead.description || '-'}</p>
          <p>
            <b>Preço:</b> R$ {lead.price.toFixed(2)}
            {lead.price > 500 && <span className="discount-label"> (10% de desconto se aceito)</span>}
          </p>
          <p><b>Criado em:</b> {new Date(lead.createdAt).toLocaleString()}</p>

          <div className="lead-actions">
            <button className="btn-accept" onClick={() => acceptLead(lead)}>Accept</button>
            <button className="btn-decline" onClick={() => declineLead(lead)}>Decline</button>
          </div>
        </div>
      ))}
    </div>
  );
}
