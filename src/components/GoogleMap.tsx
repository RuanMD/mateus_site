interface GoogleMapProps {
  address: string;
  className?: string;
}

export default function GoogleMap({ address, className = "" }: GoogleMapProps) {
  // Encode the address for the Google Maps embed URL
  const encodedAddress = encodeURIComponent(address);
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}&zoom=16`;

  return (
    <div className={`w-full h-full ${className}`}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "400px" }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapSrc}
        className="rounded-lg"
        title="Localização do Escritório"
      />
    </div>
  );
}
