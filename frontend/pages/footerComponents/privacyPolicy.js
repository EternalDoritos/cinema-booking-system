import Head from "next/head";

export default function PrivacyPolicyPage() {
  return (
    <div>
      <Head>
        <title>Privacy Policy - My Site</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className=" text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <p className="text-gray-300 mb-4">
          We take your privacy seriously. This privacy policy describes how we
          collect, use, and protect your personal information.
        </p>

        <h2 className="text-lg font-semibold mb-2">Information We Collect</h2>
        <p className="text-gray-300 mb-4">
          We may collect personal information such as your name, email address,
          and phone number when you fill out a contact form or sign up for our
          newsletter.
        </p>

        <h2 className="text-lg font-semibold mb-2">
          How We Use Your Information
        </h2>
        <p className="text-gray-300 mb-4">
          We may use your personal information to respond to your inquiries,
          send you newsletters, and improve our website and services.
        </p>

        <h2 className="text-lg font-semibold mb-2">Security</h2>
        <p className="text-gray-300 mb-4">
          We take appropriate measures to protect your personal information from
          unauthorized access, use, or disclosure.
        </p>

        <h2 className="text-lg font-semibold mb-2">Changes to This Policy</h2>
        <p className="text-gray-300 mb-4">
          We may update this privacy policy from time to time. Any changes will
          be posted on this page.
        </p>

        <p className="text-gray-300">
          If you have any questions about this privacy policy, please contact
          us.
        </p>
      </main>
    </div>
  );
}
