# E-Commerce Order Database – ERD

```mermaid
erDiagram
    CUSTOMERS ||--o{ ORDERS : "places"
    CATEGORIES ||--o{ PRODUCTS : "contains"
    ORDERS ||--|{ ORDER_ITEMS : "has"
    PRODUCTS ||--o{ ORDER_ITEMS : "appears in"

    CUSTOMERS {
        int customer_id PK
        varchar first_name
        varchar last_name
        varchar email UK
        varchar phone
        text address
        datetime created_at
    }
    CATEGORIES {
        int category_id PK
        varchar category_name
        text description
    }
    PRODUCTS {
        int product_id PK
        int category_id FK
        varchar product_name
        decimal price
        int stock_qty
    }
    ORDERS {
        int order_id PK
        varchar order_code UK "ORD-0001"
        int customer_id FK
        datetime order_date
        varchar shipping_method
        decimal shipping_cost
        decimal total_amount
        varchar status "Pending"
    }
    ORDER_ITEMS {
        int order_item_id PK
        int order_id FK
        int product_id FK
        int quantity
        decimal unit_price
        decimal subtotal
    }
```

## Relationships

| Relationship | Type | Explanation |
|---|---|---|
| Customers → Orders | 1 : N | One customer can place many orders; each order belongs to one customer. |
| Categories → Products | 1 : N | One category contains many products; each product belongs to one category. |
| Orders → Order_Items | 1 : N | One order has one or more order items. |
| Products → Order_Items | 1 : N | One product can appear in many order items. |
| Orders ↔ Products | M : N | Resolved through the **Order_Items** junction table. |

See [schema.sql](schema.sql) for the SQL implementation.
