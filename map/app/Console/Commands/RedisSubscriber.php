<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;

class RedisSubscriber extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:redis-subscriber';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Subscribe to Redis channel for map data updates';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Redis::subscribe(['mapData'], function ($message) {
            $this->info('Received map data update: ' . $message);
        });
    }
}
