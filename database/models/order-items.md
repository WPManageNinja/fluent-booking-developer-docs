# 📦 OrderItems Model (Pro)

The `OrderItems` model represents individual line items within an [Order](order). Each item can be a booking slot price, a service fee, or a discount.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `order_id` | bigint | Parent [Order](order) ID |
| `booking_id` | bigint | Associated [Booking](booking) ID |
| `item_name` | text | Name of the item (e.g., "Consultation Fee") |
| `type` | varchar | Item type (e.g., `booking_slot`, `discount`, `tax`) |
| `quantity` | int | Number of units |
| `item_price` | decimal | Price per unit |
| `item_total` | decimal | Total item price (`quantity` * `item_price`) |
| `rate` | decimal | Currency conversion rate |
| `line_meta` | text | (Serialized) Additional item metadata |
| `created_at` | timestamp | Record creation time |
| `updated_at` | timestamp | Record last update time |

## Relations

### `order`
Returns the parent [Order](order) model.

## Usage Examples

### Fetching items for an order
```php
$order = Order::find(1);
foreach ($order->items as $item) {
    echo $item->item_name . ': ' . $item->item_total;
}
```
