import useAuth from '@/hooks/useAuth';
import axios from '@/api/axios';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post('/refresh', {}, {
            withCredentials: true
        });
        setAuth((prev) => {
            return { ...prev, access_token: response.data.access_token};
        });
        return response.data.access_token;
    }

    return refresh;
};

export default useRefreshToken;