<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function welcome()
    {
        $products = Product::query()
            ->published()
            ->paginate(10);
        
        return Inertia::render('Welcome', [
            'products' => ProductListResource::collection($products),
        ]);
    }

    public function show(Product $product){
        
    }
}
