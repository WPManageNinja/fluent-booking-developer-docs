# Order Model <Badge type="tip" text="Pro" />

The `Order` model manages financial records for bookings. It tracks payment status, totals, and currency for paid appointments.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `status` | varchar | `draft`, `pending`, `completed`, `failed`, `refunded`, `cancelled` |
| `parent_id` | bigint | Associated booking ID |
| `order_number` | varchar | Unique order display/reference number |
| `type` | varchar | Order type — `sale`, `refund`, `subscription` (default `sale`) |
| `customer_id` | bigint | WordPress User ID of the customer |
| `payment_method` | varchar | Payment gateway key (e.g., `stripe`, `paypal`, `offline`) |
| `payment_mode` | varchar | Payment environment — `test` / `live` |
| `payment_method_type` | varchar | Further method details (e.g., `card`, `bank_transfer`) |
| `payment_method_title` | varchar | Human-readable payment method label |
| `currency` | varchar | ISO currency code (e.g., `USD`, `EUR`) |
| `subtotal` | decimal | Amount before taxes and discounts |
| `discount_tax` | decimal | Discount tax amount |
| `discount_total` | decimal | Discount pre-tax |
| `shipping_tax` | decimal | Shipping tax |
| `shipping_total` | decimal | Shipping cost |
| `tax_total` | decimal | Total tax amount |
| `total_amount` | decimal | Final order total (after all fees/discounts) |
| `total_paid` | decimal | Amount collected so far |
| `rate` | decimal | Conversion rate if multi-currency (default 1) |
| `note` | text | Order notes |
| `ip_address` | text | Customer's IP address |
| `completed_at` | datetime | Payment completion time (nullable) |
| `refunded_at` | datetime | Refund processing time (nullable) |
| `uuid` | varchar | Public unique identifier |
| `created_at` | timestamp | Record creation time |
| `updated_at` | timestamp | Record last update time |

## Relations

### `booking`
Belongs to the parent [Booking](booking) (via `parent_id`).

### `transaction`
Has one [Transaction](transactions) record detailing the payment gateway hit.

### `items`
Has many [OrderItems](order-items) line items representing the booking fee and any addons (excludes items where type is `discount`).

### `discounts`
Has many [OrderItems](order-items) line items representing applied discounts (where type is `discount`).

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
