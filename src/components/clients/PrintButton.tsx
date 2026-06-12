"use client";

import { FileText } from "lucide-react";

export default function PrintButton() {
  return (
    <button className="btn-primary" onClick={() => window.print()}>
      <FileText size={18} style={{ marginRight: '0.5rem' }} />
      Export PDF Report
    </button>
  );
}
