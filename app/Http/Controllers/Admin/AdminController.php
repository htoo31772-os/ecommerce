<?php

namespace App\Http\Controllers\Admin;

use App\Models\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Testing\Fluent\Concerns\Has;

class AdminController extends Controller
{
    //Register Page
    public function showRegister()
    {
        return view('adminDashboard.register');
    }
    public function register(Request $request)
    {
        // Validation
        $this->vali($request);
        // data Arrange
        $data = $this->dataArrange($request);
        // Create Admin Account
        $admin = Admin::create($data);
        // Login Admin Account
        Auth::guard('admin')->login($admin);
        return redirect()->route('admin.dashboard')->with(['success' => 'Welcome to admin dashboard']);
    }
    // Login Page
    public function showLogin()
    {
        return view('adminDashboard.login');
    }
    public function login(Request $request)
    {
        validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ])->validate();

        $data = $request->only('email', 'password');
        if (Auth::guard('admin')->attempt($data)) {
            $request->session()->regenerate();
            return redirect()->route('admin.dashboard')->with(['success' => 'Welcome Back']);
        }
        return redirect()->back()->with(['error' => 'Invalid email & password']);
    }
    // Admin Logout
    public function logout()
    {
        Auth::guard('admin')->logout();
        return redirect()->route('admin.showLogin')->with(['success' => 'Logout successful']);
    }
    // Admin Profile
    public function profile()
    {
        $admin = Auth::guard('admin')->user();
        return view('adminDashboard.profile.profile', compact('admin'));
    }
    // Update Image
    public function updateImage(Request $request)
    {
        validator::make($request->all(), [
            'image' => 'required|image|mimes:jpg,jpeg,png',
        ])->validate();
        $admin = Auth::guard('admin')->user();
        if ($admin->image) {
            Storage::disk('public')->delete('profile/admin/' . $admin->image);
        }
        $imageName = uniqid() . $request->file('image')->getClientOriginalName();
        $request->file('image')->storeAs('profile/admin', $imageName, 'public');
        $admin->image = $imageName;
        $admin->save();
        return redirect()->back()->with(['success' => 'Update image successful']);
    }
    // Update Address
    public function updateAddress(Request $request)
    {
        // Validation
        $this->updateProfileValidation($request);
        // Data Arrange
        $data = $this->updateProfileDataArrange($request);
        $admin = Auth::guard('admin')->user();
        $admin->update($data);
        return redirect()->back()->with(['success' => 'Update profile successful']);
    }
    // Change Password
    public function changePassword(Request $request)
    {
        validator::make($request->all(), [
            'currentPassword' => 'required',
            'newPassword' => 'required|different:currentPassword|max:8',
            'confirmPassword' => 'required|same:newPassword|max:8'
        ])->validate();
        $admin = Auth::guard('admin')->user();
        $oldPassword = $admin->password;
        if (Hash::check($request->currentPassword, $oldPassword)) {
            $newPassword = Hash::make($request->newPassword);
            $admin->update(['password' => $newPassword]);
            return redirect()->back()->with(['success' => 'Password']);
        }
        return redirect()->back()->with(['error' => 'Incorrect your password']);
    }
    // Private function for validation
    private function vali($request)
    {
        validator::make(
            $request->all(),
            [
                'name' => 'required|string',
                'email' => 'required|email|unique:admins',
                'password' => 'required',
            ]
        )->validate();
    }
    // Private function for Data arange
    private function dataArrange($request)
    {
        return [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ];
    }
    // Privat function for Updat Profile
    private function updateProfileValidation($request)
    {
        Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:255',
                'phone' => 'nullable|regex:/^[0-9]+$/|max:20',
                'address' => 'nullable|string',
            ]
        )->validate();
    }

    // 🔑 Update အတွက် Data Arrange Function
    private function updateProfileDataArrange($request)
    {
        return [
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
        ];
    }
}
