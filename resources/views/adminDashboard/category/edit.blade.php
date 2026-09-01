@extends('adminDashboard.layout')
@section('title', 'Category Edit Page')
@section('content')
    <main class="main-content-wrapper w-100 p-4 p-md-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fs-2 fw-semibold text-light mb-0">Category Edit Page</h2>
            {{-- Back Button --}}
            <a href="{{ route('category.index') }}" class="btn btn-secondary">
                <i class="fas fa-arrow-left me-2"></i> Back to List
            </a>
        </div>

        <div class="row mb-4">
            <div class="col-lg-4 offset-lg-1">
                <div class="card bg-card border-color shadow-lg text-center">
                    <div class="card-body p-4">
                        <img src="{{ asset('storage/category/' . $data->image) }}"
                            class="img-fluid rounded-circle mx-auto d-block mb-2" alt="Category Image"
                            style="border: 4px solid var(--primary-color);">
                    </div>
                </div>
            </div>
            <div class="col-lg-6 mx-auto">
                <div class="card bg-card border-color shadow-lg">
                    <div class="card-body p-4 p-md-5">
                        <h3 class="mb-4 text-light">Edit category</h3>
                        <form action="{{route('category.update',$data->id)}}" class="row g-3" method="POST" enctype="multipart/form-data">
                            @csrf
                            @method('PUT')
                            <div class="col-12">
                                <label for="categoryImage" class="form-label">Category Image</label>
                                <input type="file" name="image"
                                    class="form-control @error('image') is-invalid @enderror"" id="categoryImage">
                                @error('image')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-12">
                                <label for="categoryName" class="form-label">Category Name</label>
                                <input type="text" name="name"
                                    class="form-control @error('name') is-invalid @enderror" id="categoryName"
                                    value="{{ old('name', $data->name) }}" placeholder="Enter category name.">
                                @error('name')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-12">
                                <label for="description" class="form-label">Category Description</label>
                                <textarea name="description" class="form-control @error('description') is-invalid @enderror" id="description"
                                    rows="3" placeholder="Enter category description.">{{ old('description', $data->description) }}</textarea>
                                @error('description')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-12 mt-4">
                                <button type="submit" class="btn btn-primary">update</button>
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
