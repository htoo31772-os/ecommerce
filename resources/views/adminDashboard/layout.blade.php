<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        xintegrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <!-- Load Font Awesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    {{-- Toastify CSS Link --}}
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    {{-- Main CSS Link --}}
    <link rel="stylesheet" href="{{ asset('digitally/admin/css/style.css') }}">
</head>

<body class="d-flex flex-column vh-100">

    <!-- 1. Navbar (Fixed Top) - Using custom bg-card for color -->
    <nav class="navbar navbar-expand-md navbar-dark bg-card fixed-top shadow-lg border-bottom border-secondary"
        style="height: 64px; z-index: 1050;">
        <div class="container-fluid">
            <!-- Mobile Sidebar Toggle Button (Only visible on small screens) -->
            <button class="btn btn-outline-light d-md-none me-3" type="button" id="sidebarToggle"
                aria-label="Toggle navigation" style="border-color: var(--primary-color); color: var(--primary-color);">
                <i class="fas fa-bars"></i>
            </button>

            <!-- Logo/Dashboard Name -->
            <a class="navbar-brand text-primary fw-bold fs-4" href="#">
                <i class="fas fa-cubes me-2"></i> Digitally
            </a>

            <!-- Account Section (Dropdown using Bootstrap component) -->
            <div class="dropdown ms-auto">
                <button class="btn btn-dark rounded-pill border-0 d-flex align-items-center p-2" type="button"
                    data-bs-toggle="dropdown" aria-expanded="false" id="accountMenuButton"
                    style="background-color: var(--bg-card); color: var(--text-light);">
                    <span class="d-none d-sm-inline me-2 text-white-50">Account</span>
                    <img src="{{asset('digitally/admin/images/user.jpg')}}" alt="Admin Profile"
                        class="rounded-circle border border-primary" style="width: 32px; height: 32px;">
                </button>

                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end bg-card shadow-lg border border-secondary"
                    aria-labelledby="accountMenuButton">
                    <li><a class="dropdown-item text-light" href="{{route('admin.profile')}}"><i class="fas fa-user-circle me-2"></i>
                            Profile</a></li>
                    <li>
                        <hr class="dropdown-divider border-secondary">
                    </li>
                    <li>
                        <form action="{{route('admin.logout')}}" method="post">
                            @csrf
                            <a class="dropdown-item text-danger" href="#"><i class="fas fa-sign-out-alt me-2"></i>
                            <input type="submit" class="btn text-danger" value="Exist"></a>
                        </form>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Wrapper (Sidebar + Content) -->
    <div class="d-flex flex-grow-1 mt-5">

        <!-- 2. Sidebar (Fixed Left) -->
        <aside id="sidebar" class="sidebar hide-mobile d-flex flex-column d-md-block">


            <nav class="nav flex-column flex-grow-1 p-2">
                <!-- Dashboard (Home Page) -->
                <a href="{{route('admin.dashboard')}}"
                    class="sidebar-link active rounded-3 mb-1 p-3 d-flex align-items-center text-decoration-none">
                    <i class="fas fa-tachometer-alt me-3" style="width: 20px;"></i>
                    Dashboard
                </a>

                <p class="text-light text-uppercase small px-3 pt-3 mb-1">Management</p>

                <!-- Other Items -->
                <a href="{{route('category.index')}}"
                    class="sidebar-link rounded-3 mb-1 p-3 d-flex align-items-center text-decoration-none">
                    <i class="fas fa-tags me-3" style="width: 20px;"></i>
                    Categories
                </a>
                <a href="{{route('brand.index')}}"
                    class="sidebar-link rounded-3 mb-1 p-3 d-flex align-items-center text-decoration-none">
                    <i class="fas fa-copyright me-3" style="width: 20px;"></i>
                    Brands
                </a>
                <a href="{{route('product.index')}}"
                    class="sidebar-link rounded-3 mb-1 p-3 d-flex align-items-center text-decoration-none">
                    <i class="fas fa-box-open me-3" style="width: 20px;"></i>
                    Products
                </a>

                <p class="text-light text-uppercase small px-3 pt-3 mb-1">Sales</p>

                <a href="{{route('order.index')}}"
                    class="sidebar-link rounded-3 mb-1 p-3 d-flex align-items-center text-decoration-none">
                    <i class="fas fa-shopping-cart me-3" style="width: 20px;"></i>
                    Orders
                </a>
                <a href="#"
                    class="sidebar-link rounded-3 mb-1 p-3 d-flex align-items-center text-decoration-none">
                    <i class="fas fa-star me-3" style="width: 20px;"></i>
                    Reviews
                </a>

                <p class="text-light text-uppercase small px-3 pt-3 mb-1">User</p>

                <a href="{{route('user.userList')}}"
                    class="sidebar-link rounded-3 mb-1 p-3 d-flex align-items-center text-decoration-none">
                    <i class="fas fa-users me-3" style="width: 20px;"></i>
                    User Account
                </a>
            </nav>
        </aside>

        <!-- Main Content Area -->
        @yield('content')
    </div>



    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        xintegrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">
    </script>
    {{-- Toastify JS Linke --}}
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
    @if (session('success'))
        <script>
            Toastify({
                text: "{{ session('success') }}",
                gravity: "top",
                position: "center",
                style: {
                    background: "green",
                }
            }).showToast();
        </script>
    @endif
    @if (session('error'))
        <script>
            Toastify({
                text: "{{ session('error') }}",
                gravity: "top",
                position: "center",
                style: {
                    background: "red",
                }
            }).showToast();
        </script>
    @endif
    <!-- Custom JavaScript for Sidebar Toggle -->
    <script>
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
    </script>
</body>

</html>
