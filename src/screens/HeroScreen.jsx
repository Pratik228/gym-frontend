function HeroScreen() {
  return (
    <div className="container mx-auto py-8 flex-grow">
      <h1 className="text-5xl font-bold mb-4">Elegance, Simplified.</h1>
      <h2 className="text-3xl mb-6">
        Introducing MinimalAura - Your New Haven of Minimalist Fashion
      </h2>
      <p className="mb-8 text-lg">
        Step into a world where fashion meets simplicity. At MinimalAura...
      </p>

      <div className="grid grid-cols-3 gap-8 mb-16">
        <img
          src="/img/1.jpeg"
          alt="Placeholder Image 1"
          className="rounded shadow-lg"
        />
        <img
          src="/img/2.jpeg"
          alt="Placeholder Image 2"
          className="rounded shadow-lg"
        />
        <img
          src="/img/3.jpeg"
          alt="Placeholder Image 3"
          className="rounded shadow-lg"
        />
      </div>
    </div>
  );
}

export default HeroScreen;
