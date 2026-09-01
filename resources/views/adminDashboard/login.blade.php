<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {{-- Title & Logo --}}
    <title>Login Page</title>
    <link rel="shortcut icon" href="{{asset('digitally/admin/images/logo.png')}}" type="image/x-icon">
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

<body>
    <!-- Main Login Section -->
    <main class="section-padding">
        <div class="container">
            <div class="row justify-content-center">
                <!-- Per request: col-md-8 col-lg-6, but applying to a card for better structure -->
                <div class="col-md-10 col-lg-8">
                    <div class="card bg-card border-color shadow-lg overflow-hidden">
                        <div class="row g-0">
                            <!-- Column 1: Graphic (Hidden on small) -->
                            <div class="col-lg-6 d-none d-lg-flex align-items-center justify-content-center" style="background-color: var(--secondary-color);">
                                <!-- Simple SVG Placeholder -->
                              <img src="{{asset('digitally/admin/images/login.jpg')}}" class="img img-fluid" alt="Login Page">
                            </div>

                            <!-- Column 2: Login Form -->
                            <div class="col-lg-6">
                                <div class="card-body p-4 p-md-5">
                                    <h2 class="text-center text-light mb-4">Log in to your account</h2>
                                    <form action="{{route('admin.login')}}" method="POST">
                                        @csrf
                                        <div class="form-floating mb-3">
                                            <input type="email" name="email" class="form-control @error('email') is-invalid @enderror" id="floatingEmail" placeholder="name@example.com" required>
                                            <label for="floatingEmail">E-mail</label>
                                            @error('email')
                                                <div class="text-danger">{{$message}}</div>
                                            @enderror
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="password" name="password" class="form-control @error('password') is-invalid @enderror" id="floatingPassword" placeholder="Password" required>
                                            <label for="floatingPassword">Password</label>
                                            @error('password')
                                                <div class="text-danger">{{$message}}</div>
                                            @enderror
                                        </div>

                                        <button class="btn btn-primary w-100 py-3" type="submit">Log in</button>
                                    </form>

                                    <p class="text-center text-light mt-4 mb-0">
                                        Don't have an account yet? <a href="{{route('admin.showRegister')}}" style="color: var(--primary-color);">Create a new account</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</body>
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
</html>
