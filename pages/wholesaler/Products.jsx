// Wholesaler Products Page - B2Bharat
import { useState } from 'react';
import Sidebar from '@src/components/Sidebar';
import VoiceButton from '@src/components/VoiceButton';
import { Package, Plus, Search, Edit2, Trash2, X } from 'lucide-react';

// Mock products for wholesaler
const mockProducts = [
    { id: '1', name: 'Basmati Rice (Premium)', category: 'Grains', unit: 'kg', price: 85, stock: 500, minOrder: 10 },
    { id: '2', name: 'Toor Dal', category: 'Pulses', unit: 'kg', price: 125, stock: 300, minOrder: 5 },
    { id: '3', name: 'Sugar (Refined)', category: 'Grocery', unit: 'kg', price: 48, stock: 800, minOrder: 25 },
    { id: '4', name: 'Fortune Cooking Oil', category: 'Oils', unit: 'L', price: 155, stock: 200, minOrder: 5 },
    { id: '5', name: 'Atta (Aashirvaad)', category: 'Grains', unit: 'kg', price: 38, stock: 1000, minOrder: 10 },
    { id: '6', name: 'Maggi Noodles (Box)', category: 'FMCG', unit: 'box', price: 330, stock: 150, minOrder: 1 },
];

const WholesalerProducts = () => {
    const [products, setProducts] = useState(mockProducts);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openEditModal = (product) => {
        setEditingProduct(product);
        setShowModal(true);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar userRole="wholesaler" />

            <main className="main-content">
                <div className="page-header">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h1>Products</h1>
                            <p>Manage your product catalog and pricing</p>
                        </div>
                        <button className="btn btn-primary" onClick={() => { setEditingProduct(null); setShowModal(true); }}>
                            <Plus size={18} />
                            Add Product
                        </button>
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
                        placeholder="Search products or categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ paddingLeft: '2.75rem', width: '100%', maxWidth: '400px' }}
                    />
                </div>

                {/* Products Table */}
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price (₹)</th>
                                <th>Stock</th>
                                <th>Min Order</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td style={{ fontWeight: 500 }}>{product.name}</td>
                                    <td>
                                        <span className="badge badge-cyan">{product.category}</span>
                                    </td>
                                    <td style={{ fontWeight: 600 }}>₹{product.price}/{product.unit}</td>
                                    <td>{product.stock} {product.unit}</td>
                                    <td>{product.minOrder} {product.unit}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                className="btn btn-secondary btn-icon"
                                                style={{ width: '36px', height: '36px' }}
                                                onClick={() => openEditModal(product)}
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                className="btn btn-secondary btn-icon"
                                                style={{ width: '36px', height: '36px', color: 'var(--accent-coral)' }}
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add/Edit Product Modal */}
                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                                <button className="modal-close" onClick={() => setShowModal(false)}>
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                                <div className="input-group" style={{ marginBottom: '1rem' }}>
                                    <label>Product Name</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Enter product name"
                                        defaultValue={editingProduct?.name || ''}
                                        required
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                    <div className="input-group">
                                        <label>Category</label>
                                        <select className="input" defaultValue={editingProduct?.category || ''} style={{ width: '100%' }}>
                                            <option value="">Select category</option>
                                            <option value="Grains">Grains</option>
                                            <option value="Pulses">Pulses</option>
                                            <option value="Grocery">Grocery</option>
                                            <option value="Oils">Oils</option>
                                            <option value="FMCG">FMCG</option>
                                            <option value="Dairy">Dairy</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label>Unit</label>
                                        <select className="input" defaultValue={editingProduct?.unit || 'kg'} style={{ width: '100%' }}>
                                            <option value="kg">Kilogram (kg)</option>
                                            <option value="L">Litre (L)</option>
                                            <option value="piece">Piece</option>
                                            <option value="box">Box</option>
                                            <option value="packet">Packet</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div className="input-group">
                                        <label>Price (₹)</label>
                                        <input
                                            type="number"
                                            className="input"
                                            placeholder="0"
                                            defaultValue={editingProduct?.price || ''}
                                            required
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Stock</label>
                                        <input
                                            type="number"
                                            className="input"
                                            placeholder="0"
                                            defaultValue={editingProduct?.stock || ''}
                                            required
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Min Order</label>
                                        <input
                                            type="number"
                                            className="input"
                                            placeholder="1"
                                            defaultValue={editingProduct?.minOrder || 1}
                                            required
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                        {editingProduct ? 'Update Product' : 'Add Product'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>

            <VoiceButton />
        </div>
    );
};

export default WholesalerProducts;
// updated function
// updated component
// updated config
// updated binding
// updated model
// updated middleware
// updated controller
// updated resolver
// updated builder
// updated listener
// updated module
// updated schema
// updated middleware
// updated model
// updated view
// updated adapter
// updated function
// updated query
// updated util
// updated formatter
// updated state
// updated query
// updated adapter
// updated model
// updated style
