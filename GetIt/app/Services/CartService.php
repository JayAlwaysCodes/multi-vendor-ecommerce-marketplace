<?php

namespace App\Services;

use App\Models\Product;

class CartService
{
   private ?array $cachedCartItems = null;

   protected const COOKIE_NAME = 'cartItems';

   protected const COOKIE_LIFETIME = 60 * 24 * 365;

   public function addItemToCart( Product $product, int $quantity = 1,  $optionIds = null){

   }

   public function updateItemQuantity(int $productId, int $quantity, $optionIds = null)
   {
       // Logic to update the item quantity in the cart
   }

   public function removeItemFromCart(int $productId, $optionIds = null)
   {
      // Logic to remove the item from the cart
   }

   public function getCartItems(): array
   {
      try {
         if ($this->cachedcartItems === null){

            if(Auth::check()){
               $cartItems = $this->getCartItemsFromDatabase();
            }else{
               $cartItems = $this->getCartItemsFromCookies();
            }

            $productIds = collect($cartItems)->map(fn($item) => $item['product_id']);
            $products = Product::whereIn('id', $productIds)->with('user.vendor');

         }
         return $this->cachedCartItems;
      }catch (\Exception $e) {
         // Handle the exception
        
      }
   }

   public function getTotalQuantity(): int
   {
      // Logic to get the total quantity of items in the cart
   }

   public function getTotalPrice(): float
   {
      // Logic to get the total price of items in the cart
   }

   protected function updateItemQuantityInDatabase(int $productId, int $quantity, array $optionIds): void
   {
      // Logic to update the item quantity in the database
   }

   protected function updateItemQuantityInCookies(int $productId, int $quantity, array $optionIds): void
   {
      // Logic to update the item quantity in the cookies
   }

   protected function saveItemToDatabase(int $productId, int $quantity,)

}
