const ACTIVE_KEY = 'vockan_clients_active'
const DELETED_KEY = 'vockan_clients_deleted'
const ID_KEY = 'vockan_clients_nextid'

export function loadClients(){
  return JSON.parse(localStorage.getItem(ACTIVE_KEY) || '[]')
}
export function saveClients(list){
  localStorage.setItem(ACTIVE_KEY, JSON.stringify(list))
}
export function loadDeleted(){
  return JSON.parse(localStorage.getItem(DELETED_KEY) || '[]')
}
export function saveDeleted(list){
  localStorage.setItem(DELETED_KEY, JSON.stringify(list))
}

export function nextId(){
  const current = parseInt(localStorage.getItem(ID_KEY) || '1', 10)
  localStorage.setItem(ID_KEY, String(current + 1))
  return current
}

// Mocks com os campos usados na UI (nome, cpfCnpj, tipo, segmento, email, telefone, endereco)
const MOCKS = [
  { nome: 'Maria Souza', cpfCnpj: '123.456.789-09', tipo: 'CPF', email: 'maria@exemplo.com', telefone: '(11) 98888-0001', endereco: 'Rua A, 123 - SP' },
  { nome: 'João Pereira', cpfCnpj: '987.654.321-00', tipo: 'CPF', email: 'joao@exemplo.com', telefone: '(11) 98888-0002', endereco: 'Rua B, 456 - SP' },
  { nome: 'TechNova Ltda', cpfCnpj: '12.345.678/0001-90', tipo: 'CNPJ', segmento: 'Tecnologia', email: 'contato@technova.com', telefone: '(11) 4002-8922', endereco: 'Av. Paulista, 1000 - SP' },
  { nome: 'Agro Vale', cpfCnpj: '23.456.789/0001-11', tipo: 'CNPJ', segmento: 'Agronegócio', email: 'sac@agrovale.com', telefone: '(67) 3333-2222', endereco: 'Rod. BR-060 - MS' },
  { nome: 'Clínica Vida', cpfCnpj: '34.567.890/0001-22', tipo: 'CNPJ', segmento: 'Saúde', email: 'contato@clinicavida.com', telefone: '(21) 2222-1111', endereco: 'Rua das Flores, 50 - RJ' },
  { nome: 'Ana Lima', cpfCnpj: '321.654.987-01', tipo: 'CPF', email: 'ana@exemplo.com', telefone: '(21) 97777-7777', endereco: 'Rua C, 789 - RJ' },
  { nome: 'Eduardo Alves', cpfCnpj: '111.222.333-44', tipo: 'CPF', email: 'edu@exemplo.com', telefone: '(31) 98888-4444', endereco: 'Rua D, 100 - BH' },
  { nome: 'Loja Azul Comércio', cpfCnpj: '45.678.901/0001-33', tipo: 'CNPJ', segmento: 'Varejo', email: 'contato@lojaazul.com', telefone: '(41) 3333-0000', endereco: 'Centro - Curitiba' },
  { nome: 'Construtora Prime', cpfCnpj: '56.789.012/0001-44', tipo: 'CNPJ', segmento: 'Construção', email: 'contato@prime.com', telefone: '(51) 3003-0001', endereco: 'Porto Alegre' },
  { nome: 'Bistrô do Vale', cpfCnpj: '67.890.123/0001-55', tipo: 'CNPJ', segmento: 'Alimentação', email: 'contato@bistrovale.com', telefone: '(71) 4002-1000', endereco: 'Salvador' }
]

export function seedIfEmpty(){
  const has = JSON.parse(localStorage.getItem(ACTIVE_KEY) || '[]')
  if(Array.isArray(has) && has.length === 0){
    const seeded = MOCKS.map((m, i) => ({ id: i+1, ...m, createdAt: new Date().toISOString() }))
    localStorage.setItem(ACTIVE_KEY, JSON.stringify(seeded))
    localStorage.setItem(ID_KEY, String(seeded.length + 1))
    if(!localStorage.getItem(DELETED_KEY)) localStorage.setItem(DELETED_KEY, '[]')
  }
}

// Simple format checks (não é validação oficial de CPF/CNPJ)
export function isCPF(value=''){
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value) || /^\d{11}$/.test(value)
}
export function isCNPJ(value=''){
  return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value) || /^\d{14}$/.test(value)
}
