# Api Controle de Estoque

Sistema que tem como foco principal o problema de ter um estoque mais enxuto, controlando as compras conforme se vende, minimizando o valor do estoque, com base para futura implementação para controle recebimento e entrega das mercadorias, bem como o controle financeiro do contas a pagar e contas a receber.

## Documentação da API Controle de Estoque

A partir daqui temos descriminada as funções, rotas e linguagem e bibliotecas ultilizadas para desenvolvimento da API.

### Sistema gerado para fazer as seguintes ações

- Painel de Administração:

  - CRUD Usuários;
  - Verificação de Logs do Sistema;

- Sistema:
  - Cadastros:
    - CRUD Clientes
    - CRUD Vendedores
    - Produtos
      - Unidade dos Produtos
      - Categoria dos Produtos
      - Produtos
      - CRUD Fornecedores
    - Movimentações:
      - Pedidos de compras
      - Pedidos de Vendas

### Rotas

#### Rota de Login

```http
  POST /login
```

| Parâmetro  | Tipo     | Descrição                                            |
| :--------- | :------- | :--------------------------------------------------- |
| `email`    | `string` | **Obrigatório**. Passar a senha para receber o token |
| `password` | `string` | **Obrigatório**. Passar a senha para receber o token |
