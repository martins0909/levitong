import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ADS_SCRIPT_ID = "adsbygoogle-js";
const ADS_SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7853565734078503";

const isAdminPath = (path = "") => {
  if (!path) return false;
  return path.startsWith("/admin") || path.startsWith("/dashboard");
};

const loadAdsScript = () => {
  if (typeof document === "undefined") return;
  if (document.getElementById(ADS_SCRIPT_ID)) return;

  const s = document.createElement("script");
  s.id = ADS_SCRIPT_ID;
  s.async = true;
  s.src = ADS_SRC;
  s.crossOrigin = "anonymous";
  document.head.appendChild(s);
};

const AdSenseAd = ({
  adSlot = "REPLACE_WITH_AD_SLOT",
  style = { display: "block", maxWidth: "100%", width: "100%", height: "auto" },
  className = "",
  format = "auto",
}) => {
  const location = useLocation();
  const path = location?.pathname || (typeof window !== "undefined" && window.location.pathname) || "";

  useEffect(() => {
    // don't load ads or the script on admin routes
    if (isAdminPath(path)) return;

    if (typeof window === "undefined") return;

    // dynamically inject the AdSense script if it's not already present
    loadAdsScript();

    // try to push a render request (will silently fail if adsbygoogle isn't ready yet)
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, [path]);

  // If currently on an admin route, render nothing.
  if (isAdminPath(path)) return null;

  return (
    <div className="my-6 flex justify-center">
      <ins
        className={`adsbygoogle ${className}`}
        style={style}
        data-ad-client="ca-pub-7853565734078503"
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseAd;
