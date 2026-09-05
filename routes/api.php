<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register'])->name('user.register');
Route::post('/login', [UserController::class, 'login'])->name('user.login');
Route::get('/category', [HomeController::class, 'category'])->name('home.category');
Route::get('/product', [HomeController::class, 'product'])->name('home.product');
Route::get('/product/{product}', [HomeController::class, 'productDetail'])->name('home.product.productDetail');
Route::get('/feature',[HomeController::class,'feature'])->name('user.feature');
Route::get('/product/{product}/reviews', [ReviewController::class, 'reviews'])->name('home.product.reviews');
Route::middleware('auth:sanctum')->group(function () {
    // Logout
    Route::post('/logout',[UserController::class,'logout'])->name('user.logout');
    // profile
    Route::get('/profile', [UserController::class, 'profile'])->name('user.profile');
    Route::post('/profile/update', [UserController::class, 'update'])->name('user.profile.update');
    Route::post('/profile/changePassword', [UserController::class, 'changePassword'])->name('user.profile.changePassword');
    Route::post('/profile/updateImage', [UserController::class, 'updateImage'])->name('user.profile.updateImage');
    // Review
    Route::post('/product/{product}/updateReviews', [ReviewController::class, 'updateReview'])->name('home.product.updateReview');
    // Like button
    Route::post('/product/{productId}/like', [HomeController::class, 'like'])->name('home.product.like');
    // Add to cart
    Route::post('/cart/store', [CartController::class, 'store'])->name('cart.store');
     // Cart List
    Route::get('/cart',[CartController::class,'cartCount'])->name('cart.cartCount');
    Route::get('/cart/index',[CartController::class,'index'])->name('cart.index');
    Route::delete('/cart/removeItem/{itemId}',[CartController::class,'removeItem'])->name('cart.removeItem');
    Route::delete('/cart/cancleAllItem',[CartController::class,'cancle'])->name('cart.cancle');
    Route::post('/cart/order',[OrderController::class,'order'])->name('cart.order');
});
