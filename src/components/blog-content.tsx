import { useEffect, useRef } from "react"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"

/**
 * Renders TipTap HTML with styled inline `<code>`, fenced `<pre><code>` blocks
 * (dark theme + language label + copy button), and syntax highlighting via highlight.js.
 */
export function BlogContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const pres = root.querySelectorAll("pre")
    pres.forEach((pre) => {
      if (pre.dataset.enhanced === "1") return
      pre.dataset.enhanced = "1"

      const codeEl = pre.querySelector("code") as HTMLElement | null
      // Detect language from class like `language-js` or TipTap's `language-javascript`
      let lang = ""
      if (codeEl) {
        const m = (codeEl.className || "").match(/language-([\w-]+)/i)
        if (m) lang = m[1]
        try {
          hljs.highlightElement(codeEl)
          // hljs may have detected the language
          if (!lang) {
            const m2 = (codeEl.className || "").match(/language-([\w-]+)/i)
            if (m2) lang = m2[1]
          }
        } catch {}
      }

      // Build top bar
      const bar = document.createElement("div")
      bar.className = "code-block-bar"
      const label = document.createElement("span")
      label.className = "code-block-lang"
      label.textContent = lang || ""
      const btn = document.createElement("button")
      btn.type = "button"
      btn.className = "code-block-copy"
      btn.textContent = "Copy"
      btn.addEventListener("click", async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const text = codeEl?.innerText || pre.innerText || ""
        try {
          await navigator.clipboard.writeText(text)
          btn.textContent = "Copied!"
          setTimeout(() => (btn.textContent = "Copy"), 1500)
        } catch {
          btn.textContent = "Failed"
          setTimeout(() => (btn.textContent = "Copy"), 1500)
        }
      })
      bar.appendChild(label)
      bar.appendChild(btn)

      // Wrap pre in a styled container
      const wrap = document.createElement("div")
      wrap.className = "code-block-wrap"
      pre.parentNode?.insertBefore(wrap, pre)
      wrap.appendChild(bar)
      wrap.appendChild(pre)
    })
  }, [html])

  return (
    <div
      ref={ref}
      className="blog-content prose prose-lg max-w-none prose-headings:font-serif prose-a:text-[#E6007E] prose-img:rounded-xl"
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  )
}
