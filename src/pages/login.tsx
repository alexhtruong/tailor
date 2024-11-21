import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import axios from 'axios';


export const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [user, setUser] = useState<any>(null);
    //TODO: setProfile might need to be deleted? too many references between components
    const [profile, setProfile] = useState<any>([]);
    //TODO: setIsLoading still needs to be implemented when we work on the todo below
    const [isLoading, setIsLoading] = useState<boolean>(false); 


    const login = useGoogleLogin({
        onSuccess: (response) => {
            console.log(response); 
            setUser(response);
        },
        onError: (error) => {
            console.error('Login failed:', error);   
        }
    });
    
    //TODO: work on storing manual usernames/passwords and attach this page to the login button in the main header
    const handleSubmit = (e: any) => {
        e.preventDefault();

    }

    useEffect(() => {
        if (user) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, 
                    {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
            .then((res) => {
                setProfile(res.data);
            })
            .catch((err) => console.log(err));
        }
    }, [user]);
        
    const logOut = () => {
        googleLogout();
        setProfile(null);
    }

    return (
        <div className="flex flex-row items-center justify-center">
            <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Card className="w-[400px]">
                <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Sign in</CardTitle>
                <CardDescription className="text-center">
                    Enter your email and password to sign in
                </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                <button 
                    className="w-full flex items-center justify-center border border-gray-300 p-2 rounded-md hover:bg-gray-100" 
                    onClick={() => login()}>
                    <img src="src/assets/google-icon.svg" alt="Google Logo" width={20} height={20} className="mr-2" />
                        Sign in with Google
                </button>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password" className="mt-3">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button className="w-full mt-4" type="submit" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
                </CardContent>
                <CardFooter className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm text-muted-foreground">
                        <span className="mr-1 hidden sm:inline-block">Don&apos;t have an account?</span>
                        <Link to="/signup" className="text-primary underline-offset-4 transition-colors hover:underline">
                        Sign up
                        </Link>
                    </div>
                    <Link to="/forgot-password" className="text-sm text-primary underline-offset-4 transition-colors hover:underline">
                        Forgot password?
                    </Link>
                </CardFooter>
            </Card>
            </div>
        </div>
      );
};

export default Login;