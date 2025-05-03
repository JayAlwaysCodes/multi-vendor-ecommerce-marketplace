<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public static $wrap = 'product';

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        \Log::info('Raw variationTypes before mapping:', ['variationTypes' => $this->variationTypes]);

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'short_description' => $this->short_description ?? substr(strip_tags($this->description), 0, 100) . '...',
            'price' => $this->price,
            'quantity' => $this->quantity,
            'image' => $this->getFirstMediaUrl('images'),
            'images' => $this->getMedia('images')->map(function ($image) {
                return [
                    'id' => $image->id,
                    'thumb' => $image->getUrl('thumb'),
                    'small' => $image->getUrl('small'),
                    'large' => $image->getUrl('large'),
                ];
            }),
            'user' => $this->whenLoaded('user', fn () => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ], ['id' => null, 'name' => 'Unknown Vendor']),
            'department' => $this->whenLoaded('department', fn () => [
                'id' => $this->department->id,
                'name' => $this->department->name,
            ], ['id' => null, 'name' => 'Unknown Department']),
            'variationTypes' => $this->whenLoaded('variationTypes', fn () => $this->variationTypes->map(function ($variationType) {
                return [
                    'id' => $variationType->id,
                    'name' => $variationType->name,
                    'type' => $variationType->type,
                    'options' => $variationType->relationLoaded('options') ? $variationType->options->map(function ($option) {
                        return [
                            'id' => $option->id,
                            'name' => $option->name,
                            'images' => $option->getMedia('images')->map(function ($image) {
                                return [
                                    'id' => $image->id,
                                    'thumb' => $image->getUrl('thumb'),
                                    'small' => $image->getUrl('small'),
                                    'large' => $image->getUrl('large'),
                                ];
                            }),
                        ];
                    }) : [],
                ];
            }), []),
            'variations' => $this->whenLoaded('variations', fn () => $this->variations->map(function ($variation) {
                return [
                    'id' => $variation->id,
                    'variation_type_option_ids' => $variation->variation_type_option_ids,
                    'quantity' => $variation->quantity,
                    'price' => $variation->price,
                ];
            }), [])
        ];
    }
}