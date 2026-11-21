import { Button } from "@/components/ui/button";
import { useFacebookLogin } from "../hooks/useFacebookLogin";
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
        <div className="flex flex-col items-center">
            <Button
                variant="outline"
                onClick={handleLogin}
                disabled={isPending}
                className="cursor-pointer w-12 h-12">
                <FaFacebookF size={32} />
            </Button>
             {error && (
                <p role="alert" className="text-sm text-destructive mt-2">
                    {error.message}
                </p>
            )}
        </div>
    );
}