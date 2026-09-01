<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Address;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\Order_detail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    // Order cart items
    public function order(Request $request)
    {

        $validator = validator::make($request->all(), [
            'shipping.city' => 'required|string|regex:/^[a-zA-Z\s]+$/',
            'shipping.state' => 'required|string|regex:/^[a-zA-Z\s]+$/',
            'shipping.postalCode' => 'required',
            'shipping.address' => 'required|string',
            'payment.payment' => 'required',
            'payment.totalAmount' => 'required',
            'payment.transactionId' => 'required|min:6',
            'payment.transactionDate' => 'required|string',
            'payment.note' => 'nullable|string|regex:/^[a-zA-Z\s]+$/'
        ]);
        if ($validator->fails()) {
            return $this->handleValidationError($validator);
        }

        $user = Auth::user();
        $userId = $user->id;
        DB::beginTransaction();
        try {
            // Create Order
            $order = Order::create([
                'user_id' => $userId,
                'order_date' => now(),
                'total_amount' => $request->grandTotal,
                'status' => 'pending'
            ]);
            // Create Order_detail
            $totalPrice = 0;
            foreach ($request->items as $item) {
                $totalPrice = $item['quantity'] * $item['product']['price'];
                Order_detail::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product']['id'],
                    'quantity' => $item['quantity'],
                    'total_price' => $totalPrice
                ]);
                $product = Product::find($item['product']['id']);
                if ($product->stock < $item['quantity']) {
                    throw new \Exception('Product' . $product->name . 'is out of stock');
                }
                $product->decrement('stock', $item["quantity"]);
            }
            // Create Transaction
            Transaction::create([
                'order_id' => $order->id,
                'payment_method' => $request->payment['payment'],
                'amount_paid' => $request->payment['totalAmount'],
                'transaction_id' => $request->payment['transactionId'],
                'transaction_date' => $request->payment['transactionDate'],
                'note' => $request->payment['note'],
                'status' => 'pending'
            ]);
            // Create Shipping Address
            Address::create([
                'order_id' => $order->id,
                'user_id' => $user->id,
                'city' => $request->shipping['city'],
                'state' => $request->shipping['state'],
                'postal_code' => $request->shipping['postalCode'],
                'address' => $request->shipping['address'],
                'status' => 'pending'
            ]);
            Cart::where('user_id', $user->id)->delete();
            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'Order place successfully',
                'order_id' => $order->id
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Something went wrong: ',
                $e->getMessage()
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
