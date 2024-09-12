// Quick Sale Page - Fast voice-first sales for B2Bharat (Production Polish)
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@src/components/Sidebar';
import AICommandHub from '@src/components/AICommandHub';
import { useData } from '@src/contexts/DataContext';
import { useVoice } from '@src/contexts/VoiceContext';
import {
    Mic, MicOff, Plus, Minus, Trash2, Receipt,
    User, ArrowLeft, Zap, ShoppingBag, CheckCircle
} from 'lucide-react';
import { generateSalesBill } from '@src/services/ai';

const QuickSale = () => {
    const navigate = useNavigate();
    const { inventory, sellItem, addBill, addTransaction } = useData();
    const { isListening, startListening, stopListening, transcript, isProcessing } = useVoice();

    const [selectedItems, setSelectedItems] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [showBillPreview, setShowBillPreview] = useState(false);
    const [generatedBill, setGeneratedBill] = useState(null);

    // Quick access products (most sold)
    const quickProducts = inventory.slice(0, 8);

    const addItem = (item) => {
        const existing = selectedItems.find(i => i.id === item.id);
        if (existing) {
            if (existing.qty < item.quantity) {
                setSelectedItems(prev =>
                    prev.map(i => i.id === item.id
                        ? { ...i, qty: i.qty + 1 }
                        : i
                    )
                );
            }
        } else {
            setSelectedItems(prev => [...prev, { ...item, qty: 1 }]);
        }
    };

    const updateQty = (itemId, delta) => {
        const invItem = inventory.find(i => i.id === itemId);
        setSelectedItems(prev =>
            prev.map(i => {
                if (i.id === itemId) {
                    const newQty = Math.max(1, Math.min(i.qty + delta, invItem.quantity));
                    return { ...i, qty: newQty };
                }
                return i;
            })
        );
    };

    const removeItem = (itemId) => {
        setSelectedItems(prev => prev.filter(i => i.id !== itemId));
    };

    const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const gst = Math.round(subtotal * 0.05);
    const total = subtotal + gst;

    const handleQuickSale = async () => {
        if (selectedItems.length === 0) return;

        // Generate bill
        const bill = await generateSalesBill(
            selectedItems.map(i => ({
                name: i.name,
                quantity: i.qty,
                unit: i.unit,
                price: i.price,
                total: i.qty * i.price
            })),
            customerName
        );

        // Update inventory
        selectedItems.forEach(item => {
            sellItem(item.name, item.qty);
        });

        // Save bill
        if (addBill) addBill(bill);

        setGeneratedBill(bill);
        setShowBillPreview(true);
    };

    const handleNewSale = () => {
        setSelectedItems([]);
        setCustomerName('');
        setGeneratedBill(null);
        setShowBillPreview(false);
    };

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
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <button
                        onClick={() => navigate('/retailer')}
                        style={{
                            width: '40px',
                            height: '40px',
                            background: 'white',
                            border: '2px solid #E8DDD5',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ArrowLeft size={20} color="#5C4033" />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #FFA500 0%, #FFD93D 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(255, 165, 0, 0.3)'
                        }}>
                            <Zap size={22} color="white" />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#2D1810' }}>
                                Quick Sale
                            </h1>
                            <p style={{ color: '#5C4033', fontSize: '0.95rem' }}>
                                Voice ya tap se fast billing
                            </p>
                        </div>
                    </div>
                </div>

                {!showBillPreview ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 350px',
                        gap: '2rem',
                        alignItems: 'start'
                    }}>
                        {/* Left: Product Selection */}
                        <div>
                            {/* Voice Instruction */}
                            <div style={{
                                padding: '1rem 1.25rem',
                                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 165, 0, 0.05) 100%)',
                                border: '2px solid rgba(255, 107, 53, 0.2)',
                                borderRadius: '12px',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <Mic size={24} style={{ color: '#FF6B35' }} />
                                <div>
                                    <p style={{ fontWeight: 600, color: '#2D1810' }}>
                                        Voice se add karo!
                                    </p>
                                    <p style={{ color: '#5C4033', fontSize: '0.9rem' }}>
                                        Bolo: "5 Maggi, 2 kg rice, 10 Parle-G"
                                    </p>
                                </div>
                            </div>

                            {/* Quick Products Grid */}
                            <h3 style={{
                                marginBottom: '1rem',
                                color: '#2D1810',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <Zap size={18} style={{ color: '#FFA500' }} />
                                Quick Add
                            </h3>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                                gap: '0.75rem',
                                marginBottom: '1.5rem'
                            }}>
                                {quickProducts.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => addItem(item)}
                                        disabled={item.quantity === 0}
                                        style={{
                                            padding: '1rem',
                                            background: item.quantity === 0 ? '#f5f5f5' : 'white',
                                            border: '2px solid #E8DDD5',
                                            borderRadius: '12px',
                                            cursor: item.quantity === 0 ? 'not-allowed' : 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.2s ease',
                                            opacity: item.quantity === 0 ? 0.5 : 1
                                        }}
                                    >
                                        <p style={{
                                            fontWeight: 600,
                                            color: '#2D1810',
                                            marginBottom: '0.25rem',
                                            fontSize: '0.95rem'
                                        }}>
                                            {item.name}
                                        </p>
                                        <p style={{
                                            color: '#FF6B35',
                                            fontWeight: 700,
                                            fontSize: '1rem'
                                        }}>
                                            ₹{item.price}
                                        </p>
                                        <p style={{
                                            fontSize: '0.75rem',
                                            color: item.quantity <= item.minStock ? '#C41E3A' : '#888'
                                        }}>
                                            {item.quantity} {item.unit} left
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Cart & Checkout */}
                        <div className="card" style={{
                            padding: '1.5rem',
                            position: 'sticky',
                            top: '1rem'
                        }}>
                            {/* Customer Name */}
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '0.5rem',
                                    fontWeight: 500,
                                    color: '#5C4033',
                                    fontSize: '0.9rem'
                                }}>
                                    <User size={14} /> Customer
                                </label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Walk-in"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <h3 style={{
                                marginBottom: '0.75rem',
                                color: '#2D1810',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <ShoppingBag size={18} />
                                Cart ({selectedItems.length})
                            </h3>

                            {/* Cart Items */}
                            <div style={{
                                maxHeight: '250px',
                                overflow: 'auto',
                                marginBottom: '1rem'
                            }}>
                                {selectedItems.length === 0 ? (
                                    <p style={{
                                        color: '#888',
                                        textAlign: 'center',
                                        padding: '2rem',
                                        fontSize: '0.9rem'
                                    }}>
                                        Tap products ya voice use karo
                                    </p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {selectedItems.map(item => (
                                            <div
                                                key={item.id}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    padding: '0.5rem',
                                                    background: '#f9f7f5',
                                                    borderRadius: '8px'
                                                }}
                                            >
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontWeight: 500, fontSize: '0.9rem' }}>{item.name}</p>
                                                    <p style={{ fontSize: '0.75rem', color: '#888' }}>₹{item.price}</p>
                                                </div>

                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem',
                                                    background: 'white',
                                                    borderRadius: '6px',
                                                    padding: '0.15rem'
                                                }}>
                                                    <button
                                                        onClick={() => updateQty(item.id, -1)}
                                                        style={{
                                                            width: '24px',
                                                            height: '24px',
                                                            border: 'none',
                                                            background: '#e0e0e0',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span style={{
                                                        minWidth: '24px',
                                                        textAlign: 'center',
                                                        fontWeight: 600,
                                                        fontSize: '0.9rem'
                                                    }}>
                                                        {item.qty}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQty(item.id, 1)}
                                                        style={{
                                                            width: '24px',
                                                            height: '24px',
                                                            border: 'none',
                                                            background: '#FF6B35',
                                                            color: 'white',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>

                                                <span style={{
                                                    fontWeight: 600,
                                                    color: '#228B22',
                                                    minWidth: '50px',
                                                    textAlign: 'right',
                                                    fontSize: '0.9rem'
                                                }}>
                                                    ₹{item.price * item.qty}
                                                </span>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        color: '#C41E3A',
                                                        cursor: 'pointer',
                                                        padding: '0.25rem'
                                                    }}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Totals */}
                            {selectedItems.length > 0 && (
                                <div style={{
                                    padding: '1rem',
                                    background: '#2D1810',
                                    borderRadius: '10px',
                                    color: 'white',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                                        <span>Subtotal</span>
                                        <span>₹{subtotal}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.8rem', opacity: 0.8 }}>
                                        <span>GST (5%)</span>
                                        <span>₹{gst}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontWeight: 700,
                                        fontSize: '1.2rem',
                                        borderTop: '1px solid rgba(255,255,255,0.2)',
                                        paddingTop: '0.5rem',
                                        marginTop: '0.5rem'
                                    }}>
                                        <span>Total</span>
                                        <span style={{ color: '#FFA500' }}>₹{total}</span>
                                    </div>
                                </div>
                            )}

                            {/* Checkout Button */}
                            <button
                                className="btn btn-saffron"
                                onClick={handleQuickSale}
                                disabled={selectedItems.length === 0}
                                style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
                            >
                                <Receipt size={20} />
                                Complete Sale
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Bill Preview */
                    <div style={{ maxWidth: '420px', margin: '0 auto' }}>
                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '2rem',
                            textAlign: 'center',
                            border: '1px solid #E8DDD5',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.25rem',
                                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
                            }}>
                                <CheckCircle size={40} color="white" />
                            </div>
                            <h2 style={{ color: '#10B981', marginBottom: '0.5rem', fontWeight: 700 }}>Sale Complete!</h2>
                            <p style={{ color: '#5C4033', marginBottom: '1.5rem' }}>
                                Bill #{generatedBill?.billNumber}
                            </p>

                            <div style={{
                                padding: '1.5rem',
                                background: '#F9F7F5',
                                borderRadius: '16px',
                                marginBottom: '1.5rem'
                            }}>
                                <p style={{ fontWeight: 700, fontSize: '2rem', color: '#FF6B35', marginBottom: '0.25rem' }}>
                                    ₹{total}
                                </p>
                                <p style={{ color: '#8B7355', fontSize: '0.9rem' }}>
                                    {selectedItems.length} items • {generatedBill?.customer}
                                </p>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button
                                    onClick={() => navigate('/retailer')}
                                    style={{
                                        flex: 1,
                                        padding: '0.875rem',
                                        background: 'white',
                                        border: '2px solid #E8DDD5',
                                        borderRadius: '12px',
                                        fontWeight: 600,
                                        color: '#5C4033',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={handleNewSale}
                                    style={{
                                        flex: 1,
                                        padding: '0.875rem',
                                        background: 'linear-gradient(135deg, #FF6B35 0%, #FFA500 100%)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontWeight: 600,
                                        color: 'white',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(255, 107, 53, 0.25)'
                                    }}
                                >
                                    New Sale
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <AICommandHub />

            {/* Responsive Styles */}
            <style>{`
                @media (max-width: 1024px) {
                    main {
                        margin-left: 0 !important;
                        padding: 1.5rem !important;
                        max-width: 100vw !important;
                    }
                }

                @media (max-width: 900px) {
                    main > div:nth-child(2) > div:first-child {
                        grid-template-columns: 1fr !important;
                    }
                }

                @media (max-width: 768px) {
                    main {
                        padding: 1rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default QuickSale;
// updated parser
// updated style
// updated function
// updated factory
// updated transformer
// updated schema
// updated middleware
// updated module
// updated resolver
// updated util
// updated view
// updated binding
// updated state
// updated transformer
// updated function
