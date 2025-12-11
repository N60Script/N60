<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>البحث عن السكربتات</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Particles Background -->
    <div class="particles" id="particles"></div>

    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="#" onclick="showSection('search', event)">الرئيسية</a>
        </div>
    </nav>

    <!-- Mobile Menu Toggle -->
    <div class="menu-toggle" id="menuToggle">
        <span></span>
        <span></span>
        <span></span>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobileMenu">
        <ul class="mobile-menu-items">
            <li><a href="#" onclick="showSection('search', event)">الرئيسية</a></li>
        </ul>
    </div>

    <!-- Menu Overlay -->
    <div class="menu-overlay" id="menuOverlay"></div>

    <!-- Main Content -->
    <div class="content">
        <!-- Search Section -->
        <section id="searchSection" class="search-section" style="display: block;">
            <h1 class="ios-title">البحث عن السكربتات</h1>
            
            <div class="section-text">
                <i class="fas fa-star"></i> اكتشف آلاف السكربتات المجانية لألعاب Roblox المفضلة لديك
            </div>

            <!-- Search Form -->
            <form class="search-form" id="searchForm">
                <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="ابحث عن سكربت..." 
                    class="search-input"
                >
                <button type="submit" class="search-btn">
                    <i class="fas fa-search"></i> بحث
                </button>
            </form>

            <!-- Loading State -->
            <div class="loading" id="loading" style="display: none;">
                <div class="spinner"></div>
                <p>جاري البحث...</p>
            </div>

            <!-- Scripts Grid -->
            <div class="app-grid" id="scriptsGrid">
                <!-- Scripts will be loaded here -->
            </div>

            <!-- Empty State -->
            <div class="empty-state" id="emptyState" style="display: block;">
                <div class="empty-icon">🔍</div>
                <p>ابدأ البحث لاكتشاف السكربتات</p>
            </div>

            <!-- No Results -->
            <div class="no-results" id="noResults" style="display: none;">
                <p>لم يتم العثور على نتائج</p>
            </div>

            <!-- Pagination -->
            <div class="pagination" id="pagination" style="display: none;">
                <button class="pagination-btn" id="prevBtn" type="button">
                    <i class="fas fa-chevron-right"></i> السابق
                </button>
                <span class="pagination-info" id="pageInfo"></span>
                <button class="pagination-btn" id="nextBtn" type="button">
                    التالي <i class="fas fa-chevron-left"></i>
                </button>
            </div>
        </section>
    </div>

    <!-- Script Modal -->
    <div class="modal" id="scriptModal">
        <div class="modal-content">
            <button class="modal-close" id="closeModal" type="button">✕</button>
            <h2 id="modalTitle"></h2>
            <div class="modal-body">
                <p id="modalGame"></p>
                <div class="script-code">
                    <pre><code id="scriptCode"></code></pre>
                </div>
                <button class="copy-btn" id="copyBtn" type="button">
                    <i class="fas fa-copy"></i> نسخ السكربت
                </button>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer>
        <div class="footer-text">
            <p>جميع الحقوق محفوظة لسيرفر الديسكورد gg/N60 , by dryfd</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
