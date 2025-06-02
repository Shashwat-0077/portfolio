import Dock from "@/components/ui/dock";
import Galaxy from "@/components/pages/skills/galaxy";

export default function SkillsPage() {
    return (
        <>
            {/* NOTE : For the galaxy use GSAP motion path plugin */}
            <div className="bg-background flex min-h-screen flex-col items-center justify-center text-white">
                <Dock />
                <Galaxy />
            </div>
        </>
    );
}
