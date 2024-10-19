import React from 'react'

export const FitFooter = () => {
    return (
        <div>
            <footer className="bg-gray-800 text-white p-6">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">

                    {/* Logo and brief description */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <div className="flex items-center mb-4">
                            <img
                                src="/kru/student01.jpg"
                                alt="Logo"
                                className="mr-3"
                                style={{ width: '40px', height: '40px' }}
                            />
                            <span className="font-bold text-xl">Student Management System</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Efficiently managing students' data and performance with ease.
                        </p>
                    </div>

                    {/* Useful links */}
                    <div className="w-full md:w-2/3 flex flex-wrap justify-between">
                        <div className="w-1/2 md:w-1/4 mb-6 md:mb-0">
                            <h5 className="font-bold mb-3">Quick Links</h5>
                            <ul className="text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">Dashboard</a></li>
                                <li><a href="#" className="hover:text-white">Add Student</a></li>
                                <li><a href="#" className="hover:text-white">View Students</a></li>
                            </ul>
                        </div>

                        <div className="w-1/2 md:w-1/4 mb-6 md:mb-0">
                            <h5 className="font-bold mb-3">Support</h5>
                            <ul className="text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white">Help Center</a></li>
                                <li><a href="#" className="hover:text-white">FAQs</a></li>
                            </ul>
                        </div>

                        <div className="w-1/2 md:w-1/4 mb-6 md:mb-0">
                            <h5 className="font-bold mb-3">Legal</h5>
                            <ul className="text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer bottom */}
                <div className="text-center text-gray-400 text-sm mt-6">
                    © 2024 Student Management System. All rights reserved.
                </div>
            </footer>
        </div>
    );

}

export default FitFooter;