// Wholesaler Ledger Page - B2Bharat
import Sidebar from '@src/components/Sidebar';
import VoiceButton from '@src/components/VoiceButton';
import { BookOpen, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, Download } from 'lucide-react';

// Mock ledger for wholesaler
const mockLedger = [
    { id: 'WL001', type: 'credit', amount: 25000, description: 'Payment from Krishna Store', date: '2026-01-02', retailer: 'Krishna Store' },
    { id: 'WL002', type: 'debit', amount: 85000, description: 'Stock Purchase - Rice & Dal', date: '2026-01-01', retailer: null },
    { id: 'WL003', type: 'credit', amount: 52000, description: 'Payment from Sharma Kirana', date: '2026-01-01', retailer: 'Sharma Kirana' },
    { id: 'WL004', type: 'credit', amount: 18000, description: 'Payment from Patel Mart', date: '2025-12-30', retailer: 'Patel Mart' },
    { id: 'WL005', type: 'debit', amount: 45000, description: 'Stock Purchase - FMCG Items', date: '2025-12-29', retailer: null },
];

const mockSummary = {
    totalReceivable: 162000,
    collectedThisMonth: 185000,
    pendingPayments: 78000,
    monthlyRevenue: 450000
};

const WholesalerLedger = () => {
    const totalIncome = mockLedger.filter(l => l.type === 'credit').reduce((sum, l) => sum + l.amount, 0);
    const totalExpense = mockLedger.filter(l => l.type === 'debit').reduce((sum, l) => sum + l.amount, 0);

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar userRole="wholesaler" />

            <main className="main-content">
                <div className="page-header">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h1>Ledger & Accounts</h1>
                            <p>Track receivables, payments, and generate reports</p>
                        </div>
                        <button className="btn btn-secondary">
                            <Download size={18} />
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="stats-grid">
                    <div className="stat-card glass-card coral">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span className="stat-label">Monthly Revenue</span>
                            <TrendingUp size={20} style={{ color: 'var(--accent-green)', opacity: 0.7 }} />
                        </div>
                        <div className="stat-value" style={{ color: 'var(--accent-green)' }}>
                            ₹{mockSummary.monthlyRevenue.toLocaleString()}
                        </div>
                        <div className="stat-change positive">
                            <ArrowUpRight size={14} />
                            +18% from last month
                        </div>
                    </div>

                    <div className="stat-card glass-card cyan">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span className="stat-label">Collected This Month</span>
                            <BookOpen size={20} style={{ color: 'var(--accent-cyan)', opacity: 0.7 }} />
                        </div>
                        <div className="stat-value">₹{mockSummary.collectedThisMonth.toLocaleString()}</div>
                        <div className="stat-change positive">
                            <TrendingUp size={14} />
                            On track
                        </div>
                    </div>

                    <div className="stat-card glass-card gold">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span className="stat-label">Pending Payments</span>
                            <TrendingDown size={20} style={{ color: 'var(--accent-gold)', opacity: 0.7 }} />
                        </div>
                        <div className="stat-value" style={{ color: 'var(--accent-gold)' }}>
                            ₹{mockSummary.pendingPayments.toLocaleString()}
                        </div>
                        <div className="stat-change">
                            From 12 retailers
                        </div>
                    </div>

                    <div className="stat-card glass-card purple">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span className="stat-label">Total Receivable</span>
                            <ArrowDownLeft size={20} style={{ color: 'var(--accent-purple)', opacity: 0.7 }} />
                        </div>
                        <div className="stat-value">₹{mockSummary.totalReceivable.toLocaleString()}</div>
                        <div className="stat-change">
                            Outstanding credits
                        </div>
                    </div>
                </div>

                {/* This Month Summary */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Income Summary
                        </h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-green)', marginBottom: '0.5rem' }}>
                            ₹{totalIncome.toLocaleString()}
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            Payments received from retailers
                        </p>
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Expense Summary
                        </h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-coral)', marginBottom: '0.5rem' }}>
                            ₹{totalExpense.toLocaleString()}
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            Stock purchases & operations
                        </p>
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Net Profit
                        </h3>
                        <div style={{
                            fontSize: '2.5rem',
                            fontWeight: 700,
                            color: totalIncome - totalExpense >= 0 ? 'var(--accent-cyan)' : 'var(--accent-coral)',
                            marginBottom: '0.5rem'
                        }}>
                            ₹{Math.abs(totalIncome - totalExpense).toLocaleString()}
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            {totalIncome - totalExpense >= 0 ? 'Profit this period' : 'Loss this period'}
                        </p>
                    </div>
                </div>

                {/* Ledger Transactions */}
                <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                        Transaction History
                    </h2>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Retailer</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockLedger.map((entry) => (
                                    <tr key={entry.id}>
                                        <td style={{ color: 'var(--text-secondary)' }}>{entry.date}</td>
                                        <td style={{ fontWeight: 500 }}>{entry.description}</td>
                                        <td>
                                            {entry.retailer ? (
                                                <span className="badge badge-cyan">{entry.retailer}</span>
                                            ) : (
                                                <span style={{ color: 'var(--text-muted)' }}>-</span>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`badge ${entry.type === 'credit' ? 'badge-green' : 'badge-coral'}`}>
                                                {entry.type === 'credit' ? (
                                                    <><ArrowDownLeft size={12} style={{ marginRight: '0.25rem' }} /> Received</>
                                                ) : (
                                                    <><ArrowUpRight size={12} style={{ marginRight: '0.25rem' }} /> Paid</>
                                                )}
                                            </span>
                                        </td>
                                        <td style={{
                                            fontWeight: 600,
                                            color: entry.type === 'credit' ? 'var(--accent-green)' : 'var(--accent-coral)'
                                        }}>
                                            {entry.type === 'credit' ? '+' : '-'}₹{entry.amount.toLocaleString()}
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

export default WholesalerLedger;
// updated style
// updated style
// updated component
// updated resolver
// updated view
// updated variable
// updated binding
// updated binding
// updated schema
// updated config
// updated state
// updated factory
// updated transformer
// updated logic
// updated route
// updated model
// updated view
// updated function
// updated listener
// updated adapter
// updated component
// updated logic
// updated util
// updated model
// updated controller
