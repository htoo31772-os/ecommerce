@extends('adminDashboard.admin')
@section('title', 'Product order details Page')
@section('content')
    <main class="main-content-wrapper w-100 p-4 p-md-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fs-2 fw-semibold text-light mb-0">Product Order details Page</h2>
            {{-- Back Button --}}
            <a href="{{route('order.index')}}" class="btn btn-secondary">
                <i class="fas fa-arrow-left me-2"></i> Back to Order
            </a>
        </div>
        <div class="row mb-4">
            <div class="col-12 mb-4">
                <div class="card bg-card p-4 rounded-4 shadow-lg border border-secondary">
                    <div class="card-body">
                        <div class=" border-bottom pb-2 mb-3">
                            <h3 class="fs-5 fw-semibold  border-secondary text-light">product order detail List -
                                ({{ $orderDetails->count() }})
                            </h3>
                        </div>
                        <div class="table">
                            @if ($orderDetails->count() > 0)
                                <table class="table align-middle" style="min-width: 600px;">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total Price</th>
                                        </tr>
                                    </thead>
                                    @foreach ($orderDetails as $detail)
                                        <tbody>
                                            <tr>
                                                <td class="text-light">
                                                    {{ $detail->id }}
                                                </td>
                                                <td style="width: 80px;">
                                                    <img src="{{ asset('storage/product/' . $detail->product->image) }}"
                                                        class="img-fluid rounded-3" alt="Product">
                                                </td>
                                                <td class="text-light">{{ $detail->product->name }}</td>
                                                <td class="text-light">{{ $detail->quantity }}</td>
                                                <td class="text-light">{{ $detail->total_price }} Ks</td>
                                            </tr>
                                        </tbody>
                                    @endforeach
                                </table>
                            @else
                                <!-- Table or detailed chart would go here -->
                                <p class="text-danger py-5 text-center">There is no Order details!.</p>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card bg-card p4 rounded-4 shadow-lg border border-secondary">
                    <div class="card-body">
                        <div class="border-bottom pb-2 mb-3">
                            <h3 class="fs-5 fw-semibold border-secondary text-light">Transaction & Shipping Address</h3>
                        </div>
                        <div class="table">
                            <table class="table align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Transaction Id</th>
                                        <th scope="col">Transaction Date</th>
                                        <th scope="col">Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-light">{{$payment->id}}</td>
                                        <td class="text-light">{{$payment->payment_method}}</td>
                                        <td class="text-light">{{$payment->amount_paid}} Ks</td>
                                        <td class="text-light">{{$payment->transaction_id}}</td>
                                        <td class="text-light">{{date('d M Y/h:i A',strtotime($payment->transaction_date))}}</td>
                                        <td class="text-light">{{$payment->note}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p><span class="text-primary">City:</span>{{$address->city}},  <span class="text-primary">State:</span>{{$address->state}},  <span class="text-primary">Postal Code:</span>{{$address->postal_code}} and  <span class="text-primary">Address:</span>{{$address->address}}.</p>
                        </div>
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
