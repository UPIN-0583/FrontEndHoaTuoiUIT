# HoaTuoiUIT — Customer Store

Customer-facing e-commerce web application for an online flower shop.

The application provides product browsing, cart and checkout flows, customer accounts, orders, product reviews, and blog content.

## Overview

HoaTuoiUIT is the customer-facing part of a full-stack e-commerce system.

```text
Next.js / React
       ↓
   REST API
       ↓
 Spring Boot
       ↓
  PostgreSQL
```

The project is organized into three separate repositories:

* **Frontend** — customer-facing web application
* **Backend** — REST API and business logic
* **Admin** — administrative dashboard

## Tech Stack

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* Axios
* React Toastify
* Swiper
* Font Awesome
* next-sitemap

## Main Features

### Product Browsing

* Browse flower products
* Product detail pages
* Product-related content
* Product filtering and navigation

### Customer Authentication

* Login
* Account registration
* Password recovery
* Password confirmation flow

### Cart & Checkout

* Add products to cart
* Manage cart items
* Checkout flow
* Payment-method selection
* Order creation

### Orders

* Order confirmation
* Customer order information
* Order status information

### Product Reviews

* Product review functionality
* Review-related customer interactions

### Blog

* Blog listing
* Blog detail pages
* Blog content navigation

### Account

* Customer account pages
* Customer order-related information
* Account-related actions

## Project Structure

The application uses the Next.js App Router.

```text
src/
└── app/
    ├── about/
    ├── blog/
    ├── cart/
    ├── checkout/
    ├── confirmpassword/
    ├── contact/
    ├── forgetpassword/
    ├── login/
    ├── myaccount/
    ├── order-confirmation/
    ├── components/
    ├── layout.tsx
    └── page.tsx
```

## Application Integration

The frontend communicates with the Spring Boot backend through REST APIs.

Authentication, product data, cart operations, orders, reviews, and other application features are connected to the backend API.

The application also includes:

* Google Analytics integration
* Google Tag Manager integration
* Schema.org structured data
* SEO-related configuration

## Related Repositories

- **Backend:** https://github.com/UPIN-0583/backendhoatuoiuit
- **Admin:** https://github.com/UPIN-0583/admin-hoatuoituit

## Demo

[Watch Demo](https://drive.google.com/file/d/1GaBvQiyyy_MdYWSE1nWZoCXcR6ClVaqo/view)

## Notes

This repository contains the customer-facing frontend only. Backend services and administrative functionality are maintained in the related repositories.
