// 1. DATA PROYEK
const myProjects = [
  {
    "title": "Website Absensi Kelas",
    "category": "Web",
    "description": "Web Absensi Kelas Digital adalah platform minimalis untuk mencatat data kehadiran siswa secara efisien Aplikasi ini memungkinkan pengguna menginput data harian serta mengelola database melalui fitur edit dan hapus secara langsung",
    "image": "absensikelas.png"
  },
  {
    "title": "Kasir Pemesanan",
    "category": "html",
    "description": "Sistem Kasir Web Bakso Jeroan Malang adalah aplikasi POS digital modern yang menampilkan daftar menu dengan foto produk dan filter kategori Aplikasi ini dilengkapi keranjang belanja dinamis untuk mengelola jumlah item menghitung total harga otomatis dan memproses pesanan secara cepat",
    "image": "webkasir.png"
  },
  {
    "title": "Web Produk UMKM",
    "category": "Web",
    "description": "Website Jajanan Gen Z adalah platform e commerce UMKM berbasis web yang berfungsi sebagai katalog produk makanan kekinian Aplikasi ini dilengkapi navigasi menu atas dan tombol pintas di beranda untuk mengakses fitur daftar produk manajemen pesanan halaman iklan informasi kontak serta kustomisasi latar belakang",
    "image": "webumkm.png"
  }
];

// 2. FUNGSI UNTUK MENAMPILKAN PROYEK
function displayProjects(projects) {
    const projectContainer = document.getElementById('projectContainer');
    if(!projectContainer) return;

    // KOREKSI: Teks 'sss' yang mengganggu sudah dihapus dari sini
    projectContainer.innerHTML = ''; 
    
    projects.forEach(project => {
        const card = `
            <div class="card">
                <img src="${project.image}" alt="${project.title}">
                <div class="card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <span class="tag">#${project.category}</span>
                </div>
            </div>
        `;
        projectContainer.innerHTML += card;
    });
}

// 3. FUNGSI GANTI BACKGROUND & TEMA
function changeBg(color) {
    const btn = document.getElementById("darkModeToggle");
    document.documentElement.style.setProperty('--bg', color);
    
    if (color === '#121212') {
        document.documentElement.style.setProperty('--text', '#ffffff');
        document.documentElement.style.setProperty('--gray', '#1e1e1e');
        document.body.classList.add('dark-mode');
        
        // Ganti ikon jadi Matahari saat mode gelap aktif
        if(btn) btn.innerHTML = "☀️"; 
    } else {
        document.documentElement.style.setProperty('--text', '#1a1a1a');
        document.documentElement.style.setProperty('--gray', '#f4f4f4');
        document.body.classList.remove('dark-mode');
        
        // Ganti ikon jadi Bulan saat mode terang aktif
        if(btn) btn.innerHTML = "🌓";
    }
    localStorage.setItem("userColor", color);
}

// 4. LOGIKA UTAMA SAAT HALAMAN DIMUAT
document.addEventListener('DOMContentLoaded', () => {
    
    // Tampilkan Proyek
    displayProjects(myProjects);

    // Ambil tema yang tersimpan
    const savedColor = localStorage.getItem("userColor");
    if (savedColor) {
        changeBg(savedColor);
    }

    // --- LOGIKA MODAL (KLIK GAMBAR JADI BESAR) ---
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    const closeBtn = document.querySelector(".close-modal");

    document.addEventListener('click', function(e) {
        if(e.target && e.target.closest('.card img')) {
            if(modal) {
                modal.style.display = "flex";
                modalImg.src = e.target.src;
            }
        }
    });

    if(closeBtn) {
        closeBtn.onclick = function() { 
            modal.style.display = "none";
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    // --- LOGIKA SEARCH BAR ---
    const searchBar = document.getElementById('searchBar');
    if(searchBar) {
        searchBar.addEventListener('keyup', (e) => {
            const searchString = e.target.value.toLowerCase();
            const filteredProjects = myProjects.filter(project => {
                return project.title.toLowerCase().includes(searchString);
            });
            displayProjects(filteredProjects);
        });
    }

    // --- LOGIKA TOMBOL DARK MODE ---
    const toggleBtn = document.getElementById('darkModeToggle');
    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (document.body.classList.contains('dark-mode')) {
                changeBg('#ffffff'); // Kembali ke Putih
            } else {
                changeBg('#121212'); // Jadi Gelap
            }
        });
    }
});