import React from 'react';
import { Eye, Ear, MessageSquare, Brain, Frown, TrendingUp } from 'lucide-react';

interface EmpathyData {
    see: string;
    hear: string;
    say_and_do: string;
    think_and_feel: string;
    pain: string;
    gain: string;
}

interface EmpathyMapProps {
    data: EmpathyData;
}

const EmpathyMap: React.FC<EmpathyMapProps> = ({ data }) => {
    return (
        <div className="animate-fade-in w-full max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* UPPER QUADRANTS - SENSES & ACTIONS */}
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-3 text-blue-700 font-semibold">
                        <Eye className="w-5 h-5" /> what do they SEE?
                    </div>
                    <p className="text-gray-700 italic">"{data.see}"</p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-3 text-blue-700 font-semibold">
                        <Ear className="w-5 h-5" /> what do they HEAR?
                    </div>
                    <p className="text-gray-700 italic">"{data.hear}"</p>
                </div>

                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                    <div className="flex items-center gap-2 mb-3 text-indigo-700 font-semibold">
                        <MessageSquare className="w-5 h-5" /> what do they SAY & DO?
                    </div>
                    <p className="text-gray-700 italic">"{data.say_and_do}"</p>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                    <div className="flex items-center gap-2 mb-3 text-purple-700 font-semibold">
                        <Brain className="w-5 h-5" /> what do they THINK & FEEL?
                    </div>
                    <p className="text-gray-700 italic">"{data.think_and_feel}"</p>
                </div>
            </div>

            {/* LOWER QUADRANTS - PAIN & GAIN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                    <div className="flex items-center gap-2 mb-3 text-red-700 font-semibold">
                        <Frown className="w-5 h-5" /> PAIN (Nỗi đau)
                    </div>
                    <p className="text-gray-700">{data.pain}</p>
                </div>

                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-2 mb-3 text-emerald-700 font-semibold">
                        <TrendingUp className="w-5 h-5" /> GAIN (Mong muốn)
                    </div>
                    <p className="text-gray-700">{data.gain}</p>
                </div>
            </div>
        </div>
    );
};

export default EmpathyMap;
