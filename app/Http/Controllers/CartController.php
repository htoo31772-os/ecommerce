<?php

namespace App\Http\Controllers;


use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    //Add to cart
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product ID or Quantity is missing or invalid. Please check your inputs.'
            ], 422);
        }
        $user = Auth::user();

        $product = Product::findOrFail($request->product_id);

        $cartItem = Cart::where('product_id', $product->id)->where('user_id', $user->id)->first();
        if ($cartItem) {
            $newQuantity = $cartItem->quantity + $request->quantity;
            if ($newQuantity > $product->stock) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Not enough quantity to buy'
                ], 422);
            }
            $cartItem->update([
                'quantity' => $newQuantity,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Cart updated successfully.',
                'cart' => $cartItem->load('product')
            ], 200);
        }
        if ($request->quantity > $product->stock) {
            return response()->json([
                'status' => 'error',
                'message' => 'Not enough quantity to buy'
            ], 422);
        }
        $newCartItem = Cart::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'quantity' => $request->quantity,
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Product added to cart.',
            'cart' => $newCartItem->load('product')
        ], 201);
    }
    // Cart Count
    public function cartCount()
    {
        $userId = Auth::id();
        $cartCount = Cart::where('user_id', $userId)->count();
        return response()->json([
            'count' => $cartCount
        ], 200);
    }
    // Cart Items List
    public function index()
    {
        $userId = Auth::user()->id;
        $cartItems = Cart::with('product')->where('user_id', $userId)->get();
        return response()->json($cartItems, 200);
    }
    // Update Quantity
    public function updateQuantity(Request $request, $cartId)
    {
        $validator = validator::make($request->all(), [
            'quantity' => 'required|integer|min:1'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Quantity do not found'
            ], 422);
        }
        $user = Auth::user();
        $cartItem = Cart::where('id', $cartId)->where('user_id', $user->id)->with('product')->first();
        if (!$cartItem) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cart item not found.'
            ], 404);
        }
        $quantity = $request->quantity;
        if ($quantity > $cartItem->product->stock) {
            return response()->json([
                'status' => 'error',
                'message' => 'Not enough stock available.'
            ], 422);
        }
        $cartItem->update([
            'quantity' => $quantity
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Cart quantity updated successfully.',
            'cartItem' => $cartItem->fresh('product')
        ], 200);
    }
    // Reomve Item
    public function removeItem(Request $request, Cart $cart)
    {
        if ($cart->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized.'
            ], 403);
        }
        $cart->delete();
        return response()->json([
            'message' => 'Item removed successfully.',
        ]);
    }
    // Cancle All Itmes
    public function cancle()
    {
        $user = Auth::user();
        $deleted = Cart::where('user_id', $user->id)->delete();
        if (!$deleted) {
            return response()->json([
                'message' => 'Fail remove all item.'
            ], 404);
        }
        $count = Cart::where('user_id', $user->id)->count();
        return response()->json([
            'message' => 'Remove all items',
            'count' => $count
        ], 200);
    }
}
