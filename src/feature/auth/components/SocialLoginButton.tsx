import { FacebookLoginButton } from "./FacebookLoginButton";
import { GoogleLoginButton } from "./GoogleLoginButton";

export function SocialLoginButton() {
    return (
        <div className="flex flex-col space-y-4 w-full">
            {/* Semantic & Visually Rendered Divider */}
            <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                </div>
                <span className="relative px-3 bg-background text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Or continue with
                </span>
            </div>

            {/* Responsive Action Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                <GoogleLoginButton />
                <FacebookLoginButton />
            </div>
        </div>
    );
}