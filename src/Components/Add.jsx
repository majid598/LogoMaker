import { useEffect } from "react";

const Add = () => {

  useEffect(() => {
    // Ensure the adsbygoogle object exists
    if (typeof window.adsbygoogle !== 'undefined' && window.adsbygoogle.length > 0) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.error("Adsbygoogle push error:", e);
      }
    }
  }, []);
  return (
    <div className="adsbygoogle w-full h-full p-3 relative"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-7671190139123148"
      data-ad-slot="pub-7671190139123148"  // Replace with your ad slot ID
      data-ad-format="auto"
    />
  );
};

export default Add;
