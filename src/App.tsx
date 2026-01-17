import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import SubmitActivity from "./pages/SubmitActivity";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Churches from "./pages/Churches";
import ChurchDetail from "./pages/ChurchDetail";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activiteiten" element={<Activities />} />
            <Route path="/activiteiten/:id" element={<ActivityDetail />} />
            <Route path="/aanmelden" element={<SubmitActivity />} />
            <Route path="/nieuws" element={<News />} />
            <Route path="/nieuws/:id" element={<NewsDetail />} />
            <Route path="/kerken" element={<Churches />} />
            <Route path="/kerken/:id" element={<ChurchDetail />} />
            <Route path="/over" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/beheer" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
