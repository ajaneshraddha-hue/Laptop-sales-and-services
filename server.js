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
    if (err && err.code === "ENOENT") return callback(null, null);
    if (err) return callback(err);
    try {
      callback(null, JSON.parse(content));
    } catch (parseErr) {
      callback(parseErr);
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
  const merged = { ...existingState, ...incomingState };
  merged.registeredUsers = mergeRecords(existingState.registeredUsers, incomingState.registeredUsers, user => user.email);
  merged.registeredAdmins = mergeRecords(existingState.registeredAdmins, incomingState.registeredAdmins, admin => admin.email);
  merged.orders = mergeRecords(existingState.orders, incomingState.orders, order => order.id);
  merged.serviceTickets = mergeRecords(existingState.serviceTickets, incomingState.serviceTickets, ticket => ticket.id);
  merged.products = mergeRecords(existingState.products, incomingState.products, product => product.id);
  merged.notifications = mergeRecords(existingState.notifications, incomingState.notifications, notification => notification.id).slice(-50);
  return merged;
}

const server = http.createServer((req, res) => {
  if (req.url === "/api/state" && req.method === "GET") {
    readSharedState((err, state) => {
      if (err) return sendJson(res, 500, { error: "Unable to read shared state" });
      sendJson(res, 200, { state });
    });
    return;
  }

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
          if (readErr) return sendJson(res, 500, { error: "Unable to read shared state" });
          writeSharedState(mergeSharedState(existingState, payload.state), (err) => {
            if (err) return sendJson(res, 500, { error: "Unable to save shared state" });
            sendJson(res, 200, { saved: true });
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
