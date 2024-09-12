// Retailer Dashboard - B2Bharat (Premium AI-First Design)
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@src/components/Sidebar';
import AICommandHub from '@src/components/AICommandHub';
import { useData } from '@src/contexts/DataContext';
import { useVoice } from '@src/contexts/VoiceContext';
import BillScanner from '@src/components/BillScanner';
import SalesBill from '@src/components/SalesBill';
import {
    TrendingUp,
    ShoppingCart,
    AlertTriangle,
    CreditCard,
    Package,
    Mic,
    MicOff,
    Camera,
    Receipt,
    Zap,
    ArrowRight,
    Volume2,
    Sparkles,
    IndianRupee,
    Clock,
    CheckCircle
} from 'lucide-react';

const RetailerDashboard = () => {
    const navigate = useNavigate();
    const { getSalesSummary, getCreditInfo, getLowStockItems, orders, transactions } = useData();
    const { isListening, startListening, stopListening, transcript, isProcessing, lastResult } = useVoice();

    const [greeting, setGreeting] = useState('');
    const [showScanner, setShowScanner] = useState(false);
    const [showBill, setShowBill] = useState(false);

    const sales = getSalesSummary();
    const credit = getCreditInfo();
    const lowStock = getLowStockItems();
    const recentTransactions = transactions?.slice(0, 4) || [];

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Suprabhat');
        else if (hour < 17) setGreeting('Namaskar');
        else setGreeting('Shubh Sandhya');
    }, []);

    const handleVoiceToggle = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    // AI Feature Cards - The main attractions!
    const aiFeatures = [
        {
            id: 'voice',
            icon: isListening ? MicOff : Mic,
            title: 'Voice Command',
            titleHi: 'Bolo Aur Karo',
            description: 'Hindi mein command do',
            gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8C00 100%)',
            shadow: 'rgba(255, 107, 53, 0.35)',
            action: handleVoiceToggle,
            active: isListening
        },
        {
            id: 'scan',
            icon: Camera,
            title: 'Scan Bill',
            titleHi: 'Bill Scan Karo',
            description: 'AI se bill padho',
            gradient: 'linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)',
            shadow: 'rgba(139, 21, 56, 0.35)',
            action: () => setShowScanner(true)
        },
        {
            id: 'bill',
            icon: Receipt,
            title: 'Create Bill',
            titleHi: 'Naya Bill Banao',
            description: 'GST bill generate',
            gradient: 'linear-gradient(135deg, #228B22 0%, #32CD32 100%)',
            shadow: 'rgba(34, 139, 34, 0.35)',
            action: () => setShowBill(true)
        },
        {
            id: 'quicksale',
            icon: Zap,
            title: 'Quick Sale',
            titleHi: 'Turant Bikri',
            description: 'Fast checkout',
            gradient: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)',
            shadow: 'rgba(255, 165, 0, 0.35)',
            action: () => navigate('/retailer/quicksale')
        }
    ];

    const stats = [
        {
            label: "Aaj Ki Bikri",
            value: `₹${sales.today.toLocaleString()}`,
            icon: IndianRupee,
            change: '+12% kal se',
            positive: true,
            bgColor: 'rgba(255, 107, 53, 0.08)',
            accentColor: '#FF6B35',
            borderColor: 'rgba(255, 107, 53, 0.2)'
        },
        {
            label: 'Pending Orders',
            value: orders.filter(o => o.status === 'pending').length,
            icon: ShoppingCart,
            change: 'Process karo',
            positive: true,
            bgColor: 'rgba(15, 76, 129, 0.08)',
            accentColor: '#0F4C81',
            borderColor: 'rgba(15, 76, 129, 0.2)'
        },
        {
            label: 'Credit Used',
            value: `₹${credit.used.toLocaleString()}`,
            icon: CreditCard,
            change: `/${credit.limit.toLocaleString()} limit`,
            positive: true,
            bgColor: 'rgba(139, 21, 56, 0.08)',
            accentColor: '#8B1538',
            borderColor: 'rgba(139, 21, 56, 0.2)'
        },
        {
            label: 'Low Stock',
            value: lowStock.length,
            icon: AlertTriangle,
            change: 'items',
            positive: lowStock.length === 0,
            bgColor: lowStock.length > 0 ? 'rgba(196, 30, 58, 0.08)' : 'rgba(34, 139, 34, 0.08)',
            accentColor: lowStock.length > 0 ? '#C41E3A' : '#228B22',
            borderColor: lowStock.length > 0 ? 'rgba(196, 30, 58, 0.2)' : 'rgba(34, 139, 34, 0.2)'
        },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#FDFBF9' }}>
            <Sidebar userRole="retailer" />

            <main style={{
                flex: 1,
                padding: '2rem 2.5rem',
                marginLeft: '280px',
                maxWidth: 'calc(100vw - 280px)',
                overflowX: 'hidden'
            }}>
                {/* Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h1 style={{
                                fontSize: '2.25rem',
                                fontWeight: 800,
                                color: '#2D1810',
                                marginBottom: '0.25rem',
                                letterSpacing: '-0.5px'
                            }}>
                                {greeting}!
                            </h1>
                            <p style={{ color: '#5C4033', fontSize: '1.05rem' }}>
                                Aapki dukaan ka aaj ka haal
                            </p>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(34, 139, 34, 0.1)',
                            borderRadius: '50px',
                            border: '1px solid rgba(34, 139, 34, 0.2)'
                        }}>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#228B22',
                                animation: 'pulse 2s ease-in-out infinite'
                            }} />
                            <span style={{ fontSize: '0.9rem', color: '#228B22', fontWeight: 600 }}>
                                Active
                            </span>
                        </div>
                    </div>
                </div>

                {/* ==================== AI FEATURES - MAIN HERO SECTION ==================== */}
                <div style={{
                    background: 'linear-gradient(135deg, #FFF8F0 0%, #FFFFFF 50%, #FFF5EB 100%)',
                    borderRadius: '24px',
                    padding: '1.75rem',
                    marginBottom: '2rem',
                    border: '2px solid rgba(255, 107, 53, 0.15)',
                    boxShadow: '0 8px 32px rgba(255, 107, 53, 0.08)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1.25rem'
                    }}>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            background: 'linear-gradient(135deg, #FF6B35 0%, #FFA500 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 16px rgba(255, 107, 53, 0.3)'
                        }}>
                            <Sparkles size={22} color="white" />
                        </div>
                        <div>
                            <h2 style={{
                                fontSize: '1.35rem',
                                fontWeight: 700,
                                color: '#2D1810',
                                margin: 0
                            }}>
                                AI Powered Tools
                            </h2>
                            <p style={{ fontSize: '0.9rem', color: '#5C4033', margin: 0 }}>
                                Voice, scan, bill - sab ek jagah
                            </p>
                        </div>
                    </div>

                    {/* AI Feature Cards Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1rem'
                    }}>
                        {aiFeatures.map((feature) => (
                            <button
                                key={feature.id}
                                onClick={feature.action}
                                style={{
                                    background: feature.active
                                        ? feature.gradient
                                        : 'white',
                                    border: feature.active
                                        ? 'none'
                                        : '2px solid #E8DDD5',
                                    borderRadius: '16px',
                                    padding: '1.25rem 1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    boxShadow: feature.active
                                        ? `0 8px 24px ${feature.shadow}`
                                        : '0 2px 8px rgba(0,0,0,0.04)'
                                }}
                                onMouseEnter={(e) => {
                                    if (!feature.active) {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = `0 12px 32px ${feature.shadow}`;
                                        e.currentTarget.style.borderColor = 'transparent';
                                        e.currentTarget.style.background = feature.gradient;
                                        e.currentTarget.querySelectorAll('.feature-text').forEach(el => {
                                            el.style.color = 'white';
                                        });
                                        e.currentTarget.querySelector('.feature-icon-bg').style.background = 'rgba(255,255,255,0.25)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!feature.active) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                                        e.currentTarget.style.borderColor = '#E8DDD5';
                                        e.currentTarget.style.background = 'white';
                                        e.currentTarget.querySelectorAll('.feature-text').forEach(el => {
                                            el.style.color = '#2D1810';
                                        });
                                        e.currentTarget.querySelector('.feature-icon-bg').style.background = feature.gradient;
                                    }
                                }}
                            >
                                {/* Icon */}
                                <div
                                    className="feature-icon-bg"
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '16px',
                                        background: feature.active ? 'rgba(255,255,255,0.25)' : feature.gradient,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: feature.active ? 'none' : `0 4px 12px ${feature.shadow}`,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <feature.icon size={26} color="white" />
                                </div>

                                {/* Text */}
                                <div style={{ textAlign: 'center' }}>
                                    <p
                                        className="feature-text"
                                        style={{
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            color: feature.active ? 'white' : '#2D1810',
                                            margin: '0 0 0.15rem 0',
                                            transition: 'color 0.3s ease'
                                        }}
                                    >
                                        {feature.title}
                                    </p>
                                    <p
                                        className="feature-text"
                                        style={{
                                            fontSize: '0.8rem',
                                            color: feature.active ? 'rgba(255,255,255,0.9)' : '#8B7355',
                                            margin: 0,
                                            transition: 'color 0.3s ease'
                                        }}
                                    >
                                        {feature.titleHi}
                                    </p>
                                </div>

                                {/* Active indicator animation */}
                                {feature.active && feature.id === 'voice' && (
                                    <div style={{
                                        display: 'flex',
                                        gap: '3px',
                                        position: 'absolute',
                                        bottom: '10px'
                                    }}>
                                        {[...Array(4)].map((_, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    width: '3px',
                                                    height: '12px',
                                                    background: 'rgba(255,255,255,0.8)',
                                                    borderRadius: '2px',
                                                    animation: `wave 0.6s ease-in-out infinite`,
                                                    animationDelay: `${i * 0.1}s`
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Voice Status Bar - Shows when active */}
                    {(isListening || isProcessing || lastResult?.response) && (
                        <div style={{
                            marginTop: '1rem',
                            padding: '1rem 1.25rem',
                            background: isListening
                                ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.12) 0%, rgba(255, 165, 0, 0.08) 100%)'
                                : lastResult?.response
                                    ? 'rgba(34, 139, 34, 0.08)'
                                    : '#f9f7f5',
                            borderRadius: '12px',
                            border: isListening
                                ? '1px solid rgba(255, 107, 53, 0.2)'
                                : lastResult?.response
                                    ? '1px solid rgba(34, 139, 34, 0.2)'
                                    : '1px solid #E8DDD5',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            {isListening && (
                                <>
                                    <div style={{ display: 'flex', gap: '3px' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    width: '4px',
                                                    height: '20px',
                                                    background: '#FF6B35',
                                                    borderRadius: '2px',
                                                    animation: `wave 0.5s ease-in-out infinite`,
                                                    animationDelay: `${i * 0.1}s`
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <span style={{ color: '#FF6B35', fontWeight: 600 }}>
                                        🎤 Sun raha hoon... Bolo!
                                    </span>
                                </>
                            )}

                            {isProcessing && (
                                <span style={{ color: '#5C4033' }}>
                                    ⏳ Samajh raha hoon...
                                </span>
                            )}

                            {lastResult?.response && !isListening && !isProcessing && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                                    <CheckCircle size={20} style={{ color: '#228B22' }} />
                                    <span style={{ color: '#228B22', fontWeight: 600 }}>
                                        {lastResult.response}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* ==================== STATS CARDS ==================== */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '1.25rem',
                    marginBottom: '2rem'
                }}>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            style={{
                                background: 'white',
                                borderRadius: '16px',
                                padding: '1.25rem',
                                border: `1px solid ${stat.borderColor}`,
                                transition: 'all 0.3s ease',
                                cursor: 'default'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                marginBottom: '0.75rem'
                            }}>
                                <span style={{
                                    fontSize: '0.85rem',
                                    color: '#5C4033',
                                    fontWeight: 500
                                }}>
                                    {stat.label}
                                </span>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '10px',
                                    background: stat.bgColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <stat.icon size={18} style={{ color: stat.accentColor }} />
                                </div>
                            </div>
                            <div style={{
                                fontSize: '1.75rem',
                                fontWeight: 800,
                                color: '#2D1810',
                                marginBottom: '0.25rem',
                                letterSpacing: '-0.5px'
                            }}>
                                {stat.value}
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                fontSize: '0.8rem',
                                color: stat.positive ? '#228B22' : '#C41E3A'
                            }}>
                                <TrendingUp size={12} />
                                {stat.change}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ==================== QUICK ACTIONS ==================== */}
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        marginBottom: '1rem',
                        color: '#2D1810',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <Zap size={18} style={{ color: '#FF6B35' }} />
                        Quick Actions
                    </h3>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => navigate('/retailer/orders')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.25rem',
                                background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C00 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(255, 107, 53, 0.25)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <ShoppingCart size={16} />
                            Naya Order
                        </button>
                        <button
                            onClick={() => navigate('/retailer/inventory')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.25rem',
                                background: 'white',
                                color: '#2D1810',
                                border: '2px solid #E8DDD5',
                                borderRadius: '12px',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Package size={16} />
                            Stock Add
                        </button>
                        <button
                            onClick={() => navigate('/retailer/ledger')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.25rem',
                                background: 'white',
                                color: '#2D1810',
                                border: '2px solid #E8DDD5',
                                borderRadius: '12px',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <CreditCard size={16} />
                            Ledger
                        </button>
                    </div>
                </div>

                {/* ==================== TWO COLUMN LAYOUT ==================== */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem'
                }}>
                    {/* Recent Activity */}
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '1.25rem',
                        border: '1px solid #E8DDD5'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1rem'
                        }}>
                            <h3 style={{
                                fontWeight: 600,
                                color: '#2D1810',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '1rem',
                                margin: 0
                            }}>
                                <Clock size={16} style={{ color: '#FF6B35' }} />
                                Recent Activity
                            </h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {recentTransactions.length > 0 ? recentTransactions.map((tx) => (
                                <div key={tx.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem',
                                    background: tx.type === 'sale'
                                        ? 'rgba(196, 30, 58, 0.05)'
                                        : 'rgba(34, 139, 34, 0.05)',
                                    borderRadius: '10px'
                                }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        background: tx.type === 'sale'
                                            ? 'rgba(196, 30, 58, 0.12)'
                                            : tx.type === 'stock'
                                                ? 'rgba(34, 139, 34, 0.12)'
                                                : tx.type === 'scan'
                                                    ? 'rgba(139, 21, 56, 0.12)'
                                                    : 'rgba(255, 107, 53, 0.12)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        {tx.type === 'sale' ? <TrendingUp size={16} style={{ color: '#C41E3A' }} />
                                            : tx.type === 'stock' ? <Package size={16} style={{ color: '#228B22' }} />
                                                : tx.type === 'scan' ? <Camera size={16} style={{ color: '#8B1538' }} />
                                                    : <Receipt size={16} style={{ color: '#FF6B35' }} />}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{
                                            fontWeight: 500,
                                            color: '#2D1810',
                                            fontSize: '0.9rem',
                                            margin: 0,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {tx.message}
                                        </p>
                                        <p style={{ fontSize: '0.75rem', color: '#888', margin: 0 }}>
                                            {new Date(tx.timestamp).toLocaleTimeString('en-IN', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                    {tx.amount && (
                                        <span style={{
                                            fontWeight: 700,
                                            fontSize: '0.9rem',
                                            color: tx.type === 'sale' ? '#C41E3A' : '#228B22'
                                        }}>
                                            {tx.type === 'sale' ? '+' : ''}₹{tx.amount.toLocaleString()}
                                        </span>
                                    )}
                                </div>
                            )) : (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '2rem',
                                    color: '#888'
                                }}>
                                    <p style={{ margin: 0 }}>Use voice or scan to get started!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Low Stock Alert */}
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '1.25rem',
                        border: lowStock.length > 0
                            ? '1px solid rgba(196, 30, 58, 0.2)'
                            : '1px solid #E8DDD5'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1rem'
                        }}>
                            <h3 style={{
                                fontWeight: 600,
                                color: '#2D1810',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '1rem',
                                margin: 0
                            }}>
                                <AlertTriangle size={16} style={{ color: lowStock.length > 0 ? '#C41E3A' : '#228B22' }} />
                                Low Stock {lowStock.length > 0 && `(${lowStock.length})`}
                            </h3>
                            {lowStock.length > 3 && (
                                <button
                                    onClick={() => navigate('/retailer/inventory')}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        padding: '0.25rem 0.5rem',
                                        background: 'none',
                                        border: 'none',
                                        color: '#8B1538',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    View All <ArrowRight size={14} />
                                </button>
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {lowStock.length > 0 ? lowStock.slice(0, 3).map((item) => (
                                <div key={item.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0.75rem',
                                    background: 'rgba(196, 30, 58, 0.05)',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(196, 30, 58, 0.1)'
                                }}>
                                    <div>
                                        <p style={{
                                            fontWeight: 600,
                                            color: '#2D1810',
                                            margin: 0,
                                            fontSize: '0.9rem'
                                        }}>
                                            {item.name}
                                        </p>
                                        <p style={{
                                            fontSize: '0.8rem',
                                            color: '#C41E3A',
                                            margin: 0
                                        }}>
                                            Only {item.quantity} {item.unit} left!
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => navigate('/retailer/wholesalers')}
                                        style={{
                                            padding: '0.5rem 0.75rem',
                                            background: 'linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Order
                                    </button>
                                </div>
                            )) : (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '2rem',
                                    color: '#228B22'
                                }}>
                                    <CheckCircle size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                                    <p style={{ margin: 0, fontWeight: 500 }}>All stock levels are healthy</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Bill Scanner Modal */}
            <BillScanner
                isOpen={showScanner}
                onClose={() => setShowScanner(false)}
            />

            {/* Sales Bill Modal */}
            <SalesBill
                isOpen={showBill}
                onClose={() => setShowBill(false)}
            />

            {/* Animations and Responsive Styles */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                @keyframes wave {
                    0%, 100% { transform: scaleY(0.4); }
                    50% { transform: scaleY(1); }
                }

                /* Tablet - 1200px and below */
                @media (max-width: 1200px) {
                    .ai-features-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    .two-column-grid {
                        grid-template-columns: 1fr !important;
                    }
                }

                /* Tablet - 1024px and below */
                @media (max-width: 1024px) {
                    main {
                        margin-left: 0 !important;
                        max-width: 100vw !important;
                        padding: 1.5rem !important;
                    }
                }

                /* Mobile - 768px and below */
                @media (max-width: 768px) {
                    main {
                        padding: 1rem !important;
                    }
                    
                    h1 {
                        font-size: 1.75rem !important;
                    }
                    
                    .ai-features-grid {
                        grid-template-columns: 1fr 1fr !important;
                        gap: 0.75rem !important;
                    }
                    
                    .stats-grid {
                        grid-template-columns: 1fr 1fr !important;
                        gap: 0.75rem !important;
                    }
                }

                /* Small Mobile - 480px and below */
                @media (max-width: 480px) {
                    main {
                        padding: 0.75rem !important;
                    }
                    
                    h1 {
                        font-size: 1.5rem !important;
                    }
                    
                    .ai-features-grid {
                        grid-template-columns: 1fr !important;
                    }
                    
                    .quick-actions-grid {
                        flex-direction: column !important;
                    }
                    
                    .quick-actions-grid button {
                        width: 100% !important;
                        justify-content: center !important;
                    }
                }
            `}</style>

            <AICommandHub />
        </div>
    );
};

export default RetailerDashboard;
// updated schema
// updated provider
// updated render
// updated resolver
// updated observer
// updated factory
// updated service
// updated emitter
// updated util
// updated config
// updated handler
// updated query
// updated controller
// updated helper
// updated module
// updated component
// updated listener
// updated validator
// updated schema
// updated binding
// updated service
// updated config
// updated middleware
// updated view
// updated style
// updated dispatcher
// updated schema
