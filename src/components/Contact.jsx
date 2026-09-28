import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        PUBLIC_KEY,
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Let's Connect
        </h2>
        <p className="text-textPrimary mt-3">
          Feel free to reach out through any of the platforms below.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {" "}
        <a
          href="https://github.com/AdrianVi-AD"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gray-800 text-white rounded-xl shadow hover:opacity-90 transition w-56 text-center"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/adrian-villacarlos-707bab30a"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:opacity-90 transition w-56 text-center"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
