import React from 'react';
import { Database, Video, BrainCircuit } from 'lucide-react';

interface DataClassificationProps {
    data: {
        data: string[];
        doing: string[];
        interpretation: string[];
    };
}

const DataClassification: React.FC<DataClassificationProps> = ({ data }) => {
    return (
        <div className="w-full max-w-5xl mx-auto space-y-4 animate-fade-in">
            <div className="text-center mb-8">
                <h3 className="text-xl font-light text-gray-800">1. Input Classification</h3>
                <p className="text-sm text-gray-500">Tách biệt Sự thật (Data/Doing) khỏi Suy diễn (Interpretation)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* DATA COLUMN */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full">
                    <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                        <Database className="w-5 h-5 text-gray-600" />
                        <h4 className="font-bold text-gray-700">DATA (Số liệu)</h4>
                    </div>
                    <div className="p-6 flex-1">
                        <ul className="space-y-3">
                            {data.data.length > 0 ? (
                                data.data.map((item, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex gap-2">
                                        <span className="text-gray-400">•</span> {item}
                                    </li>
                                ))
                            ) : (
                                <li className="text-sm text-gray-400 italic">Không tìm thấy dữ liệu định lượng.</li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* DOING COLUMN */}
                <div className="bg-blue-50 rounded-xl border border-blue-100 overflow-hidden flex flex-col h-full">
                    <div className="bg-blue-100 px-6 py-4 border-b border-blue-200 flex items-center gap-2">
                        <Video className="w-5 h-5 text-blue-700" />
                        <h4 className="font-bold text-blue-800">DOING (Hành vi)</h4>
                    </div>
                    <div className="p-6 flex-1">
                        <ul className="space-y-3">
                            {data.doing.length > 0 ? (
                                data.doing.map((item, idx) => (
                                    <li key={idx} className="text-sm text-gray-700 flex gap-2">
                                        <span className="text-blue-400">•</span> {item}
                                    </li>
                                ))
                            ) : (
                                <li className="text-sm text-gray-400 italic">Không tìm thấy hành vi quan sát được.</li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* INTERPRETATION COLUMN */}
                <div className="bg-amber-50 rounded-xl border border-amber-100 overflow-hidden flex flex-col h-full">
                    <div className="bg-amber-100 px-6 py-4 border-b border-amber-200 flex items-center gap-2">
                        <BrainCircuit className="w-5 h-5 text-amber-700" />
                        <h4 className="font-bold text-amber-800">INTERPRETATION (Suy diễn)</h4>
                    </div>
                    <div className="p-6 flex-1">
                        <p className="text-xs text-amber-600 mb-4 italic border-l-2 border-amber-300 pl-3">
                            Đây là những giả thuyết tâm lý cần được kiểm chứng, không phải sự thật hiển nhiên.
                        </p>
                        <ul className="space-y-3">
                            {data.interpretation.length > 0 ? (
                                data.interpretation.map((item, idx) => (
                                    <li key={idx} className="text-sm text-gray-700 flex gap-2">
                                        <span className="text-amber-400">•</span> {item}
                                    </li>
                                ))
                            ) : (
                                <li className="text-sm text-gray-400 italic">Chưa có thông tin suy diễn.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataClassification;
