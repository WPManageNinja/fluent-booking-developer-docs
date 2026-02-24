# Transactions Model <Badge type="tip" text="Pro" />

The `Transactions` model logs individual payment attempts and gateway responses. It provides a detailed audit trail of financial interactions.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `object_id` | bigint | Reference to the [Order](order) ID |
| `object_type` | varchar | Object type (e.g., `order`, `booking`, `subscription`) |
| `transaction_type` | varchar | `one_time`, `subscription`, `refund` |
| `subscription_id` | int | Related subscription ID (nullable) |
| `card_last_4` | int | Last 4 digits of the card used (nullable) |
| `card_brand` | varchar | Card brand e.g., `Visa`, `Mastercard` (nullable) |
| `vendor_charge_id` | varchar | Gateway-provided ID (e.g., Stripe `ch_...`) |
| `payment_method` | varchar | Payment gateway key (e.g., `stripe`, `paypal`) |
| `payment_method_type` | varchar | Further payment method details |
| `status` | varchar | `succeeded`, `failed`, `pending`, `refunded` |
| `total` | decimal(18,9) | Transaction amount |
| `rate` | decimal(10,5) | Currency conversion rate (default `1.00000`) |
| `uuid` | varchar | Unique identifier |
| `meta` | json | JSON response from the payment gateway (auto-decoded to array) |
| `created_at` | timestamp | Record creation time |
| `updated_at` | timestamp | Record last update time |

## Usage Examples

### Retrieving gateway metadata
```php
use FluentBookingPro\App\Models\Transactions;

$transaction = Transactions::where('vendor_charge_id', 'ch_3N...')->first();
$gatewayData = $transaction->meta; // Decodes automatically to array

echo "Card Brand: " . $gatewayData['source']['brand'];
```
