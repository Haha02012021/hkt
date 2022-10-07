<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    //
    public function signup (Request $request) {
        try {
            $fields = $request->validate(
                [
                    'email' => 'required|email|unique:users,email',
                    'username' => 'required|string|unique:users,username',
                    'password' => 'required|string',
                    'school' => 'required|string',
                    'level_id' => 'required',
                    'role' => 'required',
                ]
            );

            //dd($fields['username']);

            $user = new User();
            $user->username = $fields['username'];
            $user->email = $fields['email'];
            $user->password = $fields['password'];
            $user->role = $fields['role'];
            $user->school = $fields['school'];
            $user->level_id = $fields['level_id'];

            $user->save();

            $token = $user->createToken("$user->username-token")->plainTextToken;

            return response()->json([
                'statusCode' => 0,
                'data' => [
                    'user' => $user,
                    'token' => $token,
                ],
                'message' => 'user created',
            ], 200);
        } catch (Exception $err) {
                return response()->json([
                    'statusCode' => 1,
                    'success' => false,
                    'message' => $err->getMessage()
                ]);
        }
    }

    public function login (Request $request) {
        $fields = $request->validate(
            ['email' => 'required|string|email',
            'password' => 'required|string',]
        );

        $user = User::where(DB::raw('BINARY `email`'), $fields['email'])->first();

        if (!$user || $fields['password'] !== $user->password) {
            return response()->json([
                'statusCode' => 1,
                'message' => 'Incorrect username or password',
                'status' => 400
            ]);
        }

        $user->tokens()->delete();

        $token = $user->createToken("$user->username-token")->plainTextToken;

        return response()->json([
            'statusCode' => 0,
            'data' => [
                'user' => $user,
                'token' => $token,
            ],
            'message' => 'user created',
        ], 200);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        if(!$user) {
            return response()->json([
                'statusCode' => 1,
                'message' => 'User not found',
            ]);
        }

        $user->tokens()->delete();

        return response()->json([
            'statusCode' => 0,
            'message' => 'Logout Successfully',
        ]);
    }
}
