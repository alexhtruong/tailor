import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '@/App';
import Login from '@/routes/login';
import Header from '@/components/ui/header';
import TailorDashboard from '@/routes/TailorDashboard';
import { AuthProvider } from '@/context/AuthProvider';
import RequireAuth from '@/components/RequireAuth';
import PersistLogin from '@/components/PersistLogin';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="min-h-screen w-full flex flex-col justify-center">
                    <Header />
                    <Routes>
                        <Route element={<PersistLogin />}>
                            <Route path="/" element={<App />} />
                            <Route path="/login" element={<Login />} />
                            <Route element={<RequireAuth />}>
                                <Route path="/tailor" element={<TailorDashboard />} />
                            </Route>
                        </Route>
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
};
