import AuthCard from "@/components/auth/AuthCard";

export default function SignupPage() {
  return (
    <AuthCard
      title="Create your Luminar account"
      description="Set up an account to manage consultations, track plans, and keep support details in one place."
      submitLabel="Sign up"
      footerText="Already have an account?"
      footerHref="/login"
      footerLinkLabel="Login"
    />
  );
}
