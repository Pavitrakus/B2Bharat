// Retailer Orders Page - B2Bharat (Production Polish)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@src/components/Sidebar';
import AICommandHub from '@src/components/AICommandHub';
import { useData } from '@src/contexts/DataContext';
import {
    ShoppingCart, Plus, Search, X, Clock, CheckCircle,
    XCircle, Package, ChevronRight, Calendar, Store,
    Filter, ArrowRight, Truck
} from 'lucide-react';

const RetailerOrders = () => {
    const navigate = useNavigate();
    const { orders, wholesalers, createOrder } = useData();
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedWholesaler, setSelectedWholesaler] = useState(null);

    const filteredOrders = orders.filter(order => {
        const matchesFilter = filter === 'all' || order.status === filter;
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.wholesaler.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusConfig = (status) => {
        switch (status) {
            case 'pending':
                return {
                    icon: Clock,
                    color: '#F59E0B',
                    bg: 'rgba(245, 158, 11, 0.1)',
                    border: 'rgba(245, 158, 11, 0.2)',
                    label: 'Pending'
                };
            case 'completed':
                return {
                    icon: CheckCircle,
                    color: '#10B981',
                    bg: 'rgba(16, 185, 129, 0.1)',
                    border: 'rgba(16, 185, 129, 0.2)',
                    label: 'Completed'
                };
            case 'cancelled':
                return {
                    icon: XCircle,
                    color: '#EF4444',
                    bg: 'rgba(239, 68, 68, 0.1)',
                    border: 'rgba(239, 68, 68, 0.2)',
                    label: 'Cancelled'
                };
            default:
                return {
                    icon: Clock,
                    color: '#6B7280',
                    bg: 'rgba(107, 114, 128, 0.1)',
                    border: 'rgba(107, 114, 128, 0.2)',
                    label: status
                };
        }
    };

    const filterOptions = [
        { value: 'all', label: 'All Orders', count: orders.length },
        { value: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
        { value: 'completed', label: 'Completed', count: orders.filter(o => o.status === 'completed').length },
        { value: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
    ];

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
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: 800,
                            color: '#2D1810',
                            marginBottom: '0.25rem'
                        }}>
                            Orders
                        </h1>
                        <p style={{ color: '#5C4033', fontSize: '1rem' }}>
                            Manage orders from your wholesalers
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C00 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.25)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <Plus size={18} />
                        New Order
                    </button>
                </div>

                {/* Search and Filters */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    {/* Search */}
                    <div style={{ position: 'relative', flex: '1', minWidth: '240px', maxWidth: '360px' }}>
                        <Search size={18} style={{
                            position: 'absolute',
                            left: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#8B7355'
                        }} />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 2.75rem',
                                border: '2px solid #E8DDD5',
                                borderRadius: '12px',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.2s ease',
                                background: 'white'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                            onBlur={(e) => e.target.style.borderColor = '#E8DDD5'}
                        />
                    </div>

                    {/* Filter Pills */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {filterOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setFilter(option.value)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    border: filter === option.value ? '2px solid #FF6B35' : '2px solid #E8DDD5',
                                    borderRadius: '50px',
                                    background: filter === option.value ? 'rgba(255, 107, 53, 0.08)' : 'white',
                                    color: filter === option.value ? '#FF6B35' : '#5C4033',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {option.label}
                                <span style={{
                                    background: filter === option.value ? '#FF6B35' : '#E8DDD5',
                                    color: filter === option.value ? 'white' : '#5C4033',
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: '50px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700
                                }}>
                                    {option.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
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
                            background: 'rgba(255, 107, 53, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem'
                        }}>
                            <ShoppingCart size={36} style={{ color: '#FF6B35' }} />
                        </div>
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: '#2D1810',
                            marginBottom: '0.5rem'
                        }}>
                            No orders found
                        </h3>
                        <p style={{ color: '#5C4033', marginBottom: '1.5rem' }}>
                            {searchTerm || filter !== 'all'
                                ? 'Try adjusting your search or filters'
                                : 'Create your first order from a wholesaler'}
                        </p>
                        {!searchTerm && filter === 'all' && (
                            <button
                                onClick={() => setShowModal(true)}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C00 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                <Plus size={18} />
                                Create First Order
                            </button>
                        )}
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                        gap: '1.25rem'
                    }}>
                        {filteredOrders.map((order) => {
                            const statusConfig = getStatusConfig(order.status);
                            const StatusIcon = statusConfig.icon;

                            return (
                                <div
                                    key={order.id}
                                    style={{
                                        background: 'white',
                                        borderRadius: '16px',
                                        border: '1px solid #E8DDD5',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    {/* Card Header */}
                                    <div style={{
                                        padding: '1rem 1.25rem',
                                        borderBottom: '1px solid #F3EDE7',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '10px',
                                                background: 'rgba(139, 21, 56, 0.08)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Package size={20} style={{ color: '#8B1538' }} />
                                            </div>
                                            <div>
                                                <p style={{
                                                    fontWeight: 700,
                                                    color: '#2D1810',
                                                    fontSize: '0.95rem'
                                                }}>
                                                    {order.id}
                                                </p>
                                                <p style={{
                                                    fontSize: '0.8rem',
                                                    color: '#8B7355',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.35rem'
                                                }}>
                                                    <Calendar size={12} />
                                                    {order.date}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.35rem',
                                            padding: '0.35rem 0.75rem',
                                            background: statusConfig.bg,
                                            border: `1px solid ${statusConfig.border}`,
                                            borderRadius: '50px',
                                            color: statusConfig.color,
                                            fontSize: '0.8rem',
                                            fontWeight: 600
                                        }}>
                                            <StatusIcon size={14} />
                                            {statusConfig.label}
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div style={{ padding: '1rem 1.25rem' }}>
                                        {/* Wholesaler */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            marginBottom: '1rem',
                                            color: '#5C4033'
                                        }}>
                                            <Store size={16} style={{ color: '#8B7355' }} />
                                            <span style={{ fontWeight: 500 }}>{order.wholesaler}</span>
                                        </div>

                                        {/* Items */}
                                        <div style={{
                                            background: '#F9F7F5',
                                            borderRadius: '10px',
                                            padding: '0.75rem 1rem',
                                            marginBottom: '1rem'
                                        }}>
                                            {order.items.slice(0, 3).map((item, i) => (
                                                <div
                                                    key={i}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        padding: '0.25rem 0',
                                                        color: '#5C4033',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    <ChevronRight size={14} style={{ color: '#8B7355' }} />
                                                    <span>{item.quantity} {item.unit}</span>
                                                    <span style={{ fontWeight: 500 }}>{item.name}</span>
                                                </div>
                                            ))}
                                            {order.items.length > 3 && (
                                                <p style={{
                                                    fontSize: '0.8rem',
                                                    color: '#8B7355',
                                                    marginTop: '0.25rem'
                                                }}>
                                                    +{order.items.length - 3} more items
                                                </p>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{
                                                fontSize: '1.25rem',
                                                fontWeight: 800,
                                                color: '#2D1810'
                                            }}>
                                                ₹{order.total.toLocaleString()}
                                            </span>
                                            <button style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.35rem',
                                                padding: '0.5rem 1rem',
                                                background: 'rgba(255, 107, 53, 0.08)',
                                                border: 'none',
                                                borderRadius: '8px',
                                                color: '#FF6B35',
                                                fontWeight: 600,
                                                fontSize: '0.85rem',
                                                cursor: 'pointer'
                                            }}>
                                                View Details
                                                <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* New Order Modal */}
                {showModal && (
                    <div
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            padding: '1rem'
                        }}
                        onClick={() => setShowModal(false)}
                    >
                        <div
                            style={{
                                background: 'white',
                                borderRadius: '20px',
                                width: '100%',
                                maxWidth: '480px',
                                maxHeight: '90vh',
                                overflow: 'hidden',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div style={{
                                padding: '1.25rem 1.5rem',
                                borderBottom: '1px solid #E8DDD5',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <h2 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: '#2D1810',
                                        marginBottom: '0.15rem'
                                    }}>
                                        Create New Order
                                    </h2>
                                    <p style={{ fontSize: '0.85rem', color: '#8B7355' }}>
                                        Select a wholesaler to start
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: '#F3EDE7',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <X size={18} style={{ color: '#5C4033' }} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div style={{
                                padding: '1.5rem',
                                maxHeight: 'calc(90vh - 140px)',
                                overflowY: 'auto'
                            }}>
                                <p style={{
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    color: '#5C4033',
                                    marginBottom: '1rem'
                                }}>
                                    Available Wholesalers
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {wholesalers.map((w) => (
                                        <button
                                            key={w.id}
                                            onClick={() => {
                                                setSelectedWholesaler(w);
                                                // Navigate to order creation with selected wholesaler
                                                navigate(`/retailer/wholesalers?order=${w.id}`);
                                                setShowModal(false);
                                            }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                padding: '1rem',
                                                background: 'white',
                                                border: '2px solid #E8DDD5',
                                                borderRadius: '12px',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = '#FF6B35';
                                                e.currentTarget.style.background = 'rgba(255, 107, 53, 0.02)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = '#E8DDD5';
                                                e.currentTarget.style.background = 'white';
                                            }}
                                        >
                                            <div style={{
                                                width: '48px',
                                                height: '48px',
                                                borderRadius: '12px',
                                                background: 'linear-gradient(135deg, #8B1538 0%, #C41E3A 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <Store size={22} color="white" />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{
                                                    fontWeight: 600,
                                                    color: '#2D1810',
                                                    marginBottom: '0.15rem'
                                                }}>
                                                    {w.name}
                                                </p>
                                                <p style={{
                                                    fontSize: '0.85rem',
                                                    color: '#8B7355',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}>
                                                    <Truck size={14} />
                                                    {w.distance}
                                                    <span style={{ color: '#E8DDD5' }}>|</span>
                                                    {w.products} products
                                                </p>
                                            </div>
                                            <ChevronRight size={20} style={{ color: '#8B7355' }} />
                                        </button>
                                    ))}
                                </div>

                                {/* Voice Tip */}
                                <div style={{
                                    marginTop: '1.5rem',
                                    padding: '1rem',
                                    background: 'rgba(255, 107, 53, 0.05)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255, 107, 53, 0.15)'
                                }}>
                                    <p style={{
                                        fontSize: '0.85rem',
                                        color: '#5C4033',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0.5rem'
                                    }}>
                                        <span style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            background: '#FF6B35',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            marginTop: '1px'
                                        }}>
                                            <span style={{ color: 'white', fontSize: '0.7rem', fontWeight: 700 }}>?</span>
                                        </span>
                                        <span>
                                            <strong>Tip:</strong> Use voice to create orders faster!
                                            Say "Sharma Traders se 10 kilo rice order karo"
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

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
                    main > div:first-child {
                        flex-direction: column;
                        align-items: stretch !important;
                    }
                    
                    main > div:first-child button {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>

            <AICommandHub />
        </div>
    );
};

export default RetailerOrders;
// updated render
// updated model
// updated adapter
// updated function
// updated listener
// updated parser
// updated observer
// updated adapter
// updated util
// updated adapter
// updated resolver
// updated query
// updated service
// updated builder
// updated model
// updated style
// updated listener
// updated module
// updated handler
// updated query
// updated view
// updated resolver
