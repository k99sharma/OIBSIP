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
                        <a className='text-amber-400' href="https://www.kalashsharma.me">
                            ghost_32
                        </a>
                    </span>
                </div>
            </div>

            <div className='footer__followme__links flex justify-center items-center py-3'>
                <div className='flex'>
                    <div className='mx-2'>
                        <a href="https://www.linkedin.com/in/kalashsharma99/" target='_blank'>
                            <img src="/linkedin.png" width="25px" height="25px" alt="linkedin" />
                        </a>
                    </div>

                    <div className='mx-2'>
                        <a href="https://github.com/k99sharma" target='_blank'>
                            <img src="/github.png" width="25px" height="25px" alt="github" />
                        </a>
                    </div>

                    <div className='mx-2'>
                        <a href="https://www.kalashsharma.me" target='_blank'>
                            <img src="/web.png" width="25px" height="25px" alt="portfolio" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export function Footer() {
    return (
        <>
            <div className="footer grid grid-cols-1 items-center justify-items-start md:grid-cols-2 bg-black py-10 px-28">
                <div className='footer__left'>
                    <CompanyName />

                    <FollowMe />
                </div>

                <div className='footer__right'>
                    <div className='footer__copyright text-sm text-white'>
                        © 2022 Mount Pizza. All rights reserved.
                    </div>
                </div>
            </div>
        </>
    );
}