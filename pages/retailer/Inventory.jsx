// Retailer Inventory Page - B2Bharat (Production Polish)
import { useState } from 'react';
import Sidebar from '@src/components/Sidebar';
import AICommandHub from '@src/components/AICommandHub';
import VoiceButton from '@src/components/VoiceButton';
import { useData } from '@src/contexts/DataContext';
import {
    Package, Plus, Search, AlertTriangle, Edit2, X, Mic,
    MinusCircle, PlusCircle, CheckCircle, Tag, ShoppingBag
} from 'lucide-react';

const RetailerInventory = () => {
    const { inventory, addStock, sellItem } = useData();
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'sell'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'

    const filteredInventory = inventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedItem || !quantity) return;

        if (modalMode === 'add') {
            addStock(selectedItem.name, parseInt(quantity), selectedItem.unit);
        } else {
            sellItem(selectedItem.name, parseInt(quantity));
        }

        setShowModal(false);
        setSelectedItem(null);
        setQuantity('');
    };

    const openModal = (mode, item = null) => {
        setModalMode(mode);
        setSelectedItem(item);
        setQuantity('');
        setShowModal(true);
    };

    const stats = {
        total: inventory.length,
        lowStock: inventory.filter(i => i.quantity <= i.minStock).length,
        totalValue: inventory.reduce((sum, i) => sum + (i.price * i.quantity), 0)
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
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.5rem',
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
                            Inventory
                        </h1>
                        <p style={{ color: '#5C4033', fontSize: '1rem' }}>
                            Manage your store inventory with voice or touch
                        </p>
                    </div>
                    <button
                        onClick={() => openModal('add')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, #228B22 0%, #32CD32 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(34, 139, 34, 0.25)'
                        }}
                    >
                        <Plus size={18} />
                        Add Stock
                    </button>
                </div>

                {/* Stats Row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <div style={{
                        background: 'white',
                        padding: '1rem 1.25rem',
                        borderRadius: '12px',
                        border: '1px solid #E8DDD5'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'rgba(255, 107, 53, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Package size={20} style={{ color: '#FF6B35' }} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.8rem', color: '#8B7355', marginBottom: '0.15rem' }}>Total Products</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2D1810' }}>{stats.total}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        background: 'white',
                        padding: '1rem 1.25rem',
                        borderRadius: '12px',
                        border: stats.lowStock > 0 ? '1px solid rgba(196, 30, 58, 0.3)' : '1px solid #E8DDD5'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: stats.lowStock > 0 ? 'rgba(196, 30, 58, 0.1)' : 'rgba(34, 139, 34, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <AlertTriangle size={20} style={{ color: stats.lowStock > 0 ? '#C41E3A' : '#228B22' }} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.8rem', color: '#8B7355', marginBottom: '0.15rem' }}>Low Stock</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: stats.lowStock > 0 ? '#C41E3A' : '#228B22' }}>
                                    {stats.lowStock}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        background: 'white',
                        padding: '1rem 1.25rem',
                        borderRadius: '12px',
                        border: '1px solid #E8DDD5'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'rgba(139, 21, 56, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Tag size={20} style={{ color: '#8B1538' }} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.8rem', color: '#8B7355', marginBottom: '0.15rem' }}>Total Value</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2D1810' }}>
                                    ₹{stats.totalValue.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Voice Tip */}
                <div style={{
                    padding: '1rem 1.25rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    background: 'rgba(255, 107, 53, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 107, 53, 0.15)'
                }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FF6B35 0%, #FFA500 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <Mic size={18} color="white" />
                    </div>
                    <div>
                        <p style={{ fontWeight: 600, color: '#2D1810', marginBottom: '0.15rem', fontSize: '0.9rem' }}>
                            Voice commands available
                        </p>
                        <p style={{ color: '#5C4033', fontSize: '0.85rem' }}>
                            "Add 10 kg rice" • "Sell 5 packet Maggi" • "Stock check karo"
                        </p>
                    </div>
                </div>

                {/* Search and View Toggle */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    <div style={{ position: 'relative', flex: '1', minWidth: '240px', maxWidth: '400px' }}>
                        <Search size={18} style={{
                            position: 'absolute',
                            left: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#8B7355'
                        }} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 2.75rem',
                                border: '2px solid #E8DDD5',
                                borderRadius: '12px',
                                fontSize: '0.95rem',
                                outline: 'none',
                                background: 'white'
                            }}
                        />
                    </div>
                </div>

                {/* Inventory Table */}
                {filteredInventory.length === 0 ? (
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
                            background: 'rgba(34, 139, 34, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem'
                        }}>
                            <ShoppingBag size={36} style={{ color: '#228B22' }} />
                        </div>
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: '#2D1810',
                            marginBottom: '0.5rem'
                        }}>
                            {searchTerm ? 'No products found' : 'No products in inventory'}
                        </h3>
                        <p style={{ color: '#5C4033', marginBottom: '1.5rem' }}>
                            {searchTerm ? 'Try a different search term' : 'Add your first product to get started'}
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={() => openModal('add')}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, #228B22 0%, #32CD32 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                <Plus size={18} />
                                Add First Product
                            </button>
                        )}
                    </div>
                ) : (
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        border: '1px solid #E8DDD5',
                        overflow: 'hidden'
                    }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#F9F7F5' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#5C4033', fontSize: '0.85rem' }}>Product</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#5C4033', fontSize: '0.85rem' }}>Quantity</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#5C4033', fontSize: '0.85rem' }}>Price</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#5C4033', fontSize: '0.85rem' }}>Min Stock</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#5C4033', fontSize: '0.85rem' }}>Status</th>
                                        <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#5C4033', fontSize: '0.85rem' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInventory.map((item, index) => {
                                        const isLowStock = item.quantity <= item.minStock;
                                        return (
                                            <tr
                                                key={item.id}
                                                style={{
                                                    borderTop: '1px solid #F3EDE7',
                                                    background: isLowStock ? 'rgba(196, 30, 58, 0.02)' : 'transparent'
                                                }}
                                            >
                                                <td style={{ padding: '1rem', fontWeight: 600, color: '#2D1810' }}>
                                                    {item.name}
                                                </td>
                                                <td style={{ padding: '1rem', color: '#5C4033' }}>
                                                    <span style={{ fontWeight: 600 }}>{item.quantity}</span> {item.unit}
                                                </td>
                                                <td style={{ padding: '1rem', fontWeight: 600, color: '#2D1810' }}>
                                                    ₹{item.price}
                                                </td>
                                                <td style={{ padding: '1rem', color: '#8B7355' }}>
                                                    {item.minStock} {item.unit}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    {isLowStock ? (
                                                        <span style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '0.35rem',
                                                            padding: '0.35rem 0.75rem',
                                                            background: 'rgba(239, 68, 68, 0.1)',
                                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                                            borderRadius: '50px',
                                                            color: '#EF4444',
                                                            fontSize: '0.8rem',
                                                            fontWeight: 600
                                                        }}>
                                                            <AlertTriangle size={12} />
                                                            Low Stock
                                                        </span>
                                                    ) : (
                                                        <span style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '0.35rem',
                                                            padding: '0.35rem 0.75rem',
                                                            background: 'rgba(16, 185, 129, 0.1)',
                                                            border: '1px solid rgba(16, 185, 129, 0.2)',
                                                            borderRadius: '50px',
                                                            color: '#10B981',
                                                            fontSize: '0.8rem',
                                                            fontWeight: 600
                                                        }}>
                                                            <CheckCircle size={12} />
                                                            In Stock
                                                        </span>
                                                    )}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                                        <button
                                                            onClick={() => openModal('add', item)}
                                                            title="Add Stock"
                                                            style={{
                                                                width: '36px',
                                                                height: '36px',
                                                                borderRadius: '10px',
                                                                border: '1px solid #E8DDD5',
                                                                background: 'white',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                transition: 'all 0.2s ease'
                                                            }}
                                                        >
                                                            <PlusCircle size={18} style={{ color: '#228B22' }} />
                                                        </button>
                                                        <button
                                                            onClick={() => openModal('sell', item)}
                                                            title="Record Sale"
                                                            style={{
                                                                width: '36px',
                                                                height: '36px',
                                                                borderRadius: '10px',
                                                                border: '1px solid #E8DDD5',
                                                                background: 'white',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                transition: 'all 0.2s ease'
                                                            }}
                                                        >
                                                            <MinusCircle size={18} style={{ color: '#C41E3A' }} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Add/Sell Modal */}
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
                                maxWidth: '420px',
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
                                alignItems: 'center',
                                background: modalMode === 'add'
                                    ? 'linear-gradient(135deg, rgba(34, 139, 34, 0.05) 0%, rgba(50, 205, 50, 0.02) 100%)'
                                    : 'linear-gradient(135deg, rgba(196, 30, 58, 0.05) 0%, rgba(239, 68, 68, 0.02) 100%)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        background: modalMode === 'add'
                                            ? 'rgba(34, 139, 34, 0.1)'
                                            : 'rgba(196, 30, 58, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {modalMode === 'add'
                                            ? <PlusCircle size={20} style={{ color: '#228B22' }} />
                                            : <MinusCircle size={20} style={{ color: '#C41E3A' }} />
                                        }
                                    </div>
                                    <h2 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: '#2D1810',
                                        margin: 0
                                    }}>
                                        {modalMode === 'add' ? 'Add Stock' : 'Record Sale'}
                                    </h2>
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
                            <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
                                {!selectedItem && (
                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <label style={{
                                            display: 'block',
                                            fontWeight: 600,
                                            color: '#5C4033',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.9rem'
                                        }}>
                                            Select Product
                                        </label>
                                        <select
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                border: '2px solid #E8DDD5',
                                                borderRadius: '12px',
                                                fontSize: '0.95rem',
                                                outline: 'none',
                                                background: 'white',
                                                cursor: 'pointer'
                                            }}
                                            onChange={(e) => setSelectedItem(inventory.find(i => i.id === e.target.value))}
                                            required
                                        >
                                            <option value="">Choose a product...</option>
                                            {inventory.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name} ({item.quantity} {item.unit} in stock)
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {selectedItem && (
                                    <div style={{
                                        padding: '1rem',
                                        background: '#F9F7F5',
                                        borderRadius: '12px',
                                        marginBottom: '1.25rem'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: '44px',
                                                height: '44px',
                                                borderRadius: '10px',
                                                background: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px solid #E8DDD5'
                                            }}>
                                                <Package size={22} style={{ color: '#FF6B35' }} />
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: 600, color: '#2D1810', marginBottom: '0.15rem' }}>
                                                    {selectedItem.name}
                                                </p>
                                                <p style={{ fontSize: '0.85rem', color: '#5C4033' }}>
                                                    Current stock: <strong>{selectedItem.quantity} {selectedItem.unit}</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        fontWeight: 600,
                                        color: '#5C4033',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.9rem'
                                    }}>
                                        Quantity ({selectedItem?.unit || 'units'})
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        min="1"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            border: '2px solid #E8DDD5',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        style={{
                                            flex: 1,
                                            padding: '0.875rem',
                                            background: 'white',
                                            color: '#5C4033',
                                            border: '2px solid #E8DDD5',
                                            borderRadius: '12px',
                                            fontWeight: 600,
                                            fontSize: '0.95rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        style={{
                                            flex: 1,
                                            padding: '0.875rem',
                                            background: modalMode === 'add'
                                                ? 'linear-gradient(135deg, #228B22 0%, #32CD32 100%)'
                                                : 'linear-gradient(135deg, #C41E3A 0%, #EF4444 100%)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '12px',
                                            fontWeight: 600,
                                            fontSize: '0.95rem',
                                            cursor: 'pointer',
                                            boxShadow: modalMode === 'add'
                                                ? '0 4px 12px rgba(34, 139, 34, 0.25)'
                                                : '0 4px 12px rgba(196, 30, 58, 0.25)'
                                        }}
                                    >
                                        {modalMode === 'add' ? 'Add Stock' : 'Record Sale'}
                                    </button>
                                </div>
                            </form>
                        </div>
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
                    
                    main > div:nth-child(3) {
                        grid-template-columns: 1fr !important;
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

export default RetailerInventory;
// updated binding
// updated builder
// updated state
// updated service
// updated observer
// updated binding
// updated binding
// updated listener
// updated listener
// updated emitter
// updated parser
// updated emitter
// updated builder
// updated listener
// updated render
// updated state
// updated query
// updated handler
// updated observer
// updated controller
// updated adapter
// updated helper
// updated service
// updated view
// updated render
// updated config
