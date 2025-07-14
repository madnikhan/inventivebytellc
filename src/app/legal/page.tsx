export default function LegalPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-black px-6 py-20">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-10">Privacy & Legal</h1>
      <section className="max-w-2xl w-full mb-10 bg-white/60 backdrop-blur-md rounded-2xl shadow p-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <p className="text-lg text-gray-700 mb-6">
          This is a placeholder for your privacy policy. Here you can explain how you collect, use, and protect user data. Update this section to match your real privacy practices and legal requirements.
        </p>
      </section>
      <section className="max-w-2xl w-full bg-white/60 backdrop-blur-md rounded-2xl shadow p-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Legal Notice</h2>
        <p className="text-lg text-gray-700">
          This is a placeholder for your legal notice. Add your company registration details, disclaimers, and any other required legal information here.
        </p>
      </section>
    </main>
  );
} 