import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

export default function ManageZoom({ children }) {
  const map = useMap();
  const scrollableRef = useRef(null);

  useEffect(() => {
    const handleMouseEnter = () => {
      map.scrollWheelZoom.disable();
      map.doubleClickZoom.disable();
      map.dragging.disable();
    };

    const handleMouseLeave = () => {
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
      map.dragging.enable();
    };

    const scrollableElement = scrollableRef.current;

    if (scrollableElement) {
      scrollableElement.addEventListener("mouseenter", handleMouseEnter);
      scrollableElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("mouseenter", handleMouseEnter);
        scrollableElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [map]);
  return <div ref={scrollableRef}>{children}</div>;
}
