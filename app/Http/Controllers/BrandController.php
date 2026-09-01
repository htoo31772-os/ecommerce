<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = Brand::get();
        return view('adminDashboard.brand.index', compact('brands'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('adminDashboard.brand.create');
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
            $request->file('image')->storeAs('brand/', $imageName, 'public');
            $data['image'] = $imageName;
        }
        Brand::create($data);
        return redirect()->route('brand.index')->with(['success' => 'Create successful']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $data = Brand::where('id', $id)->first();
        return view('adminDashboard.brand.edit', compact('data'));
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
            $dbImage = Brand::where('id', $id)->value('image');
            if ($dbImage != NULL) {
                Storage::disk('public')->delete('brand/' . $dbImage);
            }
            $imageName = uniqid() . $request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs('brand', $imageName, 'public');
            $data['image'] = $imageName;
        }
        Brand::where('id', $id)->update($data);
        return redirect()->route('brand.index')->with(['success' => 'Update Successful']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dbImage = Brand::where('id', $id)->value('image');
        if ($dbImage != NULL) {
            Storage::disk('public')->delete('brand/' . $dbImage);
        }
        Brand::where('id', $id)->delete();
        return redirect()->back()->with(['success' => 'Delete successful']);
    }

    // Private function for validation
    private function vali($request)
    {
        validator::make($request->all(), [
            'image' => 'required|image|mimes:jpg,png,jpeg',
            'name' => 'required|string',
            'description' => 'required|string'
        ])->validate();
    }
    // Private function for data arrange
    private function dataArrange($request)
    {
        return [
            'name' => $request->name,
            'description' => $request->description
        ];
    }
}
