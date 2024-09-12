// Retailer Wholesalers Discovery Page - B2Bharat (Production Polish)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@src/components/Sidebar';
import AICommandHub from '@src/components/AICommandHub';
import VoiceButton from '@src/components/VoiceButton';
import { useData } from '@src/contexts/DataContext';
import {
    Store, MapPin, Star, Package, CreditCard, Search,
    Phone, MessageCircle, ChevronRight, ShoppingBag, Truck
} from 'lucide-react';

const RetailerWholesalers = () => {
    const navigate = useNavigate();
    const { wholesalers } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedWholesaler, setSelectedWholesaler] = useState(null);

    const filteredWholesalers = wholesalers.filter(w =>
        w.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                        Discover Wholesalers
                    </h1>
                    <p style={{ color: '#5C4033', fontSize: '1rem' }}>
                        Find and connect with wholesalers near you
                    </p>
                </div>

                {/* Stats Banner */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap'
                }}>
                    <div style={{
                        background: 'rgba(139, 21, 56, 0.08)',
                        padding: '0.75rem 1.25rem',
                        borderRadius: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        border: '1px solid rgba(139, 21, 56, 0.15)'
                    }}>
                        <Store size={16} style={{ color: '#8B1538' }} />
                        <span style={{ fontWeight: 600, color: '#8B1538' }}>{wholesalers.length}</span>
                        <span style={{ color: '#5C4033', fontSize: '0.9rem' }}>Wholesalers Available</span>
                    </div>
                    <div style={{
                        background: 'rgba(255, 107, 53, 0.08)',
                        padding: '0.75rem 1.25rem',
                        borderRadius: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        border: '1px solid rgba(255, 107, 53, 0.15)'
                    }}>
                        <Truck size={16} style={{ color: '#FF6B35' }} />
                        <span style={{ color: '#5C4033', fontSize: '0.9rem' }}>Free delivery on orders above ₹5,000</span>
                    </div>
                </div>

                {/* Search */}
                <div style={{
                    position: 'relative',
                    marginBottom: '2rem',
                    maxWidth: '400px'
                }}>
                    <Search size={18} style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#8B7355'
                    }} />
                    <input
                        type="text"
                        placeholder="Search wholesalers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem 0.875rem 2.75rem',
                            border: '2px solid #E8DDD5',
                            borderRadius: '12px',
                            fontSize: '0.95rem',
                            outline: 'none',
                            background: 'white'
                        }}
                    />
                </div>

                {/* Wholesalers Grid */}
                {filteredWholesalers.length === 0 ? (
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '4rem 2rem',
                        textAlign: 'center',
                        border: '2px dashed #E8DDD5'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '20px',
                            background: 'rgba(139, 21, 56, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem'
                        }}>
                            <Store size={36} style={{ color: '#8B1538' }} />
                        </div>
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: '#2D1810',
                            marginBottom: '0.5rem'
                        }}>
                            No wholesalers found
                        </h3>
                        <p style={{ color: '#5C4033' }}>
                            Try adjusting your search or check back later
                        </p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '1.25rem'
                    }}>
                        {filteredWholesalers.map((wholesaler) => (
                            <div
                                key={wholesaler.id}
                                style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    border: selectedWholesaler?.id === wholesaler.id
                                        ? '2px solid #FF6B35'
                                        : '1px solid #E8DDD5',
                                    padding: '1.25rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onClick={() => setSelectedWholesaler(wholesaler)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {/* Header */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '1rem',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '14px',
                                        background: 'linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        boxShadow: '0 4px 12px rgba(139, 21, 56, 0.25)'
                                    }}>
                                        <Store size={28} color="white" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{
                                            fontSize: '1.1rem',
                                            fontWeight: 700,
                                            marginBottom: '0.25rem',
                                            color: '#2D1810'
                                        }}>
                                            {wholesaler.name}
                                        </h3>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: '#8B7355',
                                            fontSize: '0.9rem'
                                        }}>
                                            <MapPin size={14} />
                                            {wholesaler.distance}
                                        </div>
                                    </div>
                                </div>

                                {/* Badges */}
                                <div style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    marginBottom: '1rem',
                                    flexWrap: 'wrap'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.35rem',
                                        padding: '0.35rem 0.65rem',
                                        background: 'rgba(245, 158, 11, 0.1)',
                                        borderRadius: '50px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        color: '#D97706'
                                    }}>
                                        <Star size={14} style={{ fill: '#D97706' }} />
                                        {wholesaler.rating}
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.35rem',
                                        padding: '0.35rem 0.65rem',
                                        background: 'rgba(139, 21, 56, 0.1)',
                                        borderRadius: '50px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        color: '#8B1538'
                                    }}>
                                        <Package size={14} />
                                        {wholesaler.products} products
                                    </div>
                                </div>

                                {/* Credit Limit */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.875rem 1rem',
                                    background: '#F9F7F5',
                                    borderRadius: '12px',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '8px',
                                        background: 'rgba(255, 165, 0, 0.12)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <CreditCard size={18} style={{ color: '#F59E0B' }} />
                                    </div>
                                    <div>
                                        <p style={{
                                            fontSize: '0.75rem',
                                            color: '#8B7355',
                                            marginBottom: '0.1rem'
                                        }}>
                                            Credit Limit
                                        </p>
                                        <p style={{ fontWeight: 700, color: '#2D1810' }}>
                                            ₹{wholesaler.creditLimit.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button
                                        style={{
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            padding: '0.75rem',
                                            background: 'white',
                                            border: '2px solid #E8DDD5',
                                            borderRadius: '10px',
                                            color: '#5C4033',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <Phone size={16} />
                                        Call
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate('/retailer/orders');
                                        }}
                                        style={{
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            padding: '0.75rem',
                                            background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C00 100%)',
                                            border: 'none',
                                            borderRadius: '10px',
                                            color: 'white',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.25)'
                                        }}
                                    >
                                        <ShoppingBag size={16} />
                                        Order
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <VoiceButton />

            {/* Responsive Styles */}
            <style>{`
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
                }

                @media (max-width: 640px) {
                    main > div:nth-child(2) {
                        flex-direction: column !important;
                    }
                    
                    main > div:nth-child(2) > div {
                        width: 100% !important;
                        justify-content: center !important;
                    }
                }
            `}</style>

            <AICommandHub />
        </div>
    );
};

export default RetailerWholesalers;
// updated adapter
// updated util
// updated provider
// updated binding
// updated config
// updated handler
// updated builder
// updated state
// updated config
// updated component
// updated middleware
// updated function
// updated adapter
// updated listener
// updated component
// updated function
// updated middleware
// updated binding
