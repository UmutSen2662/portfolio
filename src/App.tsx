import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { useLanguage } from "./context/LanguageContext";

function App() {
    const { t } = useLanguage();

    return (
        <div className="max-w-3xl mx-auto transition-all duration-200">
            <Navbar />

            <main className="flex flex-col gap-8">
                <Hero />

                {/* Placeholder for education */}
                <section id="education">
                    <h2 className="text-xl">{t('nav.education')}</h2>
                </section>

                {/* Placeholder for experience */}
                <section id="experience">
                    <h2 className="text-xl">{t('nav.experience')}</h2>
                </section>

                {/* Placeholder for projects */}
                <section id="projects">
                    <h2 className="text-xl">{t('nav.projects')}</h2>
                </section>

            </main>
        </div>
    );
}

export default App;
