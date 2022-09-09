import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useSpring, animated, easings } from 'react-spring'
import AfterHero from '../components/afterHero'
import { Statistics } from '../components/stats'
import { Faq } from '../components/faq'
import { Featured } from '../components/featured'
import { Footer } from '../components/footer'
import { Header } from '../components/header'
import { Hero } from '../components/hero'
import { Partners } from '../components/partners'
import { Testimonial } from '../components/testimonial'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const loadingScreenAnimation = useSpring({
    from: LOADING_SCREEN_FROM,
    to: LOADING_SCREEN_TO,
    config: {
      duration: 500,
      easing: easings.easeInOutCirc,
    },
    delay: 2200,
  });

  useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2550);
      return () => clearTimeout();
  }, [])
  

  return (
    <div>
      <Head>
        <title>Beauland - A beauty Store Landing Page</title>
        <meta name="description" content="Beutland - A beauty Store Landing Page built on NextJS, TailwindCSS and React Spring" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading && (
        <animated.div
          className="absolute bg-[#f1e3ef]"
          style={loadingScreenAnimation}
        ></animated.div>
      )}
      <div className='relative'>
        <Header />
        <Hero />
      </div>
      <div className='snap-start'>
        <AfterHero />
      </div>
      <div className='snap-start'>
        <Featured />
      </div>
      <div className='snap-start'>
        <Statistics />
      </div>
      <div className='snap-start'>
        <Faq />
      </div>
      <div className='snap-start'>
        <Testimonial />
      </div>
      <div className='snap-start'>
        <Partners />
      </div>
      <div className='snap-start'>
        <Footer />
      </div>
    </div>
  )
}

const LOADING_SCREEN_TO = {
  width: "100vw",
  height: "100vh",
  zIndex: -10000,
  transform: "translate(33%, 100%)",
  opacity: 1,
};

const LOADING_SCREEN_FROM = {
  width: "100vw",
  height: "100vh",
  right: "0%",
  left: "0px",
  top: "0%",
  zIndex: 40,
  transform: "translate(0%, 0%)",
  opacity: 1,
};