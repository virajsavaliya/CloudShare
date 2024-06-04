import React, { useState } from "react";
import { Copy, CheckCircle } from "lucide-react"; // Assuming 'CheckCircle' is the icon for the green tick
import GlobalApi from "./../../../../../_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import { FaFrownOpen, FaRegSmile } from "react-icons/fa";

function FileShareForm({ file, onPasswordSave }) {
  const [isPasswordEnable, setIsEnablePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const SendEmail = () => {
    const data = {
      emailToSend: email,
      userName: user?.fullName,
      fileName: file.fileName,
      fileSize: file.fileSize,
      fileType: file.fileType,
      shortUrl: file.shortUrl,
    };
    GlobalApi.SendEmail(data).then((resp) => {
      console.log(resp);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    });
  };

  const handleCopy = () => {
    if (file && file.shortUrl) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(file.shortUrl)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 800);
            console.log("URL copied to clipboard!");
          })
          .catch((error) => {
            console.error("Failed to copy URL to clipboard:", error);
          });
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = file.shortUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        setCopied(true);
        setTimeout(() => setCopied(false), 800);
        console.log("URL copied to clipboard (fallback)");
      }
    }
  };

  const handlePasswordSave = (password) => {
    onPasswordSave(password);
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 800);
  };

  const handleTyping = (event) => {
    setPassword(event.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  return (
    <div
      className={`flex flex-col gap-2 border-blue-300 ${
        menuOpen ? "w-full" : ""
      }`}
    >
      <div>
        <label className="text-[14px] text-gray-500">Short Url</label>
        <div className="relative flex items-center p-2 border rounded-md">
          <input
            type="text"
            value={file.shortUrl || ""}
            disabled
            className="flex-grow disabled:text-gray-500 bg-transparent outline-none mr-2"
          />
          {copied ? (
            <div className="text-green-500">
              <CheckCircle size={24} />
            </div>
          ) : (
            <Copy
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={handleCopy}
            />
          )}
        </div>

        <div className="gap-3 flex mt-5">
          <input
            type="checkbox"
            onChange={(e) => setIsEnablePassword(e.target.checked)}
          />
          <label>Enable Password</label>
        </div>

        {isPasswordEnable && (
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="border rounded-md w-full p-2">
              <input
                type="password"
                value={password}
                className={`disabled:text-gray-500 bg-transparent outline-none w-full ${
                  isTyping ? "animate-typing" : ""
                }`}
                onChange={handleTyping}
              />
            </div>
            {!passwordSaved ? (
              <button
                className="p-2 bg-primary text-white rounded-md disabled:bg-gray-300 hover:bg-blue-500"
                disabled={password.length < 3}
                onClick={() => handlePasswordSave(password)}
              >
                {" "}
                Save{" "}
              </button>
            ) : (
              <div className="text-blue-500 animate-bounce">
                <CheckCircle size={25} />
              </div>
            )}
          </div>
        )}

        <div className="border rounded-md p-4 mt-5">
          <label className="text-[14px] text-gray-500 ">
            Send File to Email
          </label>
          <div className="border rounded-md p-2">
            <input
              type="email"
              placeholder="example@gmail.com"
              className="bg-transparent outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="p-2 disabled:bg-gray-300 bg-primary text-white hover:bg-blue-600 w-full mt-2 rounded-md"
            onClick={SendEmail}
          >
            Send Email
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>

          <div className="fixed center bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-xs">
            <p className="text font-semibold flex items-center">
              <FaRegSmile className="inline-block mr-2" /> Email Sended to{" "}
              {email} Successfully.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileShareForm;
