// Simple front-end gate (hashes, not plain text). Keeps casual visitors out; it is not real security.
const hash = (s, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, c; i < s.length; i++) {
    c = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
const USER_HASH = 3274787117927680;
const PASS_HASH = 5107867437939626;

const unlock = () => {
  document.body.classList.remove("locked");
  document.getElementById("login").hidden = true;
};
let remembered = false;
try { remembered = sessionStorage.getItem("unlocked") === "1"; } catch (e) {}
if (remembered) unlock();

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const u = document.getElementById("loginUser").value.trim().toLowerCase();
  const p = document.getElementById("loginPass").value;
  if (hash(u) === USER_HASH && hash(p) === PASS_HASH) {
    try { sessionStorage.setItem("unlocked", "1"); } catch (e) {}
    unlock();
    window.scrollTo(0, 0);
  } else {
    document.getElementById("loginError").hidden = false;
    document.getElementById("loginPass").value = "";
  }
});
