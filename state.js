// Global State Management for Lapro Solutions SPA
const STATE_KEY = "lapro_solutions_state_v6";

const DEFAULT_STATE = {
  currentUser: null, // Customer auth session
  adminUser: null,   // Separate Admin auth session
  registeredAdmins: [
    {
      name: "Lapro System Administrator",
      email: "admin@laprosolutions.com",
      password: "LaproAdminSecure2026!",
      role: "Super Admin",
      phone: "+91 80 4999 5000"
    }
  ],
  products: [...MOCK_PRODUCTS], // Dynamic inventory editable by Admin
  cart: [],
  registeredUsers: [
    {
      name: "Amit Sharma",
      email: "amit.sharma@gmail.com",
      phone: "+91 98450 12345",
      password: "password123",
      notificationPreferences: { email: true, sms: true, push: true },
      addresses: [
        { id: "addr-1", name: "Amit Sharma", phone: "+91 98450 12345", line: "12, Maple Drive, Indiranagar", city: "Bangalore", state: "Karnataka", pin: "560038", tag: "Home", default: true }
      ]
    },
    {
      name: "Priya Patel",
      email: "priya.patel@yahoo.com",
      phone: "+91 99000 54321",
      password: "password123",
      notificationPreferences: { email: true, sms: true, push: true },
      addresses: [
        { id: "addr-2", name: "Priya Patel", phone: "+91 99000 54321", line: "Sector 4, HSR Layout", city: "Bangalore", state: "Karnataka", pin: "560102", tag: "Home", default: true }
      ]
    }
  ],
  wishlist: [],
  orders: [
    {
      id: "ORD1001",
      invoiceId: "INV2026001",
      date: "Aug 28, 2026",
      time: "11:45 AM",
      status: "delivered",
      paymentMethod: "UPI QR",
      transactionRef: "TXN123456789",
      customerName: "Amit Sharma",
      customerEmail: "amit.sharma@gmail.com",
      totals: { subtotal: 24990, discount: 0, tax: 4498.2, total: 29488.2 },
      address: { name: "Amit Sharma", phone: "+91 98450 12345", line: "12, Maple Drive, Indiranagar", city: "Bangalore", state: "Karnataka", pin: "560038" },
      items: [
        { id: "deal-dell-latitude-7490", name: "Dell Latitude 7490 Touch (Core i7)", brand: "Dell", price: 24990, quantity: 1 }
      ]
    },
    {
      id: "ORD1002",
      invoiceId: "INV2026002",
      date: "Aug 30, 2026",
      time: "04:15 PM",
      status: "shipped",
      paymentMethod: "Card Payment",
      transactionRef: "TXN987654321",
      customerName: "Priya Patel",
      customerEmail: "priya.patel@yahoo.com",
      totals: { subtotal: 26990, discount: 0, tax: 4858.2, total: 31848.2 },
      address: { name: "Priya Patel", phone: "+91 99000 54321", line: "Sector 4, HSR Layout", city: "Bangalore", state: "Karnataka", pin: "560102" },
      items: [
        { id: "deal-hp-elitebook-840-g6", name: "HP EliteBook 840 G6 Ultralight", brand: "HP", price: 26990, quantity: 1 }
      ]
    }
  ],
  serviceTickets: [
    {
      id: "TKT1001",
      brand: "HP",
      model: "EliteBook 840",
      problem: "Broken Keyboard Keys",
      preferredDate: "Sep 02, 2026",
      status: "scheduled",
      serialNo: "HP2002",
      customerName: "Amit Sharma",
      customerEmail: "amit.sharma@gmail.com",
      address: { name: "Amit Sharma", phone: "+91 98450 12345", line: "12, Maple Drive, Indiranagar", city: "Bangalore", state: "Karnataka", pin: "560038" },
      estimate: {
        items: [
          { desc: "Replacement OEM HP Keyboard", amount: 2500 },
          { desc: "Technician Doorstep Labor Charges", amount: 499 }
        ],
        total: 2999
      },
      paymentStatus: "pending"
    },
    {
      id: "TKT1002",
      brand: "Dell",
      model: "Latitude 7490",
      problem: "Screen flickering & horizontal lines",
      preferredDate: "Aug 29, 2026",
      status: "repair_progress",
      serialNo: "DEL1001",
      customerName: "Priya Patel",
      customerEmail: "priya.patel@yahoo.com",
      address: { name: "Priya Patel", phone: "+91 99000 54321", line: "Sector 4, HSR Layout", city: "Bangalore", state: "Karnataka", pin: "560102" },
      estimate: {
        items: [
          { desc: "14.0 Inch FHD IPS Touch Replacement Display", amount: 5500 },
          { desc: "Technician Doorstep Labor Charges", amount: 499 }
        ],
        total: 5999
      },
      paymentStatus: "paid"
    }
  ],
  notifications: [
    { id: "notif-1", text: "⚡ Welcome to Lapro Solutions! Genuine hardware & doorstep repair services.", time: "Just now", read: false }
  ],
  compareList: [],
  currentView: "catalog",
  currentProduct: null,
  currentTicket: null,
  currentOrder: null,
  activeFilters: { 
    search: "", 
    category: "Crazy Deals", 
    subcategory: "All",
    brand: "All", 
    price: 200000, 
    processor: "All", 
    screenSize: "All",
    os: "All",
    sort: "featured",
    viewMode: "list" 
  },
  couponApplied: null,
  searchQuery: "",
  categories: [
    { id: "cat-0", name: "Crazy Deals", active: true },
    { id: "cat-1", name: "Desktops", active: true },
    { id: "cat-2", name: "Laptops", active: true },
    { id: "cat-3", name: "Accessories", active: true },
    { id: "cat-4", name: "Peripherals", active: true },
    { id: "cat-5", name: "Storages", active: true },
    { id: "cat-6", name: "Networking", active: true },
    { id: "cat-7", name: "Consumables", active: true },
    { id: "cat-8", name: "Servers & Workstations", active: true },
    { id: "cat-9", name: "Software's", active: true }
  ],
  faqs: [
    { id: "faq-1", q: "Do you provide doorstep laptop pickup & drop repairs?", a: "Yes, Lapro Solutions provides free doorstep pickup and drop-off services for laptop repairs across Bangalore." },
    { id: "faq-2", q: "What is your warranty period on spare parts?", a: "All screen panels, keyboards, batteries, and motherboard components replaced carry a 1-Year Assured Warranty." },
    { id: "faq-3", q: "How long does repair diagnostics take?", a: "Standard diagnostics take 4 to 24 hours from the time the laptop reaches our service center." },
    { id: "faq-4", q: "What payment options do you support?", a: "We support Credit/Debit Cards, Net Banking, and instant UPI QR payments (GPay, PhonePe, Paytm)." },
    { id: "faq-5", q: "Can I cancel my repair request after booking?", a: "Yes, you can cancel your service booking anytime before the technician arrives for pickup." }
  ]
};

class StateManager {
  constructor() {
    this.state = this.loadState();
    window.appState = this;
  }

  loadState() {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) {
      localStorage.setItem(STATE_KEY, JSON.stringify(DEFAULT_STATE));
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    try {
      const parsed = JSON.parse(raw);
      // Ensure products array exists
      if (!parsed.products || parsed.products.length === 0) {
        parsed.products = [...MOCK_PRODUCTS];
      }
      if (!parsed.registeredAdmins) {
        parsed.registeredAdmins = DEFAULT_STATE.registeredAdmins;
      }
      return parsed;
    } catch (e) {
      console.error("Error reading localstorage state, resetting...", e);
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
  }

  saveState() {
    localStorage.setItem(STATE_KEY, JSON.stringify(this.state));
    document.dispatchEvent(new CustomEvent("statechanged", { detail: this.state }));
  }

  reset() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.saveState();
  }

  // Views & Routing
  setView(viewName, params = {}) {
    this.state.currentView = viewName;
    if (params.product) this.state.currentProduct = params.product;
    if (params.ticket) this.state.currentTicket = params.ticket;
    if (params.order) this.state.currentOrder = params.order;
    if (params.category) {
      this.state.activeFilters.category = params.category;
      this.state.activeFilters.subcategory = params.subcategory || "All";
    }
    if (params.subcategory) {
      this.state.activeFilters.subcategory = params.subcategory;
    }
    this.saveState();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setSubcategoryFilter(category, subcategory) {
    this.state.activeFilters.category = category;
    this.state.activeFilters.subcategory = subcategory;
    this.state.activeFilters.search = "";
    this.setView("catalog");
  }

  // ======================== PRODUCT INVENTORY MANAGEMENT (ADMIN) ========================
  getProducts() {
    return this.state.products && this.state.products.length > 0 ? this.state.products : MOCK_PRODUCTS;
  }

  getProductById(id) {
    const list = this.getProducts();
    return list.find(p => p.id === id);
  }

  addProduct(productData) {
    if (!this.state.products) this.state.products = [...MOCK_PRODUCTS];
    
    // Generate unique ID
    const newId = "prod-" + Date.now();
    const newProduct = {
      id: newId,
      name: productData.name,
      brand: productData.brand || "Lapro",
      category: productData.category || "Laptops",
      subcategory: productData.subcategory || "General",
      condition: productData.condition || "Brand New Sealed",
      isCrazyDeal: Boolean(productData.isCrazyDeal),
      isNew: Boolean(productData.isNew),
      price: Number(productData.price) || 0,
      originalPrice: Number(productData.originalPrice) || Number(productData.price) || 0,
      discount: productData.originalPrice > productData.price 
        ? Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100) + "% OFF"
        : "0% OFF",
      savings: Math.max(0, (Number(productData.originalPrice) || 0) - (Number(productData.price) || 0)),
      gstITC: Math.round(Number(productData.price) * 0.18),
      stockLeft: Number(productData.stockLeft) || 10,
      claimedPercent: Math.floor(Math.random() * 50) + 20,
      rating: Number(productData.rating) || 5.0,
      reviewsCount: 1,
      screenSize: productData.screenSize || "N/A",
      processor: productData.processor || "N/A",
      os: productData.os || "N/A",
      specs: productData.specs || {
        processor: productData.processor || "Standard Specs",
        warranty: productData.warranty || "1 Year Warranty",
        features: productData.featuresSummary || "Genuine Product"
      },
      images: productData.image ? [productData.image] : ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&auto=format&fit=crop&q=80"],
      features: productData.features || ["100% Genuine", "Warranty Assured", "Fast Shipping"]
    };

    this.state.products.unshift(newProduct);
    this.addNotification(`Product "${newProduct.name}" added to inventory.`);
    this.saveState();
    return newProduct;
  }

  updateProduct(id, updatedData) {
    const idx = this.state.products.findIndex(p => p.id === id);
    if (idx > -1) {
      const orig = this.state.products[idx];
      const price = Number(updatedData.price) !== undefined ? Number(updatedData.price) : orig.price;
      const originalPrice = Number(updatedData.originalPrice) !== undefined ? Number(updatedData.originalPrice) : orig.originalPrice;
      
      this.state.products[idx] = {
        ...orig,
        ...updatedData,
        price: price,
        originalPrice: originalPrice,
        discount: originalPrice > price 
          ? Math.round(((originalPrice - price) / originalPrice) * 100) + "% OFF"
          : "0% OFF",
        savings: Math.max(0, originalPrice - price),
        gstITC: Math.round(price * 0.18)
      };

      this.addNotification(`Product "${this.state.products[idx].name}" updated.`);
      this.saveState();
      return true;
    }
    return false;
  }

  deleteProduct(id) {
    const prod = this.state.products.find(p => p.id === id);
    const name = prod ? prod.name : id;
    this.state.products = this.state.products.filter(p => p.id !== id);
    // Also remove from cart if present
    this.state.cart = this.state.cart.filter(item => item.id !== id);
    this.addNotification(`Product "${name}" deleted from catalog.`);
    this.saveState();
  }

  // ======================== ADMIN AUTHENTICATION ========================
  adminLogin(email, password) {
    const normalized = email.trim().toLowerCase();
    const admin = (this.state.registeredAdmins || []).find(a => a.email.toLowerCase() === normalized);

    if (!admin) {
      return { success: false, message: "Unauthorized: No admin account found with this email." };
    }
    if (admin.password !== password) {
      return { success: false, message: "Invalid administrator credentials. Access Denied." };
    }

    this.state.adminUser = {
      name: admin.name,
      email: admin.email,
      role: admin.role || "Administrator"
    };
    this.addNotification(`Admin Logged In: ${admin.name}`);
    this.saveState();
    return { success: true };
  }

  adminRegister(name, email, password, adminSecretKey) {
    if (adminSecretKey !== "LAPRO_ADMIN_SECRET_2026") {
      return { success: false, message: "Invalid Master Admin Security Key. Registration blocked." };
    }
    const normalized = email.trim().toLowerCase();
    const existing = (this.state.registeredAdmins || []).some(a => a.email.toLowerCase() === normalized);
    if (existing) {
      return { success: false, message: "An admin with this email is already registered." };
    }

    const newAdmin = {
      name: name.trim(),
      email: normalized,
      password: password,
      role: "Store Admin",
      phone: "+91 80 4999 5000"
    };
    this.state.registeredAdmins.push(newAdmin);
    this.state.adminUser = { name: newAdmin.name, email: newAdmin.email, role: newAdmin.role };
    this.addNotification(`New Admin Registered: ${newAdmin.name}`);
    this.saveState();
    return { success: true };
  }

  adminLogout() {
    this.state.adminUser = null;
    this.addNotification("Admin logged out.");
    this.setView("home");
  }

  // ======================== CUSTOMER AUTHENTICATION ========================
  customerLogin(email, password) {
    const normalized = email.trim().toLowerCase();
    
    // Explicitly reject if attempting to use admin credentials in customer portal
    const isAdmin = (this.state.registeredAdmins || []).some(a => a.email.toLowerCase() === normalized);
    if (isAdmin) {
      return { success: false, message: "This email is reserved for Admin Portal. Please use the Admin Portal." };
    }

    const user = (this.state.registeredUsers || []).find(u => u.email.toLowerCase() === normalized);
    if (!user) {
      return { success: false, message: "No customer account registered with this email." };
    }
    if (user.password !== password) {
      return { success: false, message: "Invalid password. Please check your customer credentials." };
    }

    this.state.currentUser = user;
    this.addNotification(`Welcome back, ${user.name}!`);
    this.saveState();
    return { success: true };
  }

  customerRegister(name, email, phone, password) {
    const normalized = email.trim().toLowerCase();
    
    // Prevent registering admin emails as customer
    const isAdmin = (this.state.registeredAdmins || []).some(a => a.email.toLowerCase() === normalized);
    if (isAdmin) {
      return { success: false, message: "This email is reserved for Admin Portal." };
    }

    if (!this.state.registeredUsers) {
      this.state.registeredUsers = [];
    }
    const existing = this.state.registeredUsers.some(u => u.email.toLowerCase() === normalized);
    if (existing) {
      return { success: false, message: "An account is already registered with this email." };
    }

    const newUser = {
      name: name.trim(),
      email: normalized,
      phone: phone.trim(),
      password: password,
      notificationPreferences: { email: true, sms: true, push: true },
      addresses: []
    };

    this.state.registeredUsers.push(newUser);
    this.state.currentUser = newUser;
    this.addNotification("Customer account registered successfully!");
    this.saveState();
    return { success: true };
  }

  customerLogout() {
    this.state.currentUser = null;
    this.state.cart = [];
    this.state.wishlist = [];
    this.addNotification("Customer logged out.");
    this.saveState();
  }

  // ======================== CART & WISHLIST ========================
  addToCart(productId, qty = 1) {
    const existing = this.state.cart.find(item => item.id === productId);
    const prod = this.getProductById(productId);
    if (!prod) return;

    if (existing) {
      existing.quantity += qty;
    } else {
      this.state.cart.push({ id: productId, quantity: qty, price: prod.price });
    }
    this.addNotification(`${prod.name} added to cart!`);
    this.saveState();
  }

  updateCartQty(productId, qty) {
    const item = this.state.cart.find(i => i.id === productId);
    if (item) {
      item.quantity += qty;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
        return;
      }
    }
    this.saveState();
  }

  removeFromCart(productId) {
    this.state.cart = this.state.cart.filter(item => item.id !== productId);
    this.saveState();
  }

  applyCoupon(code) {
    const normalized = code.toUpperCase().trim();
    if (normalized === "LAPRO10" || normalized === "WELCOME10") {
      this.state.couponApplied = { code: normalized, discountPercent: 10, type: "percent" };
      this.saveState();
      return true;
    } else if (normalized === "CRAZY15") {
      this.state.couponApplied = { code: "CRAZY15", discountAmount: 1500, type: "fixed" };
      this.saveState();
      return true;
    } else if (normalized === "SAVE1000") {
      this.state.couponApplied = { code: "SAVE1000", discountAmount: 1000, type: "fixed" };
      this.saveState();
      return true;
    }
    return false;
  }

  removeCoupon() {
    this.state.couponApplied = null;
    this.saveState();
  }

  getCartTotals() {
    let subtotal = 0;
    this.state.cart.forEach(item => {
      subtotal += item.price * item.quantity;
    });

    let discount = 0;
    if (this.state.couponApplied) {
      if (this.state.couponApplied.type === "percent") {
        discount = subtotal * (this.state.couponApplied.discountPercent / 100);
      } else if (this.state.couponApplied.type === "fixed") {
        discount = Math.min(subtotal, this.state.couponApplied.discountAmount);
      }
    }

    const shipping = subtotal > 10000 || subtotal === 0 ? 0 : 150;
    const total = subtotal - discount + shipping;

    return { subtotal, discount, shipping, total };
  }

  toggleWishlist(productId) {
    const index = this.state.wishlist.indexOf(productId);
    if (index > -1) {
      this.state.wishlist.splice(index, 1);
      this.addNotification("Removed from Wishlist.");
    } else {
      this.state.wishlist.push(productId);
      this.addNotification("Added to Wishlist!");
    }
    this.saveState();
  }

  toggleComparison(productId) {
    const idx = this.state.compareList.indexOf(productId);
    if (idx > -1) {
      this.state.compareList.splice(idx, 1);
      this.addNotification("Removed from Comparison.");
    } else {
      if (this.state.compareList.length >= 3) {
        alert("You can compare up to 3 laptops at a time.");
        return;
      }
      this.state.compareList.push(productId);
      this.addNotification("Added to Comparison.");
    }
    this.saveState();
  }

  // ======================== ORDERS & SERVICE TICKETS ========================
  placeOrder(addressId, paymentMethod) {
    const totals = this.getCartTotals();
    const address = this.state.currentUser && this.state.currentUser.addresses 
      ? this.state.currentUser.addresses.find(a => a.id === addressId) 
      : { name: "Valued Customer", phone: "+91 98765 43210", line: "Doorstep Delivery Address", city: "Bangalore", state: "Karnataka", pin: "560001" };

    const itemsOrdered = this.state.cart.map(item => {
      const prod = this.getProductById(item.id);
      return {
        id: item.id,
        name: prod ? prod.name : "Hardware Item",
        brand: prod ? prod.brand : "Lapro",
        price: item.price,
        quantity: item.quantity,
        discount: prod ? prod.discount : "0% OFF",
        image: prod && prod.images ? prod.images[0] : ""
      };
    });

    const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000);
    const invoiceId = "INV-2026-" + Math.floor(10000 + Math.random() * 90000);
    const transactionRef = "TXN" + Math.floor(100000000 + Math.random() * 900000000);

    const newOrder = {
      id: orderId,
      invoiceId: invoiceId,
      transactionRef: transactionRef,
      customerName: this.state.currentUser ? this.state.currentUser.name : "Guest Customer",
      customerEmail: this.state.currentUser ? this.state.currentUser.email : "customer@laprosolutions.com",
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      items: itemsOrdered,
      totals: totals,
      address: address,
      paymentMethod: paymentMethod,
      status: "confirmed",
      timeline: [
        { status: "placed", label: "Order Placed", date: new Date().toLocaleString('en-IN'), done: true },
        { status: "confirmed", label: "Payment Confirmed", date: new Date().toLocaleString('en-IN'), done: true },
        { status: "packed", label: "Packed", date: "Pending", done: false },
        { status: "shipped", label: "Shipped", date: "Pending", done: false },
        { status: "out_for_delivery", label: "Out for Delivery", date: "Pending", done: false },
        { status: "delivered", label: "Delivered", date: "Pending", done: false }
      ],
      trackingId: "LP" + Math.floor(1000000000 + Math.random() * 9000000000),
      deliveryPartner: "BlueDart Express"
    };

    this.state.orders.unshift(newOrder);
    this.state.cart = [];
    this.state.couponApplied = null;
    this.state.currentOrder = orderId;
    this.addNotification(`Order ${orderId} placed successfully!`);
    this.saveState();
    return orderId;
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.state.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      const step = order.timeline.find(t => t.status === newStatus);
      if (step) {
        step.done = true;
        step.date = new Date().toLocaleString('en-IN');
      }
      this.addNotification(`Order ${orderId} status changed to ${newStatus}`);
      this.saveState();
    }
  }

  bookServiceTicket(ticketData) {
    const ticketId = "TKT" + Math.floor(1000 + Math.random() * 9000);
    const address = ticketData.mode === "Pickup & Drop" 
      ? (this.state.currentUser && this.state.currentUser.addresses ? this.state.currentUser.addresses.find(a => a.id === ticketData.addressId) : null)
      : null;

    const newTicket = {
      id: ticketId,
      serviceType: ticketData.serviceType,
      problem: ticketData.problem,
      mode: ticketData.mode,
      address: address,
      customerName: this.state.currentUser ? this.state.currentUser.name : "Valued Customer",
      customerEmail: this.state.currentUser ? this.state.currentUser.email : "service@laprosolutions.com",
      preferredDate: ticketData.preferredDate,
      description: ticketData.description,
      brand: ticketData.brand || "Dell",
      model: ticketData.model || "Inspiron 15",
      serialNo: ticketData.serialNo || "LAP" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: "received",
      timeline: [
        { status: "received", label: "Request Received", date: new Date().toLocaleString('en-IN'), done: true },
        { status: "scheduled", label: "Pickup Scheduled", date: "Pending", done: false },
        { status: "picked_up", label: "Picked up", date: "Pending", done: false },
        { status: "center", label: "Received at Service Center", date: "Pending", done: false },
        { status: "diagnosing", label: "Diagnosis Completed", date: "Pending", done: false },
        { status: "estimate_sent", label: "Estimate Sent to Customer", date: "Pending", done: false },
        { status: "approved", label: "Customer Approved & Paid", date: "Pending", done: false },
        { status: "repair_progress", label: "Repair In Progress", date: "Pending", done: false },
        { status: "qc", label: "Quality Check Completed", date: "Pending", done: false },
        { status: "ready", label: "Ready for Delivery/Pickup", date: "Pending", done: false },
        { status: "delivered", label: "Delivered & Closed", date: "Pending", done: false }
      ],
      estimate: null,
      paymentStatus: "pending"
    };

    this.state.serviceTickets.unshift(newTicket);
    this.state.currentTicket = ticketId;
    this.addNotification(`Service ticket ${ticketId} created successfully.`);
    this.saveState();
    return ticketId;
  }

  updateTicketStatus(ticketId, newStatus, estimateData = null) {
    const ticket = this.state.serviceTickets.find(t => t.id === ticketId);
    if (ticket) {
      ticket.status = newStatus;
      if (estimateData) {
        ticket.estimate = estimateData;
      }
      const step = ticket.timeline.find(t => t.status === newStatus);
      if (step) {
        step.done = true;
        step.date = new Date().toLocaleString('en-IN');
      }
      this.addNotification(`Ticket ${ticketId} updated to ${newStatus}`);
      this.saveState();
    }
  }

  // ======================== NOTIFICATIONS ========================
  addNotification(text) {
    const newNotif = {
      id: "notif-" + Date.now(),
      text: text,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    this.state.notifications.unshift(newNotif);
    if (this.state.notifications.length > 20) {
      this.state.notifications.pop();
    }
  }

  markAllNotificationsRead() {
    this.state.notifications.forEach(n => n.read = true);
    this.saveState();
  }

  clearNotifications() {
    this.state.notifications = [];
    this.saveState();
  }

  addAddress(address) {
    if (!this.state.currentUser) return;
    if (!this.state.currentUser.addresses) this.state.currentUser.addresses = [];
    address.id = "addr-" + Date.now();
    if (address.isDefault || this.state.currentUser.addresses.length === 0) {
      address.isDefault = true;
      this.state.currentUser.addresses.forEach(a => a.isDefault = false);
    }
    this.state.currentUser.addresses.push(address);
    this.saveState();
  }
}

const appState = new StateManager();
