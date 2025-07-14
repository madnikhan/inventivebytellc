export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-black px-10 py-20 space-y-10">
      <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-8 tracking-tight">About InventiveByte LLC</h1>
      <section className="max-w-2xl text-center text-xl md:text-2xl leading-relaxed mb-8">
        <p>
          InventiveByte LLC was founded in 2025 in Montana, USA, with one vision: to build and manage multiple future-focused brands under a single, flexible parent structure.
        </p>
      </section>
      <section className="max-w-2xl text-center text-lg md:text-xl leading-relaxed mb-8">
        <h2 className="text-2xl font-bold mb-2 tracking-tight">Our Mission</h2>
        <p>
          Our mission is to launch innovative SaaS platforms, useful online tools, and smart recruitment solutions that deliver real value for clients worldwide.
        </p>
      </section>
      <section className="max-w-2xl text-center text-lg md:text-xl leading-relaxed">
        <h2 className="text-2xl font-bold mb-2 tracking-tight">Where We Work</h2>
        <p>
          InventiveByte LLC is registered in Montana and works with partners and clients around the world.
        </p>
      </section>
      <section className="w-full max-w-2xl mt-16">
        <h2 className="text-3xl font-extrabold text-center mb-8 tracking-tight">A Note from the Founder</h2>
        <div className="bg-white/60 backdrop-blur-md rounded-lg p-8 shadow text-lg leading-relaxed text-center">
          <p>
            &ldquo;InventiveByte LLC is just getting started, but our vision is bold: to launch and grow innovative SaaS brands and digital products from Montana to the world. If you&rsquo;re interested in partnering, collaborating, or joining our journey, I&rsquo;d love to connect.&rdquo;
          </p>
          <div className="mt-6 text-gray-700 font-semibold">— Muhammad Madni, Founder</div>
        </div>
      </section>
    </main>
  );
} 