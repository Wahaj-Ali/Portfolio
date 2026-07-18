import React from "react";
import { useTranslation } from "@/i18n/useTranslation";

const SkipLink: React.FC = () => {
  const { t } = useTranslation();

  return (
    <a href="#main-content" className="skip-link">
      {t.a11y.skipToContent}
    </a>
  );
};

export default SkipLink;
