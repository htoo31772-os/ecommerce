document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mainContent = document.querySelector('.main-content-wrapper');
    const currentYear = document.getElementById('currentYear');

    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();

    // Function to toggle sidebar visibility (used for mobile)
    const toggleSidebar = () => {
        sidebar.classList.toggle('hide-mobile');
    };

    // Event listener for the mobile toggle button
    sidebarToggle.addEventListener('click', toggleSidebar);

    // Close sidebar when a link is clicked on mobile (to hide the sidebar after navigation)
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
            // Check if it's currently a mobile view
            if (window.innerWidth < 768) {
                // Use a short timeout to allow the navigation to happen first, then close
                setTimeout(() => {
                    sidebar.classList.add('hide-mobile');
                }, 100);
            }
        });
    });

    // Initial check and resize handler for responsiveness
    const checkInitialWidth = () => {
        if (window.innerWidth < 768) {
            // On mobile, ensure sidebar is hidden and content takes full width
            sidebar.classList.add('hide-mobile');
            mainContent.style.marginLeft = '0';
        } else {
            // On desktop, ensure sidebar is visible and content is offset
            sidebar.classList.remove('hide-mobile');
            mainContent.style.marginLeft = '280px';
        }
    };

    window.addEventListener('resize', checkInitialWidth);
    checkInitialWidth();
});
