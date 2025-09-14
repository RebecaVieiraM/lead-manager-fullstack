import React, { useState } from 'react';
import api from '../services/api';
import '../styles/AddLeadForm.css';

export default function AddLeadForm({ onLeadAdded }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [suburb, setSuburb] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Função para aplicar máscara de telefone (11 dígitos)
  const formatPhone = (value) => {
    value = value.replace(/\D/g, ''); // Remove tudo que não é número
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) {
      return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      return `(${value}`;
    }
    return '';
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Remove caracteres da máscara para enviar apenas números
    const numericPhone = phone.replace(/\D/g, '');
    if (numericPhone.length !== 11) {
      setError('Telefone inválido. Deve ter 11 dígitos.');
      setLoading(false);
      return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber < 0) {
      setError('Preço deve ser um número válido maior ou igual a zero.');
      setLoading(false);
      return;
    }

    const newLead = {
      firstName,
      lastName,
      phone: numericPhone,
      email,
      suburb,
      category,
      description,
      price: priceNumber,
      status: 0, // Invited
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await api.post('/leads', newLead);
      const addedLead = res.data;

      // Limpa o formulário
      setFirstName('');
      setLastName('');
      setPhone('');
      setEmail('');
      setSuburb('');
      setCategory('');
      setDescription('');
      setPrice('');

      if (onLeadAdded) onLeadAdded(addedLead);
    } catch (e) {
      setError(e.response?.data?.title || e.message);
    }

    setLoading(false);
  }

  return (
    <form className="add-lead-form" onSubmit={handleSubmit}>
      <h2>Adicionar Novo Lead Convidado</h2>
      {error && <p className="form-error">Erro: {error}</p>}

      <input placeholder="Nome" value={firstName} onChange={e => setFirstName(e.target.value)} required />
      <input placeholder="Sobrenome" value={lastName} onChange={e => setLastName(e.target.value)} required />
      <input 
        placeholder="Telefone" 
        value={phone} 
        onChange={e => setPhone(formatPhone(e.target.value))}
        maxLength={15} 
        required 
      />
      <input 
        placeholder="Email" 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />
      <input placeholder="Bairro" value={suburb} onChange={e => setSuburb(e.target.value)} />
      <input placeholder="Categoria" value={category} onChange={e => setCategory(e.target.value)} />
      <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
      <input 
        placeholder="Preço" 
        type="number" 
        step="0.01" 
        value={price} 
        onChange={e => setPrice(e.target.value)} 
        required 
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Adicionando...' : 'Adicionar'}
      </button>
    </form>
  );
}

