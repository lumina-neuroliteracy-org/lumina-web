import Image from "next/image";
import logo from "@/public/lumina-logo.png";

export default function AuthShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
            <div className="flex min-h-[560px] overflow-hidden rounded-[2rem] shadow-xl">
                {/* Left panel — navy brand panel */}
                <div className="hidden w-[45%] flex-col items-center justify-center gap-6 bg-brand-navy p-10 lg:flex">
                    <Image
                        src={logo}
                        alt="Luminar logo"
                        width={72}
                        height={72}
                        className="rounded-full"
                    />
                    <p className="text-xl font-semibold tracking-tight text-brand-on-navy">
                        Luminar
                    </p>
                    <div className="mt-4 w-full flex-1 rounded-[1.5rem] bg-brand-on-navy/10 flex items-center justify-center">
                        <span className="text-4xl text-brand-on-navy/20">✦</span>
                    </div>
                </div>

                {/* Right panel — form area */}
                <div className="flex flex-1 flex-col items-center justify-center bg-[#f0f0f0] p-8 sm:p-12">
                    {children}
                </div>
            </div>
        </div>
    );
}
