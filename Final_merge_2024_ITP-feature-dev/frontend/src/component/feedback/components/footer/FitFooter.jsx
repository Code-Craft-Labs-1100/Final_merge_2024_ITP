import React from 'react'

export const FitFooter = () => {
  return (
    <div><footer class="bg-zinc-800 text-white p-10 rounded-lg">
    <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-start">
        
        <div class="w-full md:w-1/4 mb-6 md:mb-0">
            <div class="flex items-center mb-4">
            <img src={Logo} alt="Logo" class="mr-3" style={{ width: '40px', height: '40px' }}/>
                <span class="font-bold text-xl">Life Touch Fitness</span>
            </div>
            <p class="text-zinc-400 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
            <div class="flex mt-4">
                <a href="#" class="mr-4"><img src="https://placehold.co/24x24" alt="Facebook"/></a>
                <a href="#" class="mr-4"><img src="https://placehold.co/24x24" alt="Twitter"/></a>
                <a href="#" class="mr-4"><img src="https://placehold.co/24x24" alt="LinkedIn"/></a>
                <a href="#"><img src="https://placehold.co/24x24" alt="Google Plus"/></a>
            </div>
        </div>

        
        <div class="w-full md:w-3/4 flex flex-wrap">
            <div class="w-1/2 md:w-1/4 mb-6 md:mb-0">
                <h5 class="font-bold mb-3">HOME</h5>
                <ul class="text-zinc-400 text-sm">
                    <li><a href="#" class="hover:text-white">Collections</a></li>
                    <li><a href="#" class="hover:text-white">New Item</a></li>
                    <li><a href="#" class="hover:text-white">Latest</a></li>
                    <li><a href="#" class="hover:text-white">Services</a></li>
                </ul>
            </div>
            <div class="w-1/2 md:w-1/4 mb-6 md:mb-0">
                <h5 class="font-bold mb-3">PRODUCT</h5>
                <ul class="text-zinc-400 text-sm">
                    <li><a href="#" class="hover:text-white">New</a></li>
                    <li><a href="#" class="hover:text-white">Arrival</a></li>
                    <li><a href="#" class="hover:text-white">Oldest</a></li>
                    <li><a href="#" class="hover:text-white">Premium</a></li>
                </ul>
            </div>
            <div class="w-1/2 md:w-1/4 mb-6 md:mb-0">
                <h5 class="font-bold mb-3">ABOUT US</h5>
                <ul class="text-zinc-400 text-sm">
                    <li><a href="#" class="hover:text-white">Contact Form</a></li>
                    <li><a href="#" class="hover:text-white">Email Us</a></li>
                    <li><a href="#" class="hover:text-white">Number</a></li>
                    <li><a href="#" class="hover:text-white">Customers Feedback</a></li>
                </ul>
            </div>
            <div class="w-1/2 md:w-1/4">
                <h5 class="font-bold mb-3">PRIVACY & TERM</h5>
                <ul class="text-zinc-400 text-sm">
                    <li><a href="#" class="hover:text-white">Community</a></li>
                    <li><a href="#" class="hover:text-white">Guidelines</a></li>
                    <li><a href="#" class="hover:text-white">Terms</a></li>
                    <li><a href="#" class="hover:text-white">Privacy</a></li>
                </ul>
            </div>
        </div>
    </div>
</footer></div>
  )
}

export default FitFooter;