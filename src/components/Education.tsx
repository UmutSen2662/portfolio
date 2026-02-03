import { EDUCATION } from "@/data/education";
import { useLanguage } from "@/context/LanguageContext";
import { Card } from "./ui/Card";
import { FaMapMarkerAlt, FaMedal, FaUniversity } from "react-icons/fa";

export function Education() {
    const { language, t } = useLanguage();

    return (
        <section id="education" className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{t("nav.education")}</h2>

            <div className="flex flex-col gap-4">
                {EDUCATION.map((edu) => (
                    <Card
                        key={edu.id}
                        className="flex flex-col sm:flex-row gap-6 items-start sm:items-center relative overflow-hidden group"
                    >
                        <div className="p-4 bg-ndark-800/50 rounded-xl border border-ndark-700/50">
                            <FaUniversity className="w-8 h-8 text-primary-400" />
                        </div>

                        <div className="flex-1 flex flex-col gap-2 z-10">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <h3 className="text-xl font-bold text-nlight-100">
                                    {edu.translations[language].institution}
                                </h3>
                                <div className="text-nlight-300 font-mono text-sm px-3 py-1 bg-ndark-800/50 rounded-full border border-ndark-700/50">
                                    {edu.startDate} - {edu.endDate}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-nlight-200 text-lg">
                                <p>{edu.translations[language].degree}</p>
                                {(edu.gpa || edu.translations[language].honors) && (
                                    <div className="flex items-center gap-3">
                                        {edu.translations[language].honors && (
                                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-900/20 border border-primary-500/30 text-primary-400 text-sm font-medium">
                                                <FaMedal className="w-3.5 h-3.5" />
                                                <span>
                                                    {edu.translations[language].honors} {edu.gpa && `| ${edu.gpa} GPA`}
                                                </span>
                                            </div>
                                        )}

                                        {!edu.translations[language].honors && edu.gpa && (
                                            <span className="text-nlight-300 text-sm">CGPA: {edu.gpa}</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-1.5 text-nlight-400 text-sm">
                                <FaMapMarkerAlt className="w-4 h-4" />
                                <span>{edu.translations[language].location}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
