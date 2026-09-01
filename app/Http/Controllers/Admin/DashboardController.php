<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //DahsBard Page
    public function dashboard()
    {
        $order = Order::where('status', 'complete')->count();
        $recentOrder = Order::with('user')->latest()->take(5)->get();
        $income = Order::where('status', 'complete')->sum('total_amount');
        $product = Product::count();
        $newProduct = Product::latest()->take(5)->get();
        $user = User::count();
        $recentUser = User::latest()->take(5)->get();
        $recentTransaction = Transaction::with('order.user')->latest()->take(5)->get();
        return view('adminDashboard.home', compact('order', 'recentOrder', 'income', 'product', 'newProduct', 'user', 'recentUser', 'recentTransaction'));
    }
}
