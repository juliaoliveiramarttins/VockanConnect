import React, { useState, useEffect } from 'react'
import './table.css'

export default function Table({
  items,
  onEdit,
  onDelete,
  onRestore,
  emptyMessage,
  showDeleted = false
}) {
  const [selectedClient, setSelectedClient] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleClientClick = (client) => {
    if (isMobile) {
      setSelectedClient(client)
    }
  }

  const closeModal = () => {
    setSelectedClient(null)
  }

  if (isMobile) {
    return (
      <>
        <div className="mobile-list">
          {items.length === 0 && (
            <div className="empty-mobile">{emptyMessage}</div>
          )}
          {items.map(c => (
            <div
              key={c.id}
              className="mobile-item"
              onClick={() => handleClientClick(c)}
            >
              <div className="mobile-name">{c.nome}</div>
              <i className="fa-solid fa-chevron-right mobile-arrow"></i>
            </div>
          ))}
        </div>

        {selectedClient && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{selectedClient.nome}</h3>
                <button className="modal-close" onClick={closeModal}>
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-field">
                  <label>CPF/CNPJ:</label>
                  <span>{selectedClient.cpfCnpj}</span>
                </div>

                <div className="modal-field">
                  <label>Tipo:</label>
                  <span>{selectedClient.tipo}</span>
                </div>

                <div className="modal-field">
                  <label>Segmento:</label>
                  <span>{selectedClient.segmento ?? '-'}</span>
                </div>

                <div className="modal-field">
                  <label>Email:</label>
                  <span>{selectedClient.email ?? '-'}</span>
                </div>

                <div className="modal-field">
                  <label>Telefone:</label>
                  <span>{selectedClient.telefone ?? '-'}</span>
                </div>

                <div className="modal-field">
                  <label>Endereço:</label>
                  <span>{selectedClient.endereco ?? '-'}</span>
                </div>
              </div>

              <div className="modal-actions">
                {!showDeleted ? (
                  <>
                    <button
                      className="modal-btn edit"
                      onClick={() => {
                        onEdit?.(selectedClient)
                        closeModal()
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                      Editar
                    </button>
                    <button
                      className="modal-btn delete"
                      onClick={() => {
                        onDelete?.(selectedClient)
                        closeModal()
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                      Excluir
                    </button>
                  </>
                ) : (
                  <button
                    className="modal-btn restore"
                    onClick={() => {
                      onRestore?.(selectedClient)
                      closeModal()
                    }}
                  >
                    <i className="fa-solid fa-rotate-left"></i>
                    Restaurar
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  // Desktop view - tabela original
  return (
    <div className="table-wrap">
      <table className="vc-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Tipo</th>
            <th>Segmento</th>
            <th>Contatos</th>
            <th>Endereço</th>
            <th style={{ width: showDeleted ? 120 : 90 }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan="7" className="empty">{emptyMessage}</td>
            </tr>
          )}
          {items.map(c => (
            <tr key={c.id}>
              <td>{c.nome}</td>
              <td>{c.cpfCnpj}</td>
              <td>{c.tipo}</td>
              <td>{c.segmento ?? '-'}</td>
              <td className="contact-cell">
                <div className="contact-email">{c.email ?? '-'}</div>
                <div className="contact-phone">{c.telefone ?? '-'}</div>
              </td>
              <td>{c.endereco ?? '-'}</td>
              <td className="actions">
                {!showDeleted ? (
                  <>
                    <button className="icon" title="Editar" onClick={() => onEdit?.(c)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="icon danger" title="Excluir" onClick={() => onDelete?.(c)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </>
                ) : (
                  <button className="icon" title="Restaurar" onClick={() => onRestore?.(c)}>
                    <i className="fa-solid fa-rotate-left"></i>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}