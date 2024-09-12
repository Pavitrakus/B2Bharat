import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@src/contexts/AuthContext';
import { Store, Truck, Package, BookOpen, Users, CreditCard, BarChart3, Mic, CheckCircle, Loader2, Zap } from 'lucide-react';

export default function RoleSelect() {
    const { setUserRole, user } = useAuth();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleSelect = async (role) => {
        setSelected(role);
        setIsAnimating(true);

        setTimeout(async () => {
            await setUserRole(role);
            navigate(role === 'retailer' ? '/retailer' : '/wholesaler');
        }, 600);
    };

    const roles = [
        {
            id: 'retailer',
            icon: Store,
            title: 'I am a Retailer',
            titleHi: 'Main Retailer Hoon',
            desc: 'Kirana store, general store, or any retail business owner',
            features: [
                { icon: Package, label: 'Stock Management' },
                { icon: BookOpen, label: 'Customer Khata' },
                { icon: Store, label: 'Order from Wholesalers' },
                { icon: Mic, label: 'Voice Commands' }
            ],
            color: 'var(--gradient-saffron)',
            accent: 'var(--saffron)',
            bgGlow: 'rgba(255, 107, 53, 0.15)'
        },
        {
            id: 'wholesaler',
            icon: Truck,
            title: 'I am a Wholesaler',
            titleHi: 'Main Wholesaler Hoon',
            desc: 'Supply products to retailers or run a distribution business',
            features: [
                { icon: Users, label: 'Retailer Network' },
                { icon: CreditCard, label: 'Credit Management' },
                { icon: BarChart3, label: 'Sales Analytics' },
                { icon: Mic, label: 'Voice Commands' }
            ],
            color: 'var(--gradient-peacock)',
            accent: 'var(--peacock-blue)',
            bgGlow: 'rgba(15, 76, 129, 0.15)'
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Gradient Mesh Background */}
            <div className="gradient-mesh" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

            {/* Animated Top Border */}
            <div className="border-animated" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }} />

            {/* Content */}
            <div style={{
                maxWidth: '900px',
                width: '100%',
                textAlign: 'center',
                position: 'relative',
                zIndex: 5
            }}>
                {/* Welcome Message */}
                <div style={{
                    marginBottom: '3rem',
                    animation: 'slide-up 0.6s ease'
                }}>
                    {user?.displayName && (
                        <p style={{
                            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                            color: 'var(--text-light)',
                            marginBottom: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}>
                            Welcome, <span style={{ color: 'var(--saffron)', fontWeight: 600 }}>{user.displayName}</span>
                        </p>
                    )}

                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        fontWeight: 800,
                        color: 'var(--deep-maroon)',
                        marginBottom: '0.75rem',
                        lineHeight: 1.2
                    }}>
                        Choose Your Role
                    </h1>

                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        color: 'var(--text-medium)',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        Select how you want to use B2Bharat
                    </p>
                </div>

                {/* Role Cards */}
                <div className="responsive-grid-2" style={{ marginBottom: '2rem' }}>
                    {roles.map((role, index) => (
                        <button
                            key={role.id}
                            onClick={() => handleSelect(role.id)}
                            disabled={isAnimating}
                            className="glass-panel"
                            style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                border: selected === role.id ? `3px solid ${role.accent}` : '2px solid transparent',
                                borderRadius: 'var(--radius-xl)',
                                padding: '2.5rem 2rem',
                                cursor: isAnimating ? 'wait' : 'pointer',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: selected === role.id ? 'scale(1.03)' : 'scale(1)',
                                boxShadow: selected === role.id
                                    ? `0 25px 50px ${role.bgGlow}`
                                    : '0 8px 32px rgba(139, 21, 56, 0.1)',
                                animation: `slide-up 0.6s ease ${index * 0.15}s both`,
                                opacity: selected && selected !== role.id ? 0.6 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (!isAnimating && !selected) {
                                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                    e.currentTarget.style.boxShadow = `0 25px 50px ${role.bgGlow}`;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isAnimating && selected !== role.id) {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 21, 56, 0.1)';
                                }
                            }}
                        >
                            {/* Top Gradient Bar */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: role.color
                            }} />

                            {/* Decorative corner accents */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, width: '50px', height: '50px',
                                borderTop: `3px solid ${role.accent}`, borderLeft: `3px solid ${role.accent}`,
                                borderRadius: 'var(--radius-xl) 0 0 0', opacity: 0.2
                            }} />
                            <div style={{
                                position: 'absolute', bottom: 0, right: 0, width: '50px', height: '50px',
                                borderBottom: `3px solid ${role.accent}`, borderRight: `3px solid ${role.accent}`,
                                borderRadius: '0 0 var(--radius-xl) 0', opacity: 0.2
                            }} />

                            {/* Icon */}
                            <div style={{
                                width: '90px',
                                height: '90px',
                                margin: '0 auto 1.5rem',
                                background: role.color,
                                borderRadius: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                transition: 'all 0.3s ease',
                                boxShadow: selected === role.id
                                    ? `0 15px 40px ${role.bgGlow}`
                                    : `0 10px 30px ${role.bgGlow}`
                            }}>
                                <role.icon size={42} color="white" />

                                {/* Selection checkmark */}
                                {selected === role.id && (
                                    <div style={{
                                        position: 'absolute', top: '-8px', right: '-8px',
                                        width: '28px', height: '28px', borderRadius: '50%',
                                        background: 'var(--henna-green)', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        animation: 'bounce-in 0.4s ease'
                                    }}>
                                        <CheckCircle size={18} color="white" />
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <h2 style={{
                                fontSize: 'clamp(1.35rem, 3vw, 1.6rem)',
                                fontWeight: 700,
                                color: 'var(--deep-maroon)',
                                marginBottom: '0.25rem'
                            }}>
                                {role.title}
                            </h2>
                            <span style={{
                                fontSize: '0.9rem',
                                color: role.accent,
                                fontWeight: 600,
                                display: 'block',
                                marginBottom: '1rem'
                            }}>
                                {role.titleHi}
                            </span>

                            {/* Description */}
                            <p style={{
                                fontSize: '0.95rem',
                                color: 'var(--text-light)',
                                marginBottom: '1.5rem',
                                lineHeight: 1.6
                            }}>
                                {role.desc}
                            </p>

                            {/* Features */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '0.75rem'
                            }}>
                                {role.features.map((feature, i) => (
                                    <div key={i} style={{
                                        fontSize: '0.8rem',
                                        padding: '0.5rem 0.75rem',
                                        background: `${role.accent}10`,
                                        color: role.accent,
                                        borderRadius: '10px',
                                        fontWeight: 500,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        justifyContent: 'center'
                                    }}>
                                        <feature.icon size={14} />
                                        {feature.label}
                                    </div>
                                ))}
                            </div>

                            {/* Loading indicator */}
                            {selected === role.id && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '1.5rem',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: role.color,
                                    color: 'white',
                                    padding: '0.6rem 1.5rem',
                                    borderRadius: '50px',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    animation: 'bounce-in 0.4s ease'
                                }}>
                                    <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                                    Setting up...
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Bottom tagline */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    color: 'var(--text-light)',
                    fontSize: '0.9rem',
                    animation: 'slide-up 0.6s ease 0.4s both'
                }}>
                    <Zap size={18} color="var(--saffron)" />
                    <span>Transform your business with voice-first technology</span>
                    <Zap size={18} color="var(--saffron)" />
                </div>
            </div>

            {/* Bottom Gradient Border */}
            <div className="border-gradient" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }} />

            {/* Add spin animation */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
// updated render
// updated module
// updated adapter
// updated helper
// updated observer
// updated route
// updated render
// updated adapter
// updated adapter
// updated module
// updated util
// updated provider
// updated resolver
// updated schema
// updated style
// updated helper
// updated logic
// updated variable
// updated factory
// updated function
// updated binding
// updated builder
// updated render
// updated listener
