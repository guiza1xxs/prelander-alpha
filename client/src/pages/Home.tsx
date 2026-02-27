import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

/**
 * Design Philosophy: High-Conversion Pre-Lander
 * - Glassmorphism card with video background blur
 * - Progressive quiz with smooth transitions
 * - Mobile-first responsive design
 * - Emerald green CTA buttons for maximum conversion
 * - Dark overlay to ensure text readability
 */

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle answer selection with smooth transition
  const handleAnswer = (nextStep: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(nextStep);
      setIsTransitioning(false);
    }, 300);
  };

  // Handle final submission - redirect to external URL
  const handleFinalSubmit = () => {
    window.location.href = "https://54lwi.bemobtrcks.com/click";
  };

  // Quiz questions configuration
  const questions = [
    {
      id: 0,
      title: "Você confirma que é maior de 18 anos?",
      type: "binary",
      buttons: [
        { label: "Não", action: () => handleAnswer(1) },
        { label: "Sim", action: () => handleAnswer(1) },
      ],
    },
    {
      id: 1,
      title: "Gostaria de maximizar sua performance e energia em até 3.5x?",
      type: "binary",
      buttons: [
        { label: "Não", action: () => handleAnswer(2) },
        { label: "Sim", action: () => handleAnswer(2) },
      ],
    },
    {
      id: 2,
      title: "Aceita receber o produto de forma 100% discreta e pagar apenas no ato da entrega em Portugal?",
      type: "final",
      buttons: [
        { label: "SIM, QUERO SABER MAIS", action: handleFinalSubmit },
      ],
    },
  ];

  const currentQuestion = questions[currentStep];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background with Blur and Dark Overlay */}
      <div className="absolute inset-0 w-full h-full">
        {/* Video Background */}
        <video
          autoPlay
          muted
          playsInline
          loop
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "blur(15px)",
          }}
        >
          <source
            src="/backgroundlander.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay (60% opacity) */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        {/* Glassmorphism Card */}
        <div
          className={`w-full max-w-md transform transition-all duration-300 ${
            isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <div className="bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white text-center leading-tight">
                {currentQuestion.title}
              </h1>
            </div>

            {/* Progress Indicator */}
            <div className="mb-8 flex gap-2 justify-center">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index <= currentStep
                      ? "bg-emerald-500 w-8"
                      : "bg-white/20 w-6"
                  }`}
                />
              ))}
            </div>

            {/* Buttons Container */}
            <div className="flex flex-col gap-4 sm:gap-5">
              {currentQuestion.buttons.map((button, index) => (
                <Button
                  key={index}
                  onClick={button.action}
                  className={`
                    w-full py-3 sm:py-4 px-6 rounded-lg font-semibold text-base sm:text-lg
                    transition-all duration-200 transform hover:scale-105 active:scale-95
                    ${
                      currentQuestion.type === "final"
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl"
                        : index === 1
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl"
                          : "bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                    }
                  `}
                >
                  {button.label}
                </Button>
              ))}
            </div>

            {/* Step Counter */}
            <div className="mt-8 text-center">
              <p className="text-white/70 text-sm sm:text-base">
                Etapa {currentStep + 1} de {questions.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-specific adjustments */}
      <style>{`
        @media (max-width: 640px) {
          body {
            font-size: 16px; /* Prevent zoom on iOS */
          }
        }

        /* Smooth transitions */
        * {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Ensure video background stays fixed */
        video {
          will-change: transform;
        }

        /* Prevent text selection on buttons for better UX */
        button {
          user-select: none;
          -webkit-user-select: none;
        }
      `}</style>
    </div>
  );
}
