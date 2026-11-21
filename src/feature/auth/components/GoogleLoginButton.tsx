import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
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
        <div className="flex flex-col items-center">
            <Button 
                variant="outline"
                onClick={() => handleLogin()}
                disabled={isPending}
                className="cursor-pointer w-fit h-12 w-12"
            > <FcGoogle size={32} />
            </Button>
            {error && (
                <p role="alert" className="text-sm text-destructive mt-2">
                    {error.message}
                </p>
            )}
        </div>
    );
}