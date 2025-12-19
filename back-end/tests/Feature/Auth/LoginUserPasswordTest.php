<?php

namespace Tests\Feature\Auth;

use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LoginUserPasswordTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function usuario_pode_fazer_login_com_email_e_senha_validos()
    {
        $usuario = Usuario::factory()->create([
            'email' => 'teste@example.com',
            'password' => Hash::make('senha123'),
        ]);

        $response = $this->postJson('/web/login-user-password', [
            'email' => 'teste@example.com',
            'password' => 'senha123',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['usuario', 'entidade']);
    }

    /** @test */
    public function login_falha_com_senha_incorreta()
    {
        $usuario = Usuario::factory()->create([
            'email' => 'teste@example.com',
            'password' => Hash::make('senha123'),
        ]);

        $response = $this->postJson('/web/login-user-password', [
            'email' => 'teste@example.com',
            'password' => 'senha_errada',
        ]);

        $response->assertStatus(401);
    }

    /** @test */
    public function login_falha_com_email_inexistente()
    {
        $response = $this->postJson('/web/login-user-password', [
            'email' => 'naoexiste@example.com',
            'password' => 'qualquer',
        ]);

        $response->assertStatus(401);
    }

    /** @test */
    public function validacao_requer_email_e_senha()
    {
        $response = $this->postJson('/web/login-user-password', []);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email', 'password']);
    }
}
