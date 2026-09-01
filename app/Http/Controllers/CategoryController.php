<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::get();
        return view('adminDashboard.category.index', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('adminDashboard.category.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation
        $this->vali($request);
        // Data Arrange
        $data = $this->dataArrange($request);
        if ($request->hasFile('image')) {
            $imageName = uniqid() . $request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs('category', $imageName, 'public');
            $data['image'] = $imageName;
        }
        Category::create($data);
        return redirect()->route('category.index')->with(['success' => 'Created category successful']);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = Category::where('id', $id)->first();
        return view('adminDashboard.category.edit', compact('data'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {}

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
            $dbImage = Category::where('id', $id)->value('image');
            if ($dbImage != NULL) {
                Storage::disk('public')->delete('category/' . $dbImage);
            }
            $imageName = uniqid() . $request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs('category', $imageName, 'public');
            $data['image'] = $imageName;
        }
        Category::where('id', $id)->update($data);
        return redirect()->route('category.index')->with(['success' => 'Update category successful']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dbImage = Category::where('id', $id)->value('image');
        if ($dbImage != NULL) {
            Storage::disk('public')->delete('category/' . $dbImage);
        }
        Category::where('id', $id)->delete();
        return redirect()->back()->with(['success' => 'Delete category successful']);
    }
    // Private function for validation
    private function vali($request)
    {
        Validator::make($request->all(), [
            'image' => 'required|image|mimes:png,jpg,jpeg',
            'name' => 'required|string',
            'description' => 'required|string'
        ])->validate();
    }
    // Private function for Data Arrange
    private function dataArrange($request)
    {
        return [
            'name' => $request->name,
            'description' => $request->description
        ];
    }
}
