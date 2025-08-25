import React from 'react'
import './header.css'
import Button from '../button/Button.jsx'

export default function Header({ onOpenCreate, search, setSearch }) {
  return (
    <header className="vc-header">
      <div className="container header-row">
        <div className="brand">
          <div className="logo">V</div>
          <div className="titles">
            <h1>VockanConnect</h1>
            <span>Simplificando o cadastro e a gestão de clientes.</span>
          </div>
        </div>

        <div className="actions">
          <div className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button onClick={onOpenCreate}>
            <i className="fa-solid fa-user-plus"></i> Cadastrar cliente
          </Button>
        </div>
      </div>
    </header>
  )
}
