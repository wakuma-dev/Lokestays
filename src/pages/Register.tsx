import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import img from "../assets/image/0ad05ce9939f87dbabaf4cfa418bffcd.jpg";
import img2 from "../assets/image/8vcd3pqDp1KisfIf62HgmbUxUQ_wyPH3sPBldtbTt2bsJOtN-d0uvdl0rZY8lEXM_KTYWvJpR96Lr2K433B_Ig1H40ItLbWfHfDyNAMoGqsrgPRkc3H-T4mrTYcBx15BBiYbx3FC_ZnFAaWbl09U3guAEW3tRzKNMXvF1QNpwa7I9aLCSVP-vFEa72mVPbAt.jpg";
import img3 from "../assets/image/f5r5JbkkNjnS1_S9dq9iH9qHlBdF6UfNhA0RiaXh8lekGPTex0DY7bzLZFDvzglO6fu0FqrvtEJ0XVWd3-8kd_Gnhp-HcjpnK0DLcbjseS0ZDoyafJcOJToDCAlg9_NNZ8zmFA4N58cWkDydZ2FujH3spz0gAa9QLXqTmq2r1GTPkFvITmC0OWhMOmVCrg-D.jpg";
import img4 from "../assets/image/ha-lHmne5MVg3k4_ozGpyuZwWAHPd0yBeckmk2rLYBH0YTTvn6gcsjPOlo4Gw7kKDIBrxCX_hJh3f23sUkY2QwQiD3dACWNJthcP-KhX4B6uesiPQymnx74wDnm8edJFfNWelSbLYmhtCcP-LANm6-h5Tsw72ToP0LtU8VSe5iDcKCQulMwc3V1SgVwivi67.jpg";
import img5 from "../assets/image/o6CA4S7yhzH8YnoIOIWJmkRo_LhUB9RKSZYvZNFlKCQvmQ6iwVfiJAeLCR1wllGSewMU4HOZog8L3BfdVF_FIp-J08ILeD7OATyO-E-h0pxGKBNQw9ltGtrUtosQfKClxTvikOj74_vVMjDVwCbL4dxFT_vt4t4cCb-I9BBXzqXiq8XoHfntaSj1Gz32v8c3.jpg";
import img6 from "../assets/image/yGtI_yUCSumYNBzU1Cgdz541hcX1-7atP0c836mS4-YcDFW5ZZrrjsDKy_a_RhNytSXf6kCrYtngh-8KsMHiVWqX-qKnPcXUL8nAewOZZzjoe2m6HE_3ACbE3vDifQnfp4OuCHDazoPMYhENpnF4Y-j9QYuHV9nEkr4tsyvWV-ZLvSPNZzVHa-jfrmUm8kdC.jpg";

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

const SLIDER_DURATION = 6000;
const BORDER_RADIUS = 16;

export default function Register() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const progressBorderRef = useRef<HTMLDivElement>(null);

  const currentItem = listingItems[currentIndex];

  useEffect(() => {
    const element = progressBorderRef.current;

    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;

      setDimensions({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timerId = window.setTimeout(() => {
      setCurrentIndex(
        (previousIndex) => (previousIndex + 1) % listingItems.length,
      );
    }, SLIDER_DURATION);

    return () => window.clearTimeout(timerId);
  }, [currentIndex, isPaused]);

  const handleNext = (): void => {
    setCurrentIndex(
      (previousIndex) => (previousIndex + 1) % listingItems.length,
    );
  };

  const handleBack = (): void => {
    setCurrentIndex(
      (previousIndex) =>
        (previousIndex - 1 + listingItems.length) % listingItems.length,
    );
  };

  const { width, height } = dimensions;

  const radius = Math.min(
    BORDER_RADIUS,
    width / 2,
    height / 2,
  );

  const borderPath =
    width > 0 && height > 0
      ? [
          `M 0 ${height - radius}`,
          `A ${radius} ${radius} 0 0 0 ${radius} ${height}`,
          `H ${width - radius}`,
          `A ${radius} ${radius} 0 0 0 ${width} ${height - radius}`,
        ].join(" ")
      : "";

  return (
    <main className="lg:bg-[#6D6E71] min-h-screen h-auto p-4 w-full">
      <Helmet>
        <title>Sign up - Lokestays</title>

        <meta
          name="description"
          content="Create your Lokestays account to discover houses, apartments, and comfortable places to stay. Join Lokestays and find your next stay with ease."
        />

        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div
        className="mx-auto w-full max-w-6xl bg-[#FBFBFB] p-4 
        overflow-hidden grid grid-cols-1 lg:grid-cols-2
          h-auto min-h-screen rounded-3xl"
      >
        <section
          aria-label="Discover places to stay"
          aria-roledescription="carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
          className="relative hidden lg:flex flex-col overflow-hidden rounded-xl min-h-0"
        >
          <img
            key={currentItem.image}
            src={currentItem.image}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          />

          <div
            aria-live="off"
            className="absolute inset-x-0 top-3 w-full"
          >
            <div className="max-w-[90%] w-full mx-auto flex flex-col gap-2.5">
              <h1 className="font-semibold text-white text-[32px] leading-[37px] tracking-tight font-sans">
                Find your <br />
                <span className="text-[#0F766E]">Perfect</span> Stay
              </h1>

              <div className="flex flex-col space-y-0.5">
                <p className="text-white font-normal tracking-normal text-[15px] leading-[20px]">
                  Discover beautiful houses, apartments and more
                </p>

                <p className="text-white font-normal tracking-normal text-[15px] leading-[20px]">
                  Book with confidence, stay with peace of mind.
                </p>
              </div>
            </div>
          </div>

          <div
            aria-live="off"
            className="absolute inset-x-0 w-full bottom-3"
          >
            <div
              ref={progressBorderRef}
              className="carousel-progress-border relative flex w-full max-w-[90%] mx-auto rounded-2xl items-start justify-between gap-3 border border-white p-4"
            >
              <div className="flex flex-col items-start space-y-2">
                <h2 className="font-serif text-[32px] leading-[37px] text-white tracking-normal">
                  {currentItem.title}
                </h2>

                <p className="text-white text-[15px] leading-[20px] tracking-normal">
                  {currentItem.description}
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleBack}
                  aria-label="Previous slide"
                  className="rounded-full border-white/60 bg-transparent text-white hover:bg-white cursor-pointer hover:text-black"
                >
                  <ChevronLeft aria-hidden="true" size={20} />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="rounded-full text-white border-white/60 bg-transparent cursor-pointer"
                >
                  <ChevronRight aria-hidden="true" size={20} />
                </Button>
              </div>

              {width > 0 && height > 0 && (
                <svg
                  key={currentItem.image}
                  aria-hidden="true"
                  className={`carousel-progress-track ${
                    isPaused ? "is-paused" : ""
                  }`}
                  viewBox={`0 0 ${width} ${height}`}
                  preserveAspectRatio="none"
                >
                  <path
                    className="carousel-progress-path"
                    d={borderPath}
                    pathLength="100"
                  />
                </svg>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


