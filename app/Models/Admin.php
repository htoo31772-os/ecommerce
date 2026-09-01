<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'image',
        'password',
    ];
    protected $appends = ['image_url'];
    public function getImageUrlAttribute()
    {
        return asset('storage/profile/admin' . $this->image);
    }
}
