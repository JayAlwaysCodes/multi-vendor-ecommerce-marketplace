<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\RolesEnum;
use Illuminate\Http\Request;
use App\Services\CartService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use App\Http\Requests\Auth\LoginRequest;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request, CartService $cartService): \Symfony\Component\HttpFoundation\Response
    {
        $request->authenticate();

        $request->session()->regenerate();

        /** @var User $user */
        $user = Auth::user();
        $route = "/";
        if ($user->hasAnyRole([RolesEnum::Admin, RolesEnum::Vendor])){
            $cartService->moveCartItemsToDatabase($user->id);
            return Inertia::location('/admin');
        }else {
            $route = route('dashboard', absolute: false);
        }

        $cartService->moveCartItemsToDatabase($user->id);

        return redirect()->intended($route);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
