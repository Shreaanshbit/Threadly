// ===========================
// THREADLY — Static Data
// ===========================

export const PRODUCTS = [
  { id:1, name:"Classic Navy Slim-Fit Blazer",       category:"MEN'S OUTERWEAR",  price:129, oldPrice:180, rating:4.8, badge:"NEW SEASON",  bg:"linear-gradient(135deg,#2F3E46 0%,#354F52 100%)", placeholder:"CLASSIC NAVY BLAZER" },
  { id:2, name:"Signature Oversized Organic Hoodie", category:"MEN'S ESSENTIALS", price:72,  oldPrice:110, rating:4.9, badge:"BEST SELLER", bg:"linear-gradient(135deg,#84A98C 0%,#CAD2C5 100%)", placeholder:"OVERSIZED HOODIE" },
  { id:3, name:"Premium Wool Blend Coat",            category:"MEN'S OUTERWEAR",  price:189, oldPrice:260, rating:4.7, badge:"LIMITED", badgeClass:"limited", bg:"linear-gradient(135deg,#354F52 0%,#52796F 100%)", placeholder:"WOOL BLEND COAT" },
  { id:4, name:"Structured Canvas Trouser",          category:"MEN'S BOTTOMS",    price:95,  rating:4.6,  bg:"linear-gradient(135deg,#52796F 0%,#84A98C 100%)", placeholder:"CANVAS TROUSER" },
  { id:5, name:"Slim-Fit Selvedge Denim",            category:"MEN'S DENIM",      price:120, oldPrice:160, rating:4.7, badge:"NEW SEASON", bg:"linear-gradient(135deg,#354F52 0%,#52796F 100%)", placeholder:"SELVEDGE DENIM" },
  { id:6, name:"Essential Cotton Tee",               category:"MEN'S BASICS",     price:45,  rating:4.6,  bg:"linear-gradient(135deg,#CAD2C5 0%,#fff 100%)", placeholder:"ESSENTIAL TEE" },
];

export const PRODUCT_DETAIL = {
  id:1, name:"Signature Oversized Organic Hoodie", tag:"THREADLY ESSENTIALS",
  price:72, oldPrice:110, discount:"-34% 🔥", rating:5, reviews:124,
  description:"Elevated everyday wear. This hoodie is constructed from our custom 480GSM heavyweight loopback cotton, featuring a refined architectural silhouette and a structured double-layer hood.",
  colors:[
    { name:"OBSIDIAN BLACK", bg:"#2F3E46" },
    { name:"CLOUD GREY",     bg:"#CAD2C5" },
    { name:"FOREST GREEN",   bg:"#52796F" },
  ],
  sizes:["S","M","L","XL"],
  images:[
    { bg:"linear-gradient(135deg,#84A98C 0%,#CAD2C5 100%)", label:"Front" },
    { bg:"linear-gradient(135deg,#52796F 0%,#84A98C 100%)", label:"Detail" },
    { bg:"linear-gradient(135deg,#354F52 0%,#52796F 100%)", label:"Back" },
  ],
  specs:[
    { label:"Fabric",  value:"100% Organic Cotton" },
    { label:"Weight",  value:"Heavyweight 480GSM" },
    { label:"Fitting", value:"True to size (Oversized)" },
  ],
  related:[
    { name:"Structured Canvas Trouser", price:"$120.00", bg:"linear-gradient(135deg,#CAD2C5 0%,#84A98C 100%)", placeholder:"CANVAS\nTROUSER" },
    { name:"Merino Wool Beanie",         price:"$45.00",  bg:"linear-gradient(135deg,#84A98C 0%,#52796F 100%)", placeholder:"WOOL\nBEANIE" },
    { name:"Heavy Body Tee",             price:"$55.00",  bg:"linear-gradient(135deg,#fff 0%,#CAD2C5 100%)",    placeholder:"BODY\nTEE" },
    { name:"Tech Shell Parka",           price:"$210.00", bg:"linear-gradient(135deg,#2F3E46 0%,#354F52 100%)", placeholder:"SHELL\nPARKA" },
  ],
};

export const CART_ITEMS_INITIAL = [
  { id:1, name:"Premium Wool Blend Coat",      price:129, qty:1, sku:"TL-2048", color:"Navy Blue",   size:"Large",  bg:"linear-gradient(135deg,#2F3E46 0%,#354F52 100%)", placeholder:"WOOL COAT" },
  { id:2, name:"Organic Cotton Essential Tee", price:35,  qty:2, sku:"TL-1001", color:"Oatri White", size:"Medium", bg:"linear-gradient(135deg,#CAD2C5 0%,#fff 100%)",    placeholder:"COTTON TEE" },
  { id:3, name:"Sprint Pro Running Shoes",     price:89,  qty:1, sku:"TL-3042", color:"Olive Green", size:"US 10",  bg:"linear-gradient(135deg,#84A98C 0%,#52796F 100%)",  placeholder:"RUNNING SHOES" },
];

export const ORDERS_DATA = [
  { id:"#TH-9410", time:"Just now",    customer:"James Wilson", initials:"JW", amount:"$189.99", status:"● Delivered",  statusClass:"delivered" },
  { id:"#TH-9409", time:"12 mins ago", customer:"Sarah Adams",  initials:"SA", amount:"$42.00",  status:"● In Transit", statusClass:"transit" },
  { id:"#TH-9408", time:"35 mins ago", customer:"Robert King",  initials:"RK", amount:"$210.50", status:"● Packaging",  statusClass:"packaging" },
];

export const REC_ITEMS = [
  { name:"Lightweight Rain Jacket", category:"OUTERWEAR",   price:"$65.00", bg:"linear-gradient(135deg,#CAD2C5 0%,#84A98C 100%)", text:"RAIN\nJACKET" },
  { name:"Slim-fit Selvedge Denim", category:"BOTTOMS",     price:"$79.00", bg:"linear-gradient(135deg,#354F52 0%,#52796F 100%)", text:"SELVEDGE\nDENIM" },
  { name:"Aviator Sunglasses",      category:"ACCESSORIES", price:"$45.00", bg:"linear-gradient(135deg,#2F3E46 0%,#354F52 100%)", text:"AVIATOR\nSUNGLASS" },
  { name:"Fleece Oversized Hoodie", category:"ESSENTIALS",  price:"$58.00", bg:"linear-gradient(135deg,#84A98C 0%,#CAD2C5 100%)", text:"FLEECE\nHOODIE" },
];

export const fmt = (n) => `$${Number(n).toFixed(2)}`;
