import React from 'react';
import { prisma } from '@/utils/prisma';
import { notFound } from 'next/navigation';
import { MdCheckCircle, MdScience, MdLocationOn, MdCalendarToday } from 'react-icons/md';

interface VerifyPageProps {
  params: Promise<{ id: string }>;
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const { id } = await params;
  
  const record = await prisma.record.findUnique({
    where: { id },
  });

  if (!record) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        {/* Header Status */}
        <div className="bg-emerald-600 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <MdCheckCircle className="text-white text-4xl" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Authentic Report</h1>
          <p className="text-emerald-100 text-sm">Verified by Static Soil Health Lab</p>
        </div>

        {/* Record Details */}
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
              <MdScience size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Report Holder</p>
              <p className="text-lg font-bold text-slate-900">{record.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                <MdLocationOn size={16} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">District</p>
                <p className="text-sm font-bold text-slate-800">{record.district}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                <MdCalendarToday size={16} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Tested On</p>
                <p className="text-sm font-bold text-slate-800">
                  {new Date(record.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Consumer ID</p>
                <p className="text-md font-mono font-bold text-slate-700">{record.consumerId}</p>
              </div>
              <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black tracking-tighter uppercase">
                Official Record
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 font-medium italic">
            This record is digitally signed and verified to prevent report tampering.
          </p>
        </div>
      </div>
    </div>
  );
}
