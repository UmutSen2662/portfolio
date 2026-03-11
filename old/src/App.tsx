import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/layout/Footer";
import { CanvasProvider } from "@/context/CanvasContext";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { BackToTop } from "@/components/layout/BackToTop";

function App() {
    // const { t } = useLanguage(); // Removed unused t

    return (
        <CanvasProvider>
            <InteractiveBackground />
            <div className="max-w-3xl mx-auto transition-all duration-200">
                <Navbar />

                <main className="flex flex-col mx-4 pb-20">
                    <Hero />

                    <Education />

                    <Experience />

                    <Projects />
                </main>
                <Footer />
            </div>
            <BackToTop />
        </CanvasProvider>
    );
}

export default App;
