<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_date',
        'total_amount',
        'status'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function order_detail()
    {
        return $this->hasMany(Order_detail::class,'order_id');
    }
    public function transaction(){
        return $this->hasOne(Transaction::class,'order_id');
    }
}
