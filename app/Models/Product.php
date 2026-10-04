<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'brand_id',
        'name',
        'image',
        'price',
        'stock',
        'description',
        'like_count',
        'view_count'
    ];
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }
    public function review(): HasMany
    {
        return $this->hasMany(Review::class);
    }
    public function likes()
    {
        return $this->belongsToMany(User::class, 'likes');
    }
    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }
    public function orderDeatils()
    {
        return $this->hasMany(Order_detail::class);
    }
}
