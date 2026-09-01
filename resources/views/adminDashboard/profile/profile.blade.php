@extends('adminDashboard.layout')
@section('title', 'Admin profile page');
@section('content')
    <main class="main-content-wrapper w-100 p-4 p-md-5">

        <h2 class="fs-2 fw-semibold mb-4 text-light">User Profile</h2>
        <div class="row g-5">
            <!-- Profile Card -->
            <div class="col-lg-4">
                <div class="card bg-card border-color shadow-lg text-center">
                    <div class="card-body p-4">
                        @if ($admin->image !== null)
                            <img src="{{ asset('storage/profile/admin/' . $admin->image) }}"
                                class="img-fluid rounded-circle mx-auto d-block mb-2" alt="User Profile"
                                style="border: 4px solid var(--primary-color);width:200px;">
                        @else
                            <img src="{{ asset('digitally/admin/images/user.jpg') }}"
                                class="img-fluid rounded-circle mx-auto d-block mb-2" alt="User Profile"
                                style="border: 4px solid var(--primary-color);">
                        @endif
                        <h5 class="fs-6 mb-1 text-light">{{ $admin->name }}</h5>
                        <p class="text-light mb-3">{{ $admin->email }}</p>
                        <form action="{{ route('admin.profile.updateImage') }}" method="post"
                            enctype="multipart/form-data">
                            @csrf
                            <input type="file" name="image"
                                class="form-control mb-2 btn btn-primary btn-sm @error('image') is-invalid @enderror">
                            @error('image')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                            <input type="submit" value="Upload New Photo" class="btn btn-primary btn-sm w-100">
                        </form>
                    </div>
                </div>
            </div>

            <!-- Forms -->
            <div class="col-lg-8">
                <!-- Update Profile Card -->
                <div class="card bg-card border-color shadow-lg">
                    <div class="card-body p-4 p-md-5">
                        <h3 class="mb-4 text-light">Edit profile</h3>
                        <form action="{{ route('admin.profile.updateAddress') }}" class="row g-3" method="POST">
                            @csrf
                            <div class="col-12">
                                <label for="profileUsername" class="form-label">User Name</label>
                                <input type="text" name="name"
                                    class="form-control @error('name') is-invalid @enderror" id="profileUsername"
                                    value="{{ old('name', $admin->name) }}">
                                @error('name')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-12">
                                <label for="profilePhone" class="form-label">Phone Number</label>
                                <input type="tel" name="phone"
                                    class="form-control @error('phone') is-invalid @enderror" id="profilePhone"
                                    value="{{ old('phone', $admin->phone) }}" placeholder="09-XXX-XXX-XXX">
                                @error('phone')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-12">
                                <label for="profileAddress" class="form-label">Address</label>
                                <textarea name="address" class="form-control @error('address') is-invalid @enderror" name="address" id="profileAddress"
                                    rows="3" placeholder="Enter your address.">{{ old('address', $admin->address) }}</textarea>
                                @error('address')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-12 mt-4">
                                <button type="submit" class="btn btn-primary">save</button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Change Password Card -->
                <div class="card bg-card border-color shadow-lg mt-4">
                    <div class="card-body p-4 p-md-5">
                        <h3 class="mb-4 text-light">Change Password</h3>
                        <form action="{{route('admin.profile.changePassword')}}" class="row g-3" method="POST">
                            @csrf
                            <div class="col-12">
                                <label for="currentPassword" class="form-label">Current password</label>
                                <input type="password" name="currentPassword" class="form-control @error('currentPassword') is-invalid @enderror" id="currentPassword">
                                 @error('currentPassword')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-md-6">
                                <label for="newPassword" class="form-label">New Password</label>
                                <input type="password" name="newPassword" class="form-control @error('newPassword') is-invalid @enderror" id="newPassword">
                                 @error('newPassword')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-md-6">
                                <label for="confirmNewPassword" class="form-label">
                                    Verify your new password</label>
                                <input type="password" name="confirmPassword" class="form-control @error('confirmPassword') is-invalid @enderror" id="confirmNewPassword">
                                 @error('confirmPassword')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            <div class="col-12 mt-4">
                                <button type="submit" class="btn btn-primary">Change Password</button>
                            </div>
                        </form>
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
