@extends('adminDashboard.admin')
@section('title', 'Admin dashboard user list')
@section('content')
    <main class="main-content-wrapper w-100 p-4 p-md-5">
        <h2 class="fs-2 fw-semibold mb-4 text-light">User List Page</h2>

        <div class="row mb-4">
            <div class="col-12">
                <div class="card bg-card p-4 rounded-4 shadow-lg border border-secondary">
                    <div class="card-body">
                        <div class="border-bottom pb-2 mb-3">
                            <h3 class="fs-5 fw-semibold  border-secondary text-light">User List -
                                ({{ $users->count() }})
                            </h3>
                        </div>
                        <div class="table">
                            @if ($users->count() > 0)
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
                                    @foreach ($users as $user)
                                        <tbody>
                                            <tr>
                                                <td class="text-light">{{ $user->id }}</td>
                                                <td>
                                                    @if ($user->image !== NULL)
                                                        <img src="{{asset('storage/profile/user/'.$user->image)}}" class="img-fluid rounded" alt="User Image" style="width: 60px">
                                                    @else
                                                        <img src="{{asset('digitally/admin/images/user.jpg')}}" class="img-fluid rounded" alt="User Image" style="width: 60px">
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
                            @else
                                <!-- Table or detailed chart would go here -->
                                <p class="text-danger py-5 text-center">There is no user list!.</p>
                            @endif
                        </div>
                        {{ $users->links() }}
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
