import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole, Message } from '../types';
import { MOCK_MESSAGES } from '../constants';
import { Shield, Users, Gamepad2, BarChart3, AlertTriangle, Trash2, Lock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview'|'messages'|'games'>('overview');

  if (!user || (user.role !== UserRole.Admin && user.role !== UserRole.Assistant)) {
      return (
          <div className="min-h-screen flex items-center justify-center flex-col gap-4 text-center bg-black">
              <Lock size={64} className="text-red-600 animate-pulse" />
              <h1 className="text-3xl font-black text-white">ACCESS DENIED</h1>
              <p className="text-gray-500">This area is restricted to Staff only.</p>
              <Link to="/" className="text-primary underline">Return Home</Link>
          </div>
      );
  }

  const isSuperAdmin = user.role === UserRole.Admin;

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 bg-dark">
      <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl border ${isSuperAdmin ? 'bg-red-600/20 border-red-600/50 text-red-500' : 'bg-blue-600/20 border-blue-600/50 text-blue-500'}`}>
                      <Shield className="w-8 h-8" />
                  </div>
                  <div>
                      <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                          {isSuperAdmin ? 'Master Control' : 'Assistant Dashboard'}
                      </h1>
                      <div className="flex items-center gap-2 mt-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          <p className="text-gray-400 text-sm font-mono">System Online • Logged as {user.name}</p>
                      </div>
                  </div>
              </div>
              {!isSuperAdmin && (
                  <div className="bg-surface border border-white/10 px-4 py-2 rounded-lg flex items-center gap-2 text-gray-400 text-xs">
                      <Eye size={14} /> Read-Only Mode
                  </div>
              )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar Tabs */}
              <div className="lg:col-span-1 space-y-2">
                  <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-6 py-4 rounded-xl font-bold text-sm transition-all border ${activeTab === 'overview' ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-card border-white/5 text-gray-400 hover:text-white'}`}>Overview</button>
                  <button onClick={() => setActiveTab('messages')} className={`w-full text-left px-6 py-4 rounded-xl font-bold text-sm transition-all border ${activeTab === 'messages' ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-card border-white/5 text-gray-400 hover:text-white'}`}>Messages</button>
                  <button onClick={() => setActiveTab('games')} className={`w-full text-left px-6 py-4 rounded-xl font-bold text-sm transition-all border ${activeTab === 'games' ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-card border-white/5 text-gray-400 hover:text-white'}`}>Games DB</button>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 bg-card border border-white/5 rounded-3xl p-8 min-h-[500px] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                  
                  {activeTab === 'overview' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
                          <div className="bg-surface p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                              <div className="flex items-center gap-2 text-gray-400 mb-2">
                                  <Users size={20} /> <span className="text-xs font-bold uppercase">Active Users</span>
                              </div>
                              <p className="text-4xl font-black text-white">10,240</p>
                              <p className="text-xs text-green-500 mt-2">+12% this week</p>
                          </div>
                          <div className="bg-surface p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                              <div className="flex items-center gap-2 text-gray-400 mb-2">
                                  <BarChart3 size={20} /> <span className="text-xs font-bold uppercase">Revenue</span>
                              </div>
                              <p className="text-4xl font-black text-green-400">$1,340</p>
                              <p className="text-xs text-gray-500 mt-2">AdMob + Donations</p>
                          </div>
                          <div className="bg-surface p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                              <div className="flex items-center gap-2 text-gray-400 mb-2">
                                  <AlertTriangle size={20} /> <span className="text-xs font-bold uppercase">Bans</span>
                              </div>
                              <p className="text-4xl font-black text-yellow-500">12</p>
                              {isSuperAdmin && <button className="text-[10px] bg-white/10 px-2 py-1 rounded mt-2 hover:bg-white/20">Manage</button>}
                          </div>
                      </div>
                  )}

                  {activeTab === 'messages' && (
                      <div className="space-y-4 animate-fade-in-up">
                          {MOCK_MESSAGES.map(msg => (
                              <div key={msg.id} className="bg-surface p-4 rounded-xl border border-white/5 flex flex-col md:flex-row justify-between gap-4 group hover:border-white/10">
                                  <div>
                                      <div className="flex items-center gap-2 mb-1">
                                          <span className="text-white font-bold">{msg.userEmail}</span>
                                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${msg.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{msg.status}</span>
                                      </div>
                                      <p className="text-gray-400 text-sm">{msg.content}</p>
                                  </div>
                                  <div className="flex gap-2 items-start">
                                      {isSuperAdmin ? (
                                          <>
                                            <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/80">Reply</button>
                                            <button className="px-4 py-2 bg-red-500/10 text-red-500 text-xs font-bold rounded-lg hover:bg-red-500/20"><Trash2 size={14}/></button>
                                          </>
                                      ) : (
                                          <span className="text-xs text-gray-600 italic px-2">Read Only</span>
                                      )}
                                  </div>
                              </div>
                          ))}
                      </div>
                  )}

                  {activeTab === 'games' && (
                      <div className="text-center py-20 animate-fade-in-up">
                          <Gamepad2 className="w-20 h-20 text-gray-700 mx-auto mb-6" />
                          <h3 className="text-2xl font-bold text-white mb-2">Game Database</h3>
                          <p className="text-gray-500 mb-8">200+ Games Hydrated across 8 Platforms.</p>
                          
                          {isSuperAdmin ? (
                              <div className="flex justify-center gap-4">
                                  <button className="bg-primary hover:bg-primary/80 px-8 py-3 rounded-xl text-white font-bold shadow-lg shadow-primary/20 transition-all">Add New Game</button>
                                  <button className="bg-white/5 hover:bg-white/10 px-8 py-3 rounded-xl text-white font-bold border border-white/10">Scan for Errors</button>
                              </div>
                          ) : (
                              <p className="text-red-500 font-bold bg-red-500/10 inline-block px-4 py-2 rounded-lg">
                                  <Lock size={14} className="inline mr-2" />
                                  Editing Disabled for Assistants
                              </p>
                          )}
                      </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
};

export default AdminPanel;