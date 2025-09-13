# Lead Manager - Full Stack (.NET + React)

## Descrição
Aplicação de gerenciamento de leads.  

### Funcionalidades
- Listar leads convidados (Invited)  
- Aceitar lead → aplica desconto de 10% se preço for maior que 500 e muda o status  
- Recusar lead → muda o status para recusado  
- Após aceitar, simula envio de notificação de e-mail para **vendas@test.com** (não é enviado de verdade, apenas simulação)

---

## Tecnologias
- Backend: .NET 6 Web API + Entity Framework Core + SQL Server  
- Frontend: React + Vite  

---

## Como rodar

### 1. Clonar repositório
```bash
git clone https://github.com/seu-usuario/lead-manager.git
cd lead-manager
```

### 2. Rodar o backend:
```bash
cd backend
dotnet restore
dotnet run
```

A API estará em: http://localhost:5000

### 3. No arquivo appsettings.json, configure a conexão com o SQL Server:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=LeadManagerDb;User Id=sa;Password=YourPassword123;"
}
```

### 4. Criar banco de dados:
```bash
dotnet ef database update
```

### 5. Rodar o frontend:
```bash
cd frontend
npm install
npm run dev
```

O frontend estará em: http://localhost:5173

## Estrutura do projeto
lead-manager/
|__ backend/   -> API .NET Core
|__ frontend/  -> SPA React
|__ README.md