-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100),
    "city" VARCHAR(100),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255),
    "amount" INTEGER NOT NULL,
    "fk_id_unit" INTEGER NOT NULL,
    "fk_id_category" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_unit" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(3) NOT NULL,

    CONSTRAINT "product_unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase" (
    "id" SERIAL NOT NULL,
    "order_number" INTEGER NOT NULL,
    "purchase_order_ps" VARCHAR(255),
    "order_date" TIMESTAMP(6) NOT NULL,
    "release_date" TIMESTAMP(6) NOT NULL,
    "expiration_date" TIMESTAMP(6) NOT NULL,
    "fk_supplier_id" INTEGER NOT NULL,

    CONSTRAINT "purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_item" (
    "id" SERIAL NOT NULL,
    "quantity_item" INTEGER NOT NULL,
    "unitary_value" DECIMAL(10,2) NOT NULL,
    "total_value" DECIMAL(10,2) NOT NULL,
    "fk_purchase_id" INTEGER NOT NULL,
    "fk_product_id" INTEGER NOT NULL,

    CONSTRAINT "purchase_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale" (
    "id" SERIAL NOT NULL,
    "order_number" INTEGER NOT NULL,
    "sale_order_ps" VARCHAR(255),
    "order_date" TIMESTAMP(6) NOT NULL,
    "release_date" TIMESTAMP(6) NOT NULL,
    "expiration_date" TIMESTAMP(6) NOT NULL,
    "fk_customer_id" INTEGER NOT NULL,
    "fk_seller_id" INTEGER NOT NULL,

    CONSTRAINT "sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_item" (
    "id" SERIAL NOT NULL,
    "quantity_item" INTEGER NOT NULL,
    "unitary_value" DECIMAL(10,2) NOT NULL,
    "total_value" DECIMAL(10,2) NOT NULL,
    "fk_sale_id" INTEGER NOT NULL,
    "fk_product_id" INTEGER NOT NULL,

    CONSTRAINT "sale_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seller" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "branch" VARCHAR(100) NOT NULL,

    CONSTRAINT "seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" BOOLEAN NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- CreateIndex
CREATE INDEX "idx_product_description" ON "product"("description");

-- CreateIndex
CREATE UNIQUE INDEX "uc_product_category_description" ON "product_category"("description");

-- CreateIndex
CREATE INDEX "idx_product_category_description" ON "product_category"("description");

-- CreateIndex
CREATE UNIQUE INDEX "uc_product_unit_description" ON "product_unit"("description");

-- CreateIndex
CREATE INDEX "idx_product_unit_description" ON "product_unit"("description");

-- CreateIndex
CREATE INDEX "idx_supplier_supplier" ON "purchase"("fk_supplier_id");

-- CreateIndex
CREATE UNIQUE INDEX "uc_purchase_order_customer" ON "purchase"("order_number", "fk_supplier_id");

-- CreateIndex
CREATE INDEX "idx_purchase_item_fk_product_id" ON "purchase_item"("fk_product_id");

-- CreateIndex
CREATE INDEX "idx_purchase_item_fk_purchase_id" ON "purchase_item"("fk_purchase_id");

-- CreateIndex
CREATE INDEX "idx_sale_customer" ON "sale"("fk_customer_id");

-- CreateIndex
CREATE INDEX "idx_sale_seller" ON "sale"("fk_seller_id");

-- CreateIndex
CREATE UNIQUE INDEX "uc_sale_order_customer" ON "sale"("order_number", "fk_customer_id");

-- CreateIndex
CREATE INDEX "idx_sale_item_fk_product_id" ON "sale_item"("fk_product_id");

-- CreateIndex
CREATE INDEX "idx_sale_item_fk_sale_id" ON "sale_item"("fk_sale_id");

-- CreateIndex
CREATE UNIQUE INDEX "uc_seller_email" ON "seller"("email");

-- CreateIndex
CREATE INDEX "idx_seller_email" ON "seller"("email");

-- CreateIndex
CREATE INDEX "idx_seller_name" ON "seller"("name");

-- CreateIndex
CREATE UNIQUE INDEX "uc_supplier_email" ON "supplier"("email");

-- CreateIndex
CREATE INDEX "idx_supplier_email" ON "supplier"("email");

-- CreateIndex
CREATE INDEX "idx_supplier_name" ON "supplier"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_fk_id_category_fkey" FOREIGN KEY ("fk_id_category") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_fk_id_unit_fkey" FOREIGN KEY ("fk_id_unit") REFERENCES "product_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_fk_supplier_id_fkey" FOREIGN KEY ("fk_supplier_id") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchase_item" ADD CONSTRAINT "purchase_item_fk_product_id_fkey" FOREIGN KEY ("fk_product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchase_item" ADD CONSTRAINT "purchase_item_fk_purchase_id_fkey" FOREIGN KEY ("fk_purchase_id") REFERENCES "purchase"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "sale_fk_customer_id_fkey" FOREIGN KEY ("fk_customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sale_item" ADD CONSTRAINT "sale_item_fk_product_id_fkey" FOREIGN KEY ("fk_product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sale_item" ADD CONSTRAINT "sale_item_fk_sale_id_fkey" FOREIGN KEY ("fk_sale_id") REFERENCES "sale"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
