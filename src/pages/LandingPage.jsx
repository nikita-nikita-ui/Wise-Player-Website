import React, { useState, useRef, useEffect } from 'react'; // Fix: useState add kiya
import { ChevronRight, Tv, Download, Monitor, Smile, Plus, X } from 'lucide-react';
import bgImage from '../assets/bg.jpg';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
function WisePlayerHome() {
    const [openFaq, setOpenFaq] = useState(null); // FAQ state
    const navigate = useNavigate();
    const movieContainerRef = useRef(null);
   useEffect(() => {
    const container = movieContainerRef.current;
    if (!container) return;

    // Animation: Grid ko left shift karein
    gsap.to(container, {
        x: `-${container.scrollWidth / 2}px`, // Pure width ka aadha shift
        duration: 15, // Speed control (jitna kam utna tez)
        ease: "linear", // Smooth chalne ke liye
        repeat: -1, // Infinite
    });
}, []);
    const faqs = [
        {
            q: "What is WisePlayer?",
            a: "WisePlayer is a premium online streaming platform, similar to HotPlayer, that offers a vast library of movies, TV shows, and live content. It is designed to provide a seamless high-definition viewing experience across multiple genres and languages."
        },
        {
            q: "How much does WisePlayer cost?",
            a: "WisePlayer offers flexible pricing to suit your needs. You can start with our basic ad-supported version for free, or upgrade to a Premium Plan starting at ₹149/month for an ad-free experience, offline downloads, and access to exclusive original content."
        },
        {
            q: "Where can I watch?",
            a: "You can watch WisePlayer anytime, anywhere. It is compatible with all major internet-connected devices, including Android and iOS smartphones, Tablets, Smart TVs, and web browsers on your Laptop or PC."
        },
        {
            q: "Is WisePlayer safe to use?",
            a: "Yes, WisePlayer is a fully secure and legal streaming service. We prioritize user privacy and data protection, ensuring a safe environment for you and your family to enjoy world-class entertainment without any security risks."
        }
    ];

    const movies = [
        { id: 1, img: "https://picsum.photos/seed/img1/200/300" },
        { id: 2, img: "https://picsum.photos/seed/img2/200/300" },
        { id: 3, img: "https://picsum.photos/seed/img3/200/300" },
        { id: 4, img: "https://picsum.photos/seed/img4/200/300" },
        { id: 5, img: "https://picsum.photos/seed/img5/200/300" },
        { id: 6, img: "https://picsum.photos/seed/img6/200/300" }
    ];

    const reasons = [
        { title: "Enjoy on your TV", desc: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, and more.", icon: <Tv size={50} color="#E50914" /> }, // Fix: TV capital mein
        { title: "Download shows", desc: "Save your favourites easily and always have something to watch offline.", icon: <Download size={50} color="#E50914" /> },
        { title: "Watch everywhere", desc: "Stream unlimited movies and TV shows on your phone, tablet, and laptop.", icon: <Monitor size={50} color="#E50914" /> },
        { title: "Profiles for kids", desc: "Send kids on adventures with their favourite characters in a space made for them.", icon: <Smile size={50} color="#E50914" /> }
    ];

    return (
        <div className="netflix-container">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap');

                .netflix-container {
                    position: relative;
                    width: 100%;
                    min-height: 100vh;
                    background: url(${bgImage}) no-repeat center center fixed; 
                    background-size: cover;
                    font-family: 'Roboto', sans-serif;
                    color: white;
                    display: flex;
                    flex-direction: column;
                }

                .background-overlay {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0, 0, 0, 0.7); 
                    z-index: 1;
                }

                .navbar {
                    position: relative;
                    z-index: 10;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 10%;
                }

                .logo { 
                    color: #E50914; 
                    font-size: 42px; 
                    font-weight: 900; 
                    text-transform: uppercase; 
                    letter-spacing: 2px;
                    cursor: pointer;
                    transition: 0.4s ease-in-out;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    animation: logo-glow 2.5s infinite alternate; 
                }

                @keyframes logo-glow {
                    0% { text-shadow: 0 0 10px rgba(229, 9, 20, 0.5); }
                    100% { text-shadow: 0 0 25px rgba(229, 9, 20, 1); }
                }

                .logo:hover { transform: scale(1.1); text-shadow: 0 0 15px #ff0000; }

                .hero-content {
                    position: relative;
                    z-index: 10;
                    text-align: center;
                    margin: 80px auto;
                    max-width: 850px;
                }

                .hero-content h1 { font-size: 50px; font-weight: 900; margin-bottom: 10px; }
                .price-tag { font-size: 24px; margin-bottom: 20px; }

                .more-section {
                    position: relative;
                    z-index: 10;
                    padding: 40px 5%;
                }

                .more-header {
                    font-size: 28px;
                    border-bottom: 3px solid #E50914;
                    display: inline-block;
                    margin-bottom: 20px;
                    font-weight: bold;
                     animation: fadeInSlide 1s ease-out forwards;
    opacity: 0; 
                }

                .movie-grid {
                    display: flex;
    gap: 15px;
    width: max-content; 
    padding-bottom: 20px;
                }

                .movie-wrapper {
    width: 100%;
    overflow: hidden; /* Yeh bahar ke cards ko hide karega */
}
                .movie-card {
                    min-width: 200px;
                    height: 250px;
                    border-radius: 8px;
                    overflow: hidden;
                    transition: 0.3s;
                }
                .movie-card:hover { transform: scale(1.05); }
                .movie-card img { width: 100%; height: 100%; object-fit: cover; }

                .signin-btn {
                    background: #E50914;
                    color: white;
                    border: none;
                    padding: 8px 20px;
                    border-radius: 4px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease-in-out;
                    box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3);
                    animation: pulse-red 2s infinite;
                }

                @keyframes pulse-red {
                    0% { box-shadow: 0 0 0 0 rgba(229, 9, 20, 0.7); }
                    70% { box-shadow: 0 0 0 10px rgba(229, 9, 20, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(229, 9, 20, 0); }
                }

                .reasons-section { padding: 40px 10%; position: relative; z-index: 10; text-align: center; border-bottom: 3px solid #E50914; }
                .reasons-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
                .reason-card {
                    background: linear-gradient(135deg, #ffffff 0%, #fceeee 100%);
                    padding: 25px; border-radius: 16px; min-height: 250px; color: #1a1a1a;
                    display: flex; flex-direction: column; justify-content: space-between;
                    opacity: 0; /* Shuruat mein hidden */
    animation: fadeInSlide 1s ease-out forwards;
                }
.reason-card:nth-child(1) { animation-delay: 0.2s; }
.reason-card:nth-child(2) { animation-delay: 0.4s; }
.reason-card:nth-child(3) { animation-delay: 0.6s; }
.reason-card:nth-child(4) { animation-delay: 0.8s; }
                /* FAQ Section Styling */

.faq-section { 
    background: linear-gradient(135deg, #460f0f 0%, #3a0202 100%) !important; 
    min-height: 200px;
    position: relative;
    z-index: 999; 
    text-align: center;
    border-bottom: 3px solid #E50914;
}          
.reasons-title { 
    font-size: 28px; 
    margin-bottom: 20px;
    font-weight: bold;
    animation: fadeInSlide 1s ease-out forwards;
    opacity: 0;
    display: inline-block; 
    border-bottom: 3px solid #E50914; 
    padding-bottom: 5px; 
}
.faq-title {
    color: white !important; 
    font-weight: bold;
    animation: fadeInSlide 1.5s ease-out forwards;
    opacity: 0; 
}
    @keyframes fadeInSlide {
    0% {
        opacity: 0;
        transform: translateY(20px); /* 20px niche se start hoga */
    }
    100% {
        opacity: 1;
        transform: translateY(0);    /* Apni asli jagah par aa jayega */
    }
            }
    .faq-list { max-width: 1200px; margin: 40px auto; text-align: left; }
                .faq-item { margin-bottom: 8px; }
                .faq-question { 
                    background: #2d2d2d; padding: 20px 30px; display: flex; justify-content: space-between; 
                    align-items: center; cursor: pointer; font-size: 20px;
                }
                .faq-answer { 
                    background: #2d2d2d; max-height: 0; overflow: hidden; transition: all 0.4s ease;
                    font-size: 18px; line-height: 1.6; border-top: 1px solid black;
                }
                .faq-answer.show { max-height: 400px; padding: 25px; }

                .wiseplayer-footer-section {
  background-color: #494949;
  color: white;
  padding: 50px 20px;
  font-family: sans-serif;
}



.input-group { display: flex; justify-content: center; gap: 10px; margin-top: 20px; }
.input-group input { padding: 15px; width: 300px; border: 1px solid #555; background: transparent; color: white; }
.btn-start { background: #e50914; color: white; padding: 15px 30px; border: none; font-weight: bold; cursor: pointer; }

.footer-links { max-width: 900px; margin: 0 auto; color: rgb(255, 255, 255); font-size: 16px; }
.link-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 20px 0;
  font-size: 15px;
  font-width: bold;
}
.link-grid a { color: #f8f3f3; text-decoration: underline; }
.brand-name { margin-top: 20px; font-weight: bold; color: #f7f4f4; }
            `}</style>

            <div className="background-overlay"></div>

            <nav className="navbar">
                <div className="logo">Wise Player</div>
                <button className="signin-btn" onClick={() => navigate('/login')}>Sign In</button>
            </nav>

            <main className="hero-content">
                <h1>Unlimited movies, shows, and more</h1>
                <p className="price-tag">Starts at anytime.</p>
            </main>

            <section className="more-section">
                <div style={{ textAlign: 'center' }}>
        <h2 className="more-header">More to Watch</h2>
                </div>
                    <div className="movie-wrapper">
                <div className="movie-grid" ref={movieContainerRef}>
                    {[...movies, ...movies].map((movie, index) => (
                        <div key={index} className="movie-card">
                            <img src={movie.img} alt={`Movie ${index}`} />
                        </div>
                    ))}
                </div>
                 </div>
            </section>

            <section className="reasons-section">
    <h2 className="reasons-title">More reasons to join</h2>
                <div className="reasons-grid">
                    {reasons.map((item, index) => (
                        <div key={index} className="reason-card">
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                            <div className="icon-box">{item.icon}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="faq-section">
                <h2 class="faq-title" style={{ fontSize: '32px', marginLeft: '95px' }}>Frequently Asked Questions</h2>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <div className="faq-question" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                                <span>{faq.q}</span>
                                {openFaq === index ? <X size={30} /> : <Plus size={30} />}
                            </div>
                            <div className={`faq-answer ${openFaq === index ? 'show' : ''}`}>
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section class="wiseplayer-footer-section">
  <div class="footer-links">
    <p>Questions? Call 000-800-000-0000</p>
    <div class="link-grid">
      <a href="#">About Us</a>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Help Center</a>
      <a href="#">Partnerships</a>
      <a href="#">Security</a>
    </div>
    <div class="brand-name">WisePlayer India</div>
  </div>
</section>
        </div>
    );
}

export default WisePlayerHome;