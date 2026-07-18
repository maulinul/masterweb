# Masterweb — Personal Command Center

Single-file link manager & start page. Buka `index.html` (atau host di GitHub Pages) — tanpa build, tanpa dependency.

## Fitur

- **Dashboard ringkas** — greeting, Favorites, Recently opened, All Links
- **Sidebar navigasi** — All Links, Favorites, Recent, Collections, Private Vault
- **Command palette** — `Ctrl+K` / `/` : fuzzy search (judul, URL, domain, tag, collection) + perintah
- **Quick add** — tekan `N`, paste URL, Enter; judul & favicon otomatis, cek duplikat
- **Compact cards** — favicon, domain, collection chip, favorite star, quick actions saat hover
- **Delete + Undo** — hapus lewat menu More, bisa dibatalkan dari toast
- **Private Vault** — privacy lock (bukan enkripsi — lihat catatan), auto-lock setelah 10 menit idle
- **Gist sync** — Save/Load & merge ke GitHub Gist (Load tidak menimpa data lokal)
- **Import/Export** — JSON, CSV, Netscape Bookmark HTML
- **Generate HTML** — dropdown links self-contained siap embed
- Dark/light theme, 5 accent color, ambient particles, hormati `prefers-reduced-motion`

## Keyboard

| Key | Aksi |
|---|---|
| `Ctrl+K` atau `/` | Command palette |
| `N` | Add link |
| `Esc` | Tutup panel/modal |

## Data

Semua data tersimpan lokal di IndexedDB (schema v2: favorites, collections, tags, notes, usage tracking — migrasi otomatis dari v1). Service worker (`sw.js`) meng-cache app untuk akses offline saat dihosting via HTTP(S).

## Catatan keamanan

Password vault dan token GitHub disimpan **plaintext di browser** — ini privacy lock, bukan enkripsi. Enkripsi private vault (WebCrypto) ada di roadmap tahap berikutnya. Jangan simpan kredensial sensitif di notes.
