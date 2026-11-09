import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import { Spinner } from "@/components/ui/spinner";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "@tanstack/react-router";
interface GoogleLoginButtonProps {
    redirect?: string;
}
export function GoogleLoginButton({redirect}: GoogleLoginButtonProps) {
    const { mutate: handleGoogleLogin, isPending, error } = useGoogleLogin();
    const navigate = useNavigate();
     const handleLogin = () => {
        handleGoogleLogin(undefined, {
            onSuccess: async () => {
                const destination =
                    redirect &&
                    redirect.startsWith("/") &&
                    !redirect.startsWith("//")
                        ? redirect
                        : "/";

                await navigate({
                    to: destination,
                    replace: true,
                });
            },
        });
    };
    return (
        <>
            <Button 
                variant="outline"
                onClick={() => handleLogin()}
                disabled={isPending}
                className="cursor-pointer"
            >
                {isPending ? (
                    <Spinner />
                ) : (
                    <>
                        <FcGoogle className="h-5 w-5 mr-2" />
                        Continue with Google
                    </>
                )}
            </Button>
            {error && (
                <p role="alert" className="text-sm text-destructive mt-2">
                    {error.message}
                </p>
            )}
        </>
    );
}