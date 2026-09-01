@extends('adminDashboard.admin');
@section('title', 'Order')
@section('content')
    <main class="main-content-wrapper w-100 p-4 p-md-5">
        <h2 class="fs-2 fw-semibold mb-4 text-light">Product Order List Page</h2>

        <div class="row mb-4">
            <div class="col-12">
                <div class="card bg-card p-4 rounded-4 shadow-lg border border-secondary">
                    <div class="card-body">
                        <div class="border-bottom pb-2 mb-3">
                            <h3 class="fs-5 fw-semibold  border-secondary text-light">product order List -
                                ({{ $orders->count() }})
                            </h3>
                        </div>
                        <div class="table">
                            @if ($orders->count() > 0)
                                <table class="table align-middle" style="min-width: 600px;">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Order Date</th>
                                            <th scope="col">Total Amount</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    @foreach ($orders as $order)
                                        <tbody>
                                            <tr>
                                                <td class="text-light">
                                                    {{ $order->id }}
                                                </td>
                                                <td class="text-light">{{ $order->user->name }}</td>
                                                <td class="text-light">
                                                    @if ($order->status === 'pending')
                                                        <span class="badge text-bg-warning">{{ $order->status }}</span>
                                                    @elseif ($order->status === 'processing')
                                                        <span class="badge text-bg-primary">{{ $order->status }}</span>
                                                    @elseif ($order->status === 'deliver')
                                                        <span class="badge text-bg-info">{{ $order->status }}</span>
                                                    @elseif ($order->status === 'complete')
                                                        <span class="badge text-bg-success">{{ $order->status }}</span>
                                                    @elseif ($order->status === 'cancle')
                                                        <span class="badge text-bg-danger">{{ $order->status }}</span>
                                                    @endif
                                                </td>
                                                <td class="text-light">{{ date('d M Y', strtotime($order->order_date)) }}
                                                </td>
                                                <td class="text-light">{{ $order->total_amount }} Ks</td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        {{-- Detail --}}
                                                        <a href="{{ route('order.details', $order->id) }}"
                                                            class="btn btn-outline-secondary btn-sm me-2"
                                                            title="">Details</a>
                                                        @if ($order->status === 'pending')
                                                            <a href="{{ route('order.processing', $order->id) }}"
                                                                class="btn btn-outline-primary btn-sm me-2" title="Confirm">
                                                                Processing
                                                            </a>
                                                            <a href="{{ route('order.cancle', $order->id) }}"
                                                                class="btn btn-outline-danger btn-sm" title="Edit">
                                                                Cancle
                                                            </a>
                                                        @elseif ($order->status === 'processing')
                                                            <a href="{{ route('order.deliver', $order->id) }}"
                                                                class="btn btn-outline-info btn-sm me-2" title="Confirm">
                                                                Deliver
                                                            </a>
                                                            <a href="{{ route('order.cancle', $order->id) }}"
                                                                class="btn btn-outline-danger btn-sm" title="Edit">
                                                                Cancle
                                                            </a>
                                                        @elseif ($order->status === 'deliver')
                                                            <a href="{{ route('order.complete', $order->id) }}"
                                                                class="btn btn-outline-success btn-sm me-2" title="Confirm">
                                                                Complete
                                                            </a>
                                                        @elseif ($order->status === 'complete' || $order->status === 'cancle')
                                                            <form action="{{ route('order.delete', $order->id) }}"
                                                                method="post">
                                                                @csrf
                                                                @method('DELETE')
                                                                <input type="submit" class="btn btn-danger btn-sm mt-3"
                                                                    value="Delete">
                                                            </form>
                                                        @endif
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    @endforeach
                                </table>
                            @else
                                <!-- Table or detailed chart would go here -->
                                <p class="text-danger py-5 text-center">There is no order list!.</p>
                            @endif
                        </div>
                        {{ $orders->links() }}
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
