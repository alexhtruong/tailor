import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useAuth from '@/hooks/useAuth';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const { auth, setAuth } = useAuth();

    const handleSuccessGoogleAuthResponse = async (googleResponse: any) => {
        try {
          const response = await axiosPrivate.post('/google_login', { code: googleResponse.code }, {
            headers: {
              'Content-Type': 'application/json',
            }
          });

          setAuth({ access_token: response.data.access_token });
          navigate('/tailor')
          console.log(auth);
          return;
        } catch (error) {
        // throws up to onGoogleLogin's try catch block 
          throw error;
        }
    };

    const onGoogleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (response) => {
            await handleSuccessGoogleAuthResponse(response);
        },
        onError: (error) => {
            console.error('Login failed:', error);
        }
    });

    return (
        <div className="min-h-screen min-w-screen flex flex-row items-center justify-center">
            <div className="container flex min-h-full w-full flex-col items-center justify-center">
            <Card className="w-[400px]">
                <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Sign in</CardTitle>
                <CardDescription className="text-center">
                    Choose a method to continue
                </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                <button 
                    className="w-full flex items-center justify-center border border-gray-300 p-2 rounded-md hover:bg-gray-100" 
                    onClick={() => onGoogleLogin()}>
                    <img src="src/assets/google-icon.svg" alt="Google Logo" width={20} height={20} className="mr-2" />
                        Sign in with Google
                </button>
                <button 
                    className="w-full flex items-center justify-center border border-gray-300 p-2 rounded-md hover:bg-gray-100" 
                    onClick={() => onGoogleLogin()}>
                    <img src="src/assets/github-mark.svg" alt="GitHub Logo" width={20} height={20} className="mr-2" />
                        Sign in with GitHub
                </button>
                {/* <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div> */}
                {/* insert github button */}
                </CardContent>
            </Card>
            </div>
        </div>
      );
};

export default Login;