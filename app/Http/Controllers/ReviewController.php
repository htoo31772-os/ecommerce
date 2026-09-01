<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    // Get Product Reviews
    public function reviews($product)
    {
        $reviews = Review::where('product_id', $product)->with('user')->get();
        return response()->json($reviews);
    }
    // Update Product Review
    public function updateReview(Request $request, $productId)
    {
        $validator = Validator::make($request->all(),[
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string'
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors()->getMessages();
            $errorMessage = [];
            foreach ($errors as $error => $message) {
                $errorMessage[$error] = $message[0];
            }
            return response()->json([
                'status' => 'error',
                'errors'=>$errorMessage
            ], 422);
        }
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'You should login first',
            ], 401);
        }
        $review = Review::create([
            'user_id' => $user->id,
            'product_id' => $productId,
            'rating' => $request->rating,
            'review' => $request->review
        ]);
        return response()->json($review->load('user'), 200);
    }
}
