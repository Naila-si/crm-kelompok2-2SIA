import React, { useState } from "react";
import { BsSendFill } from "react-icons/bs";

const CustomerChat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Halo! Ada yang bisa kami bantu hari ini?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const replyMessage = {
      sender: "bot",
      text: generateReply(input)
    };

    setMessages([...messages, userMessage, replyMessage]);
    setInput("");
  };

  const generateReply = (text) => {
    text = text.toLowerCase();

    if (text.includes("menu")) return "Kamu bisa cek halaman Menu untuk daftar lengkap.";
    if (text.includes("pesan") || text.includes("order")) return "Untuk melakukan pemesanan, klik tombol 'Pesan Sekarang' di halaman utama.";
    if (text.includes("promo")) return "Promo saat ini: diskon 10% untuk pesanan pertama!";
    if (text.includes("alamat")) return "Kami berlokasi di Pekanbaru, Riau.";
    
    return "Maaf, pertanyaan kamu belum bisa dijawab otomatis. Silakan hubungi admin.";
  };

  return (
    <div className="flex flex-col h-screen bg-[#fff8f0] font-sans">
      <header className="bg-orange-600 text-white px-6 py-4 text-xl font-semibold shadow">
        Customer Chat Support
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 rounded-lg max-w-xs shadow ${msg.sender === "user" ? "bg-orange-500 text-white" : "bg-white text-gray-800"}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center px-6 py-4 border-t bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis pesan..."
          className="flex-1 p-2 border rounded-lg mr-2 focus:outline-orange-400"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600"
        >
          <BsSendFill size={20} />
        </button>
      </div>
    </div>
  );
};

export default CustomerChat;
