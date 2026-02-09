import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappMessage = encodeURIComponent(
    "Olá, Dr. Mateus! Vim através do site e gostaria de receber orientação jurídica sobre direitos da Enfermagem."
  );

  return (
    <a
      href={`https://wa.me/5565981579393?text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
      aria-label="Contato via WhatsApp"
    >
      <div className="relative">
        {/* Pulse animation ring */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75" />
        
        {/* Main button */}
        <div className="relative bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <MessageCircle className="h-6 w-6" fill="currentColor" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <div className="bg-card border border-border rounded-lg px-4 py-2 shadow-lg">
            <p className="text-sm font-medium text-foreground">
              Fale com o Dr. Mateus
            </p>
            <p className="text-xs text-muted-foreground">
              (65) 98157-9393
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
