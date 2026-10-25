const $ = (id) => document.getElementById(id);

// hero
$("names").innerHTML = `${SITE.names[0]}<span class="amp">&amp;</span>${SITE.names[1]}`;
$("tagline").textContent = SITE.tagline;
document.title = `${SITE.names[0]} & ${SITE.names[1]} 💕`;

// timeline
// A card can use `image: "a.jpg"` or `images: ["a.jpg", "b.jpg", ...]`
function eventPhotos(e) {
  const list = [].concat(e.images || e.image || []).filter(Boolean);
  if (!list.length) return "";
  const imgs = list.map((src) => `<img src="${src}" alt="${e.title}" loading="lazy">`).join("");
  return `<div class="event-photos n${Math.min(list.length, 4)}">${imgs}</div>`;
}
$("timeline").innerHTML = SITE.timeline.map((e) =>
  `<article class="event reveal"><time>${e.date}</time><h3>${e.title}</h3><p>${e.text}</p>${eventPhotos(e)}</article>`
).join("");

// gallery
$("grid").innerHTML = SITE.gallery.map((p, i) =>
  `<button class="reveal" data-i="${i}" aria-label="${p.caption}"><img src="${p.src}" alt="${p.caption}" loading="lazy"></button>`
).join("");

const lb = $("lightbox");
$("grid").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const p = SITE.gallery[b.dataset.i];
  $("lbImg").src = p.src;
  $("lbImg").alt = p.caption;
  $("lbCap").textContent = p.caption;
  lb.hidden = false;
});
const closeLb = () => { lb.hidden = true; };
lb.addEventListener("click", (e) => { if (e.target !== $("lbImg")) closeLb(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });

// letter
$("letter").textContent = SITE.letter;
$("envelope").addEventListener("click", () => {
  const open = $("letter").hidden;
  $("letter").hidden = !open;
  $("envelope").classList.toggle("open", open);
  $("envelope").setAttribute("aria-expanded", open);
  $("hint").textContent = open ? "Tap the heart to close" : "Tap the heart to open";
});

// counter
const start = new Date(SITE.anniversary);
function tick() {
  let s = Math.max(0, Math.floor((Date.now() - start) / 1000));
  $("cDays").textContent = Math.floor(s / 86400);
  $("cHours").textContent = Math.floor(s % 86400 / 3600);
  $("cMins").textContent = Math.floor(s % 3600 / 60);
  $("cSecs").textContent = s % 60;
}
tick();
setInterval(tick, 1000);

// scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// floating hearts
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const box = $("hearts");
  setInterval(() => {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = "♥";
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = 10 + Math.random() * 22 + "px";
    h.style.animationDuration = 6 + Math.random() * 6 + "s";
    box.appendChild(h);
    setTimeout(() => h.remove(), 13000);
  }, 700);
}
