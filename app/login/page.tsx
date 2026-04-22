import AuthCard from "@/components/auth/AuthCard";

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to access your learner dashboard, support plans, and session history."
      submitLabel="Login"
      footerText="Need an account?"
      footerHref="/signup"
      footerLinkLabel="Sign up"
    />
  );
}
