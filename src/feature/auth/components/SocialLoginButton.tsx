import { FacebookLoginButton } from "./FacebookLoginButton";
import { GoogleLoginButton } from "./GoogleLoginButton";
export function SocialLoginButton() {
    return (
        <div className="flex flex-col space-y-3 w-full">
            <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                </div>
                <span className="relative px-3 bg-background text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    or
                </span>
            </div>
            <div className="flex items-center justify-center gap-2">
                <GoogleLoginButton />
                <FacebookLoginButton />
            </div>
        </div>
    );
}