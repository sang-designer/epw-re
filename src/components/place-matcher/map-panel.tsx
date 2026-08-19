"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

interface MapPin {
  id: string;
  lat: number;
  lng: number;
  label: string;
  type: "source" | "candidate";
}

interface MapPanelProps {
  pins: MapPin[];
  highlightedPinId?: string | null;
  onPinClick?: (pinId: string) => void;
  center?: [number, number];
  zoom?: number;
  locationLabel?: string;
  className?: string;
}

const redPinIcon = L.icon({
  iconUrl: "/icons/map-pin-red.svg",
  iconSize: [28, 36],
  iconAnchor: [14, 36],
  popupAnchor: [0, -36],
});

const bluePinIcon = L.icon({
  iconUrl: "/icons/map-pin-blue.svg",
  iconSize: [28, 36],
  iconAnchor: [14, 36],
  popupAnchor: [0, -36],
});

const bluePinHighlightedIcon = L.icon({
  iconUrl: "/icons/map-pin-blue.svg",
  iconSize: [36, 46],
  iconAnchor: [18, 46],
  popupAnchor: [0, -46],
});

export function MapPanel({
  pins,
  highlightedPinId,
  onPinClick,
  center,
  zoom = 15,
  locationLabel,
  className,
}: MapPanelProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const highlightCircleRef = useRef<L.CircleMarker | null>(null);
  const pinsRef = useRef(pins);
  pinsRef.current = pins;
  const onPinClickRef = useRef(onPinClick);
  onPinClickRef.current = onPinClick;

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current, {
      zoomControl: false,
    }).setView(center || [40.748, -73.986], zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapRef.current);

    const observer = new ResizeObserver(() => {
      mapRef.current?.invalidateSize();
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Add/update markers when pins change (NOT when highlight changes)
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    // Add pins
    pins.forEach((pin) => {
      const icon = pin.type === "source" ? redPinIcon : bluePinIcon;

      const marker = L.marker([pin.lat, pin.lng], { icon })
        .addTo(mapRef.current!)
        .bindPopup(pin.label);

      // Add click handler for candidate pins
      if (pin.type === "candidate") {
        marker.on("click", () => {
          onPinClickRef.current?.(pin.id);
        });
      }

      markersRef.current.set(pin.id, marker);
    });

    // Fit bounds if multiple pins
    if (pins.length > 1) {
      const bounds = L.latLngBounds(pins.map((p) => [p.lat, p.lng]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    } else if (pins.length === 1) {
      mapRef.current.setView([pins[0].lat, pins[0].lng], zoom);
    }
  }, [pins, zoom]);

  // Handle highlight changes separately — only swap icons, never remove markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove previous highlight circle
    if (highlightCircleRef.current) {
      highlightCircleRef.current.remove();
      highlightCircleRef.current = null;
    }

    markersRef.current.forEach((marker, id) => {
      const pin = pinsRef.current.find((p) => p.id === id);
      if (!pin || pin.type === "source") return;

      if (id === highlightedPinId) {
        marker.setIcon(bluePinHighlightedIcon);
        marker.setZIndexOffset(1000);
        marker.openPopup();

        // Add a pulsing circle behind the highlighted pin
        highlightCircleRef.current = L.circleMarker([pin.lat, pin.lng], {
          radius: 20,
          color: "#2563eb",
          fillColor: "#2563eb",
          fillOpacity: 0.15,
          weight: 2,
          opacity: 0.6,
        }).addTo(mapRef.current!);
      } else {
        marker.setIcon(bluePinIcon);
        marker.setZIndexOffset(0);
        marker.closePopup();
      }
    });
  }, [highlightedPinId]);

  return (
    <div className={cn("relative", className)}>
      {locationLabel && (
        <div className="pointer-events-none absolute top-[max(0.75rem,env(safe-area-inset-top))] right-3 z-[1000] max-w-[min(70%,20rem)] truncate rounded-md border border-border bg-background px-2.5 py-1.5 text-[12px] leading-[16px] font-normal shadow-sm md:right-4 md:text-[14px] md:leading-[20px] md:px-3">
          {locationLabel}
        </div>
      )}
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}
