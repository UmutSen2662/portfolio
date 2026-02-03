import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CanvasProvider } from "./context/CanvasContext";
import { InteractiveBackground } from "./components/ui/InteractiveBackground";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";

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
