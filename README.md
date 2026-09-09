# Laptop Experts - Laptop Sales & Service Web Application

A fully responsive, interactive, production-grade Single Page Application (SPA) built for **Laptop Experts**, presenting complete customer-facing features for e-commerce shopping and repair services.

## Features Included

### 1. E-Commerce Flow
- **Product Catalog**: Advanced search, categories filter, brand selectors, price range slider, and processor filter.
- **Product Comparison**: Add up to 3 laptops to compare their technical specifications side-by-side.
- **Product Details**: Multi-image view, detailed specs table, dynamic delivery pincode checking, and user rating/reviews system.
- **Shopping Cart**: Real-time updating cart quantities, promo coupon application (`WELCOME10` for 10% off or `SAVE1000` for a flat ₹1000 discount).
- **Checkout & Payment**: Address book management (add/edit addresses), secure mock payment gateways (dynamic QR scanner simulation for UPI, card payment, and net banking).
- **Order Tracking**: Visual status timeline (Order Confirmed → Packed → Shipped → Out for Delivery → Delivered) with integrated mock shipping progress controls.
- **GST Invoice Download**: Automatically generated GST tax invoice with dynamic print styles, matching standard tax formats (18% GST).

### 2. Service & Repair Flow
- **Service Booking**: Step-by-step wizard to select service type (Repair, Upgrade, Maintenance, AMC), problem type, service mode (Pickup & Drop / Walk-in), and calendar date.
- **Service Status Tracker**: Live status pipeline (Request Received → Diagnosis → Estimate Sent → Repair → QC → Delivered).
- **Estimate Approval Panel**: Detailed parts & labor pricing breakdown. Accept/Reject options that directly advance repair workflows.
- **Service Payments**: Secure checkout for approved repair estimates.
- **Service History**: Consolidated log of past service tickets and states.

### 3. General Pages & Account Profile
- **Authentication**: Interactive Customer Login / Registration popup modal.
- **Customer Profile**: User data display, active orders lists, active service bookings, and saved addresses.
- **Global Header Notifications**: Dropdown panel showing real-time updates when order tracking steps change or estimates are generated.
- **Information Pages**: Home page with hero sliders, About Us, Contact Us with working email/feedback forms, FAQ dropdown accordion, and Privacy Policy.

---

## How to Run the Application

This is a self-contained client-side web application. It requires **no server installation, backend database, or dependencies**. It runs directly in the browser and persists all changes (cart items, tickets, addresses, and orders) using the browser's `localStorage`.

1. **Open the file**: Double-click `index.html` (or right-click and choose "Open in Chrome/Firefox/Edge").
2. **Launch with Server (Optional)**: If you want to run it via a local development server:
   - Python: Run `python -m http.server 8000` in the directory and go to `http://localhost:8000`.
   - Node: Run `npx serve` or `npm install -g live-server && live-server`.

---

## Interactive Simulation Controls (For Testing)

To allow you to experience the complete customer journey without waiting for real-world packing, shipping, or service diagnostics:
- **Order Tracking Screen**: When viewing an active order's tracking timeline, a **Simulator Panel** will appear at the bottom of the page. You can click buttons to manually transition the order status (e.g., set to "Shipped" or "Delivered").
- **Service Booking Screen**: After submitting a service ticket, go to "Track Service". A **Simulator Panel** will let you advance the ticket status (e.g., mark "Diagnosis Complete", send an "Estimate", complete the repair, etc.) to trigger approvals and service payments.
- **Notifications Panel**: Real-time notifications (such as "Order Shipped" or "Repair Estimate Sent") will automatically pop up in the header menu as you trigger changes.
