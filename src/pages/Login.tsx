import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img from "../assets/image/0ad05ce9939f87dbabaf4cfa418bffcd.jpg";
import img2 from "../assets/image/8vcd3pqDp1KisfIf62HgmbUxUQ_wyPH3sPBldtbTt2bsJOtN-d0uvdl0rZY8lEXM_KTYWvJpR96Lr2K433B_Ig1H40ItLbWfHfDyNAMoGqsrgPRkc3H-T4mrTYcBx15BBiYbx3FC_ZnFAaWbl09U3guAEW3tRzKNMXvF1QNpwa7I9aLCSVP-vFEa72mVPbAt.jpg";
import img3 from "../assets/image/f5r5JbkkNjnS1_S9dq9iH9qHlBdF6UfNhA0RiaXh8lekGPTex0DY7bzLZFDvzglO6fu0FqrvtEJ0XVWd3-8kd_Gnhp-HcjpnK0DLcbjseS0ZDoyafJcOJToDCAlg9_NNZ8zmFA4N58cWkDydZ2FujH3spz0gAa9QLXqTmq2r1GTPkFvITmC0OWhMOmVCrg-D.jpg";
import img4 from "../assets/image/ha-lHmne5MVg3k4_ozGpyuZwWAHPd0yBeckmk2rLYBH0YTTvn6gcsjPOlo4Gw7kKDIBrxCX_hJh3f23sUkY2QwQiD3dACWNJthcP-KhX4B6uesiPQymnx74wDnm8edJFfNWelSbLYmhtCcP-LANm6-h5Tsw72ToP0LtU8VSe5iDcKCQulMwc3V1SgVwivi67.jpg";
import img5 from "../assets/image/o6CA4S7yhzH8YnoIOIWJmkRo_LhUB9RKSZYvZNFlKCQvmQ6iwVfiJAeLCR1wllGSewMU4HOZog8L3BfdVF_FIp-J08ILeD7OATyO-E-h0pxGKBNQw9ltGtrUtosQfKClxTvikOj74_vVMjDVwCbL4dxFT_vt4t4cCb-I9BBXzqXiq8XoHfntaSj1Gz32v8c3.jpg";
import img6 from "../assets/image/yGtI_yUCSumYNBzU1Cgdz541hcX1-7atP0c836mS4-YcDFW5ZZrrjsDKy_a_RhNytSXf6kCrYtngh-8KsMHiVWqX-qKnPcXUL8nAewOZZzjoe2m6HE_3ACbE3vDifQnfp4OuCHDazoPMYhENpnF4Y-j9QYuHV9nEkr4tsyvWV-ZLvSPNZzVHa-jfrmUm8kdC.jpg";
import { Button } from "@/components/ui/button";

interface ListingItem {
  image: string;
  title: string;
  description: string;
}

const listingItems: ListingItem[] = [
  {
    image: img,
    title: "Find Your Perfect Stay",
    description:
      "Discover beautiful homes and comfortable spaces that make every trip feel like home.",
  },
  {
    image: img2,
    title: "Feel at Home Anywhere",
    description:
      "Explore unique places to stay and enjoy comfort, convenience, and memorable experiences.",
  },
  {
    image: img3,
    title: "Discover Your Next Destination",
    description:
      "From peaceful retreats to vibrant city apartments, find a place that fits your journey.",
  },
  {
    image: img4,
    title: "Stay Somewhere Special",
    description:
      "Make every journey memorable with welcoming spaces and stays tailored to your needs.",
  },
  {
    image: img5,
    title: "Your Journey Starts Here",
    description:
      "Find a place you love, plan your next adventure, and make yourself at home.",
  },
  {
    image: img6,
    title: "A Better Way to Stay",
    description:
      "Explore available properties and find the right space for your next getaway.",
  },
];

const SLIDER_DURATION = 5000;

export default function Login() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const currentItem = listingItems[currentIndex];

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timerId = window.setTimeout(() => {
      setCurrentIndex(
        (previousIndex) => (previousIndex + 1) % listingItems.length,
      );
    }, SLIDER_DURATION);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [currentIndex, isPaused]);

  const handleNext = (): void => {
    setCurrentIndex(
      (previousIndex) => (previousIndex + 1) % listingItems.length,
    );
  };

  const handlePrevious = (): void => {
    setCurrentIndex(
      (previousIndex) =>
        (previousIndex - 1 + listingItems.length) % listingItems.length,
    );
  };

  return (
    <main className="min-h-screen h-auto w-full bg-[#fbfbfb] p-4 text-[#222222]">
      <Helmet>
        <title>Log In | Lokestays</title>
        <meta
          name="description"
          content="Log in to your Lokestays account to manage your bookings and discover places to stay."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div
        className="mx-auto grid h-auto w-full max-w-6xl grid-cols-1
          overflow-hidden rounded-3xl bg-white p-4
          lg:h-[700px] lg:grid-cols-2"
      >
        {/* Left side: Image carousel */}
        <section
          aria-label="Discover places to stay"
          aria-roledescription="carousel"
          className="relative flex min-h-[500px] flex-col overflow-hidden rounded-xl lg:min-h-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
        >
          {/* Background image */}
          <img
            key={currentItem.image}
            src={currentItem.image}
            alt=""
            fetchPriority={currentIndex === 0 ? "high" : "auto"}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Gradient overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/80
             via-black/20 to-transparent"
          />

          {/* Slide content */}
          <div
            className="relative z-10 mt-auto p-5 text-white sm:p-8"
            aria-live="off"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-green-300">
              Lokestays
            </p>

            <h1
              key={currentItem.title}
              className="text-2xl font-bold leading-tight sm:text-3xl"
            >
              {currentItem.title}
            </h1>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/90 sm:text-base">
              {currentItem.description}
            </p>

            {/* Progress indicators and navigation */}
            <div className="mt-8 flex items-center gap-4">
              {/* Progress lines */}
              <div
                className="flex flex-1 items-center gap-2"
                role="group"
                aria-label={`Slide ${currentIndex + 1} of ${listingItems.length}`}
              >
                {listingItems.map((item, index) => (
                  <div
                    key={item.image}
                    className="h-1 flex-1 overflow-hidden rounded-full bg-white/40"
                  >
                    <div
                      key={`${currentIndex}-${index}`}
                      className={`h-full rounded-full ${
                        index === currentIndex
                          ? isPaused
                            ? "w-0 bg-green-500"
                            : "animate-progress-fill bg-green-500"
                          : index < currentIndex
                            ? "w-full bg-green-500"
                            : "w-0 bg-green-500"
                      }`}
                      style={
                        index === currentIndex && isPaused
                          ? { width: "0%" }
                          : undefined
                      }
                    />
                  </div>
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handlePrevious}
                  aria-label="Previous slide"
                  className="rounded-full border-white/60 bg-transparent text-white hover:bg-white hover:text-black"
                >
                  <ChevronLeft aria-hidden="true" size={20} />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="rounded-full border-white/60 bg-transparent text-white hover:bg-white hover:text-black"
                >
                  <ChevronRight aria-hidden="true" size={20} />
                </Button>
              </div>
            </div>

            {/* Current slide counter */}
            <p className="mt-4 text-xs text-white/75">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(listingItems.length).padStart(2, "0")}
            </p>
          </div>
        </section>

        {/* Right side: Login form */}
        <section className="flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-[#222222]">
              Welcome back
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Log in to your Lokestays account to continue.
            </p>

            {/* Add your existing login form here. */}
          </div>
        </section>
      </div>
    </main>
  );
}
