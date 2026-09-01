@extends('adminDashboard.layout')
@section('title', 'Category List Page')
@section('content')
    <main class="main-content-wrapper w-100 p-4 p-md-5">
        <h2 class="fs-2 fw-semibold mb-4 text-light">Category List Page</h2>

        <div class="row mb-4">
            <div class="col-12">
                <div class="card bg-card p-4 rounded-4 shadow-lg border border-secondary">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                            <h3 class="fs-5 fw-semibold  border-secondary text-light">product List -
                                ({{ $products->count() }})
                            </h3>
                            <a href="{{ route('product.create') }}" class="btn btn-outline-success"><i
                                    class="bi bi-plus-lg fs-5 fw-semibold text-light"></i></a>
                        </div>
                        <div class="table">
                            @if ($products->count() > 0)
                                <table class="table align-middle" style="min-width: 600px;">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    @foreach ($products as $product)
                                        <tbody>
                                            <tr>
                                                <td class="text-light">
                                                    {{ $product->id }}
                                                </td>
                                                <td style="width: 100px;">
                                                    <img src="{{ asset('storage/product/' . $product->image) }}"
                                                        class="img-fluid rounded-3" alt="Product">
                                                </td>
                                                <td class="text-light">{{ $product->name }}</td>
                                                <td class="text-light">{{ $product->price }} Ks</td>
                                                <td>
                                                    <div class="d-flex">
                                                        <a href="{{route('product.show',$product->id)}}" class="btn btn-outline-success btn-sm"
                                                            title="Detail">
                                                            <i class="bi bi-view-list"></i>
                                                        </a>
                                                        <a href="{{ route('product.edit', $product->id) }}"
                                                            class="btn btn-outline-primary btn-sm" title="Edit">
                                                            <i class="bi bi-gear-fill"></i>
                                                        </a>
                                                        <form action="{{ route('product.destroy', $product->id) }}"
                                                            method="post">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button type="submit" class="btn btn-outline-danger btn-sm"
                                                                title="Remove"><i class="bi bi-trash-fill"></i></button>
                                                        </form>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    @endforeach
                                </table>
                            @else
                                <!-- Table or detailed chart would go here -->
                                <p class="text-danger py-5 text-center">There is no category data!.</p>
                            @endif
                        </div>
                        {{$products->links()}}
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
