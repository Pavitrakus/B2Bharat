// Wholesaler Dashboard - B2Bharat (Indian Themed)
import { useEffect, useState } from 'react';
import Sidebar from '@src/components/Sidebar';
import VoiceButton from '@src/components/VoiceButton';
import {
    TrendingUp,
    Users,
    Package,
    CreditCard,
    ArrowRight,
    Truck,
    Mic,
    Sparkles
} from 'lucide-react';

const mockStats = {
    todayOrders: 24,
    totalRevenue: 185000,
    activeRetailers: 45,
    pendingPayments: 78000,
    productsListed: 156
};

const mockRecentOrders = [
    { id: 'WO001', retailer: 'Krishna Store', items: 5, total: 12500, status: 'pending' },
    { id: 'WO002', retailer: 'Sharma Kirana', items: 3, total: 8200, status: 'completed' },
    { id: 'WO003', retailer: 'Patel Mart', items: 8, total: 22000, status: 'pending' },
];

const WholesalerDashboard = () => {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Suprabhat');
        else if (hour < 17) setGreeting('Namaskar');
        else setGreeting('Shubh Sandhya');
    }, []);

    const stats = [
        { label: "Aaj Ke Orders", value: mockStats.todayOrders, change: '+8 kal se', positive: true, type: 'saffron', icon: Package },
        { label: 'Active Retailers', value: mockStats.activeRetailers, change: '+3 is hafte', positive: true, type: 'peacock', icon: Users },
        { label: 'Pending Payments', value: `₹${mockStats.pendingPayments.toLocaleString()}`, change: '12 retailers se', positive: false, type: 'gold', icon: CreditCard },
        { label: 'Products Listed', value: mockStats.productsListed, change: '12 low stock', positive: true, type: 'maroon', icon: Package },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar userRole="wholesaler" />

            <main className="main-content">
                {/* Page Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#2D1810' }}>
                        {greeting}! 🙏
                    </h1>
                    <p style={{ color: '#5C4033', fontSize: '1.1rem' }}>
                        Aapke wholesale business ka overview 📊
                    </p>
                </div>

                {/* Voice Tip Card */}
                <div style={{
                    padding: '1.25rem 1.5rem',
                    background: 'linear-gradient(135deg, rgba(15, 76, 129, 0.1) 0%, rgba(0, 139, 139, 0.05) 100%)',
                    border: '2px solid rgba(15, 76, 129, 0.2)',
                    borderRadius: '16px',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #0F4C81 0%, #008B8B 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(15, 76, 129, 0.3)'
                    }}>
                        <Mic size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600, color: '#2D1810', marginBottom: '0.25rem' }}>
                            🎤 Voice se manage karo!
                        </p>
                        <p style={{ color: '#5C4033', fontSize: '0.95rem' }}>
                            Bolo: <span style={{ color: '#0F4C81', fontWeight: 500 }}>"Pending payments dikhao"</span> ya <span style={{ color: '#0F4C81', fontWeight: 500 }}>"New product add karo"</span>
                        </p>
                    </div>
                    <Sparkles size={24} style={{ color: '#0F4C81' }} />
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className={`card stat-card ${stat.type}`}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <span className="stat-label">{stat.label}</span>
                                <stat.icon size={20} style={{ opacity: 0.5 }} />
                            </div>
                            <div className="stat-value">{stat.value}</div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.875rem',
                                color: stat.positive ? '#228B22' : '#C41E3A'
                            }}>
                                <TrendingUp size={14} />
                                {stat.change}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Revenue Card */}
                <div className="card" style={{
                    padding: '2rem',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(255, 165, 0, 0.03) 100%)'
                }}>
                    <TrendingUp size={48} style={{ color: '#FF6B35', opacity: 0.5, marginBottom: '1rem' }} />
                    <p style={{ color: '#5C4033' }}>Aaj Ki Total Revenue</p>
                    <p style={{ fontSize: '3rem', fontWeight: 700, color: '#2D1810', marginTop: '0.5rem' }}>
                        ₹{mockStats.totalRevenue.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '0.95rem', color: '#228B22' }}>+15% last month se</p>
                </div>

                {/* Recent Orders */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#2D1810' }}>
                            Recent Orders from Retailers 📦
                        </h2>
                        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                            View All <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Retailer</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockRecentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td style={{ fontWeight: 500, color: '#0F4C81' }}>{order.id}</td>
                                        <td>{order.retailer}</td>
                                        <td>{order.items} items</td>
                                        <td style={{ fontWeight: 600 }}>₹{order.total.toLocaleString()}</td>
                                        <td>
                                            <span className={`order-status ${order.status}`}>{order.status}</span>
                                        </td>
                                        <td>
                                            <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                                                <Truck size={14} /> Dispatch
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <VoiceButton />
        </div>
    );
};

export default WholesalerDashboard;
// updated formatter
// updated resolver
// updated adapter
// updated service
// updated handler
// updated factory
// updated provider
// updated config
// updated controller
// updated transformer
// updated view
// updated observer
// updated module
// updated schema
// updated util
// updated helper
// updated resolver
// updated observer
// updated component
// updated dispatcher
// updated transformer
// updated helper
