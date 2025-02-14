import React from "react";

const Logo = (props: { url?: string; size?: "small" | "full"; fontSize?: string }) => {
  const urlHead = "https://firebasestorage.googleapis.com/v0/b/ams-v1-9d8b4.firebasestorage.app/o/logos%2FAdmissionEraHead.png?alt=media&token=4050e5c0-8b69-4c71-8561-7cbbc282f0a6";
  const urlFull = "https://firebasestorage.googleapis.com/v0/b/ams-v1-9d8b4.firebasestorage.app/o/logos%2FAdmission%20ERA%20logo%20png%202%20(1).png?alt=media&token=7655a14b-8a86-426e-a9cb-44eb6263a359";
  
  const logoUrl = props.size === "full" ? urlFull : urlHead;
  const logoSize = props.size === "full" ? "w-32 h-32" : "w-[48px] h-12"; // Adjust size based on "small" or "full" size
  
  return (
    <div className="flex items-center justify-center ml-1 sm:justify-start">
      <img 
        src={logoUrl} 
        alt="logo" 
        className={`object-contain ${logoSize} ${props.fontSize ? props.fontSize : ""}`} 
      />
    </div>
  );
};

export default Logo;
