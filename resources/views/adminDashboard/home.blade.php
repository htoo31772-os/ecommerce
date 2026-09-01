@extends('adminDashboard.layout')
@section('content')
    <main class="main-content-wrapper w-100 p-4 p-md-5">

        <h2 class="fs-2 fw-semibold mb-4 text-light">Dashboard Summary</h2>

        <!-- Sample Card Layout - Using Bootstrap Grid -->
        <div class="row g-4 mb-4">
            <!-- Card 1 -->
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card bg-card shadow border-0 rounded-4"
                    style="border-left: 4px solid var(--primary-color) !important;">
                    <div class="card-body">
                        <h3 class="card-text text-light fw-bold mb-3">Total Orders</h3>
                        <h5 class="card-title fw-bold text-light mb-0"><i class="fas fa-shopping-cart me-4"
                                style="width: 20px;"></i>{{ $order }}</h5>
                    </div>
                </div>
            </div>
            <!-- Card 2 -->
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card bg-card shadow border-0 rounded-4" style="border-left: 4px solid #f6e05e !important;">
                    <div class="card-body">
                        <h3 class="card-text text-light fw-bold mb-3">Income</h3>
                        <h5 class="card-title fw-bold text-light mb-0"><i class="fa-solid fa-sack-dollar me-4"
                                style="width: 20px;"></i>{{ $income }} <span style="color:#f6e05e;">Ks</span></h5>
                    </div>
                </div>
            </div>
            <!-- Card 3 -->
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card bg-card shadow border-0 rounded-4" style="border-left: 4px solid #48bb78 !important;">
                    <div class="card-body">
                        <h3 class="card-text text-light fw-bold mb-3">Products</h3>
                        <h5 class="card-title fw-bold text-light mb-0"><i class="fas fa-box-open me-4"
                                style="width: 20px;"></i>{{ $product }}</h5>

                    </div>
                </div>
            </div>
            <!-- Card 4 -->
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card bg-card shadow border-0 rounded-4" style="border-left: 4px solid #9f7aea !important;">
                    <div class="card-body">
                        <h3 class="card-text text-light fw-bold mb-3">Users</h3>
                        <h5 class="card-title fw-bold text-light mb-0"><i class="fas fa-users me-4"
                                style="width: 20px;"></i>{{ $user }}</h5>
                    </div>
                </div>
            </div>
        </div>

        <!-- Placeholder for detailed content -->
        <div class="row mb-4">
            <div class="col-8">
                {{-- Recent Order --}}
                <div class="card bg-card p-4 rounded-4 shadow-lg border border-secondary mb-4">
                    <div class="card-body text-light">
                        <h3 class="fs-5 fw-semibold mb-3 border-bottom border-secondary pb-2">Recent Orders</h3>
                        <div class="table-responsive">
                            <table class="table align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($recentOrder as $order)
                                        <tr>
                                            <td class="text-light">{{ $order->id }}</td>
                                            <td class="text-light">{{ $order->user->name }}</td>
                                            <td class="text-light">{{ $order->status }}</td>
                                            <td class="text-light">{{ $order->total_amount }} MMK</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {{-- Recent Transaction --}}
                <div class="card bg-card p-4 rounded-4 shadow-lg border border-secondary">
                    <div class="card-body text-light">
                        <h3 class="fs-5 fw-semibold mb-3 border-bottom border-secondary pb-2">Recent Transactions</h3>
                        <div class="table-responsive">
                            <table class="table align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($recentTransaction as $payment)
                                        <tr>
                                            <td class="text-light">{{ $payment->id }}</td>
                                            <td class="text-light">{{ $payment->order->user->name }}</td>
                                            <td class="text-light">{{ $payment->payment_method }}</td>
                                            <td class="text-light">{{ $payment->amount_paid }} MMK</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {{-- New Products --}}
            <div class="col-4">
                <div class="card bg-card p-4 rounded-4 shadow-lg border border-secondary">
                    <div class="card-body text-light">
                        <h3 class="fs-5 fw-semibold mb-3 border-bottom border-secondary pb-2">New Products</h3>
                        <div class="table-responsive">
                            <table class="table align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($newProduct as $product)
                                        <tr>
                                            <td class="text-light">{{ $product->id }}</td>
                                            <td class="text-light">
                                                <img src="{{ asset('storage/product/' . $product->image) }}"
                                                    class="img img-fluid rounded-3" alt="Product Image"
                                                    style="width: 60px;">
                                            </td>
                                            <td class="text-light">{{ $product->stock }}</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- Recent User --}}
        <div class="row mb-4">
            <div class="col-12">
                <div class="card bg-card p-4 rounded-4 shadow-lg border border-secondary">
                    <div class="card-body">
                        <div class="border-bottom pb-2 mb-3">
                            <h3 class="fs-5 fw-semibold  border-secondary text-light">Recent Users</h3>
                        </div>
                        <div class="table">
                            <table class="table align-middle" style="min-width: 600px;">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Address</th>
                                    </tr>
                                </thead>
                                @foreach ($recentUser as $user)
                                    <tbody>
                                        <tr>
                                            <td class="text-light">{{ $user->id }}</td>
                                            <td>
                                                @if ($user->image !== null)
                                                    <img src="{{ asset('storage/profile/user/' . $user->image) }}"
                                                        class="img-fluid rounded" alt="User Image" style="width: 60px">
                                                @else
                                                    <img src="{{ asset('digitally/admin/images/user.jpg') }}"
                                                        class="img-fluid rounded" alt="User Image" style="width: 60px">
                                                @endif
                                            </td>
                                            <td class="text-light">{{ $user->name }}</td>
                                            <td class="text-light">{{ $user->email }}</td>
                                            <td class="text-light">{{ $user->phone }} </td>
                                            <td class="text-light">{{ $user->address }}</td>
                                        </tr>
                                    </tbody>
                                @endforeach
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- 3. Footer -->
        <footer class="w-100 bg-card border-top border-secondary p-3 text-center small text-light mt-5">
            <p class="mb-0">Copyright &copy; <span id="currentYear"></span> Administrative.
                All rights are reserved</p>
        </footer>

    </main>
@endsection
