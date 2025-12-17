import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="bg-base-200 text-base-content py-10">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Contact */}
                    <div>
                        <h2 className="footer-title">Contact Us</h2>
                        <p className="mt-2">📍 Mirpur, Dhaka, Bangladesh</p>
                        <p>📞 +880 1234-567890</p>
                        <p>📧 info@example.com</p>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h2 className="footer-title">Follow Us</h2>
                        <div className="flex flex-col space-y-2 mt-2">
                            <a className="link link-hover">Facebook</a>
                            <a className="link link-hover">Instagram</a>
                            <a className="link link-hover">Twitter</a>
                            <a className="link link-hover">LinkedIn</a>
                        </div>
                    </div>

                    {/* Working Hours */}
                    <div>
                        <h2 className="footer-title">Working Hours</h2>
                        <p className="mt-2">Mon – Fri: 9:00 AM – 6:00 PM</p>
                        <p>Saturday: 10:00 AM – 2:00 PM</p>
                        <p>Sunday: Closed</p>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-10 border-t border-base-300 pt-4 text-center">
                    <p className="text-sm">© 2025 YourCompany. All Rights Reserved.</p>
                </div>
            </footer>

        </div>
    );
};

export default Footer;