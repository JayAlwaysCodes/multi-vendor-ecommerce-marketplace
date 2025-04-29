<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $result = [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'image' => $this->getFirstMediaUrl('images', 'small') ?: 'https://via.placeholder.com/300',
            'user' => [
                'id' => $this->user ? $this->user->id : null,
                'name' => $this->user ? $this->user->name : 'Unknown',
            ],
            'department' => [
                'id' => $this->department ? $this->department->id : null,
                'name' => $this->department ? $this->department->name : 'Unknown',
            ],
            'description' => $this->description,
            'images' => $this->whenLoaded('media', fn() => $this->getMedia('images')->map(fn($media) => [
                'id' => $media->id,
                'url' => $media->getUrl('large'),
                'thumb' => $media->getUrl('thumb'),
            ])),
            'variation_types' => $this->whenLoaded('variationTypes', fn() => $this->variationTypes->map(fn($type) => [
                'id' => $type->id,
                'name' => $type->name,
                'options' => $this->whenLoaded('options', fn() => $type->options ? $type->options->map(fn($option) => [
                    'id' => $option->id,
                    'name' => $option->name,
                ]) : []),
            ])),
            'variations' => $this->whenLoaded('variations', fn() => $this->variations->map(fn($variation) => [
                'id' => $variation->id,
                'variation_type_option_ids' => $variation->variation_type_option_ids,
                'quantity' => $variation->quantity,
                'price' => $variation->price,
            ])),
        ];

        \Log::info('Product resource transformation', ['product_id' => $this->id, 'result' => $result]);

        return $result;
    }
}