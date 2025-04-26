<?php

namespace App\Models;

use App\Models\Category;
use App\Models\Department;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Product extends Model implements HasMedia
{
    use InteractsWithMedia;

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
}
