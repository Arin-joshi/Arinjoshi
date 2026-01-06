import React, { useState } from 'react';
import { PERSONAL_INFO } from '../constants';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Youtube,
  Instagram,
  ArrowUp
} from 'lucide-react';

const Contact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);

        setTimeout(() => {
          setIsOpen(false);
          setSuccess(false);
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= FOOTER ================= */}
      <footer
        id="contact"
        className="bg-slate-950 border-t border-slate-800 pt-16 pb-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* LEFT */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-6">
                Let's work together.
              </h2>

              <p className="text-slate-400 text-lg max-w-md mb-8">
                I'm currently available for freelance work or full-time positions.
                If you have a project that needs some React magic, I’d love to hear from you.
              </p>

              <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
              >
                Send Email
              </button>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">

              {/* CONTACT INFO */}
              <div>
                <h3 className="text-white font-semibold mb-4 text-lg">
                  Contact Info
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-400">
                    <Mail size={18} className="text-violet-500" />
                    {PERSONAL_INFO.email}
                  </li>

                  <li className="flex items-center gap-3 text-slate-400">
                    <Phone size={18} className="text-violet-500" />
                    {PERSONAL_INFO.phone}
                  </li>

                  <li className="flex items-center gap-3 text-slate-400">
                    <MapPin size={18} className="text-violet-500" />
                    {PERSONAL_INFO.location}
                  </li>
                </ul>
              </div>

              {/* SOCIALS */}
              <div>
                <h3 className="text-white font-semibold mb-4 text-lg">
                  Socials
                </h3>

                <div className="flex flex-col gap-3">
                  <a
                    href="https://www.youtube.com/@ArinJoshi"
                    target="_blank"
                    className="flex items-center gap-3 text-slate-400 hover:text-white group"
                  >
                    <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-red-600 transition-colors">
                      <Youtube size={20} />
                    </div>
                    YouTube
                  </a>

                  <a
                    href="https://www.linkedin.com/in/arinjoshi/"
                    target="_blank"
                    className="flex items-center gap-3 text-slate-400 hover:text-white group"
                  >
                    <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
                      <Linkedin size={20} />
                    </div>
                    LinkedIn
                  </a>

                  <a
                    href="https://www.instagram.com/click_by_arin/"
                    target="_blank"
                    className="flex items-center gap-3 text-slate-400 hover:text-white group"
                  >
                    <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-pink-600 transition-colors">
                      <Instagram size={20} />
                    </div>
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER BOTTOM */}
          <div className="border-t border-slate-900 pt-8 flex items-center justify-between">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
            </p>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3 bg-slate-900 border border-slate-800 rounded-full text-violet-500"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </footer>

      {/* ================= MODAL ================= */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-6 relative animate-fade-in">

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-2xl font-semibold text-white mb-4">
              Send me a message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="access_key" value="bd82c972-b151-4beb-9247-261d9ef155a7" />
              <input type="hidden" name="subject" value="New Portfolio Contact" />

              {!success ? (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />

                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Your Message"
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-medium disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </>
              ) : (
                <div className="text-center py-10">
                  <h4 className="text-green-500 text-xl font-semibold">
                    ✅ Message Sent!
                  </h4>
                  <p className="text-slate-400 mt-2">
                    I’ll get back to you soon.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
