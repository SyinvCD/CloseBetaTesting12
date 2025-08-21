document.addEventListener('DOMContentLoaded', function () {

    // --- FUNGSI BERSAMA ---

    function setupHeaderScroll(headerElement) {
        if (!headerElement) return;
        let lastScrollTop = 0;
        window.addEventListener("scroll", () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > headerElement.offsetHeight) {
                headerElement.classList.add('header-hidden');
            } else {
                headerElement.classList.remove('header-hidden');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
    }

    function setupMenuLogic(menuToggle, mobileMenu) {
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.toggle('hidden');
            });
        }
        document.addEventListener('click', (event) => {
            if (mobileMenu && !mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // --- ELEMEN DOM HALAMAN BLOG ---
    const pageHeader = document.getElementById('page-header');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const postsGridContainer = document.getElementById('blog-posts-grid');

    const allPosts = [
        { id: 'post-1', title: 'Mendesain UI Aplikasi Mobile', imageUrl: 'https://placehold.co/400x400/7c3aed/ffffff?text=UI/UX', url: '#' },
        { id: 'post-2', title: 'Fotografi Alam Liar', imageUrl: 'https://placehold.co/400x400/16a34a/ffffff?text=Photo', url: '#' },
        { id: 'post-3', title: 'Proyek Terbaru: Website Toko Online', imageUrl: 'https://placehold.co/400x400/db2777/ffffff?text=Web', url: '#' },
        { id: 'post-4', title: 'Media sosial dan saweria', imageUrl: 'images/Untitled.png', url: '#' },
    ];

    // --- FUNGSI SPESIFIK HALAMAN BLOG ---

    function setupDynamicHeaderImage() {
        if (!pageHeader) return;
        const timeBasedImages = {
            pagi: 'images/foto atas.jpg',
            siang: 'images/fottt atas.jpg',
            sore: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop',
            malam: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=2070&auto=format&fit=crop'
        };
        const currentHour = new Date().getHours();
        let imageUrl;
        if (currentHour >= 5 && currentHour <= 10) imageUrl = timeBasedImages.pagi;
        else if (currentHour >= 11 && currentHour <= 14) imageUrl = timeBasedImages.siang;
        else if (currentHour >= 15 && currentHour <= 17) imageUrl = timeBasedImages.sore;
        else imageUrl = timeBasedImages.malam;
        pageHeader.style.backgroundImage = `url('${imageUrl}')`;
    }

    function renderPosts(posts) {
        if (!postsGridContainer) return;
        postsGridContainer.innerHTML = '';
        posts.forEach(post => {
            const postCard = document.createElement('a');
            postCard.href = post.url;
            postCard.className = 'group block bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition-shadow';
            postCard.innerHTML = `
                <div class="relative">
                    <img src="${post.imageUrl}" alt="${post.title}" class="w-full h-32 object-cover">
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                </div>
                <div class="p-3">
                    <h3 class="font-semibold text-gray-800 text-sm">${post.title}</h3>
                </div>
            `;
            postsGridContainer.appendChild(postCard);
        });
    }

    
    // --- INISIALISASI ---
    setupMenuLogic(menuToggle, mobileMenu);
    setupHeaderScroll(pageHeader);
    setupDynamicHeaderImage();
    renderPosts(allPosts);
});
