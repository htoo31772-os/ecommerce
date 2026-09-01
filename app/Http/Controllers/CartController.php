<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Order_detail;
use App\Models\Product;
use App\Models\Transaction;
use Dflydev\DotAccessData\Data;
use Faker\Provider\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Stmt\TryCatch;

class CartController extends Controller
{
    //Add to cart
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|min:1'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product ID or Quantity is missing or invalid. Please check your inputs.'
            ], 422);
        }
        $user = Auth::user();
        $product_id = $request->input('product_id');
        $quantity = $request->input('quantity');
        $product = Product::find($product_id);

        $cartItem = Cart::where('product_id', $product_id)->where('user_id', $user->id)->first();
        if ($cartItem) {
            $newQuantity = $cartItem->quantity += $quantity;
            if ($newQuantity > $product->stock) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Not enough quantity to buy'
                ], 422);
            }
            $cartItem->quantity = $newQuantity;
            $cartItem->save();
            return response()->json([
                'status' => 'success',
                'cart' => $cartItem,
            ], 201);
        } else {
            if ($quantity > $product->stock) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Not enough quantity to buy'
                ], 422);
            }
            $newCartItem = Cart::create([
                'user_id' => $user->id,
                'product_id' => $product_id,
                'quantity' => $quantity,
            ]);
            return response()->json([
                'status' => 'success',
                'cart' => $newCartItem
            ], 201);
        }
    }
    // Cart Count
    public function cartCount()
    {
        $userId = Auth::user()->id;
        $cartCount = Cart::with('products')->where('user_id', $userId)->count();
        if ($cartCount === 0) {
            return response()->json([
                'message' => 'There is cart data',
                'count' => 0
            ], 200);
        }
        return response()->json([
            'count' => $cartCount
        ], 200);
    }
    // Cart Items List
    public function index()
    {
        $userId = Auth::user()->id;
        $cartItems = Cart::with('product')->where('user_id', $userId)->get();
        if (!$cartItems) {
            return response()->json([
                'message' => 'There is no cart itmes',
                'cartItems' => []
            ], 200);
        }
        return response()->json($cartItems);
    }
    // Reomve Item
    public function removeItem($itemId)
    {
        $user = Auth::user();
        Cart::where('id', $itemId)->where('user_id', $user->id)->delete();
        $count = Cart::where('user_id', $user->id)->count();
        return response()->json([
            'message' => 'Item deleted successfully',
            'count' => $count
        ], 200);
    }
    // Cancle All Itmes
    public function cancle()
    {
        $user = Auth::user();
        Cart::where('user_id', $user->id)->delete();
        $count = Cart::where('user_id', $user->id)->count();
        return response()->json([
            'message' => 'Remove all items',
            'count' => $count
        ], 200);
    }

}
