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
                ]
            );

            //dd($fields['username']);

            $user = new User();
            $user->username = $fields['username'];
            $user->email = $fields['email'];
            $user->password = $fields['password'];
            $user->save();

            $token = $user->createToken("$user->username-token")->plainTextToken;

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => $user,
                    'token' => $token,
                ],
                'message' => 'user created',
            ], 200);
        } catch (Exception $err) {
                return response()->json([
                    'success' => false,
                    'message' => $err->getMessage()
                ]);
        }
    }

    public function login (Request $request) {
        $fields = $request->validate(
            ['username/email' => 'required|string',
            'password' => 'required|string',]
        );

        $user = $user = User::where(DB::raw('BINARY `username`'), $fields['username/email'])
            ->orWhere(DB::raw('BINARY `email`'), $fields['username/email'])->first();

        if (!$user || $fields['password'] !== $user->password) {
            return response()->json([
                'success' => false,
                'message' => 'Incorrect username or password',
            ], 400);
        }

        $user->tokens()->delete();

        $token = $user->createToken("$user->username-token")->plainTextToken;

        return response()->json([
            'success' => true,
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
        $user->tokens()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout Successfully',
        ]);
    }
}
