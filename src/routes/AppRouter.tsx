import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '@/MainPage';
import Login from '@/routes/login';
import Header from '@/components/ui/header';
import TailorDashboard from '@/routes/tailor';
import { AuthProvider } from '@/context/AuthProvider';
import RequireAuth from '@/components/RequireAuth';
import PersistLogin from '@/components/PersistLogin';
import Profile from './profile';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <main className="flex min-h-screen h-screen flex-col">
                    <div className="min-h-screen bg-background">
                        <Header />
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route element={<PersistLogin />}>
                                <Route path="/" element={<MainPage />} />
                                {/* protected routes */}
                                <Route element={<RequireAuth />}>
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/tailor" element={<TailorDashboard />} />
                                </Route>
                            </Route>
                        </Routes>
                    </div>
                </main>
            </AuthProvider>
        </BrowserRouter>
    );
};
