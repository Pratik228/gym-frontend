function HeroScreen() {
  return (
    <div className="container mx-auto py-8 flex-grow">
      <h1 className="text-5xl font-bold mb-4">Strength Unleashed.</h1>
      <h2 className="text-3xl mb-6">
        Welcome to FitHub - Your Ultimate Fitness Destination
      </h2>
      <p className="mb-8 text-lg">
        Embark on a transformative journey where fitness meets passion. At
        FitHub, we believe in empowering individuals to unleash their full
        potential through a holistic approach to health and wellness. With
        state-of-the-art equipment, expert guidance, and a supportive community,
        we provide the tools you need to sculpt your ideal physique and elevate
        your overall well-being.
      </p>

      <div className="grid grid-cols-3 gap-8 mb-16">
        <img
          src="/img/1.jpg"
          alt="Gym Equipment"
          className="rounded shadow-lg"
        />
        <img
          src="/img/2.jpg"
          alt="Fitness Class"
          className="rounded shadow-lg"
        />
        <img
          src="/img/3.jpg"
          alt="Personal Training"
          className="rounded shadow-lg"
        />
      </div>
    </div>
  );
}

export default HeroScreen;
