import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", text: "Please complete all fields." });
      return;
    }
    setStatus({
      type: "success",
      text: "Thanks! Your message was sent (demo).",
    });
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section id="contact" className="py-16">
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <p className="mt-2 text-textPrimary">
            Reach out via email or connect on GitHub Or use the form below.
          </p>

          <p className="text-textPrimary">
            Email: <span className="text-white">dev.adrian0508@gmail.com</span>
          </p>
          <p className="text-textPrimary">
            GitHub:{" "}
            <a className="text-white" href="https://github.com/AdrianVi-AD">
              github.com/AdrianVi
            </a>
          </p>
          <p className="text-textPrimary">
            LinkedIn:{" "}
            <a
              className="text-white"
              href="https://www.linkedin.com/in/adrian-villacarlos-707bab30a"
            >
              linkedin.com/in/Adrian-Villacarlos
            </a>
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-3 bg-primary/50 border border-secondary/20 p-6 rounded-xl shadow-lg backdrop-blur-md transition duration-500 hover:scale-[1.01] hover:shadow-2xl"
        >
          {status && (
            <div
              className={`px-3 py-2 rounded-md ${status.type === "error" ? "bg-red-700 text-white" : "bg-green-700 text-white"}`}
            >
              {status.text}
            </div>
          )}

          <div>
            <label className="block required text-sm text-textPrimary">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-md bg-primary/40 border border-primary/100 text-textPrimary"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block required text-sm text-textPrimary">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-md bg-primary/40 border border-primary/30 text-textPrimary"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block required text-sm text-textPrimary">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-md bg-primary/40 border border-primary/30 text-textPrimary"
              rows="4"
              placeholder="Message"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-secondary text-white rounded-md"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
