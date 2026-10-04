<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    // Category
    public function category()
    {
        $category = Category::get();
        return response()->json([
            'categories' => $category
        ]);
    }
    // Porduct
    public function product()
    {
        $userId = Auth::id();
        $query = Product::withCount('review');
        if ($userId) {
            $query->withExists(['likes as is_liked' => function ($q) use ($userId) {
                $q->where('user_id', $userId);
            }]);
        }
        $products = $query->get();
        if (!$userId) {
            $products->each(function ($product) {
                $product->is_liked = false;
            });
        }
        return response()->json($products);
    }
    // Like the product
    public function like($productId)
    {
        $product = Product::findOrFail($productId);
        $user = Auth::user();

        $result = DB::transaction(function () use ($user, $product) {

            $result = $user->likedProducts()->toggle($product->id);

            if (count($result['attached']) > 0) {
                $product->increment('like_count');
                $status = 'liked';
                $isLiked = true;
            } else {
                $product->decrement('like_count');
                $status = 'unliked';
                $isLiked = false;
            }

            $product->refresh();

            return [
                'like_count' => $product->like_count,
                'is_liked' => $isLiked,
                'status' => $status,
            ];
        });
        return response()->json($result);
    }
    // Product Detail
    public function productDetail(Product $product)
    {
        $product->increment('view_count');
        $product->load(['category', 'brand']);
        return response()->json($product);
    }
    // Feature
    public function feature()
    {
        $bestSeller = Product::query()
            ->join('order_details', 'products.id', '=', 'order_details.product_id')
            ->select(
                'products.id',
                'products.name',
                'products.price',
                'products.image'
            )
            ->selectRaw('SUM(order_details.quantity) as total_sold')
            ->groupBy(
                'products.id',
                'products.name',
                'products.price',
                'products.image'
            )
            ->orderByDesc('total_sold')
            ->limit(3)
            ->get();

        $trendyProduct = Product::query()
            ->withCount('likes')
            ->orderByDesc('likes_count')
            ->limit(3)
            ->get();

        $brands = Brand::all();

        return response()->json([
            'bestSeller' => $bestSeller,
            'trendy' => $trendyProduct,
            'brand' => $brands,
        ]);
    }
}
