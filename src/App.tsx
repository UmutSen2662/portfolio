import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { useLanguage } from "./context/LanguageContext";
import { CanvasProvider } from "./context/CanvasContext";
import { InteractiveBackground } from "./components/ui/InteractiveBackground";
import { Education } from "./components/Education";

function App() {
    const { t } = useLanguage();

    return (
        <CanvasProvider>
            <InteractiveBackground />
            <div className="max-w-3xl mx-auto transition-all duration-200">
                <Navbar />

                <main className="flex flex-col gap-12 mx-4 pb-20">
                    <Hero />

                    <Education />

                    {/* Placeholder for experience */}
                    <section id="experience">
                        <h2 className="text-xl">{t("nav.experience")}</h2>
                    </section>

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
