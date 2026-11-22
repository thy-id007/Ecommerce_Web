-- E-Commerce Order Database (MySQL)
CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(50)  NOT NULL,
    last_name   VARCHAR(50)  NOT NULL,
    email       VARCHAR(100) NOT NULL UNIQUE,
    phone       VARCHAR(20)  NOT NULL,
    address     TEXT         NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Categories (
    category_id   INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description   TEXT
);

CREATE TABLE Products (
    product_id   INT AUTO_INCREMENT PRIMARY KEY,
    category_id  INT NOT NULL,
    product_name VARCHAR(100)  NOT NULL,
    price        DECIMAL(10,2) NOT NULL,
    stock_qty    INT DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Orders (
    order_id        INT AUTO_INCREMENT PRIMARY KEY,
    order_code      VARCHAR(20) NOT NULL UNIQUE,   -- e.g. ORD-0001
    customer_id     INT NOT NULL,
    order_date      DATETIME DEFAULT CURRENT_TIMESTAMP,
    shipping_method VARCHAR(50),
    shipping_cost   DECIMAL(10,2) DEFAULT 0,
    total_amount    DECIMAL(10,2) NOT NULL,
    status          VARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Order_Items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id      INT NOT NULL,
    product_id    INT NOT NULL,
    quantity      INT NOT NULL CHECK (quantity > 0),
    unit_price    DECIMAL(10,2) NOT NULL,
    subtotal      DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id)   REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Sample data
INSERT INTO Categories (category_name) VALUES ('Computers'), ('Accessories');
INSERT INTO Products (category_id, product_name, price, stock_qty) VALUES
 (1, 'Laptop',   650.00, 10),
 (2, 'Mouse',     15.00, 50),
 (2, 'Keyboard',  25.00, 40),
 (1, 'Monitor',  120.00, 20);
