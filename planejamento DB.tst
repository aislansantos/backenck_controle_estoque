
model Customer {
    id      Int     @id @default(autoincrement())
    name    String  @db.VarChar(255)
    email   String? @unique @db.VarChar(100)
    city    String  @db.VarChar(100)
    active  Boolean @default(true)
    id_sale Int

    sale Sale @relation(fields: [id_sale], references: [id])
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model Product {
    id               Int              @id @default(autoincrement())
    description      String?          @db.VarChar(255)
    amount           Int
    fk_id_unit       Int
    fk_id_category   Int
    active           Boolean          @default(true)
    product_category ProductCategory @relation(fields: [fk_id_category], references: [id], onDelete: NoAction, onUpdate: NoAction)
    product_unit     ProductUnit     @relation(fields: [fk_id_unit], references: [id], onDelete: NoAction, onUpdate: NoAction)
    purchase_item    Purchasetem[]
    sale_item        sale_item[]

    @@index([description], map: "idx_product_description")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model ProductCategory {
    id          Int       @id @default(autoincrement())
    description String    @unique(map: "uc_product_category_description") @db.VarChar(255)
    product     Product[]

    @@index([description], map: "idx_product_category_description")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model ProductUnit {
    id          Int       @id @default(autoincrement())
    description String    @unique(map: "uc_product_unit_description") @db.VarChar(3)
    product     Product[]

    @@index([description], map: "idx_product_unit_description")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model purchase {
    id                Int            @id @default(autoincrement())
    order_number      Int
    purchase_order_ps String?        @db.VarChar(255)
    order_date        DateTime       @db.Timestamp(6)
    release_date      DateTime       @db.Timestamp(6)
    expiration_date   DateTime       @db.Timestamp(6)
    fk_supplier_id    Int
    supplier          Supplier       @relation(fields: [fk_supplier_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
    purchase_item     PurchaseItem[]

    @@unique([order_number, fk_supplier_id], map: "uc_purchase_order_customer")
    @@index([fk_supplier_id], map: "idx_supplier_supplier")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model PurchaseItem {
    id             Int      @id @default(autoincrement())
    quantity_item  Int
    unitary_value  Decimal  @db.Decimal(10, 2)
    total_value    Decimal  @db.Decimal(10, 2)
    fk_purchase_id Int
    fk_product_id  Int
    product        Product  @relation(fields: [fk_product_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
    purchase       purchase @relation(fields: [fk_purchase_id], references: [id], onDelete: Cascade, onUpdate: NoAction)

    @@index([fk_product_id], map: "idx_purchase_item_fk_product_id")
    @@index([fk_purchase_id], map: "idx_purchase_item_fk_purchase_id")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model Sale {
    id              Int        @id @default(autoincrement())
    order_number    Int
    sale_order_ps   String?    @db.VarChar(255)
    order_date      DateTime   @db.Timestamp(6)
    release_date    DateTime   @db.Timestamp(6)
    expiration_date DateTime   @db.Timestamp(6)
    fk_customer_id  Int
    fk_seller_id    Int
    sale_item       SaleItem[]

    @@unique([order_number, fk_customer_id], map: "uc_sale_order_customer")
    @@index([fk_customer_id], map: "idx_sale_customer")
    @@index([fk_seller_id], map: "idx_sale_seller")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model SaleItem {
    id            Int     @id @default(autoincrement())
    quantity_item Int
    unitary_value Decimal @db.Decimal(10, 2)
    total_value   Decimal @db.Decimal(10, 2)
    fk_sale_id    Int
    fk_product_id Int
    product       Product @relation(fields: [fk_product_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
    sale          Sale    @relation(fields: [fk_sale_id], references: [id], onDelete: Cascade, onUpdate: NoAction)

    @@index([fk_product_id], map: "idx_sale_item_fk_product_id")
    @@index([fk_sale_id], map: "idx_sale_item_fk_sale_id")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model Seller {
    id     Int    @id @default(autoincrement())
    name   String @db.VarChar(255)
    email  String @unique(map: "uc_seller_email") @db.VarChar(100)
    branch String @db.VarChar(100)

    @@index([email], map: "idx_seller_email")
    @@index([name], map: "idx_seller_name")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model Supplier {
    id       Int        @id @default(autoincrement())
    name     String     @db.VarChar(255)
    email    String     @unique(map: "uc_supplier_email") @db.VarChar(100)
    purchase purchase[]

    @@index([email], map: "idx_supplier_email")
    @@index([name], map: "idx_supplier_name")
}

model User {
    id       Int     @id @default(autoincrement())
    name     String
    email    String  @unique
    password String
    admin    Boolean
}
