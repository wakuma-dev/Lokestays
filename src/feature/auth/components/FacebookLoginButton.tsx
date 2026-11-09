import { Button } from "@/components/ui/button";
import { useFacebookLogin } from "../hooks/useFacebookLogin";
import { Spinner } from "@/components/ui/spinner";
import { FaFacebookF } from "react-icons/fa";
import { useNavigate } from "@tanstack/react-router";

interface FacebookLoginButtonProps {
    redirect?: string;
}

export function FacebookLoginButton({
    redirect,
}: FacebookLoginButtonProps) {
    const navigate = useNavigate();

    const {
        mutate: handleFacebookLogin,
        isPending,
        error,
    } = useFacebookLogin();

    const handleLogin = () => {
        handleFacebookLogin(undefined, {
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
        <div className="w-full">
            <Button
                variant="outline"
                onClick={handleLogin}
                disabled={isPending}
                className="w-full cursor-pointer relative"
            >
                {/* 
                  * Accessibility Note: We hide the label contents from screen readers 
                  * when pending, or keep the button structure stable to avoid layout jank. 
                  */}
                <span
                    className={`inline-flex items-center justify-center transition-opacity duration-200 ${
                        isPending ? "opacity-0" : "opacity-100"
                    }`}
                >
                    <FaFacebookF className="h-4 w-4 mr-2" />
                    Continue with Facebook
                </span>

                {isPending && (
                    <span className="absolute inset-0 flex items-center justify-center gap-2">
                        <Spinner className="h-4 w-4" />
                        <span>Logging in...</span>
                    </span>
                )}
            </Button>

            {error && (
                <p role="alert" className="text-sm text-destructive mt-2">
                    {error.message}
                </p>
            )}
        </div>
    );
}