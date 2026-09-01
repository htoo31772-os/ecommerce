<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::paginate(10);
        return view('adminDashboard.product.index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::get();
        $brands = Brand::get();
        return view('adminDashboard.product.create', compact('categories', 'brands'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validation
        $this->vali($request);
        // data arrange
        $data = $this->dataArrange($request);
        if ($request->hasFile('image')) {
            $imageName = uniqid() . $request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs('product/', $imageName, 'public');
            $data['image'] = $imageName;
        }
        Product::create($data);
        return redirect()->route('product.index')->with(['success' => 'Create Successful']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Product::where('id', $id)->with(['category', 'brand'])->first();
        return view('adminDashboard.product.show', compact('data'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $categories = Category::get();
        $brands = Brand::get();
        $data = Product::where('id', $id)->first();
        return view('adminDashboard.product.edit', compact('categories', 'brands', 'data'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validation
        $this->vali($request);
        // Data Arrange
        $data = $this->dataArrange($request);
        if ($request->hasFile('image')) {
            $dbImage = Product::where('id', $id)->value('image');
            if ($dbImage != NULL) {
                Storage::disk('public')->delete('product/' . $dbImage);
            }
            $imageName = uniqid() . $request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs('product', $imageName, 'public');
            $data['image'] = $imageName;
        }
        Product::where('id', $id)->update($data);
        return redirect()->route('product.index')->with(['success' => 'Update successful']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dbImage = Product::where('id', $id)->value('image');
        if ($dbImage != NULL) {
            Storage::disk('public')->delete('product/' . $dbImage);
        }
        Product::where('id', $id)->delete();
        return redirect()->back()->with(['success' => 'Delete Successful']);
    }

    // Private function for validation
    private function vali($request)
    {
        Validator::make($request->all(), [
            'name' => 'required|string',
            'category_id' => 'required',
            'brand_id' => 'required',
            'price' => 'required|integer',
            'stock' => 'required|integer',
            'image' => 'required|image|mimes:jpg,jpeg,png',
            'description' => 'required|string'
        ])->validate();
    }
    // Private function for data arrange
    private function dataArrange($request)
    {
        return [
            'name' => $request->name,
            'category_id' => $request->category_id,
            'brand_id' => $request->brand_id,
            'price' => $request->price,
            'stock' => $request->stock,
            'description' => $request->description
        ];
    }
}
