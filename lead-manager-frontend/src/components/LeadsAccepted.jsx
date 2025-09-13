import React from 'react';
import '../styles/Leads.css';

export default function LeadsAccepted({ leads }) {
  const formatPhone = (value) => {
    if (!value) return '-';
    value = value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) return `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
    else if (value.length > 2) return `(${value.slice(0,2)}) ${value.slice(2)}`;
    else if (value.length > 0) return `(${value}`;
    return '';
  };

  if (leads.length === 0) return <p className="no-leads">Nenhum lead aceito no momento.</p>;

  return (
    <div>
      {leads.map(lead => (
        <div key={lead.id} className="lead-card accepted">
          <p className="lead-name">{lead.firstName} {lead.lastName}</p>
          <p><b>Telefone:</b> {formatPhone(lead.phone)}</p>
          <p><b>Email:</b> {lead.email || '-'}</p>
          <p><b>Bairro:</b> {lead.suburb || '-'}</p>
          <p><b>Categoria:</b> {lead.category || '-'}</p>
          <p><b>Descrição:</b> {lead.description || '-'}</p>
          <p><b>Preço final:</b> R$ {lead.price.toFixed(2)}</p>
          <p><b>Criado em:</b> {new Date(lead.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
