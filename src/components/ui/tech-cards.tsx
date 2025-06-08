"use client";
import { Card, CardContent } from "@/components/ui/card";
import { TECHNOLOGIES } from "@/data/technologies";
import { Badge } from "@/components/ui/badge";

const TechCards = ({ techs }: { techs: (keyof typeof TECHNOLOGIES)[] }) => {
    return (
        <div className="mx-auto grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {techs.map((tech) => {
                const {
                    Icon,
                    categories,
                    defaultIconColor,
                    longDescription,
                    title,
                } = TECHNOLOGIES[tech];

                return (
                    <Card
                        key={tech}
                        className="group relative cursor-pointer overflow-hidden border-0 bg-[#2A2A2A] transition-all duration-500 hover:shadow-2xl"
                        style={{
                            borderTop: `5px solid ${defaultIconColor}`,
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <CardContent className="relative p-6">
                            {/* Header with icon and arrow */}
                            <div className="mb-6 flex items-start justify-between">
                                <div
                                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#333333] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                                    style={{
                                        boxShadow: `${defaultIconColor} 0px 3px 160px`,
                                        border: "1px solid #3A3A3A",
                                    }}
                                >
                                    {Icon && (
                                        <Icon
                                            className="h-8 w-8 transition-all duration-300 group-hover:scale-110"
                                            style={{ color: defaultIconColor }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                                {/* Title */}
                                <h3
                                    className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-white"
                                    style={{
                                        textShadow: `0 0 20px ${defaultIconColor}20`,
                                    }}
                                >
                                    {title}
                                </h3>

                                {/* Categories */}
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category, index) => (
                                        <Badge
                                            key={index}
                                            className="rounded-full border border-[#3A3A3A] bg-[#333333] px-3 py-1 text-xs font-medium text-gray-300 transition-all duration-300 hover:bg-[#3D3D3D]"
                                        >
                                            {category}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Description */}
                                <p className="text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                                    {longDescription}
                                </p>
                            </div>

                            {/* Bottom accent line */}
                        </CardContent>
                        <div
                            className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
                            style={{ backgroundColor: defaultIconColor }}
                        />
                    </Card>
                );
            })}
        </div>
    );
};

export default TechCards;
