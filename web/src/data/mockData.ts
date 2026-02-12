import { CaseStudy } from "../types";

export const MOCK_CASES: CaseStudy[] = [
    {
        id: "case_chinese_goods",
        title: "So sánh hàng Tàu",
        input: "Khách khen sản phẩm đẹp, hỏi rất nhiều chi tiết kỹ thuật, nhưng khi báo giá thì chê đắt và so sánh với hàng Trung Quốc.",
        analysis: {
            factGuard: {
                status: "PASS",
                facts: [
                    "Hành vi: Khen đẹp",
                    "Hành vi: Hỏi chi tiết kỹ thuật",
                    "Hành vi: Chê đắt",
                    "Hành vi: So sánh với hàng Tàu"
                ]
            },
            decoder: {
                jobs: {
                    functional: "Cần sản phẩm kỹ thuật tốt",
                    emotional: "Thích cái đẹp, muốn hàng xịn",
                    social: "Muốn làm 'Smart Shopper', sợ bị hớ"
                },
                tension: "Muốn mua NHƯNG sợ trả tiền cho 'Thương hiệu' thay vì 'Giá trị thực'.",
                insight: {
                    context: "Khi đã ưng ý về mặt cảm xúc và kỹ thuật.",
                    doing: "Dùng 'hàng Tàu' làm neo giá để dìm hàng.",
                    tension: "Muốn sở hữu hàng hiệu NHƯNG sợ mình đang trả tiền cho Thương hiệu.",
                    truth: "Họ không tiếc tiền, họ tiếc 'cảm giác bị dắt mũi'. Cần lý do hợp lý hóa."
                }
            },
            builder: {
                microLesson: {
                    concept: "The Rationalization Need (Nhu cầu Hợp lý hóa)",
                    source: "Module A2: JTBD Analysis (Trang 3)",
                    misconception: "Khách so sánh giá là khách kẹt sỉ.",
                    example: "Đồng cảm 'Nhìn y hệt' -> Chỉ ra 'Chi tiết đắt giá' để khách thấy hợp lý."
                },
                quizzes: [
                    {
                        id: "q1",
                        type: "single-choice",
                        question: "Mục tiêu (Job) thực sự của khách hàng trong câu nói này là gì?",
                        options: [
                            "Muốn bạn giảm giá ngay lập tức.",
                            "Tìm kiếm lý do thuyết phục để KHÔNG phải mua hàng Taobao (sợ bị hớ).",
                            "Là đối thủ cạnh tranh đi dò giá."
                        ],
                        correctAnswer: 1, // Index B
                        explanation: "Nếu thích hàng Taobao họ đã mua rồi. Họ đang cần bạn giúp họ 'Hợp lý hóa' mức giá chênh lệch.",
                        difficulty: "easy"
                    },
                    {
                        id: "q2",
                        type: "true-false",
                        question: "Khi khách hàng so sánh giá với hàng Trung Quốc, điều đầu tiên Sales nên làm là phản bác ngay để bảo vệ thương hiệu.",
                        options: [
                            "Đúng",
                            "Sai"
                        ],
                        correctAnswer: 1, // Sai
                        explanation: "Sai. Điều đầu tiên là phải ĐỒNG CẢM (Validation) để hạ thấp hàng rào phòng thủ của khách. Phản bác ngay sẽ khiến khách hàng cảm thấy bị tấn công.",
                        difficulty: "easy"
                    },
                    {
                        id: "q3",
                        type: "single-choice",
                        question: "Đâu là 'Insight' sâu xa nhất của khách hàng này?",
                        options: [
                            "Họ không có đủ tiền.",
                            "Họ muốn mua hàng hiệu nhưng sợ bị người khác nói là 'bị dắt mũi'.",
                            "Họ thực sự thích hàng Trung Quốc hơn."
                        ],
                        correctAnswer: 1,
                        explanation: "Đây là Social Job: Muốn thể hiện mình là người tiêu dùng thông minh (Smart Shopper).",
                        difficulty: "medium"
                    }
                ],
                script: [
                    { role: "Sales", text: "Dạ công nhận anh tinh mắt thật. Nhìn qua ảnh thì đúng là y chang, kể cả thông số..." },
                    { role: "Sales", text: "Nhưng anh nhìn kỹ cái [Chi tiết X] này nhé. Bên em đúc bằng thép nguyên khối..." },
                    { role: "Sales", text: "Tính ra mình thêm chút tiền nhưng yên tâm dùng 10 năm không hỏng. Anh thấy sao ạ?" }
                ]
            }
        }
    }
];
