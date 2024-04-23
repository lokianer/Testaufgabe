<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class RedisController extends Controller
{
    public function updateMapData()
    {
        $mapData = $this->generateRandomData(300); 
        Redis::publish('mapData', json_encode($mapData));

        return response()->json(['success' => true,'data'=> $mapData]);
    }

    private function generateRandomData($count)
    {
        $data = [];

        for ($i = 0; $i < $count; $i++) {
            $randomColor = '#' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);
            $randomLat = (mt_rand() / mt_getrandmax()) * 180 - 90;
            $randomLng = (mt_rand() / mt_getrandmax()) * 360 - 180;

            $adjustedLat = $randomLat + (mt_rand() / mt_getrandmax() - 0.3) * 10000;
            $adjustedLng = $randomLng + (mt_rand() / mt_getrandmax() - 0.5) * 5500;

            $data[] = [
                'color' => $randomColor,
                'lat' => $adjustedLat,
                'lng' => $adjustedLng,
                'name' => 'Point ' . ($i + 1),
            ];
        }

        return $data;
    }
}
