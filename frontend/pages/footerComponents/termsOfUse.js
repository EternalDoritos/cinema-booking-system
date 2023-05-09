import Head from "next/head";

export default function TermsOfUsePage() {
  return (
    <div>
      <Head>
        <title>Terms of Use</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className=" text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Terms of Use</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <p className="text-gray-300 mb-4 text-center">
          By using this website, you agree to the following terms and
          conditions:
        </p>

        <ul className="list-disc list-inside mb-4 text-center">
          <li>
            You may use this website for personal and non-commercial purposes
            only.
          </li>
          <li>
            You may not copy, modify, distribute, or sell any content from this
            website.
          </li>
          <li>
            We reserve the right to modify or terminate this website at any
            time.
          </li>
          <li>
            We are not responsible for any damages or loss caused by your use of
            this website.
          </li>
          <li>
            These terms and conditions are governed by the laws of [your country
            or state].
          </li>
        </ul>

        <p className="text-gray-300 mb-4 text-center">
          If you do not agree to these terms and conditions, you should not use
          this website.
        </p>
      </main>
    </div>
  );
}
