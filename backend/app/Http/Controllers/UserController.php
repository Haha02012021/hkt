<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getOtherUsers(Request $request) {
        try {
            $user = $request->user();
            $users = User::where('id', '!=', $user->id)->where('role', 0)->get(['email', 'id']);
            $data = [];
            foreach($users as $item) {
                array_push($data, ['value' => $item->id, 'label' => $item->email]);
            }

            if ($user) {
                return response()->json([
                    'statusCode' => 0,
                    'data' => $data,
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
