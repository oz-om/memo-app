import {Link} from "react-router-dom"
export default function Footer() {
  return (
    <footer className="mt-10 mb-3">
      <div className="px-10">
        <p>Memo is protected by reCAPTCHA and the Google <Link to="privacy" className="text-sky-500">Privacy Policy</Link> and <Link to="termsOfService" className="text-sky-500">Terms of Service</Link> apply.
        </p>
      </div>
    </footer>
  )
}

