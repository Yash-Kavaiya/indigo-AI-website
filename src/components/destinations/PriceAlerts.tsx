import React, { useState } from 'react';
import { 
  Bell, TrendingDown, TrendingUp, Calendar, DollarSign, 
  Plane, Hotel, Car, Target, CheckCircle, X, Plus,
  AlertCircle, Star, MapPin, Clock, ArrowRight, Settings
} from 'lucide-react';

interface PriceAlert {
  id: string;
  type: 'flight' | 'hotel' | 'package';
  destination: string;
  route?: string;
  currentPrice: number;
  targetPrice: number;
  lastChange: number;
  changePercent: number;
  isActive: boolean;
  createdDate: string;
  notifications: PriceNotification[];
  metadata: {
    dates?: string;
    passengers?: number;
    rooms?: number;
    class?: string;
  };
}

interface PriceNotification {
  id: string;
  type: 'price_drop' | 'price_increase' | 'target_reached';
  oldPrice: number;
  newPrice: number;
  date: string;
  message: string;
}

interface PriceAlertsProps {
  destination?: {
    name: string;
    country: string;
    flightPrice: number;
  };
}

const PriceAlerts: React.FC<PriceAlertsProps> = ({ destination }) => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: '1',
      type: 'flight',
      destination: 'Tokyo',
      route: 'Delhi → Tokyo',
      currentPrice: 45000,
      targetPrice: 40000,
      lastChange: -2500,
      changePercent: -5.3,
      isActive: true,
      createdDate: '2025-01-10',
      notifications: [
        {
          id: '1',
          type: 'price_drop',
          oldPrice: 47500,
          newPrice: 45000,
          date: '2025-01-12',
          message: 'Price dropped by ₹2,500! Still ₹5,000 away from your target.'
        }
      ],
      metadata: {
        dates: 'Mar 15 - Mar 25',
        passengers: 2,
        class: 'Economy'
      }
    },
    {
      id: '2',
      type: 'hotel',
      destination: 'Paris',
      currentPrice: 12000,
      targetPrice: 10000,
      lastChange: 1500,
      changePercent: 14.3,
      isActive: true,
      createdDate: '2025-01-08',
      notifications: [
        {
          id: '2',
          type: 'price_increase',
          oldPrice: 10500,
          newPrice: 12000,
          date: '2025-01-11',
          message: 'Price increased by ₹1,500. Consider booking soon!'
        }
      ],
      metadata: {
        dates: 'Apr 10 - Apr 15',
        rooms: 1
      }
    }
  ]);

  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    type: 'flight' as 'flight' | 'hotel' | 'package',
    destination: destination?.name || '',
    route: '',
    targetPrice: '',
    dates: '',
    passengers: 1,
    rooms: 1,
    class: 'economy'
  });

  const createAlert = () => {
    const alert: PriceAlert = {
      id: Date.now().toString(),
      type: newAlert.type,
      destination: newAlert.destination,
      route: newAlert.route,
      currentPrice: destination?.flightPrice || 45000,
      targetPrice: parseInt(newAlert.targetPrice),
      lastChange: 0,
      changePercent: 0,
      isActive: true,
      createdDate: new Date().toISOString().split('T')[0],
      notifications: [],
      metadata: {
        dates: newAlert.dates,
        passengers: newAlert.passengers,
        rooms: newAlert.rooms,
        class: newAlert.class
      }
    };

    setAlerts([...alerts, alert]);
    setShowCreateAlert(false);
    setNewAlert({
      type: 'flight',
      destination: '',
      route: '',
      targetPrice: '',
      dates: '',
      passengers: 1,
      rooms: 1,
      class: 'economy'
    });
  };

  const toggleAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, isActive: !alert.isActive }
        : alert
    ));
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'flight': return Plane;
      case 'hotel': return Hotel;
      case 'package': return Star;
      default: return Bell;
    }
  };

  const getChangeColor = (change: number) => {
    if (change < 0) return 'text-success-600';
    if (change > 0) return 'text-error-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: number) => {
    if (change < 0) return TrendingDown;
    if (change > 0) return TrendingUp;
    return null;
  };

  const getProgressToTarget = (current: number, target: number) => {
    if (current <= target) return 100;
    const maxPrice = current * 1.2; // Assume 20% above current as max
    return Math.max(0, (maxPrice - current) / (maxPrice - target) * 100);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card-elevated p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-h3 text-primary font-bold mb-2">Price Alerts</h2>
            <p className="text-body1 text-secondary">
              Track price changes and get notified when your target prices are reached
            </p>
          </div>
          <button
            onClick={() => setShowCreateAlert(true)}
            className="btn-contained bg-primary-500 hover:bg-primary-600 text-white"
          >
            <Plus className="h-5 w-5" />
            <span>Create Alert</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-6 text-center">
            <Bell className="h-8 w-8 text-primary-500 mx-auto mb-3" />
            <p className="text-h4 font-bold text-primary">{alerts.filter(a => a.isActive).length}</p>
            <p className="text-body2 text-secondary">Active Alerts</p>
          </div>
          <div className="card p-6 text-center">
            <TrendingDown className="h-8 w-8 text-success-500 mx-auto mb-3" />
            <p className="text-h4 font-bold text-primary">
              {alerts.filter(a => a.lastChange < 0).length}
            </p>
            <p className="text-body2 text-secondary">Price Drops</p>
          </div>
          <div className="card p-6 text-center">
            <Target className="h-8 w-8 text-warning-500 mx-auto mb-3" />
            <p className="text-h4 font-bold text-primary">
              {alerts.filter(a => a.currentPrice <= a.targetPrice).length}
            </p>
            <p className="text-body2 text-secondary">Targets Reached</p>
          </div>
          <div className="card p-6 text-center">
            <DollarSign className="h-8 w-8 text-secondary-500 mx-auto mb-3" />
            <p className="text-h4 font-bold text-primary">
              ₹{Math.abs(alerts.reduce((sum, a) => sum + a.lastChange, 0)).toLocaleString()}
            </p>
            <p className="text-body2 text-secondary">Total Savings</p>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="space-y-6">
        {alerts.map((alert) => {
          const AlertIcon = getAlertIcon(alert.type);
          const ChangeIcon = getChangeIcon(alert.lastChange);
          const progress = getProgressToTarget(alert.currentPrice, alert.targetPrice);
          const targetReached = alert.currentPrice <= alert.targetPrice;

          return (
            <div
              key={alert.id}
              className={`card-elevated p-8 ${
                targetReached ? 'bg-success-50 border-success-200' : ''
              } ${!alert.isActive ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className={`rounded-2xl p-3 ${
                    targetReached ? 'bg-success-500' : 'bg-primary-100'
                  }`}>
                    <AlertIcon className={`h-8 w-8 ${
                      targetReached ? 'text-white' : 'text-primary-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-h4 text-primary font-bold mb-2">
                      {alert.destination} {alert.type === 'flight' ? 'Flights' : 'Hotels'}
                    </h3>
                    {alert.route && (
                      <p className="text-body1 text-secondary mb-2">{alert.route}</p>
                    )}
                    <div className="flex items-center space-x-4 text-secondary text-body2">
                      <span>Created: {alert.createdDate}</span>
                      {alert.metadata.dates && <span>Dates: {alert.metadata.dates}</span>}
                      {alert.metadata.passengers && <span>{alert.metadata.passengers} passengers</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleAlert(alert.id)}
                    className={`btn-text ${
                      alert.isActive ? 'text-success-600' : 'text-gray-600'
                    }`}
                  >
                    {alert.isActive ? 'Pause' : 'Resume'}
                  </button>
                  <button
                    onClick={() => deleteAlert(alert.id)}
                    className="btn-text text-error-600 hover:text-error-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Price Information */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="card p-6">
                      <h4 className="text-h6 text-primary mb-2">Current Price</h4>
                      <p className="text-h3 font-bold text-primary mb-2">
                        ₹{alert.currentPrice.toLocaleString()}
                      </p>
                      {alert.lastChange !== 0 && (
                        <div className={`flex items-center space-x-2 ${getChangeColor(alert.lastChange)}`}>
                          {ChangeIcon && <ChangeIcon className="h-5 w-5" />}
                          <span className="text-body1 font-semibold">
                            ₹{Math.abs(alert.lastChange).toLocaleString()} ({alert.changePercent > 0 ? '+' : ''}{alert.changePercent}%)
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="card p-6">
                      <h4 className="text-h6 text-primary mb-2">Target Price</h4>
                      <p className="text-h3 font-bold text-secondary mb-2">
                        ₹{alert.targetPrice.toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-warning-500" />
                        <span className="text-body1 text-secondary">
                          ₹{Math.abs(alert.currentPrice - alert.targetPrice).toLocaleString()} {alert.currentPrice > alert.targetPrice ? 'to go' : 'below target'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-body2 text-secondary">Progress to Target</span>
                      <span className="text-body2 font-semibold text-primary">
                        {targetReached ? 'Target Reached!' : `${Math.round(progress)}%`}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          targetReached ? 'bg-success-500' : 'bg-primary-500'
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Recent Notifications */}
                  {alert.notifications.length > 0 && (
                    <div>
                      <h4 className="text-h6 text-primary mb-4">Recent Notifications</h4>
                      <div className="space-y-3">
                        {alert.notifications.slice(0, 3).map((notification) => (
                          <div key={notification.id} className="card p-4 bg-gray-50">
                            <div className="flex items-start space-x-3">
                              <div className={`rounded-full p-2 ${
                                notification.type === 'price_drop' ? 'bg-success-100' :
                                notification.type === 'target_reached' ? 'bg-primary-100' :
                                'bg-warning-100'
                              }`}>
                                {notification.type === 'price_drop' && <TrendingDown className="h-4 w-4 text-success-600" />}
                                {notification.type === 'target_reached' && <CheckCircle className="h-4 w-4 text-primary-600" />}
                                {notification.type === 'price_increase' && <TrendingUp className="h-4 w-4 text-warning-600" />}
                              </div>
                              <div className="flex-1">
                                <p className="text-body1 text-primary mb-1">{notification.message}</p>
                                <p className="text-body2 text-secondary">{notification.date}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  {targetReached ? (
                    <div className="card p-6 bg-success-50 border-success-200 text-center">
                      <CheckCircle className="h-12 w-12 text-success-500 mx-auto mb-4" />
                      <h4 className="text-h5 text-success-700 font-bold mb-2">Target Reached!</h4>
                      <p className="text-body2 text-success-600 mb-4">
                        The price has reached your target. Book now to secure this deal!
                      </p>
                      <button className="btn-contained bg-success-500 hover:bg-success-600 text-white w-full">
                        <span>Book Now</span>
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="card p-6">
                      <h4 className="text-h6 text-primary mb-4">Quick Actions</h4>
                      <div className="space-y-3">
                        <button className="w-full btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50">
                          <Settings className="h-5 w-5" />
                          <span>Edit Alert</span>
                        </button>
                        <button className="w-full btn-outlined border-secondary-500 text-secondary-500 hover:bg-secondary-50">
                          <Bell className="h-5 w-5" />
                          <span>Notification Settings</span>
                        </button>
                        <button className="w-full btn-text text-primary-500 hover:text-primary-600">
                          View Price History
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="card p-6">
                    <h4 className="text-h6 text-primary mb-4">Alert Details</h4>
                    <div className="space-y-2 text-body2">
                      <div className="flex justify-between">
                        <span className="text-secondary">Type:</span>
                        <span className="text-primary font-medium capitalize">{alert.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Status:</span>
                        <span className={`font-medium ${alert.isActive ? 'text-success-600' : 'text-warning-600'}`}>
                          {alert.isActive ? 'Active' : 'Paused'}
                        </span>
                      </div>
                      {alert.metadata.class && (
                        <div className="flex justify-between">
                          <span className="text-secondary">Class:</span>
                          <span className="text-primary font-medium capitalize">{alert.metadata.class}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Alert Modal */}
      {showCreateAlert && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-h4 text-primary font-bold">Create Price Alert</h3>
              <button
                onClick={() => setShowCreateAlert(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-body1 font-semibold text-primary mb-2">Alert Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'flight' as const, label: 'Flight', icon: Plane },
                    { id: 'hotel' as const, label: 'Hotel', icon: Hotel },
                    { id: 'package' as const, label: 'Package', icon: Star }
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setNewAlert({...newAlert, type: type.id})}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        newAlert.type === type.id
                          ? 'border-primary-500 bg-primary-50 text-primary-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <type.icon className="h-6 w-6 mx-auto mb-2" />
                      <span className="text-body2 font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="floating-label">
                <input
                  type="text"
                  className="input-box"
                  placeholder=" "
                  id="destination"
                  value={newAlert.destination}
                  onChange={(e) => setNewAlert({...newAlert, destination: e.target.value})}
                />
                <label htmlFor="destination">Destination</label>
              </div>

              {newAlert.type === 'flight' && (
                <div className="floating-label">
                  <input
                    type="text"
                    className="input-box"
                    placeholder=" "
                    id="route"
                    value={newAlert.route}
                    onChange={(e) => setNewAlert({...newAlert, route: e.target.value})}
                  />
                  <label htmlFor="route">Route (e.g., Delhi → Tokyo)</label>
                </div>
              )}

              <div className="floating-label">
                <input
                  type="number"
                  className="input-box"
                  placeholder=" "
                  id="target-price"
                  value={newAlert.targetPrice}
                  onChange={(e) => setNewAlert({...newAlert, targetPrice: e.target.value})}
                />
                <label htmlFor="target-price">Target Price (₹)</label>
              </div>

              <div className="floating-label">
                <input
                  type="text"
                  className="input-box"
                  placeholder=" "
                  id="dates"
                  value={newAlert.dates}
                  onChange={(e) => setNewAlert({...newAlert, dates: e.target.value})}
                />
                <label htmlFor="dates">Travel Dates</label>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowCreateAlert(false)}
                  className="flex-1 btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createAlert}
                  disabled={!newAlert.destination || !newAlert.targetPrice}
                  className="flex-1 btn-contained bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50"
                >
                  Create Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {alerts.length === 0 && (
        <div className="text-center py-16">
          <div className="card bg-gray-50 border-2 border-gray-200 p-12 max-w-md mx-auto">
            <Bell className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-h4 text-primary mb-4">No Price Alerts Yet</h3>
            <p className="text-body1 text-secondary mb-6">
              Create your first price alert to track price changes and never miss a great deal.
            </p>
            <button
              onClick={() => setShowCreateAlert(true)}
              className="btn-contained bg-primary-500 hover:bg-primary-600 text-white"
            >
              <Plus className="h-5 w-5" />
              <span>Create Your First Alert</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceAlerts;