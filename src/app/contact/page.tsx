export default function Contact() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-center text-white">
            <h1 className="mb-4 text-3xl font-bold">Contact Us</h1>
            <p>
                You can reach us at{" "}
                <a
                    href="mailto:example@example.com"
                    className="text-blue-600 underline"
                >
                    example@example.com
                </a>
            </p>
        </div>
    );
}
