"use client";

import { useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { submitContactForm } from "@/lib/actions/contact";

type EnquiryType = "Book a session" | "General enquiry" | "School partnership";

const enquiryTypes: EnquiryType[] = [
    "Book a session",
    "General enquiry",
    "School partnership",
];



const contactDetails = [
    {
        icon: Phone,
        label: "Phone",
        lines: ["087 4523 726"],
        hrefs: ["tel:087 4523 726"],
    },
    {
        icon: Mail,
        label: "Email",
        lines: ["info@lumina-literacy.ie"],
        hrefs: ["mailto:info@lumina-literacy.ie"],
    },
    {
        icon: MapPin,
        label: "Address",
        lines: ["North Strand, Dublin 3", "Ireland"],
        hrefs: [null, null],
    },
];

export default function ContactBody() {
    const [enquiry, setEnquiry] = useState<EnquiryType>("Book a session");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    async function handleSubmit(e: { preventDefault(): void }) {
        e.preventDefault();
        setLoading(true);
        setFormError(null);
        const { error } = await submitContactForm({ enquiry, name, email, phone, message });
        setLoading(false);
        if (error) {
            setFormError(error);
        } else {
            setSubmitted(true);
        }
    }

    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">

                {/* Left — form */}
                <AnimateIn>
                    <div id="contact-form">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                            Send us a message
                        </p>

                        {submitted ? (
                            <div className="mt-8 flex flex-col items-start gap-4 rounded-[1.75rem] border border-border bg-brand-card p-8">
                                <CheckCircle className="size-8 text-brand-navy" />
                                <h2 className="text-xl font-semibold text-brand-navy">
                                    Message received — thank you.
                                </h2>
                                <p className="text-sm leading-7 text-brand-muted">
                                    We&apos;ll be in touch shortly. If your matter is urgent,
                                    call us directly on the numbers listed.
                                </p>
                                <Button
                                    variant="outline"
                                    className="rounded-full"
                                    onClick={() => {
                                        setSubmitted(false);
                                        setName("");
                                        setEmail("");
                                        setPhone("");
                                        setMessage("");
                                    }}
                                >
                                    Send another message
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                                {/* Enquiry type pills */}
                                <div>
                                    <Label>Enquiry type</Label>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {enquiryTypes.map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setEnquiry(type)}
                                                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                                                    enquiry === type
                                                        ? "bg-brand-navy text-brand-on-navy"
                                                        : "border border-border text-brand-muted hover:text-brand-navy"
                                                }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="name">Full name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="h-11 rounded-xl px-4"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-11 rounded-xl px-4"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="phone">
                                        Phone{" "}
                                        <span className="font-normal text-brand-muted">(optional)</span>
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+353 ..."
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="h-11 rounded-xl px-4"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us about your learner or what you'd like to discuss..."
                                        rows={5}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        className="rounded-xl px-4 py-3"
                                    />
                                </div>

                                {formError && (
                                    <p className="text-sm text-red-500">{formError}</p>
                                )}

                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={loading}
                                    className="w-full rounded-full"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            Sending…
                                        </>
                                    ) : (
                                        "Send message"
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>
                </AnimateIn>

                {/* Right — contact details + map */}
                <AnimateIn direction="right">
                    <div className="space-y-8">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold-strong">
                                Contact details
                            </p>
                            <ul className="mt-5 space-y-5">
                                {contactDetails.map(({ icon: Icon, label, lines, hrefs }) => (
                                    <li key={label} className="flex items-start gap-3">
                                        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-gold-soft text-brand-gold-strong">
                                            <Icon className="size-4" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
                                                {label}
                                            </p>
                                            {lines.map((line, i) =>
                                                hrefs[i] ? (
                                                    <a
                                                        key={i}
                                                        href={hrefs[i]!}
                                                        className="mt-0.5 block text-sm text-brand-navy transition-colors hover:text-brand-gold-strong"
                                                    >
                                                        {line}
                                                    </a>
                                                ) : (
                                                    <p key={i} className="mt-0.5 text-sm text-brand-navy">
                                                        {line}
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Google Map embed — replace src with real embed URL */}
                        <div className="overflow-hidden rounded-[1.5rem] border border-border">
                            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                                <iframe
                                    className="absolute inset-0 h-full w-full"
                                    src="https://www.google.com/maps?q=North+Strand,+Dublin+3,+Ireland&output=embed"
                                    title="North Strand, Dublin 3, Ireland map"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                </AnimateIn>

            </div>
        </section>
    );
}
