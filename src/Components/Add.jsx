import { useEffect } from "react";

const Add = () => {

  useEffect(() => {
    // This will ensure that ads are loaded properly
    window.adsbygoogle && window.adsbygoogle.push({});
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
