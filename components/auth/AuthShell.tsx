import Image, { StaticImageData } from "next/image";
import logo from "@/public/lumina-logo.png";

interface AuthShellProps {
    children: React.ReactNode;
    image?: StaticImageData | string;
    imageAlt?: string;
}

export default function AuthShell({ children, image, imageAlt = "Auth illustration" }: AuthShellProps) {
    return (
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
            <div className="flex min-h-140 overflow-hidden rounded-[2rem] shadow-xl">
                {/* Left panel — navy brand panel */}
                <div className="hidden w-[45%] flex-col items-center justify-center gap-6 bg-brand-navy p-10 lg:flex">
                    <Image
                        src={logo}
                        alt="Lumina logo"
                        width={72}
                        height={72}
                        className="rounded-full"
                    />
                    <div className="text-xs lg:text-sm font-semibold text-brand-gold lg:block text-center">
                        <h3>LUMINA</h3>
                        <p> NEURO-LITERACY STUDIO</p>
                    </div>
                    <div className="mt-4 w-full flex-1 relative overflow-hidden rounded-[1.5rem]">
                        {image ? (
                            <Image
                                src={image}
                                alt={imageAlt}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 40vw, 0px"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center bg-brand-on-navy/10">
                                <span className="text-4xl text-brand-on-navy/20">✦</span>
                            </div>
                        )}
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
