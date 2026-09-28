<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Address;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\Order_detail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    // Order cart items
    public function order(Request $request)
    {

        $validator = validator::make($request->all(), [
            'shipping.city' => 'required|string',
            'shipping.state' => 'required|string',
            'shipping.postalCode' => 'required',
            'shipping.address' => 'required|string',
            'payment.payment' => 'required',
            'payment.totalAmount' => 'required',
            'payment.transactionId' => 'required|min:6',
            'payment.transactionDate' => 'required|string',
            'payment.note' => 'nullable|string'
        ]);
        if ($validator->fails()) {
            return $this->handleValidationError($validator);
        }

        $user = Auth::user();
        try {
            $order = DB::transaction(function () use ($request, $user) {
                $cartItems = Cart::where('user_id', $user->id)->get();
                if ($cartItems->isEmpty()) {
                    throw new \Exception("Your cart is empty");
                }
                $totalPrice = 0;
                $products = [];
                foreach ($cartItems as $cartItem) {
                    $product = Product::where('id', $cartItem->product_id)->lockForUpdate()->first();
                    if (!$product) {
                        throw new \Exception("Product not found");
                    }
                    if ($product->stock < $cartItem->quantity) {
                        throw new \Exception("Not enougt stock {$product->name}.");
                    }
                    $products[$product->id] = $product;
                    $totalPrice += $cartItem->quantity * $product->price;
                }

                $shippingFee = 3000;
                $grandTotal = $totalPrice + $shippingFee;

                $paymentAmount = (float) $request->input('payment.totalAmount');
                if ($paymentAmount !== (float) $grandTotal) {
                    throw new \Exception("Payment amount does not match order total.");
                }

                $order = Order::create([
                    'user_id' => $user->id,
                    'order_date' => now(),
                    'total_amount' => $grandTotal,
                    'status' => 'pending'
                ]);

                foreach ($cartItems as $cartItem) {
                    $product = $products[$cartItem->product->id];
                    $totalPrice = $cartItem->quantity * $product->price;
                    Order_detail::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $cartItem->quantity,
                        'total_price' => $totalPrice
                    ]);
                    $product->decrement('stock', $cartItem->quantity);
                }

                // Create Transaction
                Transaction::create([
                    'order_id' => $order->id,
                    'payment_method' => $request->input('payment.payment'),
                    'amount_paid' => $request->input('payment.totalAmount'),
                    'transaction_id' => $request->input('payment.transactionId'),
                    'transaction_date' => $request->input('payment.transactionDate'),
                    'note' => $request->input('payment.note'),
                    'status' => 'pending'
                ]);

                // Create Shipping Address
                Address::create([
                    'order_id' => $order->id,
                    'user_id' => $user->id,
                    'city' => $request->input('shipping.city'),
                    'state' => $request->input('shipping.state'),
                    'postal_code' => $request->input('shipping.postalCode'),
                    'address' => $request->input('shipping.address'),
                    'status' => 'pending'
                ]);

                Cart::where('user_id', $user->id)->delete();

                return $order;
            });
            return response()->json([
                'status' => 'success',
                'message' => 'Order placed successfully.',
                'order_id' => $order->id,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    /* ---------------------------------------------------------Admin------------------------------------------------------ */

    public function index()
    {
        $orders = Order::with('user')->paginate(10);
        return view('adminDashboard.order.index', compact('orders'));
    }
    public function details($id)
    {
        $orderDetails = Order_detail::with('product')->where('order_id', $id)->get();
        $payment = Transaction::where('order_id', $id)->first();
        $address = Address::where('order_id', $id)->first();
        return view('adminDashboard.order.details', compact('orderDetails', 'payment', 'address'));
    }
    public function processing($id)
    {
        Order::where('id', $id)->update(['status' => 'processing']);
        return redirect()->back()->with(['success' => 'Order processing now!']);
    }
    public function deliver($id)
    {
        Order::where('id', $id)->update(['status' => 'deliver']);
        return redirect()->back()->with(['success' => 'Order deliver now!']);
    }
    public function complete($id)
    {
        Order::where('id', $id)->update(['status' => 'complete']);
        return redirect()->back()->with(['success' => 'Order complete now!']);
    }
    public function cancle($id)
    {
        $order = Order::with('order_detail')->findOrFail($id);
        if ($order->status !== 'cancle') {
            foreach ($order->order_detail as $item) {
                $product = Product::find($item->product_id);
                if ($product) {
                    $product->stock += $item->quantity;
                    $product->save();
                }
            }
            $order->status = "cancle";
            $order->save();
            return redirect()->back()->with(['success' => 'Order Cancle now!']);
        }
        return redirect()->back()->with(['error' => 'Order haven been Cancle!']);
    }
    // Delete
    public function delete($id)
    {
        Transaction::where('order_id', $id)->delete();
        Address::where('order_id', $id)->delete();
        Order_detail::where('order_id', $id)->delete();
        Order::destroy($id);
        return redirect()->back()->with(['success', 'Order have been deleted!']);
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
            'message' => 'Validation failed',
            'errors' => $errorMessage
        ], 422);
    }
}
