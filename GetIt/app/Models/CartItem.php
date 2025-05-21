<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    //
    protected $casts = [
        'variation_type_option_ids' => 'array'
    ];
}
