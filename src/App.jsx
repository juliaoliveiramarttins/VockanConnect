import React, { useEffect, useMemo, useState } from 'react'
import './App.css'
import Header from './componentes/header/Header.jsx'
import Button from './componentes/button/Button.jsx'
import Modal from './componentes/modal/Modal.jsx'
import ClientForm from './componentes/clientForm/ClientForm.jsx'
import Tabs from './componentes/tabs/Tabs.jsx'
import Table from './componentes/table/Table.jsx'
import { loadClients, saveClients, loadDeleted, saveDeleted, seedIfEmpty, nextId } from './utils/storage.js'

export default function App() {
  const [clients, setClients] = useState([])
  const [deleted, setDeleted] = useState([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editClient, setEditClient] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [activeTab, setActiveTab] = useState('ativos')
  const [search, setSearch] = useState('')

  useEffect(() => {
    seedIfEmpty()
    setClients(loadClients())
    setDeleted(loadDeleted())
  }, [])

  useEffect(() => { saveClients(clients) }, [clients])
  useEffect(() => { saveDeleted(deleted) }, [deleted])

  const filteredActive = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return clients
    return clients.filter(c =>
      [c.nome, c.email, c.cpfCnpj, c.segmento ?? '', c.telefone ?? '']
        .join(' ')
        .toLowerCase()
        .includes(q)
    )
  }, [clients, search])

  function handleCreate(newData) {
    const id = nextId()
    setClients(prev => [{ id, ...newData, createdAt: new Date().toISOString() }, ...prev])
    setIsCreateOpen(false)
  }

  function handleUpdate(updated) {
    setClients(prev => prev.map(c => c.id === updated.id ? { ...c, ...updated } : c))
    setEditClient(null)
  }

  function requestDelete(client) {
    setConfirmDelete(client)
  }

  function doDelete() {
    const c = confirmDelete
    setClients(prev => prev.filter(x => x.id !== c.id))
    setDeleted(prev => [{ ...c, deletedAt: new Date().toISOString() }, ...prev])
    setConfirmDelete(null)
  }

  return (
    <div className="app">
      <Header onOpenCreate={() => setIsCreateOpen(true)} search={search} setSearch={setSearch} />
      <main className="container">
        <div className="card content">
          <Tabs
            tabs={[
              { id: 'ativos', label: 'Ativos' },
              { id: 'deletados', label: 'Deletados recentemente' }
            ]}
            active={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === 'ativos' && (
            <Table
              items={filteredActive}
              onEdit={setEditClient}
              onDelete={requestDelete}
              emptyMessage="Nenhum cliente encontrado."
            />
          )}

          {activeTab === 'deletados' && (
            <Table
              items={deleted}
              showDeleted
              onRestore={(client) => {
                setDeleted(prev => prev.filter(d => d.id !== client.id))
                setClients(prev => [{ ...client, deletedAt: undefined }, ...prev])
              }}
              emptyMessage="Nenhum cliente deletado recentemente."
            />
          )}
        </div>
      </main>

      {/* Modal criar */}
      <Modal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Cadastrar cliente">
        <ClientForm onCancel={() => setIsCreateOpen(false)} onSubmit={handleCreate} />
      </Modal>

      {/* Modal editar */}
      <Modal open={!!editClient} onClose={() => setEditClient(null)} title="Editar cliente">
        {editClient && (
          <ClientForm
            initial={editClient}
            onCancel={() => setEditClient(null)}
            onSubmit={handleUpdate}
          />
        )}
      </Modal>

      {/* Modal confirmar delete */}
      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirmar exclusão">
        {confirmDelete && (
          <div className="delete-confirm">
            <p>Tem certeza que deseja excluir <strong>{confirmDelete.nome}</strong>?</p>
            <div className="actions">
              <Button variant="ghost" onClick={() => setConfirmDelete(null)}>Cancelar</Button>
              <Button variant="danger" onClick={doDelete}><i className="fa-solid fa-trash"></i> Excluir</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
