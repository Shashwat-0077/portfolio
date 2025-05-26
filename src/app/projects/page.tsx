import Dock from "@/components/ui/dock";

export default function ProjectsPage() {
    return (
        <div className="bg-background flex min-h-screen flex-col items-center justify-center text-white">
            <Dock />

            <h1 className="text-4xl font-bold">Projects</h1>
            <p className="mt-4 text-lg">Learn more about us here.</p>
        </div>
    );
}
