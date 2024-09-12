import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@src/contexts/AuthContext';
import { useLanguage } from '@src/contexts/LanguageContext';
import { setupRecaptcha, sendOTP, verifyOTP } from '@src/services/firebase';
import LanguageSelector from '@src/components/LanguageSelector';
import {
    Mic, Package, BookOpen, BarChart3, Smartphone, MessageSquare, CheckCircle,
    ArrowRight, Play, Star, Store, TrendingUp, Users, ShoppingBag,
    Phone, Mail, Lock, Eye, EyeOff, X, ChevronRight, Sparkles, Zap, Shield
} from 'lucide-react';

export default function LoginPage() {
    const { user, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [authTab, setAuthTab] = useState('phone');
    const [isSignUp, setIsSignUp] = useState(false);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (user) navigate('/select-role');
    }, [user, navigate]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSendOTP = async () => {
        if (phone.length < 10) {
            setError('Valid phone number daalo');
            return;
        }
        setLoading(true);
        setError('');
        try {
            setupRecaptcha('recaptcha-container');
            const fullPhone = phone.startsWith('+') ? phone : `+91${phone}`;
            await sendOTP(fullPhone);
            setOtpSent(true);
        } catch (err) {
            setError('OTP bhejne mein dikkat hui. Phir try karo.');
        }
        setLoading(false);
    };

    const handleVerifyOTP = async () => {
        setLoading(true);
        setError('');
        try {
            await verifyOTP(otp);
            navigate('/select-role');
        } catch (err) {
            setError('OTP galat hai. Check karo.');
        }
        setLoading(false);
    };

    const handleEmailAuth = async () => {
        if (!email || !password) {
            setError('Email aur password daalo');
            return;
        }
        setLoading(true);
        setError('');
        try {
            if (isSignUp) {
                await signUpWithEmail(email, password);
            } else {
                await signInWithEmail(email, password);
            }
            navigate('/select-role');
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError('');
        try {
            await signInWithGoogle();
            navigate('/select-role');
        } catch (err) {
            setError('Google sign-in mein dikkat hui');
        }
        setLoading(false);
    };

    const features = [
        { icon: Mic, title: 'Voice Commands', titleHi: 'Bolo Aur Karo', desc: 'Hindi ya English mein bolo, kaam ho jayega. Typing ki zaroorat nahi!', color: 'var(--saffron)' },
        { icon: Package, title: 'Smart Inventory', titleHi: 'Stock Management', desc: 'Automatic stock alerts, expiry tracking, aur reorder suggestions.', color: 'var(--peacock-blue)' },
        { icon: BookOpen, title: 'Digital Khata', titleHi: 'Udhari Ledger', desc: 'Customer ka hisaab-kitaab digital. Kabhi bhoolna nahi!', color: 'var(--deep-maroon)' },
        { icon: BarChart3, title: 'Business Insights', titleHi: 'Bikri Reports', desc: 'Daily, weekly, monthly reports. Jaano kya bik raha hai.', color: 'var(--henna-green)' },
    ];

    const steps = [
        { num: '01', icon: Smartphone, title: 'Account Banao', desc: 'Phone number se sign up - sirf 30 seconds!' },
        { num: '02', icon: Mic, title: 'Bolo Aur Likho', desc: 'Mic dabao, Hindi mein bolo - voice se sab manage karo' },
        { num: '03', icon: CheckCircle, title: 'Kaam Ho Gaya!', desc: 'Stock update, order place, udhari track - sab automatic!' },
    ];

    const testimonials = [
        { name: 'Ramesh Kumar', location: 'Delhi', shop: 'Ramesh General Store', text: 'Pehle register mein likhta tha, ab bolta hoon aur ho jata hai. Time ki bahut bachat!', rating: 5 },
        { name: 'Sunita Devi', location: 'Jaipur', shop: 'Sunita Kirana', text: 'Hindi mein baat kar sakti hoon phone se. Bahut easy hai, mujhe typing nahi aati thi.', rating: 5 },
        { name: 'Mohammed Irfan', location: 'Lucknow', shop: 'Irfan Traders', text: 'Wholesaler se direct order de deta hoon voice se. Pehle phone karna padta tha.', rating: 5 },
    ];

    const stats = [
        { value: '6 Cr+', label: 'Kirana Stores', sublabel: 'India mein', icon: Store },
        { value: '₹50L Cr', label: 'B2B Market', sublabel: 'Size', icon: TrendingUp },
        { value: '85%', label: 'Unorganized', sublabel: 'Sector', icon: ShoppingBag },
        { value: '10L+', label: 'Daily Orders', sublabel: 'Potential', icon: Users },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
            {/* Single Background Pattern - Subtle Rangoli */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 0,
                backgroundImage: 'url(/images/pattern.png)',
                backgroundSize: '400px',
                backgroundPosition: 'center',
                opacity: 0.03,
                pointerEvents: 'none'
            }} />

            {/* Clean corner accents with images */}
            <img src="/images/rangoli.png" alt="" style={{
                position: 'fixed', bottom: '-50px', right: '-50px', width: '300px', opacity: 0.08,
                pointerEvents: 'none', zIndex: 1, transform: 'rotate(-15deg)'
            }} className="hide-mobile" />
            <img src="/images/lotus.png" alt="" style={{
                position: 'fixed', top: '100px', left: '-30px', width: '150px', opacity: 0.06,
                pointerEvents: 'none', zIndex: 1
            }} className="hide-mobile" />

            {/* Animated Top Border */}
            <div className="border-animated" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }} />

            {/* Navigation */}
            <nav className="glass-panel" style={{
                position: 'fixed', top: scrolled ? '3px' : '20px', left: '50%', transform: 'translateX(-50%)',
                width: scrolled ? '100%' : 'min(95%, 1200px)', maxWidth: '1200px',
                padding: '0.75rem 1.5rem', zIndex: 1000,
                borderRadius: scrolled ? 0 : 'var(--radius-xl)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '12px',
                        background: 'var(--gradient-saffron)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Zap size={22} color="white" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--deep-maroon)', margin: 0 }}>
                            B2<span style={{ color: 'var(--saffron)' }}>Bharat</span>
                        </h1>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-light)', letterSpacing: '0.5px' }}>Voice-First Trading</span>
                    </div>
                </div>

                <div className="hide-mobile" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <a href="#features" style={{ color: 'var(--text-medium)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}>{t('nav.features')}</a>
                    <a href="#how-it-works" style={{ color: 'var(--text-medium)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}>{t('nav.howItWorks')}</a>
                    <a href="#testimonials" style={{ color: 'var(--text-medium)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}>{t('nav.reviews')}</a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <LanguageSelector variant="compact" />
                    <button onClick={() => setShowModal(true)} className="btn btn-saffron" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                        <Sparkles size={16} /> {t('nav.startFree')}
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{
                minHeight: '100vh', display: 'flex', alignItems: 'center',
                padding: '120px 1.5rem 4rem', position: 'relative', zIndex: 1
            }}>
                <div className="responsive-grid-2" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', gap: '4rem', alignItems: 'center' }}>
                    {/* Hero Content */}
                    <div style={{ textAlign: 'left' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            background: 'rgba(255, 107, 53, 0.1)', padding: '0.5rem 1rem',
                            borderRadius: '50px', marginBottom: '1.5rem',
                            border: '1px solid rgba(255, 107, 53, 0.2)'
                        }}>
                            <Sparkles size={14} color="var(--saffron)" />
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--saffron-dark)' }}>
                                {t('hero.badge')}
                            </span>
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900,
                            color: 'var(--deep-maroon)', lineHeight: 1.1, marginBottom: '1.5rem'
                        }}>
                            <span style={{ display: 'block' }}>{t('hero.title1')}</span>
                            <span style={{
                                background: 'var(--gradient-saffron)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                display: 'block'
                            }}>{t('hero.title2')}</span>
                        </h1>

                        <p style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: 'var(--text-medium)',
                            marginBottom: '2rem', lineHeight: 1.7, maxWidth: '500px'
                        }}>
                            {t('hero.subtitle')}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
                            <button onClick={() => setShowModal(true)} className="btn btn-saffron glow-saffron" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                                <Mic size={20} /> {t('hero.cta')}
                            </button>
                            <a href="#how-it-works" className="btn btn-outline" style={{ textDecoration: 'none', fontSize: '1rem', padding: '1rem 1.5rem' }}>
                                <Play size={18} /> {t('hero.watchDemo')}
                            </a>
                        </div>

                        {/* Trust Indicators */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                            {[t('hero.free'), t('hero.hindiSupport'), t('hero.noTyping')].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <CheckCircle size={18} color="var(--henna-green)" />
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-medium)', fontWeight: 500 }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hero Visual - Interactive Voice Demo */}
                    <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <div style={{
                            position: 'relative', width: '100%', maxWidth: '400px'
                        }}>
                            {/* Animated Background Blobs */}
                            <div style={{
                                position: 'absolute', top: '-30px', left: '-30px', width: '150px', height: '150px',
                                background: 'var(--gradient-saffron)', borderRadius: '50%', filter: 'blur(60px)',
                                opacity: 0.4, animation: 'float 6s ease-in-out infinite'
                            }} />
                            <div style={{
                                position: 'absolute', bottom: '-20px', right: '-40px', width: '120px', height: '120px',
                                background: 'var(--gradient-peacock)', borderRadius: '50%', filter: 'blur(50px)',
                                opacity: 0.3, animation: 'float 8s ease-in-out infinite', animationDelay: '2s'
                            }} />

                            {/* Main Card */}
                            <div className="glass-panel" style={{
                                padding: '2rem', borderRadius: 'var(--radius-2xl)', position: 'relative',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,248,240,0.9))',
                                border: '1px solid rgba(255, 107, 53, 0.2)',
                                boxShadow: '0 25px 80px rgba(139, 21, 56, 0.15)'
                            }}>
                                {/* Phone Frame */}
                                <div style={{
                                    background: 'linear-gradient(180deg, #1a1a2e 0%, #2d2d44 100%)',
                                    borderRadius: '24px', padding: '12px', position: 'relative',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                                }}>
                                    {/* Phone Notch */}
                                    <div style={{
                                        position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)',
                                        width: '80px', height: '24px', background: '#000', borderRadius: '12px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                    }}>
                                        <div style={{ width: '8px', height: '8px', background: '#333', borderRadius: '50%' }} />
                                    </div>

                                    {/* Screen Content */}
                                    <div style={{
                                        background: 'linear-gradient(180deg, #fff8f0 0%, #fff 100%)',
                                        borderRadius: '16px', padding: '2.5rem 1.5rem 1.5rem', minHeight: '280px',
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {/* Animated Mic Button */}
                                        <div style={{
                                            position: 'relative', marginBottom: '1.5rem'
                                        }}>
                                            {/* Ripple Effects */}
                                            <div style={{
                                                position: 'absolute', inset: '-20px', borderRadius: '50%',
                                                border: '2px solid var(--saffron)', opacity: 0.3,
                                                animation: 'ripple 2s ease-out infinite'
                                            }} />
                                            <div style={{
                                                position: 'absolute', inset: '-35px', borderRadius: '50%',
                                                border: '2px solid var(--saffron)', opacity: 0.2,
                                                animation: 'ripple 2s ease-out infinite', animationDelay: '0.5s'
                                            }} />
                                            <div style={{
                                                position: 'absolute', inset: '-50px', borderRadius: '50%',
                                                border: '2px solid var(--saffron)', opacity: 0.1,
                                                animation: 'ripple 2s ease-out infinite', animationDelay: '1s'
                                            }} />

                                            {/* Mic Circle */}
                                            <div style={{
                                                width: '80px', height: '80px', borderRadius: '50%',
                                                background: 'var(--gradient-saffron)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                boxShadow: '0 10px 40px rgba(255, 107, 53, 0.4)',
                                                position: 'relative', zIndex: 1
                                            }}>
                                                <Mic size={36} color="white" />
                                            </div>
                                        </div>

                                        {/* Sound Wave Animation */}
                                        <div style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            gap: '4px', marginBottom: '1rem', height: '30px'
                                        }}>
                                            {[...Array(7)].map((_, i) => (
                                                <div key={i} style={{
                                                    width: '4px', background: 'var(--saffron)', borderRadius: '2px',
                                                    animation: 'soundWave 1s ease-in-out infinite',
                                                    animationDelay: `${i * 0.1}s`
                                                }} />
                                            ))}
                                        </div>

                                        {/* Voice Command Text */}
                                        <div style={{
                                            background: 'linear-gradient(135deg, rgba(255,107,53,0.1), rgba(255,165,0,0.1))',
                                            padding: '0.75rem 1.25rem', borderRadius: '20px',
                                            border: '1px solid rgba(255, 107, 53, 0.2)', marginBottom: '1rem'
                                        }}>
                                            <p style={{
                                                fontSize: '0.95rem', color: 'var(--deep-maroon)', fontWeight: 600,
                                                margin: 0, fontStyle: 'italic'
                                            }}>
                                                "20 packet Maggi add karo"
                                            </p>
                                        </div>

                                        {/* Processing Animation */}
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                                            color: 'var(--text-light)', fontSize: '0.8rem', marginBottom: '0.75rem'
                                        }}>
                                            <div style={{
                                                display: 'flex', gap: '4px'
                                            }}>
                                                {[0, 1, 2].map(i => (
                                                    <div key={i} style={{
                                                        width: '6px', height: '6px', borderRadius: '50%',
                                                        background: 'var(--saffron)',
                                                        animation: 'bounce 1.4s ease-in-out infinite',
                                                        animationDelay: `${i * 0.16}s`
                                                    }} />
                                                ))}
                                            </div>
                                            <span>Processing...</span>
                                        </div>

                                        {/* Success Response */}
                                        <div style={{
                                            background: 'linear-gradient(135deg, rgba(34,139,34,0.15), rgba(50,205,50,0.1))',
                                            padding: '0.75rem 1.25rem', borderRadius: '12px',
                                            border: '1px solid rgba(34, 139, 34, 0.3)',
                                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                                            animation: 'slideUp 0.5s ease'
                                        }}>
                                            <CheckCircle size={18} color="var(--henna-green)" />
                                            <span style={{ color: 'var(--henna-green)', fontWeight: 600, fontSize: '0.9rem' }}>
                                                +20 Maggi added to stock!
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Feature Tags */}
                                <div style={{
                                    position: 'absolute', top: '20px', right: '-60px',
                                    background: 'white', padding: '0.5rem 1rem', borderRadius: '20px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)', fontSize: '0.75rem',
                                    fontWeight: 600, color: 'var(--peacock-blue)', display: 'flex',
                                    alignItems: 'center', gap: '0.4rem', animation: 'float 4s ease-in-out infinite'
                                }} className="hide-mobile">
                                    <Zap size={12} /> Instant
                                </div>
                                <div style={{
                                    position: 'absolute', bottom: '40px', left: '-50px',
                                    background: 'white', padding: '0.5rem 1rem', borderRadius: '20px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)', fontSize: '0.75rem',
                                    fontWeight: 600, color: 'var(--henna-green)', display: 'flex',
                                    alignItems: 'center', gap: '0.4rem', animation: 'float 5s ease-in-out infinite', animationDelay: '1s'
                                }} className="hide-mobile">
                                    <Shield size={12} /> Accurate
                                </div>
                            </div>
                        </div>

                        {/* CSS Animations */}
                        <style>{`
                            @keyframes ripple {
                                0% { transform: scale(1); opacity: 0.4; }
                                100% { transform: scale(1.5); opacity: 0; }
                            }
                            @keyframes soundWave {
                                0%, 100% { height: 8px; }
                                50% { height: 24px; }
                            }
                            @keyframes bounce {
                                0%, 80%, 100% { transform: translateY(0); }
                                40% { transform: translateY(-8px); }
                            }
                            @keyframes slideUp {
                                from { opacity: 0; transform: translateY(10px); }
                                to { opacity: 1; transform: translateY(0); }
                            }
                        `}</style>
                    </div>
                </div>
            </section>

            {/* Elegant Divider */}
            <div className="border-gradient" />

            {/* Stats Section */}
            <section style={{
                padding: '5rem 1.5rem',
                background: 'linear-gradient(135deg, var(--deep-maroon), #5C0D24)',
                position: 'relative', zIndex: 1
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        textAlign: 'center', color: 'var(--marigold)', fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        fontWeight: 700, marginBottom: '0.5rem'
                    }}>
                        The Bharat B2B Opportunity
                    </h2>
                    <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', marginBottom: '3rem', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>
                        India's largest untapped market - and we're transforming it
                    </p>

                    <div className="stats-grid-mobile">
                        {stats.map((stat, i) => (
                            <div key={i} className="glass-panel-dark" style={{
                                textAlign: 'center', padding: '2rem 1.5rem',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'default'
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <stat.icon size={32} color="var(--saffron)" style={{ marginBottom: '1rem' }} />
                                <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--turmeric)' }}>
                                    {stat.value}
                                </div>
                                <div style={{ fontSize: '0.95rem', color: 'white', marginTop: '0.25rem' }}>{stat.label}</div>
                                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{stat.sublabel}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lotus Petal Border */}
            <div className="border-lotus-petals" />

            {/* Features Section */}
            <section id="features" style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            background: 'rgba(255, 107, 53, 0.1)', color: 'var(--saffron-dark)',
                            padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem'
                        }}>
                            <Zap size={14} /> Powerful Features
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--deep-maroon)', marginBottom: '0.75rem' }}>
                            Everything You Need to Grow
                        </h2>
                        <p style={{ color: 'var(--text-light)', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', maxWidth: '600px', margin: '0 auto' }}>
                            Built specifically for Indian retailers and wholesalers
                        </p>
                    </div>

                    <div className="responsive-grid">
                        {features.map((feature, i) => (
                            <div key={i} className="card-ornate glass-panel" style={{
                                padding: '2rem', textAlign: 'center',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'default'
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 25px 50px rgba(139, 21, 56, 0.15)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 21, 56, 0.1)'; }}
                            >
                                <div style={{
                                    width: '70px', height: '70px', borderRadius: '20px',
                                    background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.5rem', border: `2px solid ${feature.color}30`
                                }}>
                                    <feature.icon size={32} color={feature.color} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--deep-maroon)', marginBottom: '0.25rem' }}>{feature.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--saffron)', fontWeight: 600, marginBottom: '0.75rem' }}>{feature.titleHi}</p>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: 1.6 }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Animated Border */}
            <div className="border-animated" />

            {/* How It Works */}
            <section id="how-it-works" style={{ padding: '6rem 1.5rem', background: 'rgba(139, 21, 56, 0.03)', position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            background: 'var(--gradient-maroon)', color: 'white',
                            padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem'
                        }}>
                            <Play size={14} /> Simple Process
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--deep-maroon)', marginBottom: '0.75rem' }}>
                            Start in 3 Easy Steps
                        </h2>
                        <p style={{ color: 'var(--text-light)', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}>
                            Get up and running in under a minute
                        </p>
                    </div>

                    <div className="responsive-grid-3">
                        {steps.map((step, i) => (
                            <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                                {/* Step Number */}
                                <div style={{
                                    fontSize: '4rem', fontWeight: 900, color: 'rgba(255, 107, 53, 0.1)',
                                    position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)',
                                    fontFamily: 'monospace'
                                }}>{step.num}</div>

                                {/* Icon */}
                                <div style={{
                                    width: '80px', height: '80px', borderRadius: '50%',
                                    background: 'var(--gradient-saffron)', margin: '0 auto 1.5rem',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 10px 30px rgba(255, 107, 53, 0.25)',
                                    position: 'relative', zIndex: 1
                                }}>
                                    <step.icon size={35} color="white" />
                                </div>

                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--deep-maroon)', marginBottom: '0.5rem' }}>{step.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: 1.6 }}>{step.desc}</p>

                                {/* Arrow to next step */}
                                {i < steps.length - 1 && (
                                    <ChevronRight size={24} color="var(--saffron)" className="hide-mobile" style={{
                                        position: 'absolute', right: '-12px', top: '50px'
                                    }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Rangoli Border */}
            <div className="border-rangoli" />

            {/* Testimonials */}
            <section id="testimonials" style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            background: 'rgba(15, 76, 129, 0.1)', color: 'var(--peacock-blue)',
                            padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem'
                        }}>
                            <MessageSquare size={14} /> Customer Stories
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--deep-maroon)', marginBottom: '0.75rem' }}>
                            Loved by Thousands
                        </h2>
                        <p style={{ color: 'var(--text-light)', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}>
                            Real stories from real business owners
                        </p>
                    </div>

                    <div className="responsive-grid">
                        {testimonials.map((t, i) => (
                            <div key={i} className="glass-panel" style={{ padding: '2rem', position: 'relative' }}>
                                {/* Quote mark */}
                                <div style={{
                                    position: 'absolute', top: '1rem', right: '1.5rem',
                                    fontSize: '4rem', color: 'rgba(255, 107, 53, 0.1)', fontFamily: 'Georgia', lineHeight: 1
                                }}>"</div>

                                {/* Stars */}
                                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                                    {[...Array(t.rating)].map((_, j) => (
                                        <Star key={j} size={16} fill="var(--marigold)" color="var(--marigold)" />
                                    ))}
                                </div>

                                <p style={{ fontSize: '1rem', color: 'var(--text-medium)', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                                    "{t.text}"
                                </p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '50px', height: '50px', borderRadius: '50%',
                                        background: 'var(--gradient-saffron)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'white', fontWeight: 700, fontSize: '1.2rem'
                                    }}>
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, color: 'var(--deep-maroon)' }}>{t.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{t.shop}, {t.location}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '5rem 1.5rem',
                background: 'var(--gradient-festive)',
                position: 'relative', zIndex: 1
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
                        Ready to Transform Your Business?
                    </h2>
                    <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(255,255,255,0.9)', marginBottom: '2rem' }}>
                        Join thousands of businesses already using voice-first management
                    </p>
                    <button onClick={() => setShowModal(true)} className="btn" style={{
                        background: 'white', color: 'var(--deep-maroon)',
                        fontSize: '1.1rem', padding: '1rem 2.5rem', fontWeight: 700,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                    }}>
                        <Mic size={20} /> Start Free Now <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '3rem 1.5rem 2rem', background: '#1a1a2e', color: 'rgba(255,255,255,0.7)', position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="responsive-grid-3" style={{ marginBottom: '2rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <Zap size={24} color="var(--saffron)" />
                                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>B2Bharat</span>
                            </div>
                            <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                                India's first voice-first B2B trading platform, making business management simple for everyone.
                            </p>
                        </div>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '1rem', fontWeight: 600 }}>Quick Links</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <a href="#features" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>Features</a>
                                <a href="#how-it-works" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>How It Works</a>
                                <a href="#testimonials" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem' }}>Reviews</a>
                            </div>
                        </div>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '1rem', fontWeight: 600 }}>Contact</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                                <span>support@b2bharat.in</span>
                                <span>Made with pride in India</span>
                            </div>
                        </div>
                    </div>
                    <div className="border-gradient" style={{ marginBottom: '1.5rem', opacity: 0.3 }} />
                    <p style={{ textAlign: 'center', fontSize: '0.85rem' }}>
                        © 2024 B2Bharat. All rights reserved.
                    </p>
                </div>
            </footer>

            {/* Login Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 2000, padding: '1rem'
                }} onClick={() => setShowModal(false)}>
                    <div className="glass-panel" style={{
                        width: '100%', maxWidth: '420px', padding: '2rem',
                        position: 'relative', animation: 'slide-up 0.3s ease'
                    }} onClick={e => e.stopPropagation()}>
                        {/* Close button */}
                        <button onClick={() => setShowModal(false)} style={{
                            position: 'absolute', top: '1rem', right: '1rem',
                            background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem'
                        }}>
                            <X size={20} color="var(--text-light)" />
                        </button>

                        {/* Header */}
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '16px',
                                background: 'var(--gradient-saffron)', margin: '0 auto 1rem',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Zap size={28} color="white" />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--deep-maroon)', marginBottom: '0.25rem' }}>
                                Welcome to B2Bharat
                            </h2>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                                Sign in or create your account
                            </p>
                        </div>

                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.05)', padding: '4px', borderRadius: '12px' }}>
                            {[{ id: 'phone', label: 'Phone', icon: Phone }, { id: 'email', label: 'Email', icon: Mail }].map(tab => (
                                <button key={tab.id} onClick={() => { setAuthTab(tab.id); setError(''); }} style={{
                                    flex: 1, padding: '0.75rem', border: 'none', borderRadius: '10px',
                                    background: authTab === tab.id ? 'white' : 'transparent',
                                    color: authTab === tab.id ? 'var(--deep-maroon)' : 'var(--text-light)',
                                    fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s',
                                    boxShadow: authTab === tab.id ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
                                }}>
                                    <tab.icon size={16} /> {tab.label}
                                </button>
                            ))}
                        </div>

                        {error && (
                            <div style={{
                                background: 'rgba(220, 53, 69, 0.1)', color: '#dc3545',
                                padding: '0.75rem', borderRadius: '10px', marginBottom: '1rem',
                                fontSize: '0.85rem', textAlign: 'center'
                            }}>{error}</div>
                        )}

                        {/* Phone Auth */}
                        {authTab === 'phone' && (
                            <div>
                                {!otpSent ? (
                                    <>
                                        <div style={{ position: 'relative', marginBottom: '1rem' }}>
                                            <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                            <input type="tel" placeholder="Phone Number" value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                style={{
                                                    width: '100%', padding: '1rem 1rem 1rem 3rem',
                                                    border: '2px solid rgba(0,0,0,0.1)', borderRadius: '12px',
                                                    fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = 'var(--saffron)'}
                                                onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
                                            />
                                        </div>
                                        <div id="recaptcha-container" style={{ marginBottom: '1rem' }} />
                                        <button onClick={handleSendOTP} disabled={loading} className="btn btn-saffron" style={{ width: '100%', padding: '1rem' }}>
                                            {loading ? 'Sending...' : 'Send OTP'}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ position: 'relative', marginBottom: '1rem' }}>
                                            <Shield size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                            <input type="text" placeholder="Enter OTP" value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                style={{
                                                    width: '100%', padding: '1rem 1rem 1rem 3rem',
                                                    border: '2px solid rgba(0,0,0,0.1)', borderRadius: '12px',
                                                    fontSize: '1rem', outline: 'none', letterSpacing: '4px', textAlign: 'center'
                                                }}
                                            />
                                        </div>
                                        <button onClick={handleVerifyOTP} disabled={loading} className="btn btn-saffron" style={{ width: '100%', padding: '1rem' }}>
                                            {loading ? 'Verifying...' : 'Verify OTP'}
                                        </button>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Email Auth */}
                        {authTab === 'email' && (
                            <div>
                                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                    <input type="email" placeholder="Email" value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{
                                            width: '100%', padding: '1rem 1rem 1rem 3rem',
                                            border: '2px solid rgba(0,0,0,0.1)', borderRadius: '12px',
                                            fontSize: '1rem', outline: 'none'
                                        }}
                                    />
                                </div>
                                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                    <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{
                                            width: '100%', padding: '1rem 3rem 1rem 3rem',
                                            border: '2px solid rgba(0,0,0,0.1)', borderRadius: '12px',
                                            fontSize: '1rem', outline: 'none'
                                        }}
                                    />
                                    <button onClick={() => setShowPassword(!showPassword)} style={{
                                        position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', padding: 0
                                    }}>
                                        {showPassword ? <EyeOff size={18} color="var(--text-light)" /> : <Eye size={18} color="var(--text-light)" />}
                                    </button>
                                </div>
                                <button onClick={handleEmailAuth} disabled={loading} className="btn btn-saffron" style={{ width: '100%', padding: '1rem', marginBottom: '0.75rem' }}>
                                    {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
                                </button>
                                <button onClick={() => setIsSignUp(!isSignUp)} style={{
                                    width: '100%', background: 'none', border: 'none',
                                    color: 'var(--saffron)', cursor: 'pointer', fontSize: '0.9rem'
                                }}>
                                    {isSignUp ? 'Already have an account? Sign In' : 'New here? Create Account'}
                                </button>
                            </div>
                        )}

                        {/* Divider */}
                        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
                            <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }} />
                            <span style={{ padding: '0 1rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>or</span>
                            <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }} />
                        </div>

                        {/* Google Sign In */}
                        <button onClick={handleGoogleSignIn} disabled={loading} style={{
                            width: '100%', padding: '1rem', border: '2px solid rgba(0,0,0,0.1)',
                            borderRadius: '12px', background: 'white', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                            fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)',
                            transition: 'all 0.2s'
                        }}>
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
// updated emitter
// updated binding
// updated component
// updated variable
// updated binding
// updated state
// updated helper
// updated controller
// updated dispatcher
// updated util
// updated builder
// updated middleware
// updated controller
// updated component
// updated dispatcher
// updated render
// updated helper
// updated provider
// updated function
// updated config
// updated component
// updated transformer
// updated render
// updated middleware
// updated middleware
// updated variable
// updated listener
// updated render
// updated model
// updated handler
// updated logic
