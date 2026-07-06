import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const TITLE = "Privacy Policy | Shubhashree IVF Clinic";
const DESC = "How Shubhashree IVF Clinic collects, uses and protects your personal and medical information.";
const URL = "https://shubhashreeivf.com/privacy-policy";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
});

function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "80px 5% 60px" }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#8B0F50", marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: "#6B6B8A", marginBottom: 32 }}>Last updated: {new Date().getFullYear()}</p>

        <div style={{ color: "#2D0A1E", lineHeight: 1.75, fontSize: 15 }}>
          <p>Shubhashree IVF Clinic ("we", "us", "our") is committed to protecting the privacy of patients and visitors who use our website and services. This policy explains what information we collect, how we use it and the choices you have.</p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#8B0F50", marginTop: 28, marginBottom: 10 }}>Information We Collect</h2>
          <p>We may collect personal details you provide when booking an appointment, contacting us or submitting a form, including name, phone number, email address and information about your medical enquiry. Basic usage data (browser type, pages visited) may also be collected automatically.</p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#8B0F50", marginTop: 28, marginBottom: 10 }}>How We Use Information</h2>
          <p>Information is used to schedule and deliver clinical care, respond to enquiries, improve our services and comply with legal and medical record-keeping obligations. Medical information is kept confidential and shared only with treating clinicians and staff involved in your care.</p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#8B0F50", marginTop: 28, marginBottom: 10 }}>Sharing of Information</h2>
          <p>We do not sell your personal information. Data may be shared with laboratories, referral partners or regulatory authorities strictly where necessary for your care or as required by law.</p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#8B0F50", marginTop: 28, marginBottom: 10 }}>Data Security</h2>
          <p>We apply reasonable technical and organisational measures to protect information under our control. No method of transmission over the internet is completely secure.</p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#8B0F50", marginTop: 28, marginBottom: 10 }}>Your Choices</h2>
          <p>You may request access to, correction of, or deletion of your personal data by contacting us. Certain records may be retained where required by medical or legal obligations.</p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#8B0F50", marginTop: 28, marginBottom: 10 }}>Contact</h2>
          <p>Shubhashree IVF Clinic, Soltimode, Kathmandu 44600, Nepal.<br />
          Phone: +977-1-5312007, +977-9861141699<br />
          Email: subhashreeivfclinic@gmail.com</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
