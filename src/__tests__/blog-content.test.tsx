import { describe, it, expect, beforeEach } from "vitest";
import fs from "node:fs";
import path from "node:path";

const SAMPLE_HTML = `
  <h2>Heading Two</h2>
  <p>A <strong>paragraph</strong> with <em>emphasis</em> and a <a href="/x">link</a>.</p>
  <ul><li>one</li><li>two</li></ul>
  <blockquote>quoted</blockquote>
  <img src="/a.jpg" alt="alt" />
`;

describe("blog post content rendering", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders HTML as real DOM elements (no <pre>/<code> wrapping, no escaped text)", () => {
    // Mirrors the route: <div className="blog-content" dangerouslySetInnerHTML={{ __html: p.content }} />
    const root = document.createElement("div");
    root.className = "blog-content";
    root.innerHTML = SAMPLE_HTML;
    document.body.appendChild(root);

    expect(root.querySelector("h2")?.textContent).toBe("Heading Two");
    expect(root.querySelector("p strong")?.textContent).toBe("paragraph");
    expect(root.querySelectorAll("ul > li").length).toBe(2);
    expect(root.querySelector("blockquote")?.textContent).toBe("quoted");
    expect(root.querySelector("img")?.getAttribute("alt")).toBe("alt");

    // Must NOT be wrapped in <pre> or <code> (the raw-text rendering bug)
    expect(root.querySelector("pre")).toBeNull();
    expect(root.querySelector("code")).toBeNull();

    // HTML must not appear as escaped/literal text
    expect(root.textContent).not.toContain("<h2>");
    expect(root.textContent).not.toContain("</p>");
  });

  it("blog route source uses dangerouslySetInnerHTML on .blog-content (no pre/code wrap)", () => {
    const src = fs.readFileSync(
      path.resolve(__dirname, "../routes/blog.$slug.tsx"),
      "utf8",
    );
    expect(src).toMatch(/className=["']blog-content["']/);
    expect(src).toMatch(/dangerouslySetInnerHTML=\{\{\s*__html:\s*p\.content/);
    expect(src).not.toMatch(/<pre[^>]*>\s*\{?\s*p\.content/);
    expect(src).not.toMatch(/<code[^>]*>\s*\{?\s*p\.content/);
  });

  it("styles.css defines prose styles for .blog-content", () => {
    const css = fs.readFileSync(
      path.resolve(__dirname, "../styles.css"),
      "utf8",
    );
    for (const sel of [
      ".blog-content",
      ".blog-content h1",
      ".blog-content h2",
      ".blog-content h3",
      ".blog-content p",
      ".blog-content ul",
      ".blog-content ol",
      ".blog-content a",
      ".blog-content blockquote",
      ".blog-content img",
    ]) {
      expect(css, `missing selector ${sel}`).toContain(sel);
    }
  });
});
