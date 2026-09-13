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
        validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|lowercase|unique:users',
            'password' => 'required|min:8'
        ])->validate();
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Registation successful!'
        ], 200);
    }
    // User Login
    public function login(Request $request)
    {
        validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|min:8'
        ])->validate();
        $user = User::where('email', strtolower($request->email))->first();
        if (!$user) {
            return response()->json(['message' => "ကျေးဇူးပြုပြီး အကောင့်ဝင်ပေးပါ"], 401);
        }
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => "Email (သို့မဟုတ်) Password မှားယွင်းနေပါသည်။"], 401);
        }
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'user' => $user,
            'access_token' => $token
        ], 200);
    }
    // User Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Logged out fully'
        ], 200);
    }
    // User Profile
    public function profile()
    {
        return response()->json([
            'user' => Auth::user()
        ], 200);
    }
    // User Update Profile
    public function update(Request $request)
    {
        Validator::make($request->all(), [
            'name' => 'required|string',
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string|max:500'
        ])->validate();

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
    public function changePassword(Request $request)
    {
        Validator::make($request->all(), [
            'currentPassword' => 'required',
            'newPassword' => 'required|different:currentPassword|min:8',
            'confirmPassword' => 'required|same:newPassword',
        ])->validate();
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
        ], 422);
    }
    // User Update Image profile
  public function updateImage(Request $request)
{
    Validator::make($request->all(), [
        'image' => 'required|image|mimes:png,jpg,jpeg|max:2048'
    ])->validate();

    $user = Auth::user();
    $oldImage = $user->image;

    $file = $request->file('image');

    // အရင်က သုံးခဲ့ဖူးတဲ့အတိုင်း unique ဖြစ်အောင် time() ထည့်ပြီး သိမ်းတာ ပိုစိတ်ချရပါတယ်
    $imageName = time() . '_' . $file->getClientOriginalName();

    $file->storeAs('profile', $imageName, 'public');

    $user->update([
        'image' => $imageName
    ]);

    if ($oldImage) {
        Storage::disk('public')->delete('profile/' . $oldImage);
    }

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
}
