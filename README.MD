# Lewix Generator API
Este é um exemplo de API feito através do Gerador Lewix Generator.

## Instalação
Para instalar o projeto execute o seguinte comando dentro do diretório.

```bash
npm install
```
## Uso
Após instalar, execute o seguinte comando para executar

Em desenvolvimento
```bash
npm run dev
```
Em Produção 
```bash
npm start
```
## Arquitetura
Segue abaixo a organização do projeto.
```bash
LewixGeneratorAPI/
  |
  |-- api/
  |  |-- controllers
  |  |-- lib
  |  |-- middlewares
  |  |-- models
  |  |-- index.js
  |  |-- routers.js
  |
  |-- db
  |-- package.json
  |-- .env
  |-- .gitignore
```
### /api
Diretório principal onde estão armazenado os arquivos de códigos.

### /api/controllers
Arquivos de controllers de cada model, contendo os métodos List, ListOne, Save (update e create) e Delete.
```javascript
// ModelController.js
async list (req, res) { ... }
async listOne (req, res) { ... }
async save (req, res) { ... }
async delete (req, res) { ... }

```
### /api/lib/con.js
Diretório de uteis. Nesse caso, informações de conexão com o Banco de dados. Caso utilize o SQLITE (default), será criado o arquivo **/db/database.sqlite**.

### /api/middlewares/AuthToken.js
Diretório de Middlewares. Neste caso, o responsável por validar o Token de Authenticação.

### /api/models
Arquivos de Models de cada entidade declarados em Sequelize.js. 

### /api/index.js
Arquivo Main

### /api/routes.js
Arquivo de conexão de rotas e middlewares. 
```javascript
// Rotas de usuario
...
routes.post("/user/auth", UserController.Authenticate);
routes.post("/user/list", AuthToken, UserController.list);
routes.post("/user/list/:id", AuthToken, UserController.listOne);
routes.post("/user/save", UserController.save);
routes.delete("/user/delete", AuthToken, UserController.delete);
...

```