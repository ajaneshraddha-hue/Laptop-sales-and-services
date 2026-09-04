// Lapro Solutions - Main Controller & View Router SPA

// Global DOM hooks
const mainContent = document.getElementById("main-content");
const wishlistBadge = document.getElementById("wishlist-badge");
const cartBadge = document.getElementById("cart-badge");
const notifBadge = document.getElementById("notif-badge");
const notifItems = document.getElementById("notif-items");
const notifDropdown = document.getElementById("notif-dropdown");
const authHeaderBtn = document.getElementById("auth-header-btn");
const compareBar = document.getElementById("compare-bar");
const compareCount = document.getElementById("compare-count");
const compareThumbnails = document.getElementById("compare-thumbnails");

// Active View Routing Engine
document.addEventListener("DOMContentLoaded", () => {
  // Listen for state changes to refresh elements
  document.addEventListener("statechanged", (e) => {
    updateHeaderControls(e.detail);
    renderView(e.detail.currentView, e.detail);
    updateComparisonBar(e.detail);
  });

  // Close notifications dropdown on click outside
  window.addEventListener("click", (e) => {
    if (!e.target.closest("#notif-dropdown") && !e.target.closest("[title='Notifications']")) {
      if (notifDropdown) notifDropdown.classList.add("hidden");
    }
  });

  // Initialize view: Always open Home page first on site visit
  const state = appState.state;
  state.currentView = "home";
  updateHeaderControls(state);
  renderView("home", state);
  updateComparisonBar(state);
});

// Update static nav states, badge values, and profile buttons
function updateHeaderControls(state) {
  // Wishlist Badge
  if (wishlistBadge) {
    if (state.wishlist && state.wishlist.length > 0) {
      wishlistBadge.textContent = state.wishlist.length;
      wishlistBadge.classList.remove("hidden");
    } else {
      wishlistBadge.classList.add("hidden");
    }
  }

  // Cart Badge
  if (cartBadge) {
    const cartItemCount = (state.cart || []).reduce((sum, item) => sum + item.quantity, 0);
    if (cartItemCount > 0) {
      cartBadge.textContent = cartItemCount;
      cartBadge.classList.remove("hidden");
    } else {
      cartBadge.classList.add("hidden");
    }
  }

  // Notifications Badge
  if (notifBadge && notifItems) {
    const unreadNotifs = (state.notifications || []).filter(n => !n.read).length;
    if (unreadNotifs > 0) {
      notifBadge.textContent = unreadNotifs;
      notifBadge.classList.remove("hidden");
    } else {
      notifBadge.classList.add("hidden");
    }

    if (!state.notifications || state.notifications.length === 0) {
      notifItems.innerHTML = `<div class="px-4 py-6 text-center text-xs text-slate-400">No new notifications.</div>`;
    } else {
      notifItems.innerHTML = state.notifications.map(n => `
        <div class="px-4 py-2.5 border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer ${n.read ? 'opacity-70' : 'bg-blue-50/30 font-medium'}">
          <p class="text-xs text-slate-800">${n.text}</p>
          <span class="text-[10px] text-slate-400 block mt-0.5">${n.time}</span>
        </div>
      `).join("");
    }
  }

  // Header User / Admin Controls
  if (authHeaderBtn) {
    if (state.adminUser) {
      // If logged in as Admin
      authHeaderBtn.innerHTML = `
        <div class="flex items-center gap-2">
          <button onclick="appState.setView('admin')" class="bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs px-3 py-1.5 rounded-full transition flex items-center gap-1.5 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Admin Portal
          </button>
          <button onclick="appState.adminLogout()" class="text-xs text-red-600 hover:underline font-semibold" title="Logout Admin">Exit</button>
        </div>
      `;
    } else if (state.currentUser) {
      // If logged in as Customer (Click-toggled menu that never closes prematurely)
      authHeaderBtn.innerHTML = `
        <div class="relative inline-block text-left" id="customer-profile-wrapper">
          <button onclick="toggleCustomerProfileMenu(event)" class="hover:text-blue-600 font-semibold transition flex items-center gap-1.5 text-xs text-slate-800 border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-full shadow-sm">
            <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <span>Hi, ${state.currentUser.name.split(" ")[0]}</span>
            <span class="text-[9px] text-slate-400">▾</span>
          </button>
          <div id="customer-profile-dropdown" class="absolute right-0 top-full mt-2 w-52 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 py-2 hidden z-50 text-xs font-medium divide-y divide-slate-100">
            <div class="px-4 py-2 bg-slate-50 border-b border-slate-100">
              <span class="font-bold text-slate-900 block">${state.currentUser.name}</span>
              <span class="text-[10px] text-slate-500 font-mono">${state.currentUser.email}</span>
            </div>
            <div class="py-1">
              <button onclick="appState.setView('profile'); closeCustomerProfileMenu();" class="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 font-semibold text-slate-700 flex items-center gap-2">👤 My Account Profile</button>
              <button onclick="appState.setView('profile', { tab: 'addresses' }); closeCustomerProfileMenu();" class="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-slate-700 flex items-center gap-2">📍 Manage Addresses</button>
              <button onclick="appState.setView('orders'); closeCustomerProfileMenu();" class="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-slate-700 flex items-center gap-2">📑 My Purchase Orders</button>
              <button onclick="appState.setView('service-history'); closeCustomerProfileMenu();" class="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-slate-700 flex items-center gap-2">🛠️ My Repair Tickets</button>
            </div>
            <div class="pt-1">
              <button onclick="appState.customerLogout(); closeCustomerProfileMenu();" class="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 font-bold flex items-center gap-2">🚪 Logout</button>
            </div>
          </div>
        </div>
      `;
    } else {
      // Guest User
      authHeaderBtn.innerHTML = `
        <button onclick="openAuthModal()" class="hover:bg-blue-50 text-blue-700 border border-blue-200 font-bold text-xs px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 shadow-sm">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
          Sign In
        </button>
      `;
    }
  }

  // Highlight active tab in navigation
  document.querySelectorAll(".nav-tab").forEach(tab => {
    const viewName = tab.getAttribute("data-view");
    if (viewName && (viewName === state.currentView || (state.activeFilters && viewName === state.activeFilters.category.toLowerCase()))) {
      tab.classList.add("text-blue-600", "font-bold");
    } else {
      tab.classList.remove("text-blue-600", "font-bold");
    }
  });
}

// Dropdown click helpers
function toggleCustomerProfileMenu(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById("customer-profile-dropdown");
  if (dropdown) dropdown.classList.toggle("hidden");
}

function closeCustomerProfileMenu() {
  const dropdown = document.getElementById("customer-profile-dropdown");
  if (dropdown) dropdown.classList.add("hidden");
}

// Global Search & Notification Handlers
function toggleNotificationsMenu(event) {
  event.stopPropagation();
  if (notifDropdown) notifDropdown.classList.toggle("hidden");
}

function handleGlobalSearch(event) {
  event.preventDefault();
  const inp = (document.getElementById("search-input")?.value || document.getElementById("mobile-search-input")?.value || "").trim();
  appState.state.activeFilters.search = inp;
  appState.state.activeFilters.category = "All";
  appState.state.activeFilters.subcategory = "All";
  appState.setView("catalog");
}

// Customer Auth Modal Handlers
function openAuthModal(tab = "login") {
  const modal = document.getElementById("auth-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    toggleAuthTab(tab);
  }
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function toggleAuthTab(tab) {
  const formLogin = document.getElementById("form-login");
  const formReg = document.getElementById("form-register");
  const formAdmin = document.getElementById("form-admin-modal");
  const tabLogin = document.getElementById("tab-login");
  const tabReg = document.getElementById("tab-register");
  const tabAdmin = document.getElementById("tab-admin");
  const modalTitle = document.getElementById("auth-modal-title");
  const modalSub = document.getElementById("auth-modal-subtitle");

  // Reset all
  if (formLogin) formLogin.classList.add("hidden");
  if (formReg) formReg.classList.add("hidden");
  if (formAdmin) formAdmin.classList.add("hidden");
  if (tabLogin) tabLogin.className = "flex-1 pb-2.5 text-center border-b-2 border-transparent text-slate-400 font-medium hover:text-slate-600";
  if (tabReg) tabReg.className = "flex-1 pb-2.5 text-center border-b-2 border-transparent text-slate-400 font-medium hover:text-slate-600";
  if (tabAdmin) tabAdmin.className = "flex-1 pb-2.5 text-center border-b-2 border-transparent text-purple-700 font-medium hover:text-purple-900";

  if (tab === "login") {
    if (formLogin) formLogin.classList.remove("hidden");
    if (tabLogin) tabLogin.className = "flex-1 pb-2.5 text-center border-b-2 border-blue-600 font-bold text-blue-600";
    if (modalTitle) modalTitle.textContent = "Customer Account";
    if (modalSub) modalSub.textContent = "Sign in to track orders, manage doorstep repairs & checkout";
  } else if (tab === "register") {
    if (formReg) formReg.classList.remove("hidden");
    if (tabReg) tabReg.className = "flex-1 pb-2.5 text-center border-b-2 border-blue-600 font-bold text-blue-600";
    if (modalTitle) modalTitle.textContent = "Create Customer Account";
    if (modalSub) modalSub.textContent = "Register to place orders, save addresses & track repair tickets";
  } else if (tab === "admin") {
    if (formAdmin) formAdmin.classList.remove("hidden");
    if (tabAdmin) tabAdmin.className = "flex-1 pb-2.5 text-center border-b-2 border-purple-600 font-bold text-purple-700";
    if (modalTitle) modalTitle.textContent = "Authorized Admin Portal";
    if (modalSub) modalSub.textContent = "Enter store administrator credentials to manage products, stock & orders";
  }
}

function handleCustomerLoginSubmit(event) {
  event.preventDefault();
  const email = (document.getElementById("login-email")?.value || "").trim();
  const pass = document.getElementById("login-pass")?.value || "";

  // If admin credentials were typed here, automatically authenticate as Admin!
  const isAdmin = email.toLowerCase() === "admin@laprosolutions.com" || 
    (appState.state.registeredAdmins || []).some(a => a.email.toLowerCase() === email.toLowerCase());

  if (isAdmin) {
    const adminRes = appState.adminLogin(email, pass);
    if (adminRes.success) {
      closeAuthModal();
      appState.setView("admin");
      return;
    } else {
      alert(adminRes.message);
      return;
    }
  }

  const res = appState.customerLogin(email, pass);
  if (res.success) {
    closeAuthModal();
    if (document.getElementById("login-email")) document.getElementById("login-email").value = "";
    if (document.getElementById("login-pass")) document.getElementById("login-pass").value = "";
  } else {
    alert(res.message);
  }
}

function handleAdminModalLoginSubmit(event) {
  event.preventDefault();
  const email = (document.getElementById("modal-admin-email")?.value || "").trim();
  const pass = document.getElementById("modal-admin-pass")?.value || "";

  const res = appState.adminLogin(email, pass);
  if (res.success) {
    closeAuthModal();
    appState.setView("admin");
  } else {
    alert(res.message);
  }
}

function handleCustomerRegisterSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const phone = document.getElementById("reg-phone").value;
  const pass = document.getElementById("reg-pass").value;

  const res = appState.customerRegister(name, email, phone, pass);
  if (res.success) {
    closeAuthModal();
    document.getElementById("reg-name").value = "";
    document.getElementById("reg-email").value = "";
    document.getElementById("reg-phone").value = "";
    document.getElementById("reg-pass").value = "";
  } else {
    alert(res.message);
  }
}

// ROUTER: Route renderer
function renderView(viewName, state) {
  if (!mainContent) return;
  mainContent.innerHTML = "";

  // If Admin is logged in and requests admin-login, take to dashboard
  if (state.adminUser && viewName === "admin-login") {
    viewName = "admin";
  }

  switch (viewName) {
    case "home":
      renderHomeView(mainContent, state);
      break;
    case "catalog":
      renderCatalogView(mainContent, state);
      break;
    case "product":
      renderProductView(mainContent, state);
      break;
    case "cart":
      renderCartView(mainContent, state);
      break;
    case "checkout":
      renderCheckoutView(mainContent, state);
      break;
    case "order-confirm":
      renderOrderConfirmView(mainContent, state);
      break;
    case "orders":
      renderOrdersView(mainContent, state);
      break;
    case "order-track":
      renderOrderTrackView(mainContent, state);
      break;
    case "service":
      renderServiceView(mainContent, state);
      break;
    case "ticket-track":
      renderTicketTrackView(mainContent, state);
      break;
    case "service-history":
      renderServiceHistoryView(mainContent, state);
      break;
    case "profile":
      renderProfileView(mainContent, state);
      break;
    case "wishlist":
      renderWishlistView(mainContent, state);
      break;
    case "about":
      renderAboutView(mainContent);
      break;
    case "faq":
      renderFAQView(mainContent);
      break;
    case "contact":
      renderContactView(mainContent);
      break;
    case "privacy":
      renderPrivacyView(mainContent);
      break;
    case "admin-login":
      renderAdminLoginView(mainContent, state);
      break;
    case "admin":
      renderAdminDashboardView(mainContent, state);
      break;
    default:
      renderHomeView(mainContent, state);
  }
}

// ======================== 1. HOME VIEW ========================
function renderHomeView(container, state) {
  const products = appState.getProducts();
  const crazyDeals = products.filter(p => p.isCrazyDeal).slice(0, 4);

  let html = `
    <!-- Hero Banner -->
    <div class="relative bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 rounded-3xl text-white overflow-hidden shadow-2xl p-6 md:p-12 mb-10 border border-slate-800">
      <div class="absolute -right-20 -top-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -left-20 -bottom-20 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div class="flex-1 space-y-5 text-center lg:text-left">
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <span class="bg-blue-600 text-white font-extrabold text-[11px] uppercase px-3 py-1 rounded-full tracking-wider shadow-md flex items-center gap-1.5">
              ⚡ LAPRO SOLUTIONS ENTERPRISE
            </span>
            <div class="bg-black/60 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
              <span>🔥 Crazy Deals:</span>
              <span>Up to 75% OFF</span>
            </div>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
            IT HARDWARE PROCUREMENT & <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">CERTIFIED REPAIR SERVICES</span>
          </h1>

          <p class="text-slate-300 text-sm md:text-base max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Your single destination for enterprise-grade <strong>Laptops, Desktops, Servers, Storages, Networking & Doorstep Repairs</strong>. Tested across 32 quality checkpoints with 1-Year Onsite Warranty.
          </p>

          <div class="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
            <button onclick="appState.setView('catalog', { category: 'Desktops', subcategory: 'All' })" class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-2">
              <span>🖥️</span> SHOP DESKTOPS
            </button>
            <button onclick="appState.setView('catalog', { category: 'All', subcategory: 'All' })" class="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm px-5 py-3 rounded-xl transition">
              EXPLORE CATALOG
            </button>
            <button onclick="appState.setView('service')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-3 rounded-xl transition flex items-center gap-1.5 shadow-md">
              <span>🛠️</span> BOOK DOORSTEP REPAIR
            </button>
          </div>
        </div>

        <!-- Featured Card on Hero -->
        <div class="flex-1 max-w-sm lg:max-w-md w-full">
          <div class="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-2xl backdrop-blur-md relative">
            <div class="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              ⚡ TOP DEAL OF THE DAY
            </div>
            <div class="absolute top-3 right-3 bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
              3 Yrs Warranty
            </div>
            <img src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&auto=format&fit=crop&q=80" alt="Lenovo ThinkVision Monitor" class="w-full h-44 object-cover rounded-xl mt-6 mb-4">
            <h3 class="font-bold text-sm text-white line-clamp-1">Lenovo ThinkVision S24e-20 23.8" FHD IPS Monitor</h3>
            <p class="text-xs text-slate-400 mb-3">Ultra-thin bezel, HDMI/VGA, Onsite Warranty</p>
            <div class="flex items-center justify-between">
              <div>
                <span class="text-teal-400 font-extrabold text-xl">₹ 7,906.00</span>
                <span class="text-xs text-red-400 line-through ml-2">₹ 20,020.00</span>
              </div>
              <button onclick="handleAddToCart(event, 'monitor-lenovo-thinkvision-s24e', 1)" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow">
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Highlights Grid -->
    <div class="mb-12">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Featured Categories</h2>
          <p class="text-xs text-slate-500">Explore enterprise hardware & certified solutions</p>
        </div>
        <button onclick="appState.setView('catalog', { category: 'All' })" class="text-xs font-bold text-blue-600 hover:underline">View All →</button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
        ${[
          { name: "Laptops", icon: "💻", cat: "Laptops", color: "from-blue-500/10 to-indigo-500/10 text-blue-600 border-blue-200" },
          { name: "Desktops", icon: "🖥️", cat: "Desktops", color: "from-slate-500/10 to-gray-500/10 text-slate-700 border-slate-200" },
          { name: "Accessories", icon: "🎒", cat: "Accessories", color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-200" },
          { name: "Peripherals", icon: "🖨️", cat: "Peripherals", color: "from-cyan-500/10 to-blue-500/10 text-cyan-600 border-cyan-200" },
          { name: "Storages", icon: "💾", cat: "Storages", color: "from-purple-500/10 to-indigo-500/10 text-purple-600 border-purple-200" },
          { name: "Networking", icon: "🌐", cat: "Networking", color: "from-sky-500/10 to-blue-500/10 text-sky-600 border-sky-200" },
          { name: "Servers", icon: "🖧", cat: "Servers & Workstations", color: "from-rose-500/10 to-red-500/10 text-rose-600 border-rose-200" },
          { name: "Consumables", icon: "🖨️", cat: "Consumables", color: "from-amber-500/10 to-yellow-500/10 text-amber-600 border-amber-200" },
          { name: "Software's", icon: "💿", cat: "Software's", color: "from-teal-500/10 to-green-500/10 text-teal-600 border-teal-200" },
        ].map(item => `
          <div onclick="appState.setSubcategoryFilter('${item.cat}', 'All')" class="bg-gradient-to-br ${item.color} border p-4 rounded-2xl cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition flex flex-col items-center text-center group">
            <span class="text-3xl mb-2 group-hover:scale-110 transition duration-200">${item.icon}</span>
            <span class="font-bold text-xs text-slate-800 group-hover:text-blue-600 transition">${item.name}</span>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- Crazy Deals Section -->
    <div class="mb-12">
      <div class="flex justify-between items-center mb-6">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-orange-500 text-xl font-black">🔥</span>
            <h2 class="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Crazy Deals & Flash Offers</h2>
          </div>
          <p class="text-xs text-slate-500">Unbeatable discounts on high-end laptops & components</p>
        </div>
        <button onclick="appState.setView('catalog', { category: 'Crazy Deals', subcategory: 'All' })" class="text-xs font-bold text-orange-600 hover:underline">Explore All Deals →</button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        ${crazyDeals.map(p => `
          <div class="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between group relative">
            <button onclick="handleToggleWishlist(event, '${p.id}')" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow flex items-center justify-center text-xs transition z-10 hover:scale-110" title="Wishlist">
              ${(appState.state.wishlist || []).includes(p.id) ? '<span class="text-red-500">❤️</span>' : '<span class="text-slate-400">🤍</span>'}
            </button>
            <div class="relative mb-3">
              <span class="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">${p.discount}</span>
              <img src="${p.images[0]}" alt="${p.name}" class="w-full h-40 object-cover rounded-2xl group-hover:scale-102 transition duration-300">
            </div>
            <div>
              <div class="text-[11px] font-bold text-slate-400 uppercase mb-1">${p.brand} • ${p.category}</div>
              <h3 onclick="appState.setView('product', { product: '${p.id}' })" class="font-bold text-xs text-slate-800 hover:text-blue-600 cursor-pointer line-clamp-2 mb-2 leading-snug">${p.name}</h3>
              <div class="flex items-baseline gap-2 mb-3">
                <span class="text-teal-700 font-black text-base">₹ ${p.price.toLocaleString('en-IN')}.00</span>
                <span class="text-[11px] text-red-500 line-through">₹ ${p.originalPrice.toLocaleString('en-IN')}.00</span>
              </div>
            </div>
            <button onclick="handleAddToCart(event, '${p.id}', 1)" class="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs py-2.5 rounded-xl transition shadow">
              🛒 Add to Cart
            </button>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- Doorstep Repair Banner -->
    <div class="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-6 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="space-y-2 text-center md:text-left">
        <span class="bg-white/20 text-white font-black text-[10px] uppercase px-3 py-1 rounded-full">CERTIFIED LAPRO SERVICE NETWORK</span>
        <h3 class="text-2xl font-black">Need Laptop Repair or Hardware Upgrades?</h3>
        <p class="text-xs md:text-sm text-blue-100 max-w-xl">Free doorstep pickup & delivery across Bangalore. Genuine spare parts with 1-Year Assured Warranty and live repair ticket tracking.</p>
      </div>
      <button onclick="appState.setView('service')" class="bg-white text-blue-900 hover:bg-blue-50 font-black text-xs md:text-sm px-6 py-3.5 rounded-xl transition shadow-lg shrink-0">
        🛠️ Book Doorstep Service
      </button>
    </div>
  `;

  container.innerHTML = html;
}

// ======================== 2. CATALOG VIEW ========================
function renderCatalogView(container, state) {
  const allProducts = appState.getProducts();
  const filters = state.activeFilters || { category: "All", subcategory: "All", brand: "All", price: 200000, sort: "featured", viewMode: "list", search: "" };

  // Filter logic
  let filtered = allProducts.filter(p => {
    // Search query
    if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase()) && !p.brand.toLowerCase().includes(filters.search.toLowerCase()) && !p.category.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    // Category filter
    if (filters.category === "Crazy Deals") {
      if (!p.isCrazyDeal) return false;
    } else if (filters.category && filters.category !== "All") {
      if (p.category !== filters.category) return false;
    }
    // Subcategory filter
    if (filters.subcategory && filters.subcategory !== "All") {
      if (p.subcategory !== filters.subcategory) return false;
    }
    // Brand filter
    if (filters.brand && filters.brand !== "All") {
      if (p.brand.toLowerCase() !== filters.brand.toLowerCase()) return false;
    }
    // Price filter
    if (p.price > filters.price) return false;
    // Processor filter
    if (filters.processor && filters.processor !== "All") {
      if (!p.processor.toLowerCase().includes(filters.processor.toLowerCase())) return false;
    }
    // OS filter
    if (filters.os && filters.os !== "All") {
      if (!p.os.toLowerCase().includes(filters.os.toLowerCase())) return false;
    }
    // Screen size filter
    if (filters.screenSize && filters.screenSize !== "All") {
      if (!p.screenSize.includes(filters.screenSize)) return false;
    }

    return true;
  });

  // Sorting
  if (filters.sort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (filters.sort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (filters.sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const categoryTitle = filters.category === "Crazy Deals" 
    ? "Crazy Deals & Flash Offers" 
    : (filters.category !== "All" ? filters.category : "All Products");

  const subcategoryTitle = filters.subcategory && filters.subcategory !== "All" ? ` › ${filters.subcategory}` : "";

  let html = `
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-xs text-slate-500 mb-4 select-none">
      <span onclick="appState.setView('home')" class="hover:text-blue-600 cursor-pointer">Home</span>
      <span>/</span>
      <span onclick="appState.setView('catalog', { category: 'All', subcategory: 'All' })" class="hover:text-blue-600 cursor-pointer">Products</span>
      <span>/</span>
      <span class="text-slate-800 font-bold">${categoryTitle}${subcategoryTitle}</span>
    </div>

    <div class="flex flex-col lg:flex-row gap-6">
      
      <!-- LEFT ACCORDION SIDEBAR: Categories & Filters -->
      <aside class="w-full lg:w-64 shrink-0 select-none space-y-4">
        <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div class="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 class="font-extrabold text-sm text-slate-900">Categories & Filters</h3>
            <button onclick="resetFilters()" class="text-xs text-blue-600 hover:underline font-semibold">Reset</button>
          </div>

          <!-- Price Filter Accordion -->
          <div class="py-3 border-b border-slate-100">
            <div class="flex justify-between items-center text-xs font-bold text-slate-800 mb-2">
              <span>Price Range</span>
              <span class="text-blue-600 font-mono">Max: ₹ ${Number(filters.price).toLocaleString('en-IN')}</span>
            </div>
            <input type="range" min="1000" max="200000" step="1000" value="${filters.price}" oninput="handlePriceFilter(this.value)" class="w-full accent-blue-600 cursor-pointer">
            <div class="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹1,000</span>
              <span>₹2,00,000</span>
            </div>
          </div>

          <!-- Brand Filter Accordion -->
          <div class="py-3 border-b border-slate-100">
            <span class="text-xs font-bold text-slate-800 block mb-2">Brand</span>
            <div class="space-y-1.5 max-h-36 overflow-y-auto text-xs">
              ${["All", "Dell", "HP", "Lenovo", "Apple", "ASUS", "Kingston", "Samsung", "TP-Link", "Microsoft", "Logitech"].map(brand => `
                <label class="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                  <input type="radio" name="brand_filter" value="${brand}" ${filters.brand === brand ? 'checked' : ''} onchange="handleBrandFilter('${brand}')" class="text-blue-600">
                  <span>${brand}</span>
                </label>
              `).join("")}
            </div>
          </div>

          <!-- Processor Filter Accordion -->
          <div class="py-3 border-b border-slate-100">
            <span class="text-xs font-bold text-slate-800 block mb-2">Processor</span>
            <div class="space-y-1.5 text-xs">
              ${["All", "Intel Core i7", "Intel Core i5", "Intel Core i9", "AMD Ryzen 7", "AMD Ryzen 5", "Apple M1/M2", "Intel Xeon"].map(proc => `
                <label class="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                  <input type="radio" name="proc_filter" value="${proc}" ${filters.processor === proc ? 'checked' : ''} onchange="handleProcFilter('${proc}')" class="text-blue-600">
                  <span>${proc}</span>
                </label>
              `).join("")}
            </div>
          </div>

          <!-- Screen Size Filter Accordion -->
          <div class="py-3 border-b border-slate-100">
            <span class="text-xs font-bold text-slate-800 block mb-2">Screen Size</span>
            <div class="space-y-1.5 text-xs">
              ${["All", "13.3\"", "14.0\"", "15.6\"", "23.8\"", "27\""].map(sz => `
                <label class="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                  <input type="radio" name="size_filter" value="${sz}" ${filters.screenSize === sz ? 'checked' : ''} onchange="handleSizeFilter('${sz}')" class="text-blue-600">
                  <span>${sz}</span>
                </label>
              `).join("")}
            </div>
          </div>

          <!-- Operating System Accordion -->
          <div class="pt-3">
            <span class="text-xs font-bold text-slate-800 block mb-2">Operating System</span>
            <div class="space-y-1.5 text-xs">
              ${["All", "Windows 11 Pro", "Windows 11 Home", "macOS", "No OS"].map(os => `
                <label class="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                  <input type="radio" name="os_filter" value="${os}" ${filters.os === os ? 'checked' : ''} onchange="handleOsFilter('${os}')" class="text-blue-600">
                  <span>${os}</span>
                </label>
              `).join("")}
            </div>
          </div>

        </div>
      </aside>

      <!-- MAIN CATALOG RESULTS -->
      <div class="flex-1">
        
        <!-- Top Toolbar -->
        <div class="bg-white rounded-2xl border border-slate-200 p-4 mb-4 shadow-sm flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 class="text-lg font-black text-slate-900">${categoryTitle} ${subcategoryTitle}</h1>
            <p class="text-xs text-slate-400">Showing <strong class="text-slate-700">${filtered.length}</strong> items</p>
          </div>

          <div class="flex items-center gap-3">
            <!-- Sort Dropdown -->
            <select onchange="handleSortChange(this.value)" class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600">
              <option value="featured" ${filters.sort === 'featured' ? 'selected' : ''}>Sort: Featured</option>
              <option value="price-low" ${filters.sort === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
              <option value="price-high" ${filters.sort === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
              <option value="rating" ${filters.sort === 'rating' ? 'selected' : ''}>Customer Rating</option>
            </select>

            <!-- View Mode Switcher -->
            <div class="flex border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
              <button onclick="handleViewMode('list')" class="p-1.5 ${filters.viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'} transition" title="List View">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
              <button onclick="handleViewMode('grid')" class="p-1.5 ${filters.viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'} transition" title="Grid View">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Catalog Product Items -->
        ${filtered.length === 0 ? `
          <div class="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <div class="text-4xl mb-2">🔍</div>
            <h3 class="font-bold text-base text-slate-800">No products found matching the selected filters</h3>
            <p class="text-xs text-slate-400 mt-1 mb-4">Try clearing some filters or searching for another term.</p>
            <button onclick="resetFilters()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition">Clear Filters</button>
          </div>
        ` : (
          filters.viewMode === 'grid' 
            ? `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${filtered.map(p => renderGridCard(p)).join("")}</div>`
            : `<div class="space-y-3.5">${filtered.map(p => renderListCard(p)).join("")}</div>`
        )}

      </div>
    </div>
  `;

  container.innerHTML = html;
}

// Card Renderers (List View & Grid View)
function renderListCard(p) {
  const inCart = (appState.state.cart || []).some(item => item.id === p.id);
  const cartItem = (appState.state.cart || []).find(item => item.id === p.id);

  return `
    <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-center gap-5">
      <!-- Thumbnail & Badges -->
      <div class="relative w-full md:w-48 h-40 shrink-0 select-none">
        ${p.isNew ? `<span class="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow">NEW</span>` : ''}
        ${p.discount && p.discount !== '0% OFF' ? `<span class="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow">${p.discount}</span>` : ''}
        <img src="${p.images[0]}" alt="${p.name}" class="w-full h-full object-cover rounded-xl border border-slate-100">
        <div class="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded">
          ${p.specs?.warranty || '1 Year Warranty'}
        </div>
      </div>

      <!-- Center Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[10px] font-extrabold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">${p.brand}</span>
          <span class="text-[10px] text-slate-400 font-medium">${p.category}</span>
          <span class="ml-auto text-amber-500 font-bold text-xs">⭐ ${p.rating}</span>
        </div>
        <h3 onclick="appState.setView('product', { product: '${p.id}' })" class="font-bold text-sm text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-2 leading-snug mb-2">
          ${p.name}
        </h3>
        
        <!-- Specs pills -->
        <div class="flex flex-wrap gap-1.5 mb-3">
          ${(p.features || []).slice(0, 3).map(f => `
            <span class="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full">${f}</span>
          `).join("")}
        </div>

        <div class="flex items-baseline gap-2.5">
          <span class="text-teal-700 font-black text-lg">₹ ${p.price.toLocaleString('en-IN')}.00</span>
          ${p.originalPrice > p.price ? `<span class="text-xs text-red-500 line-through">₹ ${p.originalPrice.toLocaleString('en-IN')}.00</span>` : ''}
          ${p.gstITC ? `<span class="text-[10px] text-slate-400 font-medium">(GST Input: ₹${p.gstITC.toLocaleString('en-IN')})</span>` : ''}
        </div>

        ${inCart ? `
          <div class="mt-2 inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2.5 py-1 rounded-lg">
            <span>✓ Added in Cart</span>
            <span class="font-normal text-emerald-600">(${cartItem?.quantity || 1} item${(cartItem?.quantity || 1) > 1 ? 's' : ''})</span>
          </div>
        ` : ''}
      </div>

      <!-- Actions Column -->
      <div class="w-full md:w-44 shrink-0 flex flex-col gap-2 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-4">
        ${!inCart ? `
          <div class="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-1">
            <button onclick="adjustQty('${p.id}', -1)" class="w-7 h-7 bg-white rounded text-slate-700 font-bold hover:bg-slate-200 transition text-xs shadow-sm">-</button>
            <span id="qty-${p.id}" class="text-xs font-bold text-slate-800 font-mono">1</span>
            <button onclick="adjustQty('${p.id}', 1)" class="w-7 h-7 bg-white rounded text-slate-700 font-bold hover:bg-slate-200 transition text-xs shadow-sm">+</button>
          </div>

          <button onclick="addToCartWithQty(event, '${p.id}')" class="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs py-2.5 rounded-xl transition shadow flex items-center justify-center gap-1.5">
            <span>🛒</span> ADD TO CART
          </button>
        ` : `
          <button onclick="handleRemoveFromCart(event, '${p.id}')" class="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs py-2.5 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5" title="Remove this item from your shopping cart">
            <span>🗑️</span> REMOVE FROM CART
          </button>
        `}

        <button onclick="openNegotiateModal('${p.id}')" class="w-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold text-xs py-1.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm" title="Negotiate Price with Seller">
          <span>💬</span> Negotiate Price
        </button>

        <div class="flex gap-1.5">
          <button onclick="handleToggleWishlist(event, '${p.id}')" class="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg py-1 text-xs transition flex items-center justify-center gap-1" title="Wishlist">
            ${(appState.state.wishlist || []).includes(p.id) ? '<span class="text-red-500 font-bold">❤️ Saved</span>' : '<span class="text-slate-400">🤍 Wishlist</span>'}
          </button>
          <button onclick="appState.setView('product', { product: '${p.id}' })" class="px-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs" title="View Details">👁</button>
        </div>
      </div>
    </div>
  `;
}

function renderGridCard(p) {
  const inCart = (appState.state.cart || []).some(item => item.id === p.id);
  const cartItem = (appState.state.cart || []).find(item => item.id === p.id);

  return `
    <div class="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between group relative">
      <button onclick="handleToggleWishlist(event, '${p.id}')" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow flex items-center justify-center text-xs transition z-10 hover:scale-110" title="Wishlist">
        ${(appState.state.wishlist || []).includes(p.id) ? '<span class="text-red-500">❤️</span>' : '<span class="text-slate-400">🤍</span>'}
      </button>

      <div>
        <div class="relative mb-3 select-none">
          ${p.isNew ? `<span class="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow">NEW</span>` : ''}
          ${p.discount && p.discount !== '0% OFF' ? `<span class="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow">${p.discount}</span>` : ''}
          <img src="${p.images[0]}" alt="${p.name}" class="w-full h-44 object-cover rounded-2xl border border-slate-100 group-hover:scale-102 transition duration-300">
        </div>
        <div class="text-[10px] font-bold text-slate-400 uppercase mb-1">${p.brand} • ${p.category}</div>
        <h3 onclick="appState.setView('product', { product: '${p.id}' })" class="font-bold text-xs text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-2 leading-snug mb-2">${p.name}</h3>
        <div class="flex items-baseline gap-2 mb-2">
          <span class="text-teal-700 font-black text-base">₹ ${p.price.toLocaleString('en-IN')}.00</span>
          ${p.originalPrice > p.price ? `<span class="text-[11px] text-red-500 line-through">₹ ${p.originalPrice.toLocaleString('en-IN')}.00</span>` : ''}
        </div>
        ${inCart ? `
          <div class="mb-3 inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-lg">
            <span>✓ Added in Cart (${cartItem?.quantity || 1})</span>
          </div>
        ` : ''}
      </div>

      <div class="space-y-2">
        ${inCart ? `
          <button onclick="handleRemoveFromCart(event, '${p.id}')" class="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs py-2.5 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5">
            <span>🗑️</span> Remove from Cart
          </button>
        ` : `
          <button onclick="handleAddToCart(event, '${p.id}', 1)" class="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs py-2.5 rounded-xl transition shadow flex items-center justify-center gap-1.5">
            <span>🛒</span> Add to Cart
          </button>
        `}
        <button onclick="openNegotiateModal('${p.id}')" class="w-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold text-xs py-1.5 rounded-xl transition flex items-center justify-center gap-1">
          <span>💬</span> Make an Offer
        </button>
        <button onclick="appState.setView('product', { product: '${p.id}' })" class="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs py-1.5 rounded-xl transition">
          View Specifications
        </button>
      </div>
    </div>
  `;
}

// Catalog Filter Helpers
function handlePriceFilter(val) {
  appState.state.activeFilters.price = Number(val);
  appState.saveState();
}

function handleBrandFilter(brand) {
  appState.state.activeFilters.brand = brand;
  appState.saveState();
}

function handleProcFilter(proc) {
  appState.state.activeFilters.processor = proc;
  appState.saveState();
}

function handleSizeFilter(size) {
  appState.state.activeFilters.screenSize = size;
  appState.saveState();
}

function handleOsFilter(os) {
  appState.state.activeFilters.os = os;
  appState.saveState();
}

function handleSortChange(sort) {
  appState.state.activeFilters.sort = sort;
  appState.saveState();
}

function handleViewMode(mode) {
  appState.state.activeFilters.viewMode = mode;
  appState.saveState();
}

function resetFilters() {
  appState.state.activeFilters = {
    search: "",
    category: "All",
    subcategory: "All",
    brand: "All",
    price: 200000,
    processor: "All",
    screenSize: "All",
    os: "All",
    sort: "featured",
    viewMode: "list"
  };
  appState.saveState();
}

function adjustQty(prodId, delta) {
  const el = document.getElementById(`qty-${prodId}`);
  if (el) {
    let current = parseInt(el.textContent) || 1;
    current = Math.max(1, current + delta);
    el.textContent = current;
  }
}

function addToCartWithQty(event, prodId) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const el = document.getElementById(`qty-${prodId}`);
  const qty = el ? parseInt(el.textContent) || 1 : 1;
  const prod = appState.getProductById(prodId);
  const success = appState.addToCart(prodId, qty);
  if (success) {
    showToast(`Added ${qty} × "${prod ? prod.name : ''}" to cart!`, "🛒", "success");
    refreshCurrentViewCartState();
  }
}

// ======================== 3. PRODUCT DETAIL VIEW ========================
function renderProductView(container, state) {
  const p = appState.getProductById(state.currentProduct) || appState.getProducts()[0];
  if (!p) {
    container.innerHTML = `<div class="py-20 text-center">Product not found.</div>`;
    return;
  }

  let html = `
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-xs text-slate-500 mb-6 select-none">
      <span onclick="appState.setView('home')" class="hover:text-blue-600 cursor-pointer">Home</span>
      <span>/</span>
      <span onclick="appState.setView('catalog', { category: '${p.category}' })" class="hover:text-blue-600 cursor-pointer">${p.category}</span>
      <span>/</span>
      <span class="text-slate-800 font-bold line-clamp-1">${p.name}</span>
    </div>

    <div class="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Images Gallery -->
      <div>
        <div class="relative rounded-2xl overflow-hidden border border-slate-200 mb-4 bg-slate-50">
          <img id="main-prod-img" src="${p.images[0]}" alt="${p.name}" class="w-full h-80 md:h-96 object-cover">
          ${p.discount ? `<span class="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow">${p.discount}</span>` : ''}
        </div>
        <div class="flex gap-3 overflow-x-auto pb-1">
          ${p.images.map((img, i) => `
            <img src="${img}" onclick="document.getElementById('main-prod-img').src='${img}'" class="w-20 h-20 object-cover rounded-xl border-2 border-slate-200 hover:border-blue-600 cursor-pointer transition shrink-0">
          `).join("")}
        </div>
      </div>

      <!-- Product Specifications & Buy Panel -->
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <span class="bg-blue-50 text-blue-700 font-extrabold text-xs px-3 py-1 rounded-full border border-blue-200">${p.brand}</span>
          <span class="bg-slate-100 text-slate-700 font-bold text-xs px-3 py-1 rounded-full">${p.condition}</span>
          <span class="ml-auto text-amber-500 font-bold text-sm">⭐ ${p.rating} (${p.reviewsCount} reviews)</span>
        </div>

        <h1 class="text-xl md:text-2xl font-black text-slate-900 leading-snug">${p.name}</h1>

        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-baseline justify-between">
          <div>
            <div class="flex items-baseline gap-3">
              <span class="text-2xl md:text-3xl font-black text-teal-700">₹ ${p.price.toLocaleString('en-IN')}.00</span>
              ${p.originalPrice > p.price ? `<span class="text-sm text-red-500 line-through">₹ ${p.originalPrice.toLocaleString('en-IN')}.00</span>` : ''}
            </div>
            ${p.gstITC ? `<span class="text-xs text-slate-500 font-medium">Eligible for GST Input Credit: <strong>₹${p.gstITC.toLocaleString('en-IN')}</strong></span>` : ''}
          </div>
          <span class="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">In Stock (${p.stockLeft} left)</span>
        </div>

        <!-- Price Negotiation Action Button -->
        <button onclick="openNegotiateModal('${p.id}')" class="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm py-3 rounded-xl transition shadow-md shadow-amber-500/20 flex items-center justify-center gap-2">
          <span>💬</span> Make an Offer / Negotiate Price
        </button>

        <!-- Specifications Breakdown Table -->
        <div class="space-y-2 pt-2">
          <h4 class="font-extrabold text-xs text-slate-700 uppercase tracking-wider">Specifications & Key Highlights</h4>
          <div class="bg-slate-50 rounded-xl p-3 border border-slate-200 divide-y divide-slate-200 text-xs">
            ${Object.entries(p.specs || {}).map(([k, v]) => `
              <div class="py-1.5 flex justify-between">
                <span class="text-slate-500 font-semibold capitalize">${k.replace(/([A-Z])/g, ' $1')}:</span>
                <span class="text-slate-800 font-bold text-right">${v}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Add to cart and instant checkout -->
        <div class="flex flex-col sm:flex-row gap-3 pt-2">
          ${(appState.state.cart || []).some(item => item.id === p.id) ? `
            <button onclick="handleRemoveFromCart(event, '${p.id}')" class="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-sm py-3.5 rounded-xl transition shadow-sm flex items-center justify-center gap-2" title="Remove this product from cart">
              <span>🗑️</span> Remove from Cart
            </button>
          ` : `
            <button onclick="handleAddToCart(event, '${p.id}', 1)" class="flex-1 bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2">
              <span>🛒</span> Add to Cart
            </button>
          `}
          <button onclick="if(appState.addToCart('${p.id}', 1)) appState.setView('checkout');" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2">
            <span>⚡</span> Buy Now
          </button>
          <button onclick="handleToggleWishlist(event, '${p.id}')" class="p-3.5 border border-slate-200 hover:bg-slate-50 rounded-xl transition font-bold" title="Toggle Wishlist">
            ${(appState.state.wishlist || []).includes(p.id) ? '<span class="text-red-500 text-base">❤️</span>' : '<span class="text-slate-500 text-base">🤍</span>'}
          </button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// ======================== PRICE NEGOTIATION MODAL SYSTEM ========================
function openNegotiateModal(prodId) {
  if (!appState.state.currentUser && !appState.state.adminUser) {
    openAuthModal('login');
    alert("Please sign in or register to negotiate price or submit an offer!");
    return;
  }
  const p = appState.getProductById(prodId);
  if (!p) return;

  const modal = document.getElementById("negotiate-modal");
  if (!modal) return;

  modal.innerHTML = `
    <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl fade-in relative border border-slate-200">
      <button onclick="closeNegotiateModal()" class="absolute right-4 top-4 text-slate-400 hover:text-slate-700 font-bold text-base">✕</button>

      <div class="text-center mb-5">
        <div class="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-2 text-2xl shadow-sm">💬</div>
        <h3 class="font-black text-lg text-slate-900">Make an Offer / Negotiate Price</h3>
        <p class="text-xs text-slate-500">Submit your proposed counter-offer directly to the seller</p>
      </div>

      <div class="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 mb-4 flex items-center gap-3">
        <img src="${p.images[0]}" alt="${p.name}" class="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0">
        <div class="min-w-0">
          <span class="text-[10px] font-bold text-slate-400 uppercase">${p.brand} • ${p.category}</span>
          <h4 class="font-bold text-xs text-slate-900 line-clamp-1">${p.name}</h4>
          <div class="flex items-baseline gap-2 mt-0.5">
            <span class="text-xs text-slate-500">Listed Price:</span>
            <span class="font-black text-sm text-teal-700">₹ ${p.price.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <form onsubmit="handleNegotiateOfferSubmit(event, '${p.id}')" class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-slate-700 uppercase mb-1">Your Proposed Offer Price (₹) <span class="text-red-500">*</span></label>
          <div class="relative">
            <span class="absolute left-3.5 top-2.5 font-bold text-slate-400 text-sm">₹</span>
            <input type="number" id="negotiate-offer-input" min="1" max="${p.price}" placeholder="e.g. ${Math.round(p.price * 0.9)}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-8 pr-4 font-black text-base text-slate-900 focus:outline-none focus:border-amber-500 font-mono shadow-inner">
          </div>
          <p class="text-[11px] text-slate-400 mt-1">Offers close to the listed price have the highest chance of instant approval.</p>
        </div>

        <div id="negotiate-feedback" class="hidden p-3 rounded-xl text-xs font-semibold"></div>

        <div class="flex gap-2.5 pt-1">
          <button type="button" onclick="closeNegotiateModal()" class="flex-1 border border-slate-300 text-slate-700 font-bold py-2.5 rounded-xl hover:bg-slate-50 transition">Cancel</button>
          <button type="submit" id="negotiate-submit-btn" class="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-black py-2.5 rounded-xl transition shadow flex items-center justify-center gap-1.5">
            <span>⚡</span> Submit Offer
          </button>
        </div>
      </form>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeNegotiateModal() {
  const modal = document.getElementById("negotiate-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function handleNegotiateOfferSubmit(event, prodId) {
  event.preventDefault();
  const input = document.getElementById("negotiate-offer-input");
  const feedback = document.getElementById("negotiate-feedback");
  const submitBtn = document.getElementById("negotiate-submit-btn");
  if (!input || !feedback) return;

  const offer = Number(input.value);
  const res = appState.negotiatePrice(prodId, offer);

  feedback.classList.remove("hidden", "bg-green-50", "text-green-800", "border-green-200", "bg-red-50", "text-red-800", "border-red-200");

  if (res.success) {
    feedback.className = "p-3 rounded-xl text-xs font-bold bg-green-50 text-green-800 border border-green-200";
    feedback.innerHTML = res.message;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "✅ Offer Accepted!";
    }
    setTimeout(() => {
      closeNegotiateModal();
      appState.setView("cart");
    }, 1500);
  } else {
    feedback.className = "p-3 rounded-xl text-xs font-bold bg-red-50 text-red-800 border border-red-200";
    feedback.innerHTML = res.message;
  }
}


// ======================== 4. CART & CHECKOUT ========================
function renderCartView(container, state) {
  const cart = state.cart || [];
  const totals = appState.getCartTotals();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
        <div class="text-5xl mb-3">🛒</div>
        <h2 class="text-xl font-black text-slate-900">Your Shopping Cart is Empty</h2>
        <p class="text-xs text-slate-500 mt-1 mb-6">Explore our curated catalog of laptops, desktops, and enterprise accessories.</p>
        <button onclick="appState.setView('catalog', { category: 'All' })" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow">
          Start Shopping
        </button>
      </div>
    `;
    return;
  }

  let html = `
    <h1 class="text-2xl font-black text-slate-900 mb-6">Shopping Cart (${cart.reduce((s, i) => s + i.quantity, 0)} items)</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Items List -->
      <div class="lg:col-span-2 space-y-4">
        ${cart.map(item => {
          const prod = appState.getProductById(item.id);
          if (!prod) return '';
          return `
            <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center gap-4">
              <img src="${prod.images[0]}" alt="${prod.name}" class="w-20 h-20 object-cover rounded-xl border border-slate-100 shrink-0">
              <div class="flex-1 min-w-0">
                <span class="text-[10px] font-bold text-slate-400 uppercase">${prod.brand}</span>
                <h3 onclick="appState.setView('product', { product: '${prod.id}' })" class="font-bold text-xs text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-1">${prod.name}</h3>
                <div class="text-teal-700 font-black text-sm mt-1">₹ ${prod.price.toLocaleString('en-IN')}.00</div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="appState.updateCartQty('${item.id}', -1)" class="w-7 h-7 bg-slate-100 rounded text-slate-700 font-bold hover:bg-slate-200 transition text-xs">-</button>
                <span class="text-xs font-bold text-slate-800 font-mono w-4 text-center">${item.quantity}</span>
                <button onclick="appState.updateCartQty('${item.id}', 1)" class="w-7 h-7 bg-slate-100 rounded text-slate-700 font-bold hover:bg-slate-200 transition text-xs">+</button>
              </div>
              <button onclick="appState.removeFromCart('${item.id}')" class="text-slate-400 hover:text-red-500 p-1 transition">✕</button>
            </div>
          `;
        }).join("")}
      </div>

      <!-- Order Summary & Checkout -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 h-fit">
        <h3 class="font-extrabold text-sm text-slate-900 pb-3 border-b border-slate-100">Order Summary</h3>

        <div class="space-y-2 text-xs">
          <div class="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span class="font-bold">₹ ${totals.subtotal.toLocaleString('en-IN')}.00</span>
          </div>
          ${totals.discount > 0 ? `
            <div class="flex justify-between text-green-600 font-bold">
              <span>Coupon Discount (${state.couponApplied?.code})</span>
              <span>- ₹ ${totals.discount.toLocaleString('en-IN')}.00</span>
            </div>
          ` : ''}
          <div class="flex justify-between text-slate-600">
            <span>Doorstep Shipping</span>
            <span class="font-bold">${totals.shipping === 0 ? 'FREE' : '₹ ' + totals.shipping}</span>
          </div>
          <div class="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-100">
            <span>Total Payable</span>
            <span class="text-teal-700">₹ ${totals.total.toLocaleString('en-IN')}.00</span>
          </div>
        </div>

        <!-- Coupon code input -->
        <div class="pt-2">
          <div class="flex gap-2">
            <input type="text" id="coupon-input" placeholder="Coupon (e.g. LAPRO10)" class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs flex-1 focus:outline-none focus:border-blue-600 uppercase">
            <button onclick="handleApplyCoupon()" class="bg-slate-900 text-white font-bold text-xs px-3 py-1.5 rounded-lg hover:bg-blue-600 transition">Apply</button>
          </div>
        </div>

        <button onclick="appState.setView('checkout')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-xl transition shadow">
          Proceed to Checkout →
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function handleApplyCoupon() {
  const inp = document.getElementById("coupon-input").value;
  if (!inp) return;
  const res = appState.applyCoupon(inp);
  if (res) {
    alert("Coupon applied successfully!");
  } else {
    alert("Invalid coupon code. Try LAPRO10, CRAZY15, or SAVE1000");
  }
}

function renderCheckoutView(container, state) {
  const totals = appState.getCartTotals();
  const user = state.currentUser || { name: "Guest Customer", phone: "+91 98450 12345", addresses: [{ id: "addr-default", line: "12, Maple Drive, Indiranagar", city: "Bangalore", state: "Karnataka", pin: "560038" }] };
  const address = (user.addresses && user.addresses[0]) || { line: "Sector 4, HSR Layout", city: "Bangalore", state: "Karnataka", pin: "560102" };

  let html = `
    <h1 class="text-2xl font-black text-slate-900 mb-6">Checkout & Delivery</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <!-- Delivery Address Box -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 class="font-extrabold text-sm text-slate-900 mb-3 flex items-center gap-2">
            <span>📍</span> Doorstep Delivery Address
          </h3>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
            <p class="font-bold text-slate-800">${user.name} (${user.phone})</p>
            <p class="text-slate-600">${address.line}, ${address.city}, ${address.state} - ${address.pin}</p>
          </div>
        </div>

        <!-- Payment Options -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 class="font-extrabold text-sm text-slate-900 mb-4 flex items-center gap-2">
            <span>💳</span> Select Payment Method
          </h3>
          <div class="space-y-3 text-xs">
            <label class="flex items-center gap-3 p-3 rounded-xl border border-blue-500 bg-blue-50/50 cursor-pointer">
              <input type="radio" name="payment_opt" value="UPI QR (Instant GPay / PhonePe)" checked class="text-blue-600">
              <div>
                <span class="font-bold text-slate-900 block">UPI QR / Net Banking (Instant Confirmation)</span>
                <span class="text-slate-500 text-[11px]">Pay directly via Google Pay, PhonePe, Paytm or UPI ID</span>
              </div>
            </label>
            <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input type="radio" name="payment_opt" value="Credit / Debit Card" class="text-blue-600">
              <div>
                <span class="font-bold text-slate-900 block">Credit / Debit Card (Visa, Mastercard, RuPay)</span>
                <span class="text-slate-500 text-[11px]">100% Secured 256-bit encrypted gateway</span>
              </div>
            </label>
            <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input type="radio" name="payment_opt" value="Cash On Delivery" class="text-blue-600">
              <div>
                <span class="font-bold text-slate-900 block">Cash on Delivery (COD)</span>
                <span class="text-slate-500 text-[11px]">Pay upon physical doorstep verification</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Order Summary Card -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 h-fit">
        <h3 class="font-extrabold text-sm text-slate-900 pb-3 border-b border-slate-100">Amount to Pay</h3>
        <div class="space-y-2 text-xs">
          <div class="flex justify-between text-slate-600"><span>Subtotal:</span><span>₹ ${totals.subtotal.toLocaleString('en-IN')}.00</span></div>
          <div class="flex justify-between text-slate-600"><span>Shipping:</span><span>FREE</span></div>
          <div class="flex justify-between text-base font-black text-slate-900 pt-3 border-t"><span>Total:</span><span class="text-teal-700">₹ ${totals.total.toLocaleString('en-IN')}.00</span></div>
        </div>
        <button onclick="handlePlaceOrder('${address.id || 'addr-1'}')" class="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold text-sm py-3.5 rounded-xl transition shadow">
          Confirm & Pay ₹ ${totals.total.toLocaleString('en-IN')}
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function handlePlaceOrder(addressId) {
  const paymentMethod = document.querySelector('input[name="payment_opt"]:checked')?.value || "UPI QR";
  const orderId = appState.placeOrder(addressId, paymentMethod);
  appState.setView("order-confirm", { order: orderId });
}

function renderOrderConfirmView(container, state) {
  const order = state.orders.find(o => o.id === state.currentOrder) || state.orders[0];
  container.innerHTML = `
    <div class="bg-white rounded-3xl border border-slate-200 p-8 text-center max-w-xl mx-auto shadow-sm space-y-4">
      <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto">✓</div>
      <h1 class="text-2xl font-black text-slate-900">Order Placed Successfully!</h1>
      <p class="text-xs text-slate-500">Order ID: <strong class="font-mono text-slate-900">${order.id}</strong> | Tracking ID: <strong class="font-mono text-slate-900">${order.trackingId}</strong></p>
      <div class="bg-slate-50 p-4 rounded-xl text-xs text-left space-y-1.5 border border-slate-200">
        <div class="flex justify-between font-bold"><span>Total Paid:</span><span class="text-teal-700">₹ ${order.totals.total.toLocaleString('en-IN')}.00</span></div>
        <div class="flex justify-between"><span>Payment Method:</span><span>${order.paymentMethod}</span></div>
        <div class="flex justify-between"><span>Delivery To:</span><span>${order.address?.city || 'Bangalore'}</span></div>
      </div>
      <div class="flex gap-3 pt-2">
        <button onclick="appState.setView('orders')" class="flex-1 bg-slate-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-blue-600 transition">View My Orders</button>
        <button onclick="appState.setView('home')" class="flex-1 border border-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl hover:bg-slate-50 transition">Continue Shopping</button>
      </div>
    </div>
  `;
}

function renderOrdersView(container, state) {
  const orders = state.orders || [];
  container.innerHTML = `
    <h1 class="text-2xl font-black text-slate-900 mb-6">My Purchase Orders</h1>
    ${orders.length === 0 ? `<div class="bg-white p-8 rounded-2xl border text-center text-xs text-slate-400">No orders found.</div>` : `
      <div class="space-y-4">
        ${orders.map(o => `
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div class="flex flex-wrap justify-between items-center pb-3 border-b border-slate-100 text-xs mb-3">
              <div><span class="font-bold text-slate-900">Order #${o.id}</span> <span class="text-slate-400 ml-2">${o.date}</span></div>
              <span class="bg-green-100 text-green-700 font-bold px-2.5 py-0.5 rounded-full uppercase text-[10px]">${o.status}</span>
            </div>
            <div class="space-y-2 mb-3">
              ${o.items.map(i => `
                <div class="flex justify-between text-xs">
                  <span class="text-slate-700">${i.quantity}x ${i.name}</span>
                  <span class="font-bold text-slate-900">₹ ${(i.price * i.quantity).toLocaleString('en-IN')}</span>
                </div>
              `).join("")}
            </div>
            <div class="flex justify-between items-center pt-3 border-t text-xs">
              <span class="font-black text-sm">Total: ₹ ${o.totals.total.toLocaleString('en-IN')}.00</span>
              <button onclick="appState.setView('order-track', { order: '${o.id}' })" class="text-blue-600 font-bold hover:underline">Track Delivery Timeline →</button>
            </div>
          </div>
        `).join("")}
      </div>
    `}
  `;
}

function renderOrderTrackView(container, state) {
  const order = state.orders.find(o => o.id === state.currentOrder) || state.orders[0];
  container.innerHTML = `
    <button onclick="appState.setView('orders')" class="text-xs text-blue-600 font-bold mb-4 hover:underline">← Back to Orders</button>
    <div class="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6 max-w-2xl mx-auto">
      <div class="border-b pb-4">
        <h2 class="text-xl font-black text-slate-900">Order Delivery Tracking: #${order.id}</h2>
        <p class="text-xs text-slate-400">Carrier: ${order.deliveryPartner} | Tracking ID: ${order.trackingId}</p>
      </div>

      <!-- Timeline -->
      <div class="space-y-4">
        ${(order.timeline || []).map((step, idx) => `
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${step.done ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'}">
              ${step.done ? '✓' : idx + 1}
            </div>
            <div>
              <p class="font-bold text-xs ${step.done ? 'text-slate-900' : 'text-slate-400'}">${step.label}</p>
              <span class="text-[10px] text-slate-400">${step.date}</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// ======================== 5. SERVICES & DOORSTEP REPAIR ========================
function renderServiceView(container, state) {
  container.innerHTML = `
    <div class="max-w-3xl mx-auto space-y-6">
      <div class="text-center space-y-2">
        <span class="bg-blue-100 text-blue-800 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full">EXPERT DOORSTEP DIAGNOSTICS</span>
        <h1 class="text-2xl md:text-3xl font-black text-slate-900">Book Laptop & Hardware Repair</h1>
        <p class="text-xs text-slate-500">Certified technicians with genuine spare parts and 1-Year Warranty.</p>
      </div>

      <form onsubmit="handleServiceBookingSubmit(event)" class="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-5">
        <!-- 1. Device Type -->
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-2">1. Select Device Type</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            ${["Laptop", "Desktop PC", "Server / Workstation", "All-in-One"].map((d, i) => `
              <label class="p-3 rounded-xl border border-slate-200 text-center cursor-pointer hover:border-blue-600 flex flex-col items-center">
                <input type="radio" name="srv_device" value="${d}" ${i === 0 ? 'checked' : ''} class="mb-1 text-blue-600">
                <span class="font-bold text-slate-800">${d}</span>
              </label>
            `).join("")}
          </div>
        </div>

        <!-- 2. Brand & Model -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Brand</label>
            <select id="srv-brand" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:border-blue-600">
              <option value="Dell">Dell</option>
              <option value="HP">HP</option>
              <option value="Lenovo">Lenovo</option>
              <option value="Apple MacBook">Apple MacBook</option>
              <option value="ASUS">ASUS</option>
              <option value="Acer">Acer</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Model / Serial No.</label>
            <input type="text" id="srv-model" placeholder="e.g. Latitude 7490 or Inspiron 15" required class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-600">
          </div>
        </div>

        <!-- 3. Problem Description -->
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Issue / Service Required</label>
          <select id="srv-problem" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:border-blue-600">
            <option value="Screen / Display Broken or Lines">Screen / Display Broken or Lines</option>
            <option value="Keyboard Keys Not Working">Keyboard Keys Not Working</option>
            <option value="Battery Not Charging / Dead">Battery Not Charging / Dead</option>
            <option value="Motherboard No Power / Dead Device">Motherboard No Power / Dead Device</option>
            <option value="RAM / NVMe SSD Speed Upgrade">RAM / NVMe SSD Speed Upgrade</option>
            <option value="OS Crash / Virus Removal">OS Crash / Virus Removal</option>
          </select>
        </div>

        <!-- 4. Mode & Preferred Date -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Service Mode / Nearest Branch</label>
            <select id="srv-mode" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:border-blue-600">
              <option value="Pickup & Drop (Electronic City Hub)">Free Doorstep Pickup (Electronic City Hub)</option>
              <option value="Pickup & Drop (Begur Hub)">Free Doorstep Pickup (Begur Hub)</option>
              <option value="Pickup & Drop (Uttarahalli Hub)">Free Doorstep Pickup (Uttarahalli Hub)</option>
              <option value="Walk-in: Electronic City Phase 1">Walk-in: Electronic City Phase 1 (Near Neo Hospital)</option>
              <option value="Walk-in: Begur Branch">Walk-in: Begur Branch</option>
              <option value="Walk-in: Uttarahalli Branch">Walk-in: Uttarahalli Branch</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Date</label>
            <input type="date" id="srv-date" value="2026-09-05" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-600">
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Pickup Address (Bangalore)</label>
          <textarea id="srv-address" rows="2" placeholder="Full doorstep address in Bangalore with pincode" required class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-600">Prakruti Layout, Near Neo Hospital, Doddathogur, Electronic City Phase 1, Bangalore - 560100</textarea>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 flex items-center justify-between text-xs text-blue-900">
          <div class="flex items-center gap-2">
            <span class="text-base">📞</span>
            <span>Direct Support Helpline: <a href="tel:7996389264" class="font-bold underline">+91 7996389264</a></span>
          </div>
          <span class="text-[11px] text-blue-700 font-semibold hidden sm:inline">✉️ laprosolutions1120@gmail.com</span>
        </div>

        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3.5 rounded-xl transition shadow">
          Confirm Service Booking →
        </button>
      </form>
    </div>
  `;
}

function handleServiceBookingSubmit(event) {
  event.preventDefault();
  const ticketData = {
    serviceType: document.querySelector('input[name="srv_device"]:checked')?.value || "Laptop",
    brand: document.getElementById("srv-brand").value,
    model: document.getElementById("srv-model").value,
    problem: document.getElementById("srv-problem").value,
    mode: document.getElementById("srv-mode").value,
    preferredDate: document.getElementById("srv-date").value,
    description: document.getElementById("srv-address").value
  };

  const ticketId = appState.bookServiceTicket(ticketData);
  appState.setView("ticket-track", { ticket: ticketId });
}

function renderTicketTrackView(container, state) {
  const ticket = state.serviceTickets.find(t => t.id === state.currentTicket) || state.serviceTickets[0];
  container.innerHTML = `
    <div class="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
      <div class="border-b pb-4">
        <span class="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Ticket #${ticket.id}</span>
        <h2 class="text-xl font-black text-slate-900 mt-1">${ticket.brand} ${ticket.model} - ${ticket.problem}</h2>
        <p class="text-xs text-slate-400">Mode: ${ticket.mode} | Date: ${ticket.preferredDate}</p>
      </div>

      <!-- Timeline -->
      <div class="space-y-4">
        ${(ticket.timeline || []).map((step, idx) => `
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${step.done ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}">
              ${step.done ? '✓' : idx + 1}
            </div>
            <div>
              <p class="font-bold text-xs ${step.done ? 'text-slate-900' : 'text-slate-400'}">${step.label}</p>
              <span class="text-[10px] text-slate-400">${step.date}</span>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="pt-4 border-t flex justify-between">
        <button onclick="appState.setView('service-history')" class="text-xs font-bold text-blue-600 hover:underline">View All Service Tickets →</button>
        <button onclick="appState.setView('home')" class="text-xs text-slate-500 hover:text-slate-800">Back to Home</button>
      </div>
    </div>
  `;
}

function renderServiceHistoryView(container, state) {
  const tickets = state.serviceTickets || [];
  container.innerHTML = `
    <h1 class="text-2xl font-black text-slate-900 mb-6">My Repair Service Tickets</h1>
    <div class="space-y-4">
      ${tickets.map(t => `
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex justify-between items-center">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-900 text-sm">Ticket #${t.id}</span>
              <span class="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">${t.status}</span>
            </div>
            <p class="text-xs text-slate-600 mt-1">${t.brand} ${t.model} - ${t.problem}</p>
          </div>
          <button onclick="appState.setView('ticket-track', { ticket: '${t.id}' })" class="text-blue-600 font-bold text-xs hover:underline">View Timeline →</button>
        </div>
      `).join("")}
    </div>
  `;
}

// ======================== 6. PRIVATE ADMIN PORTAL (LOGIN & DASHBOARD) ========================
function renderAdminLoginView(container, state) {
  container.innerHTML = `
    <div class="max-w-md mx-auto py-10">
      <div class="bg-slate-950 text-white rounded-3xl p-8 shadow-2xl border border-slate-800 space-y-6">
        <div class="text-center space-y-1.5">
          <div class="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl mx-auto shadow-lg shadow-blue-500/30">LS</div>
          <h2 class="text-xl font-black text-white tracking-tight">Lapro Solutions Admin Portal</h2>
          <p class="text-xs text-slate-400">Strictly authorized enterprise administrators only</p>
        </div>

        <!-- Toggle Admin Login vs Admin Registration -->
        <div class="flex border-b border-slate-800 text-xs">
          <button id="admin-tab-login" onclick="toggleAdminTab('login')" class="flex-1 pb-2.5 text-center border-b-2 border-blue-500 font-bold text-blue-400">Admin Login</button>
          <button id="admin-tab-reg" onclick="toggleAdminTab('reg')" class="flex-1 pb-2.5 text-center border-b-2 border-transparent text-slate-500 font-medium hover:text-slate-300">Admin Register</button>
        </div>

        <!-- Admin Login Form -->
        <form id="admin-form-login" onsubmit="handleAdminLoginSubmit(event)" class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-300 uppercase mb-1">Private Admin Email</label>
            <input type="email" id="admin-login-email" value="admin@laprosolutions.com" required class="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-blue-500 font-mono">
          </div>
          <div>
            <label class="block font-bold text-slate-300 uppercase mb-1">Private Master Password</label>
            <input type="password" id="admin-login-pass" value="LaproAdminSecure2026!" required class="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-blue-500">
          </div>
          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3 rounded-xl transition shadow-lg shadow-blue-600/30">
            Authenticate & Open Dashboard
          </button>
          <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400">
            <span class="text-cyan-400 font-bold block mb-0.5">Default Admin Credentials:</span>
            <span>Email: <strong class="text-white">admin@laprosolutions.com</strong></span><br>
            <span>Password: <strong class="text-white">LaproAdminSecure2026!</strong></span>
          </div>
        </form>

        <!-- Admin Register Form -->
        <form id="admin-form-reg" onsubmit="handleAdminRegisterSubmit(event)" class="space-y-3.5 text-xs hidden">
          <div>
            <label class="block font-bold text-slate-300 uppercase mb-1">Admin Full Name</label>
            <input type="text" id="admin-reg-name" placeholder="e.g. Operations Manager" required class="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block font-bold text-slate-300 uppercase mb-1">Admin Email</label>
            <input type="email" id="admin-reg-email" placeholder="e.g. manager@laprosolutions.com" required class="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block font-bold text-slate-300 uppercase mb-1">Set Password</label>
            <input type="password" id="admin-reg-pass" placeholder="Create admin password" required class="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="block font-bold text-slate-300 uppercase mb-1">Master Admin Secret Key</label>
            <input type="password" id="admin-reg-secret" value="LAPRO_ADMIN_SECRET_2026" required class="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none focus:border-blue-500 font-mono">
          </div>
          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3 rounded-xl transition shadow-lg">
            Create Authorized Admin Account
          </button>
        </form>
      </div>
    </div>
  `;
}

function toggleAdminTab(tab) {
  const formLogin = document.getElementById("admin-form-login");
  const formReg = document.getElementById("admin-form-reg");
  const tabLogin = document.getElementById("admin-tab-login");
  const tabReg = document.getElementById("admin-tab-reg");

  if (tab === "login") {
    formLogin.classList.remove("hidden");
    formReg.classList.add("hidden");
    tabLogin.className = "flex-1 pb-2.5 text-center border-b-2 border-blue-500 font-bold text-blue-400";
    tabReg.className = "flex-1 pb-2.5 text-center border-b-2 border-transparent text-slate-500 font-medium hover:text-slate-300";
  } else {
    formLogin.classList.add("hidden");
    formReg.classList.remove("hidden");
    tabReg.className = "flex-1 pb-2.5 text-center border-b-2 border-blue-500 font-bold text-blue-400";
    tabLogin.className = "flex-1 pb-2.5 text-center border-b-2 border-transparent text-slate-500 font-medium hover:text-slate-300";
  }
}

function handleAdminLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById("admin-login-email").value;
  const pass = document.getElementById("admin-login-pass").value;

  const res = appState.adminLogin(email, pass);
  if (res.success) {
    appState.setView("admin");
  } else {
    alert(res.message);
  }
}

function handleAdminRegisterSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("admin-reg-name").value;
  const email = document.getElementById("admin-reg-email").value;
  const pass = document.getElementById("admin-reg-pass").value;
  const secret = document.getElementById("admin-reg-secret").value;

  const res = appState.adminRegister(name, email, pass, secret);
  if (res.success) {
    alert("Admin registered and authenticated successfully!");
    appState.setView("admin");
  } else {
    alert(res.message);
  }
}

// Global active tab inside Admin Dashboard
let activeAdminTab = "dashboard"; // dashboard, products, orders, tickets, customers, categories

function renderAdminDashboardView(container, state) {
  // STRICT SECURITY CHECK: Customers CANNOT view this dashboard!
  if (!state.adminUser) {
    appState.setView("admin-login");
    return;
  }

  const products = appState.getProducts();
  const orders = state.orders || [];
  const tickets = state.serviceTickets || [];
  const customers = state.registeredUsers || [];
  const categories = state.categories || [];

  let html = `
    <!-- Top Admin Bar -->
    <div class="bg-slate-950 text-white rounded-3xl p-6 shadow-2xl mb-6 border border-slate-800 flex flex-wrap justify-between items-center gap-4">
      <div class="flex items-center gap-4">
        <img src="lapro-logo.png" alt="Lapro Solutions" class="w-12 h-12 object-contain rounded-2xl bg-black p-1 border border-slate-700 shadow-inner">
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="font-black text-xl text-white tracking-tight">Authorized Admin Portal</h1>
            <span class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">${state.adminUser.role || 'Super Admin'}</span>
          </div>
          <p class="text-xs text-slate-400 mt-0.5">Logged in as: <strong class="text-slate-200">${state.adminUser.email}</strong></p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button onclick="openAddProductModal()" class="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5">
          <span>➕</span> Add Product
        </button>
        <button onclick="appState.setView('home')" class="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5">
          <span>🏠</span> Storefront View
        </button>
        <button onclick="appState.adminLogout()" class="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5">
          <span>🚪</span> Logout
        </button>
      </div>
    </div>

    <!-- Admin SaaS Layout (Sidebar + Main Content) -->
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
      <!-- SaaS Sidebar Menu -->
      <div class="lg:col-span-1 bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-1.5 sticky top-24">
        <div class="text-[10px] font-black text-slate-400 uppercase tracking-wider px-3 py-1">Management</div>
        ${[
          { id: "dashboard", label: "📊 Earnings Dashboard", count: null },
          { id: "products", label: "📦 Product Inventory", count: products.length },
          { id: "orders", label: "📑 Orders", count: orders.length },
          { id: "customers", label: "👥 Customers", count: customers.length },
          { id: "tickets", label: "🛠️ Service & Repair", count: tickets.length },
          { id: "categories", label: "🏷️ Categories", count: categories.length }
        ].map(item => `
          <button onclick="setAdminTab('${item.id}')" class="w-full flex items-center justify-between text-left px-3.5 py-3 rounded-2xl font-bold text-xs transition ${activeAdminTab === item.id ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}">
            <span>${item.label}</span>
            ${item.count !== null ? `<span class="${activeAdminTab === item.id ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'} rounded-full px-2 py-0.5 text-[10px] font-mono font-extrabold">${item.count}</span>` : ''}
          </button>
        `).join("")}

        <div class="pt-4 border-t border-slate-100 space-y-1">
          <div class="text-[10px] font-black text-slate-400 uppercase tracking-wider px-3 py-1">Quick Links</div>
          <button onclick="openAddCategoryModal()" class="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-2">
            <span>➕</span> Add New Category
          </button>
          <button onclick="openAddCustomerModal()" class="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-2">
            <span>➕</span> Add New Customer
          </button>
        </div>
      </div>

      <!-- Main Admin Content Area -->
      <div class="lg:col-span-4" id="admin-tab-content">
        ${renderAdminTabContent(activeAdminTab, state)}
      </div>
    </div>

    <!-- ADMIN MODAL CONTAINERS -->
    <div id="product-modal-container"></div>
    <div id="admin-category-modal-container"></div>
    <div id="admin-customer-modal-container"></div>
    <div id="admin-order-modal-container"></div>
    <div id="admin-ticket-modal-container"></div>
  `;

  container.innerHTML = html;
}

function setAdminTab(tab) {
  activeAdminTab = tab;
  // Re-render whole view to update sidebar active classes
  const mainContent = document.getElementById("main-content");
  if (mainContent && appState.state.currentView === "admin-dashboard") {
    renderAdminDashboardView(mainContent, appState.state);
  }
}

// Admin order status update + instant tab refresh
function adminUpdateOrder(orderId, newStatus) {
  appState.updateOrderStatus(orderId, newStatus);
  const contentEl = document.getElementById("admin-tab-content");
  if (contentEl && activeAdminTab === "orders") {
    contentEl.innerHTML = renderAdminTabContent("orders", appState.state);
  }
}

// Admin ticket status update + instant tab refresh
function adminUpdateTicket(ticketId, newStatus) {
  appState.updateTicketStatus(ticketId, newStatus);
  const contentEl = document.getElementById("admin-tab-content");
  if (contentEl && activeAdminTab === "tickets") {
    contentEl.innerHTML = renderAdminTabContent("tickets", appState.state);
  }
}

function renderAdminTabContent(tab, state) {
  const products = appState.getProducts();
  const orders = state.orders || [];
  const tickets = state.serviceTickets || [];
  const customers = state.registeredUsers || [];
  const categories = state.categories || [];

  // ==================== 1. DYNAMIC CATEGORY EARNINGS DASHBOARD ====================
  if (tab === "dashboard") {
    const earnings = appState.getCategoryEarnings();
    const colors = [
      "#2563eb", "#0d9488", "#f59e0b", "#8b5cf6", 
      "#ec4899", "#10b981", "#6366f1", "#14b8a6", "#f97316"
    ];

    // Build SVG Donut Chart
    let totalPct = 0;
    const donutSlices = earnings.categories.map((c, i) => {
      const pct = c.share;
      const strokeDash = `${pct} ${100 - pct}`;
      const strokeOffset = -totalPct;
      totalPct += pct;
      const color = colors[i % colors.length];
      return `<circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="${color}" stroke-width="5" stroke-dasharray="${strokeDash}" stroke-dashoffset="${strokeOffset}"></circle>`;
    }).join("");

    return `
      <div class="space-y-6">
        <!-- 4 KPI Summary Cards matching Screenshot -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div class="absolute -right-2 -bottom-2 text-5xl opacity-10">💰</div>
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Earnings</span>
            <div class="text-2xl font-black text-slate-900 mt-1">₹ ${earnings.totalRevenue.toLocaleString('en-IN')}</div>
            <div class="flex items-center gap-1 text-[11px] text-green-600 font-bold mt-1">
              <span>↑ 18.4%</span>
              <span class="text-slate-400 font-normal">vs last month</span>
            </div>
          </div>

          <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div class="absolute -right-2 -bottom-2 text-5xl opacity-10">📑</div>
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Orders</span>
            <div class="text-2xl font-black text-slate-900 mt-1">${earnings.totalOrders}</div>
            <div class="flex items-center gap-1 text-[11px] text-blue-600 font-bold mt-1">
              <span>↑ 12.1%</span>
              <span class="text-slate-400 font-normal">sales volume</span>
            </div>
          </div>

          <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div class="absolute -right-2 -bottom-2 text-5xl opacity-10">📦</div>
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Items Sold</span>
            <div class="text-2xl font-black text-slate-900 mt-1">${earnings.totalItemsSold}</div>
            <div class="flex items-center gap-1 text-[11px] text-purple-600 font-bold mt-1">
              <span>Units Fulfilled</span>
            </div>
          </div>

          <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div class="absolute -right-2 -bottom-2 text-5xl opacity-10">📊</div>
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg. Order Value</span>
            <div class="text-2xl font-black text-slate-900 mt-1">₹ ${earnings.avgOrderValue.toLocaleString('en-IN')}</div>
            <div class="flex items-center gap-1 text-[11px] text-teal-600 font-bold mt-1">
              <span>Per transaction</span>
            </div>
          </div>
        </div>

        <!-- Charts & Category Breakdown Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Category Earnings Table (2 Cols) -->
          <div class="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="font-black text-base text-slate-900">Category-wise Earnings Breakdown</h3>
                <p class="text-xs text-slate-400">Live revenue distribution by product category & doorstep repairs</p>
              </div>
              <span class="bg-emerald-50 text-emerald-700 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200">Live Telemetry</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                    <th class="pb-3">Category</th>
                    <th class="pb-3 text-center">Items Sold</th>
                    <th class="pb-3 text-right">Gross Revenue</th>
                    <th class="pb-3 text-right">Share</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium">
                  ${earnings.categories.map((c, i) => {
                    const color = colors[i % colors.length];
                    return `
                      <tr class="hover:bg-slate-50 transition">
                        <td class="py-3.5 flex items-center gap-2.5">
                          <span class="w-3 h-3 rounded-full shrink-0" style="background-color: ${color}"></span>
                          <span class="font-bold text-slate-900 text-xs">${c.name}</span>
                        </td>
                        <td class="py-3.5 text-center font-mono text-slate-600 font-bold">${c.count}</td>
                        <td class="py-3.5 text-right font-bold text-slate-900 font-mono">₹ ${c.earnings.toLocaleString('en-IN')}</td>
                        <td class="py-3.5 text-right">
                          <div class="flex items-center justify-end gap-2">
                            <span class="font-mono text-xs font-bold text-slate-700">${c.share}%</span>
                            <div class="w-16 bg-slate-100 h-2 rounded-full overflow-hidden shrink-0">
                              <div class="h-full rounded-full" style="width: ${c.share}%; background-color: ${color}"></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    `;
                  }).join("")}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Revenue Donut & Insights (1 Col) -->
          <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6 flex flex-col justify-between">
            <div>
              <h3 class="font-black text-base text-slate-900 mb-1">Revenue Share Distribution</h3>
              <p class="text-xs text-slate-400 mb-4">Percentage allocation of total store revenue</p>

              <!-- Donut Chart -->
              <div class="relative w-44 h-44 mx-auto my-2">
                <svg viewBox="0 0 42 42" class="w-full h-full -rotate-90">
                  ${donutSlices}
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span class="text-[10px] font-bold text-slate-400 uppercase">Top Category</span>
                  <span class="text-xs font-black text-slate-900">${earnings.topCategory?.name || 'Laptops'}</span>
                  <span class="text-[10px] text-blue-600 font-bold">${earnings.topCategory?.share || '50.6'}%</span>
                </div>
              </div>

              <!-- Compact Legend -->
              <div class="grid grid-cols-2 gap-2 mt-4 text-[11px]">
                ${earnings.categories.slice(0, 6).map((c, i) => `
                  <div class="flex items-center gap-1.5 truncate">
                    <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: ${colors[i % colors.length]}"></span>
                    <span class="text-slate-600 truncate">${c.name}: <strong class="text-slate-900">${c.share}%</strong></span>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Quick Insight Card -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 text-xs">
              <div class="font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                <span>💡</span> Store Revenue Insight
              </div>
              <p class="text-blue-800 leading-relaxed text-[11px]">
                <strong>${earnings.topCategory?.name}</strong> accounts for the largest earnings driver (₹ ${earnings.topCategory?.earnings.toLocaleString('en-IN')}). Doorstep repairs continue to show a <strong>92% profit margin</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ==================== 2. PRODUCT CATALOG MANAGEMENT ====================
  if (tab === "products") {
    return `
      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        <div class="p-5 border-b border-slate-100 flex flex-wrap justify-between items-center gap-3">
          <div>
            <h3 class="font-black text-base text-slate-900">Hardware Catalog & Inventory</h3>
            <p class="text-xs text-slate-400">${products.length} active items available across all categories</p>
          </div>
          <button onclick="openAddProductModal()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5">
            <span>➕</span> Add New Product
          </button>
        </div>

        <div class="overflow-x-auto px-4 pb-4">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase text-[10px]">
              <tr>
                <th class="p-3">Product</th>
                <th class="p-3">Category</th>
                <th class="p-3">Brand</th>
                <th class="p-3">Deal Price</th>
                <th class="p-3">Min Offer (Floor)</th>
                <th class="p-3">Stock</th>
                <th class="p-3">Type</th>
                <th class="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${products.map(p => `
                <tr class="hover:bg-slate-50 transition">
                  <td class="p-3 flex items-center gap-3">
                    <img src="${(p.images && p.images[0]) || p.image}" alt="${p.name}" class="w-11 h-11 object-cover rounded-xl border border-slate-200 shrink-0 bg-white">
                    <div class="min-w-0">
                      <p class="font-bold text-slate-900 line-clamp-1">${p.name}</p>
                      <span class="text-[10px] text-slate-400 font-mono">${p.id}</span>
                    </div>
                  </td>
                  <td class="p-3 font-semibold text-slate-700">${p.category}</td>
                  <td class="p-3 font-semibold text-slate-800">${p.brand}</td>
                  <td class="p-3 font-bold text-teal-700 font-mono">₹ ${p.price.toLocaleString('en-IN')}</td>
                  <td class="p-3 font-mono text-slate-500 font-bold">₹ ${(p.minPrice || Math.round(p.price * 0.88)).toLocaleString('en-IN')}</td>
                  <td class="p-3 font-mono font-bold ${p.stockLeft <= 3 ? 'text-red-600' : 'text-slate-800'}">${p.stockLeft} units</td>
                  <td class="p-3">
                    ${p.isCrazyDeal ? `<span class="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Crazy Deal</span>` : `<span class="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Standard</span>`}
                  </td>
                  <td class="p-3 text-right space-x-1.5 whitespace-nowrap">
                    <button onclick="openEditProductModal('${p.id}')" class="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-2.5 py-1.5 rounded-lg transition text-[11px]">✏️ Edit</button>
                    <button onclick="handleDeleteProduct('${p.id}')" class="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-2.5 py-1.5 rounded-lg transition text-[11px]">🗑️ Delete</button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ==================== 3. ORDERS MANAGEMENT ====================
  if (tab === "orders") {
    const statusColor = {
      confirmed: "bg-blue-100 text-blue-700",
      packed: "bg-yellow-100 text-yellow-700",
      shipped: "bg-indigo-100 text-indigo-700",
      out_for_delivery: "bg-orange-100 text-orange-700",
      delivered: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700"
    };

    return `
      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 class="font-black text-base text-slate-900">Customer Purchase Orders (${orders.length})</h3>
            <p class="text-xs text-slate-400">All orders placed by customers are tracked and stored here</p>
          </div>
          <span class="bg-blue-600 text-white text-xs font-black px-3.5 py-1 rounded-full">${orders.length} Total</span>
        </div>

        ${orders.length === 0 ? `
          <div class="p-12 text-center text-slate-400">
            <div class="text-4xl mb-3">📭</div>
            <p class="font-bold text-slate-600">No orders yet</p>
            <p class="text-xs mt-1">New customer orders will appear here automatically.</p>
          </div>
        ` : `
          <div class="divide-y divide-slate-100">
            ${orders.map(o => {
              const badge = statusColor[o.status] || "bg-slate-100 text-slate-600";
              return `
                <div class="p-5 hover:bg-slate-50 transition space-y-3">
                  <div class="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div class="flex items-center gap-2 flex-wrap">
                        <span class="font-black text-sm text-slate-900 font-mono">${o.id}</span>
                        <span class="${badge} text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">${o.status.replace(/_/g,' ')}</span>
                        ${o.paymentMethod ? `<span class="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">${o.paymentMethod}</span>` : ''}
                      </div>
                      <div class="text-xs text-slate-400 mt-1">
                        🕐 ${o.date} ${o.time || ''} &nbsp;|&nbsp; Invoice: <span class="font-mono text-slate-600">${o.invoiceId || '—'}</span>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="text-xl font-black text-teal-700">₹ ${o.totals.total.toLocaleString('en-IN')}</div>
                      <div class="text-[10px] text-slate-400">Incl. GST ₹${o.totals.tax ? o.totals.tax.toFixed(0) : '0'}</div>
                    </div>
                  </div>

                  <!-- Customer & Delivery Address -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div class="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                      <div class="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Customer Details</div>
                      <div class="font-bold text-xs text-slate-900">${o.customerName || 'Customer'}</div>
                      <div class="text-xs text-slate-500 font-mono">${o.customerEmail || ''}</div>
                    </div>
                    ${o.address ? `
                      <div class="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                        <div class="text-[10px] font-bold text-slate-400 uppercase mb-0.5">📍 Shipping Address</div>
                        <div class="font-bold text-xs text-slate-900">${o.address.name} (${o.address.phone})</div>
                        <div class="text-xs text-slate-500">${o.address.line}, ${o.address.city}, ${o.address.state} - ${o.address.pin}</div>
                      </div>
                    ` : ''}
                  </div>

                  <!-- Ordered Items -->
                  <div class="space-y-1.5">
                    <div class="text-[10px] font-bold text-slate-400 uppercase">Items in this Order (${o.items.length})</div>
                    ${o.items.map(item => `
                      <div class="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-2.5">
                        <img src="${item.image || 'lapro-logo.png'}" alt="${item.name}" class="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0">
                        <div class="flex-1 min-w-0">
                          <div class="font-bold text-xs text-slate-800 line-clamp-1">${item.name}</div>
                          <div class="text-[10px] text-slate-400">${item.brand} &nbsp;•&nbsp; Qty: <strong>${item.quantity}</strong></div>
                        </div>
                        <div class="text-right shrink-0">
                          <div class="font-bold text-xs text-teal-700">₹ ${(item.price * item.quantity).toLocaleString('en-IN')}</div>
                          <div class="text-[10px] text-slate-400">@ ₹${item.price.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                    `).join('')}
                  </div>

                  <!-- Status Action Bar -->
                  <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-bold text-slate-600">Status:</span>
                      <select onchange="adminUpdateOrder('${o.id}', this.value)" class="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500">
                        <option value="confirmed" ${o.status==='confirmed'?'selected':''}>✅ Confirmed</option>
                        <option value="packed" ${o.status==='packed'?'selected':''}>📦 Packed</option>
                        <option value="shipped" ${o.status==='shipped'?'selected':''}>🚚 Shipped</option>
                        <option value="out_for_delivery" ${o.status==='out_for_delivery'?'selected':''}>🛵 Out for Delivery</option>
                        <option value="delivered" ${o.status==='delivered'?'selected':''}>✅ Delivered</option>
                        <option value="cancelled" ${o.status==='cancelled'?'selected':''}>❌ Cancelled</option>
                      </select>
                    </div>

                    <div class="flex items-center gap-2">
                      ${o.trackingId ? `<span class="text-xs text-slate-400 font-mono hidden sm:inline">Tracking: ${o.trackingId}</span>` : ''}
                      <button onclick="openEditOrderModal('${o.id}')" class="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-3 py-1.5 rounded-xl transition text-xs flex items-center gap-1">
                        <span>✏️</span> Edit Order Details
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;
  }

  // ==================== 4. CUSTOMER MANAGEMENT ====================
  if (tab === "customers") {
    return `
      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        <div class="p-5 border-b border-slate-100 flex flex-wrap justify-between items-center gap-3">
          <div>
            <h3 class="font-black text-base text-slate-900">Registered Customer Accounts (${customers.length})</h3>
            <p class="text-xs text-slate-400">Manage customer credentials, addresses, and contact records</p>
          </div>
          <button onclick="openAddCustomerModal()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5">
            <span>➕</span> Add Customer
          </button>
        </div>

        <div class="overflow-x-auto px-4 pb-4">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase text-[10px]">
              <tr>
                <th class="p-3">Customer Name</th>
                <th class="p-3">Email Address</th>
                <th class="p-3">Phone Number</th>
                <th class="p-3">Saved Addresses</th>
                <th class="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${customers.map(c => `
                <tr class="hover:bg-slate-50 transition">
                  <td class="p-3 font-bold text-slate-900 flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black">${c.name.charAt(0)}</div>
                    <div>
                      <span>${c.name}</span>
                    </div>
                  </td>
                  <td class="p-3 font-mono text-slate-700">${c.email}</td>
                  <td class="p-3 font-mono text-slate-600">${c.phone}</td>
                  <td class="p-3 text-slate-500">
                    <span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold text-[10px]">${(c.addresses || []).length} Saved</span>
                  </td>
                  <td class="p-3 text-right space-x-1.5">
                    <button onclick="openEditCustomerModal('${c.email}')" class="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-2.5 py-1.5 rounded-lg transition text-[11px]">✏️ Edit</button>
                    <button onclick="handleDeleteCustomer('${c.email}')" class="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-2.5 py-1.5 rounded-lg transition text-[11px]">🗑️ Delete</button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ==================== 5. SERVICE & REPAIR TICKETS ====================
  if (tab === "tickets") {
    return `
      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        <div class="p-5 border-b border-slate-100">
          <h3 class="font-black text-base text-slate-900">Doorstep Repair Service Tickets (${tickets.length})</h3>
          <p class="text-xs text-slate-400">Manage diagnostic lifecycle, pickup, repair progress, and delivery</p>
        </div>
        <div class="overflow-x-auto px-4 pb-4">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase text-[10px]">
              <tr>
                <th class="p-3">Ticket ID</th>
                <th class="p-3">Customer</th>
                <th class="p-3">Device & Issue</th>
                <th class="p-3">Service Mode</th>
                <th class="p-3">Status</th>
                <th class="p-3 text-right">Actions & Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${tickets.map(t => `
                <tr class="hover:bg-slate-50 transition">
                  <td class="p-3 font-mono font-bold text-slate-900">${t.id}</td>
                  <td class="p-3 font-semibold text-slate-800">${t.customerName || 'Customer'}<br><span class="text-[10px] text-slate-400">${t.customerPhone || ''}</span></td>
                  <td class="p-3 font-medium text-slate-700"><strong>${t.brand} ${t.model}</strong><br><span class="text-[10px] text-red-500 font-semibold">${t.problem}</span></td>
                  <td class="p-3 text-slate-500">${t.mode}</td>
                  <td class="p-3"><span class="bg-amber-100 text-amber-800 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase">${t.status.replace(/_/g,' ')}</span></td>
                  <td class="p-3 text-right space-x-1.5 whitespace-nowrap">
                    <select onchange="adminUpdateTicket('${t.id}', this.value)" class="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1 text-[11px] font-bold text-slate-800 focus:outline-none focus:border-blue-500">
                      <option value="received" ${t.status === 'received' ? 'selected' : ''}>Received</option>
                      <option value="scheduled" ${t.status === 'scheduled' ? 'selected' : ''}>Pickup Scheduled</option>
                      <option value="picked_up" ${t.status === 'picked_up' ? 'selected' : ''}>Picked Up</option>
                      <option value="center" ${t.status === 'center' ? 'selected' : ''}>At Center</option>
                      <option value="diagnosing" ${t.status === 'diagnosing' ? 'selected' : ''}>Diagnosing</option>
                      <option value="estimate_sent" ${t.status === 'estimate_sent' ? 'selected' : ''}>Estimate Sent</option>
                      <option value="repair_progress" ${t.status === 'repair_progress' ? 'selected' : ''}>Repair In Progress</option>
                      <option value="ready" ${t.status === 'ready' ? 'selected' : ''}>Ready</option>
                      <option value="delivered" ${t.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    </select>
                    <button onclick="openEditTicketModal('${t.id}')" class="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-lg transition text-[11px]">
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ==================== 6. CATEGORY MANAGEMENT ====================
  if (tab === "categories") {
    return `
      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        <div class="p-5 border-b border-slate-100 flex flex-wrap justify-between items-center gap-3">
          <div>
            <h3 class="font-black text-base text-slate-900">Category Management (${categories.length} Categories)</h3>
            <p class="text-xs text-slate-400">Add, rename, and organize store product categories</p>
          </div>
          <button onclick="openAddCategoryModal()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5">
            <span>➕</span> Add New Category
          </button>
        </div>

        <div class="overflow-x-auto px-4 pb-4">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase text-[10px]">
              <tr>
                <th class="p-3">Category Name</th>
                <th class="p-3">Icon / Symbol</th>
                <th class="p-3">Linked Products</th>
                <th class="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${categories.map(cat => {
                const prodCount = products.filter(p => p.category === cat.name).length;
                return `
                  <tr class="hover:bg-slate-50 transition">
                    <td class="p-3 font-bold text-slate-900 flex items-center gap-2">
                      <span class="text-xl">${cat.icon || '📦'}</span>
                      <span class="text-sm">${cat.name}</span>
                    </td>
                    <td class="p-3 font-mono text-base">${cat.icon || '📦'}</td>
                    <td class="p-3 font-bold text-slate-600">${prodCount} Products</td>
                    <td class="p-3 text-right space-x-1.5">
                      <button onclick="openEditCategoryModal('${cat.id}')" class="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-2.5 py-1.5 rounded-lg transition text-[11px]">✏️ Edit / Rename</button>
                      <button onclick="handleDeleteCategory('${cat.id}')" class="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-2.5 py-1.5 rounded-lg transition text-[11px]">🗑️ Delete</button>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

// ======================== MULTI-IMAGE LOCAL FILE UPLOAD HELPER ========================
let tempUploadedImages = [];

function handleProductFilesSelect(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      tempUploadedImages.push(e.target.result);
      renderProductImagePreviews();
    };
    reader.readAsDataURL(file);
  });
}

function removeTempImage(idx) {
  tempUploadedImages.splice(idx, 1);
  renderProductImagePreviews();
}

function renderProductImagePreviews() {
  const container = document.getElementById("product-img-previews");
  if (!container) return;

  if (tempUploadedImages.length === 0) {
    container.innerHTML = `<p class="text-slate-400 text-xs italic">No local images chosen yet.</p>`;
    return;
  }

  container.innerHTML = `
    <div class="flex flex-wrap gap-2.5 pt-2">
      ${tempUploadedImages.map((src, idx) => `
        <div class="relative group w-16 h-16 rounded-xl border border-slate-300 overflow-hidden shadow-sm bg-white">
          <img src="${src}" class="w-full h-full object-cover">
          <button type="button" onclick="removeTempImage(${idx})" class="absolute top-0.5 right-0.5 bg-red-600 text-white rounded-full w-4 h-4 text-[10px] font-bold flex items-center justify-center shadow opacity-90 hover:opacity-100">✕</button>
        </div>
      `).join("")}
    </div>
  `;
}

// Helper to calculate smart suggested negotiate price floor
function autoSuggestMinPrice(val) {
  const minInp = document.getElementById("new-prod-minprice");
  if (minInp && (!minInp.value || minInp.dataset.userEdited !== "true")) {
    const num = Number(val);
    if (num > 0) {
      minInp.value = Math.round(num * 0.88);
    }
  }
}

// ======================== ADMIN PRODUCT CRUD MODALS ========================
function openAddProductModal() {
  const container = document.getElementById("product-modal-container");
  if (!container) return;

  tempUploadedImages = [];
  const categories = appState.state.categories || [];

  container.innerHTML = `
    <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl fade-in max-h-[90vh] overflow-y-auto border border-slate-200">
        <div class="flex justify-between items-center pb-3 border-b mb-4">
          <h3 class="font-black text-base text-slate-900">➕ Add New Product to Inventory</h3>
          <button onclick="closeProductModal()" class="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
        </div>

        <form onsubmit="handleCreateProductSubmit(event)" class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Product Title / Name <span class="text-red-500">*</span></label>
            <input type="text" id="new-prod-name" placeholder="e.g. Dell XPS 15 9520, Core i7, 32GB RAM, 1TB SSD" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-semibold">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Category <span class="text-red-500">*</span></label>
              <select id="new-prod-category" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-bold">
                ${categories.map(c => `<option value="${c.name}">${c.icon || '📦'} ${c.name}</option>`).join("")}
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Brand <span class="text-red-500">*</span></label>
              <input type="text" id="new-prod-brand" placeholder="e.g. Dell, HP, Lenovo, Apple" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">
            </div>
          </div>

          <!-- Pricing & Price Negotiation Settings -->
          <div class="bg-amber-50/70 border border-amber-200 p-3.5 rounded-2xl space-y-2">
            <div class="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
              <span>💬</span>
              <span>Pricing & Customer Price Negotiation Settings</span>
            </div>
            
            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block font-bold text-slate-700 uppercase mb-1 text-[11px]">Selling Price (₹) <span class="text-red-500">*</span></label>
                <input type="number" id="new-prod-price" placeholder="45000" oninput="autoSuggestMinPrice(this.value)" required class="w-full bg-white border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-mono font-bold text-teal-700">
              </div>
              <div>
                <label class="block font-bold text-amber-900 uppercase mb-1 text-[11px]">Negotiate Min Floor (₹) <span class="text-red-500">*</span></label>
                <input type="number" id="new-prod-minprice" placeholder="39000" required class="w-full bg-white border border-amber-400 rounded-xl p-2.5 focus:outline-none focus:border-amber-600 font-mono font-bold text-amber-900 shadow-sm" title="Minimum acceptable price for customer price counter-offers">
              </div>
              <div>
                <label class="block font-bold text-slate-700 uppercase mb-1 text-[11px]">MRP / List Price (₹)</label>
                <input type="number" id="new-prod-origprice" placeholder="89000" class="w-full bg-white border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-mono">
              </div>
            </div>
            <p class="text-[10.5px] text-amber-800">
              💡 <strong>Negotiate Price Floor:</strong> When customers click <em>"Make an Offer / Negotiate Price"</em>, counter-offers at or above this amount are automatically approved. Offers below this floor are rejected.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Stock Quantity <span class="text-red-500">*</span></label>
              <input type="number" id="new-prod-stock" value="10" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-mono font-bold">
            </div>
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Warranty <span class="text-red-500">*</span></label>
              <input type="text" id="new-prod-warranty" value="1 Year Doorstep Warranty" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">
            </div>
          </div>

          <!-- Multi-Image Local File Upload -->
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <label class="block font-bold text-slate-800 uppercase text-[11px]">Upload Product Images (Local Files) <span class="text-red-500">*</span></label>
            <input type="file" multiple accept="image/*" onchange="handleProductFilesSelect(event)" class="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs cursor-pointer">
            <div id="product-img-previews">
              <p class="text-slate-400 text-xs italic">Select one or multiple images from your computer.</p>
            </div>

            <div class="pt-2">
              <label class="block font-semibold text-slate-600 text-[10px] uppercase mb-0.5">Or Fallback Image URL</label>
              <input type="url" id="new-prod-image-url" placeholder="https://..." class="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs">
            </div>
          </div>

          <div class="flex items-center gap-4 pt-1">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="new-prod-crazy" class="rounded text-orange-600">
              <span class="font-bold text-orange-600">🔥 Feature in Crazy Deals</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="new-prod-new" checked class="rounded text-blue-600">
              <span class="font-bold text-blue-600">NEW Tag</span>
            </label>
          </div>

          <div class="pt-3 flex gap-3">
            <button type="button" onclick="closeProductModal()" class="flex-1 border border-slate-300 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow">Add to Catalog</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function handleCreateProductSubmit(event) {
  event.preventDefault();
  const urlImage = document.getElementById("new-prod-image-url")?.value;
  let finalImages = [...tempUploadedImages];
  if (finalImages.length === 0 && urlImage) {
    finalImages.push(urlImage);
  }
  if (finalImages.length === 0) {
    finalImages.push("https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&auto=format&fit=crop&q=80");
  }

  const priceVal = Number(document.getElementById("new-prod-price").value);
  const minPriceVal = Number(document.getElementById("new-prod-minprice").value) || Math.round(priceVal * 0.88);

  const newProduct = {
    name: document.getElementById("new-prod-name").value,
    category: document.getElementById("new-prod-category").value,
    brand: document.getElementById("new-prod-brand").value,
    price: priceVal,
    minPrice: minPriceVal,
    originalPrice: Number(document.getElementById("new-prod-origprice").value) || priceVal,
    stockLeft: Number(document.getElementById("new-prod-stock").value) || 10,
    warranty: document.getElementById("new-prod-warranty").value,
    images: finalImages,
    image: finalImages[0],
    isCrazyDeal: document.getElementById("new-prod-crazy").checked,
    isNew: document.getElementById("new-prod-new").checked,
    features: ["100% Genuine", "Warranty Assured", "Fast Shipping"]
  };

  appState.addProduct(newProduct);
  closeProductModal();
  setAdminTab("products");
}

function openEditProductModal(prodId) {
  const p = appState.getProductById(prodId);
  if (!p) return;

  const container = document.getElementById("product-modal-container");
  if (!container) return;

  tempUploadedImages = [...(p.images || [p.image || ""])].filter(Boolean);
  const categories = appState.state.categories || [];

  container.innerHTML = `
    <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl fade-in max-h-[90vh] overflow-y-auto border border-slate-200">
        <div class="flex justify-between items-center pb-3 border-b mb-4">
          <h3 class="font-black text-base text-slate-900">✏️ Edit Product: ${p.id}</h3>
          <button onclick="closeProductModal()" class="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
        </div>

        <form onsubmit="handleEditProductSubmit(event, '${p.id}')" class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Product Title <span class="text-red-500">*</span></label>
            <input type="text" id="edit-prod-name" value="${p.name}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-semibold">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Category <span class="text-red-500">*</span></label>
              <select id="edit-prod-category" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-bold">
                ${categories.map(c => `<option value="${c.name}" ${p.category === c.name ? 'selected' : ''}>${c.icon || '📦'} ${c.name}</option>`).join("")}
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Brand <span class="text-red-500">*</span></label>
              <input type="text" id="edit-prod-brand" value="${p.brand || ''}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">
            </div>
          </div>

          <!-- Pricing & Price Negotiation Settings -->
          <div class="bg-amber-50/70 border border-amber-200 p-3.5 rounded-2xl space-y-2">
            <div class="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
              <span>💬</span>
              <span>Pricing & Customer Price Negotiation Settings</span>
            </div>
            
            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block font-bold text-slate-700 uppercase mb-1 text-[11px]">Selling Price (₹) <span class="text-red-500">*</span></label>
                <input type="number" id="edit-prod-price" value="${p.price}" required class="w-full bg-white border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-mono font-bold text-teal-700">
              </div>
              <div>
                <label class="block font-bold text-amber-900 uppercase mb-1 text-[11px]">Negotiate Min Floor (₹) <span class="text-red-500">*</span></label>
                <input type="number" id="edit-prod-minprice" value="${p.minPrice || Math.round(p.price * 0.88)}" required class="w-full bg-white border border-amber-400 rounded-xl p-2.5 focus:outline-none focus:border-amber-600 font-mono font-bold text-amber-900 shadow-sm" title="Minimum acceptable price for customer price counter-offers">
              </div>
              <div>
                <label class="block font-bold text-slate-700 uppercase mb-1 text-[11px]">MRP / List Price (₹)</label>
                <input type="number" id="edit-prod-origprice" value="${p.originalPrice || p.price}" class="w-full bg-white border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-mono">
              </div>
            </div>
            <p class="text-[10.5px] text-amber-800">
              💡 <strong>Negotiate Price Floor:</strong> When customers click <em>"Make an Offer / Negotiate Price"</em>, counter-offers at or above this amount are automatically approved.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Stock Left <span class="text-red-500">*</span></label>
              <input type="number" id="edit-prod-stock" value="${p.stockLeft}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-mono font-bold">
            </div>
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Warranty</label>
              <input type="text" id="edit-prod-warranty" value="${p.specs?.warranty || p.warranty || '1 Year Warranty'}" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">
            </div>
          </div>

          <!-- Multi-Image Local File Upload -->
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <label class="block font-bold text-slate-800 uppercase text-[11px]">Product Images (Local File Upload)</label>
            <input type="file" multiple accept="image/*" onchange="handleProductFilesSelect(event)" class="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs cursor-pointer">
            <div id="product-img-previews"></div>
          </div>

          <div class="flex items-center gap-4 pt-1">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="edit-prod-crazy" ${p.isCrazyDeal ? 'checked' : ''} class="rounded text-orange-600">
              <span class="font-bold text-orange-600">🔥 Feature in Crazy Deals</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="edit-prod-new" ${p.isNew ? 'checked' : ''} class="rounded text-blue-600">
              <span class="font-bold text-blue-600">NEW Tag</span>
            </label>
          </div>

          <div class="pt-3 flex gap-3">
            <button type="button" onclick="closeProductModal()" class="flex-1 border border-slate-300 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  `;

  renderProductImagePreviews();
}

function handleEditProductSubmit(event, prodId) {
  event.preventDefault();
  let finalImages = [...tempUploadedImages];
  if (finalImages.length === 0) {
    finalImages.push("https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&auto=format&fit=crop&q=80");
  }

  const priceVal = Number(document.getElementById("edit-prod-price").value);
  const minPriceVal = Number(document.getElementById("edit-prod-minprice").value) || Math.round(priceVal * 0.88);

  const updatedData = {
    name: document.getElementById("edit-prod-name").value,
    category: document.getElementById("edit-prod-category").value,
    brand: document.getElementById("edit-prod-brand").value,
    price: priceVal,
    minPrice: minPriceVal,
    originalPrice: Number(document.getElementById("edit-prod-origprice").value),
    stockLeft: Number(document.getElementById("edit-prod-stock").value),
    images: finalImages,
    image: finalImages[0],
    isCrazyDeal: document.getElementById("edit-prod-crazy").checked,
    isNew: document.getElementById("edit-prod-new").checked,
    specs: { warranty: document.getElementById("edit-prod-warranty").value }
  };

  appState.updateProduct(prodId, updatedData);
  closeProductModal();
  setAdminTab("products");
}

function handleDeleteProduct(prodId) {
  if (confirm(`Are you sure you want to permanently delete product "${prodId}" from the live catalog?`)) {
    appState.deleteProduct(prodId);
    setAdminTab("products");
  }
}

function closeProductModal() {
  const container = document.getElementById("product-modal-container");
  if (container) container.innerHTML = "";
}

// ======================== ADMIN CATEGORY CRUD MODALS ========================
function openAddCategoryModal() {
  const container = document.getElementById("admin-category-modal-container");
  if (!container) return;

  container.innerHTML = `
    <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl fade-in border border-slate-200">
        <div class="flex justify-between items-center pb-3 border-b mb-4">
          <h3 class="font-black text-base text-slate-900">➕ Add New Category</h3>
          <button onclick="closeCategoryModal()" class="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
        </div>

        <form onsubmit="handleCreateCategorySubmit(event)" class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Category Name <span class="text-red-500">*</span></label>
            <input type="text" id="new-cat-name" placeholder="e.g. Graphic Tablets, Audio, Monitors" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-bold">
          </div>
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Category Emoji / Icon</label>
            <input type="text" id="new-cat-icon" placeholder="e.g. 🎨, 🎧, 🖥️" value="📦" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-mono text-base">
          </div>

          <div class="pt-2 flex gap-3">
            <button type="button" onclick="closeCategoryModal()" class="flex-1 border border-slate-300 text-slate-700 font-bold py-2.5 rounded-xl hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition shadow">Save Category</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function handleCreateCategorySubmit(event) {
  event.preventDefault();
  const name = document.getElementById("new-cat-name").value;
  const icon = document.getElementById("new-cat-icon").value || "📦";

  const res = appState.addCategory(name, icon);
  if (res.success) {
    closeCategoryModal();
    setAdminTab("categories");
  } else {
    alert(res.message);
  }
}

function openEditCategoryModal(catId) {
  const cat = (appState.state.categories || []).find(c => c.id === catId);
  if (!cat) return;

  const container = document.getElementById("admin-category-modal-container");
  if (!container) return;

  container.innerHTML = `
    <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl fade-in border border-slate-200">
        <div class="flex justify-between items-center pb-3 border-b mb-4">
          <h3 class="font-black text-base text-slate-900">✏️ Edit Category</h3>
          <button onclick="closeCategoryModal()" class="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
        </div>

        <form onsubmit="handleEditCategorySubmit(event, '${cat.id}')" class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Category Name <span class="text-red-500">*</span></label>
            <input type="text" id="edit-cat-name" value="${cat.name}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-bold">
          </div>
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Category Emoji / Icon</label>
            <input type="text" id="edit-cat-icon" value="${cat.icon || '📦'}" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-mono text-base">
          </div>

          <div class="pt-2 flex gap-3">
            <button type="button" onclick="closeCategoryModal()" class="flex-1 border border-slate-300 text-slate-700 font-bold py-2.5 rounded-xl hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition shadow">Update Category</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function handleEditCategorySubmit(event, catId) {
  event.preventDefault();
  const name = document.getElementById("edit-cat-name").value;
  const icon = document.getElementById("edit-cat-icon").value;

  const res = appState.updateCategory(catId, name, icon);
  if (res.success) {
    closeCategoryModal();
    setAdminTab("categories");
  } else {
    alert(res.message);
  }
}

function handleDeleteCategory(catId) {
  const cat = (appState.state.categories || []).find(c => c.id === catId);
  if (!cat) return;

  if (confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
    appState.deleteCategory(catId);
    setAdminTab("categories");
  }
}

function closeCategoryModal() {
  const container = document.getElementById("admin-category-modal-container");
  if (container) container.innerHTML = "";
}

// ======================== ADMIN CUSTOMER CRUD MODALS ========================
function openAddCustomerModal() {
  const container = document.getElementById("admin-customer-modal-container");
  if (!container) return;

  container.innerHTML = `
    <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl fade-in border border-slate-200">
        <div class="flex justify-between items-center pb-3 border-b mb-4">
          <h3 class="font-black text-base text-slate-900">➕ Add New Customer Account</h3>
          <button onclick="closeCustomerModal()" class="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
        </div>

        <form onsubmit="handleCreateCustomerSubmit(event)" class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Full Name <span class="text-red-500">*</span></label>
            <input type="text" id="new-cust-name" placeholder="e.g. Ramesh Kumar" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-semibold">
          </div>
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Email Address <span class="text-red-500">*</span></label>
            <input type="email" id="new-cust-email" placeholder="ramesh@example.com" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-mono">
          </div>
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Phone Number <span class="text-red-500">*</span></label>
            <input type="tel" id="new-cust-phone" placeholder="+91 98450 00000" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">
          </div>
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Delivery Address</label>
            <input type="text" id="new-cust-address" placeholder="e.g. 45, 1st Cross, Indiranagar, Bangalore" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">
          </div>

          <div class="pt-2 flex gap-3">
            <button type="button" onclick="closeCustomerModal()" class="flex-1 border border-slate-300 text-slate-700 font-bold py-2.5 rounded-xl hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition shadow">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function handleCreateCustomerSubmit(event) {
  event.preventDefault();
  const customerData = {
    name: document.getElementById("new-cust-name").value,
    email: document.getElementById("new-cust-email").value,
    phone: document.getElementById("new-cust-phone").value,
    addressLine: document.getElementById("new-cust-address").value
  };

  const res = appState.addCustomer(customerData);
  if (res.success) {
    closeCustomerModal();
    setAdminTab("customers");
  } else {
    alert(res.message);
  }
}

function openEditCustomerModal(email) {
  const c = (appState.state.registeredUsers || []).find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!c) return;

  const container = document.getElementById("admin-customer-modal-container");
  if (!container) return;

  container.innerHTML = `
    <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl fade-in border border-slate-200">
        <div class="flex justify-between items-center pb-3 border-b mb-4">
          <h3 class="font-black text-base text-slate-900">✏️ Edit Customer</h3>
          <button onclick="closeCustomerModal()" class="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
        </div>

        <form onsubmit="handleEditCustomerSubmit(event, '${c.email}')" class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Customer Name <span class="text-red-500">*</span></label>
            <input type="text" id="edit-cust-name" value="${c.name}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-bold">
          </div>
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Phone Number <span class="text-red-500">*</span></label>
            <input type="tel" id="edit-cust-phone" value="${c.phone}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-mono">
          </div>

          <div class="pt-2 flex gap-3">
            <button type="button" onclick="closeCustomerModal()" class="flex-1 border border-slate-300 text-slate-700 font-bold py-2.5 rounded-xl hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition shadow">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function handleEditCustomerSubmit(event, email) {
  event.preventDefault();
  const name = document.getElementById("edit-cust-name").value;
  const phone = document.getElementById("edit-cust-phone").value;

  const res = appState.updateCustomer(email, { name, phone });
  if (res.success) {
    closeCustomerModal();
    setAdminTab("customers");
  } else {
    alert(res.message);
  }
}

function handleDeleteCustomer(email) {
  if (confirm(`Are you sure you want to remove customer account "${email}"?`)) {
    appState.deleteCustomer(email);
    setAdminTab("customers");
  }
}

function closeCustomerModal() {
  const container = document.getElementById("admin-customer-modal-container");
  if (container) container.innerHTML = "";
}

// ======================== ADMIN ORDER EDIT MODAL ========================
function openEditOrderModal(orderId) {
  const o = (appState.state.orders || []).find(ord => ord.id === orderId);
  if (!o) return;

  const container = document.getElementById("admin-order-modal-container");
  if (!container) return;

  const addr = o.address || { name: o.customerName || '', phone: '', line: '', city: 'Bangalore', state: 'Karnataka', pin: '560001' };

  container.innerHTML = `
    <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl fade-in max-h-[90vh] overflow-y-auto border border-slate-200">
        <div class="flex justify-between items-center pb-3 border-b mb-4">
          <div>
            <h3 class="font-black text-base text-slate-900">✏️ Edit Order: #${o.id}</h3>
            <p class="text-[11px] text-slate-400">Placed on ${o.date} &nbsp;|&nbsp; Total: ₹ ${o.totals?.total?.toLocaleString('en-IN') || 0}</p>
          </div>
          <button onclick="closeOrderModal()" class="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
        </div>

        <form onsubmit="handleEditOrderSubmit(event, '${o.id}')" class="space-y-4 text-xs">
          <!-- Customer & Contact -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Customer Name <span class="text-red-500">*</span></label>
              <input type="text" id="edit-ord-custname" value="${o.customerName || addr.name || ''}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-bold">
            </div>
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Customer Phone</label>
              <input type="tel" id="edit-ord-phone" value="${addr.phone || ''}" placeholder="+91 98450 00000" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-mono">
            </div>
          </div>

          <!-- Shipping Address -->
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Doorstep Delivery Address</label>
            <input type="text" id="edit-ord-line" value="${addr.line || ''}" placeholder="Street, Flat/House No, Landmark" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">City</label>
              <input type="text" id="edit-ord-city" value="${addr.city || 'Bangalore'}" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">State</label>
              <input type="text" id="edit-ord-state" value="${addr.state || 'Karnataka'}" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">PIN Code</label>
              <input type="text" id="edit-ord-pin" value="${addr.pin || '560001'}" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-mono">
            </div>
          </div>

          <!-- Logistics & Fulfillment -->
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div class="font-bold text-slate-800 text-[11px] uppercase">🚚 Logistics & Dispatch Information</div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-600 mb-1">Courier / Carrier Partner</label>
                <select id="edit-ord-carrier" class="w-full bg-white border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-bold">
                  <option value="BlueDart Express" ${o.deliveryPartner==='BlueDart Express'?'selected':''}>BlueDart Express</option>
                  <option value="Delhivery Surface" ${o.deliveryPartner==='Delhivery Surface'?'selected':''}>Delhivery Surface</option>
                  <option value="DTDC Air" ${o.deliveryPartner==='DTDC Air'?'selected':''}>DTDC Air Express</option>
                  <option value="Lapro Doorstep Fleet" ${o.deliveryPartner==='Lapro Doorstep Fleet'?'selected':''}>Lapro Doorstep Fleet (Bangalore Direct)</option>
                  <option value="Ekart Logistics" ${o.deliveryPartner==='Ekart Logistics'?'selected':''}>Ekart Logistics</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-600 mb-1">Tracking Number / AWB</label>
                <input type="text" id="edit-ord-tracking" value="${o.trackingId || ''}" placeholder="e.g. LP98234123" class="w-full bg-white border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-mono font-bold">
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-600 mb-1">Fulfillment Status</label>
              <select id="edit-ord-status" class="w-full bg-white border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-bold">
                <option value="confirmed" ${o.status==='confirmed'?'selected':''}>✅ Confirmed</option>
                <option value="packed" ${o.status==='packed'?'selected':''}>📦 Packed</option>
                <option value="shipped" ${o.status==='shipped'?'selected':''}>🚚 Shipped</option>
                <option value="out_for_delivery" ${o.status==='out_for_delivery'?'selected':''}>🛵 Out for Delivery</option>
                <option value="delivered" ${o.status==='delivered'?'selected':''}>✅ Delivered</option>
                <option value="cancelled" ${o.status==='cancelled'?'selected':''}>❌ Cancelled</option>
              </select>
            </div>
          </div>

          <div class="pt-2 flex gap-3">
            <button type="button" onclick="closeOrderModal()" class="flex-1 border border-slate-300 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow">Save Order Changes</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function handleEditOrderSubmit(event, orderId) {
  event.preventDefault();
  const o = (appState.state.orders || []).find(ord => ord.id === orderId);
  if (!o) return;

  const newStatus = document.getElementById("edit-ord-status").value;
  const updatedData = {
    customerName: document.getElementById("edit-ord-custname").value,
    deliveryPartner: document.getElementById("edit-ord-carrier").value,
    trackingId: document.getElementById("edit-ord-tracking").value,
    status: newStatus,
    address: {
      name: document.getElementById("edit-ord-custname").value,
      phone: document.getElementById("edit-ord-phone").value,
      line: document.getElementById("edit-ord-line").value,
      city: document.getElementById("edit-ord-city").value,
      state: document.getElementById("edit-ord-state").value,
      pin: document.getElementById("edit-ord-pin").value
    }
  };

  appState.updateOrderDetails(orderId, updatedData);
  if (newStatus !== o.status) {
    appState.updateOrderStatus(orderId, newStatus);
  }

  closeOrderModal();
  setAdminTab("orders");
}

function closeOrderModal() {
  const container = document.getElementById("admin-order-modal-container");
  if (container) container.innerHTML = "";
}

// ======================== ADMIN SERVICE TICKET EDIT MODAL ========================
function openEditTicketModal(ticketId) {
  const t = (appState.state.serviceTickets || []).find(tkt => tkt.id === ticketId);
  if (!t) return;

  const container = document.getElementById("admin-ticket-modal-container");
  if (!container) return;

  const currentEst = t.estimate?.total || (t.estimate ? Number(t.estimate) : 0);

  container.innerHTML = `
    <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl fade-in max-h-[90vh] overflow-y-auto border border-slate-200">
        <div class="flex justify-between items-center pb-3 border-b mb-4">
          <div>
            <h3 class="font-black text-base text-slate-900">🛠️ Edit Repair Ticket: #${t.id}</h3>
            <p class="text-[11px] text-slate-400">Created on ${t.date} &nbsp;|&nbsp; Device: ${t.brand} ${t.model}</p>
          </div>
          <button onclick="closeTicketModal()" class="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
        </div>

        <form onsubmit="handleEditTicketSubmit(event, '${t.id}')" class="space-y-4 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Customer Name</label>
              <input type="text" id="edit-tkt-custname" value="${t.customerName || ''}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-bold">
            </div>
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Customer Phone / Contact</label>
              <input type="tel" id="edit-tkt-phone" value="${t.customerPhone || (t.address?.phone) || ''}" placeholder="+91 98450 00000" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-mono">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Device Brand & Model</label>
              <input type="text" id="edit-tkt-brandmodel" value="${t.brand} ${t.model}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-semibold">
            </div>
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Service Mode / Location</label>
              <input type="text" id="edit-tkt-mode" value="${t.mode}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Reported Issue / Problem</label>
            <input type="text" id="edit-tkt-problem" value="${t.problem}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">
          </div>

          <!-- Diagnostic Estimate & Costing -->
          <div class="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200 space-y-3">
            <div class="font-bold text-indigo-950 text-[11px] uppercase flex items-center gap-1.5">
              <span>🧾</span> Diagnostic Estimate & Payment Setting
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Repair Cost / Estimate (₹)</label>
                <input type="number" id="edit-tkt-estimate" value="${currentEst || 0}" placeholder="2500" class="w-full bg-white border border-indigo-300 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600 font-mono font-bold text-indigo-900">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Payment Status</label>
                <select id="edit-tkt-payment" class="w-full bg-white border border-indigo-300 rounded-xl p-2.5 focus:outline-none focus:border-indigo-600 font-bold">
                  <option value="pending" ${t.paymentStatus==='pending'?'selected':''}>⏳ Payment Pending</option>
                  <option value="paid" ${t.paymentStatus==='paid'?'selected':''}>✅ Paid & Cleared</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Ticket Workflow Status -->
          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Lifecycle Status</label>
            <select id="edit-tkt-status" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-bold">
              <option value="received" ${t.status==='received'?'selected':''}>1. Received</option>
              <option value="scheduled" ${t.status==='scheduled'?'selected':''}>2. Pickup Scheduled</option>
              <option value="picked_up" ${t.status==='picked_up'?'selected':''}>3. Picked Up</option>
              <option value="center" ${t.status==='center'?'selected':''}>4. At Service Center</option>
              <option value="diagnosing" ${t.status==='diagnosing'?'selected':''}>5. Diagnosing</option>
              <option value="estimate_sent" ${t.status==='estimate_sent'?'selected':''}>6. Estimate Sent to Customer</option>
              <option value="repair_progress" ${t.status==='repair_progress'?'selected':''}>7. Repair In Progress</option>
              <option value="ready" ${t.status==='ready'?'selected':''}>8. Ready for Pickup/Delivery</option>
              <option value="delivered" ${t.status==='delivered'?'selected':''}>9. Delivered & Closed</option>
            </select>
          </div>

          <div class="pt-2 flex gap-3">
            <button type="button" onclick="closeTicketModal()" class="flex-1 border border-slate-300 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow">Save Ticket Changes</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function handleEditTicketSubmit(event, ticketId) {
  event.preventDefault();
  const t = (appState.state.serviceTickets || []).find(tkt => tkt.id === ticketId);
  if (!t) return;

  const newStatus = document.getElementById("edit-tkt-status").value;
  const estVal = Number(document.getElementById("edit-tkt-estimate").value) || 0;
  const payStatus = document.getElementById("edit-tkt-payment").value;

  const updatedData = {
    customerName: document.getElementById("edit-tkt-custname").value,
    customerPhone: document.getElementById("edit-tkt-phone").value,
    problem: document.getElementById("edit-tkt-problem").value,
    mode: document.getElementById("edit-tkt-mode").value,
    status: newStatus,
    paymentStatus: payStatus,
    estimate: estVal > 0 ? { total: estVal, parts: Math.round(estVal * 0.7), labor: Math.round(estVal * 0.3) } : null
  };

  appState.updateTicketDetails(ticketId, updatedData);
  if (newStatus !== t.status) {
    appState.updateTicketStatus(ticketId, newStatus, updatedData.estimate);
  }

  closeTicketModal();
  setAdminTab("tickets");
}

function closeTicketModal() {
  const container = document.getElementById("admin-ticket-modal-container");
  if (container) container.innerHTML = "";
}

// ======================== 7. CUSTOMER PROFILE & ADDRESS MANAGEMENT ========================
function renderProfileView(container, state) {
  const user = state.currentUser;
  if (!user) {
    container.innerHTML = `
      <div class="bg-white rounded-3xl border border-slate-200 p-8 text-center max-w-md mx-auto shadow-sm space-y-4">
        <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto">👤</div>
        <h2 class="text-xl font-black text-slate-900">Sign in to Access Your Account</h2>
        <p class="text-xs text-slate-500">View orders, service history, and manage saved delivery addresses.</p>
        <button onclick="openAuthModal('login')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow">Sign In / Register</button>
      </div>
    `;
    return;
  }

  const addresses = user.addresses || [];

  container.innerHTML = `
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Profile Header -->
      <div class="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-md">
            ${user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-black text-slate-900">${user.name}</h1>
              <span class="bg-green-100 text-green-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">Customer</span>
            </div>
            <p class="text-xs text-slate-500 font-mono mt-0.5">${user.email} &nbsp;•&nbsp; ${user.phone}</p>
          </div>
        </div>
        <button onclick="appState.customerLogout()" class="bg-red-50 text-red-600 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-red-100 transition">
          🚪 Logout
        </button>
      </div>

      <!-- Quick Navigation Tiles -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div onclick="appState.setView('orders')" class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm cursor-pointer hover:border-blue-600 transition flex items-center justify-between group">
          <div>
            <h3 class="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition">📑 My Purchase Orders</h3>
            <p class="text-xs text-slate-500 mt-0.5">Track current shipments and download invoices</p>
          </div>
          <span class="text-xl text-slate-300 group-hover:text-blue-600 transition">➔</span>
        </div>
        <div onclick="appState.setView('service-history')" class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm cursor-pointer hover:border-blue-600 transition flex items-center justify-between group">
          <div>
            <h3 class="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition">🛠️ My Repair Tickets</h3>
            <p class="text-xs text-slate-500 mt-0.5">Track doorstep diagnostic and repair progress</p>
          </div>
          <span class="text-xl text-slate-300 group-hover:text-blue-600 transition">➔</span>
        </div>
      </div>

      <!-- SAVED DELIVERY ADDRESSES SECTION -->
      <div class="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-5">
        <div class="flex flex-wrap justify-between items-center gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 class="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>📍</span> Saved Delivery Addresses
            </h2>
            <p class="text-xs text-slate-400">Manage addresses for hardware delivery and doorstep repair pickups</p>
          </div>
          <button onclick="openCustomerAddressModal()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow flex items-center gap-1.5">
            <span>➕</span> Add New Address
          </button>
        </div>

        ${addresses.length === 0 ? `
          <div class="text-center py-8 text-slate-400 space-y-2">
            <div class="text-3xl">📍</div>
            <p class="font-bold text-slate-600 text-xs">No saved addresses yet</p>
            <p class="text-[11px]">Add a delivery address to enable quick 1-click checkout.</p>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${addresses.map(addr => `
              <div class="border ${addr.default ? 'border-blue-600 bg-blue-50/20' : 'border-slate-200 bg-slate-50/50'} rounded-2xl p-4 space-y-2.5 relative flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-1">
                    <div class="flex items-center gap-2">
                      <span class="font-black text-sm text-slate-900">${addr.name}</span>
                      <span class="bg-slate-200 text-slate-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">${addr.tag || 'Home'}</span>
                    </div>
                    ${addr.default ? `<span class="bg-blue-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">Default</span>` : ''}
                  </div>
                  <p class="text-xs text-slate-600 leading-relaxed">${addr.line}, ${addr.city}, ${addr.state} - <strong>${addr.pin}</strong></p>
                  <p class="text-xs font-mono text-slate-500 mt-1">📞 ${addr.phone}</p>
                </div>

                <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold gap-2">
                  ${!addr.default ? `
                    <button onclick="handleSetDefaultAddress('${addr.id}')" class="text-blue-600 hover:underline text-[11px]">Set as Default</button>
                  ` : `<span class="text-[11px] text-green-600">✓ Primary Address</span>`}
                  <div class="space-x-2">
                    <button onclick="openCustomerAddressModal('${addr.id}')" class="text-slate-600 hover:text-slate-900 text-[11px]">✏️ Edit</button>
                    <button onclick="handleDeleteCustomerAddress('${addr.id}')" class="text-red-500 hover:text-red-700 text-[11px]">🗑️ Delete</button>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        `}
      </div>
    </div>

    <!-- CUSTOMER ADDRESS MODAL CONTAINER -->
    <div id="customer-address-modal-container"></div>
  `;
}

// Customer Address Modals & Actions
function openCustomerAddressModal(addrId = null) {
  const container = document.getElementById("customer-address-modal-container");
  if (!container) return;

  let existing = null;
  if (addrId && appState.state.currentUser && appState.state.currentUser.addresses) {
    existing = appState.state.currentUser.addresses.find(a => a.id === addrId);
  }

  container.innerHTML = `
    <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl fade-in border border-slate-200">
        <div class="flex justify-between items-center pb-3 border-b mb-4">
          <h3 class="font-black text-base text-slate-900">${existing ? '✏️ Edit Address' : '➕ Add Delivery Address'}</h3>
          <button onclick="closeCustomerAddressModal()" class="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
        </div>

        <form onsubmit="handleCustomerAddressSubmit(event, '${addrId || ''}')" class="space-y-4 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Contact Name <span class="text-red-500">*</span></label>
              <input type="text" id="addr-name" value="${existing ? existing.name : (appState.state.currentUser?.name || '')}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-semibold">
            </div>
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Phone Number <span class="text-red-500">*</span></label>
              <input type="tel" id="addr-phone" value="${existing ? existing.phone : (appState.state.currentUser?.phone || '')}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-mono">
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 uppercase mb-1">Street / House / Apartment Address <span class="text-red-500">*</span></label>
            <input type="text" id="addr-line" value="${existing ? existing.line : ''}" placeholder="e.g. Flat 402, Oakwood Heights, Indiranagar" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">City <span class="text-red-500">*</span></label>
              <input type="text" id="addr-city" value="${existing ? existing.city : 'Bangalore'}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">State <span class="text-red-500">*</span></label>
              <input type="text" id="addr-state" value="${existing ? existing.state : 'Karnataka'}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600">
            </div>
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">PIN Code <span class="text-red-500">*</span></label>
              <input type="text" id="addr-pin" value="${existing ? existing.pin : '560001'}" required class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-600 font-mono">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label class="block font-bold text-slate-700 uppercase mb-1">Address Tag</label>
              <select id="addr-tag" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 focus:outline-none focus:border-blue-600 font-semibold">
                <option value="Home" ${existing?.tag === 'Home' ? 'selected' : ''}>🏠 Home</option>
                <option value="Work" ${existing?.tag === 'Work' ? 'selected' : ''}>🏢 Work / Office</option>
                <option value="Other" ${existing?.tag === 'Other' ? 'selected' : ''}>📍 Other</option>
              </select>
            </div>
            <div class="flex items-center pt-5">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="addr-default" ${existing?.default ? 'checked' : ''} class="rounded text-blue-600">
                <span class="font-bold text-slate-700">Set as Default Address</span>
              </label>
            </div>
          </div>

          <div class="pt-3 flex gap-3">
            <button type="button" onclick="closeCustomerAddressModal()" class="flex-1 border border-slate-300 text-slate-700 font-bold py-2.5 rounded-xl hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition shadow">Save Address</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function handleCustomerAddressSubmit(event, addrId) {
  event.preventDefault();
  const addressData = {
    name: document.getElementById("addr-name").value,
    phone: document.getElementById("addr-phone").value,
    line: document.getElementById("addr-line").value,
    city: document.getElementById("addr-city").value,
    state: document.getElementById("addr-state").value,
    pin: document.getElementById("addr-pin").value,
    tag: document.getElementById("addr-tag").value,
    default: document.getElementById("addr-default").checked
  };

  if (addrId) {
    appState.updateCustomerAddress(addrId, addressData);
  } else {
    appState.addCustomerAddress(addressData);
  }

  closeCustomerAddressModal();
  const mainContent = document.getElementById("main-content");
  if (mainContent && appState.state.currentView === "profile") {
    renderProfileView(mainContent, appState.state);
  }
}

function handleSetDefaultAddress(addrId) {
  appState.setDefaultCustomerAddress(addrId);
  const mainContent = document.getElementById("main-content");
  if (mainContent && appState.state.currentView === "profile") {
    renderProfileView(mainContent, appState.state);
  }
}

function handleDeleteCustomerAddress(addrId) {
  if (confirm("Are you sure you want to delete this saved address?")) {
    appState.deleteCustomerAddress(addrId);
    const mainContent = document.getElementById("main-content");
    if (mainContent && appState.state.currentView === "profile") {
      renderProfileView(mainContent, appState.state);
    }
  }
}

function closeCustomerAddressModal() {
  const container = document.getElementById("customer-address-modal-container");
  if (container) container.innerHTML = "";
}

// ======================== TOAST NOTIFICATION SYSTEM ========================
function showToast(message, icon = "✅", type = "success") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl text-xs font-bold text-white transition-all transform duration-300 translate-y-4 opacity-0 pointer-events-auto border backdrop-blur-md ${
    type === 'error' ? 'bg-red-600 border-red-500 shadow-red-500/20' : type === 'info' ? 'bg-slate-900 border-slate-700 shadow-slate-900/30' : 'bg-slate-950 border-blue-500 shadow-blue-500/30'
  }`;
  toast.innerHTML = `
    <span class="text-base shrink-0">${icon}</span>
    <span class="flex-1">${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
  }, 10);

  setTimeout(() => {
    toast.classList.add("translate-y-4", "opacity-0");
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 2800);
}

// ======================== E-COMMERCE CART & WISHLIST HANDLERS ========================
function handleAddToCart(event, prodId, qty = 1) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  const prod = appState.getProductById(prodId);
  if (!prod) return;

  const success = appState.addToCart(prodId, qty);
  if (success) {
    showToast(`Added "${prod.name}" to cart!`, "🛒", "success");
    refreshCurrentViewCartState();
  }
}

function handleRemoveFromCart(event, prodId) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  const prod = appState.getProductById(prodId);
  appState.removeFromCart(prodId);
  showToast(`Removed "${prod ? prod.name : 'Item'}" from cart`, "🗑️", "info");
  refreshCurrentViewCartState();
}

function refreshCurrentViewCartState() {
  const mainContent = document.getElementById("main-content");
  if (!mainContent) return;
  const currentView = appState.state.currentView;
  if (currentView === "catalog") {
    renderCatalogView(mainContent, appState.state);
  } else if (currentView === "product") {
    renderProductView(mainContent, appState.state);
  } else if (currentView === "wishlist") {
    renderWishlistView(mainContent, appState.state);
  } else if (currentView === "cart") {
    renderCartView(mainContent, appState.state);
  }
}

function handleToggleWishlist(event, prodId) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  const prod = appState.getProductById(prodId);
  const wasInWishlist = (appState.state.wishlist || []).includes(prodId);
  const success = appState.toggleWishlist(prodId);

  if (success) {
    if (wasInWishlist) {
      showToast(`Removed from Wishlist`, "💔", "info");
    } else {
      showToast(`Added "${prod ? prod.name : ''}" to Wishlist!`, "❤️", "success");
    }

    if (appState.state.currentView === "wishlist") {
      const mainContent = document.getElementById("main-content");
      if (mainContent) renderWishlistView(mainContent, appState.state);
    } else {
      if (event && event.currentTarget) {
        const btn = event.currentTarget;
        const nowIn = (appState.state.wishlist || []).includes(prodId);
        btn.innerHTML = nowIn 
          ? `<span class="text-red-500 font-bold">❤️</span>` 
          : `<span class="text-slate-400">🤍</span>`;
      }
    }
  }
}

// ======================== 8. DEDICATED WISHLIST VIEW ========================
function renderWishlistView(container, state) {
  const wishlistIds = state.wishlist || [];
  const products = wishlistIds.map(id => appState.getProductById(id)).filter(Boolean);

  if (!state.currentUser && !state.adminUser) {
    container.innerHTML = `
      <div class="bg-white rounded-3xl border border-slate-200 p-8 text-center max-w-md mx-auto shadow-sm space-y-4 my-8">
        <div class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-3xl mx-auto">❤️</div>
        <h2 class="text-xl font-black text-slate-900">Sign In to View Your Wishlist</h2>
        <p class="text-xs text-slate-500">Save your favorite laptops, desktops, and parts to buy anytime.</p>
        <button onclick="openAuthModal('login')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow">Sign In / Register</button>
      </div>
    `;
    return;
  }

  if (products.length === 0) {
    container.innerHTML = `
      <div class="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div class="w-20 h-20 bg-red-50 text-red-400 rounded-3xl flex items-center justify-center text-4xl mx-auto border border-red-100 shadow-sm">
          🤍
        </div>
        <h2 class="text-2xl font-black text-slate-900">Your Wishlist is Empty</h2>
        <p class="text-xs text-slate-500 max-w-md mx-auto">Explore our hardware catalog and click the heart icon on any product to save it here for later!</p>
        <button onclick="appState.setView('catalog')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow">
          Explore Hardware Catalog
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="max-w-6xl mx-auto space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div>
          <h1 class="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>❤️</span> My Wishlist
          </h1>
          <p class="text-xs text-slate-400 mt-0.5">${products.length} saved products</p>
        </div>
        <button onclick="appState.setView('catalog')" class="text-xs font-bold text-blue-600 hover:underline">
          + Continue Shopping
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${products.map(p => `
          <div class="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between group relative">
            <button onclick="handleToggleWishlist(event, '${p.id}')" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow flex items-center justify-center text-red-500 hover:scale-110 transition z-10" title="Remove from Wishlist">
              ✕
            </button>

            <div onclick="appState.setView('product', { product: '${p.id}' })" class="cursor-pointer">
              <div class="h-44 bg-slate-50 rounded-2xl overflow-hidden mb-3 flex items-center justify-center p-2">
                <img src="${(p.images && p.images[0]) || p.image}" alt="${p.name}" class="w-full h-full object-contain group-hover:scale-105 transition duration-300">
              </div>
              <span class="text-[10px] font-bold text-blue-600 uppercase tracking-wider">${p.category}</span>
              <h3 class="font-bold text-xs text-slate-900 line-clamp-2 mt-0.5 group-hover:text-blue-600 transition">${p.name}</h3>
              
              <div class="mt-2 flex items-baseline gap-2">
                <span class="text-base font-black text-slate-900 font-mono">₹ ${p.price.toLocaleString('en-IN')}</span>
                ${p.originalPrice > p.price ? `<span class="text-[11px] text-slate-400 line-through font-mono">₹ ${p.originalPrice.toLocaleString('en-IN')}</span>` : ''}
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 mt-3 space-y-2">
              ${(appState.state.cart || []).some(item => item.id === p.id) ? `
                <button onclick="handleRemoveFromCart(event, '${p.id}')" class="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs py-2.5 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5" title="Remove from Cart">
                  <span>🗑️</span> Remove from Cart
                </button>
              ` : `
                <button onclick="handleAddToCart(event, '${p.id}', 1)" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition shadow flex items-center justify-center gap-1.5">
                  <span>🛒</span> Move to Cart
                </button>
              `}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderAboutView(container) {
  container.innerHTML = `
    <div class="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-4">
      <h1 class="text-2xl font-black text-slate-900">About Lapro Solutions</h1>
      <p class="text-xs leading-relaxed text-slate-600">Lapro Solutions is India's leading enterprise IT procurement, certified refurbished hardware provider, and doorstep computer repair specialist. We ensure 100% genuine components, 32-point diagnostic quality checks, and doorstep pickup & drop repairs.</p>
    </div>
  `;
}

function renderFAQView(container) {
  container.innerHTML = `
    <div class="max-w-3xl mx-auto space-y-4">
      <h1 class="text-2xl font-black text-slate-900 mb-4">Frequently Asked Questions</h1>
      ${(appState.state.faqs || []).map(f => `
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <h3 class="font-bold text-sm text-slate-900">${f.q}</h3>
          <p class="text-xs text-slate-600 leading-relaxed">${f.a}</p>
        </div>
      `).join("")}
    </div>
  `;
}

function renderContactView(container) {
  container.innerHTML = `
    <div class="max-w-5xl mx-auto space-y-8 py-4">
      <!-- Contact Hero -->
      <div class="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 shadow-2xl border border-slate-800 text-center space-y-3">
        <span class="bg-blue-600/30 text-cyan-300 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-blue-400/30">Connect With Us</span>
        <h1 class="text-3xl font-black text-white">Contact & Service Center Locations</h1>
        <p class="text-xs text-slate-300 max-w-xl mx-auto">Get in touch for enterprise hardware procurement, retail laptop sales, or certified doorstep repair services across Bangalore.</p>
        
        <div class="flex flex-wrap justify-center gap-4 pt-3">
          <a href="tel:7996389264" class="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-2">
            <span>📞</span> <span>Call Us: +91 7996389264</span>
          </a>
          <a href="mailto:laprosolutions1120@gmail.com" class="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-2.5 rounded-xl border border-white/20 transition flex items-center gap-2">
            <span>✉️</span> <span>laprosolutions1120@gmail.com</span>
          </a>
        </div>
      </div>

      <!-- Main Office & Contact Channels Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Head Office Card -->
        <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div class="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div class="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">🏢</div>
            <div>
              <h3 class="font-black text-base text-slate-900">Head Office</h3>
              <span class="text-[11px] text-slate-500 font-medium">Main Headquarters & Sales Center</span>
            </div>
          </div>
          <div class="text-xs text-slate-600 space-y-2 leading-relaxed">
            <p><strong class="text-slate-900">Lapro Solutions Tech Park</strong></p>
            <p>Prakruti Layout, Near Neo Hospital, Doddathogur, Electronic City Phase 1, Bangalore - 560100</p>
            <div class="pt-2 border-t border-slate-100 space-y-1.5 font-medium">
              <p class="flex items-center gap-2 text-slate-800">
                <span class="text-slate-400">📞 Phone:</span>
                <a href="tel:7996389264" class="text-blue-600 font-bold hover:underline">+91 7996389264</a>
              </p>
              <p class="flex items-center gap-2 text-slate-800">
                <span class="text-slate-400">✉️ Email:</span>
                <a href="mailto:laprosolutions1120@gmail.com" class="text-blue-600 font-bold hover:underline">laprosolutions1120@gmail.com</a>
              </p>
              <p class="text-slate-500 text-[11px]">⏰ Working Hours: Monday - Saturday, 9:00 AM - 8:30 PM</p>
            </div>
          </div>
        </div>

        <!-- Doorstep Repair & Express Service Info -->
        <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">🛠️</div>
              <div>
                <h3 class="font-black text-base text-slate-900">Free Doorstep Pickup & Drop</h3>
                <span class="text-[11px] text-slate-500 font-medium">Anywhere across Bangalore</span>
              </div>
            </div>
            <p class="text-xs text-slate-600 mt-3 leading-relaxed">Need your laptop diagnosed or repaired? We provide fast <strong>doorstep pickup & drop</strong> service with 32-point diagnostics and 1-Year Warranty on replaced components.</p>
          </div>
          <button onclick="appState.setView('service')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition shadow flex items-center justify-center gap-2">
            <span>🛠️</span> Book Doorstep Repair Service Now
          </button>
        </div>
      </div>

      <!-- Bangalore Branch Locations -->
      <div>
        <div class="mb-4">
          <h2 class="text-xl font-black text-slate-900">Our Service & Sales Branches in Bangalore</h2>
          <p class="text-xs text-slate-500">Visit our nearest branch or request free doorstep delivery and repair</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Branch 1: Electronic City -->
          <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3 hover:border-blue-500 transition group">
            <div class="flex items-center justify-between">
              <span class="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Branch 1</span>
              <span class="text-emerald-500 text-xs font-bold">● Open</span>
            </div>
            <h4 class="font-black text-sm text-slate-900 group-hover:text-blue-600 transition">Electronic City (E-City)</h4>
            <p class="text-xs text-slate-600 leading-relaxed">Prakruti Layout, Near Neo Hospital, Doddathogur, Electronic City Phase 1, Bangalore - 560100</p>
            <div class="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <span>Services: Laptop Sales, Motherboard & Screen Repair, SSD Upgrade</span>
            </div>
          </div>

          <!-- Branch 2: Begur -->
          <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3 hover:border-blue-500 transition group">
            <div class="flex items-center justify-between">
              <span class="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Branch 2</span>
              <span class="text-emerald-500 text-xs font-bold">● Open</span>
            </div>
            <h4 class="font-black text-sm text-slate-900 group-hover:text-blue-600 transition">Begur Branch</h4>
            <p class="text-xs text-slate-600 leading-relaxed">Begur Main Road, Near Lake View, Bangalore - 560068</p>
            <div class="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <span>Services: Doorstep Pickup Hub, Express Diagnostic, Battery & Keyboard</span>
            </div>
          </div>

          <!-- Branch 3: Uttarahalli -->
          <div class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3 hover:border-blue-500 transition group">
            <div class="flex items-center justify-between">
              <span class="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Branch 3</span>
              <span class="text-emerald-500 text-xs font-bold">● Open</span>
            </div>
            <h4 class="font-black text-sm text-slate-900 group-hover:text-blue-600 transition">Uttarahalli Branch</h4>
            <p class="text-xs text-slate-600 leading-relaxed">Uttarahalli Main Road, South Bangalore - 560061</p>
            <div class="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <span>Services: Desktop Assembly, Chip-Level Repair, Refurbished Laptops</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPrivacyView(container) {
  container.innerHTML = `
    <div class="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-4">
      <h1 class="text-2xl font-black text-slate-900">Privacy & Terms of Service</h1>
      <p class="text-xs text-slate-600">Lapro Solutions complies with all data security standards. Customer hardware and data are securely handled during all diagnostic and repair procedures.</p>
    </div>
  `;
}

// Comparison Bar
function updateComparisonBar(state) {
  if (!compareBar) return;
  const list = state.compareList || [];
  if (list.length > 0) {
    compareBar.classList.remove("translate-y-24", "opacity-0", "scale-95");
    if (compareCount) compareCount.textContent = `${list.length} of 3 selected`;
    if (compareThumbnails) {
      compareThumbnails.innerHTML = list.map(id => {
        const prod = appState.getProductById(id);
        return prod ? `<img src="${prod.images[0]}" alt="${prod.name}" class="w-10 h-10 object-cover rounded-lg border border-slate-600">` : '';
      }).join("");
    }
  } else {
    compareBar.classList.add("translate-y-24", "opacity-0", "scale-95");
  }
}

function clearComparison() {
  appState.state.compareList = [];
  appState.saveState();
}

function openComparisonModal() {
  const modal = document.getElementById("compare-modal");
  const container = document.getElementById("compare-table-container");
  if (!modal || !container) return;

  const prods = (appState.state.compareList || []).map(id => appState.getProductById(id)).filter(Boolean);
  if (prods.length === 0) return;

  container.innerHTML = `
    <div class="grid grid-cols-${prods.length} gap-4 text-xs">
      ${prods.map(p => `
        <div class="border border-slate-200 rounded-xl p-4 space-y-2">
          <img src="${p.images[0]}" class="w-full h-32 object-cover rounded-lg">
          <h4 class="font-bold text-slate-900">${p.name}</h4>
          <div class="text-teal-700 font-bold">₹ ${p.price.toLocaleString('en-IN')}</div>
          <p class="text-slate-600 font-semibold">${p.processor}</p>
          <p class="text-slate-500">${p.os}</p>
        </div>
      `).join("")}
    </div>
  `;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeComparisonModal() {
  const modal = document.getElementById("compare-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// ======================== 9. LAPRO AI CHATBOT ASSISTANT ENGINE ========================
let isChatbotOpen = false;

function toggleChatbot() {
  isChatbotOpen = !isChatbotOpen;
  const chatWin = document.getElementById("chatbot-window");
  const unreadDot = document.getElementById("chatbot-unread-dot");
  if (!chatWin) return;

  if (isChatbotOpen) {
    chatWin.classList.remove("hidden");
    if (unreadDot) unreadDot.classList.add("hidden");
    const input = document.getElementById("chatbot-input");
    if (input) setTimeout(() => input.focus(), 150);
  } else {
    chatWin.classList.add("hidden");
  }
}

function openChatbot() {
  isChatbotOpen = true;
  const chatWin = document.getElementById("chatbot-window");
  if (chatWin) chatWin.classList.remove("hidden");
}

function closeChatbot() {
  isChatbotOpen = false;
  const chatWin = document.getElementById("chatbot-window");
  if (chatWin) chatWin.classList.add("hidden");
}

function clearChatHistory() {
  const container = document.getElementById("chatbot-messages");
  if (!container) return;
  container.innerHTML = `
    <div class="flex gap-2.5 items-start">
      <div class="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm shrink-0">🤖</div>
      <div class="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-2xs text-slate-800 space-y-1.5 max-w-[85%]">
        <p class="font-semibold">Chat history reset! 👋</p>
        <p class="text-slate-600 leading-relaxed">How can I help you right now? Ask me about laptops, doorstep repair services, current orders, or price discounts!</p>
      </div>
    </div>
  `;
}

function sendQuickPrompt(promptText) {
  const input = document.getElementById("chatbot-input");
  if (input) {
    input.value = promptText;
    handleChatSubmit(new Event("submit"));
  }
}

function handleChatSubmit(event) {
  if (event) event.preventDefault();
  const input = document.getElementById("chatbot-input");
  if (!input) return;
  const query = input.value.trim();
  if (!query) return;

  // Append user message
  appendChatMessage("user", query);
  input.value = "";

  // Show typing indicator
  const typingEl = document.getElementById("chatbot-typing");
  if (typingEl) typingEl.classList.remove("hidden");

  // Generate AI Response with natural typing delay
  setTimeout(() => {
    if (typingEl) typingEl.classList.add("hidden");
    const responseHtml = generateAIResponse(query);
    appendChatMessage("bot", responseHtml);
  }, 600);
}

function appendChatMessage(sender, content) {
  const container = document.getElementById("chatbot-messages");
  if (!container) return;

  const msgDiv = document.createElement("div");

  if (sender === "user") {
    msgDiv.className = "flex gap-2 justify-end";
    msgDiv.innerHTML = `
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] text-xs font-medium">
        ${escapeHtml(content)}
      </div>
    `;
  } else {
    msgDiv.className = "flex gap-2.5 items-start fade-in";
    msgDiv.innerHTML = `
      <div class="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm shrink-0 shadow-sm">🤖</div>
      <div class="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-2xs text-slate-800 space-y-2 max-w-[88%] text-xs leading-relaxed">
        ${content}
      </div>
    `;
  }

  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function generateAIResponse(rawQuery) {
  const query = rawQuery.toLowerCase();
  const products = appState.getProducts();

  // 1. Budget Laptop / Hardware Search (e.g. "under 50000", "under 40k", "gaming laptop")
  const budgetMatch = query.match(/(?:under|below|budget|within|less than)\s*(?:rs\.?|inr|₹)?\s*(\d+)(?:k|000)?/i);
  let budgetLimit = null;
  if (budgetMatch) {
    let num = parseInt(budgetMatch[1]);
    if (num < 1000) num = num * 1000;
    budgetLimit = num;
  }

  if (budgetLimit || query.includes("recommend") || query.includes("suggest") || query.includes("laptop") || query.includes("desktop") || query.includes("buy")) {
    let matchingProds = products;
    if (budgetLimit) {
      matchingProds = products.filter(p => p.price <= budgetLimit);
    }
    if (query.includes("gaming")) {
      matchingProds = matchingProds.filter(p => p.category === "Laptops" && (p.specs?.processor?.toLowerCase().includes("i7") || p.specs?.processor?.toLowerCase().includes("ryzen") || p.price > 60000));
    } else if (query.includes("desktop")) {
      matchingProds = matchingProds.filter(p => p.category === "Desktops");
    } else if (query.includes("apple") || query.includes("macbook")) {
      matchingProds = matchingProds.filter(p => p.brand.toLowerCase() === "apple");
    } else if (query.includes("dell")) {
      matchingProds = matchingProds.filter(p => p.brand.toLowerCase() === "dell");
    } else if (query.includes("lenovo")) {
      matchingProds = matchingProds.filter(p => p.brand.toLowerCase() === "lenovo");
    } else if (query.includes("hp")) {
      matchingProds = matchingProds.filter(p => p.brand.toLowerCase() === "hp");
    }

    const topMatches = matchingProds.slice(0, 2);
    if (topMatches.length > 0) {
      return `
        <p class="font-bold text-slate-900">Here are top recommended options for you:</p>
        <div class="space-y-2 pt-1">
          ${topMatches.map(p => `
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1.5">
              <div class="flex items-center gap-2">
                <img src="${(p.images && p.images[0]) || p.image}" class="w-10 h-10 object-cover rounded-lg border border-slate-200 bg-white">
                <div class="min-w-0 flex-1">
                  <div class="font-bold text-slate-900 truncate">${p.name}</div>
                  <div class="text-teal-700 font-bold font-mono">₹ ${p.price.toLocaleString('en-IN')} <span class="text-slate-400 font-normal line-through text-[10px]">₹ ${p.originalPrice.toLocaleString('en-IN')}</span></div>
                </div>
              </div>
              <div class="flex gap-1.5">
                <button onclick="appState.setView('product', { product: '${p.id}' }); toggleChatbot();" class="flex-1 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-[10px] py-1 rounded-lg">View Specs</button>
                <button onclick="handleAddToCart(event, '${p.id}', 1)" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] py-1 rounded-lg">🛒 Add to Cart</button>
              </div>
            </div>
          `).join("")}
        </div>
        <button onclick="appState.setView('catalog'); toggleChatbot();" class="text-blue-600 font-bold hover:underline text-[11px] block mt-1">Browse entire catalog (${products.length} items) →</button>
      `;
    }
  }

  // 2. Doorstep Service & Repair Queries
  if (query.includes("repair") || query.includes("service") || query.includes("pickup") || query.includes("screen") || query.includes("battery") || query.includes("keyboard") || query.includes("motherboard") || query.includes("slow") || query.includes("diagnostic")) {
    return `
      <p class="font-bold text-slate-900">🛠️ Certified Doorstep Computer Repair Services</p>
      <p class="text-slate-600">Lapro Solutions provides <strong>Free Doorstep Pickup & Drop</strong> across Bangalore with <strong>32-Point Quality Diagnostics</strong>.</p>
      <ul class="list-disc list-inside text-[11px] text-slate-600 space-y-0.5 pt-1">
        <li>Screen & Glass Panel Replacement (1-Yr Warranty)</li>
        <li>Chip-Level Motherboard Repairs</li>
        <li>Original Battery & Charger Replacements</li>
        <li>High-Speed RAM & NVMe SSD Upgrades</li>
      </ul>
      <div class="pt-2">
        <button onclick="appState.setView('service'); toggleChatbot();" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs transition shadow flex items-center justify-center gap-1.5">
          <span>🛠️</span> Book Doorstep Repair Now
        </button>
      </div>
    `;
  }

  // 3. Order Tracking / History
  if (query.includes("order") || query.includes("track") || query.includes("delivery") || query.includes("shipping") || query.includes("invoice")) {
    const orders = appState.state.orders || [];
    if (!appState.state.currentUser && !appState.state.adminUser) {
      return `
        <p class="font-bold text-slate-900">📦 Order Tracking</p>
        <p class="text-slate-600">Please sign in to view your live orders and download tax invoices.</p>
        <button onclick="openAuthModal('login'); toggleChatbot();" class="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs mt-1">Sign In</button>
      `;
    }
    if (orders.length > 0) {
      const latest = orders[0];
      return `
        <p class="font-bold text-slate-900">📦 Your Latest Order: <strong>${latest.id}</strong></p>
        <p class="text-slate-600">Status: <span class="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full uppercase text-[10px]">${latest.status.replace(/_/g, ' ')}</span></p>
        <p class="text-slate-500 text-[11px]">Total: ₹ ${latest.totals.total.toLocaleString('en-IN')} &nbsp;•&nbsp; Date: ${latest.date}</p>
        <button onclick="appState.setView('orders'); toggleChatbot();" class="bg-slate-900 text-white font-bold py-1.5 px-3 rounded-lg text-xs mt-2 block w-full text-center">View All Orders & Invoices →</button>
      `;
    } else {
      return `
        <p class="font-bold text-slate-900">No active orders found.</p>
        <p class="text-slate-600">You haven't placed any orders yet. Check out our Crazy Deals to start shopping!</p>
        <button onclick="appState.setView('catalog'); toggleChatbot();" class="bg-blue-600 text-white font-bold py-1.5 px-3 rounded-lg text-xs mt-1">Explore Products</button>
      `;
    }
  }

  // 4. Crazy Deals / Coupons / Discounts
  if (query.includes("deal") || query.includes("offer") || query.includes("discount") || query.includes("coupon") || query.includes("promo") || query.includes("crazy")) {
    return `
      <p class="font-bold text-slate-900">🔥 Current Hot Deals & Promo Codes:</p>
      <div class="bg-orange-50 border border-orange-200 rounded-xl p-2.5 text-xs text-orange-900 space-y-1">
        <div>🎟️ Use code <strong class="font-mono bg-white px-1.5 py-0.5 rounded border border-orange-300">WELCOME10</strong> for <strong>10% OFF</strong></div>
        <div>🎟️ Use code <strong class="font-mono bg-white px-1.5 py-0.5 rounded border border-orange-300">SAVE1000</strong> for <strong>₹1,000 Flat Off</strong></div>
      </div>
      <button onclick="appState.setView('catalog', { category: 'Crazy Deals' }); toggleChatbot();" class="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-xl text-xs mt-2 transition shadow">
        View All Crazy Deals →
      </button>
    `;
  }

  // 5. Price Negotiation Help
  if (query.includes("negotiate") || query.includes("offer") || query.includes("bargain") || query.includes("counter")) {
    return `
      <p class="font-bold text-slate-900">💬 How Price Negotiation Works:</p>
      <ol class="list-decimal list-inside text-slate-600 space-y-1 text-[11px] pt-1">
        <li>Click <strong>"Make an Offer / Negotiate Price"</strong> on any product card.</li>
        <li>Enter your proposed counter-offer in Rupees.</li>
        <li>If your offer meets the seller's floor price, it is <strong>instantly approved</strong> and added to your cart at your discounted price!</li>
      </ol>
      <button onclick="appState.setView('catalog'); toggleChatbot();" class="bg-amber-500 text-white font-bold py-1.5 px-3 rounded-lg text-xs mt-2 block w-full text-center">Try Price Negotiation on Catalog</button>
    `;
  }

  // 6. Contact & Helpline
  if (query.includes("contact") || query.includes("phone") || query.includes("email") || query.includes("address") || query.includes("helpline") || query.includes("location") || query.includes("support") || query.includes("branch") || query.includes("branches")) {
    return `
      <p class="font-bold text-slate-900">📞 Lapro Solutions Support & Service Centers</p>
      <div class="text-slate-600 space-y-1.5 text-[11px] pt-1 leading-relaxed">
        <p>🏢 <strong>Head Office:</strong> Prakruti Layout, Near Neo Hospital, Doddathogur, Electronic City Phase 1, Bangalore - 560100</p>
        <p>📞 <strong>Direct Helpline:</strong> <a href="tel:7996389264" class="text-blue-600 font-bold hover:underline">+91 7996389264</a> (Mon - Sat, 9 AM - 8:30 PM)</p>
        <p>✉️ <strong>Official Gmail:</strong> <a href="mailto:laprosolutions1120@gmail.com" class="text-blue-600 font-bold hover:underline">laprosolutions1120@gmail.com</a></p>
        <div class="pt-1">
          <strong>🏢 Service Branches:</strong>
          <div class="flex flex-wrap gap-1 mt-1">
            <span class="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-bold">Electronic City</span>
            <span class="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-bold">Begur</span>
            <span class="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-bold">Uttarahalli</span>
          </div>
        </div>
      </div>
      <button onclick="appState.setView('contact'); toggleChatbot();" class="bg-blue-600 text-white font-bold py-1.5 px-3 rounded-lg text-xs mt-2 block w-full text-center">View Contact Page & Branches →</button>
    `;
  }

  // 7. General Fallback
  return `
    <p>I can help you with:</p>
    <div class="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
      <button onclick="sendQuickPrompt('Recommend a laptop under 50000')" class="bg-slate-50 hover:bg-slate-100 border p-1.5 rounded-lg text-left font-semibold text-slate-700">💻 Buy Laptops</button>
      <button onclick="sendQuickPrompt('How do I book a doorstep laptop repair?')" class="bg-slate-50 hover:bg-slate-100 border p-1.5 rounded-lg text-left font-semibold text-slate-700">🛠️ Book Repair</button>
      <button onclick="sendQuickPrompt('Show me Crazy Deals')" class="bg-slate-50 hover:bg-slate-100 border p-1.5 rounded-lg text-left font-semibold text-slate-700">🔥 Crazy Deals</button>
      <button onclick="sendQuickPrompt('Where is my order?')" class="bg-slate-50 hover:bg-slate-100 border p-1.5 rounded-lg text-left font-semibold text-slate-700">📦 Order Status</button>
    </div>
  `;
}
