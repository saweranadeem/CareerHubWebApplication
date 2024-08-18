import React from "react";
import { FaUserShield, FaShieldAlt, FaDatabase, FaLink, FaSyncAlt } from "react-icons/fa";
import Nav from "../Components/Home/Nav"
import Footer from "../Components/Home/Footer"

const PrivacyPolicy = () => {
  return (
    <div>
         <Nav />
        <div className=" text-white min-h-screen mt-16 mb-20 p-8">
      <div className="max-w-5xl mx-auto bg-white text-gray-900 shadow-2xl rounded-lg overflow-hidden">
        <div className="p-5">
          <h1 className="text-3xl font-bold text-orange-400 text-center">Privacy Policy</h1>
          <p className="text-center mt-2 text-primary text-base">Your privacy is important to us.</p>
        </div>

        <div className="px-8 pt-4 space-y-8">
          {/* Information We Collect */}
          <section className="flex items-start space-x-3">
            <FaUserShield className="text-primary text-xl" />
            <div>
              <h2 className="text-xl font-semibold text-primary">1. Information We Collect</h2>
              <ul className="list-square ml-6  py-2 space-y-1 text-sm">
                <li>
                  <strong>Personal Information:</strong> This includes your name, email, contact details, resume, educational background, and other career-related information.
                </li>
                <li>
                  <strong>Usage Data:</strong> We collect information about how you interact with our platform, including pages visited and time spent.
                </li>
                <li>
                  <strong>Cookies:</strong> We use cookies to enhance your experience. You can manage your cookie preferences in your browser settings.
                </li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="flex items-start space-x-3">
            <FaShieldAlt className="text-primary text-xl" />
            <div>
              <h2 className="text-xl font-semibold text-primary">2. How We Use Your Information</h2>
              <ul className="list-square ml-6 py-2 space-y-1 text-sm">
                <li>(i)   Help you find jobs, access career counseling, and take skill development courses.</li>
                <li>(ii) Tailor content, job recommendations, and resources to your needs.</li>
                <li>(iii) Send updates and notifications related to CareerHub.</li>
                <li>(iv) Analyze usage to enhance our services.</li>
              </ul>
            </div>
          </section>

          {/* Sharing Your Information */}
          <section className="flex items-start space-x-3">
            <FaDatabase className="text-primary text-xl" />
            <div>
              <h2 className="text-xl font-semibold text-primary">3. Sharing Your Information</h2>
              <ul className="list-square ml-6  py-2 space-y-1 text-sm">
                <li>(i) With employers when you apply for jobs through CareerHub.</li>
                <li>(ii) With third-party service providers that help us operate our platform.</li>
                <li>(iii) If required by law.</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section className="flex items-start space-x-3">
            <FaSyncAlt className="text-primary text-xl" />
            <div>
              <h2 className="text-xl font-semibold text-primary">4. Data Security</h2>
              <p className="mt-2 text-sm">
                We implement measures to protect your information, but please note that no method of transmission over the internet is completely secure.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section className="flex items-start space-x-3">
            <FaLink className="text-primary text-xl" />
            <div>
              <h2 className="text-xl font-semibold text-primary">5. Your Rights</h2>
              <ul className="list-square ml-6 py-2 space-y-1 text-sm">
                <li>(i) Access and update your personal information through your account settings.</li>
                <li>(ii) Request deletion of your account and data, subject to legal requirements.</li>
                <li>(iii) Unsubscribe from marketing communications.</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Links */}
          <section className="flex items-start space-x-3">
            <FaLink className="text-primary text-xl" />
            <div>
              <h2 className="text-xl font-semibold text-primary">6. Third-Party Links</h2>
              <p className="mt-2 text-sm">
                CareerHub may link to third-party websites. We are not responsible for their privacy practices, and we encourage you to review their policies.
              </p>
            </div>
          </section>

          {/* Changes to This Policy */}
          <section className="flex items-start space-x-3">
            <FaSyncAlt className="text-primary text-xl" />
            <div>
              <h2 className="text-xl font-semibold text-primary">7. Changes to This Policy</h2>
              <p className="mt-2 mb-6 text-sm">
                We may update this Privacy Policy. We'll notify you of significant changes by posting the new policy on our site.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default PrivacyPolicy;
