@extends('adminDashboard.layout')
@section('title', 'Create Category Page');
@section('content')
    <main class="main-content-wrapper w-100 p-4 p-md-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fs-2 fw-semibold text-light mb-0">Product Create Page</h2>
            {{-- Back Button --}}
            <a href="{{ route('product.index') }}" class="btn btn-secondary">
                <i class="fas fa-arrow-left me-2"></i> Back to List
            </a>
        </div>
        <div class="row mb-4">
            <div class="col-md-10 col-lg-8 mx-auto">
                <div class="card bg-card border-color shadow-lg">
                    <div class="card-body p-4 p-md-5">
                        <h3 class="mb-4 text-light">Create product</h3>
                        <form action="{{route('product.store')}}" class="row g-3" method="POST"
                            enctype="multipart/form-data">
                            @csrf
                            <div class="col-12">
                                <label for="productName" class="form-label">Product Name</label>
                                <input type="text" name="name"
                                    class="form-control @error('name') is-invalid @enderror" id="productName"
                                    value="{{ old('name') }}" placeholder="Enter product name.">
                                @error('name')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Category</label>
                                <select class="form-select @error('name') is-invalid @enderror" name="category_id">
                                    <option value="">Category</option>
                                    @foreach ($categories as $category)
                                        <option value="{{$category->id}}">{{$category->name}}</option>
                                    @endforeach
                                </select>
                                 @error('name')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Brand</label>
                                <select class="form-select @error('name') is-invalid @enderror" name="brand_id">
                                    <option value="">Brand</option>
                                    @foreach ($brands as $brand)
                                        <option value="{{$brand->id}}">{{$brand->name}}</option>
                                    @endforeach
                                </select>
                                 @error('name')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-md-6">
                                <label for="price" class="form-label">Price</label>
                                <input type="number" name="price"
                                    class="form-control @error('price') is-invalid @enderror" id="price"
                                    value="{{ old('price') }}" placeholder="Price.">
                                @error('price')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-md-6">
                                <label for="stock" class="form-label">Stock</label>
                                <input type="number" name="stock"
                                    class="form-control @error('stock') is-invalid @enderror" id="stock"
                                    value="{{ old('stock') }}" placeholder="Stock.">
                                @error('stock')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-12">
                                <label for="productImage" class="form-label">Product Image</label>
                                <input type="file" name="image"
                                    class="form-control @error('image') is-invalid @enderror" id="productImage">
                                @error('image')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-12">
                                <label for="description" class="form-label">Category Description</label>
                                <textarea name="description" class="form-control @error('description') is-invalid @enderror" id="description"
                                    rows="3" placeholder="Enter category description.">{{ old('description') }}</textarea>
                                @error('description')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-12 mt-4">
                                <button type="submit" class="btn btn-primary">create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <footer class="w-100 bg-card border-top border-secondary p-3 text-center small text-light mt-5">
            <p class="mb-0">Copyright &copy; <span id="currentYear"></span> Administrative.
                All rights are reserved</p>
        </footer>
    </main>
@endsection
