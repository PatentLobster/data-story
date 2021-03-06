<?php

namespace App\DataStory;

use Illuminate\Support\ServiceProvider;

class DataStoryServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(
            __DIR__.'/config/defaults.php', 'data-story'
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        require __DIR__ . '/routes/web.php';
        require __DIR__ . '/routes/api.php';
    }
}
