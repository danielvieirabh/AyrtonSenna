import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Instagram, Twitter, Youtube, ArrowUp, Mail } from "lucide-react";

const FooterSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black text-white border-t border-white/10 overflow-hidden pt-20 pb-10">
      
      {/* 1. BACKGROUND WATERMARK (CR7 Gigante) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 pointer-events-none select-none z-0">
        <span className="font-display text-[40vw] font-black text-white/[0.02] leading-none">
          CR7
        </span>
      </div>

      <div
        ref={ref}
        className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          
          {/* COLUNA 1: BRAND & QUOTE (4 colunas) */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h2 className="font-serif text-5xl text-white mb-6">
              CRISTIANO<br/>
              <span className="text-[#D4AF37]">RONALDO</span>
            </h2>
            <p className="font-sans text-sm text-gray-400 max-w-xs leading-relaxed mb-8 border-l-2 border-[#D4AF37] pl-4">
              "A disciplina vence o talento. Não persigo recordes, os recordes me perseguem."
            </p>
            
            {/* Socials Modernos */}
            <div className="flex gap-4">
              {[
                { icon: Instagram, url: "https://instagram.com/cristiano" },
                { icon: Twitter, url: "https://twitter.com/cristiano" },
                { icon: Youtube, url: "https://youtube.com/cristiano" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* COLUNA 2: SITEMAP (2 colunas) */}
          <div className="md:col-span-2 md:col-start-6">
            <h3 className="font-display text-lg mb-6 text-[#D4AF37]">PLATFORM</h3>
            <ul className="space-y-4 font-sans text-sm text-gray-400">
              {['Home', 'Biography', 'Career Stats', 'Trophies', 'Gallery'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA 3: BRANDS (2 colunas) */}
          <div className="md:col-span-2">
            <h3 className="font-display text-lg mb-6 text-[#D4AF37]">THE BRAND</h3>
            <ul className="space-y-4 font-sans text-sm text-gray-400">
              {['CR7 Footwear', 'CR7 Underwear', 'Pestana CR7 Hotels', 'CR7 Fragrances', 'URSU Water'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA 4: NEWSLETTER (4 colunas) */}
          <div className="md:col-span-4 md:col-start-10 md:col-span-3">
             <h3 className="font-display text-lg mb-6 text-[#D4AF37]">JOIN THE LEGACY</h3>
             <p className="text-xs text-gray-500 mb-4">
               Receba atualizações exclusivas sobre lançamentos e novidades.
             </p>
             <div className="relative">
                <input 
                  type="email" 
                  placeholder="Seu e-mail" 
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <button className="absolute right-1 top-1 bottom-1 bg-[#D4AF37] text-black p-2 rounded-sm hover:bg-yellow-500 transition-colors">
                  <Mail size={16} />
                </button>
             </div>
          </div>
        </div>

        {/* LINHA DIVISÓRIA */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* BOTTOM FOOTER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-[10px] uppercase tracking-widest text-gray-600">
             <span>© 2024 CR7 Brand</span>
             <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
          </div>

          {/* Botão Back to Top */}
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-[#D4AF37] transition-colors"
          >
            Back to Top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 group-hover:border-[#D4AF37] transition-colors">
               <ArrowUp size={14} className="animate-bounce" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;