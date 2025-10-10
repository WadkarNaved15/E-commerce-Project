'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext'; // adjust path




export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginEmailError, setLoginEmailError] = useState('');
  const [loginPasswordError, setLoginPasswordError] = useState('');
  const [registerNameError, setRegisterNameError] = useState('');
  const [registerEmailError, setRegisterEmailError] = useState('');
  const [registerPasswordError, setRegisterPasswordError] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoginEmailError('');
  setLoginPasswordError('');

  if (!loginEmail) {
    setLoginEmailError('Email is required');
    return;
  }
  if (!validateEmail(loginEmail)) {
    setLoginEmailError('Invalid email format');
    return;
  }
  if (!loginPassword) {
    setLoginPasswordError('Password is required');
    return;
  }

  setIsLoading(true);

  try {
    await login(loginEmail, loginPassword); // 👈 use AuthContext instead of direct fetch
    toast.success('Login successful!');
    router.push('/'); // redirect or home after login
  } catch (error: any) {
    toast.error(error.message || 'Login failed');
    setLoginPasswordError(error.message);
  } finally {
    setIsLoading(false);
  }
};



const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  setRegisterNameError('');
  setRegisterEmailError('');
  setRegisterPasswordError('');

  if (!registerName) {
    setRegisterNameError('Name is required');
    return;
  }
  if (!registerEmail) {
    setRegisterEmailError('Email is required');
    return;
  }
  if (!validateEmail(registerEmail)) {
    setRegisterEmailError('Invalid email format');
    return;
  }
  if (!registerPassword) {
    setRegisterPasswordError('Password is required');
    return;
  }
  if (registerPassword.length < 6) {
    setRegisterPasswordError('Password must be at least 6 characters');
    return;
  }

  setIsLoading(true);

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: registerName, email: registerEmail, password: registerPassword }),
      credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Registration failed');

    // Automatically login after registration
    await login(registerEmail, registerPassword);

    toast.success('Account created successfully!');
  } catch (error: any) {
    toast.error(error.message || 'Registration failed');
    setRegisterEmailError(error.message);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80"
          alt="Heeriya"
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-luxury-navy bg-opacity-40 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-center px-8"
          >
            <h1 className="text-5xl font-serif font-bold mb-4">
              Heeriya
            </h1>
            <p className="text-xl">Where timeless elegance meets modern luxury</p>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 text-center lg:hidden">
            <h1 className="text-3xl font-serif font-bold text-luxury-navy mb-2">
              Heeriya
            </h1>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                        loginEmailError
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:border-luxury-gold'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {loginEmailError && (
                    <p className="text-red-500 text-sm mt-1">{loginEmailError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none transition-colors ${
                        loginPasswordError
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:border-luxury-gold'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {loginPasswordError && (
                    <p className="text-red-500 text-sm mt-1">{loginPasswordError}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="text-sm text-luxury-gold hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-luxury-gold text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="inline-block animate-spin">⏳</span>
                  ) : (
                    'Sign In'
                  )}
                </motion.button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <UserIcon
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                        registerNameError
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:border-luxury-gold'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  {registerNameError && (
                    <p className="text-red-500 text-sm mt-1">{registerNameError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                        registerEmailError
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:border-luxury-gold'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {registerEmailError && (
                    <p className="text-red-500 text-sm mt-1">{registerEmailError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showRegisterPassword ? 'text' : 'password'}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none transition-colors ${
                        registerPasswordError
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:border-luxury-gold'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showRegisterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {registerPasswordError && (
                    <p className="text-red-500 text-sm mt-1">
                      {registerPasswordError}
                    </p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-luxury-gold text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="inline-block animate-spin">⏳</span>
                  ) : (
                    'Create Account'
                  )}
                </motion.button>
              </form>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
