/* ============================================
   BSS - Basis Sarana Solusindo
   Company Profile Script
   ============================================ */

// ========== CONFIGURATION ==========
const CONFIG = {
    // Default admin credentials
    admin: {
        username: 'admin',
        password: 'admin1234'
    },
    // Default WhatsApp number
    defaultWhatsApp: '6282185690311',
    // Default social media
    defaultTikTok: '@cctvautogatelampung',
    defaultInstagram: '@basis_cctvautogatelampung',
    // Slider auto-play interval (ms)
    sliderInterval: 4000,
    // Testimonial carousel speed
    carouselSpeed: 30,
    // localStorage keys
    keys: {
        products: 'bss_products',
        sliders: 'bss_sliders_v12',
        portfolio: 'bss_portfolio_v2',
        settings: 'bss_settings_v2',
        credentials: 'bss_admin_credentials',
        isLoggedIn: 'bss_admin_logged'
    }
};

// ========== DATA MANAGEMENT ==========
const DataManager = {
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error reading localStorage:', e);
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error writing localStorage:', e);
            if (e.name === 'QuotaExceededError') {
                showToast('Penyimpanan penuh! Hapus beberapa data terlebih dahulu.', 'error');
            }
            return false;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    // Initialize default data
    initDefaults() {
        // Default products
        if (!this.get(CONFIG.keys.products)) {
            this.set(CONFIG.keys.products, [
                {
                    id: Date.now() + 1,
                    name: 'Paket CCTV 4 Kamera HD',
                    description: 'Paket lengkap 4 kamera CCTV resolusi 2MP dengan DVR 4 Channel, HDD 500GB, dan kabel. Cocok untuk rumah dan toko kecil.',
                    image: ''
                },
                {
                    id: Date.now() + 2,
                    name: 'Barrier Gate Otomatis',
                    description: 'Barrier gate otomatis dengan palang 3-6 meter. Dilengkapi remote control dan sistem anti-crush untuk keamanan.',
                    image: ''
                },
                {
                    id: Date.now() + 3,
                    name: 'GPS Tracker Kendaraan',
                    description: 'GPS tracker real-time untuk mobil dan motor. Pantau lokasi kendaraan 24/7 melalui aplikasi smartphone.',
                    image: ''
                },
                {
                    id: Date.now() + 4,
                    name: 'Sliding Gate Motor',
                    description: 'Motor sliding gate otomatis kapasitas hingga 1800kg. Operasi halus dan senyap dengan remote wireless.',
                    image: ''
                },
                {
                    id: Date.now() + 5,
                    name: 'Paket CCTV 8 Kamera 4MP',
                    description: 'Paket CCTV 8 kamera resolusi 4MP Super HD dengan NVR 8 Channel, HDD 2TB. Ideal untuk pabrik dan gudang.',
                    image: ''
                },
                {
                    id: Date.now() + 6,
                    name: 'Access Control Door',
                    description: 'Sistem akses pintu elektrik dengan fingerprint, kartu RFID, dan password. Manajemen karyawan lebih mudah.',
                    image: ''
                }
            ]);
        }

        // Default sliders
        if (!this.get(CONFIG.keys.sliders)) {
            this.set(CONFIG.keys.sliders, [
                { id: 1, image: 'foto/atas/WhatsApp Image 2026-04-15 at 20.44.42.jpeg' }
            ]);
        }

        // Default portfolio
        if (!this.get(CONFIG.keys.portfolio)) {
            this.set(CONFIG.keys.portfolio, [
                { id: 1, image: 'foto/bawah/WhatsApp Image 2026-04-13 at 15.57.26 (1).jpeg' },
                { id: 2, image: 'foto/bawah/WhatsApp Image 2026-04-13 at 15.57.27.jpeg' },
                { id: 3, image: 'foto/bawah/WhatsApp Image 2026-04-13 at 20.26.41.jpeg' },
                { id: 4, image: 'foto/bawah/WhatsApp Image 2026-04-13 at 20.26.42.jpeg' },
                { id: 5, image: 'foto/bawah/WhatsApp Image 2026-04-13 at 20.26.43.jpeg' },
                { id: 6, image: 'foto/bawah/WhatsApp Image 2026-04-13 at 20.26.44.jpeg' },
                { id: 7, image: 'foto/bawah/WhatsApp Image 2026-04-13 at 20.26.45.jpeg' },
                { id: 8, image: 'foto/bawah/WhatsApp Image 2026-04-13 at 20.26.48.jpeg' },
                { id: 9, image: 'foto/bawah/WhatsApp Image 2026-04-13 at 20.26.49.jpeg' },
                { id: 10, image: 'foto/bawah/WhatsApp Image 2026-04-13 at 20.26.50.jpeg' }
            ]);
        }

        // Default settings
        if (!this.get(CONFIG.keys.settings)) {
            this.set(CONFIG.keys.settings, {
                whatsapp: CONFIG.defaultWhatsApp,
                tiktok: CONFIG.defaultTikTok,
                instagram: CONFIG.defaultInstagram
            });
        }

        // Default credentials
        if (!this.get(CONFIG.keys.credentials)) {
            this.set(CONFIG.keys.credentials, {
                username: CONFIG.admin.username,
                password: CONFIG.admin.password
            });
        }
    }
};

// ========== UTILITY FUNCTIONS ==========
function generateId() {
    return Date.now() + Math.random().toString(36).substring(2, 9);
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        // Limit file size to 2MB
        if (file.size > 2 * 1024 * 1024) {
            reject(new Error('File terlalu besar. Maksimal 2MB.'));
            return;
        }

        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function compressImage(base64, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = base64;
    });
}

function getWhatsAppNumber() {
    const settings = DataManager.get(CONFIG.keys.settings);
    return settings?.whatsapp || CONFIG.defaultWhatsApp;
}

function openWhatsApp(message) {
    const number = getWhatsAppNumber();
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// ========== NAVBAR ==========
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });

        // Scroll to top button
        const scrollTop = document.getElementById('scrollTop');
        if (window.scrollY > 400) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Scroll to top
    document.getElementById('scrollTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== HERO SLIDER ==========
let sliderIndex = 0;
let sliderTimer = null;

function initSlider() {
    renderSlider();
    startSliderAutoPlay();

    document.getElementById('sliderPrev').addEventListener('click', () => {
        moveSlider(-1);
        resetSliderAutoPlay();
    });

    document.getElementById('sliderNext').addEventListener('click', () => {
        moveSlider(1);
        resetSliderAutoPlay();
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    const sliderEl = document.getElementById('heroSlider');

    sliderEl.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderEl.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            moveSlider(diff > 0 ? 1 : -1);
            resetSliderAutoPlay();
        }
    }, { passive: true });
}

function renderSlider() {
    const sliders = DataManager.get(CONFIG.keys.sliders) || [];
    const wrapper = document.getElementById('sliderWrapper');
    const dotsContainer = document.getElementById('sliderDots');

    if (sliders.length === 0) {
        wrapper.innerHTML = `
            <div class="slider-slide">
                <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1B1B1B,#333);color:white;font-family:var(--font-heading);">
                    <div style="text-align:center;padding:2rem;">
                        <h2 style="font-size:clamp(1.5rem,4vw,2.5rem);margin-bottom:0.5rem;">Basis Sarana Solusindo</h2>
                        <p style="opacity:0.7;font-family:var(--font-primary);">Solusi Keamanan Terpercaya</p>
                    </div>
                </div>
            </div>
        `;
        dotsContainer.innerHTML = '';
        return;
    }

    wrapper.innerHTML = sliders.map((slide, i) => `
        <div class="slider-slide">
            <img src="${slide.image}" class="slider-fg" alt="Banner ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}">
        </div>
    `).join('');

    dotsContainer.innerHTML = sliders.map((_, i) => `
        <div class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>
    `).join('');

    // Dot click handlers
    dotsContainer.querySelectorAll('.slider-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            sliderIndex = parseInt(dot.dataset.index);
            updateSlider();
            resetSliderAutoPlay();
        });
    });

    sliderIndex = 0;
    updateSlider();
}

function moveSlider(direction) {
    const sliders = DataManager.get(CONFIG.keys.sliders) || [];
    if (sliders.length === 0) return;

    sliderIndex += direction;
    if (sliderIndex >= sliders.length) sliderIndex = 0;
    if (sliderIndex < 0) sliderIndex = sliders.length - 1;

    updateSlider();
}

function updateSlider() {
    const wrapper = document.getElementById('sliderWrapper');
    wrapper.style.transform = `translateX(-${sliderIndex * 100}%)`;

    // Update dots
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === sliderIndex);
    });
}

function startSliderAutoPlay() {
    sliderTimer = setInterval(() => moveSlider(1), CONFIG.sliderInterval);
}

function resetSliderAutoPlay() {
    clearInterval(sliderTimer);
    startSliderAutoPlay();
}

// ========== PRODUCTS ==========
const staticBrandsData = [
    {
        id: 'hilook',
        name: 'HiLook',
        description: 'Sistem CCTV terjangkau dan berkualitas',
        image: 'foto/logo/hilook_logo.png',
        packages: [
            {
                name: 'Paket CCTV 4CH HiLook',
                desc: 'Tersedia pilihan resolusi 2MP atau 5MP',
                detail: 'Kamera pengawas HiLook untuk ruangan atau luar ruangan.\n\nTermasuk:\n- 4x Kamera (Bisa Indoor / Outdoor)\n- 1x DVR 4 Channel\n- Kelengkapan Instalasi (Harddisk, Kabel, dll)\n- Termasuk Pemasangan',
                price: '',
                image: 'foto/produk/hilook/4ch.jpeg'
            },
            {
                name: 'Paket CCTV 8CH HiLook',
                desc: 'Tersedia pilihan resolusi 2MP atau 5MP',
                detail: 'Kamera pengawas HiLook skala menengah.\n\nTermasuk:\n- 8x Kamera (Bisa Indoor / Outdoor)\n- 1x DVR 8 Channel\n- Kelengkapan Instalasi (Harddisk, Kabel, dll)\n- Termasuk Pemasangan',
                price: '',
                image: 'foto/produk/hilook/8ch.webp'
            },
            {
                name: 'Paket CCTV 16CH HiLook',
                desc: 'Tersedia pilihan resolusi 2MP atau 5MP',
                detail: 'Solusi keamanan maksimal dengan HiLook.\n\nTermasuk:\n- 16x Kamera (Bisa Indoor / Outdoor)\n- 1x DVR 16 Channel\n- Kelengkapan Instalasi (Harddisk, Kabel, dll)\n- Termasuk Pemasangan',
                price: '',
                image: 'foto/produk/hilook/16ch.webp'
            },
            {
                name: 'Paket Custom HiLook',
                desc: 'Atau Sesuai Kebutuhan',
                detail: 'Solusi keamanan bisa disesuaikan dengan kebutuhan Anda.\n\nSilakan konsultasi dengan kami untuk menentukan jumlah kamera dan spesifikasi yang tepat (tersedia 2MP, 5MP, dll).',
                price: '',
                image: ''
            }
        ]
    },
    {
        id: 'hikvision',
        name: 'Hikvision',
        description: 'Teknologi CCTV No. 1 di dunia',
        image: 'foto/logo/hikvis.png',
        packages: [
            {
                name: 'Paket CCTV 4CH Hikvision',
                desc: 'Tersedia pilihan resolusi 2MP atau 5MP',
                detail: 'Paket teknologi dari inovator CCTV Hikvision.\n\nTermasuk:\n- 4x Kamera Hikvision (Indoor / Outdoor)\n- 1x DVR 4 Channel\n- Kelengkapan Instalasi (Harddisk, Kabel, dll)\n- Termasuk Pemasangan',
                price: '',
                image: 'foto/produk/hikvision/4ch.jpeg'
            },
            {
                name: 'Paket CCTV 8CH Hikvision',
                desc: 'Tersedia pilihan resolusi 2MP atau 5MP',
                detail: 'Paket keamanan Hikvision untuk kebutuhan lebih luas.\n\nTermasuk:\n- 8x Kamera Hikvision (Indoor / Outdoor)\n- 1x DVR 8 Channel\n- Kelengkapan Instalasi (Harddisk, Kabel, dll)\n- Termasuk Pemasangan',
                price: '',
                image: 'foto/produk/hikvision/8mp.avif'
            },
            {
                name: 'Paket CCTV 16CH Hikvision',
                desc: 'Tersedia pilihan resolusi 2MP atau 5MP',
                detail: 'Paket komprehensif Hikvision skala besar.\n\nTermasuk:\n- 16x Kamera Hikvision (Indoor / Outdoor)\n- 1x DVR 16 Channel\n- Kelengkapan Instalasi (Harddisk, Kabel, dll)\n- Termasuk Pemasangan',
                price: '',
                image: 'foto/produk/hikvision/16ch.jpeg'
            },
            {
                name: 'Paket Custom Hikvision',
                desc: 'Atau Sesuai Kebutuhan',
                detail: 'Dapatkan konfigurasi kamera Hikvision yang sesuai dengan persis apa yang Anda inginkan (jumlah custom, spesifikasi 2MP / 5MP).',
                price: '',
                image: ''
            }
        ]
    },
    {
        id: 'tiandy',
        name: 'Tiandy',
        description: 'Inovasi CCTV IP dengan kejernihan maksimal',
        image: 'foto/logo/tiandy.png',
        packages: [
            {
                name: 'Paket CCTV IP Tiandy Sound 2MP 4CH',
                desc: 'IP Camera 4 Channel dengan Audio',
                detail: 'Kualitas gambar dan audio jernih melalui jaringan IP.\n\nTermasuk:\n- 4x IP Camera Tiandy Sound 2MP\n- 1x NVR 4 Channel\n- Kelengkapan Instalasi\n- Termasuk Pemasangan',
                price: '',
                image: 'foto/produk/tiandy/ip4ch.jpeg'
            },
            {
                name: 'Paket CCTV IP Tiandy Sound 2MP 8CH',
                desc: 'IP Camera 8 Channel dengan Audio',
                detail: 'Cakupan ekstra IP Camera Tiandy dengan Audio terintegrasi.\n\nTermasuk:\n- 8x IP Camera Tiandy Sound 2MP\n- 1x NVR 8 Channel\n- Kelengkapan Instalasi\n- Termasuk Pemasangan',
                price: '',
                image: 'foto/produk/tiandy/ip 8ch.jpeg'
            },
            {
                name: 'Paket Custom Tiandy',
                desc: 'Atau Sesuai Kebutuhan',
                detail: 'Untuk kebutuhan sistem CCTV IP Tiandy dalam skala jumlah berbeda (di atas 8CH atau kurang), silakan hubungi kami.',
                price: '',
                image: ''
            }
        ]
    },
    {
        id: 'barrier_gate',
        name: 'Barrier Gate',
        description: 'Sistem Barrier Gate otomatis untuk parkir dan gerbang',
        image: 'foto/produk/barriergate.jpeg',
        isDirectWa: true,
        packages: []
    },
    {
        id: 'sliding_gate',
        name: 'Sliding Gate',
        description: 'Mesin Sliding Gate otomatis kapasitas besar',
        image: 'foto/barrier gate/sliding.jpeg',
        isDirectWa: true,
        packages: []
    },
    {
        id: 'swing_gate',
        name: 'Swing Gate',
        description: 'Motor Swing Gate otomatis untuk gerbang hunian',
        image: 'foto/produk/swing gate.jpeg',
        isDirectWa: true,
        packages: []
    },
    {
        id: 'ezviz',
        name: 'Ezviz',
        description: 'Smart Home Security Camera yang terpercaya dan mudah digunakan',
        image: 'foto/logo/logo-393.webp',
        isDirectWa: true,
        packages: []
    }
];

function renderProducts() {
    renderBrands();
}

function renderBrands() {
    const grid = document.getElementById('produkGrid');
    const empty = document.getElementById('produkEmpty');

    grid.style.display = 'grid';
    empty.style.display = 'none';

    grid.innerHTML = staticBrandsData.map((brand, index) => `
        <div class="produk-card" style="transition-delay: ${index * 0.08}s">
            <div class="produk-card-img">
                <img src="${brand.image}" alt="${brand.name}" loading="lazy">
            </div>
            <div class="produk-card-body">
                <h3 class="produk-card-name">${escapeHtml(brand.name)}</h3>
                <p class="produk-card-desc">${escapeHtml(brand.description)}</p>
            </div>
            <div class="produk-card-footer">
                ${brand.isDirectWa
            ? `<button class="btn btn-whatsapp" onclick="askBrandWA('${escapeHtml(brand.name)}')" style="width: 100%;">
                        <i class="fab fa-whatsapp"></i> Hubungi WA
                       </button>`
            : `<button class="btn btn-primary" onclick="showPackages('${brand.id}')" style="width: 100%;">
                        <i class="fas fa-list"></i> Lihat Paket
                       </button>`
        }
            </div>
        </div>
    `).join('');

    observeCards(grid);
}

function askBrandWA(brandName) {
    const message = `Halo BSS! Saya tertarik dan ingin bertanya tentang produk *${brandName}*. Bisa tolong berikan informasi lebih lanjut?`;
    openWhatsApp(message);
}

function showPackages(brandId) {
    const brand = staticBrandsData.find(b => b.id === brandId);
    if (!brand) return;

    const grid = document.getElementById('produkGrid');

    let html = `
        <div style="grid-column: 1 / -1; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between;">
            <h3 style="font-size: 1.5rem; font-weight: bold; color: var(--color-dark);"><i class="fas fa-tag"></i> Paket ${brand.name}</h3>
            <button class="btn btn-outline btn-sm" onclick="renderBrands()">
                <i class="fas fa-arrow-left"></i> Kembali ke Merek
            </button>
        </div>
    `;

    html += brand.packages.map((pkg, index) => `
        <div class="produk-card" style="transition-delay: ${index * 0.08}s">
            ${pkg.image ? `<div class="produk-card-img"><img src="${pkg.image}" alt="${pkg.name}" loading="lazy"></div>` : ''}
            <div class="produk-card-body">
                <h3 class="produk-card-name">${escapeHtml(pkg.name)}</h3>
                ${pkg.price ? `<p class="text-accent" style="font-weight: bold; margin-bottom: 0.5rem; font-size: 1.1rem;">${escapeHtml(pkg.price)}</p>` : ''}
                <p class="produk-card-desc">${escapeHtml(pkg.desc)}</p>
            </div>
            <div class="produk-card-footer">
                <button class="btn btn-outline" style="width: 100%; border-color: var(--color-accent); color: var(--color-accent);" onclick="showPackageDetail('${encodeURIComponent(JSON.stringify(pkg))}')">
                    <i class="fas fa-info-circle"></i> Lihat Detail
                </button>
            </div>
        </div>
    `).join('');

    grid.innerHTML = html;

    // Scroll a bit up to see the title clearly
    document.getElementById('produk').scrollIntoView({ behavior: 'smooth' });
    observeCards(grid);
}

function showPackageDetail(pkgJson) {
    const pkg = JSON.parse(decodeURIComponent(pkgJson));
    const modal = document.getElementById('packageModal');

    document.getElementById('modalPackageName').innerText = pkg.name;
    document.getElementById('modalPackagePrice').innerText = pkg.price || '';
    document.getElementById('modalPackageDetail').innerText = pkg.detail;

    const waBtn = document.getElementById('modalPackageWaBtn');
    waBtn.onclick = () => {
        const priceText = pkg.price ? ` (${pkg.price})` : '';
        const message = `Halo BSS! Saya tertarik dan ingin bertanya tentang *${pkg.name}*${priceText}. Bisa tolong berikan informasi lebih lanjut?`;
        openWhatsApp(message);
    };

    modal.classList.add('active');
}

function observeCards(grid) {
    setTimeout(() => {
        const cards = grid.querySelectorAll('.produk-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => observer.observe(card));
    }, 100);
}

function askProduct(productName) {
    const message = `Halo BSS! Saya tertarik dengan produk *${productName}*. Bisa tolong berikan informasi lebih lanjut mengenai harga dan spesifikasinya? Terima kasih.`;
    openWhatsApp(message);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========== TESTIMONIAL / PORTFOLIO CAROUSEL ==========
let carouselAnimationId = null;
let carouselPosition = 0;

function renderTestimoniCarousel() {
    const portfolio = DataManager.get(CONFIG.keys.portfolio) || [];
    const carousel = document.getElementById('testimoniCarousel');
    const empty = document.getElementById('testimoniEmpty');
    const wrapper = document.querySelector('.testimoni-carousel-wrapper');

    // Stop any existing animation
    if (carouselAnimationId) {
        cancelAnimationFrame(carouselAnimationId);
        carouselAnimationId = null;
    }

    if (portfolio.length === 0) {
        wrapper.style.display = 'none';
        empty.style.display = 'block';
        carousel.innerHTML = '';
        return;
    }

    wrapper.style.display = 'block';
    empty.style.display = 'none';

    // Triple the items for seamless infinite scroll
    const allItems = [...portfolio, ...portfolio, ...portfolio];

    carousel.innerHTML = allItems.map((item, i) => `
        <div class="testimoni-item" onclick="openLightbox('${item.image}')">
            <div class="testimoni-item-frame">
                <img src="${item.image}" alt="Portofolio ${i + 1}" loading="lazy">
                <div class="testimoni-item-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
            <div class="testimoni-item-caption">
                <i class="fas fa-camera"></i>
                <span>Hasil Instalasi</span>
            </div>
        </div>
    `).join('');

    // Remove old CSS animation — we drive it with JS
    carousel.style.animation = 'none';

    // JS-driven smooth ticker
    const speed = 0.6; // pixels per frame
    let isPaused = false;

    carousel.addEventListener('mouseenter', () => { isPaused = true; });
    carousel.addEventListener('mouseleave', () => { isPaused = false; });

    function tick() {
        if (!isPaused) {
            carouselPosition -= speed;
            // Each item is approx 340px (300 + 24 gap + 16 padding), reset after 1 set
            const singleSetWidth = carousel.scrollWidth / 3;
            if (Math.abs(carouselPosition) >= singleSetWidth) {
                carouselPosition += singleSetWidth;
            }
            carousel.style.transform = `translateX(${carouselPosition}px)`;
        }
        carouselAnimationId = requestAnimationFrame(tick);
    }

    carouselPosition = 0;
    tick();
}

// ========== LIGHTBOX ==========
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        }
    });
}

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    lightboxImg.src = src;
    lightbox.classList.add('active');
}

// ========== CONTACT FORM ==========
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !message) {
            showToast('Mohon isi semua field!', 'error');
            return;
        }

        const waMessage = `Halo BSS!\n\nNama: *${name}*\nPesan: ${message}\n\nTerima kasih.`;
        openWhatsApp(waMessage);

        form.reset();
    });

    // Update social links from settings
    updateSocialLinks();
}

function updateSocialLinks() {
    const settings = DataManager.get(CONFIG.keys.settings) || {};

    const waLink = document.getElementById('socialWhatsApp');
    const tiktokLink = document.getElementById('socialTikTok');
    const igLink = document.getElementById('socialInstagram');

    const waNumber = settings.whatsapp || CONFIG.defaultWhatsApp;
    const tiktok = settings.tiktok || CONFIG.defaultTikTok;
    const instagram = settings.instagram || CONFIG.defaultInstagram;

    waLink.href = `https://wa.me/${waNumber}`;
    waLink.querySelector('.social-handle').textContent = `+${waNumber.replace(/(\d{2})(\d{3})(\d{4})(\d+)/, '$1 $2-$3-$4')}`;

    tiktokLink.href = `https://tiktok.com/${tiktok.replace('@', '@')}`;
    tiktokLink.querySelector('.social-handle').textContent = tiktok;

    igLink.href = `https://instagram.com/${instagram.replace('@', '')}`;
    igLink.querySelector('.social-handle').textContent = instagram;
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ========== ADMIN SYSTEM ==========
function initAdmin() {
    const adminNavLi = document.getElementById('adminNavLi');
    const loginBtn = document.getElementById('adminLoginBtn');
    const loginModal = document.getElementById('loginModal');
    const loginModalClose = document.getElementById('loginModalClose');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const adminPanel = document.getElementById('adminPanel');
    const adminLogout = document.getElementById('adminLogout');
    const adminBackToSite = document.getElementById('adminBackToSite');

    // Check if already logged in
    if (DataManager.get(CONFIG.keys.isLoggedIn)) {
        adminNavLi.style.display = 'block';
    }

    // Open admin panel from nav button
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showAdminPanel();
    });

    // Secret trigger: Triple click on footer
    const secretTrigger = document.querySelector('.footer-bottom');
    let secretClicks = 0;
    let secretTimer;

    secretTrigger.style.cursor = 'pointer'; // Optional hint
    secretTrigger.addEventListener('click', () => {
        secretClicks++;
        clearTimeout(secretTimer);
        if (secretClicks >= 3) {
            secretClicks = 0;
            if (!DataManager.get(CONFIG.keys.isLoggedIn)) {
                loginModal.classList.add('active');
                setTimeout(() => document.getElementById('loginUsername').focus(), 100);
            } else {
                showAdminPanel();
            }
        } else {
            secretTimer = setTimeout(() => secretClicks = 0, 500);
        }
    });

    // Hash trigger support (e.g. localhost:3000/#admin)
    window.addEventListener('hashchange', checkAdminHash);
    checkAdminHash(); // check on initial load

    function checkAdminHash() {
        if (window.location.hash === '#admin') {
            if (!DataManager.get(CONFIG.keys.isLoggedIn)) {
                loginModal.classList.add('active');
                setTimeout(() => document.getElementById('loginUsername').focus(), 100);
            } else {
                showAdminPanel();
            }
            // Remove hash so it's clean and trigger works again later
            history.replaceState(null, null, ' ');
        }
    }

    // Close login modal
    loginModalClose.addEventListener('click', () => {
        loginModal.classList.remove('active');
        loginError.style.display = 'none';
        loginForm.reset();
    });

    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            loginError.style.display = 'none';
            loginForm.reset();
        }
    });

    // Login form submit
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;

        // Check credentials from localStorage (or fallback to config defaults)
        const creds = DataManager.get(CONFIG.keys.credentials) || CONFIG.admin;

        if (username === creds.username && password === creds.password) {
            DataManager.set(CONFIG.keys.isLoggedIn, true);
            loginModal.classList.remove('active');
            loginForm.reset();
            loginError.style.display = 'none';
            adminNavLi.style.display = 'block';
            showToast('Login berhasil! Selamat datang, Admin.', 'success');
            showAdminPanel();
        } else {
            loginError.style.display = 'flex';
            document.getElementById('loginPassword').value = '';
        }
    });

    // Logout
    adminLogout.addEventListener('click', () => {
        DataManager.remove(CONFIG.keys.isLoggedIn);
        adminPanel.style.display = 'none';
        document.body.style.overflow = '';
        adminNavLi.style.display = 'none';
        showToast('Logout berhasil!', 'success');
    });

    // Back to site
    adminBackToSite.addEventListener('click', (e) => {
        e.preventDefault();
        adminPanel.style.display = 'none';
        document.body.style.overflow = '';
        // Re-render public content
        renderSlider();
        renderProducts();
        renderTestimoniCarousel();
        updateSocialLinks();
    });

    // Tab switching
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // Initialize admin sub-modules
    initAdminSlider();
    initAdminProducts();
    initAdminPortfolio();
    initAdminSettings();
    initAdminCredentials();
}

function showAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    adminPanel.style.display = 'block';
    document.body.style.overflow = 'hidden';
    renderAdminSliders();
    renderAdminProducts();
    renderAdminPortfolio();
    loadAdminSettings();
    loadAdminCredentials();
}

// ========== ADMIN: SLIDER MANAGEMENT ==========
function initAdminSlider() {
    const fileInput = document.getElementById('sliderFileInput');
    const uploadZone = document.getElementById('sliderUploadZone');
    const previewContainer = document.getElementById('sliderUploadPreview');
    const previewImg = document.getElementById('sliderPreviewImg');
    const saveBtn = document.getElementById('sliderSaveBtn');
    const cancelBtn = document.getElementById('sliderCancelBtn');

    let pendingImage = null;

    // Drag & drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('drag-over');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleSliderFile(file);
        }
    });

    // Click to upload zone
    uploadZone.addEventListener('click', (e) => {
        if (e.target.closest('.upload-btn') || e.target === fileInput) return;
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleSliderFile(file);
        fileInput.value = '';
    });

    async function handleSliderFile(file) {
        try {
            const base64 = await fileToBase64(file);
            const compressed = await compressImage(base64, 1200, 0.8);
            pendingImage = compressed;
            previewImg.src = compressed;
            uploadZone.style.display = 'none';
            previewContainer.style.display = 'block';
        } catch (err) {
            showToast(err.message || 'Gagal membaca file!', 'error');
        }
    }

    saveBtn.addEventListener('click', () => {
        if (!pendingImage) return;

        const sliders = DataManager.get(CONFIG.keys.sliders) || [];
        sliders.push({ id: generateId(), image: pendingImage });

        if (DataManager.set(CONFIG.keys.sliders, sliders)) {
            showToast('Slider berhasil ditambahkan!', 'success');
            renderAdminSliders();
            renderSlider();
            pendingImage = null;
            previewContainer.style.display = 'none';
            uploadZone.style.display = '';
        }
    });

    cancelBtn.addEventListener('click', () => {
        pendingImage = null;
        previewContainer.style.display = 'none';
        uploadZone.style.display = '';
    });
}

function renderAdminSliders() {
    const sliders = DataManager.get(CONFIG.keys.sliders) || [];
    const grid = document.getElementById('adminSliderGrid');

    if (sliders.length === 0) {
        grid.innerHTML = '<p style="color:var(--color-text-lighter);text-align:center;padding:2rem;grid-column:1/-1;">Belum ada slider.</p>';
        return;
    }

    grid.innerHTML = sliders.map(slide => `
        <div class="admin-grid-item">
            <img src="${slide.image}" alt="Slider">
            <button class="admin-grid-item-delete" onclick="deleteSlider('${slide.id}')" title="Hapus slider">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function deleteSlider(id) {
    if (!confirm('Yakin ingin menghapus slider ini?')) return;

    let sliders = DataManager.get(CONFIG.keys.sliders) || [];
    sliders = sliders.filter(s => String(s.id) !== String(id));
    DataManager.set(CONFIG.keys.sliders, sliders);
    renderAdminSliders();
    renderSlider();
    showToast('Slider berhasil dihapus!', 'success');
}

// ========== ADMIN: PRODUCT MANAGEMENT ==========
function initAdminProducts() {
    const form = document.getElementById('addProductForm');
    const fileInput = document.getElementById('productFileInput');
    const uploadZone = document.getElementById('productUploadZone');
    const previewContainer = document.getElementById('productUploadPreview');
    const previewImg = document.getElementById('productPreviewImg');

    let pendingImage = null;

    // Upload zone click
    uploadZone.addEventListener('click', (e) => {
        if (e.target.closest('.upload-btn') || e.target === fileInput) return;
        fileInput.click();
    });

    // Drag & drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('drag-over');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleProductFile(file);
        }
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleProductFile(file);
        fileInput.value = '';
    });

    async function handleProductFile(file) {
        try {
            const base64 = await fileToBase64(file);
            const compressed = await compressImage(base64, 600, 0.75);
            pendingImage = compressed;
            previewImg.src = compressed;
            uploadZone.style.display = 'none';
            previewContainer.style.display = 'block';
        } catch (err) {
            showToast(err.message || 'Gagal membaca file!', 'error');
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('productName').value.trim();
        const desc = document.getElementById('productDesc').value.trim();

        if (!name || !desc) {
            showToast('Mohon isi nama dan deskripsi produk!', 'error');
            return;
        }

        const products = DataManager.get(CONFIG.keys.products) || [];
        products.push({
            id: generateId(),
            name,
            description: desc,
            image: pendingImage || ''
        });

        if (DataManager.set(CONFIG.keys.products, products)) {
            showToast('Produk berhasil ditambahkan!', 'success');
            form.reset();
            pendingImage = null;
            previewContainer.style.display = 'none';
            uploadZone.style.display = '';
            renderAdminProducts();
            renderProducts();
        }
    });
}

function renderAdminProducts() {
    const products = DataManager.get(CONFIG.keys.products) || [];
    const grid = document.getElementById('adminProdukGrid');

    if (products.length === 0) {
        grid.innerHTML = '<p style="color:var(--color-text-lighter);text-align:center;padding:2rem;grid-column:1/-1;">Belum ada produk.</p>';
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="admin-grid-item">
            ${product.image
            ? `<img src="${product.image}" alt="${escapeHtml(product.name)}">`
            : `<div style="width:100%;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;background:#f3f4f6;color:#9ca3af;"><i class="fas fa-camera" style="font-size:1.5rem;"></i></div>`
        }
            <div class="admin-grid-item-info">
                <h4>${escapeHtml(product.name)}</h4>
                <p>${escapeHtml(product.description)}</p>
            </div>
            <button class="admin-grid-item-delete" onclick="deleteProduct('${product.id}')" title="Hapus produk">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function deleteProduct(id) {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;

    let products = DataManager.get(CONFIG.keys.products) || [];
    products = products.filter(p => String(p.id) !== String(id));
    DataManager.set(CONFIG.keys.products, products);
    renderAdminProducts();
    renderProducts();
    showToast('Produk berhasil dihapus!', 'success');
}

// ========== ADMIN: PORTFOLIO MANAGEMENT ==========
function initAdminPortfolio() {
    const fileInput = document.getElementById('portfolioFileInput');
    const uploadZone = document.getElementById('portfolioUploadZone');
    const previewContainer = document.getElementById('portfolioUploadPreview');
    const saveBtn = document.getElementById('portfolioSaveBtn');

    let pendingImages = [];

    // Upload zone click
    uploadZone.addEventListener('click', (e) => {
        if (e.target.closest('.upload-btn') || e.target === fileInput) return;
        fileInput.click();
    });

    // Drag & drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('drag-over');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
        if (files.length > 0) handlePortfolioFiles(files);
    });

    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) handlePortfolioFiles(files);
        fileInput.value = '';
    });

    async function handlePortfolioFiles(files) {
        pendingImages = [];
        previewContainer.innerHTML = '';

        for (const file of files) {
            try {
                const base64 = await fileToBase64(file);
                const compressed = await compressImage(base64, 600, 0.75);
                pendingImages.push(compressed);

                const img = document.createElement('img');
                img.src = compressed;
                previewContainer.appendChild(img);
            } catch (err) {
                showToast(`Gagal memproses file: ${file.name}`, 'error');
            }
        }

        if (pendingImages.length > 0) {
            previewContainer.style.display = 'flex';
            saveBtn.style.display = '';
        }
    }

    saveBtn.addEventListener('click', () => {
        if (pendingImages.length === 0) return;

        const portfolio = DataManager.get(CONFIG.keys.portfolio) || [];

        pendingImages.forEach(img => {
            portfolio.push({ id: generateId(), image: img });
        });

        if (DataManager.set(CONFIG.keys.portfolio, portfolio)) {
            showToast(`${pendingImages.length} foto berhasil ditambahkan!`, 'success');
            pendingImages = [];
            previewContainer.style.display = 'none';
            previewContainer.innerHTML = '';
            saveBtn.style.display = 'none';
            renderAdminPortfolio();
            renderTestimoniCarousel();
        }
    });
}

function renderAdminPortfolio() {
    const portfolio = DataManager.get(CONFIG.keys.portfolio) || [];
    const grid = document.getElementById('adminPortfolioGrid');

    if (portfolio.length === 0) {
        grid.innerHTML = '<p style="color:var(--color-text-lighter);text-align:center;padding:2rem;grid-column:1/-1;">Belum ada foto portofolio.</p>';
        return;
    }

    grid.innerHTML = portfolio.map(item => `
        <div class="admin-grid-item">
            <img src="${item.image}" alt="Portofolio" style="cursor:pointer;" onclick="openLightbox('${item.image}')">
            <button class="admin-grid-item-delete" onclick="deletePortfolio('${item.id}')" title="Hapus foto">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function deletePortfolio(id) {
    if (!confirm('Yakin ingin menghapus foto ini?')) return;

    let portfolio = DataManager.get(CONFIG.keys.portfolio) || [];
    portfolio = portfolio.filter(p => String(p.id) !== String(id));
    DataManager.set(CONFIG.keys.portfolio, portfolio);
    renderAdminPortfolio();
    renderTestimoniCarousel();
    showToast('Foto berhasil dihapus!', 'success');
}

// ========== ADMIN: SETTINGS ==========
function initAdminSettings() {
    const form = document.getElementById('settingsForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const whatsapp = document.getElementById('settingsWhatsApp').value.trim();
        const tiktok = document.getElementById('settingsTikTok').value.trim();
        const instagram = document.getElementById('settingsInstagram').value.trim();

        if (!whatsapp) {
            showToast('Nomor WhatsApp wajib diisi!', 'error');
            return;
        }

        const settings = {
            whatsapp,
            tiktok: tiktok || CONFIG.defaultTikTok,
            instagram: instagram || CONFIG.defaultInstagram
        };

        if (DataManager.set(CONFIG.keys.settings, settings)) {
            showToast('Pengaturan berhasil disimpan!', 'success');
            updateSocialLinks();
        }
    });
}

function loadAdminSettings() {
    const settings = DataManager.get(CONFIG.keys.settings) || {};
    document.getElementById('settingsWhatsApp').value = settings.whatsapp || CONFIG.defaultWhatsApp;
    document.getElementById('settingsTikTok').value = settings.tiktok || CONFIG.defaultTikTok;
    document.getElementById('settingsInstagram').value = settings.instagram || CONFIG.defaultInstagram;
}

// ========== ADMIN: CREDENTIALS ==========
function initAdminCredentials() {
    const form = document.getElementById('credentialsForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const currentPass = document.getElementById('credCurrentPassword').value;
        const newUsername = document.getElementById('credNewUsername').value.trim();
        const newPassword = document.getElementById('credNewPassword').value;
        const confirmPassword = document.getElementById('credConfirmPassword').value;

        // Verify current password
        const creds = DataManager.get(CONFIG.keys.credentials) || CONFIG.admin;
        if (currentPass !== creds.password) {
            showToast('Password saat ini salah!', 'error');
            return;
        }

        if (!newUsername) {
            showToast('Username baru wajib diisi!', 'error');
            return;
        }

        if (newPassword && newPassword.length < 4) {
            showToast('Password baru minimal 4 karakter!', 'error');
            return;
        }

        if (newPassword && newPassword !== confirmPassword) {
            showToast('Konfirmasi password tidak cocok!', 'error');
            return;
        }

        const updatedCreds = {
            username: newUsername,
            password: newPassword || creds.password
        };

        if (DataManager.set(CONFIG.keys.credentials, updatedCreds)) {
            showToast('Kredensial berhasil diperbarui!', 'success');
            form.reset();
            // Reload the current username display
            loadAdminCredentials();
        }
    });
}

function loadAdminCredentials() {
    const creds = DataManager.get(CONFIG.keys.credentials) || CONFIG.admin;
    document.getElementById('credNewUsername').value = creds.username;
    document.getElementById('credCurrentPassword').value = '';
    document.getElementById('credNewPassword').value = '';
    document.getElementById('credConfirmPassword').value = '';
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initialize default data
    DataManager.initDefaults();

    // Initialize components
    initNavbar();
    initSlider();
    renderProducts();
    renderTestimoniCarousel();
    initLightbox();
    initPackageModal();
    initContactForm();
    initScrollAnimations();
    initAdmin();

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Close modals on Escape
        if (e.key === 'Escape') {
            document.getElementById('loginModal').classList.remove('active');
            document.getElementById('lightbox').classList.remove('active');
            document.getElementById('packageModal')?.classList.remove('active');
        }
    });
});

function initPackageModal() {
    const modal = document.getElementById('packageModal');
    const closeBtn = document.getElementById('packageModalClose');

    if (!modal || !closeBtn) return;

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}
