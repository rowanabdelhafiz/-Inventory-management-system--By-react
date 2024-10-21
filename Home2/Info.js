import React from "react";
import InformationCard from "./InformationCard";
import { faTools,faHeart, faTruck, } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>What We Do</span>
        </h3>
        <p className="info-description">
        A core part of our product range is our high quality, stunning windows and doors. Available in U-PVC, we have options that can suit any homeowners taste and style in Cairo and surrounding areas.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="We Deliver On Time"
          description="We deliver on time, ensuring your deadlines are met with reliable and punctual service."
          icon={faTruck}
        />

        <InformationCard
          title="Experience & Reliability"
          description="Experience & Reliability define Future Company, your trusted provider of reliable, practical, and affordable uPVC windows across Egypt.
           Backed by a well-trained installation staff, we utilize cutting-edge fabrication machinery and equipment to ensure precision and quality in every product we deliver."
          icon={faHeart}
        />

        <InformationCard
          title="Maintenance Free"
          description="Future uPVC Material does not require regular repainting , They do not rot, warp nor corrode even. Maintenance is reduced to simple cleaning & does not involve any further costs."
          icon={faTools}
        />
      </div>
    </div>
  );
}

export default Info;
