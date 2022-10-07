<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class ReactController extends Controller
{
    //
    public function likePost ($postId, Request $request) {
        try {
            $user = $request->user();
            if(!$user) {
                return response()->json([
                    'statusCode' => 1,
                    'message' => 'user not found'
                ]);
            }
            $user->likes()->toggle($postId);

            return response()->json([
                'statusCode' => 0,
                'message' => 'reacted'
            ]);
        } catch (Exception $err) {
            return response()->json([
                'statusCode' => -1,
                'message' => $err->getMessage(),
            ]);

        }
    }
}
