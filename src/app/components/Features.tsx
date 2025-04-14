import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShippingFast, faWallet, faHeadset, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function Features() {
    return (
        <div className="py-10 bg-white">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center md:text-left">
                {/* Free Shipping */}
                <div className="flex items-center gap-3 justify-center md:justify-center">
                    <FontAwesomeIcon icon={faShippingFast} className="text-purple-500 text-3xl" />
                    <div>
                        <h4 className="font-semibold text-lg text-black">Free Shipping</h4>
                        <p className="text-gray-500 text-sm">Free shipping for order above $50</p>
                    </div>
                </div>

                {/* Flexible Payment */}
                <div className="flex items-center gap-3 justify-center md:justify-center">
                    <FontAwesomeIcon icon={faWallet} className="text-purple-500 text-3xl" />
                    <div>
                        <h4 className="font-semibold text-lg text-black">Flexible Payment</h4>
                        <p className="text-gray-500 text-sm">Multiple secure payment options</p>
                    </div>
                </div>

                {/* High quality */}
                <div className="flex items-center gap-3 justify-center md:justify-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-purple-500 text-3xl" />
                    <div>
                        <h4 className="font-semibold text-lg text-black">Quality Assurance</h4>
                        <p className="text-gray-500 text-sm">Genuine and Safe Products</p>
                    </div>
                </div>

                {/* 24x7 Support */}
                <div className="flex items-center gap-3 justify-center md:justify-center">
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