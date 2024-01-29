import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import {
    Explore,
    Home,
    PostDetails,
    Profile,
    Saved,
    UpdateProfile,
    ClubDetails,
} from "./_root/pages";
import RootLayout from "./_root/pages/RootLayout";
import "./globals.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import ForgotPasswordForm from "./_auth/forms/ForgotPassword";
 
const App = () => {
    return (
        <main className="flex h-screen">
            <Routes>
                {/* public routes*/}
                 <Route element={<AuthLayout />}>
                    <Route path="/sign-in" element={<SigninForm />} />
                    <Route path="/sign-up" element={<SignupForm />} />

                    <Route
                        path="/forgot-password"
                        element={<ForgotPasswordForm />}
                    />
                </Route>
                {/* private routes*/}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/clubs" element={<Saved />} />
                    <Route path="/posts/:eventId" element={<PostDetails />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/club/:clubId" element={<ClubDetails />} />
                    <Route
                        path="/update-profile/:id"
                        element={<UpdateProfile />}
                    />
                    <Route path="/post" element={<Explore />} />
                </Route>
            </Routes>
            <Toaster />
        </main>
    );
};

export default App;
