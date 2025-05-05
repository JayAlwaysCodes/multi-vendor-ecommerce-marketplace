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
            $products = Product::whereIn('id', $productIds)->with('user.vendor')->forWebsite()->get()->keyBy('id');

            $cartItemData = [];
            foreach ($cartItems as $key => $cartItem){
               $product = data_get($products, $cartItem['product_id']);
               if (!$product) continue;

               $optionsInfo = [];
               $options = VariationTypeOption::with('variationType')->whereIn('id', $cartItem['option_ids'])->get()->keyBy('id');

               $imageUrl = null;

               foreach ($cartItem['option_ids'] as $option_id){
                  $option = data_get($options, $option_id);

                  if(!$imageUrl){
                     $imageUrl = $option->getFirstMediaUrl('images', 'small ');
                  }
                  $optionInfo[] = [
                     'id' => $option_id,
                     'name' => $option->name,
                     'type' => [
                        'id' => $option->variationType->id,
                        'name' => $option->variationType->name,
                     ],
                  ];
               }

               $cartItemData[] = [
                  'id' => $cartItem['id'],
                  'product_id' => $product->id,
                  'title' => $product->title,
                  'slug' => $product->slug,
                  'price' => $cartItem['price'],
                  'quantity' => $cartItem['quantity'],
                  'option_ids' => $cartItem['option_ids'],
                  'options' => $optionInfo,
                  'image' => $imageUrl ?: $product->getFirstMediaUrl('images', 'small'),
                  'user' => [
                     'id' => $product->created_by,
                     'name' => $product->user->vendor->store_name,
                  ],
               ];


            }

            $this->cachedCartItems = $cartItemData;

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

   protected function saveItemToDatabase(int $productId, int $quantity,) {

   }

}
