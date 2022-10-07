<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Exception;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function getAllTags() {
        try {
            $tags = Tag::all();

            return response()->json([
                'statusCode' => 0,
                'data' => $tags,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'statusCode' => -1,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
