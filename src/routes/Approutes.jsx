import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import RecoverPassword from "../pages/RecoverPassword";
import Unauthorized from "../pages/Unauthorized"
import UserDashboard from "../pages/user/Userdashboard"
import CoachDashboard from "../pages/coach/Coachdashboard"
import AdminDashboard from "../pages/admin/Admindashboard"
import SportsPage from "../pages/admin/SportsPage"; 
import UsersPage from "../pages/admin/UsersPage";
import UserLayout from "../layouts/Userlayout"
import CoachLayout from "../layouts/Coachlayout"
import AdminLayout from "../layouts/Adminlayout"
import RoleRoute from "./RoleRoute"
import LandingPage from "../pages/LandingPage";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
        /* === RUTA PRINCIPAL LANDING PAGE === */
                <Route path="/" element={<LandingPage />} />

        /* === RUTAS PÚBLICAS === */
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recover-password" element={<RecoverPassword />} /> {/* NUEVA RUTA */}
                <Route path="/unauthorized" element={<Unauthorized />} />

        /* === RUTAS PROTEGIDAS: USUARIO === */
                <Route path="/user" element={
                    <RoleRoute allowedRoles={["user"]}>
                        <UserLayout />
                    </RoleRoute>
                }>
                    <Route path="dashboard" element={<UserDashboard />} />
                </Route>

        /* === RUTAS PROTEGIDAS: COACH === */
                <Route path="/coach" element={
                    <RoleRoute allowedRoles={["coach"]}>
                        <CoachLayout />
                    </RoleRoute>
                }>
                    <Route path="dashboard" element={<CoachDashboard />} />
                </Route>
                <Route path="/admin/sports" element={<SportsPage />} />

        /* === RUTAS PROTEGIDAS: ADMINISTRADOR === */
                <Route path="/admin" element={
                    <RoleRoute allowedRoles={["admin"]}>
                        <AdminLayout />
                    </RoleRoute>
                }>
                    <Route path="dashboard" element={<AdminDashboard />} />
        /* Aquí está conectada tu nueva página del CRUD de usuarios */
                    <Route path="users" element={<UsersPage />} />
                </Route>

        /* Si escriben una URL que no existe, los mandamos a la Landing Page */
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}