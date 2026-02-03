import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { useLanguage } from "./context/LanguageContext";
import { CanvasProvider } from "./context/CanvasContext";
import { InteractiveBackground } from "./components/ui/InteractiveBackground";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";

function App() {
    const { t } = useLanguage();

    return (
        <CanvasProvider>
            <InteractiveBackground />
            <div className="max-w-3xl mx-auto transition-all duration-200">
                <Navbar />

                <main className="flex flex-col mx-4 pb-20">
                    <Hero />

                    <Education />

                    <Experience />

                    {/* Placeholder for projects */}
                    <section id="projects">
                        <h2 className="text-xl">{t("nav.projects")}</h2>
                    </section>
                </main>
            </div>
        </CanvasProvider>
    );
}

export default App;
