// Retailer Ledger Page - B2Bharat (Production Polish)
import Sidebar from '@src/components/Sidebar';
import AICommandHub from '@src/components/AICommandHub';
import VoiceButton from '@src/components/VoiceButton';
import { useData } from '@src/contexts/DataContext';
import {
    BookOpen, TrendingUp, TrendingDown, CreditCard,
    ArrowUpRight, ArrowDownLeft, Calendar, Wallet,
    FileText, ChevronRight
} from 'lucide-react';

const RetailerLedger = () => {
    const { ledger, getCreditInfo, sales } = useData();
    const credit = getCreditInfo();

    const totalCredit = ledger.filter(l => l.type === 'credit').reduce((sum, l) => sum + l.amount, 0);
    const totalDebit = ledger.filter(l => l.type === 'debit').reduce((sum, l) => sum + l.amount, 0);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#FDFBF9' }}>
            <Sidebar userRole="retailer" />

            <main style={{
                flex: 1,
                padding: '2rem 2.5rem',
                marginLeft: '280px',
                maxWidth: 'calc(100vw - 280px)'
            }}>
                {/* Header */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: '#2D1810',
                        marginBottom: '0.25rem'
                    }}>
                        Ledger
                    </h1>
                    <p style={{ color: '#5C4033', fontSize: '1rem' }}>
                        Track your credits, debits, and balance
                    </p>
                </div>

                {/* Summary Stats */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    {/* Total Income */}
                    <div style={{
                        background: 'white',
                        padding: '1.25rem',
                        borderRadius: '16px',
                        border: '1px solid #E8DDD5'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.75rem'
                        }}>
                            <span style={{ fontSize: '0.85rem', color: '#8B7355', fontWeight: 500 }}>Total Income</span>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: 'rgba(16, 185, 129, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <TrendingUp size={18} style={{ color: '#10B981' }} />
                            </div>
                        </div>
                        <p style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: '#10B981',
                            marginBottom: '0.25rem'
                        }}>
                            ₹{totalDebit.toLocaleString()}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: '#8B7355', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <ArrowUpRight size={12} />
                            From sales & payments
                        </p>
                    </div>

                    {/* Total Expenses */}
                    <div style={{
                        background: 'white',
                        padding: '1.25rem',
                        borderRadius: '16px',
                        border: '1px solid #E8DDD5'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.75rem'
                        }}>
                            <span style={{ fontSize: '0.85rem', color: '#8B7355', fontWeight: 500 }}>Total Expenses</span>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <TrendingDown size={18} style={{ color: '#EF4444' }} />
                            </div>
                        </div>
                        <p style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: '#EF4444',
                            marginBottom: '0.25rem'
                        }}>
                            ₹{totalCredit.toLocaleString()}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: '#8B7355', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <ArrowDownLeft size={12} />
                            Orders & purchases
                        </p>
                    </div>

                    {/* Credit Used */}
                    <div style={{
                        background: 'white',
                        padding: '1.25rem',
                        borderRadius: '16px',
                        border: '1px solid #E8DDD5'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.75rem'
                        }}>
                            <span style={{ fontSize: '0.85rem', color: '#8B7355', fontWeight: 500 }}>Credit Used</span>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: 'rgba(255, 165, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <CreditCard size={18} style={{ color: '#F59E0B' }} />
                            </div>
                        </div>
                        <p style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: '#2D1810',
                            marginBottom: '0.5rem'
                        }}>
                            ₹{credit.used.toLocaleString()}
                        </p>
                        {/* Progress bar */}
                        <div style={{
                            height: '6px',
                            background: '#F3EDE7',
                            borderRadius: '3px',
                            overflow: 'hidden',
                            marginBottom: '0.35rem'
                        }}>
                            <div style={{
                                width: `${credit.percentage}%`,
                                height: '100%',
                                background: credit.percentage > 80
                                    ? 'linear-gradient(90deg, #EF4444, #F59E0B)'
                                    : 'linear-gradient(90deg, #F59E0B, #FCD34D)',
                                borderRadius: '3px'
                            }} />
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#8B7355' }}>
                            {credit.percentage}% of ₹{credit.limit.toLocaleString()}
                        </p>
                    </div>

                    {/* Current Balance */}
                    <div style={{
                        background: 'linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)',
                        padding: '1.25rem',
                        borderRadius: '16px',
                        color: 'white'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.75rem'
                        }}>
                            <span style={{ fontSize: '0.85rem', opacity: 0.9, fontWeight: 500 }}>Current Balance</span>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: 'rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Wallet size={18} color="white" />
                            </div>
                        </div>
                        <p style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            marginBottom: '0.25rem'
                        }}>
                            ₹{(ledger[0]?.balance || 0).toLocaleString()}
                        </p>
                        <p style={{ fontSize: '0.8rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <TrendingUp size={12} />
                            Net balance
                        </p>
                    </div>
                </div>

                {/* Main Content - Two Columns */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '1.5rem'
                }}>
                    {/* Transactions Timeline */}
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        border: '1px solid #E8DDD5',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            padding: '1.25rem',
                            borderBottom: '1px solid #F3EDE7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <h2 style={{
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                color: '#2D1810',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                margin: 0
                            }}>
                                <FileText size={18} style={{ color: '#FF6B35' }} />
                                Recent Transactions
                            </h2>
                            <button style={{
                                padding: '0.5rem 1rem',
                                background: 'rgba(255, 107, 53, 0.08)',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#FF6B35',
                                fontWeight: 600,
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}>
                                View All
                                <ChevronRight size={14} />
                            </button>
                        </div>

                        {/* Timeline */}
                        <div style={{ padding: '0.5rem 0' }}>
                            {ledger.length === 0 ? (
                                <div style={{
                                    padding: '3rem 2rem',
                                    textAlign: 'center'
                                }}>
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '16px',
                                        background: 'rgba(255, 107, 53, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 1rem'
                                    }}>
                                        <BookOpen size={28} style={{ color: '#FF6B35' }} />
                                    </div>
                                    <h3 style={{ fontWeight: 600, color: '#2D1810', marginBottom: '0.35rem' }}>
                                        No transactions yet
                                    </h3>
                                    <p style={{ color: '#8B7355', fontSize: '0.9rem' }}>
                                        Your transactions will appear here
                                    </p>
                                </div>
                            ) : (
                                ledger.map((entry, index) => (
                                    <div
                                        key={entry.id}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            padding: '1rem 1.25rem',
                                            borderBottom: index < ledger.length - 1 ? '1px solid #F9F7F5' : 'none',
                                            transition: 'background 0.2s ease'
                                        }}
                                    >
                                        {/* Icon */}
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '10px',
                                            background: entry.type === 'credit'
                                                ? 'rgba(239, 68, 68, 0.1)'
                                                : 'rgba(16, 185, 129, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            {entry.type === 'credit'
                                                ? <ArrowDownLeft size={18} style={{ color: '#EF4444' }} />
                                                : <ArrowUpRight size={18} style={{ color: '#10B981' }} />
                                            }
                                        </div>

                                        {/* Content */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{
                                                fontWeight: 600,
                                                color: '#2D1810',
                                                marginBottom: '0.25rem',
                                                fontSize: '0.95rem'
                                            }}>
                                                {entry.description}
                                            </p>
                                            <p style={{
                                                fontSize: '0.8rem',
                                                color: '#8B7355',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.35rem'
                                            }}>
                                                <Calendar size={12} />
                                                {entry.date}
                                            </p>
                                        </div>

                                        {/* Amount & Badge */}
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{
                                                fontWeight: 700,
                                                fontSize: '1rem',
                                                color: entry.type === 'credit' ? '#EF4444' : '#10B981',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {entry.type === 'credit' ? '-' : '+'}₹{entry.amount.toLocaleString()}
                                            </p>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '50px',
                                                fontSize: '0.7rem',
                                                fontWeight: 600,
                                                background: entry.type === 'credit'
                                                    ? 'rgba(239, 68, 68, 0.1)'
                                                    : 'rgba(16, 185, 129, 0.1)',
                                                color: entry.type === 'credit' ? '#EF4444' : '#10B981'
                                            }}>
                                                {entry.type === 'credit' ? 'Expense' : 'Income'}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Monthly Summary Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{
                            background: 'white',
                            borderRadius: '16px',
                            border: '1px solid #E8DDD5',
                            padding: '1.25rem'
                        }}>
                            <h3 style={{
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                color: '#2D1810',
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <Calendar size={16} style={{ color: '#8B1538' }} />
                                Sales Summary
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{
                                    padding: '1rem',
                                    background: 'rgba(255, 107, 53, 0.05)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255, 107, 53, 0.1)'
                                }}>
                                    <p style={{ fontSize: '0.8rem', color: '#8B7355', marginBottom: '0.25rem' }}>Today</p>
                                    <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF6B35' }}>
                                        ₹{sales.today.toLocaleString()}
                                    </p>
                                </div>

                                <div style={{
                                    padding: '1rem',
                                    background: '#F9F7F5',
                                    borderRadius: '12px'
                                }}>
                                    <p style={{ fontSize: '0.8rem', color: '#8B7355', marginBottom: '0.25rem' }}>This Week</p>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2D1810' }}>
                                        ₹{sales.thisWeek.toLocaleString()}
                                    </p>
                                </div>

                                <div style={{
                                    padding: '1rem',
                                    background: '#F9F7F5',
                                    borderRadius: '12px'
                                }}>
                                    <p style={{ fontSize: '0.8rem', color: '#8B7355', marginBottom: '0.25rem' }}>This Month</p>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2D1810' }}>
                                        ₹{sales.thisMonth.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <VoiceButton />

            {/* Responsive Styles */}
            <style>{`
                @media (max-width: 1200px) {
                    main > div:nth-child(2) {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    main > div:nth-child(3) {
                        grid-template-columns: 1fr !important;
                    }
                }

                @media (max-width: 1024px) {
                    main {
                        margin-left: 0 !important;
                        padding: 1.5rem !important;
                        max-width: 100vw !important;
                    }
                }

                @media (max-width: 768px) {
                    main {
                        padding: 1rem !important;
                    }
                    
                    main > div:nth-child(2) {
                        grid-template-columns: 1fr 1fr !important;
                        gap: 0.75rem !important;
                    }
                }

                @media (max-width: 480px) {
                    main > div:nth-child(2) {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>

            <AICommandHub />
        </div>
    );
};

export default RetailerLedger;
// updated schema
// updated render
// updated resolver
// updated variable
// updated model
// updated parser
// updated model
// updated factory
// updated schema
// updated formatter
// updated binding
// updated util
// updated component
// updated emitter
// updated handler
// updated handler
// updated view
