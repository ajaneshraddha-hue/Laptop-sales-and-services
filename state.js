// Global State Management for Lapro Solutions SPA
const STATE_KEY = "lapro_solutions_state_v10";

const DEFAULT_STATE = {
  currentUser: null, // Customer auth session
  adminUser: null,   // Separate Admin auth session
  registeredAdmins: [
    {
      name: "Lapro System Administrator",
      email: "admin@laprosolutions.com",
      password: "LaproAdminSecure2026!",
      role: "Super Admin",
      phone: "+91 7996389264"
    }
  ],
  products: MOCK_PRODUCTS.map(p => ({
    ...p,
    minPrice: p.minPrice || Math.round(p.price * 0.88)
  })),
  cart: [],
  registeredUsers: [
    {
      name: "Amit Sharma",
      email: "amit.sharma@gmail.com",
      phone: "+91 98450 12345",
      password: "password123",
      notificationPreferences: { email: true, sms: true, push: true },
      addresses: [
        { id: "addr-1", name: "Amit Sharma", phone: "+91 98450 12345", line: "12, Maple Drive, Indiranagar", city: "Bangalore", state: "Karnataka", pin: "560038", tag: "Home", default: true },
        { id: "addr-3", name: "Amit Sharma (Office)", phone: "+91 98450 12345", line: "Tech Park 4, Marathahalli", city: "Bangalore", state: "Karnataka", pin: "560037", tag: "Office", default: false }
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
        { id: "deal-dell-latitude-7490", name: "Dell Latitude 7490 Touch (Core i7)", category: "Laptops", brand: "Dell", price: 24990, quantity: 1, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=700&auto=format&fit=crop&q=80" }
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
        { id: "deal-hp-elitebook-840-g6", name: "HP EliteBook 840 G6 Ultralight", category: "Laptops", brand: "HP", price: 26990, quantity: 1, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&auto=format&fit=crop&q=80" }
      ]
    },
    {
      id: "ORD1003",
      invoiceId: "INV2026003",
      date: "Sep 01, 2026",
      time: "02:30 PM",
      status: "delivered",
      paymentMethod: "UPI QR",
      transactionRef: "TXN456789123",
      customerName: "Amit Sharma",
      customerEmail: "amit.sharma@gmail.com",
      totals: { subtotal: 22990, discount: 0, tax: 4138.2, total: 27128.2 },
      address: { name: "Amit Sharma", phone: "+91 98450 12345", line: "12, Maple Drive, Indiranagar", city: "Bangalore", state: "Karnataka", pin: "560038" },
      items: [
        { id: "desktop-dell-optiplex-7070", name: "Dell OptiPlex 7070 Micro Tiny PC", category: "Desktops", brand: "Dell", price: 22990, quantity: 1, image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=700&auto=format&fit=crop&q=80" }
      ]
    },
    {
      id: "ORD1004",
      invoiceId: "INV2026004",
      date: "Sep 03, 2026",
      time: "10:15 AM",
      status: "confirmed",
      paymentMethod: "Net Banking",
      transactionRef: "TXN789123456",
      customerName: "Priya Patel",
      customerEmail: "priya.patel@yahoo.com",
      totals: { subtotal: 7906, discount: 0, tax: 1423.08, total: 9329.08 },
      address: { name: "Priya Patel", phone: "+91 99000 54321", line: "Sector 4, HSR Layout", city: "Bangalore", state: "Karnataka", pin: "560102" },
      items: [
        { id: "monitor-lenovo-thinkvision-s24e", name: "Lenovo ThinkVision S24e-20 23.8\" Monitor", category: "Peripherals", brand: "Lenovo", price: 7906, quantity: 1, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&auto=format&fit=crop&q=80" }
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
  currentView: "home",
  currentProduct: null,
  currentTicket: null,
  currentOrder: null,
  activeFilters: { 
    search: "", 
    category: "Desktops", 
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
    { id: "cat-1", name: "Desktops", icon: "🖥️", active: true },
    { id: "cat-2", name: "Laptops", icon: "💻", active: true },
    { id: "cat-3", name: "Accessories", icon: "🎒", active: true },
    { id: "cat-4", name: "Peripherals", icon: "🖨️", active: true },
    { id: "cat-5", name: "Storages", icon: "💾", active: true },
    { id: "cat-6", name: "Networking", icon: "🌐", active: true },
    { id: "cat-7", name: "Consumables", icon: "🖨️", active: true },
    { id: "cat-8", name: "Servers & Workstations", icon: "🖧", active: true },
    { id: "cat-9", name: "Software's", icon: "💿", active: true }
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
      if (!parsed.products || parsed.products.length === 0) {
        parsed.products = MOCK_PRODUCTS.map(p => ({
          ...p,
          minPrice: p.minPrice || Math.round(p.price * 0.88)
        }));
      } else {
        // ensure minPrice exists on all products
        parsed.products = parsed.products.map(p => ({
          ...p,
          minPrice: p.minPrice || Math.round(p.price * 0.88)
        }));
      }
      if (!parsed.categories || parsed.categories.length === 0) {
        parsed.categories = DEFAULT_STATE.categories;
      }
      if (!parsed.registeredAdmins) {
        parsed.registeredAdmins = DEFAULT_STATE.registeredAdmins;
      }
      if (!parsed.registeredUsers) {
        parsed.registeredUsers = DEFAULT_STATE.registeredUsers;
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
    if (params.tab) {
      this.state.profileActiveTab = params.tab;
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
    const dealPrice = Number(productData.price) || 0;
    const mrpPrice = Number(productData.originalPrice) || dealPrice;
    const minPrice = Number(productData.minPrice) || Math.round(dealPrice * 0.88);

    // Multi-image array support from local file uploads or text URLs
    let images = [];
    if (Array.isArray(productData.images) && productData.images.length > 0) {
      images = productData.images;
    } else if (productData.image) {
      images = [productData.image];
    } else {
      images = ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&auto=format&fit=crop&q=80"];
    }

    const newProduct = {
      id: newId,
      name: productData.name,
      brand: productData.brand || "Lapro",
      category: productData.category || "Laptops",
      subcategory: productData.subcategory || "General",
      condition: productData.condition || "Brand New Sealed",
      isCrazyDeal: Boolean(productData.isCrazyDeal),
      isNew: Boolean(productData.isNew !== undefined ? productData.isNew : true),
      price: dealPrice,
      originalPrice: mrpPrice,
      minPrice: minPrice, // Minimum acceptable price for customer negotiation
      discount: mrpPrice > dealPrice 
        ? Math.round(((mrpPrice - dealPrice) / mrpPrice) * 100) + "% OFF"
        : "0% OFF",
      savings: Math.max(0, mrpPrice - dealPrice),
      gstITC: Math.round(dealPrice * 0.18),
      stockLeft: Number(productData.stockLeft) || 10,
      claimedPercent: Math.floor(Math.random() * 30) + 10,
      rating: Number(productData.rating) || 5.0,
      reviewsCount: 1,
      screenSize: productData.screenSize || "N/A",
      processor: productData.processor || "N/A",
      os: productData.os || "N/A",
      specs: productData.specs || {
        processor: productData.processor || "Standard Specs",
        warranty: productData.warranty || "1 Year Doorstep Warranty",
        features: productData.featuresSummary || "Certified Genuine Hardware"
      },
      images: images,
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
      const price = updatedData.price !== undefined ? Number(updatedData.price) : orig.price;
      const originalPrice = updatedData.originalPrice !== undefined ? Number(updatedData.originalPrice) : orig.originalPrice;
      const minPrice = updatedData.minPrice !== undefined ? Number(updatedData.minPrice) : (orig.minPrice || Math.round(price * 0.88));
      
      let images = orig.images;
      if (Array.isArray(updatedData.images) && updatedData.images.length > 0) {
        images = updatedData.images;
      } else if (updatedData.image) {
        images = [updatedData.image];
      }

      this.state.products[idx] = {
        ...orig,
        ...updatedData,
        price: price,
        originalPrice: originalPrice,
        minPrice: minPrice,
        images: images,
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

  // ======================== CATEGORY CRUD (ADMIN) ========================
  addCategory(name, icon = "📦") {
    const trimmed = name.trim();
    if (!trimmed) return { success: false, message: "Category name cannot be empty." };
    if (this.state.categories.some(c => c.name.toLowerCase() === trimmed.toLowerCase())) {
      return { success: false, message: "Category already exists." };
    }
    const newCat = {
      id: "cat-" + Date.now(),
      name: trimmed,
      icon: icon || "📦",
      active: true
    };
    this.state.categories.push(newCat);
    this.addNotification(`Category "${trimmed}" added.`);
    this.saveState();
    return { success: true, category: newCat };
  }

  updateCategory(id, newName, newIcon) {
    const cat = this.state.categories.find(c => c.id === id || c.name === id);
    if (!cat) return { success: false, message: "Category not found." };
    const oldName = cat.name;
    cat.name = newName.trim();
    if (newIcon) cat.icon = newIcon;

    // Also update any products under this category
    this.state.products.forEach(p => {
      if (p.category === oldName) {
        p.category = cat.name;
      }
    });

    this.addNotification(`Category "${oldName}" renamed to "${cat.name}".`);
    this.saveState();
    return { success: true };
  }

  deleteCategory(id) {
    const cat = this.state.categories.find(c => c.id === id || c.name === id);
    if (!cat) return { success: false, message: "Category not found." };
    this.state.categories = this.state.categories.filter(c => c.id !== cat.id && c.name !== cat.name);
    this.addNotification(`Category "${cat.name}" deleted.`);
    this.saveState();
    return { success: true };
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

  // ======================== CUSTOMER AUTHENTICATION & MANAGEMENT ========================
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
      addresses: [
        { id: "addr-" + Date.now(), name: name.trim(), phone: phone.trim(), line: "Doorstep Delivery Address", city: "Bangalore", state: "Karnataka", pin: "560001", tag: "Home", default: true }
      ]
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
    this.setView("home");
  }

  // Admin Customer CRUD
  addCustomer(customerData) {
    const normalized = customerData.email.trim().toLowerCase();
    if (!this.state.registeredUsers) this.state.registeredUsers = [];
    if (this.state.registeredUsers.some(u => u.email.toLowerCase() === normalized)) {
      return { success: false, message: "Customer with this email already exists." };
    }

    const newCustomer = {
      name: customerData.name.trim(),
      email: normalized,
      phone: customerData.phone.trim(),
      password: customerData.password || "password123",
      notificationPreferences: { email: true, sms: true, push: true },
      addresses: customerData.addressLine ? [
        {
          id: "addr-" + Date.now(),
          name: customerData.name.trim(),
          phone: customerData.phone.trim(),
          line: customerData.addressLine,
          city: customerData.city || "Bangalore",
          state: customerData.state || "Karnataka",
          pin: customerData.pin || "560001",
          tag: "Home",
          default: true
        }
      ] : []
    };

    this.state.registeredUsers.push(newCustomer);
    this.addNotification(`Customer "${newCustomer.name}" added.`);
    this.saveState();
    return { success: true, customer: newCustomer };
  }

  updateCustomer(originalEmail, updatedData) {
    const user = (this.state.registeredUsers || []).find(u => u.email.toLowerCase() === originalEmail.toLowerCase());
    if (!user) return { success: false, message: "Customer not found." };

    if (updatedData.name) user.name = updatedData.name.trim();
    if (updatedData.phone) user.phone = updatedData.phone.trim();
    if (updatedData.password) user.password = updatedData.password;
    if (updatedData.email && updatedData.email.toLowerCase() !== originalEmail.toLowerCase()) {
      user.email = updatedData.email.trim().toLowerCase();
    }

    // If active user is being updated, update session too
    if (this.state.currentUser && this.state.currentUser.email.toLowerCase() === originalEmail.toLowerCase()) {
      this.state.currentUser = { ...user };
    }

    this.addNotification(`Customer profile updated: ${user.name}`);
    this.saveState();
    return { success: true };
  }

  deleteCustomer(email) {
    this.state.registeredUsers = (this.state.registeredUsers || []).filter(u => u.email.toLowerCase() !== email.toLowerCase());
    if (this.state.currentUser && this.state.currentUser.email.toLowerCase() === email.toLowerCase()) {
      this.state.currentUser = null;
    }
    this.addNotification(`Customer account removed: ${email}`);
    this.saveState();
    return { success: true };
  }

  // Customer Address Management
  addCustomerAddress(addressData) {
    if (!this.state.currentUser) return { success: false, message: "Please sign in first." };
    if (!this.state.currentUser.addresses) this.state.currentUser.addresses = [];

    const newAddr = {
      id: "addr-" + Date.now(),
      name: addressData.name || this.state.currentUser.name,
      phone: addressData.phone || this.state.currentUser.phone,
      line: addressData.line,
      city: addressData.city || "Bangalore",
      state: addressData.state || "Karnataka",
      pin: addressData.pin || "560001",
      tag: addressData.tag || "Home",
      default: Boolean(addressData.isDefault || this.state.currentUser.addresses.length === 0)
    };

    if (newAddr.default) {
      this.state.currentUser.addresses.forEach(a => a.default = false);
    }

    this.state.currentUser.addresses.push(newAddr);
    
    // Sync with registeredUsers list
    const idx = (this.state.registeredUsers || []).findIndex(u => u.email.toLowerCase() === this.state.currentUser.email.toLowerCase());
    if (idx > -1) {
      this.state.registeredUsers[idx].addresses = this.state.currentUser.addresses;
    }

    this.addNotification("New address added successfully.");
    this.saveState();
    return { success: true, address: newAddr };
  }

  updateCustomerAddress(addressId, addressData) {
    if (!this.state.currentUser || !this.state.currentUser.addresses) return { success: false };
    const addr = this.state.currentUser.addresses.find(a => a.id === addressId);
    if (!addr) return { success: false, message: "Address not found." };

    Object.assign(addr, addressData);

    if (addressData.default) {
      this.state.currentUser.addresses.forEach(a => {
        if (a.id !== addressId) a.default = false;
      });
    }

    // Sync with registeredUsers list
    const idx = (this.state.registeredUsers || []).findIndex(u => u.email.toLowerCase() === this.state.currentUser.email.toLowerCase());
    if (idx > -1) {
      this.state.registeredUsers[idx].addresses = this.state.currentUser.addresses;
    }

    this.addNotification("Address updated.");
    this.saveState();
    return { success: true };
  }

  deleteCustomerAddress(addressId) {
    if (!this.state.currentUser || !this.state.currentUser.addresses) return { success: false };
    this.state.currentUser.addresses = this.state.currentUser.addresses.filter(a => a.id !== addressId);
    
    // If deleted was default, make first one default
    if (this.state.currentUser.addresses.length > 0 && !this.state.currentUser.addresses.some(a => a.default)) {
      this.state.currentUser.addresses[0].default = true;
    }

    // Sync with registeredUsers list
    const idx = (this.state.registeredUsers || []).findIndex(u => u.email.toLowerCase() === this.state.currentUser.email.toLowerCase());
    if (idx > -1) {
      this.state.registeredUsers[idx].addresses = this.state.currentUser.addresses;
    }

    this.addNotification("Address deleted.");
    this.saveState();
    return { success: true };
  }

  setDefaultCustomerAddress(addressId) {
    if (!this.state.currentUser || !this.state.currentUser.addresses) return;
    this.state.currentUser.addresses.forEach(a => {
      a.default = (a.id === addressId);
    });

    const idx = (this.state.registeredUsers || []).findIndex(u => u.email.toLowerCase() === this.state.currentUser.email.toLowerCase());
    if (idx > -1) {
      this.state.registeredUsers[idx].addresses = this.state.currentUser.addresses;
    }

    this.addNotification("Default address updated.");
    this.saveState();
  }

  // ======================== CART, WISHLIST & PRICE NEGOTIATION ========================
  addToCart(productId, qty = 1, customPrice = null) {
    // ENFORCE AUTHENTICATION GATE
    if (!this.state.currentUser && !this.state.adminUser) {
      if (typeof openAuthModal === 'function') {
        openAuthModal('login');
      }
      alert("Please sign in or register to add products to your cart!");
      return false;
    }

    const prod = this.getProductById(productId);
    if (!prod) return false;

    const finalPrice = customPrice !== null ? Number(customPrice) : prod.price;
    const existing = this.state.cart.find(item => item.id === productId);

    if (existing) {
      existing.quantity += qty;
      if (customPrice !== null) {
        existing.price = finalPrice;
        existing.isNegotiated = true;
      }
    } else {
      this.state.cart.push({
        id: productId,
        quantity: qty,
        price: finalPrice,
        originalPrice: prod.price,
        isNegotiated: customPrice !== null
      });
    }
    this.addNotification(`${prod.name} added to cart!`);
    this.saveState();
    return true;
  }

  // PRICE NEGOTIATION / MAKE AN OFFER
  negotiatePrice(productId, offerAmount) {
    // ENFORCE AUTHENTICATION GATE
    if (!this.state.currentUser && !this.state.adminUser) {
      if (typeof openAuthModal === 'function') {
        openAuthModal('login');
      }
      return { success: false, needsLogin: true, message: "Please sign in or register to submit a price offer." };
    }

    const prod = this.getProductById(productId);
    if (!prod) return { success: false, message: "Product not found." };

    const offer = Number(offerAmount);
    if (!offer || offer <= 0) {
      return { success: false, message: "Please enter a valid offer amount in Rupees." };
    }

    // Minimum acceptable threshold set by Admin
    const minAcceptable = prod.minPrice || Math.round(prod.price * 0.88);

    if (offer >= minAcceptable) {
      // Offer Accepted!
      this.addToCart(productId, 1, offer);
      return {
        success: true,
        acceptedPrice: offer,
        savings: prod.price - offer,
        message: `🎉 Offer Accepted! Your special price of ₹ ${offer.toLocaleString('en-IN')} has been approved and added to your cart.`
      };
    } else {
      // Offer Declined: Below seller's minimum reserve price
      return {
        success: false,
        message: `⚠️ Counter Offer of ₹ ${offer.toLocaleString('en-IN')} was declined. The minimum price threshold for this product is higher. Please submit a higher counter-offer.`
      };
    }
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
    // ENFORCE AUTHENTICATION GATE
    if (!this.state.currentUser && !this.state.adminUser) {
      if (typeof openAuthModal === 'function') {
        openAuthModal('login');
      }
      alert("Please sign in or register to save items to your wishlist!");
      return false;
    }

    const index = this.state.wishlist.indexOf(productId);
    if (index > -1) {
      this.state.wishlist.splice(index, 1);
      this.addNotification("Removed from Wishlist.");
    } else {
      this.state.wishlist.push(productId);
      this.addNotification("Added to Wishlist!");
    }
    this.saveState();
    return true;
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
    if (!this.state.currentUser && !this.state.adminUser) {
      if (typeof openAuthModal === 'function') {
        openAuthModal('login');
      }
      alert("Please sign in or register to place your order!");
      return null;
    }

    const totals = this.getCartTotals();
    const address = this.state.currentUser && this.state.currentUser.addresses 
      ? this.state.currentUser.addresses.find(a => a.id === addressId) || this.state.currentUser.addresses[0]
      : { name: "Valued Customer", phone: "+91 98765 43210", line: "Doorstep Delivery Address", city: "Bangalore", state: "Karnataka", pin: "560001" };

    const itemsOrdered = this.state.cart.map(item => {
      const prod = this.getProductById(item.id);
      return {
        id: item.id,
        name: prod ? prod.name : "Hardware Item",
        category: prod ? prod.category : "Laptops",
        brand: prod ? prod.brand : "Lapro",
        price: item.price,
        quantity: item.quantity,
        isNegotiated: Boolean(item.isNegotiated),
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
      customerName: this.state.currentUser ? this.state.currentUser.name : "Customer",
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

  updateOrderDetails(orderId, updatedData) {
    const order = this.state.orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: "Order not found." };
    Object.assign(order, updatedData);
    this.addNotification(`Order ${orderId} updated.`);
    this.saveState();
    return { success: true };
  }

  cancelOrder(orderId, reason = "Customer Request") {
    const order = this.state.orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: "Order not found." };
    if (order.status === "delivered" || order.status === "shipped") {
      return { success: false, message: "Cannot cancel an order that is already shipped or delivered." };
    }
    order.status = "cancelled";
    order.cancelReason = reason;
    this.addNotification(`Order ${orderId} has been cancelled.`);
    this.saveState();
    return { success: true };
  }

  bookServiceTicket(ticketData) {
    if (!this.state.currentUser && !this.state.adminUser) {
      if (typeof openAuthModal === 'function') {
        openAuthModal('login');
      }
      alert("Please sign in or register to book a doorstep repair service!");
      return null;
    }

    const ticketId = "TKT" + Math.floor(1000 + Math.random() * 9000);
    const address = ticketData.mode === "Pickup & Drop" 
      ? (this.state.currentUser && this.state.currentUser.addresses ? this.state.currentUser.addresses.find(a => a.id === ticketData.addressId) || this.state.currentUser.addresses[0] : null)
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

  // ======================== DYNAMIC CATEGORY EARNINGS ANALYTICS ========================
  getCategoryEarnings() {
    const orders = this.state.orders || [];
    const tickets = this.state.serviceTickets || [];
    const categoryTotals = {};
    const categoryCounts = {};

    // Initialize all registered categories
    (this.state.categories || []).forEach(c => {
      categoryTotals[c.name] = 0;
      categoryCounts[c.name] = 0;
    });
    categoryTotals["Repair & Service"] = 0;
    categoryCounts["Repair & Service"] = 0;

    let totalRevenue = 0;
    let totalItems = 0;

    // Aggregate from Orders
    orders.forEach(order => {
      if (order.status !== "cancelled") {
        (order.items || []).forEach(item => {
          const cat = item.category || "Laptops";
          const itemRev = (Number(item.price) || 0) * (Number(item.quantity) || 1);
          categoryTotals[cat] = (categoryTotals[cat] || 0) + itemRev;
          categoryCounts[cat] = (categoryCounts[cat] || 0) + (Number(item.quantity) || 1);
          totalRevenue += itemRev;
          totalItems += (Number(item.quantity) || 1);
        });
      }
    });

    // Aggregate from Paid Repair Service Tickets
    tickets.forEach(ticket => {
      if (ticket.estimate && ticket.estimate.total && ticket.paymentStatus === "paid") {
        const servRev = Number(ticket.estimate.total) || 0;
        categoryTotals["Repair & Service"] = (categoryTotals["Repair & Service"] || 0) + servRev;
        categoryCounts["Repair & Service"] = (categoryCounts["Repair & Service"] || 0) + 1;
        totalRevenue += servRev;
        totalItems += 1;
      }
    });

    // Fallback demo baseline if orders are low
    if (totalRevenue < 100000) {
      totalRevenue = 485990;
      totalItems = 341;
      categoryTotals["Laptops"] = 245750;
      categoryTotals["Desktops"] = 115200;
      categoryTotals["Repair & Service"] = 68450;
      categoryTotals["Accessories"] = 42210;
      categoryTotals["Networking"] = 14380;
    }

    const categoryList = Object.keys(categoryTotals).map(catName => {
      const amount = categoryTotals[catName] || 0;
      const share = totalRevenue > 0 ? ((amount / totalRevenue) * 100).toFixed(1) : "0.0";
      return {
        name: catName,
        earnings: amount,
        share: Number(share),
        count: categoryCounts[catName] || 0
      };
    }).sort((a, b) => b.earnings - a.earnings);

    return {
      totalRevenue: totalRevenue,
      totalOrders: Math.max(orders.length, 128),
      totalItemsSold: totalItems,
      avgOrderValue: Math.round(totalRevenue / Math.max(orders.length, 128)),
      categories: categoryList,
      topCategory: categoryList[0] || { name: "Laptops", earnings: 0 },
      lowestCategory: categoryList.filter(c => c.earnings > 0).slice(-1)[0] || categoryList[categoryList.length - 1]
    };
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
}

const appState = new StateManager();

