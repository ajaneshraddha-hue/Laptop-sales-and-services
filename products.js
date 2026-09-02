// Lapro Solutions - Complete Product Database
// All categories: Desktops, Laptops, Accessories, Peripherals, Storages, Networking, Consumables, Servers & Workstations, Software's

const MOCK_PRODUCTS = [

  // ======================== LAPTOPS ========================
  {
    id: "deal-dell-latitude-7490",
    name: "Dell Latitude 7490 Touch, 14.0\" FHD, Intel Core i7 8th Gen, 16GB RAM, 512GB SSD",
    brand: "Dell", category: "Laptops", subcategory: "Business Laptops",
    condition: "Grade A+ Refurbished", isCrazyDeal: true, isNew: false,
    price: 24990, originalPrice: 89990, discount: "72% OFF", savings: 65000,
    gstITC: 4498, stockLeft: 2, claimedPercent: 92, rating: 4.8, reviewsCount: 184,
    screenSize: "14.0\"", processor: "Intel Core i7", os: "Windows 11 Pro",
    specs: { processor: "Intel Core i7-8650U (Quad Core up to 4.2GHz)", ram: "16GB DDR4", storage: "512GB NVMe SSD", display: "14.0\" FHD Touchscreen", graphics: "Intel UHD 620", os: "Windows 11 Pro", warranty: "1 Year Doorstep", batteryHealth: "94%" },
    images: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=700&auto=format&fit=crop&q=80"],
    features: ["Intel Core i7", "14\" FHD Touch", "16GB / 512GB", "1 Year Warranty"]
  },
  {
    id: "deal-hp-elitebook-840-g6",
    name: "HP EliteBook 840 G6 Ultralight, 14.0\" FHD, Intel Core i5, 16GB RAM, 512GB SSD",
    brand: "HP", category: "Laptops", subcategory: "Business Laptops",
    condition: "Grade A+ Refurbished", isCrazyDeal: true, isNew: false,
    price: 26990, originalPrice: 94990, discount: "71% OFF", savings: 68000,
    gstITC: 4858, stockLeft: 3, claimedPercent: 86, rating: 4.9, reviewsCount: 220,
    screenSize: "14.0\"", processor: "Intel Core i5", os: "Windows 11 Pro",
    specs: { processor: "Intel Core i5-8365U vPro (Quad Core up to 4.1GHz)", ram: "16GB DDR4", storage: "512GB PCIe NVMe SSD", display: "14.0\" FHD IPS Anti-Glare", graphics: "Intel UHD 620", os: "Windows 11 Pro", warranty: "1 Year Doorstep", batteryHealth: "92%" },
    images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&auto=format&fit=crop&q=80"],
    features: ["B&O Audio", "Full Metal Body", "16GB RAM", "1 Year Warranty"]
  },
  {
    id: "deal-lenovo-thinkpad-t490",
    name: "Lenovo ThinkPad T490 Business, 14.0\" FHD, Intel Core i7, 16GB RAM, 512GB SSD",
    brand: "Lenovo", category: "Laptops", subcategory: "Business Laptops",
    condition: "Grade A+ Refurbished", isCrazyDeal: true, isNew: false,
    price: 28490, originalPrice: 98000, discount: "71% OFF", savings: 69510,
    gstITC: 5128, stockLeft: 4, claimedPercent: 78, rating: 4.9, reviewsCount: 312,
    screenSize: "14.0\"", processor: "Intel Core i7", os: "Windows 11 Pro",
    specs: { processor: "Intel Core i7-8565U (up to 4.6GHz)", ram: "16GB DDR4", storage: "512GB SSD", display: "14.0\" FHD IPS 300 nits", graphics: "Intel UHD 620", os: "Windows 11 Pro 64-Bit", warranty: "1 Year Doorstep", batteryHealth: "95%" },
    images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&auto=format&fit=crop&q=80"],
    features: ["MIL-SPEC Rugged", "TrackPoint", "16GB RAM", "1 Year Warranty"]
  },
  {
    id: "deal-apple-macbook-air-m1",
    name: "Apple MacBook Air 13.3\" Retina, Apple M1 Chip, 8GB Unified RAM, 256GB SSD",
    brand: "Apple", category: "Laptops", subcategory: "MacBooks",
    condition: "Open Box - Like New", isCrazyDeal: true, isNew: false,
    price: 58990, originalPrice: 99900, discount: "41% OFF", savings: 40910,
    gstITC: 10618, stockLeft: 2, claimedPercent: 95, rating: 5.0, reviewsCount: 420,
    screenSize: "13.3\"", processor: "Apple M1/M2", os: "macOS",
    specs: { processor: "Apple M1 (8-Core CPU / 7-Core GPU)", ram: "8GB Unified Memory", storage: "256GB SSD", display: "13.3\" Retina True Tone (2560x1600)", graphics: "Apple 7-Core GPU", os: "macOS Sonoma", warranty: "1 Year Doorstep", batteryHealth: "100%" },
    images: ["https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=700&auto=format&fit=crop&q=80"],
    features: ["Apple M1 Silicon", "Retina Display", "18-Hr Battery", "Open Box Like New"]
  },
  {
    id: "deal-asus-rog-zephyrus",
    name: "ASUS ROG Zephyrus G14 Gaming, 14.0\" QHD 120Hz, AMD Ryzen 7, 16GB, 1TB SSD, RTX 3060",
    brand: "ASUS", category: "Laptops", subcategory: "Gaming Laptops",
    condition: "Grade A+ Refurbished", isCrazyDeal: true, isNew: false,
    price: 64990, originalPrice: 139990, discount: "54% OFF", savings: 75000,
    gstITC: 11698, stockLeft: 1, claimedPercent: 97, rating: 4.8, reviewsCount: 168,
    screenSize: "14.0\"", processor: "AMD Ryzen 7", os: "Windows 11 Home",
    specs: { processor: "AMD Ryzen 7 5800HS (8 Cores, 16 Threads)", ram: "16GB DDR4 3200MHz", storage: "1TB PCIe NVMe SSD", display: "14.0\" QHD 120Hz 100% DCI-P3", graphics: "NVIDIA RTX 3060 6GB GDDR6", os: "Windows 11 Home", warranty: "1 Year Doorstep", batteryHealth: "90%" },
    images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=700&auto=format&fit=crop&q=80"],
    features: ["RTX 3060 6GB", "QHD 120Hz", "Ryzen 7 8-Core", "1TB SSD"]
  },
  {
    id: "laptop-hp-pavilion-15",
    name: "HP Pavilion 15, 15.6\" FHD IPS, Intel Core i5 11th Gen, 8GB RAM, 512GB SSD",
    brand: "HP", category: "Laptops", subcategory: "Consumer Laptops",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 47990, originalPrice: 64990, discount: "26% OFF", savings: 17000,
    gstITC: 8638, stockLeft: 7, claimedPercent: 45, rating: 4.5, reviewsCount: 89,
    screenSize: "15.6\"", processor: "Intel Core i5", os: "Windows 11 Home",
    specs: { processor: "Intel Core i5-1135G7 (up to 4.2GHz)", ram: "8GB DDR4", storage: "512GB SSD", display: "15.6\" FHD IPS 250 nits", graphics: "Intel Iris Xe", os: "Windows 11 Home", warranty: "1 Year HP Warranty" },
    images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&auto=format&fit=crop&q=80"],
    features: ["11th Gen i5", "15.6\" FHD IPS", "512GB SSD", "Brand New"]
  },
  {
    id: "laptop-dell-vostro-3510",
    name: "Dell Vostro 3510, 15.6\" FHD, Intel Core i5 11th Gen, 8GB RAM, 256GB SSD + 1TB HDD",
    brand: "Dell", category: "Laptops", subcategory: "Consumer Laptops",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 43990, originalPrice: 58000, discount: "24% OFF", savings: 14010,
    gstITC: 7918, stockLeft: 5, claimedPercent: 38, rating: 4.4, reviewsCount: 57,
    screenSize: "15.6\"", processor: "Intel Core i5", os: "Windows 11 Home",
    specs: { processor: "Intel Core i5-1135G7", ram: "8GB DDR4", storage: "256GB SSD + 1TB HDD", display: "15.6\" FHD WVA Anti-Glare", graphics: "NVIDIA MX350 2GB", os: "Windows 11 Home", warranty: "1 Year Dell Warranty" },
    images: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=700&auto=format&fit=crop&q=80"],
    features: ["MX350 Discrete GPU", "Dual Storage", "Brand New Sealed", "1 Year Warranty"]
  },
  {
    id: "laptop-lenovo-ideapad-gaming-3",
    name: "Lenovo IdeaPad Gaming 3, 15.6\" FHD 120Hz, AMD Ryzen 5, 8GB RAM, 512GB SSD, GTX 1650",
    brand: "Lenovo", category: "Laptops", subcategory: "Gaming Laptops",
    condition: "Brand New Sealed", isCrazyDeal: true, isNew: true,
    price: 54990, originalPrice: 74990, discount: "27% OFF", savings: 20000,
    gstITC: 9898, stockLeft: 3, claimedPercent: 60, rating: 4.6, reviewsCount: 143,
    screenSize: "15.6\"", processor: "AMD Ryzen 5", os: "Windows 11 Home",
    specs: { processor: "AMD Ryzen 5 5600H (6 Cores, up to 4.2GHz)", ram: "8GB DDR4 3200MHz", storage: "512GB NVMe SSD", display: "15.6\" FHD IPS 120Hz Anti-Glare", graphics: "NVIDIA GTX 1650 4GB GDDR6", os: "Windows 11 Home", warranty: "2 Year Lenovo Warranty" },
    images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=700&auto=format&fit=crop&q=80"],
    features: ["GTX 1650 4GB", "120Hz Display", "Ryzen 5 6-Core", "Brand New"]
  },

  // ======================== DESKTOPS ========================
  {
    id: "desktop-dell-optiplex-7070",
    name: "Dell OptiPlex 7070 Micro Tiny PC, Intel Core i7 9th Gen, 16GB RAM, 512GB NVMe SSD",
    brand: "Dell", category: "Desktops", subcategory: "Mini PCs",
    condition: "Grade A+ Refurbished", isCrazyDeal: false, isNew: false,
    price: 22990, originalPrice: 65000, discount: "64% OFF", savings: 42010,
    gstITC: 4138, stockLeft: 5, claimedPercent: 70, rating: 4.7, reviewsCount: 68,
    screenSize: "N/A", processor: "Intel Core i7", os: "Windows 11 Pro",
    specs: { processor: "Intel Core i7-9700T (8 Cores, up to 4.3GHz)", ram: "16GB DDR4", storage: "512GB M.2 NVMe SSD", graphics: "Intel UHD 630 (Dual DP Out)", os: "Windows 11 Pro", warranty: "1 Year Doorstep", formFactor: "Ultra Small Form Factor Micro" },
    images: ["https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=700&auto=format&fit=crop&q=80"],
    features: ["Core i7 8-Core", "Ultra Compact", "Dual 4K DP", "1 Year Warranty"]
  },
  {
    id: "desktop-hp-prodesk-400-g6",
    name: "HP ProDesk 400 G6 SFF, Intel Core i5 9th Gen, 8GB RAM, 256GB SSD + 1TB HDD",
    brand: "HP", category: "Desktops", subcategory: "All-in-One Desktops",
    condition: "Grade A+ Refurbished", isCrazyDeal: false, isNew: false,
    price: 16990, originalPrice: 48000, discount: "65% OFF", savings: 31010,
    gstITC: 3058, stockLeft: 8, claimedPercent: 55, rating: 4.6, reviewsCount: 45,
    screenSize: "N/A", processor: "Intel Core i5", os: "Windows 11 Pro",
    specs: { processor: "Intel Core i5-9500 (6 Cores, up to 4.4GHz)", ram: "8GB DDR4", storage: "256GB SSD + 1TB HDD", graphics: "Intel UHD 630", os: "Windows 11 Pro", warranty: "1 Year Doorstep" },
    images: ["https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=700&auto=format&fit=crop&q=80"],
    features: ["Core i5 6-Core", "Dual Storage", "SFF Desktop", "1 Year Warranty"]
  },
  {
    id: "desktop-lenovo-thinkcentre-m720q",
    name: "Lenovo ThinkCentre M720q Tiny Desktop, Intel Core i7 8th Gen, 16GB RAM, 512GB SSD",
    brand: "Lenovo", category: "Desktops", subcategory: "Mini PCs",
    condition: "Grade A+ Refurbished", isCrazyDeal: true, isNew: false,
    price: 19990, originalPrice: 62000, discount: "68% OFF", savings: 42010,
    gstITC: 3598, stockLeft: 4, claimedPercent: 80, rating: 4.8, reviewsCount: 72,
    screenSize: "N/A", processor: "Intel Core i7", os: "Windows 11 Pro",
    specs: { processor: "Intel Core i7-8700T (6 Cores, up to 4.0GHz)", ram: "16GB DDR4", storage: "512GB SSD", graphics: "Intel UHD 630", os: "Windows 11 Pro", warranty: "1 Year Doorstep", formFactor: "Tiny Form Factor" },
    images: ["https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=700&auto=format&fit=crop&q=80"],
    features: ["Core i7 6-Core", "ThinkCentre Tiny", "16GB RAM", "1 Year Warranty"]
  },
  {
    id: "desktop-hp-aio-24",
    name: "HP All-in-One 24, 23.8\" FHD Touch, Intel Core i5 11th Gen, 8GB RAM, 512GB SSD",
    brand: "HP", category: "Desktops", subcategory: "All-in-One Desktops",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 58990, originalPrice: 79990, discount: "26% OFF", savings: 21000,
    gstITC: 10618, stockLeft: 3, claimedPercent: 35, rating: 4.5, reviewsCount: 28,
    screenSize: "23.8\"", processor: "Intel Core i5", os: "Windows 11 Home",
    specs: { processor: "Intel Core i5-1135G7 (up to 4.2GHz)", ram: "8GB DDR4", storage: "512GB SSD", display: "23.8\" FHD Touchscreen", graphics: "Intel Iris Xe", os: "Windows 11 Home", warranty: "1 Year HP Warranty" },
    images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&auto=format&fit=crop&q=80"],
    features: ["23.8\" FHD Touch", "All-in-One", "Brand New", "1 Year HP Warranty"]
  },
  {
    id: "desktop-gaming-asus-rog",
    name: "ASUS ROG Gaming Tower, Intel Core i9 12th Gen, 32GB RAM, 1TB SSD, RTX 3080",
    brand: "ASUS", category: "Desktops", subcategory: "Gaming Desktops",
    condition: "Brand New Sealed", isCrazyDeal: true, isNew: true,
    price: 149990, originalPrice: 199990, discount: "25% OFF", savings: 50000,
    gstITC: 26998, stockLeft: 2, claimedPercent: 55, rating: 4.9, reviewsCount: 14,
    screenSize: "N/A", processor: "Intel Core i9", os: "Windows 11 Home",
    specs: { processor: "Intel Core i9-12900K (16 Cores, up to 5.2GHz)", ram: "32GB DDR5 5600MHz", storage: "1TB PCIe Gen4 NVMe SSD", graphics: "NVIDIA RTX 3080 10GB GDDR6X", os: "Windows 11 Home", warranty: "2 Year ASUS Warranty" },
    images: ["https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=700&auto=format&fit=crop&q=80"],
    features: ["RTX 3080 10GB", "Core i9 16-Core", "32GB DDR5", "Brand New"]
  },

  // ======================== ACCESSORIES ========================
  {
    id: "acc-dell-ecoloop-14-backpack",
    name: "Dell EcoLoop Pro 14-15.6\" Slim Weather-Resistant Laptop Backpack",
    brand: "Dell", category: "Accessories", subcategory: "Backpacks & Cases",
    condition: "Brand New Sealed", isCrazyDeal: true, isNew: true,
    price: 1899, originalPrice: 4999, discount: "62% OFF", savings: 3100,
    gstITC: 341, stockLeft: 14, claimedPercent: 88, rating: 4.6, reviewsCount: 45,
    screenSize: "14\"-15.6\"", processor: "N/A", os: "N/A",
    specs: { material: "OceanCycle Certified Recycled Fabric", compatibility: "Fits up to 15.6\" Laptops", protection: "360° Foam & Water-Resistant", warranty: "3 Years Dell Warranty", weight: "0.54 kg" },
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80"],
    features: ["EcoLoop Recycled", "Fits 15.6\" Laptop", "Water Resistant", "3 Yrs Warranty"]
  },
  {
    id: "acc-logitech-mk850-combo",
    name: "Logitech MK850 Performance Wireless Keyboard and Mouse Combo",
    brand: "Logitech", category: "Accessories", subcategory: "Keyboards & Mouse",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 5499, originalPrice: 8995, discount: "39% OFF", savings: 3496,
    gstITC: 989, stockLeft: 18, claimedPercent: 42, rating: 4.7, reviewsCount: 203,
    screenSize: "N/A", processor: "N/A", os: "N/A",
    specs: { connectivity: "Bluetooth + 2.4GHz Nano USB", range: "Up to 10 meters wireless range", battery: "Keyboard: 3 Years, Mouse: 1 Year AAA", compatibility: "Windows, macOS, Chrome OS, Linux", warranty: "2 Years Logitech Warranty" },
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop&q=80"],
    features: ["Multi-Device Bluetooth", "2-Year Battery", "Easy Switch x3", "Brand New"]
  },
  {
    id: "acc-dell-d6000s-docking",
    name: "Dell D6000S Universal Docking Station, USB-C, 130W, Dual 4K",
    brand: "Dell", category: "Accessories", subcategory: "Docking Stations",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 14990, originalPrice: 24990, discount: "40% OFF", savings: 10000,
    gstITC: 2698, stockLeft: 6, claimedPercent: 38, rating: 4.8, reviewsCount: 67,
    screenSize: "N/A", processor: "N/A", os: "N/A",
    specs: { ports: "USB-C, 3x USB-A 3.0, 2x DP, HDMI, RJ45 Gigabit, SD Card", power: "130W USB-C Power Delivery", displays: "Dual 4K @ 60Hz", compatibility: "All USB-C Laptops (Dell, HP, Lenovo, Apple)", warranty: "3 Years Dell Warranty" },
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop&q=80"],
    features: ["Dual 4K Support", "130W Power Delivery", "USB-C Universal", "3 Yrs Warranty"]
  },
  {
    id: "acc-hp-backpack-active",
    name: "HP Active Backpack 15.6\" Laptop Bag with Luggage Strap, Water Repellent",
    brand: "HP", category: "Accessories", subcategory: "Backpacks & Cases",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 1299, originalPrice: 2499, discount: "48% OFF", savings: 1200,
    gstITC: 233, stockLeft: 25, claimedPercent: 30, rating: 4.4, reviewsCount: 88,
    screenSize: "15.6\"", processor: "N/A", os: "N/A",
    specs: { material: "Water Repellent Polyester", compatibility: "Fits 15.6\" Laptops", pockets: "Main + Front + Accessories Compartment", warranty: "1 Year HP Warranty" },
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80"],
    features: ["Water Repellent", "Luggage Strap", "15.6\" Fit", "Brand New"]
  },
  {
    id: "acc-lapro-cooling-pad",
    name: "Lapro Solutions Laptop Cooling Pad with 5 Fans, RGB, Adjustable Height",
    brand: "Lapro Solutions", category: "Accessories", subcategory: "Laptop Accessories",
    condition: "Brand New Sealed", isCrazyDeal: true, isNew: true,
    price: 1199, originalPrice: 2999, discount: "60% OFF", savings: 1800,
    gstITC: 215, stockLeft: 30, claimedPercent: 55, rating: 4.3, reviewsCount: 55,
    screenSize: "Up to 17\"", processor: "N/A", os: "N/A",
    specs: { fans: "5 High-Speed Fans with RGB Lighting", adjustable: "6 Height Adjustments", compatibility: "Up to 17\" Laptops", ports: "USB-A Passthrough Port", warranty: "1 Year Warranty" },
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop&q=80"],
    features: ["5 RGB Fans", "6 Height Levels", "USB Passthrough", "Brand New"]
  },

  // ======================== PERIPHERALS ========================
  {
    id: "monitor-lenovo-thinkvision-s24e",
    name: "Lenovo ThinkVision S24e-20, 23.8\" FHD, Black, 3 Yrs Onsite Warranty",
    brand: "Lenovo", category: "Peripherals", subcategory: "Monitors",
    condition: "Brand New Sealed", isCrazyDeal: true, isNew: true,
    price: 7906, originalPrice: 20020, discount: "61% OFF", savings: 12114,
    gstITC: 1423, stockLeft: 8, claimedPercent: 75, rating: 4.8, reviewsCount: 12,
    screenSize: "23.8\"", processor: "N/A", os: "N/A",
    specs: { display: "23.8\" FHD (1920x1080) VA Panel 178° Viewing", ports: "HDMI 1.4, VGA, Audio Out", refreshRate: "60Hz, 4ms", warranty: "3 Yrs Onsite Warranty", stand: "Tilt Stand & 100mm VESA" },
    images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&auto=format&fit=crop&q=80"],
    features: ["23.8\" FHD VA", "3 Yrs Onsite", "HDMI + VGA", "VESA Mountable"]
  },
  {
    id: "monitor-samsung-27-curved",
    name: "Samsung 27\" Curved FHD Monitor, 165Hz, 1ms, AMD FreeSync, HDR10",
    brand: "Samsung", category: "Peripherals", subcategory: "Monitors",
    condition: "Brand New Sealed", isCrazyDeal: true, isNew: true,
    price: 12990, originalPrice: 24990, discount: "48% OFF", savings: 12000,
    gstITC: 2338, stockLeft: 6, claimedPercent: 68, rating: 4.7, reviewsCount: 156,
    screenSize: "27\"", processor: "N/A", os: "N/A",
    specs: { display: "27\" Curved VA FHD (1920x1080)", refreshRate: "165Hz, 1ms Response Time", features: "AMD FreeSync Premium, HDR10", ports: "2x HDMI, 1x DP, 2x USB-A", warranty: "3 Years Samsung Warranty" },
    images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&auto=format&fit=crop&q=80"],
    features: ["27\" Curved", "165Hz Gaming", "FreeSync Premium", "HDR10"]
  },
  {
    id: "peripheral-jabra-headset",
    name: "Jabra Evolve2 55 UC Wireless Headset, Active Noise Cancelling, USB-C",
    brand: "Jabra", category: "Peripherals", subcategory: "Headphones",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 18990, originalPrice: 28990, discount: "35% OFF", savings: 10000,
    gstITC: 3418, stockLeft: 9, claimedPercent: 40, rating: 4.8, reviewsCount: 72,
    screenSize: "N/A", processor: "N/A", os: "N/A",
    specs: { connectivity: "Bluetooth 5.0 + USB-C Dongle", noise: "Active Noise Cancellation (ANC)", battery: "Up to 36 Hours", microphone: "6-Mic call performance", warranty: "2 Year Jabra Warranty" },
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80"],
    features: ["ANC Headset", "36-Hr Battery", "6-Mic Array", "UC Certified"]
  },
  {
    id: "peripheral-hp-laserjet-pro",
    name: "HP LaserJet Pro M404dn Monochrome Laser Printer, Duplex, Network Ready",
    brand: "HP", category: "Peripherals", subcategory: "Printers",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 18490, originalPrice: 28000, discount: "34% OFF", savings: 9510,
    gstITC: 3328, stockLeft: 4, claimedPercent: 28, rating: 4.6, reviewsCount: 45,
    screenSize: "N/A", processor: "N/A", os: "N/A",
    specs: { printSpeed: "Up to 40 ppm", connectivity: "USB 2.0, Gigabit Ethernet, HP ePrint", duplex: "Automatic Two-Sided Printing", tray: "250-Sheet Input Tray", warranty: "1 Year HP Warranty" },
    images: ["https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=700&auto=format&fit=crop&q=80"],
    features: ["40 ppm Speed", "Auto Duplex", "Network Ready", "1 Year Warranty"]
  },
  {
    id: "peripheral-logitech-z623-speakers",
    name: "Logitech Z623 200W 2.1 Stereo Speaker System with Subwoofer, THX Certified",
    brand: "Logitech", category: "Peripherals", subcategory: "Speakers",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 9990, originalPrice: 14995, discount: "33% OFF", savings: 5005,
    gstITC: 1798, stockLeft: 11, claimedPercent: 50, rating: 4.7, reviewsCount: 318,
    screenSize: "N/A", processor: "N/A", os: "N/A",
    specs: { power: "200 Watts Peak / 130W RMS", certification: "THX Certified", inputs: "3.5mm x2, RCA", subwoofer: "Ported Down-Firing Subwoofer", warranty: "2 Years Logitech Warranty" },
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700&auto=format&fit=crop&q=80"],
    features: ["200W THX Certified", "Deep Subwoofer", "Multiple Inputs", "Brand New"]
  },

  // ======================== STORAGES ========================
  {
    id: "storage-kingston-nv2-1tb",
    name: "Kingston NV2 1TB M.2 2280 PCIe 4.0 NVMe Internal SSD (Up to 3500MB/s)",
    brand: "Kingston", category: "Storages", subcategory: "SSD",
    condition: "Brand New Sealed", isCrazyDeal: true, isNew: true,
    price: 5490, originalPrice: 9990, discount: "45% OFF", savings: 4500,
    gstITC: 988, stockLeft: 20, claimedPercent: 65, rating: 4.8, reviewsCount: 156,
    screenSize: "N/A", processor: "N/A", os: "N/A",
    specs: { capacity: "1000GB (1TB)", interface: "PCIe 4.0 x4 NVMe M.2 2280", readSpeed: "3,500 MB/s Sequential Read", writeSpeed: "2,100 MB/s Sequential Write", warranty: "3 Years Kingston Warranty" },
    images: ["https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=700&auto=format&fit=crop&q=80"],
    features: ["PCIe 4.0 NVMe", "3500 MB/s Read", "1TB Capacity", "3 Yrs Warranty"]
  },
  {
    id: "storage-samsung-870-evo-500gb",
    name: "Samsung 870 EVO 500GB 2.5\" SATA III Internal SSD (560 MB/s)",
    brand: "Samsung", category: "Storages", subcategory: "SSD",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 3490, originalPrice: 5990, discount: "42% OFF", savings: 2500,
    gstITC: 628, stockLeft: 25, claimedPercent: 58, rating: 4.9, reviewsCount: 872,
    screenSize: "N/A", processor: "N/A", os: "N/A",
    specs: { capacity: "500GB", interface: "SATA III 6Gb/s 2.5\"", readSpeed: "560 MB/s Sequential Read", writeSpeed: "530 MB/s Sequential Write", warranty: "5 Years Samsung Warranty" },
    images: ["https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=700&auto=format&fit=crop&q=80"],
    features: ["560 MB/s SATA", "5-Yr Warranty", "500GB Capacity", "Brand New"]
  },
  {
    id: "storage-seagate-hdd-2tb",
    name: "Seagate Barracuda 2TB 3.5\" Internal Hard Drive, 7200 RPM, SATA 6Gb/s",
    brand: "Seagate", category: "Storages", subcategory: "HDD",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 3990, originalPrice: 5999, discount: "33% OFF", savings: 2009,
    gstITC: 718, stockLeft: 18, claimedPercent: 35, rating: 4.5, reviewsCount: 412,
    screenSize: "N/A", processor: "N/A", os: "N/A",
    specs: { capacity: "2TB", interface: "SATA 6Gb/s 3.5\"", speed: "7200 RPM", cache: "256MB Cache", warranty: "2 Years Seagate Warranty" },
    images: ["https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=700&auto=format&fit=crop&q=80"],
    features: ["2TB Capacity", "7200 RPM", "256MB Cache", "Brand New"]
  },
  {
    id: "storage-sandisk-portable-ssd",
    name: "SanDisk Extreme 1TB Portable SSD, 1050 MB/s Read, USB 3.2 Gen 2",
    brand: "SanDisk", category: "Storages", subcategory: "External Storage",
    condition: "Brand New Sealed", isCrazyDeal: true, isNew: true,
    price: 7490, originalPrice: 13990, discount: "46% OFF", savings: 6500,
    gstITC: 1348, stockLeft: 12, claimedPercent: 72, rating: 4.8, reviewsCount: 245,
    screenSize: "N/A", processor: "N/A", os: "N/A",
    specs: { capacity: "1TB", interface: "USB 3.2 Gen 2 Type-C", readSpeed: "1,050 MB/s Read Speed", writeSpeed: "1,000 MB/s Write Speed", protection: "IP55 Water & Dust Resistant", warranty: "5 Years SanDisk Warranty" },
    images: ["https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=700&auto=format&fit=crop&q=80"],
    features: ["1050 MB/s Read", "USB 3.2 Gen2", "IP55 Rated", "1TB Portable"]
  },

  // ======================== NETWORKING ========================
  {
    id: "net-tplink-archer-ax55",
    name: "TP-Link Archer AX55 AX3000 Dual-Band Gigabit Wi-Fi 6 Router",
    brand: "TP-Link", category: "Networking", subcategory: "Routers & Access Points",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 4999, originalPrice: 8999, discount: "44% OFF", savings: 4000,
    gstITC: 899, stockLeft: 12, claimedPercent: 55, rating: 4.7, reviewsCount: 92,
    screenSize: "N/A", processor: "N/A", os: "N/A",
    specs: { speed: "2402 Mbps (5GHz) + 574 Mbps (2.4GHz)", ports: "1x Gigabit WAN + 4x Gigabit LAN + USB 3.0", antennas: "4 High-Gain Beamforming Antennas", warranty: "3 Years TP-Link Warranty" },
    images: ["https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&auto=format&fit=crop&q=80"],
    features: ["Wi-Fi 6 AX3000", "Gigabit LAN", "USB 3.0 Sharing", "3 Yrs Warranty"]
  },
  {
    id: "net-ubiquiti-unifi-ap",
    name: "Ubiquiti UniFi AP AC LR Long Range Dual-Band 802.11ac Access Point",
    brand: "Ubiquiti", category: "Networking", subcategory: "Routers & Access Points",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 7990, originalPrice: 12990, discount: "38% OFF", savings: 5000,
    gstITC: 1438, stockLeft: 5, claimedPercent: 30, rating: 4.8, reviewsCount: 38,
    screenSize: "N/A", processor: "N/A", os: "N/A",
    specs: { speed: "450 Mbps (2.4GHz) + 867 Mbps (5GHz)", coverage: "Up to 183m Range", mounting: "Ceiling Mount (Kit Included)", management: "UniFi Controller (Free Cloud)", warranty: "1 Year Ubiquiti Warranty" },
    images: ["https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&auto=format&fit=crop&q=80"],
    features: ["Long Range AP", "Dual-Band AC", "PoE Powered", "Cloud Managed"]
  },
  {
    id: "net-tplink-sg108-switch",
    name: "TP-Link TL-SG108 8-Port Gigabit Desktop Network Switch, Unmanaged",
    brand: "TP-Link", category: "Networking", subcategory: "Gigabit Switches",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 1399, originalPrice: 2499, discount: "44% OFF", savings: 1100,
    gstITC: 251, stockLeft: 22, claimedPercent: 25, rating: 4.6, reviewsCount: 215,
    screenSize: "N/A", processor: "N/A", os: "N/A",
    specs: { ports: "8x Gigabit RJ45 Ports", speed: "10/100/1000 Mbps Auto-Negotiation", switching: "16 Gbps Switching Capacity", power: "External 5V Power Adapter", warranty: "Lifetime TP-Link Warranty" },
    images: ["https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&auto=format&fit=crop&q=80"],
    features: ["8-Port Gigabit", "Plug & Play", "Lifetime Warranty", "Brand New"]
  },
  {
    id: "net-cisco-sg110-poe-switch",
    name: "Cisco SG110-16HP 16-Port PoE Gigabit Desktop Switch, 64W PoE Budget",
    brand: "Cisco", category: "Networking", subcategory: "Gigabit Switches",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 12990, originalPrice: 18990, discount: "32% OFF", savings: 6000,
    gstITC: 2338, stockLeft: 3, claimedPercent: 20, rating: 4.7, reviewsCount: 18,
    screenSize: "N/A", processor: "N/A", os: "N/A",
    specs: { ports: "16x Gigabit RJ45 (8x PoE)", poeBudget: "64W PoE Budget", switching: "32 Gbps", management: "Unmanaged Plug-and-Play", warranty: "Limited Lifetime Cisco Warranty" },
    images: ["https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&auto=format&fit=crop&q=80"],
    features: ["16-Port PoE Switch", "64W PoE Budget", "Cisco Quality", "Lifetime Warranty"]
  },

  // ======================== CONSUMABLES ========================
  {
    id: "consumable-hp-ink-305xl",
    name: "HP 305XL High Yield Black & Tri-Color Ink Cartridge Combo Pack",
    brand: "HP", category: "Consumables", subcategory: "Cartridges & Toners",
    condition: "Brand New Sealed", isCrazyDeal: true, isNew: true,
    price: 1099, originalPrice: 2199, discount: "50% OFF", savings: 1100,
    gstITC: 197, stockLeft: 40, claimedPercent: 60, rating: 4.5, reviewsCount: 178,
    screenSize: "N/A", processor: "N/A", os: "N/A",
    specs: { blackYield: "120 Pages (Black)", colorYield: "200 Pages (Tri-Color)", compatibility: "HP DeskJet 2700, 4100 Series; Envy 6000", warranty: "HP Original Cartridge" },
    images: ["https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=700&auto=format&fit=crop&q=80"],
    features: ["HP Original Ink", "High Yield XL", "Black + Color Combo", "Brand New"]
  },
  {
    id: "consumable-canon-pg-745",
    name: "Canon PG-745XL & CL-746XL High Yield Ink Cartridge Combo for Canon PIXMA",
    brand: "Canon", category: "Consumables", subcategory: "Cartridges & Toners",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 1290, originalPrice: 2100, discount: "39% OFF", savings: 810,
    gstITC: 232, stockLeft: 35, claimedPercent: 45, rating: 4.4, reviewsCount: 132,
    screenSize: "N/A", processor: "N/A", os: "N/A",
    specs: { compatibility: "Canon PIXMA MG2577S, MG3077S, TS3370, TS3470", blackYield: "400 Pages (Black XL)", colorYield: "300 Pages (Color XL)", warranty: "Canon Original Cartridge" },
    images: ["https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=700&auto=format&fit=crop&q=80"],
    features: ["Canon Original", "High Yield XL", "Combo Pack", "Brand New"]
  },
  {
    id: "consumable-hp-laserjet-toner-cf258a",
    name: "HP 58A LaserJet Toner Cartridge, Black, 3000 Pages (CF258A)",
    brand: "HP", category: "Consumables", subcategory: "Cartridges & Toners",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 3990, originalPrice: 6500, discount: "39% OFF", savings: 2510,
    gstITC: 718, stockLeft: 10, claimedPercent: 35, rating: 4.7, reviewsCount: 56,
    screenSize: "N/A", processor: "N/A", os: "N/A",
    specs: { compatibility: "HP LaserJet Pro M404n, M404dn, M428fdn", pageYield: "3,000 Pages", color: "Black Toner", warranty: "HP Original Cartridge" },
    images: ["https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=700&auto=format&fit=crop&q=80"],
    features: ["HP Original Toner", "3000 Page Yield", "LaserJet Pro Compatible", "Brand New"]
  },

  // ======================== SERVERS & WORKSTATIONS ========================
  {
    id: "server-dell-poweredge-t140",
    name: "Dell PowerEdge T140 Tower Server, Intel Xeon E-2224, 16GB ECC RAM, 2TB Enterprise HDD",
    brand: "Dell", category: "Servers & Workstations", subcategory: "Tower Servers",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 64990, originalPrice: 110000, discount: "41% OFF", savings: 45010,
    gstITC: 11698, stockLeft: 3, claimedPercent: 40, rating: 4.9, reviewsCount: 28,
    screenSize: "N/A", processor: "Intel Xeon", os: "No OS",
    specs: { processor: "Intel Xeon E-2224 (4 Cores, 3.4GHz up to 4.6GHz)", ram: "16GB 2666MT/s DDR4 ECC UDIMM", storage: "2TB 7.2K RPM SATA 3.5\" Enterprise HDD", powerSupply: "365W Gold Efficiency", warranty: "3 Years ProSupport Next Business Day Onsite" },
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&auto=format&fit=crop&q=80"],
    features: ["Intel Xeon Quad Core", "16GB ECC Memory", "Enterprise 2TB Storage", "3 Yrs ProSupport"]
  },
  {
    id: "server-hp-proliant-dl20-gen10",
    name: "HP ProLiant DL20 Gen10 1U Rack Server, Intel Xeon E-2224, 16GB ECC, 1TB SATA",
    brand: "HP", category: "Servers & Workstations", subcategory: "Tower Servers",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 72990, originalPrice: 120000, discount: "39% OFF", savings: 47010,
    gstITC: 13138, stockLeft: 2, claimedPercent: 25, rating: 4.8, reviewsCount: 15,
    screenSize: "N/A", processor: "Intel Xeon", os: "No OS",
    specs: { processor: "Intel Xeon E-2224 (4 Cores, up to 4.6GHz)", ram: "16GB DDR4 ECC Unbuffered", storage: "1TB SATA Hot Plug 3.5\"", formFactor: "1U Rack", warranty: "3 Years HP Care Pack NBD Onsite" },
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&auto=format&fit=crop&q=80"],
    features: ["1U Rack Server", "Intel Xeon", "Hot Plug Drives", "3 Yrs HP Care"]
  },
  {
    id: "workstation-hp-z4-g4",
    name: "HP Z4 G4 Tower Workstation, Intel Xeon W-2123, 32GB ECC RAM, 512GB SSD + 2TB HDD, NVIDIA Quadro",
    brand: "HP", category: "Servers & Workstations", subcategory: "Workstation CPUs",
    condition: "Grade A+ Refurbished", isCrazyDeal: true, isNew: false,
    price: 84990, originalPrice: 199990, discount: "58% OFF", savings: 115000,
    gstITC: 15298, stockLeft: 2, claimedPercent: 65, rating: 4.9, reviewsCount: 12,
    screenSize: "N/A", processor: "Intel Xeon", os: "Windows 11 Pro",
    specs: { processor: "Intel Xeon W-2123 (4 Cores, up to 3.6GHz)", ram: "32GB DDR4 ECC Registered", storage: "512GB NVMe SSD + 2TB HDD", graphics: "NVIDIA Quadro P2000 5GB GDDR5", os: "Windows 11 Pro for Workstations", warranty: "1 Year Doorstep Warranty" },
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&auto=format&fit=crop&q=80"],
    features: ["Xeon W Processor", "32GB ECC RAM", "Quadro P2000 GPU", "Refurbished Workstation"]
  },
  {
    id: "workstation-dell-precision-3650",
    name: "Dell Precision 3650 Tower Workstation, Intel Core i9 11th Gen, 32GB RAM, 1TB SSD, NVIDIA T400",
    brand: "Dell", category: "Servers & Workstations", subcategory: "Workstation CPUs",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 119990, originalPrice: 179990, discount: "33% OFF", savings: 60000,
    gstITC: 21598, stockLeft: 2, claimedPercent: 28, rating: 4.8, reviewsCount: 8,
    screenSize: "N/A", processor: "Intel Core i9", os: "Windows 11 Pro",
    specs: { processor: "Intel Core i9-11900K (8 Cores, up to 5.2GHz)", ram: "32GB DDR4 3200MHz", storage: "1TB PCIe Gen4 SSD", graphics: "NVIDIA T400 4GB", os: "Windows 11 Pro for Workstations", warranty: "3 Years Dell ProSupport" },
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&auto=format&fit=crop&q=80"],
    features: ["Core i9 8-Core", "NVIDIA T400 GPU", "32GB DDR4", "3 Yrs ProSupport"]
  },

  // ======================== SOFTWARE ========================
  {
    id: "soft-microsoft-windows-11-pro",
    name: "Microsoft Windows 11 Pro 64-Bit Lifetime Retail License Key (Instant Delivery)",
    brand: "Microsoft", category: "Software's", subcategory: "Operating Systems",
    condition: "Brand New Sealed", isCrazyDeal: true, isNew: true,
    price: 2490, originalPrice: 11990, discount: "79% OFF", savings: 9500,
    gstITC: 448, stockLeft: 50, claimedPercent: 90, rating: 4.9, reviewsCount: 310,
    screenSize: "N/A", processor: "N/A", os: "Windows 11 Pro",
    specs: { licenseType: "Retail Lifetime License for 1 PC", delivery: "Instant Digital Key via Email & WhatsApp", support: "Direct Microsoft Official Updates & Activation" },
    images: ["https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=700&auto=format&fit=crop&q=80"],
    features: ["Lifetime Activation", "BitLocker & Remote Desktop", "Instant Digital Delivery", "100% Genuine"]
  },
  {
    id: "soft-ms-office-2021",
    name: "Microsoft Office 2021 Professional Plus, Lifetime License, 1 PC (32/64-Bit)",
    brand: "Microsoft", category: "Software's", subcategory: "Office Suite",
    condition: "Brand New Sealed", isCrazyDeal: true, isNew: true,
    price: 3490, originalPrice: 18990, discount: "82% OFF", savings: 15500,
    gstITC: 628, stockLeft: 40, claimedPercent: 88, rating: 4.8, reviewsCount: 240,
    screenSize: "N/A", processor: "N/A", os: "Windows 11 Pro",
    specs: { includes: "Word, Excel, PowerPoint, Outlook, OneNote, Teams, Access, Publisher", licenseType: "Retail Lifetime License (Non-Subscription)", delivery: "Instant Digital Key via Email", support: "Official Microsoft Activation" },
    images: ["https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=700&auto=format&fit=crop&q=80"],
    features: ["Full Office Suite", "Lifetime License", "No Monthly Fee", "Instant Delivery"]
  },
  {
    id: "soft-antivirus-kaspersky",
    name: "Kaspersky Total Security 2024, 3 Devices, 1 Year License Key",
    brand: "Kaspersky", category: "Software's", subcategory: "Security Software",
    condition: "Brand New Sealed", isCrazyDeal: false, isNew: true,
    price: 799, originalPrice: 2999, discount: "73% OFF", savings: 2200,
    gstITC: 143, stockLeft: 60, claimedPercent: 75, rating: 4.7, reviewsCount: 185,
    screenSize: "N/A", processor: "N/A", os: "Windows 11 Pro",
    specs: { devices: "3 Devices (PC/Mac/Mobile)", duration: "1 Year License", features: "Antivirus, VPN, Password Manager, Parental Control", delivery: "Instant Digital Key" },
    images: ["https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=700&auto=format&fit=crop&q=80"],
    features: ["3 Device Protection", "VPN Included", "Password Manager", "1 Year License"]
  }
];

const ALL_PRODUCTS = [...MOCK_PRODUCTS];

const MOCK_REVIEWS = {
  "monitor-lenovo-thinkvision-s24e": [
    { user: "Rajesh K. (IT Manager)", rating: 5, date: "Aug 29, 2026", comment: "Outstanding 23.8\" monitor at ₹7,906. Razor-sharp VA panel with 3-year onsite warranty." }
  ],
  "deal-dell-latitude-7490": [
    { user: "Sunil M. (Bangalore)", rating: 5, date: "Aug 26, 2026", comment: "Looks and feels like a brand new laptop! Got it for ₹24,990. Zero scratches, touchscreen is smooth." },
    { user: "Arjun Verma (Tech Lead)", rating: 5, date: "Aug 18, 2026", comment: "Amazing value for money! Delivered in 24 hours with warranty certificate." }
  ],
  "deal-hp-elitebook-840-g6": [
    { user: "Dr. Rohini K.", rating: 5, date: "Aug 29, 2026", comment: "Superb sleek metal build and the B&O speakers are crystal clear." }
  ],
  "deal-apple-macbook-air-m1": [
    { user: "Vikram N. (Designer)", rating: 5, date: "Aug 30, 2026", comment: "Unbelievable deal at ₹58,990. Battery health is 100% with only 2 cycle counts!" }
  ]
};
