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
    public function product():HasMany{
        return $this->hasMany(Product::class);
    }
    public function category():HasMany{
        return $this->hasMany(Category::class);
    }
}
