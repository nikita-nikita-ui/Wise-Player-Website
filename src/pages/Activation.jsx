import React, { useState } from "react";
import { Cpu, ShieldCheck, CheckCircle2, Shield } from "lucide-react";
import { generateDeviceKey, activateDeviceApi } from "../auth/apiservice";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const WisePlayerActivation = () => {
  const { t } = useTranslation();

  const [macAddress, setMacAddress] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyGenerated, setIsKeyGenerated] = useState(false);
  const [isKeyLoading, setIsKeyLoading] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const isMacValid = macAddress.length === 12;
  const canActivate = isMacValid && isKeyGenerated && isAgreed;

  const formatMac = (val) => val.match(/.{1,2}/g)?.join(":") || val;

  const handleMacChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, "");
    if (value.length <= 12) {
      setMacAddress(value);
      setIsKeyGenerated(false);
    }
  };

  const handleGenerateKey = async () => {
    if (!isMacValid) return;

    setIsKeyLoading(true);
    const result = await generateDeviceKey(formatMac(macAddress));

    if (result.success) {
      setGeneratedKey(result.data.activationKey);
      setIsKeyGenerated(true);
      toast.success(t("activation.keyGeneratedSuccess"));
    } else {
      toast.error(result.message || t("activation.keyGenerateFailed"));
    }

    setIsKeyLoading(false);
  };

  const handleActivate = async () => {
    if (!canActivate) return;

    setIsLoading(true);

    const result = await activateDeviceApi(
      formatMac(macAddress),
      generatedKey
    );

    if (result.success) {
      toast.success(t("activation.deviceActivated"));
      setIsSuccess(true); // ✅ IMPORTANT
    } else {
     toast.error(result.message || t("activation.activationFailed"));
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 via-gray-50 to-red-50 px-3 sm:px-4 md:px-6 py-4 sm:py-6">

      {/* CENTER AREA */}
      <div className="flex-grow flex items-center justify-center overflow-y-auto">

        {/* CARD */}
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl 
bg-white rounded-2xl shadow-xl border 
p-4 sm:p-6 md:p-8 
min-h-[480px] sm:min-h-[520px] md:min-h-[560px]  // ✅ IMPORTANT
flex flex-col justify-center               // ✅ CENTER CONTENT
transition-all duration-300">

          {/* HEADER */}
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5 sm:space-y-6"   // ✅ ADD THIS
              >
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-md">
                    <Cpu size={26} className="text-white" />
                  </div>

                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold mt-3">
                     {t("activation.appName")}
  <span className="text-red-600">
    {t("activation.appName2")}
  </span>
                  </h1>

                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1 tracking-wide">
                    {t("activation.tagline")}
                  </p>
                </div>


                {/* PROGRESS STEPPER */}
                <div className="w-full flex items-center justify-between mt-2">

                  {/* STEP 1 */}
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs font-bold
transition-all duration-300 ease-in-out transform
${isMacValid
                          ? "bg-green-500 text-white scale-110 shadow-md"
                          : "bg-gray-300 text-gray-600"
                        }`}
                    >
                      1
                    </div>
                    <span className={`mt-1 text-[10px] sm:text-xs ${isMacValid ? "text-green-600" : "text-gray-400"}`}>
                     {t("activation.stepEnterMac")}
                    </span>
                  </div>

                  {/* LINE */}
                  <div className="flex-1 h-[3px] mx-1 sm:mx-2 bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-green-500 transition-all duration-500 ease-in-out
    ${isMacValid ? "w-full" : "w-0"}`}
                    />
                  </div>

                  {/* STEP 2 */}
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs font-bold
transition-all duration-300 ease-in-out transform
${isKeyGenerated
                          ? "bg-green-500 text-white scale-110 shadow-md"
                          : "bg-gray-300 text-gray-600"
                        }`}
                    >
                      2
                    </div>
                    <span className={`mt-1 text-[10px] sm:text-xs ${isKeyGenerated ? "text-green-600" : "text-gray-400"}`}>
                     {t("activation.stepGenerateKey")}
                    </span>
                  </div>

                  {/* LINE */}
                  <div className="flex-1 h-[3px] mx-1 sm:mx-2 bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-green-500 transition-all duration-500 ease-in-out
    ${isKeyGenerated ? "w-full" : "w-0"}`}
                    />
                  </div>

                  {/* STEP 3 */}
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs font-bold
transition-all duration-300 ease-in-out transform
${canActivate
                          ? "bg-green-500 text-white scale-110 shadow-md"
                          : "bg-gray-300 text-gray-600"
                        }`}
                    >
                      3
                    </div>
                    <span className={`mt-1 text-[10px] sm:text-xs ${canActivate ? "text-green-600" : "text-gray-400"}`}>
                     {t("activation.stepActivate")}
                    </span>
                  </div>

                </div>

                {/* MAC INPUT */}
                <div>
                  <label className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase">
                    {t("activation.macLabel")}
                  </label>

                  <input
                    type="text"
                    value={formatMac(macAddress)}
                    onChange={handleMacChange}
                    placeholder={t("activation.macPlaceholder")}
                    inputMode="text"
                    className={`mt-2 w-full h-11 sm:h-12 px-3 sm:px-4 rounded-lg border text-xs sm:text-sm font-mono tracking-normal sm:tracking-wider outline-none transition
                ${isMacValid
                        ? "border-green-400 bg-green-50"
                        : "border-gray-300 focus:border-blue-500"
                      }`}
                  />
                </div>

                {/* GENERATE KEY */}
                <button
                  onClick={handleGenerateKey}
                  disabled={!isMacValid || isKeyLoading}
                  className={`w-full py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200
  ${isKeyGenerated
                      ? "bg-green-600 text-white"
                      : isMacValid
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  {isKeyLoading
                    ? t("activation.generating")
                    : isKeyGenerated
                      ? t("activation.keyGenerated")
                      : t("activation.generateKey")}
                </button>

                {/* AGREEMENT */}
                <label className="flex items-start gap-3 text-xs sm:text-sm text-gray-600 cursor-pointer leading-relaxed">

                  <input
                    type="checkbox"
                    checked={isAgreed}
                    onChange={() => setIsAgreed(!isAgreed)}
                    disabled={!isKeyGenerated}
                    className="mt-1 w-4 h-4 accent-blue-600 shrink-0"
                  />

                  <span className="break-words">
                    {t("activation.agreement")}{" "}
                    <span className="font-semibold text-gray-800">
                        {t("activation.terms")}
                    </span>.
                  </span>

                </label>

                {/* ACTIVATE */}
                <button
                  onClick={handleActivate}
                  disabled={!canActivate || isLoading}
                  className={`w-full py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200
              ${canActivate
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  {isLoading
  ? t("activation.verifying")
  : t("activation.activateDevice")}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col justify-center items-center 
             text-center 
             space-y-6 sm:space-y-7 md:space-y-8  // ✅ MORE SPACE
             py-6 sm:py-8 md:py-10"              // ✅ TOP/BOTTOM SPACE
              >
                <div className="flex flex-col items-center text-center space-y-5 sm:space-y-6 py-4 sm:py-6">

                  {/* ICON */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-75"></div>
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-green-100 rounded-full shadow">
                      <ShieldCheck className="text-green-600" size={36} />
                    </div>
                  </div>

                  {/* TITLE */}
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 ">
                    {t("activation.successTitle")}
                  </h2>

                  <p className="text-sm sm:text-base text-gray-500">
                    {t("activation.successDesc")}
                  </p>

                  {/* DEVICE */}
                  <div className="w-full bg-gray-50 border rounded-lg px-4 py-3">
                    <p className="text-xs text-gray-400">{t("activation.activatedDevice")}</p>
                    <p className="font-mono text-sm sm:text-base text-gray-700 break-all">
                      {formatMac(macAddress)}
                    </p>
                  </div>

                  {/* TAGS */}
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      <CheckCircle2 size={12} /> {t("activation.lifetime")}
                    </span>
                    <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      <Shield size={12} /> {t("activation.secured")}
                    </span>
                  </div>

                  {/* RESET */}
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setMacAddress("");
                      setIsKeyGenerated(false);
                      setIsAgreed(false);
                      setGeneratedKey("");
                    }}
                    className="w-full py-2.5 sm:py-3 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:bg-gray-900 transition"
                  >
                    {t("activation.activateAnother")}
                  </button>
                  <button onClick={() => window.location.href = "/home"} className="w-full py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                    {t("activation.goToHome")} 
                    </button>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-[10px] sm:text-xs text-gray-400 mt-4 sm:mt-6">
        © {new Date().getFullYear()} {t("activation.footer")}
      </div>
    </div>
  );
};

export default WisePlayerActivation;