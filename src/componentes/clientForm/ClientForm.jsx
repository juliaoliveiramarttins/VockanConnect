import React, { useEffect, useState } from 'react'
import './clientForm.css'
import Input from '../input/Input.jsx'
import Button from '../button/Button.jsx'
import { isCPF, isCNPJ } from '../../utils/storage.js'

export default function ClientForm({ initial, onSubmit, onCancel }) {
  const [nome, setNome] = useState(initial?.nome ?? '')
  const [tipo, setTipo] = useState(initial?.tipo ?? 'CPF')
  const [cpfCnpj, setCpfCnpj] = useState(initial?.cpfCnpj ?? '')
  const [segmento, setSegmento] = useState(initial?.segmento ?? '')
  const [email, setEmail] = useState(initial?.email ?? '')
  const [telefone, setTelefone] = useState(initial?.telefone ?? '')
  const [endereco, setEndereco] = useState(initial?.endereco ?? '')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isCNPJ(cpfCnpj)) setTipo('CNPJ')
    else if (isCPF(cpfCnpj)) setTipo('CPF')
  }, [cpfCnpj])

  function validate() {
    const e = {}
    if (!nome.trim()) e.nome = 'Obrigatório'

    if (!cpfCnpj.trim()) e.cpfCnpj = 'Obrigatório'
    else if (!(isCPF(cpfCnpj) || isCNPJ(cpfCnpj))) {
      e.cpfCnpj = 'Informe um CPF ou CNPJ válido'
    }

    if (tipo === 'CNPJ' && !segmento.trim()) e.segmento = 'Obrigatório para CNPJ'

    if (!email.trim()) e.email = 'Obrigatório'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'E-mail inválido'

    if (!telefone.trim()) e.telefone = 'Obrigatório'
    else if (telefone.replace(/\D/g, '').length < 10) e.telefone = 'Telefone incompleto'

    if (!endereco.trim()) e.endereco = 'Obrigatório'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      id: initial?.id,
      nome: nome.trim(),
      cpfCnpj: cpfCnpj.trim(),
      tipo,
      segmento: tipo === 'CNPJ' ? segmento.trim() : null,
      email: email.trim(),
      telefone: telefone.trim(),
      endereco: endereco.trim()
    })
  }

  return (
    <form className="client-form" onSubmit={handleSubmit}>
      <div className="grid">
        <Input
          label="Nome do cliente"
          required
          value={nome}
          onChange={e => setNome(e.target.value)}
          error={errors.nome}
        />

        <label className="field">
          <span>Tipo</span>
          <select value={tipo} onChange={e => setTipo(e.target.value)}>
            <option>CPF</option>
            <option>CNPJ</option>
          </select>
        </label>

        <Input
          label="CPF ou CNPJ"
          required
          value={cpfCnpj}
          onChange={e => setCpfCnpj(e.target.value)}
          error={errors.cpfCnpj}
        />

        {tipo === 'CNPJ' && (
          <Input
            label="Segmento empresarial"
            required
            value={segmento}
            onChange={e => setSegmento(e.target.value)}
            error={errors.segmento}
          />
        )}

        <Input
          label="E-mail"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={errors.email}
        />

        <Input
          label="Telefone"
          required
          value={telefone}
          onChange={e => setTelefone(e.target.value)}
          error={errors.telefone}
        />

        <label className="field">
          <span>Endereço</span>
          <textarea
            rows="3"
            value={endereco}
            onChange={e => setEndereco(e.target.value)}
          />
          {errors.endereco && <small className="error">{errors.endereco}</small>}
        </label>
      </div>

      <div className="form-actions">
        <Button variant="ghost" onClick={onCancel} type="button">
          Cancelar
        </Button>
        <Button type="submit">
          <i className="fa-solid fa-floppy-disk"></i> Salvar
        </Button>
      </div>
    </form>
  )
}
