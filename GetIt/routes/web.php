<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;

Route::get('/', [ProductController::class, 'welcome'])->name('home');

Route::get('/product/{product:slug}', [ProductController::class, 'show'])
    ->name('product.show');

Route::controller(CartController::class)->group(function (){
    Route::get('/cart', 'index')->name('cart.index');
    Route::post('/cart/add/{product}','store' )->name('cart.store');
    Route::put('/cart/{product}', 'update')->name('cart.update');
    Route::delete('/cart/{product}', 'destroy')->name('cart.destroy');
})



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard',[ProductController::class, 'welcome'])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
