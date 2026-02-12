import React from 'react';
import { Gamepad2, Scroll, Trophy } from 'lucide-react';

interface ContextGameProps {
    data: {
        gameName: string;
        unwrittenRules: string[];
        winCriteria: string;
    };
}

const ContextGame: React.FC<ContextGameProps> = ({ data }) => {
    return (
        <div className="w-full max-w-4xl mx-auto my-8 animate-fade-in">
            <div className="text-center mb-6">
                <h3 className="text-xl font-light text-gray-800">2. Context Game</h3>
                <p className="text-sm text-gray-500">Khách hàng đang chơi trò chơi tâm lý gì?</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl shadow-xl overflow-hidden text-white relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <Gamepad2 className="w-64 h-64 text-white" />
                </div>

                {/* HEADER: GAME NAME */}
                <div className="p-8 border-b border-indigo-700/50 relative z-10 text-center">
                    <div className="text-indigo-300 text-xs font-bold uppercase tracking-[0.2em] mb-2">THE UNSPOKEN GAME</div>
                    <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-purple-200 drop-shadow-sm">
                        "{data.gameName}"
                    </h2>
                </div>

                {/* BODY: RULES & WIN */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {/* Rules */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-indigo-300 font-semibold mb-2">
                            <Scroll className="w-5 h-5" />
                            <span>Unwritten Rules (Luật ngầm)</span>
                        </div>
                        <ul className="space-y-3">
                            {data.unwrittenRules.map((rule, idx) => (
                                <li key={idx} className="flex gap-3 text-indigo-100 text-sm bg-indigo-800/30 p-3 rounded-lg border border-indigo-700/50 backdrop-blur-sm">
                                    <span className="text-indigo-400 font-bold">{idx + 1}.</span> {rule}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Win Criteria */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-yellow-400 font-semibold mb-2">
                            <Trophy className="w-5 h-5" />
                            <span>Win Criteria (Định nghĩa thắng)</span>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 p-6 rounded-xl border border-yellow-500/30 backdrop-blur-sm h-full flex items-center justify-center text-center">
                            <p className="text-lg font-medium text-yellow-100 leading-relaxed italic">
                                "{data.winCriteria}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContextGame;
