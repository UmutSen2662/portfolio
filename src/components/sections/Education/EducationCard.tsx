import type { ResolvedEducation } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { FaMapMarkerAlt, FaMedal, FaUniversity } from "react-icons/fa";

interface EducationCardProps {
    education: ResolvedEducation;
}

export function EducationCard({ education }: EducationCardProps) {
    return (
        <Card className="flex flex-col sm:flex-row gap-6 items-start sm:items-center relative overflow-hidden group">
            <div className="p-4 bg-ndark-800/50 rounded-xl border border-ndark-700/50">
                <FaUniversity className="w-8 h-8 text-primary-400" />
            </div>

            <div className="flex-1 flex flex-col gap-2 z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-nlight-100">{education.institution}</h3>
                    <div className="text-nlight-300 font-mono text-sm px-3 py-1 bg-ndark-800/50 rounded-full border border-ndark-700/50">
                        {education.startDate} - {education.endDate}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-nlight-200 text-lg">
                    <p>{education.degree}</p>
                    {(education.gpa || education.honors) && (
                        <div className="flex items-center gap-3">
                            {education.honors && (
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-900/20 border border-primary-500/30 text-primary-400 text-sm font-medium">
                                    <FaMedal className="w-3.5 h-3.5" />
                                    <span>
                                        {education.honors} {education.gpa && `| ${education.gpa} GPA`}
                                    </span>
                                </div>
                            )}

                            {!education.honors && education.gpa && (
                                <span className="text-nlight-300 text-sm">CGPA: {education.gpa}</span>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-1.5 text-nlight-400 text-sm">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    <span>{education.location}</span>
                </div>
            </div>
        </Card>
    );
}
