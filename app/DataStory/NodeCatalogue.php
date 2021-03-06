<?php

namespace App\DataStory;

use Illuminate\Support\Str;

class NodeCatalogue
{
    public static function make()
    {
        return new static;
    }

    public function toArray()
    {
        $registered = config('data-story.nodes');

        $discovered = $this->discover();

        $all = collect($registered)->concat($discovered)->unique();
        
        return $all->map(function($class) {
            return $class::describeVariations();
        })->flatten(1)->toArray();
    }

    public function discover()
    {
        $dirToScan = config('data-story.discover-nodes-in-dir');
        $files = glob(base_path($dirToScan . '/*.php'));
        
        return collect($files)->map(function($path) {
            $path = Str::replaceFirst(base_path(), '', $path); 
            $path = Str::replaceLast('.php', '', $path); 

            $class = Str::of($path)->explode('/')->filter()->map(function($part) {
                return Str::studly($part);
            })->join('\\');

            return $class;
        })->values()->toArray();
    }
}