# 🛒 Order Model <Badge type="tip" text="Pro" />

The `Order` model manages financial records for bookings. It tracks payment status, totals, and currency for paid appointments.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `parent_id` | bigint | Reference to the [Booking](booking) ID |
| `order_number` | varchar | Unique display identifier for the order |
| `status` | varchar | `pending`, `processing`, `completed`, `refunded` |
| `currency` | varchar | ISO currency code (e.g., USD, EUR) |
| `subtotal` | decimal | Amount before taxes and discounts |
| `discount_total` | decimal | Total discount applied |
| `tax_total` | decimal | Total tax amount |
| `total_amount` | decimal | Final total price |
| `total_paid` | decimal | Amount collected so far |
| `payment_method` | varchar | e.g., `stripe`, `paypal` |
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
