import './Footer.css';

function CompanyName() {
    return (
        <>
            <div className='company flex items-center justify-items-center my-2'>
                <div className='footer__company__logo mx-2'>
                    <img src='/logo512.png' alt='logo' width='50px' height='50px' />
                </div>

                <div className='footer__company__name mx-2 text-white font-medium'>
                    Mount Pizza
                </div>
            </div>
        </>
    )
}

function FollowMe() {
    return (
        <>
            <div className='footer__followme mt-5'>
                <div className='text-white mb-3'>
                    Developed & Designed by <span>
                        <a className='text-amber-400' rel="noreferrer" target='_blank' href="https://www.kalashsharma.me">
                            ghost_32
                        </a>
                    </span>
                </div>
            </div>

            <div className='footer__followme__links flex justify-center items-center py-3'>
                <div className='flex'>
                    <div className='mx-2'>
                        <a href="https://www.linkedin.com/in/kalashsharma99/" rel="noreferrer" target='_blank'>
                            <img src="/linkedin.png" width="25px" height="25px" alt="linkedin" />
                        </a>
                    </div>

                    <div className='mx-2'>
                        <a href="https://github.com/k99sharma" rel="noreferrer" target='_blank'>
                            <img src="/github.png" width="25px" height="25px" alt="github" />
                        </a>
                    </div>

                    <div className='mx-2'>
                        <a href="https://www.kalashsharma.me" rel="noreferrer" target='_blank'>
                            <img src="/web.png" width="25px" height="25px" alt="portfolio" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className='footer__contact my-5'>
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <div className='flex'>
                        <div>
                            <input className='p-2 rounded-l-md' type='text' name='contactme' placeholder='Enter your email address' />
                        </div>
                        <button type='submit' className='bg-amber-400 rounded-r-md p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

function Copyright() {
    return (
        <>
            <div className='footer__copyright text-sm text-white'>
                © 2022 Mount Pizza. All rights reserved.
            </div>
        </>
    );
}

export function Footer() {
    return (
        <>
            <div className="footer grid grid-cols-1 items-center justify-items-start md:grid-cols-2 bg-black py-10 px-28">
                <div className='footer__left'>
                    <CompanyName />

                    <FollowMe />
                </div>

                <div className='footer__right flex items-center justify-items-center'>
                    <div>
                        <Contact />

                        <Copyright />
                    </div>
                </div>
            </div>
        </>
    );
}