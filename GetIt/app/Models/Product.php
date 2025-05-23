<?php

namespace App\Models;

use Log;
use App\Models\Category; 
use App\Models\Department;
use App\Models\VariationType;
use App\Enums\ProductStatusEnum;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\MediaCollections\Models\Media;  


class Product extends Model implements HasMedia
{
    use InteractsWithMedia;

   

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('thumb')->width(100);
        $this->addMediaConversion('small')->width(480);
        $this->addMediaConversion('large')->width(1200);   
    }

    public function scopeForVendor(Builder $query): Builder{
        return $query->where('created_by', auth()->user()->id);
    }

    public function scopePublished(Builder $query):Builder{
        Log::info('Applying published scope', ['status' => $query->toSql()]);
        return $query->where('status', ProductStatusEnum::Published);
    }

    public function scopeForWebsite(Builder $query): Builder{
        return $query->published();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function variationTypes(): HasMany{
        return $this->hasMany(VariationType::class);
    }

    public function variations(): HasMany{
        return $this->hasMany(ProductVariation::class);
    }

    public function getPriceForOptions($optionIds = [])
    {
        $optionIds = array_values($optionIds);
        sort($optionIds);
        foreach ($this->variations as $variation) {
            $a = $variation->variation_type_option_ids;
            sort($a);
            if ($a == $optionIds) {
                return $variation->price !== null ? $variation->price : $this->price;
            }
        }
        return $this->price;
    }
}
