document.addEventListener('DOMContentLoaded', () => {
    initThemeAndRTL();
    initStickyNavbar();
    initMobileNav();
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

function initThemeAndRTL() {
    const themeToggles = document.querySelectorAll('.theme-toggle, #theme-toggle');
    const rtlToggles = document.querySelectorAll('.rtl-toggle, #rtl-toggle');
    
    // Set initial toggle icons/labels
    updateToggleButtons();

    themeToggles.forEach(themeToggle => {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleButtons();
            
            // Re-render lucide icons to update names if needed
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            
            // Emit custom event for charts to update
            window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
        });
    });

    rtlToggles.forEach(rtlToggle => {
        rtlToggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            
            document.documentElement.setAttribute('dir', newDir);
            document.documentElement.setAttribute('lang', newDir === 'rtl' ? 'ar' : 'en');
            localStorage.setItem('dir', newDir);
            
            // Swap Bootstrap CSS
            const bootstrapLink = document.getElementById('bootstrap-link');
            if (bootstrapLink) {
                bootstrapLink.href = newDir === 'rtl' 
                    ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css' 
                    : 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
            }
            
            updateToggleButtons();
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });
}

function updateToggleButtons() {
    const themeToggles = document.querySelectorAll('.theme-toggle, #theme-toggle');
    const rtlToggles = document.querySelectorAll('.rtl-toggle, #rtl-toggle');
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    const dir = document.documentElement.getAttribute('dir') || 'ltr';

    themeToggles.forEach(themeToggle => {
        if (theme === 'dark') {
            themeToggle.innerHTML = '<i data-lucide="sun" class="icon-size"></i>';
            themeToggle.setAttribute('title', dir === 'rtl' ? 'الوضع المضيء' : 'Switch to Light Mode');
        } else {
            themeToggle.innerHTML = '<i data-lucide="moon" class="icon-size"></i>';
            themeToggle.setAttribute('title', dir === 'rtl' ? 'الوضع المظلم' : 'Switch to Dark Mode');
        }
    });

    rtlToggles.forEach(rtlToggle => {
        rtlToggle.innerHTML = '<i data-lucide="arrow-left-right" class="icon-size"></i>';
        if (dir === 'rtl') {
            rtlToggle.setAttribute('title', 'Switch to LTR (English)');
        } else {
            rtlToggle.setAttribute('title', 'التحويل للعربية (RTL)');
        }
    });
}

function initStickyNavbar() {
    const navbar = document.querySelector('.sticky-navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

function initMobileNav() {
    // Mobile Drawer navigation toggle for Dashboard sidebar
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });
    }

    // Sidebar collapse toggler (for desktop)
    const collapseToggle = document.getElementById('sidebar-collapse-toggle');
    if (collapseToggle && sidebar) {
        collapseToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            
            // Adjust toggle icon arrow orientation
            const icon = collapseToggle.querySelector('i');
            if (icon) {
                const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
                const isCollapsed = sidebar.classList.contains('collapsed');
                if (isCollapsed) {
                    icon.setAttribute('data-lucide', currentDir === 'rtl' ? 'chevron-left' : 'chevron-right');
                } else {
                    icon.setAttribute('data-lucide', currentDir === 'rtl' ? 'chevron-right' : 'chevron-left');
                }
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });
    }
}
