
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { FloatingDecoField } from "@/components/floating-deco"

const faqs = [
  {
    question: "What is infertility?",
    answer: "Infertility is defined as the inability to conceive after one year of regular, unprotected intercourse. For women over 35, this timeframe is reduced to six months. It can affect both men and women and may be caused by various factors including hormonal imbalances, structural problems, or lifestyle factors.",
  },
  {
    question: "Is infertility primarily a woman's problem?",
    answer: "No, infertility affects both men and women equally. About one-third of infertility cases are attributed to female factors, one-third to male factors, and the remaining third to a combination of both or unexplained causes. Both partners should be evaluated when experiencing fertility issues.",
  },
  {
    question: "Does age affect fertility?",
    answer: "Yes, age significantly affects fertility, particularly for women. Female fertility begins to decline gradually after age 30 and more rapidly after 35. This is due to a decrease in both the quantity and quality of eggs. Men's fertility also declines with age, though more gradually, with sperm quality decreasing after age 40.",
  },
  {
    question: "What is the IVF process?",
    answer: "IVF (In Vitro Fertilization) involves several steps: First, ovarian stimulation with hormones to produce multiple eggs. Then, egg retrieval through a minor procedure. The eggs are fertilized with sperm in our laboratory. The resulting embryos are monitored for development, and the best quality embryo(s) are transferred to the uterus. Any remaining healthy embryos can be frozen for future use.",
  },
  {
    question: "How many IVF cycles are usually needed?",
    answer: "The number of IVF cycles needed varies for each couple depending on factors like age, cause of infertility, and overall health. Many couples achieve success within 2-3 cycles. At Shubhashree IVF, our 75% success rate reflects our commitment to personalized treatment plans that maximize your chances of conception.",
  },
  {
    question: "What is the cost of IVF at Shubhashree IVF?",
    answer: "The cost of IVF varies depending on the specific treatment plan, medications required, and any additional procedures needed. We offer transparent pricing and flexible payment options. Please contact our team for a detailed consultation where we can provide a personalized cost estimate based on your specific needs.",
  },
]

function FAQItem({ 
  faq, 
  isOpen, 
  onToggle, 
  index 
}: { 
  faq: typeof faqs[0]
  isOpen: boolean
  onToggle: () => void
  index: number 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-plum/10 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="font-serif text-lg font-semibold text-plum pr-8 group-hover:text-rose transition-colors">
          {faq.question}
        </span>
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose/10 flex items-center justify-center text-rose transition-colors group-hover:bg-rose group-hover:text-white">
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground leading-relaxed pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <FloatingDecoField
        items={[
          { shape: "hollow-circle", color: "rose", size: 38, top: "10%", left: "5%", floatDuration: 8, rotateDuration: 22, delay: 0 },
          { shape: "dashed-ring", color: "teal", size: 46, top: "65%", right: "6%", floatDuration: 9, rotateDuration: 24, delay: -3 },
          { shape: "plus", color: "gold", size: 20, top: "35%", right: "10%", floatDuration: 7, rotateDuration: 19, delay: -2 },
          { shape: "square", color: "rose", size: 18, top: "85%", left: "12%", floatDuration: 6, rotateDuration: 18, delay: -4 },
          { shape: "lines", color: "teal", size: 24, top: "50%", left: "8%", floatDuration: 8, rotateDuration: 21, delay: -1 },
        ]}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-rose">
            FAQs
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-plum mt-4">
            Answers to Your Fertility Questions
          </h2>
        </motion.div>

        {/* FAQ List */}
        <div className="bg-cream rounded-2xl px-6 lg:px-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
