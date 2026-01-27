"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function ContactPage() {
  const params = useParams();
  const locale = params.locale as string;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // 실제로는 API로 전송하거나 이메일 서비스 연동
    // 여기서는 mailto 링크로 대체
    const mailtoLink = `mailto:goodmind.goodthinking.goodbooks@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `이름: ${formData.name}\n이메일: ${formData.email}\n\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;
    setStatus("sent");
  };

  const texts = {
    ko: {
      title: "연락처",
      description: "문의사항이 있으시면 아래 양식을 통해 연락해 주세요.",
      name: "이름",
      email: "이메일",
      subject: "제목",
      message: "내용",
      send: "보내기",
      sending: "보내는 중...",
      sent: "이메일 클라이언트가 열립니다.",
      placeholder: {
        name: "홍길동",
        email: "example@email.com",
        subject: "문의 제목을 입력하세요",
        message: "문의 내용을 자세히 작성해 주세요.",
      },
      otherContact: "기타 연락 방법",
      emailDirect: "이메일로 직접 문의",
    },
    en: {
      title: "Contact",
      description: "If you have any questions, please contact us using the form below.",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send",
      sending: "Sending...",
      sent: "Email client will open.",
      placeholder: {
        name: "John Doe",
        email: "example@email.com",
        subject: "Enter your subject",
        message: "Please describe your inquiry in detail.",
      },
      otherContact: "Other Contact Methods",
      emailDirect: "Email us directly",
    },
  };

  const t = texts[locale as keyof typeof texts] || texts.ko;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
      <p className="text-gray-600 mb-8">{t.description}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {t.name}
          </label>
          <input
            type="text"
            id="name"
            required
            placeholder={t.placeholder.name}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {t.email}
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder={t.placeholder.email}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            {t.subject}
          </label>
          <input
            type="text"
            id="subject"
            required
            placeholder={t.placeholder.subject}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            {t.message}
          </label>
          <textarea
            id="message"
            required
            rows={6}
            placeholder={t.placeholder.message}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {status === "sending" ? t.sending : t.send}
        </button>

        {status === "sent" && (
          <p className="text-green-600 text-center">{t.sent}</p>
        )}
      </form>

      <div className="mt-12 pt-8 border-t">
        <h2 className="text-xl font-semibold mb-4">{t.otherContact}</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="flex items-center gap-3">
            <span className="text-2xl">📧</span>
            <span>
              <strong>{t.emailDirect}:</strong>{" "}
              <a href="mailto:goodmind.goodthinking.goodbooks@gmail.com" className="text-blue-600 hover:underline">
                goodmind.goodthinking.goodbooks@gmail.com
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
