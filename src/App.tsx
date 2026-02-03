import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { CanvasProvider } from "@/context/CanvasContext";
import { InteractiveBackground } from "@/components/layout/InteractiveBackground";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";

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
            </div>
        </CanvasProvider>
    );
}

export default App;
