import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShippingFast, faWallet, faHeadset } from "@fortawesome/free-solid-svg-icons";

export default function Features() {
  return (
    <div className="py-10 bg-white">
        <div className="flex justify-between mx-52 ">
            {/* Free Shipping */}
            <div className="flex items-center gap-3 ">
                <FontAwesomeIcon icon={faShippingFast} className="text-purple-500 text-3xl" />
                <div>
                <h4 className="font-semibold text-lg text-black">Free Shipping</h4>
                <p className="text-gray-500 text-sm">Free shipping for order above $50</p>
                </div>
            </div>

            {/* Flexible Payment */}
            <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faWallet} className="text-purple-500 text-3xl" />
                <div>
                <h4 className="font-semibold text-lg text-black">Flexible Payment</h4>
                <p className="text-gray-500 text-sm">Multiple secure payment options</p>
                </div>
            </div>

            {/* 24x7 Support */}
            <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faHeadset} className="text-purple-500 text-3xl" />
                <div>
                <h4 className="font-semibold text-lg text-black">24×7 Support</h4>
                <p className="text-gray-500 text-sm">We support online all days.</p>
                </div>
            </div>
        </div>
    </div>
    
  );
}
