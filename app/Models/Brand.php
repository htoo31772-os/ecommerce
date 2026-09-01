<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Brand extends Model
{
    protected $fillable = [
        'name',
        'image',
        'description'
    ];

    protected $appends = ['image_url'];
    public function getImageUrlAttribute()
    {
        return asset('storage/brand/' . $this->image);
    }
    public function product():HasMany{
        return $this->hasMany(Product::class);
    }
    public function category():HasMany{
        return $this->hasMany(Category::class);
    }
}
