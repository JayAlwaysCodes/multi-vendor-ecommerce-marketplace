<?php

namespace App\Services;

use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator;

class CustomPathGenerator implements PathGenerator
{
    public function getPath($media): string
    {
        return md5($media->id . config('app.key')) . '/' ;
    }

    public function getPathForConversions($media): string
    {
        return md5($media->id . config('app.key')) . '/conversions/';
    }

    public function getPathForResponsiveImages($media): string
    {
        return md5($media->id . config('app.key')) . '/responsive-images/';
    }
}