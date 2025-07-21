import React, { useRef, useEffect } from "react";

const Testimoni = ({ testimoni }) => {
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  // ✅ Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth) {
          // Kalau sudah sampai ujung, kembali ke awal
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 3000); // pindah setiap 3 detik

    return () => clearInterval(interval); // bersihkan interval saat komponen unmount
  }, []);

  return (
    <section className="py-20 px-6 bg-orange-100 relative">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Apa Kata Pelanggan
      </h2>

      {/* Scroll buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow rounded-full z-10"
      >
        ◀
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow rounded-full z-10"
      >
        ▶
      </button>

      {/* Scrollable testimonials */}
      <div
        ref={scrollRef}
        className="overflow-x-auto"
        style={{
          scrollbarWidth: "none",       // Firefox
          msOverflowStyle: "none",      // IE & Edge
        }}
      >
        <div
          className="flex gap-6 w-max px-6"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {testimoni.map((fb, i) => (
            <div
              key={i}
              className="min-w-[300px] max-w-sm bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300"
            >
              <p className="italic mb-4 text-gray-700">"{fb.pesan}"</p>
              <p className="font-bold text-right text-orange-600">- {fb.nama}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimoni;
