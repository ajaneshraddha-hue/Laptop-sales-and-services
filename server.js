const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8000;
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "lapro-state.json");

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp"
};

let MOCK_PRODUCTS = [];
try {
  const pModule = require("./products.js");
  MOCK_PRODUCTS = pModule.MOCK_PRODUCTS || [];
} catch (e) {
  console.warn("Failed to load products.js in server.js:", e);
}

const INITIAL_SHARED_STATE = {
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
  categories: [
    { id: "cat-1", name: "Desktops", icon: "🖥️", active: true },
    { id: "cat-2", name: "Laptops", icon: "💻", active: true },
    { id: "cat-3", name: "Accessories", icon: "🎒", active: true },
    { id: "cat-4", name: "Peripherals", icon: "🖨️", active: true },
    { id: "cat-5", name: "Storages", icon: "💾", active: true },
    { id: "cat-6", name: "Networking", icon: "🌐", active: true },
    { id: "cat-8", name: "Servers & Workstations", icon: "🖧", active: true },
    { id: "cat-9", name: "Software's", icon: "💿", active: true }
  ],
  orders: [
    {
      id: "ORD1001",
      invoiceId: "INV-2026-001",
      date: "04 Sep 2026",
      time: "11:30 AM",
      customerName: "Shraddha Ajane",
      customerEmail: "ajaneshraddha@gmail.com",
      customerPhone: "+91 74839 57801",
      status: "shipped",
      paymentMethod: "UPI QR (Instant GPay)",
      trackingId: "LP7829104421",
      deliveryPartner: "BlueDart Express",
      address: { name: "Shraddha Ajane", phone: "+91 74839 57801", line: "Prakruti Layout, Doddathogur, Electronic City Phase 1", city: "Bangalore", state: "Karnataka", pin: "560100" },
      items: [
        { id: "deal-dell-latitude-7490", name: "Dell Latitude 7490 Touch (Core i7, 16GB RAM, 512GB SSD)", category: "Laptops", brand: "Dell", price: 24990, quantity: 1, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=700&auto=format&fit=crop&q=80" }
      ],
      totals: { subtotal: 24990, discount: 0, shipping: 0, total: 24990 }
    },
    {
      id: "ORD1002",
      invoiceId: "INV-2026-002",
      date: "06 Sep 2026",
      time: "02:15 PM",
      customerName: "Amit Sharma",
      customerEmail: "amit.sharma@gmail.com",
      customerPhone: "+91 98450 12345",
      status: "confirmed",
      paymentMethod: "Credit Card (Visa)",
      trackingId: "LP9182374490",
      deliveryPartner: "Delhivery Surface",
      address: { name: "Amit Sharma", phone: "+91 98450 12345", line: "12, Maple Drive, Indiranagar", city: "Bangalore", state: "Karnataka", pin: "560038" },
      items: [
        { id: "desktop-dell-optiplex-7070", name: "Dell OptiPlex 7070 Micro Tiny PC (Core i5 9th Gen)", category: "Desktops", brand: "Dell", price: 22990, quantity: 1, image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=700&auto=format&fit=crop&q=80" }
      ],
      totals: { subtotal: 22990, discount: 0, shipping: 0, total: 22990 }
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
  ]
};

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function readSharedState(callback) {
  fs.readFile(DATA_FILE, "utf8", (err, content) => {
    if (err && err.code === "ENOENT") {
      writeSharedState(INITIAL_SHARED_STATE, (writeErr) => {
        if (writeErr) return callback(null, INITIAL_SHARED_STATE);
        callback(null, INITIAL_SHARED_STATE);
      });
      return;
    }
    if (err) return callback(err);
    try {
      const parsed = JSON.parse(content);
      if (!parsed || !parsed.products || parsed.products.length === 0) {
        callback(null, INITIAL_SHARED_STATE);
      } else {
        callback(null, parsed);
      }
    } catch (parseErr) {
      callback(null, INITIAL_SHARED_STATE);
    }
  });
}

function writeSharedState(state, callback) {
  fs.mkdir(DATA_DIR, { recursive: true }, (mkdirErr) => {
    if (mkdirErr) return callback(mkdirErr);
    const tempFile = `${DATA_FILE}.tmp`;
    fs.writeFile(tempFile, JSON.stringify(state, null, 2), "utf8", (writeErr) => {
      if (writeErr) return callback(writeErr);
      fs.rename(tempFile, DATA_FILE, callback);
    });
  });
}

function mergeRecords(existingRecords, incomingRecords, keySelector) {
  const merged = new Map((existingRecords || []).map(record => [keySelector(record), record]));
  (incomingRecords || []).forEach(record => merged.set(keySelector(record), record));
  return Array.from(merged.values());
}

function mergeSharedState(existingState, incomingState) {
  if (!existingState) return incomingState;
  const merged = { ...existingState };
  merged.registeredUsers = mergeRecords(existingState.registeredUsers, incomingState.registeredUsers, user => user.email);
  merged.registeredAdmins = mergeRecords(existingState.registeredAdmins, incomingState.registeredAdmins, admin => admin.email);
  merged.orders = mergeRecords(existingState.orders, incomingState.orders, order => order.id);
  merged.serviceTickets = mergeRecords(existingState.serviceTickets, incomingState.serviceTickets, ticket => ticket.id);
  
  const mergedProds = mergeRecords(existingState.products, incomingState.products, product => product.id);
  const customProds = mergedProds.filter(p => p && p.id && p.id.startsWith("prod-"));
  const standardProds = mergedProds.filter(p => !p || !p.id || !p.id.startsWith("prod-"));
  merged.products = [...customProds, ...standardProds];

  merged.notifications = mergeRecords(existingState.notifications, incomingState.notifications, notification => notification.id).slice(-50);
  return merged;
}

function sharedRecordsOnly(state) {
  return {
    registeredUsers: state.registeredUsers || [],
    registeredAdmins: state.registeredAdmins || [],
    orders: state.orders || [],
    serviceTickets: state.serviceTickets || [],
    products: state.products || [],
    categories: state.categories || [],
    notifications: state.notifications || []
  };
}

const server = http.createServer((req, res) => {
  // API: Get full shared state
  if (req.url === "/api/state" && req.method === "GET") {
    readSharedState((err, state) => {
      if (err) return sendJson(res, 500, { error: "Unable to read shared state" });
      sendJson(res, 200, { state: state || INITIAL_SHARED_STATE });
    });
    return;
  }

  // API: Save full shared state
  if (req.url === "/api/state" && req.method === "PUT") {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 25 * 1024 * 1024) req.destroy();
    });
    req.on("end", () => {
      try {
        const payload = JSON.parse(body);
        if (!payload || typeof payload.state !== "object") return sendJson(res, 400, { error: "Invalid state payload" });
        readSharedState((readErr, existingState) => {
          const baseState = (!readErr && existingState) ? existingState : INITIAL_SHARED_STATE;
          const nextState = payload.replaceState ? sharedRecordsOnly(payload.state) : mergeSharedState(baseState, sharedRecordsOnly(payload.state));
          writeSharedState(nextState, (err) => {
            if (err) return sendJson(res, 500, { error: "Unable to save shared state" });
            sendJson(res, 200, { saved: true, productsCount: nextState.products.length });
          });
        });
      } catch (err) {
        sendJson(res, 400, { error: "Invalid JSON payload" });
      }
    });
    return;
  }

  // API: Get products
  if (req.url === "/api/products" && req.method === "GET") {
    readSharedState((err, state) => {
      const currentState = (!err && state) ? state : INITIAL_SHARED_STATE;
      sendJson(res, 200, { products: currentState.products || [] });
    });
    return;
  }

  // API: Add new product directly
  if (req.url === "/api/products" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 25 * 1024 * 1024) req.destroy();
    });
    req.on("end", () => {
      try {
        const payload = JSON.parse(body);
        if (!payload || !payload.product || !payload.product.name) {
          return sendJson(res, 400, { error: "Invalid product data" });
        }
        readSharedState((readErr, existingState) => {
          const baseState = (!readErr && existingState) ? existingState : JSON.parse(JSON.stringify(INITIAL_SHARED_STATE));
          const existingProds = baseState.products || [];
          // Prepend product or replace if already exists
          const updatedProds = [payload.product, ...existingProds.filter(p => p.id !== payload.product.id)];
          baseState.products = updatedProds;
          writeSharedState(baseState, (err) => {
            if (err) return sendJson(res, 500, { error: "Unable to save product" });
            sendJson(res, 200, { success: true, product: payload.product, total: updatedProds.length });
          });
        });
      } catch (err) {
        sendJson(res, 400, { error: "Invalid JSON payload" });
      }
    });
    return;
  }

  // API: Delete product directly
  if (req.url.startsWith("/api/products") && req.method === "DELETE") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      try {
        const urlParams = new URL(req.url, `http://${req.headers.host}`);
        let prodId = urlParams.searchParams.get("id");
        if (!prodId && body) {
          const parsed = JSON.parse(body);
          prodId = parsed.id;
        }
        if (!prodId) {
          return sendJson(res, 400, { error: "Product ID required" });
        }
        readSharedState((readErr, existingState) => {
          const baseState = (!readErr && existingState) ? existingState : JSON.parse(JSON.stringify(INITIAL_SHARED_STATE));
          baseState.products = (baseState.products || []).filter(p => p.id !== prodId);
          writeSharedState(baseState, (err) => {
            if (err) return sendJson(res, 500, { error: "Unable to delete product" });
            sendJson(res, 200, { success: true, deletedId: prodId, total: baseState.products.length });
          });
        });
      } catch (err) {
        sendJson(res, 400, { error: "Invalid JSON payload" });
      }
    });
    return;
  }

  let reqUrl = req.url.split("?")[0];
  if (reqUrl === "/" || reqUrl === "") reqUrl = "/index.html";

  let filePath = path.join(__dirname, reqUrl);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routing
      filePath = path.join(__dirname, "index.html");
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Server Error");
      } else {
        res.writeHead(200, {
          "Content-Type": contentType,
          "Cache-Control": "no-cache"
        });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Lapro Solutions server running at http://localhost:${PORT}`);
});
