<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;

class Transaction extends Model
{
    protected $fillable = [
        'order_id',
        'payment_method',
        'amount_paid',
        'transaction_id',
        'transaction_date',
        'note',
        'status'
    ];
    public function orderDetail()
    {
        return $this->belongsTo(Order_detail::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
