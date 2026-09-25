# Cara Mendefaultkan Pesan Git

Jika Anda memiliki sebuah file berisi template pesan commit, misalnya `pesan-git.txt`, Anda dapat mengatur Git agar selalu menggunakan isi file tersebut sebagai pesan default setiap kali Anda menjalankan perintah `git commit` (tanpa flag `-m`).

## Langkah-langkah:

1. Buat file `pesan-git.txt` di dalam repositori Anda (atau di mana saja).
   Isi file tersebut dengan format pesan yang Anda inginkan. Contoh:
   ```text
   feat: [Tulis fitur di sini]
   
   Penjelasan:
   - 
   - 
   ```

2. Konfigurasikan Git untuk menggunakan file tersebut sebagai template:
   - Untuk repositori ini saja (Lokal):
     ```bash
     git config commit.template pesan-git.txt
     ```
   - Untuk seluruh repositori di komputer Anda (Global):
     ```bash
     git config --global commit.template pesan-git.txt
     ```
     *(Pastikan jika menggunakan global, gunakan absolute path, misal: `~/.pesan-git.txt`)*

3. Lakukan commit seperti biasa tanpa `-m`:
   ```bash
   git commit
   ```
   Git akan otomatis membuka editor teks (seperti nano atau vim) dengan isi template dari `pesan-git.txt`. Anda tinggal melengkapi pesan tersebut, simpan, dan tutup editor untuk menyelesaikan commit.
