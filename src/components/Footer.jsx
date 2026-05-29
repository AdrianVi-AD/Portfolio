import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-primary/20 py-6">
      <div className="max-w-6xl mx-auto px-6 text-center text-textPrimary">
        <p>© {new Date().getFullYear()} Adrian. All rights reserved.</p>
      </div>
    </footer>
  );
}
