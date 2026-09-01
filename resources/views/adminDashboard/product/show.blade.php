@extends('adminDashboard.layout')
@section('title', 'Product Detail Page')
@section('content')
    <main class="main-content-wrapper w-100 p-4 p-md-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fs-2 fw-semibold text-light mb-0">Product Detail Page</h2>
            {{-- Back Button --}}
            <a href="{{ route('product.index') }}" class="btn btn-secondary">
                <i class="fas fa-arrow-left me-2"></i> Back to List
            </a>
        </div>
        <div class="card bg-card border-color shadow-lg p-3 p-md-5">
            <div class="row g-5">
                <div class="col-lg-6">
                    <img src="{{ asset('storage/product/' . $data->image) }}" class="img-fluid rounded-3 mb-3"
                        alt="Product Image">
                </div>

                <div class="col-lg-6 d-flex flex-column text-light">
                    <p class="text-primary mb-2">{{ $data->brand->name }}</p>
                    <h2 class="fs-3 fw-semibold text-light mb-2">{{ $data->name }}</h2>
                    <p class="fs-5 text-primary mb-2">{{ $data->category->name }}
                        @if ($data->stock > 0)
                            <span class="badge text-bg-success mb-2">In Stock</span>
                        @else
                            <span class="badge text-bg-danger mb-2">In Stock</span>
                        @endif
                    </p>
                    <p class="text-muted-light mb-3">{{ $data->description }}</p>
                    <p class="fs-5 fw-bold mb-2" style="color: var(--primary-color);">{{$data->price}} Ks</p>
                </div>
            </div>
        </div>

        <footer class="w-100 bg-card border-top border-secondary p-3 text-center small text-light mt-5">
            <p class="mb-0">Copyright &copy; <span id="currentYear"></span> Administrative.
                All rights are reserved</p>
        </footer>
    </main>
@endsection
