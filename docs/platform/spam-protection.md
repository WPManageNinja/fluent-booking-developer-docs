---
title: Spam Protection
description: Source-verified reference for the FluentBooking captcha providers and the contract a custom provider implements.
---

# Spam Protection

A captcha provider guards the public booking form. <span class="pro-badge">PRO</span> ships 2 providers, and an add-on can register its own. Each provider owns its settings, its verification call, and the data the public app needs to render the widget.

Settings are stored in the `fluent_booking_spam_protection` option. Secret keys are encrypted at rest and masked before they reach the browser.

## Providers

| Key | Name | Class | Secret fields |
| --- | --- | --- | --- |
| `recaptcha` | Google reCAPTCHA | `RecaptchaProvider` | `v3_secret_key`, `v2_secret_key` |
| `turnstile` | Cloudflare Turnstile | `TurnstileProvider` | `secret_key` |

## Google reCAPTCHA

- **Key:** `recaptcha`
- **Class:** `RecaptchaProvider`
- **Token field:** `g-recaptcha-response`
- **Verification endpoint:** `https://www.google.com/recaptcha/api/siteverify`
- **Source:** `fluent-booking-pro/app/Services/Captcha/RecaptchaProvider.php`

| Setting | Default |
| --- | --- |
| `version` | `'v3'` |
| `v3_site_key` | `''` |
| `v3_secret_key` | `''` |
| `v3_score_threshold` | `0.5` |
| `v2_site_key` | `''` |
| `v2_secret_key` | `''` |

## Cloudflare Turnstile

- **Key:** `turnstile`
- **Class:** `TurnstileProvider`
- **Token field:** `cf-turnstile-response`
- **Verification endpoint:** `https://challenges.cloudflare.com/turnstile/v0/siteverify`
- **Source:** `fluent-booking-pro/app/Services/Captcha/TurnstileProvider.php`

| Setting | Default |
| --- | --- |
| `site_key` | `''` |
| `secret_key` | `''` |

## Writing your own provider

Extend `AbstractCaptchaProvider` and implement every abstract method, then register the instance on `fluent_booking/captcha_providers`:

| Method | Returns |
| --- | --- |
| `getKey()` | The provider slug, used as the settings key. |
| `getTitle()` | The translated name the settings page shows. |
| `getDefaults()` | The settings array with its default values. |
| `sanitize($input, $prev = [])` | The settings to store, sanitized from the submitted input. |
| `secretFields()` | The setting names to encrypt at rest. |
| `isConfigured($settings)` | `true` when the stored settings are complete enough to verify a token. |
| `publicVars($settings)` | The data the public booking app needs to render the widget. |
| `verify($settings, $token)` | `['status' => valid/invalid/unreachable, 'code' => string]`. |
| `validateCredentials($settings, $token)` | `['valid' => bool, 'message' => string]`, used by the settings page test. |

```php
add_filter('fluent_booking/captcha_providers', function ($providers) {
    $providers['my_captcha'] = new MyCaptchaProvider();

    return $providers;
});
```

The manager keys every provider by its own `getKey()`, so the array key above is only a convenience. A value that does not extend `AbstractCaptchaProvider` is dropped.

Parsed from `fluent-booking-pro/app/Services/Captcha/CaptchaManager.php`.
