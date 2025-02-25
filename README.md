# base-api
Esse projeto tem por objetivo facilitar a criação de futuros projetos e servir como base para estrutura e aproveitar as suas funcionalidades.

## Versão
Esse projeto utiliza NodeJS 20.12.0

> Sempre que usar esse projeto como base, atualize o NodeJs para versão LTS. 

## Funcionalidades 
Esse projeto já possui algumas bibliotecas e funcionalidades prontas, como as seguintes:
* [x] JWT (Gerenciamento de Token para que o sistema possua autenticação)
* [x] Swagger
* [x] TypeORM (ORM para modelagem de Banco de Dados)
* [x] NodeMailer (Biblioteca para disparo de e-mail)
* [x] Template para design de e-mails
* [X] Request Validators
* [x] ESLint (Ferramenta para manter o código padronizado e evitar erros)
* [x] Husky (Hook que dispara um pre-commit para rodar o ESLint e o Jest, caso haja testes, para verificar se o código atende todos os requisitos de qualidade)
* [x] Git Commit Linter (Verifica todo commit realizado se ele segue as convenções de nomenclatura do GIT)

## Estrutura
O projeto está estruturado de forma que consiga desacoplar o máximo de funcionalidades da outra, para que haja o mínimo de dependências do mesmo arquivo e para que possam reaproveitar funções sem a necessidade de duplicar o mesmo código.

A pasta "Routes", está separada de acordo com a entidade necessária, e todas elas são unificadas dentro do arquivo "router.ts". 
Caso queira que a rota seja autenticada, é necessário adicionar o middleware "AuthMiddleWare", sendo assim, ele irá verificar se a requisição possui um token válido.

Após isso, a rota invoca um método da Controller. A controller vai ser responsável por verificar se os parâmetros passados estão no padrão exigido, e após isso, irá chamar a funcionalidade dentro de "services". A ideia das "services", é desacoplar cada funcionalidade para evitar controllers extensas e corra o risco de quebrar alguma função.

Caso seja necessário enviar alguma resposta de erro, dentro da pasta "errors" possui vários modelos de erros configurados com os códigos corretos, facilitando a maneira de executar isso, como por exemplo o lançamento de um BadRequest:
```
throw new BadRequest('e-mail')
```
O sistema possui um handler de erros que irá tratá-lo e mandar corretamente ao usuário, com o código correto e a mensagem correta.

## Comandos
Para baixar as depêndencias do projeto de desenvolvimento, certifique-se de estar utilizando a versão correta do NodeJS e execute o seguinte comando:
```
npm install
```
Caso suba esse código para produção, não é necessário baixar as dependências de desenvolvimento, então use o seguinte comando:
```
npm install --production
```
Para realizar o build do projeto, utilize o seguinte comando:
```
npm run build
```
Para executar o projeto em ambiente de desenvolvimento:
```
npm run dev
```
Para executar o projeto em ambiente de produção:
```
npm start
```
## Banco de Dados
Para manter o banco de dados versionado, este projeto utiliza a orm TypeORM e utiliza o modelo de migrations.

Para gerar uma nova migration:
```
npm run migration:add --name=CreateUserTable
```

Para reverter a última migration:
```
npm run migration:revert
```

Para executar a migration:
```
npm run migration:run
```

