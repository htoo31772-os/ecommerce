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
        $query = Product::with('review');
        $user = request()->user('sanctum');
        if ($user) {
            $userId = $user->id;
            $query->withExists(['likes as is_liked' => function ($q) use ($userId) {
                $q->where('user_id', $userId);
            }]);
        }
        $products = $query->get();
        return response()->json($products);
    }
    // Like the product
    public function like($productId)
    {
        $product = Product::findOrFail($productId);
        $user = Auth::user();
        $result = $user->likedProducts()->toggle($product->id);
        if (count($result['attached']) > 0) {
            $product->increment('like_count');
            $status = 'liked';
        } else {
            $product->decrement('like_count');
            $status = 'unLiked';
        }
        return response()->json([
            'like_count' => $product->like_count,
            'status' => $status
        ]);
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
        $trendyProduct = Product::withCount('likes')
            ->orderBy('like_count', 'desc')
            ->take(3)
            ->get();
        $bestSeller = Product::select('products.*', DB::raw('SUM(order_details.quantity) as total_sold'))
            ->join('order_details', 'products.id', '=', 'order_details.product_id')
            ->groupBy('products.id')
            ->orderBy('total_sold', 'desc')
            ->take(3)
            ->get();
        $brands = Brand::get();
        return response()->json([
            'trendy' => $trendyProduct,
            'bestSeller' => $bestSeller,
            'brand' => $brands
        ]);
    }
}
