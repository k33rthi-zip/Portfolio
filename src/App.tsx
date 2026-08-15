import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import EventDetail from "./pages/EventDetail";
import Collection from "./pages/Collection";
import StyleGuide from "./pages/StyleGuide";
import NotFound from "./pages/NotFound";
import ScrollManager from "@/components/trail/ScrollManager";
import SunCursor from "@/components/trail/SunCursor";


const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="portfolio-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ScrollManager />
            <SunCursor />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/events/collection" element={<Collection />} />
              <Route path="/events/:slug" element={<EventDetail />} />
              <Route path="/style-guide" element={<StyleGuide />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
