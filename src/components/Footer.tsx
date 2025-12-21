import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Footer() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="brand">
          <h2>EngiCalc</h2>
          <p>
            Smart engineering calculators trusted by students & professionals.
          </p>

          <div className="badge">✔ Razorpay Verified</div>

          <div className="social">
            <span>X</span>
            <span>in</span>
            <span>⌘</span>
          </div>
        </div>

        {/* CALCULATORS */}
        <div className="col">
          <h4>Calculators</h4>
          <ul>
            <li><Link href="/beam">Beam</Link></li>
            <li><Link href="/stress">Stress</Link></li>
            <li><Link href="/torsion">Torsion</Link></li>
            <li><Link href="/section">Section</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="col">
          <h4>Support</h4>
          <ul>
            <li><Link href="/contact-support">Contact Support</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </div>

        {/* LEGAL */}
        <div className="col">
          <h4>Legal</h4>
          <ul>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
            <li><Link href="/refund-policy">Refund Policy</Link></li>
          </ul>
        </div>

        {/* ADMIN */}
        {isAdmin && (
          <div className="col admin">
            <h4>Admin</h4>
            <ul>
              <li><Link href="/admin">Dashboard</Link></li>
            </ul>
          </div>
        )}
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} EngiCalc. All rights reserved.</span>
        <select>
          <option>English</option>
          <option>Hindi</option>
        </select>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .footer {
          background: #ffffff;
          border-top: 1px solid #e5e7eb;
          margin-top: 80px;
        }

        .footer-container {
          max-width: 1200px;
          margin: auto;
          padding: 60px 24px;
          display: grid;
          grid-template-columns: 2.2fr 1fr 1fr 1fr 1fr;
          gap: 64px;
        }

        .brand h2 {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .brand p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.8;
          margin-bottom: 16px;
          max-width: 320px;
        }

        .badge {
          font-size: 13px;
          font-weight: 600;
          color: #16a34a;
          margin-bottom: 16px;
        }

        .social {
          display: flex;
          gap: 16px;
          font-size: 14px;
          cursor: pointer;
        }

        .col h4 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .col ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .col a {
          font-size: 14px;
          color: #2563eb;
          text-decoration: none;
        }

        .col a:hover {
          text-decoration: underline;
        }

        .admin a {
          color: #dc2626;
        }

        .footer-bottom {
          border-top: 1px solid #e5e7eb;
          padding: 18px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: #6b7280;
          max-width: 1200px;
          margin: auto;
        }

        select {
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
        }

        @media (max-width: 900px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </footer>
  );
}
