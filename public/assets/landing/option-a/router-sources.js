/*
 * Visible Mandala Smart Router sources.
 * Add, remove or reorder an entry here; the list and convergence diagram
 * are generated from this one array.
 */
window.MANDALA_ROUTER_SOURCES = [
  {
    id: "mandala-native",
    name: "Mandala Native",
    detail: "Native pools",
    logo: "assets/landing/mandala-icon.png",
    routeType: "native",
    enabled: true
  },
  {
    id: "uniswap-v3",
    name: "Uniswap V3",
    detail: "Via fee collector",
    logo: "assets/landing/option-a/dex/uniswap.svg",
    routeType: "feeCollector",
    enabled: true
  },
  {
    id: "uniswap-v2",
    name: "Uniswap V2",
    detail: "Via fee collector",
    logo: "assets/landing/option-a/dex/uniswap.svg",
    routeType: "feeCollector",
    enabled: true
  },
  {
    id: "sushiswap-v2",
    name: "SushiSwap V2",
    detail: "Via fee collector",
    logo: "assets/landing/option-a/dex/sushiswap.svg",
    routeType: "feeCollector",
    enabled: true
  },
  {
    id: "pancakeswap-v3",
    name: "PancakeSwap V3",
    detail: "Via fee collector",
    logo: "assets/landing/option-a/dex/pancakeswap.svg",
    routeType: "feeCollector",
    enabled: true
  },
  {
    id: "0x",
    name: "0x",
    detail: "External aggregator",
    logo: "assets/landing/option-a/dex/0x.svg",
    routeType: "external",
    enabled: true,
    envRequirement: "0x API key"
  }
];

(function renderRouterSources() {
  var list = document.querySelector("[data-router-source-list]");
  var svg = document.querySelector("[data-router-lines]");
  if (!list || !svg) return;

  var sources = window.MANDALA_ROUTER_SOURCES.filter(function (source) {
    return source.enabled !== false;
  });

  sources.forEach(function (source) {
    var row = document.createElement("div");
    row.className = "oa-source-row";
    row.dataset.source = source.id;
    row.setAttribute("role", "listitem");

    var logoCell = document.createElement("span");
    logoCell.className = "oa-source-logo";
    logoCell.setAttribute("aria-hidden", "true");

    var logo = document.createElement("img");
    logo.src = source.logo;
    logo.alt = "";
    logo.loading = "lazy";
    logo.decoding = "async";
    logoCell.appendChild(logo);

    var copy = document.createElement("span");
    copy.className = "oa-source-copy";
    var name = document.createElement("b");
    name.textContent = source.name;
    var detail = document.createElement("small");
    detail.textContent = source.detail;
    copy.appendChild(name);
    copy.appendChild(detail);

    row.appendChild(logoCell);
    row.appendChild(copy);
    list.appendChild(row);
  });

  var namespace = "http://www.w3.org/2000/svg";
  var pitch = 49;
  var firstY = 22;
  var height = Math.max(142, firstY * 2 + pitch * Math.max(0, sources.length - 1));
  var endY = height / 2;
  svg.setAttribute("viewBox", "0 0 360 " + height);
  svg.setAttribute("preserveAspectRatio", "none");
  svg.style.height = height + "px";

  sources.forEach(function (_source, index) {
    var startY = firstY + (index * pitch);
    var path = document.createElementNS(namespace, "path");
    path.setAttribute("d", "M 3 " + startY + " C 172 " + startY + ", 162 " + endY + ", 357 " + endY);
    svg.appendChild(path);

    var node = document.createElementNS(namespace, "circle");
    node.setAttribute("cx", "3");
    node.setAttribute("cy", String(startY));
    node.setAttribute("r", "3.5");
    svg.appendChild(node);
  });
})();
