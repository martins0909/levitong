import { useEffect } from "react";

const AdSenseAd = ({
  adSlot = "REPLACE_WITH_AD_SLOT",
  style = { display: "block", maxWidth: "100%", width: "100%", height: "auto" },
  className = "",
  format = "auto",
}) => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // push can throw if adsbygoogle is not ready; ignore silently
    }
  }, []);

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
