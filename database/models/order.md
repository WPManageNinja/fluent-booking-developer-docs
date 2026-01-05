# 🛒 Order Model <Badge type="tip" text="Pro" />

The `Order` model manages financial records for bookings. It tracks payment status, totals, and currency for paid appointments.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `order_number` | varchar | Unique order number |
| `parent_id` | bigint | Associated booking ID |
| `customer_id` | bigint | WordPress User ID of the customer |
| `type` | varchar | Order type (e.g., `booking`, `service`) |
| `total_amount` | decimal | Total price including taxes |
| `currency` | varchar | e.g., `USD`, `EUR` |
| `status` | varchar | `pending`, `paid`, `refunded`, `failed` |
| `payment_method_type` | varchar | e.g., `stripe`, `paypal` |
| `payment_mode` | varchar | `test` / `live` |
| `payment_method_title` | varchar | Human-readable payment method name |
| `discount_total` | decimal | Total discount applied |
| `tax_total` | decimal | Total tax applied |
| `ip_address` | varchar | Customer's IP address |
| `note` | text | Order notes |
| `completed_at` | timestamp | Payment completion time |
| `refunded_at` | timestamp | Refund processing time |
| `created_at` | timestamp | Record creation time |
| `subtotal` | decimal | Amount before taxes and discounts |
| `total_paid` | decimal | Amount collected so far |
| `uuid` | varchar | Public unique identifier |

## Relations

### `booking`
Belongs to the parent [Booking](booking).

### `transaction`
Has one [Transaction](transactions) record detailing the payment gateway hit.

### `items`
Has many line items representing the booking fee and any addons.

### `discounts`
Has many line items representing applied discounts.

## Usage Examples

### Checking if an order is fully paid
```php
use FluentBookingPro\App\Models\Order;

$order = Order::where('order_number', 'FB-12345')->first();

if ($order->total_paid >= $order->total_amount) {
    echo "Payment Complete";
}
```

### Accessing the related booking
```php
$booking = $order->booking;
echo "Booking for: " . $booking->first_name;
```
