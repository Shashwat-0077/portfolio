import { Button } from "@/components/ui/button";
import Dock from "@/components/ui/dock";

export default function HomePage() {
    return (
        <div className="page-container bg-background flex min-h-screen flex-col items-center justify-center text-white">
            <Dock />

            <h1 className="page-title text-4xl font-bold">Welcome Home! 🏠</h1>
            <Button>nfwoiergnaskinfse</Button>
        </div>
    );
}
