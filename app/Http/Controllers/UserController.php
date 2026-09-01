<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    //User Register
    public function register(Request $request)
    {
        $validator = validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8'
        ]);
        if ($validator->fails()) {
            return $this->handleValidationError($validator);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        Auth::login($user);
        $request->session()->regenerate();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'status' => 'success',
            'message' => 'Registation successful!',
            'user' => $user,
            'access_token' => $token
        ], 200);
    }
    // User Login
    public function login(Request $request)
    {
        $validator = validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8'
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors()->getMessages();
            $errorMessage = [];
            foreach ($errors as $error => $message) {
                $errorMessage[$error] = $message[0];
            }
            return response()->json([
                'status' => 'error',
                'message' => 'Login failed',
                'errors' => $errorMessage
            ], 422);
        }
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = User::where('email', $request->email)->first();
            $request->session()->regenerate();
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'user' => $user,
                'access_token' => $token
            ], 200);
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Failed login. Please try again!'
        ], 401);
    }
    // User Logout
    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->tokens()->delete();
        }
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json([
            'status' => 'success',
            'message' => 'Logged out fully'
        ], 200);
    }
    // User Profile
    public function profile()
    {
        $authenticatedUser = Auth::user();
        if ($authenticatedUser) {
            return response()->json([
                'user' => $authenticatedUser
            ], 200);
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Unauthenticated'
        ], 401);
    }
    // User Update Profile
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string|max:500'
        ]);
        if ($validator->fails()) {
            return $this->handleValidationError($validator);
        }
        $user = Auth::user();
        $data = [
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address
        ];
        $user->update($data);
        return response()->json([
            'status' => 'success',
            'message' => 'Saved',
            'user' => $user
        ]);
    }
    // User Change Password
    public function changePasswrod(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'currentPassword' => 'required',
            'newPassword' => 'required|different:currentPassword|min:8',
            'confirmPassword' => 'required|same:newPassword',
        ]);
        if ($validator->fails()) {
            return $this->handleValidationError($validator);
        }
        $user = Auth::user();
        if (Hash::check($request->currentPassword, $user->password)) {
            $newPassword = Hash::make($request->newPassword);
            $user->update(['password' => $newPassword]);
            return response()->json([
                'status' => 'success',
                'message' => 'Saved password',
            ], 200);
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Incorrect Password',
        ], 401);
    }
    // User Update Image profile
    public function updateImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:png,jpg,jpeg'
        ]);
        if ($validator->fails()) {
            return $this->handleValidationError($validator);
        }
        $user = Auth::user();
        if ($user->image) {
            $oldImage = 'profile/user/' . $user->image;
            Storage::disk('public')->exists($oldImage);
            Storage::disk('public')->delete($oldImage);
        }
        $imageName = uniqid() . $request->file('image')->getClientOriginalName();
        $request->file('image')->storeAs('profile/user', $imageName, 'public');
        $user->image = $imageName;
        $user->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Profile image updated successfully',
            'user' => $user
        ], 200);
    }
    /* -----------------------------------------------------------Admin-------------------------------------------------------- */
    // User List
    public function userList()
    {
        $users = User::paginate(10);
        return view('adminDashboard.user.index', compact('users'));
    }
    // Private function for validation
    private function handleValidationError($validator)
    {
        $errors = $validator->errors()->getMessages();
        $errorMessage = [];
        foreach ($errors as $error => $message) {
            $errorMessage[$error] = $message[0];
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Validation Failed',
            'errors' => $errorMessage
        ], 422);
    }
}
