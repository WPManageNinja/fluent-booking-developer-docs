---
title: Spam Protection & Captcha Filters
description: Filters over the captcha providers, their verification requests, and the rules that skip a check.
---

# Spam Protection & Captcha Filters

Filters over the captcha providers, their verification requests, and the rules that skip a check.

5 unique filter hooks currently map to this category, across 5 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/captcha_providers`](#fluentbookingcaptchaproviders) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Captcha/CaptchaManager.php:34` |
| [`fluent_booking/recaptcha_remoteip`](#fluentbookingrecaptcharemoteip) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Captcha/RecaptchaProvider.php:108` |
| [`fluent_booking/recaptcha_v3_score_threshold`](#fluentbookingrecaptchav3scorethreshold) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Captcha/RecaptchaProvider.php:150` |
| [`fluent_booking/skip_captcha`](#fluentbookingskipcaptcha) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Captcha/CaptchaManager.php:207` |
| [`fluent_booking/turnstile_remoteip`](#fluentbookingturnstileremoteip) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Captcha/TurnstileProvider.php:90` |

<a id="fluentbookingcaptchaproviders"></a>

## `fluent_booking/captcha_providers`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Captcha/CaptchaManager.php:34`

**Example**

```php
add_filter('fluent_booking/captcha_providers', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingrecaptcharemoteip"></a>

## `fluent_booking/recaptcha_remoteip`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Captcha/RecaptchaProvider.php:108`

**Example**

```php
add_filter('fluent_booking/recaptcha_remoteip', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingrecaptchav3scorethreshold"></a>

## `fluent_booking/recaptcha_v3_score_threshold`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Captcha/RecaptchaProvider.php:150`

**Example**

```php
add_filter('fluent_booking/recaptcha_v3_score_threshold', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingskipcaptcha"></a>

## `fluent_booking/skip_captcha`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Captcha/CaptchaManager.php:207`

**Example**

```php
add_filter('fluent_booking/skip_captcha', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingturnstileremoteip"></a>

## `fluent_booking/turnstile_remoteip`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Captcha/TurnstileProvider.php:90`

**Example**

```php
add_filter('fluent_booking/turnstile_remoteip', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```
