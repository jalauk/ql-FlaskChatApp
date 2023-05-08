import Login from './pages/login/Login'
import Register from './pages/register/Register';
import ChatPage from './pages/chat/ChatPage';
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
     {path: '/', element: <Login />},
     {path: '/register', element: <Register />},
     {path: '/chat', element: <ChatPage />}
])
export default router