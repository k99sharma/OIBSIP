import './Homepage.css';
import { BuyNowButton } from './BuyNowButton';

function HomePageContent() {
    return (
        <div className="homepage__content  p-5">
            <div className="homepage__content__title">
                <div className="text-6xl font-bold my-5">
                    Order your
                </div>
                <div className="text-6xl font-light my-5">
                    favourite Pizzas
                </div>
            </div>

            <div className="homepage__content__subtitle text-md my-5">
                <div className="my-2">
                    We are celebrating the return of a fan-favourite Pizza <br />
                    alongside fresh new flavors.
                </div>

                <div className="my-2">
                    Order and <span className='font-hurricane'>enjoy!</span>
                </div>
            </div>

            <div className='buyNowButton'>
                <BuyNowButton />
            </div>
        </div>
    )
}

function HomeIllustration() {
    return (
        <div className="bg-image hidden md:block h-full w-full"></div>
    );
}

export function HomePage() {
    return (
        <>
            <div className="
            homepage
            h-4/6 
            md:h-5/6 
            grid 
            md:grid-cols-1 
            md:items-center 
            md:justify-items-center 
            md:grid-cols-2 
            bg-[url('https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] 
            md:bg-none
            ">
                <HomePageContent />
                <HomeIllustration />
            </div>
        </>
    );
}