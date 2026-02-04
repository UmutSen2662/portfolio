import type { ResolvedEducation } from "@/data/types";
import { Card } from "@/components/ui/Card";
import { FaMapMarkerAlt, FaMedal, FaUniversity } from "react-icons/fa";

interface EducationCardProps {
    education: ResolvedEducation;
}

export function EducationCard({ education }: EducationCardProps) {
    return (
        <Card className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 sm:gap-x-6 items-start relative overflow-hidden group">
            <div className="sm:row-span-2 self-center shrink-0 p-3 sm:p-4 bg-ndark-800/50 rounded-xl border border-ndark-700/50">
                <FaUniversity className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 self-center sm:self-start">
                <h3 className="text-lg sm:text-xl font-bold text-nlight-100 leading-tight">{education.institution}</h3>
                <div className="hidden sm:block text-nlight-300 font-mono text-sm px-3 py-1 bg-ndark-800/50 rounded-full border border-ndark-700/50 whitespace-nowrap">
                    {education.startDate} - {education.endDate}
                </div>
            </div>

            <div className="col-span-2 sm:col-span-1 sm:col-start-2 flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-nlight-200 text-base sm:text-lg">
                    <p className="font-medium leading-snug">{education.degree}</p>

                    {(education.gpa || education.honors) && (
                        <div className="flex items-center gap-3">
                            {education.honors && (
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-900/20 border border-primary-500/30 text-primary-400 text-xs sm:text-sm font-medium whitespace-nowrap">
                                    <FaMedal className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    <span>
                                        {education.honors} {education.gpa && `| ${education.gpa} GPA`}
                                    </span>
                                </div>
                            )}

                            {!education.honors && education.gpa && (
                                <span className="text-nlight-300 text-sm whitespace-nowrap">CGPA: {education.gpa}</span>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-nlight-400 text-sm mt-1 sm:mt-0">
                    <div className="flex items-center gap-1.5">
                        <FaMapMarkerAlt className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{education.location}</span>
                    </div>
                    <div className="sm:hidden font-mono text-xs text-nlight-400">
                        {education.startDate} - {education.endDate}
                    </div>
                </div>
            </div>
        </Card>
    );
}
