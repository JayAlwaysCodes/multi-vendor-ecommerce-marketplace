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
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'image' => $this->getFirstMediaUrl('images', 'small'),
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ],
            'department' => [
                'id' => $this->department->id,
                'name' => $this->department->name,
            ],
        ];
    }
}
