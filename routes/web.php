<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::middleware(['user'])->group(function () {
    Route::get('/admin/showRegister', [AdminController::class, 'showRegister'])->name('admin.showRegister');
    Route::post('/admin/register', [AdminController::class, 'register'])->name('admin.register');
    Route::get('/admin/showLogin', [AdminController::class, 'showLogin'])->name('admin.showLogin');
    Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login');
});
Route::middleware(['admin'])->prefix('admin')->group(function () {
    Route::middleware(['prevent-back-history'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('admin.dashboard');
        Route::post('/logout', [AdminController::class, 'logout'])->name('admin.logout');
        Route::get('/profile', [AdminController::class, 'profile'])->name('admin.profile');
        Route::post('/profile/updateImage', [AdminController::class, 'updateImage'])->name('admin.profile.updateImage');
        Route::post('/profile/updateAddress', [AdminController::class, 'updateAddress'])->name('admin.profile.updateAddress');
        Route::post('/profile/changePassword', [AdminController::class, 'changePassword'])->name('admin.profile.changePassword');
        // Category
        Route::resource('category', CategoryController::class);
        // Brand
        Route::resource('brand', BrandController::class);
        // Product
        Route::resource('product', ProductController::class);
        // Order
        Route::get('/order/index', [OrderController::class, 'index'])->name('order.index');
        Route::get('/order/details/{id}', [OrderController::class, 'details'])->name('order.details');
        Route::get('/order/processing/{id}', [OrderController::class, 'processing'])->name('order.processing');
        Route::get('/order/deliver/{id}', [OrderController::class, 'deliver'])->name('order.deliver');
        Route::get('/order/complete/{id}', [OrderController::class, 'complete'])->name('order.complete');
        Route::get('/order/cancle/{id}', [OrderController::class, 'cancle'])->name('order.cancle');
        Route::delete('/order/delete/{id}', [OrderController::class, 'delete'])->name('order.delete');
        // User
        Route::get('/user/index', [UserController::class, 'userList'])->name('user.userList');
    });
});
Route::get('/{any}', function () {
    return view('welcome'); // React entry
})->where('any', '.*');
