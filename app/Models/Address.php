<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;

class Address extends Model
{
    protected $fillable = [
        'order_id',
        'user_id',
        'city',
        'state',
        'postal_code',
        'address'
    ];

}
