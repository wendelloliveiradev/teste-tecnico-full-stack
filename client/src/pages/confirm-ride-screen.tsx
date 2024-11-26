export default function ConfirmRideScreen() {
  return (
    <section className="flex h-4/5 w-[55%] bg-zinc-100 rounded-2xl border border-zinc-300 shadow-[15px_15px_15px_-15px_rgba(0,0,0,0.3)] justify-center items-center font-bold">
      <div className="flex h-full w-3/5 rounded-s-2xl bg-amber-400"></div>
      <div className="flex h-full w-2/5 rounded-e-2xl justify-end">
        <img className="rounded-e-2xl" src="/hero-image.webp" alt="hero image" />
      </div>
    </section>
  );
}
