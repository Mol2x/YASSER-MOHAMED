import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole, Message } from '../types';
import { MOCK_MESSAGES } from '../constants';
import { Shield, Users, Gamepad2, MessageSquare, BarChart3, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const DeveloperPanel: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview'|'messages'|'games'>('overview');

  // Security Check
  if (!user || user.role !== UserRole.Admin) {
      return (
          <div className="min-h-screen flex items-center justify-center flex-col gap-4 text-center bg-black">
              <Shield size={64} className="text-red-600" />
              <h1 className="text-3xl font-black text-white">الدخول مرفوض</h1>
              <p className="text-gray-500">هذه المنطقة مخصصة للمطورين فقط (Restricted Area).</p>
              <Link to="/" className="text-primary underline">العودة للرئيسية</Link>
          </div>
      );
  }

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-red-600/20 rounded-2xl border border-red-600/50">
                  <Shield className="text-red-500 w-8 h-8" />
              </div>
              <div>
                  <h1 className="text-3xl font-black text-white">لوحة المطور</h1>
                  <p className="text-gray-500 text-sm font-mono">Welcome back, {user.name} (Admin)</p>
              </div>
          </div>

          {/* Admin Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap ${activeTab === 'overview' ? 'bg-white text-black' : 'bg-surface text-gray-400'}`}>نظرة عامة</button>
              <button onClick={() => setActiveTab('messages')} className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap ${activeTab === 'messages' ? 'bg-white text-black' : 'bg-surface text-gray-400'}`}>الرسائل ({MOCK_MESSAGES.filter(m => m.status === 'open').length})</button>
              <button onClick={() => setActiveTab('games')} className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap ${activeTab === 'games' ? 'bg-white text-black' : 'bg-surface text-gray-400'}`}>إدارة الألعاب</button>
          </div>

          {/* Content */}
          <div className="bg-card border border-white/5 rounded-2xl p-6 min-h-[400px]">
              
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-surface p-6 rounded-xl border border-white/5">
                          <div className="flex items-center gap-2 text-gray-400 mb-2">
                              <Users size={20} /> <span className="text-xs font-bold uppercase">المستخدمين النشطين</span>
                          </div>
                          <p className="text-3xl font-black text-white">1,240</p>
                      </div>
                      <div className="bg-surface p-6 rounded-xl border border-white/5">
                          <div className="flex items-center gap-2 text-gray-400 mb-2">
                              <BarChart3 size={20} /> <span className="text-xs font-bold uppercase">إيرادات الإعلانات</span>
                          </div>
                          <p className="text-3xl font-black text-green-400">$340.50</p>
                      </div>
                      <div className="bg-surface p-6 rounded-xl border border-white/5">
                          <div className="flex items-center gap-2 text-gray-400 mb-2">
                              <AlertTriangle size={20} /> <span className="text-xs font-bold uppercase">بلاغات</span>
                          </div>
                          <p className="text-3xl font-black text-yellow-500">5</p>
                      </div>
                  </div>
              )}

              {/* Messages Tab */}
              {activeTab === 'messages' && (
                  <div className="space-y-4">
                      {MOCK_MESSAGES.map(msg => (
                          <div key={msg.id} className="bg-surface p-4 rounded-xl border border-white/5 flex flex-col md:flex-row justify-between gap-4">
                              <div>
                                  <div className="flex items-center gap-2 mb-1">
                                      <span className="text-white font-bold">{msg.userEmail}</span>
                                      <span className={`text-[10px] px-2 py-0.5 rounded ${msg.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{msg.status}</span>
                                  </div>
                                  <p className="text-gray-400 text-sm">{msg.content}</p>
                                  <p className="text-gray-600 text-xs mt-2">{msg.date}</p>
                              </div>
                              <div className="flex gap-2">
                                  <button className="px-3 py-1 bg-primary text-white text-xs rounded hover:bg-primary/80">رد</button>
                                  <button className="px-3 py-1 bg-red-500/10 text-red-500 text-xs rounded hover:bg-red-500/20">حظر</button>
                              </div>
                          </div>
                      ))}
                  </div>
              )}

              {/* Games Management Placeholder */}
              {activeTab === 'games' && (
                  <div className="text-center py-20">
                      <Gamepad2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white">إدارة الألعاب</h3>
                      <p className="text-gray-500 mb-6">يمكنك هنا إضافة، تعديل، أو حذف ألعاب من قاعدة البيانات.</p>
                      <button className="bg-primary px-6 py-2 rounded-lg text-white font-bold">إضافة لعبة جديدة</button>
                  </div>
              )}

          </div>
      </div>
    </div>
  );
};

export default DeveloperPanel;
