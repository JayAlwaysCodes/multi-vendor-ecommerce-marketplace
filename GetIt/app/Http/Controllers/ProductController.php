<?php

namespace App\Http\Controllers;

use Log;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductListResource;


class ProductController extends Controller 
{
    public function welcome()
    {
        $products = Product::query()
            ->published()
            ->with(['user', 'department', 'media'])
            ->paginate(10);

        Log::info('Products fetched for welcome page', [
            'products' => $products->toArray(),
            'product_count' => $products->total(),
        ]);

        $productsResource = ProductListResource::collection($products);
        Log::info('Products resource for welcome page', [
            'products_resource' => $productsResource->toArray(request()),
        ]);

        return Inertia::render('welcome', [
            'products' => $productsResource,
        ]);
    }

    public function show(Product $product)
    {
        $product->load(['user', 'department', 'media', 'variationTypes.options', 'variations']);

        return Inertia::render('Product/Show', [
            'product' => new ProductListResource($product),
        ]);
    }
}