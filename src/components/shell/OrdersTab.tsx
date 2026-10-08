import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Phone, 
  MapPin, 
  RefreshCw,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { formatMinorUnits } from '../../services/apiClient';
import { BusinessRoleItem } from '../../services/apiClient';
import { Order } from '../../types/commerce';

interface OrdersTabProps {
  business: BusinessRoleItem;
  role: 'owner' | 'admin' | 'member' | null;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({ business, role }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'dispatched' | 'completed'>('all');
  const [search, setSearch] = useState('');

  const currency = business.currency || 'ZMW';

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/commerce/orders?businessId=${encodeURIComponent(business.id)}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.warn('Orders fetch note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [business.id]);

  const filteredOrders = orders.filter(o => {
    if (filter === 'pending' && o.status !== 'pending') return false;
    if (filter === 'dispatched' && o.status !== 'dispatched') return false;
    if (filter === 'completed' && o.status !== 'completed') return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.order_number.toLowerCase().includes(q) ||
        (o.customer_name && o.customer_name.toLowerCase().includes(q)) ||
        (o.customer_phone && o.customer_phone.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-[#0D0805] border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-syne font-bold text-white">
              Retail Store Orders
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              {orders.length} Total
            </span>
          </div>
          <p className="text-xs font-dm text-[#F5EDE4]/70">
            Automated checkout orders captured by your AI worker across WhatsApp and Web storefront.
          </p>
        </div>

        <button
          type="button"
          onClick={loadOrders}
          className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-syne font-bold text-white flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2 text-xs font-syne font-bold">
          {(['all', 'pending', 'dispatched', 'completed'] as const).map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all cursor-pointer ${
                filter === tab 
                  ? 'bg-gradient-to-r from-[#9B2208] to-[#CD481B] text-white shadow-md' 
                  : 'bg-[#0D0805] border border-white/10 text-[#F5EDE4]/70 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 max-w-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order #, customer, or phone (+260)..."
            className="w-full bg-[#0D0805] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E58330]"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#0D0805] border border-white/10 text-center space-y-2">
            <ShoppingBag className="w-10 h-10 text-white/20 mx-auto" />
            <h3 className="text-sm font-syne font-bold text-white">No Orders Found</h3>
            <p className="text-xs font-dm text-[#F5EDE4]/60">
              When shoppers confirm purchases with your AI worker, orders will appear here automatically.
            </p>
          </div>
        ) : (
          filteredOrders.map(order => {
            // Money is integer minor units per Hard Rule 6
            const totalMinor = order.total * 100;

            return (
              <div 
                key={order.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#0D0805] border border-white/10 space-y-3 hover:border-white/20 transition-all shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#E58330]">
                      #{order.order_number}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full capitalize ${
                      order.status === 'completed' 
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : order.status === 'dispatched'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      ● {order.status}
                    </span>
                    <span className="text-[11px] font-dm text-[#F5EDE4]/50">
                      {new Date(order.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-mono font-black text-white">
                      {formatMinorUnits(totalMinor, currency)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-dm">
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono text-[#F5EDE4]/50">CUSTOMER & DELIVERY</div>
                    <div className="font-syne font-bold text-white">{order.customer_name}</div>
                    <div className="flex items-center gap-1.5 text-[#F5EDE4]/70">
                      <Phone className="w-3 h-3 text-[#E58330]" />
                      <span>{order.customer_phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#F5EDE4]/70">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{order.customer_address}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] font-mono text-[#F5EDE4]/50">ITEMS PURCHASED</div>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[#F5EDE4]/80">
                        <span>{item.quantity}x {item.name} {item.variant_title ? `(${item.variant_title})` : ''}</span>
                        <span className="font-mono">{formatMinorUnits(item.price * item.quantity * 100, currency)}</span>
                      </div>
                    ))}
                    <div className="text-[11px] text-[#F5EDE4]/50 pt-1">
                      Payment: <span className="capitalize font-mono text-white">{order.payment_method.replace('_', ' ')}</span> · Delivery: <span className="text-white">{order.delivery_option}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
