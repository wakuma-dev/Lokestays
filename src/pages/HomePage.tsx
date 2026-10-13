import { Helmet }  from "react-helmet-async"
import { useState } from "react";
export default function HomePage(){
    const [isAccepted, setIsAccepted] = useState(false);
    return(
      <main
       className="w-full md:pt-35 p-4 h-auto min-h-screen bg-white text-black">
          <Helmet>
            <title>Lokestays | houses, apartments & more</title>
            <meta 
                  name="description"
                  content="Discover your perfect stay with lokestays" 
                  />
        </Helmet>
      <h1>home</h1>
      <div
        role="checkbox"
        aria-checked={isAccepted}
        aria-labelledby="terms-label"
        tabIndex={0}
        onClick={() => setIsAccepted((previous) => !previous)}
        onKeyDown={(event) => {
          if (event.key === " ") {
            event.preventDefault();
            setIsAccepted((previous) => !previous);
          }
        }}
        className="mt-1 h-4 w-4 cursor-pointer rounded border border-gray-400"
      >
        {isAccepted && ""}
      </div>

      <label id="terms-label" className="text-sm">
        I accept the{" "}
        <a href="/terms" className="text-teal-700 underline">
          Terms and Conditions
        </a>{" "}
        and{" "}
        <a href="/privacy" className="text-teal-700 underline">
          Privacy Policy
        </a>
        .
      </label>
      </main>
      
    )
}