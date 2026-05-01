import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
    return (
        <Link
            href="https://wa.me/353874523726"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
        >
            <span className="absolute size-14 animate-ping rounded-full bg-[#25D366] opacity-40" />
            <FaWhatsapp className="relative size-7 text-white" />
        </Link>
    );
}
