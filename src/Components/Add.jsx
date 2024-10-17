import { useEffect, useRef } from "react";

const Add = () => {
  const adRef = useRef(null);

  useEffect(() => {
    // Dynamically add the Google AdSense script
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7671190139123148";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    // Initialize the ad only when the ref is available
    script.onload = () => {
      if (adRef.current) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("AdSense error:", e);
        }
      }
    };

    return () => {
      // Clean up script if needed
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div className="adsbygoogle w-full h-full p-3 relative">
      <ins
        ref={adRef} // Ref to the ins element
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7671190139123148"
        data-ad-slot="3777018582"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default Add;
