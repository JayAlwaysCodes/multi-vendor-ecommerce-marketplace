<?php

namespace App\Http\Controllers;

use Log;
use Inertia\Inertia;
use App\Models\Product;
use App\Services\CartService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductListResource;

class ProductController extends Controller 
{
    public function welcome()
    {
        $products = Product::query()
            ->forWebsite()
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

        $cartService = app(CartService::class);
        return Inertia::render('welcome', [
            'products' => $productsResource,
            'cartTotal' => $cartService->getTotalQuantity(),
            'cartItems' => $cartService->getCartItems(),
            'cartTotalPrice' => $cartService->getTotalPrice(),
        ]);
    }

    public function dashboard()
    {
        $products = Product::query()
            ->forWebsite()
            ->with(['user', 'department', 'media'])
            ->paginate(10);

        Log::info('Products fetched for dashboard page', [
            'products' => $products->toArray(),
            'product_count' => $products->total(),
        ]);

        $productsResource = ProductListResource::collection($products);
        Log::info('Products resource for dashboard page', [
            'products_resource' => $productsResource->toArray(request()),
        ]);

        $cartService = app(CartService::class);
        return Inertia::render('Dashboard', [
            'products' => $productsResource,
            'cartTotal' => $cartService->getTotalQuantity(),
            'cartItems' => $cartService->getCartItems(),
            'cartTotalPrice' => $cartService->getTotalPrice(),
        ]);
    }

    public function show(Product $product)
    {
        $product->load([
            'user',
            'department',
            'media',
            'variationTypes.options.media',
            'variations'
        ]);

        Log::info('Product fetched for show page', [
            'product' => $product->toArray(),
        ]);

        $productResource = new ProductResource($product);
        Log::info('Product resource for show page', [
            'product_resource' => $productResource->toArray(request()),
        ]);

        $variationOptions = request()->input('options', []);
        if (!is_array($variationOptions)) {
            $variationOptions = [];
        }

        $cartService = app(CartService::class);
        return Inertia::render('Product/Show', [
            'product' => $productResource,
            'variationOptions' => $variationOptions,
            'cartTotal' => $cartService->getTotalQuantity(),
            'cartItems' => $cartService->getCartItems(),
            'cartTotalPrice' => $cartService->getTotalPrice(),
        ]);
    }
}