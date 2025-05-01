<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/', [ProductController::class, 'welcome'])->name('home');

Route::get('/product/{product:slug}', [ProductController::class, 'show'])
    ->name('product.show');

Route::post('/cart/strore/{product}', function(){

})->name('cart.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard',[ProductController::class, 'welcome'])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
