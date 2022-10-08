<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserByEmail(Request $request) {
        try {
            $user = User::where('email', $request->email)->get();

            if ($user) {
                return response()->json([
                    'statusCode' => 0,
                    'data' => $user,
                ]);
            } else {
                return response()->json([
                    'statusCode' => 1,
                    'message' => 'User is not exist!',
                    'status' => 401,
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'statusCode' => -1,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
