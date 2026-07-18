# Masterweb — Personal Command Center

Single-file link manager & start page. Buka `index.html` (atau host di GitHub Pages) — tanpa build, tanpa dependency.

## Fitur

- **Dashboard ringkas** — greeting, Favorites, Recently opened, All Links
- **Sidebar navigasi** — All Links, Favorites, Recent, Collections, Private Vault
- **Command palette** — `Ctrl+K` / `/` : fuzzy search (judul, URL, domain, tag, collection) + perintah
- **Quick add** — tekan `N`, paste URL, Enter; judul & favicon otomatis, cek duplikat
- **Compact cards** — favicon, domain, collection chip, favorite star, quick actions saat hover
- **Delete + Undo** — hapus lewat menu More, bisa dibatalkan dari toast
- **Private Vault terenkripsi** — AES-256-GCM, key diturunkan dari password via PBKDF2 (600k iterasi); auto-lock setelah 10 menit idle
- **Gist sync** — Save/Load & merge ke GitHub Gist (Load tidak menimpa data lokal); vault diunggah dalam bentuk terenkripsi
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

- **Private vault dienkripsi at rest** dengan AES-256-GCM. Key diturunkan dari password vault via PBKDF2 (SHA-256, 600.000 iterasi) dan hanya ada di memori selama vault terbuka — dibersihkan saat lock/auto-lock. Yang tersimpan di IndexedDB hanyalah salt, IV, dan ciphertext.
- **Password tidak dapat dipulihkan.** Tanpa password, data vault tidak bisa dibuka — tidak ada backdoor.
- Data vault lama (plaintext, versi sebelumnya) **dimigrasikan otomatis**: saat pertama unlock, kamu diminta password lama, lalu data dienkripsi ulang dan plaintext dihapus.
- Sync Gist untuk vault mengunggah **envelope terenkripsi**, bukan plaintext. Load lintas perangkat butuh password yang sama.
- **Token GitHub masih disimpan plaintext** di `localStorage` browser ini (dibutuhkan untuk memanggil API Gist). Gunakan token dengan scope seminimal mungkin (`gist`).
- Jangan simpan kredensial sensitif berat di field notes.
- WebCrypto memerlukan secure context — vault hanya bisa dienkripsi saat app dibuka via **HTTPS atau localhost**.
