"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Play } from "lucide-react"

const testimonials = [
  {
    quote: "After four failed attempts elsewhere, Subhashree IVF gave us hope again. Their expertise and compassion made all the difference. Today, we are proud parents of a beautiful baby girl.",
    name: "Sita M.",
    location: "Kathmandu",
    image: "https://placehold.co/80x80/FFE4EC/C2185B?text=SM",
  },
  {
    quote: "We came from India specifically and conceived on the very first try! The team's professionalism and the advanced facilities exceeded our expectations. Highly recommended!",
    name: "Ramesh & Priya",
    location: "New Delhi",
    image: "https://placehold.co/80x80/E0F2F1/00897B?text=RP",
  },
  {
    quote: "At 42, I had almost given up on becoming a mother. Their donor programme gave me twins. The joy they've brought into my life is immeasurable. Thank you, Subhashree IVF!",
    name: "Maya K.",
    location: "Lalitpur",
    image: "https://placehold.co/80x80/FFF8E1/F9A825?text=MK",
  },
  {
    quote: "The team treats you like family. From the first consultation to holding our baby, they were with us every step. Forever grateful for making our dream come true.",
    name: "Nirmal & Rita",
    location: "Pokhara",
    image: "https://placehold.co/80x80/FFE4EC/C2185B?text=NR",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section id="testimonials" ref={ref} className="py-20 lg:py-32 bg-cream overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-rose">
            Success Stories
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-plum mt-4">
            Voices of Our Valued Patients
          </h2>
        </motion.div>

        {/* Testimonial slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg"
              >
                {/* Quote mark */}
                <div className="font-serif text-6xl text-rose/20 leading-none mb-4">
                  &ldquo;
                </div>

                {/* Quote text */}
                <blockquote className="font-serif text-xl lg:text-2xl text-plum italic leading-relaxed mb-8">
                  {testimonials[currentIndex].quote}
                </blockquote>

                {/* Author info */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-plum">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].location}
                      </div>
                    </div>
                  </div>

                  {/* Star rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>
                </div>

                {/* Video thumbnail */}
                <div className="mt-8 rounded-xl overflow-hidden relative group cursor-pointer max-w-xs">
                  <img
                    src={`https://placehold.co/300x200/2D1B35/FFFFFF?text=Video+Testimonial`}
                    alt="Watch video testimonial"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center transition-transform group-hover:scale-110">
                      <Play className="w-5 h-5 text-rose fill-rose ml-0.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrev}
              className="w-10 h-10 rounded-full border border-plum/20 flex items-center justify-center text-plum hover:bg-plum hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex 
                      ? "bg-rose w-8" 
                      : "bg-plum/20 hover:bg-plum/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full border border-plum/20 flex items-center justify-center text-plum hover:bg-plum hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
