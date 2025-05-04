'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, Box, Stack, Typography } from '@mui/material';

const loginSchema = z.object({
    email: z.string().email('E-mail inválido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = loginSchema.safeParse({ email, password });

        if (!result.success) {
            setError(result.error.errors[0].message);
            return;
        }

        setError(null);

        // Simula autenticação (substitua pelo seu backend)
        if (email === 'admin@example.com' && password === '123456') {
            router.push('/');
        } else {
            setError('Credenciais inválidas');
        }
    };

    return (
        <div className="h-screen flex w-full bg-[#0A1E14]">
            <div className="flex-1 flex items-center justify-center bg-[#0A1E14] px-4">
                <div className="w-full max-w-md bg-[#122C22] shadow-lg rounded-2xl p-8 space-y-6">
                    <div className="">
                        <Stack direction="row" spacing={2} alignItems="center" mb={4} >
                            <Avatar
                                alt="Logo Jungle Mídia"
                                src="/logo.png"
                                sx={{ width: 56, height: 56 }}
                            />
                            <Box>
                                <Typography variant="h5" fontWeight="bold" color="white">
                                    Jungle Mídia
                                </Typography>
                                <Typography variant="subtitle2" color="#90A99F">
                                    Acesse sua conta
                                </Typography>
                            </Box>
                        </Stack>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder=" "
                                className="block px-4 z-40 pb-2.5 h-12 pt-4 w-full text-sm text-white bg-[#1A3A2F] rounded-lg appearance-none focus:outline-none focus:ring-0 border border-[#1F4033] focus:border-[#58C287] peer"
                            />
                            <label className="absolute text-sm text-[#B0D6C5] duration-300 z-10 transform -translate-y-4 scale-75 top-2 origin-[0] bg-[#1A3A2F] px-2 peer-focus:px-2 peer-focus:text-[#58C287] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                                E-mail
                            </label>
                        </div>

                        {/* Senha */}
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=" "
                                className="block px-4 z-40 pb-2.5 h-12 pt-4 w-full text-sm text-white bg-[#1A3A2F] rounded-lg appearance-none focus:outline-none focus:ring-0 border border-[#1F4033] focus:border-[#58C287] peer"
                            />
                            <label className="absolute text-sm text-[#B0D6C5] duration-300 z-10 transform -translate-y-4 scale-75 top-2 origin-[0] bg-[#1A3A2F] px-2 peer-focus:px-2 peer-focus:text-[#58C287] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                                Senha
                            </label>
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-white"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white h-12 rounded-md font-semibold w-full"
                        >
                            Entrar
                        </button>
                    </form>

                    <div className="flex-1  py-4 mt-8 text-center">
                        <p className="text-white">
                            Não tens uma conta?{' '}
                            <Link href="/account/register" className="font-medium text-[#228B22] underline">
                                Registar
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
