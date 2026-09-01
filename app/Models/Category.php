<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = [
        'name',
        'image',
        'description'
    ];
    protected $appends = ['image_url'];
    public function getImageUrlAttribute()
    {
        return asset('storage/category/' . $this->image);
    }

    public function product():HasMany{
        return $this->hasMany(Product::class);
    }
    public function brand():HasMany{
        return $this->hasMany(Brand::class);
    }
}
