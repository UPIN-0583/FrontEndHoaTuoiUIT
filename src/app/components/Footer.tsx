import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter, faPinterest, faInstagram} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-purple-700 text-white p-10 rounded-lg px-20">
      <div className="flex items-center justify-between">
        {/* Logo & Description */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="bg-purple-500 p-3 rounded-full">
              <span className="text-2xl">🌸</span>
            </div>
            <h2 className="text-2xl font-bold">Hoa Tươi UIT</h2>
          </div>
          <p className="mt-3 text-sm max-w-96">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
          </p>
          {/* Social Icons */}
          <div className="flex gap-3 mt-4">
            <div className="flex space-x-3">
                <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} className="text-white " />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faXTwitter} className="text-white" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faPinterest} className="text-white" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="text-white" />
                </a>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-8">
            <div>
            <h3 className="font-semibold pb-2">Company</h3>
            <ul className="mt-2 text-sm space-y-2">
                <li>About Us</li>
                <li>Blog</li>
                <li>Contact Us</li>
                <li>Career</li>
            </ul>
            </div>
            <div>
            <h3 className="font-semibold pb-2">Customer Services</h3>
            <ul className="mt-2 text-sm space-y-2">
                <li>My Account</li>
                <li>Track Your Order</li>
                <li>Return</li>
                <li>FAQ</li>
            </ul>
            </div>
            <div>
            <h3 className="font-semibold pb-2">Our Information</h3>
            <ul className="mt-2 text-sm space-y-2">
                <li>Privacy</li>
                <li>User Terms & Condition</li>
                <li>Return Policy</li>
            </ul>
            </div>
            <div>
            <h3 className="font-semibold pb-2">Contact Info</h3>
            <ul className="mt-2 text-sm space-y-2">
                <li>+0123-456-789</li>
                <li>example@gmail.com</li>
                <li>8502 Preston Rd. Inglewood, Maine 98380</li>
            </ul>
            </div>
        </div>
        
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm border-t border-purple-600 pt-4">
        <p>
          <span className="font-bold">Copyright &copy; 2024</span> Flower Shop Website. <span className="font-bold">All Rights Reserved.</span>
        </p>
      </div>
    </footer>
  );
}
