# 💸 Transactions Model <Badge type="tip" text="Pro" />

The `Transactions` model logs individual payment attempts and gateway responses. It provides a detailed audit trail of financial interactions.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `object_id` | bigint | Reference to the [Order](order) ID |
| `vendor_charge_id` | varchar | Gateway-provided ID (e.g., Stripe `ch_...`) |
| `payment_method` | varchar | e.g., `stripe`, `paypal` |
| `status` | varchar | `succeeded`, `failed`, `pending` |
| `total` | bigint | Transaction amount in cents |
| `meta` | longtext | JSON response from the payment gateway |

## Usage Examples

### Retrieving gateway meta data
```php
use FluentBookingPro\App\Models\Transactions;

$transaction = Transactions::where('vendor_charge_id', 'ch_3N...')->first();
$gatewayData = $transaction->meta; // Decodes automatically to array

echo "Card Brand: " . $gatewayData['source']['brand'];
```
