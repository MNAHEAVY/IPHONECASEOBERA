import logo from "../../assets/logo.png";
import { useState, useRef, useEffect } from "react";

export default function AppleExpertAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [lastSend, setLastSend] = useState(0);
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!chatContainerRef.current) return;

    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages, loading]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const now = Date.now();
    if (now - lastSend < 3000) {
      alert("Espera unos segundos antes de enviar otro mensaje 🙂");
      return;
    }
    setLastSend(now);

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply || "No pude responder eso 😕",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error al conectar con la IA 😕" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2'>
          {/* INPUT */}
          <div className='max-w-xl lg:max-w-lg'>
            <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              Consulta con nuestra IA 🍎
            </h2>
            <p className='mt-4 text-lg leading-8 text-gray-300'>
              Preguntá por compatibilidades, modelos y stock disponibles.
            </p>

            <form onSubmit={handleSend} className='mt-6 flex max-w-md gap-x-4'>
              <input
                type='text'
                placeholder='Escribe tu mensaje...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-white ring-1 ring-white/10 focus:ring-indigo-500'
              />
              <button
                type='submit'
                disabled={loading}
                className='rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 disabled:opacity-50'
              >
                {loading ? "Enviando…" : "Enviar"}
              </button>
            </form>
          </div>

          {/* CHAT */}
          <div
            className='flex flex-col rounded-lg border border-white/10 bg-black/30 p-4
                h-[70vh] sm:h-[420px]'
          >
            <div ref={chatContainerRef} className='flex-1 overflow-y-auto space-y-4 pr-2'>
              {messages.length === 0 && (
                <p className='text-gray-400 text-sm'>
                  👋 Hola, preguntá por productos Apple o compatibilidades.
                </p>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] rounded-lg px-4 py-2 text-sm leading-relaxed
                    ${
                      m.role === "user"
                        ? "ml-auto bg-indigo-500 text-white"
                        : "bg-gray-800 text-gray-200"
                    }`}
                >
                  {m.text}
                </div>
              ))}

              {loading && (
                <div className='bg-gray-800 text-gray-300 px-4 py-2 rounded-lg w-fit'>
                  🤖 Escribiendo…
                </div>
              )}
            </div>

            <div className='mt-3 flex items-center gap-2 text-xs text-gray-400'>
              <img src={logo} className='h-4 w-4' />
              IPHONECASEOBERA · Asistente IA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
