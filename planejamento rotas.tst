Sistema de controle de estoque:

Admin
    User
    GET /admin/users OK
    GET /admin/users/:id OK
    POST /admin/users OK
    PUT /admin/users/:id OK
    DELETE /admin/users/:id OK


/admin/logs - Adjust database
    GET /admin/logs
    GET /admin/logs/:id


login
POST /login OK

User
    cadastro
        Customers
            GET /custumers/
            GET /custumers/:id
            POST /customers
            PUT /customer/:id
            DELETE /customers/:id

        sallers
            GET /sallers/
            GET /sallers/:id
            POST /sallers
            PUT /sallers/:id
            DELETE /sallers/:id

        suppliers
            GET /suppliers/
            GET /suppliers/:id
            POST /suppliers
            PUT /suppliers/:id
            DELETE /suppliers/:id

        products_categories
            GET /products_categories/
            GET /products_categories/:id
            POST /products_categories
            PUT /products_categories/:id
            DELETE /products_categories/:id       

        products_unities
            products_categories
            GET /products_categories/
            GET /products_categories/:id
            POST /products_categories
            PUT /products_categories/:id
            DELETE /products_categories/:id       
        
        products
            GET /products/
            GET /products/:id
            POST /products
            PUT /products/:id
            DELETE /products/:id       

    Movimentação
        purchases
            GET /purchases/
            GET /purchases/:id
            POST /purchases
            PUT /purchases/:id
            DELETE /purchases/:id

        purchase_items
            GET /purchases/:id_pusrchase/purchase_items
            GET  /purchases/:id_pusrchase/purchase_items/:id
            POST  /purchases/:id_pusrchase/purchase_items
            PUT  /purchases/:id_pusrchase/purchase_items/:id
            DELETE  /purchases/:id_pusrchase/purchase_items/:id

        sales
            GET /sales/
            GET /sales/:id
            POST /sales
            PUT /sales/:id
            DELETE /sales/:id

        purchase_item
            GET /sales/:id_sale/sale_items
            GET  /sales/:id_sale/sale_items/:id
            POST  /sales/:id_sale/sale_items
            PUT  /sales/:id_sale/sale_items/:id
            DELETE  /sales/:id_sale/sale_items/:id
