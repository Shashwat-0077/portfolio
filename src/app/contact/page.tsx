import TimelineDragScroll from "@/components/TimelineDragScroll";
import Dock from "@/components/ui/dock";

// TODO : add satellite

export default function ContactPage() {
    return (
        <>
            <div className="bg-background flex min-h-screen flex-col items-center justify-center text-white">
                <Dock />

                <main className="min-h-[3000px] bg-gray-950 text-white">
                    <TimelineDragScroll />
                </main>
            </div>
        </>
    );
}
