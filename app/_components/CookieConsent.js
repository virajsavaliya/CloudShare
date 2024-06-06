// components/CookieConsent.js
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CookieConsent = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    if (!consent) {
      setShowPopup(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie_consent", "accepted", { expires: 365 });
    setShowPopup(false);
  };

  const handleReject = () => {
    Cookies.set("cookie_consent", "rejected", { expires: 365 });
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-800 text-white flex flex-col md:flex-row justify-between items-center z-50 space-y-2 md:space-y-0">
      <div className="text-center md:text-left">
        We use cookies to improve your experience. By continuing to use our
        site, you accept our use of cookies.
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleAccept}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
