// Wholesaler Retailers Page - B2Bharat (Credit Management)
import { useState } from 'react';
import Sidebar from '@src/components/Sidebar';
import VoiceButton from '@src/components/VoiceButton';
import { Users, Search, CreditCard, Phone, TrendingUp, TrendingDown, Edit2 } from 'lucide-react';

// Mock retailers for wholesaler
const mockRetailers = [
    { id: 'R001', name: 'Krishna General Store', phone: '9876543210', creditLimit: 50000, creditUsed: 35000, lastOrder: '2026-01-02', totalOrders: 45 },
    { id: 'R002', name: 'Sharma Kirana & Provision', phone: '9876543211', creditLimit: 75000, creditUsed: 52000, lastOrder: '2026-01-01', totalOrders: 82 },
    { id: 'R003', name: 'Patel Mart', phone: '9876543212', creditLimit: 40000, creditUsed: 12000, lastOrder: '2025-12-30', totalOrders: 28 },
    { id: 'R004', name: 'Singh Grocery', phone: '9876543213', creditLimit: 60000, creditUsed: 58000, lastOrder: '2026-01-02', totalOrders: 67 },
    { id: 'R005', name: 'Verma Stores', phone: '9876543214', creditLimit: 30000, creditUsed: 5000, lastOrder: '2025-12-28', totalOrders: 15 },
];

const WholesalerRetailers = () => {
    const [retailers, setRetailers] = useState(mockRetailers);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRetailers = retailers.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.phone.includes(searchTerm)
    );

    const totalCredit = retailers.reduce((sum, r) => sum + r.creditLimit, 0);
    const totalUsed = retailers.reduce((sum, r) => sum + r.creditUsed, 0);

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar userRole="wholesaler" />

            <main className="main-content">
                <div className="page-header">
                    <h1>Retailer Management</h1>
                    <p>Manage credit limits and track retailer payments</p>
                </div>

                {/* Summary Stats */}
                <div className="stats-grid" style={{ marginBottom: '2rem' }}>
                    <div className="stat-card glass-card cyan">
                        <span className="stat-label">Total Retailers</span>
                        <div className="stat-value">{retailers.length}</div>
                        <div className="stat-change positive">
                            <Users size={14} /> Active accounts
                        </div>
                    </div>
                    <div className="stat-card glass-card gold">
                        <span className="stat-label">Total Credit Extended</span>
                        <div className="stat-value">₹{totalCredit.toLocaleString()}</div>
                        <div className="stat-change">Combined limit</div>
                    </div>
                    <div className="stat-card glass-card coral">
                        <span className="stat-label">Credit Utilized</span>
                        <div className="stat-value">₹{totalUsed.toLocaleString()}</div>
                        <div className="stat-change negative">
                            {Math.round((totalUsed / totalCredit) * 100)}% of total
                        </div>
                    </div>
                    <div className="stat-card glass-card purple">
                        <span className="stat-label">Available Credit</span>
                        <div className="stat-value">₹{(totalCredit - totalUsed).toLocaleString()}</div>
                        <div className="stat-change positive">
                            <TrendingUp size={14} /> Remaining
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                    <Search size={18} style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)'
                    }} />
                    <input
                        type="text"
                        className="input"
                        placeholder="Search retailers by name or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ paddingLeft: '2.75rem', width: '100%', maxWidth: '400px' }}
                    />
                </div>

                {/* Retailers Grid */}
                <div className="cards-grid">
                    {filteredRetailers.map((retailer) => {
                        const creditPercent = Math.round((retailer.creditUsed / retailer.creditLimit) * 100);
                        const isHighCredit = creditPercent > 80;

                        return (
                            <div key={retailer.id} className="glass-card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                                            {retailer.name}
                                        </h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            <Phone size={14} />
                                            {retailer.phone}
                                        </div>
                                    </div>
                                    <span className="badge badge-cyan">{retailer.totalOrders} orders</span>
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Credit Used</span>
                                        <span style={{ fontWeight: 600, color: isHighCredit ? 'var(--accent-coral)' : 'var(--text-primary)' }}>
                                            ₹{retailer.creditUsed.toLocaleString()} / ₹{retailer.creditLimit.toLocaleString()}
                                        </span>
                                    </div>
                                    <div style={{
                                        height: '8px',
                                        background: 'var(--glass-bg)',
                                        borderRadius: '4px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${creditPercent}%`,
                                            height: '100%',
                                            background: isHighCredit ? 'var(--accent-coral)' : 'var(--gradient-cyan)',
                                            borderRadius: '4px',
                                            transition: 'width 0.3s ease'
                                        }} />
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                        {creditPercent}% utilized • ₹{(retailer.creditLimit - retailer.creditUsed).toLocaleString()} available
                                    </p>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0.75rem',
                                    background: 'var(--glass-bg)',
                                    borderRadius: '8px',
                                    marginBottom: '1rem',
                                    fontSize: '0.875rem'
                                }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Last Order</span>
                                    <span style={{ fontWeight: 500 }}>{retailer.lastOrder}</span>
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn btn-secondary" style={{ flex: 1 }}>
                                        <CreditCard size={16} />
                                        Collect
                                    </button>
                                    <button className="btn btn-outline" style={{ flex: 1 }}>
                                        <Edit2 size={16} />
                                        Edit Limit
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            <VoiceButton />
        </div>
    );
};

export default WholesalerRetailers;
// updated route
// updated module
// updated handler
// updated builder
// updated logic
// updated util
// updated transformer
// updated controller
// updated dispatcher
// updated logic
// updated function
// updated adapter
// updated helper
// updated style
// updated controller
// updated query
// updated model
